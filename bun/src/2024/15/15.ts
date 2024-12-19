import { Vector2 } from 'app/type'
import chalk, { ChalkInstance } from 'chalk'
import { GridVisualiser, Puzzle } from 'domain/index'

import { BoxGrid, ROBOT } from './types'

export default class ConcretePuzzle extends Puzzle {
  private grid!: BoxGrid
  private moves!: string[]

  public solveFirst(): string {
    this.parseInput()

    let robotPosition: Vector2 = this.grid.findFirst(value => value === ROBOT)
      ?.vector || [0, 0]

    for (const move of this.moves) {
      robotPosition = this.grid.handleMoveInstruction(robotPosition, move)
    }

    // this.visualiseGrid()

    return this.grid
      .filter(value => value === 'O')
      .reduce((acc, box) => {
        const [x, y] = box.vector
        acc += 100 * y + x

        return acc
      }, 0)
      .toString()
  }

  public solveSecond(): string {
    return '0'
  }

  private parseInput(): void {
    const [gridInput, moveInput] = this.input.split('\n\n')

    if (!gridInput || !moveInput) {
      throw new Error('Invalid input')
    }

    this.grid = new BoxGrid(gridInput)
    this.moves = moveInput
      .trim()
      .split('')
      .filter(move => (move || '').trim().length)
  }

  public getFirstExpectedResult(): string {
    return '1514333'
  }

  public getSecondExpectedResult(): string {
    return '0'
  }

  private visualiseGrid(): void {
    const gridColorMap: { [x: string]: ChalkInstance } = {
      '#': chalk.magentaBright.bold,
      O: chalk.yellowBright.bold,
      '@': chalk.cyanBright.bold,
      '.': chalk.white
    }

    GridVisualiser.create(this.grid)
      .setValueColor('#', gridColorMap['#']!)
      .setValueColor('O', gridColorMap['O']!)
      .setValueColor('@', gridColorMap['@']!)
      .setValueColor('.', gridColorMap['.']!)
      .build()
  }
}
