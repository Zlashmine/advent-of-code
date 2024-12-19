import { Vector2 } from 'app/type'
import chalk from 'chalk'
import { Cell } from 'domain/Grid/Cell'
import { AStarGrid, GridVisualiser, Puzzle } from 'domain/index'

import VectorUtils from '@/vectors'

export default class ConcretePuzzle extends Puzzle {
  private grid!: AStarGrid
  private bytes: Vector2[] = []

  private endPosition: Vector2 = [0, 0]

  public solveFirst(): string {
    return (
      this.createGrid(71).getPathWithAddedWalls(1024).length - 1
    ).toString()
  }

  public solveSecond(): string {
    this.createGrid(71)

    return (
      this.bytes
        .find(byte => {
          this.grid.set(byte, new Cell('#', 100, byte))

          if (!this.grid.findShortestPath([0, 0], this.endPosition).length) {
            return byte
          }
        })
        ?.toString() || 'Not found'
    )
  }

  private createGrid(size: number): ConcretePuzzle {
    this.bytes = this.input.split('\n').map(VectorUtils.fromString)

    this.grid = AStarGrid.createFrom(size, size)

    this.grid.forEach((cell, vector) =>
      this.grid.set(vector, new Cell(cell.char, 0, vector))
    )

    this.endPosition = this.grid.get([
      this.grid.width - 1,
      this.grid.height - 1
    ]).position

    return this
  }

  private getPathWithAddedWalls(bytesCount: number) {
    this.bytes
      .slice(0, bytesCount)
      .forEach(byte => this.grid.set(byte, new Cell('#', 1000, byte)))

    return this.grid.findShortestPath([0, 0], this.endPosition)
  }

  public getFirstExpectedResult(): string {
    return '324'
  }

  public getSecondExpectedResult(): string {
    return '15,20'
  }

  private visualiseGrid(path: Vector2[]): void {
    const builder = GridVisualiser.create(this.grid)
      .setValueColor('#', chalk.magentaBright.bold)
      .setValueColor('S', chalk.yellowBright.bold)
      .setValueColor('E', chalk.cyanBright.bold)
      .setValueColor('.', chalk.white)
      .setValueGetter((cell: Cell) => cell.char)

    path.forEach(vector => {
      builder.setPositionColor(vector, chalk.bgGreenBright.bold)
    })

    builder.build()
  }
}
