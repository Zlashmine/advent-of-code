import { Vector2 } from 'app/type'
import { Grid, NumberMap, Puzzle } from 'domain/index'

import { DIRECTIONS, OnTrailCompletedFunc } from './types'
import VectorUtils from '@/vectors'

export default class ConcretePuzzle extends Puzzle {
  private grid!: Grid<string>

  public solveFirst(): string {
    const scoreMap: NumberMap<string> = new NumberMap()

    this.calculateTrails(key => scoreMap.increment(key))

    return scoreMap.size.toString()
  }

  public async solveSecond(): Promise<string> {
    let validTrailsCount = 0

    this.calculateTrails(() => validTrailsCount++)

    return validTrailsCount.toString()
  }

  public calculateTrails(func: OnTrailCompletedFunc): void {
    this.grid = new Grid<string>(this.input)
    this.grid
      .filter(value => value === '0')
      .forEach(({ vector }) => this.goToPoint(vector, vector, 0, func))
  }

  private goToPoint(
    start: Vector2,
    current: Vector2,
    height: number,
    func: OnTrailCompletedFunc
  ): void {
    if (height === 9) {
      func(`${VectorUtils.asString(start)}-${VectorUtils.asString(current)}`)
      return
    }

    this.grid
      .getNeighbours(current, DIRECTIONS)
      .filter(({ value }) => Number(value) === height + 1)
      .forEach(({ vector }) => this.goToPoint(start, vector, height + 1, func))
  }

  public getFirstExpectedResult(): string {
    return '778'
  }

  public getSecondExpectedResult(): string {
    return '1925'
  }
}
