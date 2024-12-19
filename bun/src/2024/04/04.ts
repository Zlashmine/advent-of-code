import { Vector2 } from 'app/type'
import { Grid, Puzzle } from 'domain/index'

import VectorUtils from '@/vectors'

const DIRECTIONS = Object.values(VectorUtils.DIRECTIONS) as Vector2[]

const targetWord = 'XMAS'

export default class ConcretePuzzle extends Puzzle {
  private grid!: Grid<string>

  public solveFirst(): string {
    let hits = 0

    this.grid = new Grid<string>(this.input)
    this.grid.forEach((_, [x, y]) => {
      hits += DIRECTIONS.filter(direction =>
        this.hasMatch(y, x, direction)
      ).length
    })

    return hits.toString()
  }

  public solveSecond(): string {
    return '0'
  }

  public getFirstExpectedResult(): string {
    return '2642'
  }

  public getSecondExpectedResult(): string {
    return '0'
  }

  private hasMatch(y: number, x: number, [dx, dy]: Vector2): boolean {
    for (let i = 0; i < targetWord.length; i++) {
      const newVector = [x + i * dx, y + i * dy] as Vector2

      if (
        this.grid.isOutOfBounds(newVector) ||
        this.grid.get(newVector) !== targetWord[i]
      ) {
        return false
      }
    }

    return true
  }
}
