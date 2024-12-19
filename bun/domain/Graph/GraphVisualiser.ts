import { Graph } from './Graph'

export class GraphVisualiser<T> {
  private readonly graph: Graph<T>

  constructor(graph: Graph<T>) {
    this.graph = graph
  }

  public visualise(func: (graph: Graph<T>, node: T) => string): string {
    let visualisation = ''

    this.graph.getNodes().forEach(node => {
      visualisation += func(this.graph, node)
    })

    console.log(visualisation)
    return visualisation
  }
}
