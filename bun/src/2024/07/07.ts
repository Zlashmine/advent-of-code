import { Puzzle } from 'domain/index'

import { generateVariations } from '@/math'

import { Equation, EquationConfiguration } from './types'

const numberOperator = ({ left, right, operation }: EquationConfiguration) =>
  operation === 'add' ? left + right : left * right

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    return this.parseInput()
      .filter(equation => {
        for (const variation of equation.variations) {
          const characters = variation.split('')

          let rightNumber = '',
            leftNumber = ''
          let pendingOperation: EquationConfiguration['operation'] | null = null

          for (let i = 0; i < characters.length; i++) {
            if (characters[i] !== '*' && characters[i] !== '+') {
              rightNumber += characters[i]
              continue
            }

            if (!pendingOperation) {
              leftNumber = rightNumber
              rightNumber = ''
              pendingOperation = characters[i] === '*' ? 'multiply' : 'add'
              continue
            }

            const calculation = numberOperator({
              left: Number(leftNumber),
              right: Number(rightNumber),
              operation: pendingOperation
            })

            leftNumber = calculation.toString()
            rightNumber = ''
            pendingOperation = characters[i] === '*' ? 'multiply' : 'add'
          }

          const finalCalculation = numberOperator({
            left: Number(leftNumber),
            right: Number(rightNumber),
            operation: pendingOperation!
          })

          if (finalCalculation === equation.value) {
            return true
          }
        }
      })
      .reduce((acc, equation) => acc + equation.value, 0)
      .toString()
  }

  public solveSecond(): string {
    return '0'
  }

  public getFirstExpectedResult(): string {
    return '945512582195'
  }

  public getSecondExpectedResult(): string {
    return '0'
  }

  private parseInput(): Equation[] {
    return this.input.split('\n').map(line => {
      const [value, operatorsSection] = line.split(':')

      const operators = operatorsSection!
        .split(' ')
        .filter(item => item.length)
        .map(Number)

      return {
        value: Number(value),
        operators,
        variations: generateVariations(operators.map(String), ['*', '+'])
      }
    })
  }
}
