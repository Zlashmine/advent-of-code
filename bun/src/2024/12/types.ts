import { Vector2 } from 'app/type'
import { Graph, Grid } from 'domain/index'

import VectorUtils from '@/vectors'

export const validDirections: Vector2[] = [
  VectorUtils.DIRECTIONS.up,
  VectorUtils.DIRECTIONS.down,
  VectorUtils.DIRECTIONS.left,
  VectorUtils.DIRECTIONS.right
] as const

export class PlotGraph extends Graph<string> {
  constructor(private regionId: string) {
    super()
  }

  public get area(): number {
    return this.getNodes().length
  }

  public get perimeter(): number {
    return this.getNodes().reduce(
      (acc, node) => acc + 4 - this.getNeighbors(node).length,
      0
    )
  }

  public sides(_grid: Grid<string>): number {
    return 0
  }

  public price(): number {
    return this.area * this.perimeter
  }

  public priceForUniqueFaces(grid: Grid<string>): number {
    return this.area * this.sides(grid)
  }

  toString(): string {
    return `${this.regionId}   area: ${this.area}   perimeter: ${this.perimeter}`
  }
}
