import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  type SimulationNodeDatum,
} from 'd3-force'
import type { Character, Group, Relationship } from '../data/types'

export interface GraphNode extends SimulationNodeDatum, Character {
  x: number
  y: number
}

export interface GraphLink {
  source: string | GraphNode
  target: string | GraphNode
}

const GROUP_ORDER: Group[] = [
  'Barlow', 'Baldwin', 'Platt', 'McDonald', 'Duckworth',
  'Webster', 'Battersby', 'Cropper', 'Rovers', 'Peacock',
  'Alahan', 'Grimshaw', 'Harris', 'Nugent', 'Other',
]

function groupCentres(radius = 900) {
  return new Map(
    GROUP_ORDER.map((group, index) => {
      const angle = (index / GROUP_ORDER.length) * Math.PI * 2 - Math.PI / 2
      return [group, { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius }] as const
    }),
  )
}

/** Runs a deterministic force simulation to completion. */
export function calculateLayout(
  characters: Character[],
  relationships: Relationship[],
): GraphNode[] {
  const centres = groupCentres()
  const nodes: GraphNode[] = characters.map((character, index) => {
    const centre = centres.get(character.group)!
    const angle = index * 2.399963229728653
    return {
      ...character,
      x: centre.x + Math.cos(angle) * 120,
      y: centre.y + Math.sin(angle) * 120,
    }
  })

  const links: GraphLink[] = relationships.map(({ source, target }) => ({ source, target }))
  const simulation = forceSimulation(nodes)
    .randomSource(() => 0.42)
    .force(
      'link',
      forceLink<GraphNode, GraphLink>(links)
        .id((node) => node.id)
        .distance((link) => {
          const a = typeof link.source === 'string' ? undefined : link.source
          const b = typeof link.target === 'string' ? undefined : link.target
          return a?.group === b?.group ? 145 : 230
        })
        .strength(0.28),
    )
    .force('charge', forceManyBody().strength(-580).distanceMax(700))
    .force('collision', forceCollide<GraphNode>(64).strength(0.95))
    .force('centre', forceCenter(0, 0).strength(0.03))
    .force('groupX', forceX<GraphNode>((node) => centres.get(node.group)!.x).strength(0.075))
    .force('groupY', forceY<GraphNode>((node) => centres.get(node.group)!.y).strength(0.075))
    .stop()

  for (let i = 0; i < 420; i++) simulation.tick()
  return nodes
}
