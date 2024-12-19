import { Vector2 } from 'app/type'

import VectorUtils from '@/vectors'

import { Cell } from './Cell'
import { Grid } from './Grid'

// TODO: Gör AStar till en enskild klass som tar in ett inteface
// inteface INearby<T> {
//   getNeighbours(position: Vector2): T[]
//   getAll (): T[]
// }
//
// class AStar<T> {
//   constructor(private nearby: INearby<T>) {}
//   findShortestPath(start: Vector2, end: Vector2): Vector2[] {
//     // ...
//   }

export class AStarGrid extends Grid<Cell> {
  public static create(input: string): AStarGrid {
    const grid = new AStarGrid(input)

    new Grid<string>(input).forEach((value, vector) =>
      grid.set(vector, new Cell(value, 0, vector))
    )

    return grid
  }

  public static createFrom(width: number, height: number): AStarGrid {
    return new AStarGrid().createFrom(width, height, Cell.Empty()) as AStarGrid
  }

  private reconstructPath(
    cameFrom: Map<string, Vector2 | null>,
    current: Vector2
  ): Vector2[] {
    const path: Vector2[] = [current]
    let currentKey = VectorUtils.asString(current)

    while (cameFrom.has(currentKey) && cameFrom.get(currentKey) !== null) {
      current = cameFrom.get(currentKey)!
      currentKey = VectorUtils.asString(current)
      path.unshift(current)
    }

    return path
  }

  public findShortestPath(start: Vector2, end: Vector2): Vector2[] {
    if (this.isOutOfBounds(start) || this.isOutOfBounds(end)) {
      throw new Error('Start or end position is out of bounds.')
    }

    const openSet = new Set<string>() // Set of positions to explore
    const cameFrom = new Map<string, Vector2 | null>() // Path reconstruction map

    const gScore = new Map<string, number>() // Cost from start to this position
    const fScore = new Map<string, number>() // Estimated cost from start to goal through this position

    const startKey = VectorUtils.asString(start)
    const endKey = VectorUtils.asString(end)

    for (const cell of this.getAll()) {
      const cellKey = VectorUtils.asString(cell.position)
      gScore.set(cellKey, Infinity)
      fScore.set(cellKey, Infinity)
    }

    gScore.set(startKey, 0)
    fScore.set(startKey, VectorUtils.distanceBetween(start, end))

    openSet.add(startKey)

    while (openSet.size > 0) {
      // Get the position in openSet with the lowest fScore
      let currentKey = Array.from(openSet).reduce((lowest, key) =>
        fScore.get(key)! < fScore.get(lowest)! ? key : lowest
      )
      const currentPos = VectorUtils.fromString(currentKey)

      // If the current position is the goal, reconstruct the path
      if (currentKey === endKey) {
        return this.reconstructPath(cameFrom, currentPos)
      }

      openSet.delete(currentKey)

      const neighbors = this.getNeighbours(currentPos, [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0]
      ])

      for (const neighbor of neighbors) {
        if (neighbor.value.cost > 99) {
          continue
        }

        const neighborKey = VectorUtils.asString(neighbor.vector)
        const tentativeGScore = gScore.get(currentKey)! + neighbor.value.cost

        if (tentativeGScore < gScore.get(neighborKey)!) {
          // Update path and scores
          cameFrom.set(neighborKey, currentPos)
          gScore.set(neighborKey, tentativeGScore)
          fScore.set(
            neighborKey,
            tentativeGScore + VectorUtils.distanceBetween(neighbor.vector, end)
          )

          if (!openSet.has(neighborKey)) {
            openSet.add(neighborKey)
          }
        }
      }
    }

    // If no path is found, return an empty array
    return []
  }
}
