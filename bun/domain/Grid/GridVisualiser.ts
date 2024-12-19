import { ChalkInstance } from 'chalk'

import VectorUtils from '@/vectors'

import { Grid } from './Grid'

export class GridVisualiser<T> {
  private gridPositionColor: Map<string, ChalkInstance> = new Map()
  private gridValueColor: Map<string, ChalkInstance> = new Map()

  private valueGetter: ((e: T) => string) | undefined

  constructor(private readonly grid: Grid<T>) {}

  public static create<T>(grid: Grid<T>): GridVisualiser<T> {
    return new GridVisualiser(grid)
  }

  public setValueGetter(func: (el: T) => string): GridVisualiser<T> {
    this.valueGetter = func

    return this
  }

  public setPositionColor(
    vector: [number, number],
    color: ChalkInstance
  ): GridVisualiser<T> {
    this.gridPositionColor.set(VectorUtils.asString(vector), color)

    return this
  }

  public setValueColor(value: string, color: ChalkInstance): GridVisualiser<T> {
    this.gridValueColor.set(value, color)

    return this
  }

  public build(): string {
    let gridString = ''

    this.grid.forEach((value, vector) => {
      if (vector[0] === 0) {
        gridString += '\n'
      }

      const val = this.valueGetter ? this.valueGetter(value) : value

      const key = VectorUtils.asString(vector)

      if (this.gridPositionColor.has(key))
        gridString += this.gridPositionColor.get(key)!(val)
      else if (typeof val === 'string' && this.gridValueColor.has(val))
        gridString += this.gridValueColor.get(val)!(val)
      else gridString += val
    })

    gridString += '\n'

    process.stdout.clearLine(0)
    process.stdout.cursorTo(0)
    process.stdout.write(gridString)

    return gridString
  }
}
