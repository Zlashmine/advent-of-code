import { Puzzle } from 'domain/index'

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    return this.solveWith('end')
  }

  public solveSecond(): string {
    return this.solveWith('start')
  }

  public getFirstExpectedResult(): string {
    return '1992273652'
  }

  public getSecondExpectedResult(): string {
    return '1012'
  }

  public solveWith(direction: 'start' | 'end'): string {
    const isStartDirection = direction === 'start'

    return this.input
      .split('\n')
      .reduce((acc: number, row) => {
        const historyLists: number[][] = [row.split(' ').map(Number)]

        while (true) {
          const newRow: number[] = []
          const previousRow: number[] = historyLists.last()

          if (!previousRow) {
            break
          }

          for (let i = 0; i < previousRow.length - 1; i++) {
            newRow.push(previousRow[i + 1]! - previousRow[i]!)
          }

          historyLists.push(newRow)
          if (previousRow.every(num => num === 0)) {
            break
          }
        }

        for (let i = historyLists.length - 1; i >= 0; i--) {
          const currentRow = historyLists[i]
          const previousRow = historyLists[i + 1]

          if (i === historyLists.length - 1) {
            historyLists[i] = historyLists[i]!.addAtStartElseEnd(
              0,
              isStartDirection
            )
            continue
          }

          const numberToExtrapolateBy: number =
            previousRow!.getFirstElseLast(isStartDirection)

          const resultingNumber = isStartDirection
            ? currentRow!.shift()! - numberToExtrapolateBy
            : currentRow!.pop()! + numberToExtrapolateBy

          historyLists[i] = historyLists[i]!.addAtStartElseEnd(
            resultingNumber,
            isStartDirection
          )
        }

        acc += historyLists[0]!.getFirstElseLast(isStartDirection)
        return acc
      }, 0)
      .toString()
  }
}
