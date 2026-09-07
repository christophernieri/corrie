import { characterById } from '../data/characters'
import { TYPE_META, type Character, type Relationship, type WikiInfo } from '../data/types'

interface SidebarProps {
  character: Character
  wiki?: WikiInfo
  relationships: Relationship[]
  onSelect: (id: string) => void
  onClose: () => void
}

const TYPE_ORDER = [
  'married', 'engaged', 'affair', 'relationship', 'fling',
  'parent', 'sibling', 'killed', 'attempted-murder', 'feud',
] as const

function initials(name: string) {
  return name.split(' ').map((part) => part[0]).slice(0, 2).join('')
}

export default function Sidebar({
  character,
  wiki,
  relationships,
  onSelect,
  onClose,
}: SidebarProps) {
  const related = relationships.filter(
    (relationship) =>
      relationship.source === character.id || relationship.target === character.id,
  )

  return (
    <aside className="sidebar" aria-label={`${character.name} details`}>
      <button className="sidebar-close" onClick={onClose} aria-label="Close details">×</button>
      <div className="sidebar-handle" aria-hidden="true" />
      <header className="profile">
        <div className="profile-avatar">
          <span>{initials(character.name)}</span>
          {wiki?.image && <img src={`/${wiki.image}`} alt="" />}
        </div>
        <div>
          <p className="profile-kicker">{character.group} circle</p>
          <h2>{character.name}</h2>
          {wiki?.portrayer && <p className="portrayer">Played by {wiki.portrayer}</p>}
          {wiki?.years && <p className="years">On the cobbles: {wiki.years}</p>}
        </div>
      </header>

      {character.blurb && <p className="profile-blurb">{character.blurb}</p>}

      <div className="relationship-list">
        <div className="relationship-heading">
          <h3>Connections</h3>
          <span>{related.length}</span>
        </div>
        {TYPE_ORDER.map((type) => {
          const entries = related.filter((relationship) => relationship.type === type)
          if (!entries.length) return null
          const meta = TYPE_META[type]
          return (
            <section className="relationship-group" key={type}>
              <h4 style={{ color: meta.color }}>{meta.label}</h4>
              {entries.map((relationship, index) => {
                const otherId =
                  relationship.source === character.id
                    ? relationship.target
                    : relationship.source
                const other = characterById.get(otherId)
                if (!other) return null
                return (
                  <article key={`${otherId}-${index}`}>
                    <button className="relationship-person" onClick={() => onSelect(otherId)}>
                      {other.name}
                      <span aria-hidden="true">→</span>
                    </button>
                    {relationship.years && <time>{relationship.years}</time>}
                    <p>{relationship.note}</p>
                    {relationship.wiki && (
                      <a
                        href={`https://en.wikipedia.org/wiki/${encodeURIComponent(relationship.wiki.replace(/ /g, '_'))}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Source: Wikipedia ↗
                      </a>
                    )}
                  </article>
                )
              })}
            </section>
          )
        })}
      </div>

      {wiki?.url && (
        <a className="wikipedia-link" href={wiki.url} target="_blank" rel="noreferrer">
          Read {character.name}’s Wikipedia page ↗
        </a>
      )}
    </aside>
  )
}
