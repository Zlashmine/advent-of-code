import { describe, expect, it } from 'bun:test'
import { Graph } from './Graph'

describe('Graph', () => {
  it('should create a graph instance', () => {
    const graph = new Graph<string>()
    expect(graph).toBeDefined()
  })

  it('should add nodes to the graph', () => {
    const graph = new Graph<string>()
    graph.addNodeIfMissing('A')
    graph.addNodeIfMissing('B')

    expect(graph.getNeighbors('A')).toEqual([])
    expect(graph.getNeighbors('B')).toEqual([])
  })

  it('should add edges to the graph (undirected)', () => {
    const graph = new Graph<string>()
    graph.addEdge('A', 'B')

    expect(graph.getNeighbors('A')).toContain('B')
    expect(graph.getNeighbors('B')).toContain('A')
  })

  it('should add edges to the graph (directed)', () => {
    const graph = new Graph<string>()
    graph.addEdge('A', 'B', true)

    expect(graph.getNeighbors('A')).toContain('B')
    expect(graph.getNeighbors('B')).not.toContain('A')
  })

  it('should remove edges (undirected)', () => {
    const graph = new Graph<string>()
    graph.addEdge('A', 'B')
    graph.removeEdge('A', 'B')

    expect(graph.getNeighbors('A')).not.toContain('B')
    expect(graph.getNeighbors('B')).not.toContain('A')
  })

  it('should remove edges (directed)', () => {
    const graph = new Graph<string>()
    graph.addEdge('A', 'B', true)
    graph.removeEdge('A', 'B', true)

    expect(graph.getNeighbors('A')).not.toContain('B')
    expect(graph.getNeighbors('B')).not.toContain('A')
  })

  it('should remove nodes', () => {
    const graph = new Graph<string>()
    graph.addEdge('A', 'B')
    graph.addEdge('B', 'C')

    graph.removeNode('B')

    expect(graph.getNeighbors('A')).not.toContain('B')
    expect(graph.getNeighbors('C')).not.toContain('B')
  })

  it('should perform depth-first traversal', () => {
    const graph = new Graph<string>()
    graph.addEdge('A', 'B')
    graph.addEdge('A', 'C')
    graph.addEdge('B', 'D')
    graph.addEdge('C', 'E')

    const result = graph.depthFirstTraversal('A')
    expect(result).toEqual(['A', 'B', 'D', 'C', 'E'])
  })

  it('should perform breadth-first traversal', () => {
    const graph = new Graph<string>()
    graph.addEdge('A', 'B')
    graph.addEdge('A', 'C')
    graph.addEdge('B', 'D')
    graph.addEdge('C', 'E')

    const result = graph.breadthFirstTraversal('A')
    expect(result).toEqual(['A', 'B', 'C', 'D', 'E'])
  })

  it('should return correct neighbors', () => {
    const graph = new Graph<string>()
    graph.addEdge('A', 'B')
    graph.addEdge('A', 'C')

    const neighbors = graph.getNeighbors('A')
    expect(neighbors).toEqual(expect.arrayContaining(['B', 'C']))
  })

  it('should return true for existing edges', () => {
    const graph = new Graph<string>()
    graph.addEdge('A', 'B')

    expect(graph.hasEdge('A', 'B')).toBe(true)
    expect(graph.hasEdge('B', 'A')).toBe(true) // Undirected
  })

  it('should return false for non-existent edges', () => {
    const graph = new Graph<string>()
    graph.addEdge('A', 'B')

    expect(graph.hasEdge('A', 'C')).toBe(false)
    expect(graph.hasEdge('C', 'B')).toBe(false)
  })

  it('should handle an empty graph gracefully', () => {
    const graph = new Graph<string>()

    expect(graph.getNeighbors('A')).toEqual([])
    expect(graph.hasEdge('A', 'B')).toBe(false)
    expect(graph.depthFirstTraversal('A')).toEqual([])
    expect(graph.breadthFirstTraversal('A')).toEqual([])
  })

  it('should handle adding duplicate nodes gracefully', () => {
    const graph = new Graph<string>()
    graph.addNodeIfMissing('A')
    graph.addNodeIfMissing('A')

    graph.addEdge('A', 'B')

    expect(graph.getNeighbors('A')).toContain('B')
  })

  it('should handle self-loops', () => {
    const graph = new Graph<string>()
    graph.addEdge('A', 'A')

    expect(graph.hasEdge('A', 'A')).toBe(true)
    expect(graph.getNeighbors('A')).toContain('A')

    graph.removeEdge('A', 'A')
    expect(graph.hasEdge('A', 'A')).toBe(false)
  })
})
