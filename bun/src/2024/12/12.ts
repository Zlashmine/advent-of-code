import { Vector2 } from 'app/type'
import { EnhancedMap, Grid, Puzzle } from 'domain/index'

import VectorUtils from '@/vectors'

import { PlotGraph, validDirections } from './types'

export default class ConcretePuzzle extends Puzzle {
  private grid!: Grid<string>

  private plotRegionMap: EnhancedMap<string, string> = new EnhancedMap()
  private regionGraphMap: EnhancedMap<string, PlotGraph> = new EnhancedMap()

  public solveFirst(): string {
    return this.buildGraphs()
      .reduce((acc, graph) => acc + graph.price(), 0)
      .toString()
  }

  public solveSecond(): string {
    return this.buildGraphs()
      .reduce((acc, graph) => acc + graph.priceForUniqueFaces(this.grid), 0)
      .toString()
  }

  private buildGraphs(): PlotGraph[] {
    this.plotRegionMap = new EnhancedMap()
    this.regionGraphMap = new EnhancedMap()

    this.grid = new Grid<string>(this.input)

    this.grid.forEach((value, vector) => {
      if (this.plotRegionMap.has(VectorUtils.asString(vector))) {
        return
      }

      const regionId = `${vector.toString()}:${value}`
      this.createStartPlot(regionId, vector, value)
    })

    return Array.from(this.regionGraphMap.values())
  }

  private createStartPlot(
    regionId: string,
    vector: Vector2,
    value: string
  ): void {
    const graph = new PlotGraph(regionId)

    graph.addNodeIfMissing(VectorUtils.asString(vector))

    this.regionGraphMap.set(regionId, graph)
    this.plotRegionMap.set(VectorUtils.asString(vector), regionId)

    this.connectNearbyPlots(vector, value, regionId)
  }

  private connectNearbyPlots(
    vector: Vector2,
    plotType: string,
    regionId: string
  ) {
    return this.grid
      .getNeighbours(vector, validDirections)
      .filter(
        neighbour =>
          neighbour.value === plotType &&
          !this.plotRegionMap.has(VectorUtils.asString(neighbour.vector))
      )
      .map(neighbour => {
        const currentVector = VectorUtils.asString(vector)
        const neighborVector = VectorUtils.asString(neighbour.vector)

        const graph = this.regionGraphMap.get(regionId)!

        graph.addNodeIfMissing(neighborVector)
        graph.addEdge(currentVector, neighborVector)

        this.plotRegionMap.set(neighborVector, regionId)
        this.connectNearbyPlots(neighbour.vector, plotType, regionId)
      })
  }

  public getFirstExpectedResult(): string {
    return '1456082'
  }

  public getSecondExpectedResult(): string {
    return '0'
  }
}
