import { Puzzle } from 'domain/index'

import { Instruction } from './types'

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const res = this.input.matchAll(/mul\((\d+),(\d+)\)/g)

    let total = 0
    for (const [_, b, c] of res) {
      total += Number(b) * Number(c)
    }

    return total.toString()
  }

  public solveSecond(): string {
    const instructions: Instruction[] = []

    for (const match of this.input.matchAll(/do\(\)/g)) {
      instructions.push({
        type: 'enable',
        index: match['index']!,
        number: 0
      })
    }

    for (const match of this.input.matchAll(/don't\(\)/g)) {
      instructions.push({
        type: 'disable',
        index: match['index']!,
        number: 0
      })
    }

    for (const match of this.input.matchAll(/mul\((\d+),(\d+)\)/g)) {
      const [_, b, c] = match

      instructions.push({
        type: 'multiply',
        index: match['index']!,
        number: Number(b) * Number(c)
      })
    }

    instructions.sort((a, b) => a.index - b.index)

    let total = 0
    let currentType: Instruction['type'] = instructions[0]?.type!

    for (let i = 0; i < instructions.length; i++) {
      const currentInstruction = instructions[i]

      if (!currentInstruction) {
        continue
      }

      switch (currentInstruction.type) {
        case 'multiply':
          if (currentType === 'disable') {
            continue
          }

          total += currentInstruction.number
          continue

        default:
          currentType = currentInstruction.type
      }
    }

    return total.toString()
  }

  public getFirstExpectedResult(): string {
    return '181345830'
  }

  public getSecondExpectedResult(): string {
    return '98729041'
  }
}
