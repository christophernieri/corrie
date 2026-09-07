import { TYPE_META, type RelationshipType } from '../data/types'

interface LegendProps {
  presentTypes: RelationshipType[]
  enabledTypes: Set<RelationshipType>
  onToggle: (type: RelationshipType) => void
  onShowAll: () => void
}

export default function Legend({ presentTypes, enabledTypes, onToggle, onShowAll }: LegendProps) {
  return (
    <details className="legend">
      <summary>Relationship key</summary>
      <div className="legend-body">
        {presentTypes.map((type) => {
          const meta = TYPE_META[type]
          const enabled = enabledTypes.has(type)
          return (
            <button
              key={type}
              className={enabled ? 'is-enabled' : ''}
              onClick={() => onToggle(type)}
              aria-pressed={enabled}
            >
              <svg width="34" height="10" aria-hidden="true">
                <line
                  x1="1"
                  y1="5"
                  x2="33"
                  y2="5"
                  stroke={meta.color}
                  strokeWidth={meta.width}
                  strokeDasharray={meta.dash}
                />
              </svg>
              <span>{meta.label}</span>
            </button>
          )
        })}
        <button className="show-all" onClick={onShowAll}>Show all</button>
      </div>
    </details>
  )
}
