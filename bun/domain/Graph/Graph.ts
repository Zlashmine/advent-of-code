export type GraphNode<T> = T

export class Graph<T> {
  protected adjacencyList: Map<GraphNode<T>, Set<GraphNode<T>>>

  constructor() {
    this.adjacencyList = new Map()
  }

  _hasNode(node: GraphNode<T>): boolean {
    return this.adjacencyList.has(node)
  }

  addNodeIfMissing(node: GraphNode<T>): boolean {
    if (!this._hasNode(node)) {
      this.adjacencyList.set(node, new Set())
      return true
    }

    return false
  }

  addEdge(
    node1: GraphNode<T>,
    node2: GraphNode<T>,
    directed: boolean = false
  ): void {
    this.addNodeIfMissing(node1)
    this.addNodeIfMissing(node2)

    this.adjacencyList.get(node1)?.add(node2)

    if (!directed) {
      this.adjacencyList.get(node2)?.add(node1)
    }
  }

  removeNode(node: GraphNode<T>): void {
    if (this._hasNode(node)) {
      this.adjacencyList.delete(node)

      for (const neighbors of this.adjacencyList.values()) {
        neighbors.delete(node)
      }
    }
  }

  removeEdge(
    node1: GraphNode<T>,
    node2: GraphNode<T>,
    directed: boolean = false
  ): void {
    this.adjacencyList.get(node1)?.delete(node2)

    if (!directed) {
      this.adjacencyList.get(node2)?.delete(node1)
    }
  }

  getNeighbors(node: GraphNode<T>): GraphNode<T>[] {
    return Array.from(this.adjacencyList.get(node) || [])
  }

  getNodes(): GraphNode<T>[] {
    return Array.from(this.adjacencyList.keys())
  }

  hasEdge(node1: GraphNode<T>, node2: GraphNode<T>): boolean {
    return this.adjacencyList.get(node1)?.has(node2) || false
  }

  depthFirstTraversal(
    start: GraphNode<T>,
    visited = new Set<GraphNode<T>>(),
    result: GraphNode<T>[] = []
  ): GraphNode<T>[] {
    if (!this.adjacencyList.has(start) || visited.has(start)) {
      return result
    }

    visited.add(start)
    result.push(start)

    for (const neighbor of this.getNeighbors(start)) {
      this.depthFirstTraversal(neighbor, visited, result)
    }

    return result
  }

  breadthFirstTraversal(start: GraphNode<T>): GraphNode<T>[] {
    if (!this.adjacencyList.has(start)) {
      return []
    }

    const visited = new Set<GraphNode<T>>()
    const result: GraphNode<T>[] = []
    const queue: GraphNode<T>[] = [start]

    while (queue.length > 0) {
      const current = queue.shift()!

      if (!visited.has(current)) {
        visited.add(current)
        result.push(current)

        for (const neighbor of this.getNeighbors(current)) {
          queue.push(neighbor)
        }
      }
    }

    return result
  }
}
