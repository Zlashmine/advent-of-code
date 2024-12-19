import { Puzzle } from 'domain/index'

import { numbersInStrings, sumReducer } from '@/math'
import { findMiddleElementInArray, isAfter, isBefore } from '@/utils'

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const { rules, pages } = this.parseInput(this.input)

    return pages
      .filter(page => !this.hasIncorrectOrder(page, rules))
      .reduce((acc, page) => acc + (findMiddleElementInArray(page) || 0), 0)
      .toString()
  }

  public async solveSecond(): Promise<string> {
    const { rules, pages } = this.parseInput(this.input)

    return this.orderPages(
      pages.filter(page => this.hasIncorrectOrder(page, rules)),
      rules
    )
      .map(page => findMiddleElementInArray(page) || 0)
      .reduce(sumReducer, 0)
      .toString()
  }

  public getFirstExpectedResult(): string {
    return '5129'
  }

  public getSecondExpectedResult(): string {
    return '4077'
  }

  private hasIncorrectOrder(page: number[], rules: number[][]): boolean {
    return rules
      .filter(rule => rule.every(r => page.includes(r)))
      .some(([a, b]) => !isBefore(a, b, page) || !isAfter(b, a, page))
  }

  private orderPages(pages: number[][], rules: number[][]): number[][] {
    return pages.map(page =>
      page.sort((a, b) => {
        for (const [left, right] of rules) {
          if (left === a && right === b) return 1
          if (left === b && right === a) return -1
        }
        return 0
      })
    )
  }

  private parseInput(input: string): { rules: number[][]; pages: number[][] } {
    const delimiters = ['|', ','] as const

    const [rules, pages] = input
      .split('\n\n')
      .map(section => section.split('\n'))
      .map((numbersString, index) =>
        numbersInStrings(numbersString, delimiters[index])
      )

    if (!rules || !pages) {
      throw new Error('Invalid input')
    }

    return {
      rules,
      pages
    }
  }
}
