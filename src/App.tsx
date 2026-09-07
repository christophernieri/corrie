import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import Graph from './components/Graph'
import Legend from './components/Legend'
import Search from './components/Search'
import Sidebar from './components/Sidebar'
import { characterById, characters } from './data/characters'
import { relationships } from './data/relationships'
import wikiData from './data/wiki.json'
import { TYPE_META, type RelationshipType, type WikiInfo } from './data/types'

const wiki = wikiData as Record<string, WikiInfo>
const presentTypes = (Object.keys(TYPE_META) as RelationshipType[]).filter((type) =>
  relationships.some((relationship) => relationship.type === type),
)

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [enabledTypes, setEnabledTypes] = useState<Set<RelationshipType>>(
    () => new Set(presentTypes),
  )
  const selected = selectedId ? characterById.get(selectedId) : undefined
  const romanticCount = useMemo(
    () =>
      relationships.filter((relationship) =>
        ['married', 'engaged', 'affair', 'relationship', 'fling'].includes(relationship.type),
      ).length,
    [],
  )

  const toggleType = (type: RelationshipType) => {
    setEnabledTypes((current) => {
      const next = new Set(current)
      if (next.has(type)) next.delete(type)
      else next.add(type)
      return next
    })
  }

  return (
    <main className="app">
      <div className="map-chrome">
        <header className="masthead">
          <div className="brand">
            <span className="brand-eyebrow">The cobbles, connected</span>
            <h1>Corrie <i>’98–’04</i></h1>
          </div>
          <Search characters={characters} onSelect={setSelectedId} />
        </header>

        <Graph
          characters={characters}
          relationships={relationships}
          wiki={wiki}
          selectedId={selectedId}
          enabledTypes={enabledTypes}
          onSelect={setSelectedId}
        />

        <div className="map-help">
          <strong>Drag to explore</strong>
          <span>Scroll or pinch to zoom · Tap a face to untangle the drama</span>
        </div>

        <div className="map-stats" aria-label="Map statistics">
          <span><strong>{characters.length}</strong> characters</span>
          <span><strong>{relationships.length}</strong> connections</span>
          <span><strong>{romanticCount}</strong> romances</span>
        </div>

        <Legend
          presentTypes={presentTypes}
          enabledTypes={enabledTypes}
          onToggle={toggleType}
          onShowAll={() => setEnabledTypes(new Set(presentTypes))}
        />
      </div>

      {selected && createPortal(
        <>
          <button className="sidebar-scrim" onClick={() => setSelectedId(null)} aria-label="Close" />
          <Sidebar
            character={selected}
            wiki={wiki[selected.id]}
            relationships={relationships}
            onSelect={setSelectedId}
            onClose={() => setSelectedId(null)}
          />
        </>,
        document.body,
      )}
    </main>
  )
}
