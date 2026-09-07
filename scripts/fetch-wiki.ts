/**
 * Batch-fetch infobox data and portraits from English Wikipedia.
 * Usage: npm run fetch:wiki
 */
import { access, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { characters } from '../src/data/characters'
import { relationships } from '../src/data/relationships'
import type { WikiInfo } from '../src/data/types'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const API = 'https://en.wikipedia.org/w/api.php'
const UA = 'CorrieRelationshipMap/1.0 (personal fan project)'
const avatarDir = path.join(ROOT, 'public', 'avatars')

interface ImageInfo { thumburl?: string; url: string; mime?: string }
interface Page {
  title: string
  missing?: boolean
  revisions?: Array<{ slots?: { main?: { content?: string } }; content?: string }>
  imageinfo?: ImageInfo[]
}
interface Redirect { from: string; to: string; tofragment?: string }
interface QueryResponse { query?: { pages?: Page[]; redirects?: Redirect[] } }

function chunks<T>(items: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(items.length / size) }, (_, i) =>
    items.slice(i * size, i * size + size),
  )
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function api(params: Record<string, string>, attempt = 0): Promise<QueryResponse> {
  const body = new URLSearchParams({ ...params, action: 'query', format: 'json', formatversion: '2' })
  const response = await fetch(API, {
    method: 'POST',
    headers: {
      'User-Agent': UA,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })
  if ((response.status === 429 || response.status >= 500) && attempt < 6) {
    const wait = 2_000 * 2 ** attempt
    console.warn(`Wikipedia returned ${response.status}; retrying in ${wait / 1000}s`)
    await sleep(wait)
    return api(params, attempt + 1)
  }
  if (!response.ok) throw new Error(`Wikipedia API: ${response.status} ${response.statusText}`)
  return response.json() as Promise<QueryResponse>
}

function extractSection(text: string, fragment?: string): string {
  if (!fragment) return text
  const wanted = fragment.replace(/_/g, ' ').trim().toLowerCase()
  const lines = text.split('\n')
  const start = lines.findIndex((line) => {
    const match = line.match(/^(==+)\s*(.*?)\s*\1\s*$/)
    return match?.[2].trim().toLowerCase() === wanted
  })
  if (start < 0) return text
  const level = lines[start].match(/^=+/)?.[0].length ?? 2
  let end = lines.length
  for (let i = start + 1; i < lines.length; i++) {
    const heading = lines[i].match(/^(=+)[^=]/)
    if (heading && heading[1].length <= level) {
      end = i
      break
    }
  }
  return lines.slice(start, end).join('\n')
}

function extractInfobox(text: string): string | undefined {
  const start = text.search(/\{\{\s*Infobox soap character/i)
  if (start < 0) return undefined
  let depth = 0
  for (let i = start; i < text.length - 1; i++) {
    const pair = text.slice(i, i + 2)
    if (pair === '{{') { depth++; i++ }
    else if (pair === '}}') {
      depth--; i++
      if (depth === 0) return text.slice(start, i + 1)
    }
  }
}

function paramsOf(template?: string): Record<string, string> {
  if (!template) return {}
  const values: string[] = []
  let current = ''
  let curly = 0
  let square = 0
  for (let i = template.indexOf('|') + 1; i < template.length - 2; i++) {
    const pair = template.slice(i, i + 2)
    if (pair === '{{') { curly++; current += pair; i++ }
    else if (pair === '}}') { curly--; current += pair; i++ }
    else if (pair === '[[') { square++; current += pair; i++ }
    else if (pair === ']]') { square--; current += pair; i++ }
    else if (template[i] === '|' && curly === 0 && square === 0) {
      values.push(current); current = ''
    } else current += template[i]
  }
  values.push(current)
  return Object.fromEntries(values.flatMap((part) => {
    const equals = part.indexOf('=')
    return equals < 0 ? [] : [[part.slice(0, equals).trim().toLowerCase(), part.slice(equals + 1).trim()]]
  }))
}

function cleanLines(raw?: string): string[] {
  if (!raw) return []
  let value = raw
    .replace(/<ref[^>]*\/>/gi, '')
    .replace(/<ref[^>]*>[\s\S]*?<\/ref>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\{\{\s*(plainlist|ubl|unbulleted list|flatlist|hlist)\s*\|/gi, '\n')
    .replace(/\{\{\s*(start|end) date\s*\|\s*(\d{4})[^}]*\}\}/gi, '$2')
    .replace(/\{\{\s*(nowrap|small)\s*\|([^{}]*)\}\}/gi, '$2')
  for (let i = 0; i < 4; i++) value = value.replace(/\{\{[^{}]*\}\}/g, '')
  value = value
    .replace(/\[\[(?:[^|\]]*\|)?([^\]]*)\]\]/g, '$1')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/'''?/g, '')
    .replace(/[{}]/g, '')
  return value.split(/\n|\*/).map((line) => line.replace(/\s+/g, ' ').trim()).filter(Boolean)
}

const clean = (raw?: string) => {
  const lines = cleanLines(raw)
  return lines.length ? lines.join(', ') : undefined
}

async function fileExists(file: string) {
  try { await access(file); return true } catch { return false }
}

async function download(url: string, file: string, attempt = 0): Promise<void> {
  if (await fileExists(file)) return
  const response = await fetch(url, { headers: { 'User-Agent': UA } })
  if ((response.status === 429 || response.status >= 500) && attempt < 5) {
    await sleep(1_500 * 2 ** attempt)
    return download(url, file, attempt + 1)
  }
  if (!response.ok) throw new Error(`${response.status} downloading ${url}`)
  await writeFile(file, Buffer.from(await response.arrayBuffer()))
}

async function main() {
  await mkdir(avatarDir, { recursive: true })
  console.log(`Fetching ${characters.length} character pages in batches…`)

  const requested = characters.map((character) => character.wikiTitle)
  const pageByTitle = new Map<string, Page>()
  const redirectByFrom = new Map<string, Redirect>()

  for (const batch of chunks(requested, 40)) {
    const data = await api({
      titles: batch.join('|'),
      redirects: '1',
      prop: 'revisions',
      rvprop: 'content',
      rvslots: 'main',
    })
    for (const page of data.query?.pages ?? []) pageByTitle.set(page.title, page)
    for (const redirect of data.query?.redirects ?? []) redirectByFrom.set(redirect.from, redirect)
  }

  const records = characters.map((character) => {
    const redirect = redirectByFrom.get(character.wikiTitle)
    const title = redirect?.to ?? character.wikiTitle
    const page = pageByTitle.get(title)
    const fullText = page?.revisions?.[0]?.slots?.main?.content ?? page?.revisions?.[0]?.content ?? ''
    const text = extractSection(fullText, redirect?.tofragment)
    const params = paramsOf(extractInfobox(text))
    return { character, redirect, title, page, params }
  })

  const imageFiles = [...new Set(records.map(({ params }) => clean(params.image)).filter(Boolean))] as string[]
  const imageByFile = new Map<string, ImageInfo>()
  for (const batch of chunks(imageFiles, 40)) {
    const data = await api({
      titles: batch.map((name) => `File:${name!.replace(/^(File|Image):/i, '')}`).join('|'),
      prop: 'imageinfo',
      iiprop: 'url|mime',
      iiurlwidth: '256',
    })
    for (const page of data.query?.pages ?? []) {
      const info = page.imageinfo?.[0]
      if (info) imageByFile.set(page.title.replace(/^File:/, '').replace(/_/g, ' '), info)
    }
  }

  const wiki: Record<string, WikiInfo> = {}
  const jobs: Array<() => Promise<void>> = []
  const missingImages: string[] = []
  const missingPages: string[] = []

  for (const { character, redirect, title, page, params } of records) {
    if (!page || page.missing) missingPages.push(character.name)
    const fileName = clean(params.image)
    const image = fileName
      ? imageByFile.get(fileName.replace(/^(File|Image):/i, '').replace(/_/g, ' '))
      : undefined
    const info: WikiInfo = {
      title: title + (redirect?.tofragment ? `#${redirect.tofragment}` : ''),
      url: `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}` +
        (redirect?.tofragment ? `#${encodeURIComponent(redirect.tofragment.replace(/ /g, '_'))}` : ''),
      portrayer: clean(params.portrayer),
      years: clean(params.years),
      spouses: [...cleanLines(params.spouse), ...cleanLines(params.husband), ...cleanLines(params.wife)],
    }
    if (image) {
      const ext = image.mime?.includes('png') ? 'png' : image.mime?.includes('gif') ? 'gif' : 'jpg'
      info.image = `avatars/${character.id}.${ext}`
      jobs.push(async () => {
        try {
          await download(image.thumburl ?? image.url, path.join(ROOT, 'public', info.image!))
        } catch (error) {
          console.warn(`Skipping portrait for ${character.name}: ${(error as Error).message}`)
          info.image = undefined
          missingImages.push(character.name)
        }
      })
    } else missingImages.push(character.name)
    wiki[character.id] = info
  }

  let jobIndex = 0
  await Promise.all(Array.from({ length: 2 }, async () => {
    while (jobIndex < jobs.length) {
      const job = jobs[jobIndex++]
      await job()
      await sleep(250)
    }
  }))

  await writeFile(path.join(ROOT, 'src', 'data', 'wiki.json'), JSON.stringify(wiki, null, 2) + '\n')

  const byId = new Map(characters.map((character) => [character.id, character]))
  const unconfirmed = relationships.filter((relationship) => relationship.type === 'married').filter((relationship) => {
    const a = byId.get(relationship.source)
    const b = byId.get(relationship.target)
    if (!a || !b) return true
    const spouseText = [...wiki[a.id].spouses, ...wiki[b.id].spouses].join(' ').toLowerCase()
    return ![a.name, b.name].some((name) => spouseText.includes(name.split(' ')[0].toLowerCase()))
  })

  console.log(`Done: ${Object.keys(wiki).length} records, ${jobs.length} portraits`)
  console.log(`No image (${missingImages.length}): ${missingImages.join(', ') || 'none'}`)
  console.log(`Missing page (${missingPages.length}): ${missingPages.join(', ') || 'none'}`)
  console.log(`Curated marriages not confirmed by infobox (${unconfirmed.length})`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
