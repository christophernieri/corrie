import { useEffect, useMemo, useRef, useState } from 'react'
import { select } from 'd3-selection'
import 'd3-transition'
import { zoom, zoomIdentity, type ZoomBehavior, type ZoomTransform } from 'd3-zoom'
import { calculateLayout, type GraphNode } from '../graph/layout'
import { exceededDragThreshold } from '../graph/gesture'
import { GROUP_COLORS, TYPE_META, type Character, type Relationship, type RelationshipType, type WikiInfo } from '../data/types'

interface GraphProps {
  characters: Character[]
  relationships: Relationship[]
  wiki: Record<string, WikiInfo>
  selectedId: string | null
  enabledTypes: Set<RelationshipType>
  onSelect: (id: string | null) => void
}

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
}

function endpointId(endpoint: string | GraphNode) {
  return typeof endpoint === 'string' ? endpoint : endpoint.id
}

interface DragState {
  id: string
  startClientX: number
  startClientY: number
  startNodeX: number
  startNodeY: number
  dragging: boolean
}

export default function Graph({
  characters,
  relationships,
  wiki,
  selectedId,
  enabledTypes,
  onSelect,
}: GraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const layerRef = useRef<SVGGElement>(null)
  const zoomRef = useRef<ZoomBehavior<SVGSVGElement, unknown> | null>(null)
  const transformRef = useRef<ZoomTransform>(zoomIdentity)
  const initialNodes = useMemo(
    () => calculateLayout(characters, relationships),
    [characters, relationships],
  )
  const [nodes, setNodes] = useState(initialNodes)
  const dragRef = useRef<DragState | null>(null)

  const nodeById = useMemo(() => new Map(nodes.map((node) => [node.id, node])), [nodes])
  const visibleRelationships = useMemo(
    () => relationships.filter((relationship) => enabledTypes.has(relationship.type)),
    [relationships, enabledTypes],
  )
  const neighbours = useMemo(() => {
    if (!selectedId) return new Set<string>()
    const result = new Set<string>([selectedId])
    for (const relationship of visibleRelationships) {
      if (relationship.source === selectedId) result.add(relationship.target)
      if (relationship.target === selectedId) result.add(relationship.source)
    }
    return result
  }, [selectedId, visibleRelationships])

  const pairCounts = useMemo(() => {
    const counts = new Map<string, number>()
    for (const r of visibleRelationships) {
      const key = [r.source, r.target].sort().join('|')
      counts.set(key, (counts.get(key) ?? 0) + 1)
    }
    return counts
  }, [visibleRelationships])

  const pairIndex = useMemo(() => {
    const seen = new Map<string, number>()
    return visibleRelationships.map((r) => {
      const key = [r.source, r.target].sort().join('|')
      const index = seen.get(key) ?? 0
      seen.set(key, index + 1)
      return index
    })
  }, [visibleRelationships])

  useEffect(() => {
    const svgElement = svgRef.current
    const layerElement = layerRef.current
    if (!svgElement || !layerElement) return

    const behavior = zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.18, 3.2])
      .filter((event) => {
        const target = event.target as Element
        return !target.closest?.('.graph-node') && (!event.ctrlKey || event.type === 'wheel')
      })
      .on('zoom', (event) => {
        transformRef.current = event.transform
        select(layerElement).attr('transform', event.transform.toString())
      })

    zoomRef.current = behavior
    const svg = select(svgElement).call(behavior)
    const rect = svgElement.getBoundingClientRect()
    svg.call(
      behavior.transform,
      zoomIdentity.translate(rect.width / 2, rect.height / 2).scale(0.43),
    )
    return () => {
      svg.on('.zoom', null)
    }
  }, [])

  useEffect(() => {
    if (!selectedId || !svgRef.current || !zoomRef.current) return
    const node = nodeById.get(selectedId)
    if (!node) return
    const rect = svgRef.current.getBoundingClientRect()
    const scale = Math.max(0.9, Math.min(1.6, transformRef.current.k * 1.35))
    const target = zoomIdentity
      .translate(rect.width / 2, rect.height / 2)
      .scale(scale)
      .translate(-node.x, -node.y)
    select(svgRef.current)
      .transition()
      .duration(650)
      .call(zoomRef.current.transform, target)
  }, [selectedId, nodeById])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onSelect(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onSelect])

  const pathFor = (relationship: Relationship, index: number) => {
    const source = nodeById.get(endpointId(relationship.source))
    const target = nodeById.get(endpointId(relationship.target))
    if (!source || !target) return ''
    const key = [relationship.source, relationship.target].sort().join('|')
    const count = pairCounts.get(key) ?? 1
    if (count === 1) return `M${source.x},${source.y} L${target.x},${target.y}`
    const dx = target.x - source.x
    const dy = target.y - source.y
    const length = Math.hypot(dx, dy) || 1
    const offset = (index - (count - 1) / 2) * 32
    const mx = (source.x + target.x) / 2 - (dy / length) * offset
    const my = (source.y + target.y) / 2 + (dx / length) * offset
    return `M${source.x},${source.y} Q${mx},${my} ${target.x},${target.y}`
  }

  const handlePointerDown = (event: React.PointerEvent, id: string) => {
    event.stopPropagation()
    const node = nodeById.get(id)
    if (!node) return
    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = {
      id,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startNodeX: node.x,
      startNodeY: node.y,
      dragging: false,
    }
  }

  const handlePointerMove = (event: React.PointerEvent, id: string) => {
    const drag = dragRef.current
    if (drag?.id !== id) return
    if (
      !drag.dragging &&
      !exceededDragThreshold(
        drag.startClientX,
        drag.startClientY,
        event.clientX,
        event.clientY,
      )
    ) return
    drag.dragging = true
    const transform = transformRef.current
    const x = drag.startNodeX + (event.clientX - drag.startClientX) / transform.k
    const y = drag.startNodeY + (event.clientY - drag.startClientY) / transform.k
    setNodes((current) => current.map((node) => (node.id === id ? { ...node, x, y } : node)))
  }

  const handlePointerUp = (event: React.PointerEvent, id: string) => {
    event.stopPropagation()
    const dragging = dragRef.current?.dragging
    dragRef.current = null
    if (!dragging) onSelect(id)
  }

  const handlePointerCancel = () => {
    dragRef.current = null
  }

  return (
    <svg
      ref={svgRef}
      className="graph"
      role="application"
      aria-label="Interactive Coronation Street relationship map"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onSelect(null)
      }}
    >
      <defs>
        <filter id="node-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity=".55" />
        </filter>
      </defs>
      <g ref={layerRef}>
        <g className="graph-edges">
          {visibleRelationships.map((relationship, index) => {
            const connected =
              selectedId === relationship.source || selectedId === relationship.target
            const faded = Boolean(selectedId && !connected)
            const meta = TYPE_META[relationship.type]
            const path = pathFor(relationship, pairIndex[index])
            const pathId = `edge-${index}`
            return (
              <g
                key={`${relationship.source}-${relationship.target}-${relationship.type}-${index}`}
                className={`graph-edge ${connected ? 'is-active' : ''} ${faded ? 'is-dimmed' : ''}`}
              >
                <path
                  id={pathId}
                  d={path}
                  fill="none"
                  stroke={meta.color}
                  strokeWidth={meta.width}
                  strokeDasharray={meta.dash}
                  vectorEffect="non-scaling-stroke"
                />
                {connected && (
                  <text className="edge-label" dy="-7">
                    <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
                      {meta.label}{relationship.years ? ` · ${relationship.years}` : ''}
                    </textPath>
                  </text>
                )}
              </g>
            )
          })}
        </g>

        <g className="graph-nodes">
          {nodes.map((node) => {
            const selected = selectedId === node.id
            const dimmed = Boolean(selectedId && !neighbours.has(node.id))
            const image = wiki[node.id]?.image
            return (
              <g
                key={node.id}
                className={`graph-node ${selected ? 'is-selected' : ''} ${dimmed ? 'is-dimmed' : ''}`}
                transform={`translate(${node.x},${node.y})`}
                role="button"
                tabIndex={0}
                aria-label={`Select ${node.name}`}
                onPointerDown={(event) => handlePointerDown(event, node.id)}
                onPointerMove={(event) => handlePointerMove(event, node.id)}
                onPointerUp={(event) => handlePointerUp(event, node.id)}
                onPointerCancel={handlePointerCancel}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') onSelect(node.id)
                }}
              >
                <circle className="node-shadow" r="48" filter="url(#node-shadow)" />
                <circle className="node-fill" r="45" fill="#2a2522" />
                <text className="node-initials" textAnchor="middle" dominantBaseline="central">
                  {initials(node.name)}
                </text>
                {image && (
                  <>
                    <clipPath id={`clip-${node.id}`}>
                      <circle r="43" />
                    </clipPath>
                    <image
                      href={`${import.meta.env.BASE_URL}${image}`}
                      x="-43"
                      y="-43"
                      width="86"
                      height="86"
                      preserveAspectRatio="xMidYMid slice"
                      clipPath={`url(#clip-${node.id})`}
                    />
                  </>
                )}
                <circle className="node-ring" r="46" fill="none" stroke={GROUP_COLORS[node.group]} />
                <text className="node-name" y="64" textAnchor="middle">
                  {node.name}
                </text>
              </g>
            )
          })}
        </g>
      </g>
    </svg>
  )
}
