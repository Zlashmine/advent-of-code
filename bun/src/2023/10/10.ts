import { Puzzle } from 'domain/index'

import { pipeTypes } from './constants'
import { IGrid, IPipe } from './types'

export default class ConcretePuzzle extends Puzzle {
  private grid!: IGrid
  private gridHeight!: number
  private gridWidth!: number

  private currentCord!: string
  private nextCord!: string

  public solveFirst(): string {
    const directions = ['north', 'east', 'south', 'west']

    this.createGrid()

    this.travelGridWithDirections(directions)
    this.travelGridWithDirections(directions.reverse())

    return this.grid
      .getValues<IPipe>()
      .filter(p => p?.distance)
      .sort((a: IPipe, b: IPipe) => b.distance - a.distance)[0]!
      .distance.toString()
  }

  public solveSecond(): string {
    return '0'
  }

  public getFirstExpectedResult(): string {
    return '7086'
  }

  public getSecondExpectedResult(): string {
    return '0'
  }

  private get currentPipe(): IPipe {
    return this.grid[this.currentCord]!
  }

  private get nextPipe(): IPipe {
    return this.grid[this.nextCord]!
  }

  private travelGridWithDirections(directions: string[]): void {
    let tryDirection = 0
    let lastCord = null

    this.currentCord = Object.keys(this.grid).find(
      key => this.grid[key]?.symbol === 'S'
    )!

    this.currentPipe.cord = this.currentCord

    const trace: string[] = [this.currentCord]

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const currentDirection = directions[tryDirection % directions.length]
      const [y, x] = this.currentCord.split('-').map(Number)! as [
        number,
        number
      ]

      if (!this.allowedToTravelInDirectionFrom(y, x, currentDirection!)) {
        tryDirection++
        continue
      }

      const [yCord, xCord] = this.translateCordInDirection(
        y,
        x,
        currentDirection!
      ) as [number, number]

      this.nextCord = `${yCord}-${xCord}`

      if (this.nextCord === lastCord) {
        tryDirection++
        continue
      }

      if (this.nextPipe?.symbol === 'S' && trace.length > 5000) {
        this.nextPipe.distance = 0
        break
      }

      if (!this.hasValidConnections(currentDirection!)) {
        tryDirection++
        continue
      }

      this.nextPipe.distance = Math.min(
        trace.length,
        this.nextPipe.distance || Number.POSITIVE_INFINITY
      )

      lastCord = this.currentCord
      this.currentCord = this.nextCord
      trace.push(this.nextPipe.symbol)
    }
  }

  private createGrid(): void {
    this.grid = {}

    const gridRows = this.input.split('\n')
    this.gridHeight = gridRows.length
    this.gridWidth = gridRows[0]!.split('').length

    for (let y = 0; y < gridRows.length; y++) {
      const gridCol = gridRows[y]!.split('')

      for (let x = 0; x < gridCol.length; x++) {
        this.grid[`${y}-${x}`] = {
          ...pipeTypes.find(p => p.symbol === gridCol[x]),
          cord: `${y}-${x}`
        } as IPipe
      }
    }
  }

  private allowedToTravelInDirectionFrom(
    y: number,
    x: number,
    direction: string
  ): boolean | undefined {
    switch (direction) {
      case 'north':
        return y > 0
      case 'east':
        return x < this.gridWidth
      case 'south':
        return y < this.gridHeight
      case 'west':
        return x > 0
    }
  }

  private translateCordInDirection(
    y: number,
    x: number,
    direction: string
  ): number[] | undefined {
    switch (direction) {
      case 'north':
        return [y - 1, x]
      case 'east':
        return [y, x + 1]
      case 'south':
        return [y + 1, x]
      case 'west':
        return [y, x - 1]
    }
  }

  private hasValidConnections(currentDirection: string): boolean {
    const validConnectionsForDirection =
      this.currentPipe?.validConnections?.find(
        ({ direction }) => direction === currentDirection
      )

    return (
      this.nextPipe &&
      validConnectionsForDirection?.validConnections?.includes(
        this.nextPipe.symbol
      )!
    )
  }
}
