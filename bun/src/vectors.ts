import { Vector2 } from 'app/type'

export type Directions = {
  up: Vector2
  down: Vector2
  left: Vector2
  right: Vector2
  upLeft: Vector2
  upRight: Vector2
  downLeft: Vector2
  downRight: Vector2
}

export default class VectorUtils {
  private constructor() {}

  public static add(a: Vector2, b: Vector2): Vector2 {
    return [a[0] + b[0], a[1] + b[1]]
  }

  public static subtract(a: Vector2, b: Vector2): Vector2 {
    return [a[0] - b[0], a[1] - b[1]]
  }

  public static multiply(vector: Vector2, scalar: number): Vector2 {
    return [vector[0] * scalar, vector[1] * scalar]
  }

  public static divide(vector: Vector2, scalar: number): Vector2 {
    return [vector[0] / scalar, vector[1] / scalar]
  }

  public static directionTo(a: Vector2, b: Vector2): Vector2 {
    return [b[0] - a[0], b[1] - a[1]]
  }

  public static distanceBetween(a: Vector2, b: Vector2): number {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])
  }

  public static isSame(a: Vector2, b: Vector2): boolean {
    return a[0] === b[0] && a[1] === b[1]
  }

  public static asString(vector: Vector2): string {
    return vector.join(',')
  }

  public static fromString(string: string): Vector2 {
    return string.split(',').map(Number) as Vector2
  }

  public static isOutOfBounds(
    vector: Vector2,
    width: number,
    height: number
  ): boolean {
    return (
      vector[0] < 0 ||
      vector[1] < 0 ||
      vector[0] >= width ||
      vector[1] >= height
    )
  }

  public static isInsideGrid<T>(vector: Vector2, grid: T[][]): boolean {
    return !VectorUtils.isOutOfBounds(vector, grid[0]!.length, grid.length)
  }

  public static readonly DIRECTIONS: {
    up: Vector2
    down: Vector2
    left: Vector2
    right: Vector2
    upLeft: Vector2
    upRight: Vector2
    downLeft: Vector2
    downRight: Vector2
  } = {
    up: [0, -1],
    down: [0, 1],
    left: [-1, 0],
    right: [1, 0],
    upLeft: [-1, -1],
    upRight: [1, -1],
    downLeft: [-1, 1],
    downRight: [1, 1]
  } as const
}
