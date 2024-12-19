import { Vector2 } from 'app/type'

import GridUtils from '@/grid'
import VectorUtils from '@/vectors'
import { Point } from './types'
import { OUT_OF_BOUNDS } from 'domain/constants'

export class Grid<T> {
  protected grid: T[][]
  protected readonly keyPointsMap: Map<string, T[]> = new Map()

  constructor(input?: string) {
    if (!input) {
      this.grid = []
      return
    }

    this.grid = GridUtils.createGrid<T>(input)
  }

  public get width(): number {
    return this.grid[0]!.length
  }

  public get height(): number {
    return this.grid.length
  }

  public createFrom(width: number, height: number, value: T): Grid<T> {
    this.grid = GridUtils.createGridWithSize<T>(width, height)

    this.grid.forEach((row, y) =>
      row.forEach((_, x) => this.set([x, y], value))
    )

    return this
  }

  public forEach(func: (value: T, vector: Vector2) => void): Grid<T> {
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y]!.length; x++) {
        func(this.grid[y]![x]!, [x, y])
      }
    }

    return this
  }

  public filter(func: (value: T, vector: Vector2) => boolean): Point<T>[] {
    const points: Point<T>[] = []

    this.forEach((value, vector) => {
      if (func(value, vector)) {
        points.push({ vector, value })
      }
    })

    return points
  }

  public findFirst(
    func: (value: T, vector: Vector2) => boolean
  ): Point<T> | null {
    return this.filter(func)[0] || null
  }

  public get(vector: Vector2): T {
    if (this.isOutOfBounds(vector)) {
      throw new Error(OUT_OF_BOUNDS)
    }

    return this.grid[vector[1]!]![vector[0]!]!
  }

  public getAll(): T[] {
    return this.grid.flat()
  }

  public getOrNull(vector: Vector2): T | null {
    if (this.isOutOfBounds(vector)) {
      return null
    }

    return this.grid[vector[1]!]![vector[0]!]!
  }

  public getAllInRow(y: number): T[] {
    return this.grid[y]!
  }

  public getAllInColumn(x: number): T[] {
    if (x < 0 || x >= this.grid[0]!.length) {
      throw new Error(OUT_OF_BOUNDS)
    }

    return this.grid.map(row => row[x]!)
  }

  public set(vector: Vector2, value: T): T {
    if (this.isOutOfBounds(vector)) {
      throw new Error(OUT_OF_BOUNDS)
    }

    this.grid[vector[1]]![vector[0]] = value

    return value
  }

  public setKeyPoint(vector: Vector2, value: T): void {
    const key = VectorUtils.asString(vector)
    const keyPoints = this.keyPointsMap.get(key) || []

    this.keyPointsMap.set(key, [...keyPoints, value])
  }

  public getKeyPoint(vector: Vector2): T[] {
    return this.keyPointsMap.get(VectorUtils.asString(vector)) || []
  }

  public getKeyPoints(): Map<string, T[]> {
    return this.keyPointsMap
  }

  public getNeighbours(vector: Vector2, directions: Vector2[]): Point<T>[] {
    return directions
      .map(direction => {
        const nearbyVector = VectorUtils.add(vector, direction)

        return {
          vector: nearbyVector,
          value: this.getOrNull(nearbyVector)
        }
      })
      .filter(point => point?.value != null)! as Point<T>[]
  }

  public getNInDirection(
    vector: Vector2,
    direction: Vector2,
    steps: number,
    getLastInBound = false
  ): T {
    let currentVector = vector

    for (let i = 0; i < steps; i++) {
      currentVector = VectorUtils.add(currentVector, direction)

      if (this.isOutOfBounds(currentVector)) {
        if (getLastInBound) {
          return this.get(VectorUtils.subtract(currentVector, direction))
        }

        throw new Error(OUT_OF_BOUNDS)
      }
    }

    return this.get(currentVector)
  }

  public getInDirection(vector: Vector2, direction: Vector2): T | null {
    return this.getOrNull(VectorUtils.add(vector, direction))
  }

  public isOutOfBounds(vector: Vector2): boolean {
    return VectorUtils.isOutOfBounds(
      vector,
      this.grid[0]!.length,
      this.grid.length
    )
  }

  public isInsideGrid(vector: Vector2): boolean {
    return !VectorUtils.isOutOfBounds(
      vector,
      this.grid[0]!.length,
      this.grid.length
    )
  }
}
