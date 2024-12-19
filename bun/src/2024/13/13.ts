import { Puzzle } from 'domain/index'

import { Machine } from './types'

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    return this.parseInput()
      .reduce((acc, machine) => acc + this.countWithLoops(machine), 0)
      .toString()
  }

  public solveSecond(): string {
    return '0'
  }

  private countWithLoops({ buttonA, buttonB, target }: Machine): number {
    const [ax, ay] = buttonA
    const [bx, by] = buttonB
    const [px, py] = target

    for (let a = 0; a <= 100; a++) {
      for (let b = 0; b <= 100; b++) {
        if (a * ax + b * bx === px && a * ay + b * by === py) {
          return 3 * a + b
        }
      }
    }

    return 0
  }

  private parseInput(): Machine[] {
    return this.input.split('\n\n').map(part => {
      const [buttonA, buttonB, target] = part.split('\n').map(line =>
        line
          .split(line.includes('Prize') ? '=' : ':')
          .map(part =>
            part
              .replace('Y', '')
              .replace('X', '')
              .replaceAll('+', '')
              .replaceAll(',', '')
              .trim()
              .split(' ')
              .map(Number)
              .filter(Boolean)
          )
          .filter(p => p.length)
          .flat()
      )

      if (!buttonA || !buttonB || !target) {
        throw new Error('Invalid input')
      }

      return {
        buttonA,
        buttonB,
        target
      } as Machine
    })
  }

  public getFirstExpectedResult(): string {
    return '29522'
  }

  public getSecondExpectedResult(): string {
    return '0'
  }
}
