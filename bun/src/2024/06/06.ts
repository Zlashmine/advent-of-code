import { Vector2 } from 'app/type'
import { Puzzle } from 'domain/index'

import VectorUtils from '@/vectors'

import { PositionHandler, PositionHandlerFunc } from './types'

const OBSTACLE = '#'
export const GUARD = '^'

const DIRECTIONS: Vector2[] = [
  VectorUtils.DIRECTIONS.up,
  VectorUtils.DIRECTIONS.right,
  VectorUtils.DIRECTIONS.down,
  VectorUtils.DIRECTIONS.left
] as const

const positionRecorder = (func: PositionHandlerFunc): PositionHandler => {
  const visitedPoints: Set<string> = new Set()
  let previousPoint: string | undefined = undefined

  return {
    onPositionVisited: (x: number, y: number): boolean => {
      const point = `${x},${y}`
      const previous = previousPoint

      visitedPoints.add(point)

      previousPoint = point
      return func(point, previous!)
    },
    visitedPoints
  }
}

export default class ConcretePuzzle extends Puzzle {
  protected grid: string[][] = []

  public solveFirst(): string {
    const { vector } = this.createGrid()
    const { visitedPoints, onPositionVisited } = positionRecorder(() => false)

    this.calculatePathFrom(vector, onPositionVisited)

    return visitedPoints.size.toString()
  }

  public async solveSecond(): Promise<string> {
    let totalLoops = 0

    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y]!.length; x++) {
        if (this.grid[y]![x] === GUARD) {
          continue
        }

        this.runWithObstruction([x, y]) && totalLoops++
      }
    }

    return totalLoops.toString()
  }

  public getFirstExpectedResult(): string {
    return '5331'
  }

  public getSecondExpectedResult(): string {
    return '1812'
  }

  public runWithObstruction(obstructionPoint: Vector2): boolean {
    let hasLoop = false
    const positionOriginMap = new Map<string, string[]>()

    const { vector } = this.createGrid(obstructionPoint)
    const { onPositionVisited } = positionRecorder((point, previousPoint) => {
      const points = positionOriginMap.get(point) || []

      if (!points.length) {
        positionOriginMap.set(point, [previousPoint])
        return false
      }

      positionOriginMap.set(point, [...points, previousPoint])

      return (hasLoop = points.includes(previousPoint))
    })

    this.calculatePathFrom(vector, onPositionVisited)

    return hasLoop
  }

  protected createGrid(obstruction?: Vector2 | undefined): {
    vector: Vector2
  } {
    this.grid = this.input
      .trim()
      .split('\n')
      .map(row => row.split(''))

    if (obstruction) {
      this.grid[obstruction[1]]![obstruction[0]] = OBSTACLE
    }

    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y]!.length; x++) {
        if (this.grid[y]![x] === GUARD) {
          return { vector: [x, y] }
        }
      }
    }

    return { vector: [0, 0] }
  }

  private calculatePathFrom(
    vector: Vector2,
    onPositionVisited: PositionHandler['onPositionVisited']
  ): void {
    let directionCounter = 0

    while (true) {
      const newPosition = this.translateDirection(
        vector[0],
        vector[1],
        DIRECTIONS[directionCounter]!,
        onPositionVisited
      )

      if (!newPosition) {
        break
      }

      directionCounter = (directionCounter + 1) % DIRECTIONS.length
      vector = newPosition
    }
  }

  private translateDirection(
    x: number,
    y: number,
    [xDirection, yDirection]: Vector2,
    onPositionVisited: PositionHandler['onPositionVisited']
  ): Vector2 | undefined {
    let vector: Vector2 = [x, y]

    if (xDirection === undefined || yDirection === undefined) {
      return vector
    }

    while (true) {
      x += xDirection
      y += yDirection

      if (this.grid[y] === undefined || this.grid[y]![x] === undefined) {
        onPositionVisited(x, y)
        return undefined
      }

      if (this.grid[y]![x] === OBSTACLE) {
        return vector
      }

      vector = [x, y]

      if (onPositionVisited(x, y)) {
        return undefined
      }
    }
  }
}
