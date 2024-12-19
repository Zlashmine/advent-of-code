import { Puzzle } from 'domain/index'

import { numbersInString, sumReducer, uniqueNumbersInString } from '@/math'
import { getMatchIndexes } from '@/utils'

import { IDigitMatch } from './types'

const validDigits = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine'
]

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    return this.solveWith(row => numbersInString(row, ''))
  }

  public solveSecond(): string {
    return this.solveWith(this.getNumbersInRow)
  }

  public getSecondExpectedResult(): string {
    return '57345'
  }

  public getFirstExpectedResult(): string {
    return '57346'
  }

  private solveWith(getNumbersFunc: (row: string) => number[]): string {
    return this.input
      .split('\n')
      .map(row => this.firstAndLastNumber(getNumbersFunc(row)).join(''))
      .reduce(sumReducer, 0)
      .toString()
  }

  private firstAndLastNumber(numbers: number[]): number[] {
    if (!numbers.length) {
      return [0, 0]
    }

    const lastNumber = numbers.length === 1 ? numbers[0] : numbers.pop()
    return [numbers[0]!, lastNumber!]
  }

  private getNumbersInRow(row: string): number[] {
    const includedDigits: IDigitMatch[] = []

    validDigits.forEach(digit => {
      getMatchIndexes(row, digit).forEach(index => {
        includedDigits.push({
          digit,
          index,
          number: validDigits.indexOf(digit) + 1
        })
      })
    })

    uniqueNumbersInString(row).forEach(number => {
      getMatchIndexes(row, number.toString()).forEach(index => {
        includedDigits.push({
          digit: validDigits[number - 1],
          index,
          number
        })
      })
    })

    return includedDigits
      .sort((a, b) => a.index - b.index)
      .map(item => item.number)
  }
}
