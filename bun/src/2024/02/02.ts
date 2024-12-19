import { isBetween } from 'app/utils'
import { Puzzle } from 'domain/index'

const isSafeChange = (diff: number): boolean =>
  isBetween(Math.abs(diff), [1, 3])

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const rows = this.getRows()

    return rows.filter(this.isRowSafe).length.toString()
  }

  public solveSecond(): string {
    const rows = this.getRows()

    rows
      .filter(row => !this.isRowSafe(row))
      .forEach((row, index) => {
        for (let i = 0; i < row.length; i++) {
          const newRow = row.removeByIndex(i)

          if (this.isRowSafe(newRow)) {
            rows[index]! = newRow
            break
          }
        }
      })

    return rows.filter(this.isRowSafe).length.toString()
  }

  public getFirstExpectedResult(): string {
    return '332'
  }

  public getSecondExpectedResult(): string {
    return '398'
  }

  public getRows(): number[][] {
    return this.input.split('\n').map(row => row.split(' ').map(Number))
  }

  public isRowSafe(row: number[]): boolean {
    const directionTypes: Record<number, number> = {}

    const isSafe = row.every((value, j) => {
      const next = row[j + 1]

      if (next === undefined) {
        return true
      }

      next - value >= 0 ? directionTypes[1]++ : directionTypes[-1]++

      return isSafeChange(next - value)
    })

    return isSafe && Object.keys(directionTypes).length === 1
  }
}
