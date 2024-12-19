import { sumReducer } from '@/math'
import { Puzzle } from 'domain/index'

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const [firstList, secondList] = this.createLists().map(list =>
      list.sort((a, b) => a - b)
    )

    if (!firstList?.length || !secondList?.length) {
      return '0'
    }

    return firstList
      .reduce(
        (acc, number, index) => acc + Math.abs(number - secondList[index]!),
        0
      )
      .toString()
  }

  public solveSecond(): string {
    const [firstList, secondList] = this.createLists()

    if (!firstList?.length || !secondList?.length) {
      return '0'
    }

    return firstList
      .map(
        number =>
          secondList.filter(secondNumber => secondNumber === number).length *
          number
      )
      .reduce(sumReducer, 0)
      .toString()
  }

  public getFirstExpectedResult(): string {
    return '2196996'
  }

  public getSecondExpectedResult(): string {
    return '23655822'
  }

  public createLists(): readonly [number[], number[]] {
    const firstList: number[] = []
    const secondList: number[] = []

    this.input.split('\n').map(line => {
      const [first, second] = line.split('   ')

      firstList.push(parseInt(first!))
      secondList.push(parseInt(second!))
    })

    return [firstList, secondList] as const
  }
}
