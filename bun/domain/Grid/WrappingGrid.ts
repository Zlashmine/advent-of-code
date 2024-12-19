import { Vector2 } from 'app/type'

import { Grid } from './Grid'

export class WrappingGrid<T> extends Grid<T> {
  private wrap(value: number, max: number): number {
    return ((value % max) + max) % max
  }

  public translate(vectorA: Vector2, vectorB: Vector2): Vector2 {
    return [
      this.wrap(vectorA[0] + vectorB[0], this.width),
      this.wrap(vectorA[1] + vectorB[1], this.height)
    ]
  }
}
