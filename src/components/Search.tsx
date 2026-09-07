import { useEffect, useRef, useState } from 'react'
import type { Character } from '../data/types'

interface SearchProps {
  characters: Character[]
  onSelect: (id: string) => void
}

export default function Search({ characters, onSelect }: SearchProps) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const results = query.trim()
    ? characters
        .filter((character) => character.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 8)
    : []

  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    window.addEventListener('pointerdown', close)
    return () => window.removeEventListener('pointerdown', close)
  }, [])

  const choose = (character: Character) => {
    setQuery(character.name)
    setOpen(false)
    onSelect(character.id)
  }

  return (
    <div className="search" ref={rootRef}>
      <span className="search-icon" aria-hidden="true">⌕</span>
      <input
        value={query}
        onChange={(event) => {
          setQuery(event.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && results[0]) choose(results[0])
          if (event.key === 'Escape') setOpen(false)
        }}
        placeholder="Find a character…"
        aria-label="Find a character"
        aria-autocomplete="list"
      />
      {query && (
        <button className="search-clear" onClick={() => setQuery('')} aria-label="Clear search">
          ×
        </button>
      )}
      {open && results.length > 0 && (
        <div className="search-results" role="listbox">
          {results.map((character) => (
            <button key={character.id} onClick={() => choose(character)} role="option">
              <span>{character.name}</span>
              <small>{character.group}</small>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
