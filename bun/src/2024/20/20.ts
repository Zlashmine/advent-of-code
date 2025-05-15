import VectorUtils from '@/vectors'
import { Vector2 } from 'app/type'
import chalk from 'chalk'
import { Cell } from 'domain/Grid/Cell'
import { AStarGrid, GridVisualiser, Puzzle } from 'domain/index'

interface RemovableWall {
  vector: Vector2
  neightbours: Vector2[]
}

interface CheatOperation {
  vectors: Vector2[]
}

interface CheatResult {
  start: Vector2
  end: Vector2
  length: number
}

const validDirections = [
  VectorUtils.DIRECTIONS.up,
  VectorUtils.DIRECTIONS.down,
  VectorUtils.DIRECTIONS.left,
  VectorUtils.DIRECTIONS.right
]

export default class ConcretePuzzle extends Puzzle {
  private grid!: AStarGrid
  private points: Vector2[] = [
    [0, 0],
    [0, 0]
  ]

  private checkedPositonMap: Map<string, boolean> = new Map()
  private timeMap: Map<number, number> = new Map()

  public solveFirst(): string {
    this.grid = AStarGrid.create(this.input)

    this.grid.forEach((cell, vector) => {
      const cost = cell.char === '#' ? 100 : 0
      this.grid.set(vector, new Cell(cell.char, cost, vector))

      if (cell.char === 'S') this.points[0] = vector
      if (cell.char === 'E') this.points[1] = vector
    })

    const walls = this.getWallsToRemove()

    const pathLength = this.calculatePath()
    console.log('Path length:', pathLength)

    let counter = 0
    const max = walls.length
    let completed = 0
    for (const wall of walls) {
      this.cheatPath(wall).forEach(cheat => {
        if (cheat.length >= pathLength) return

        const key = this.hashVectors([cheat.start, cheat.end])
        if (this.checkedPositonMap.has(key)) return
        this.checkedPositonMap.set(key, true)

        const timeSaved = pathLength - cheat.length
        if (timeSaved >= 1) {
          console.log('Time saved:', timeSaved)
          this.timeMap.set(timeSaved, (this.timeMap.get(timeSaved) || 0) + 1)
          counter++
        }
      })

      if (++completed % 100 === 0) {
        process.stdout.clearLine(0)
        process.stdout.cursorTo(0)
        process.stdout.write(`${Math.round((completed / max) * 100)}%`)
      }
    }

    console.log('Completed:', this.timeMap)

    return counter.toString()
  }

  public solveSecond(): string {
    return '0'
  }

  private hashVectors(vectors: Vector2[]): string {
    return vectors
      .sort((a, b) => a[0] - b[0] || a[1] - b[1])
      .map(VectorUtils.asString)
      .join(',')
  }

  private cheatPath(wall: RemovableWall): CheatResult[] {
    const operation: CheatOperation = { vectors: [wall.vector] }

    if (!wall.neightbours.length) {
      return [
        {
          start: wall.vector,
          end: wall.vector,
          length: this.removeWallsAndCalculatePath(operation)
        }
      ]
    }

    const results: CheatResult[] = []
    for (const neightbour of wall.neightbours) {
      operation.vectors[1] = neightbour

      results.push({
        start: wall.vector,
        end: neightbour,
        length: this.removeWallsAndCalculatePath(operation)
      })
    }

    return results
  }

  private removeWallsAndCalculatePath(operation: CheatOperation): number {
    // Cheat
    operation.vectors.forEach(vector =>
      this.grid.set(vector, new Cell('.', 0, vector))
    )

    const length = this.calculatePath()

    // Undo cheat
    operation.vectors.forEach(vector =>
      this.grid.set(vector, new Cell('#', 100, vector))
    )

    return length
  }

  private calculatePath(): number {
    const path = this.grid.findShortestPath(this.points[0]!, this.points[1]!)
    // this.visualiseGrid(path)
    return path.length - 1
  }

  private getWallsToRemove(): RemovableWall[] {
    const walls: RemovableWall[] = []

    this.grid.forEach(({ char, position }) => {
      if (
        char !== '#' ||
        VectorUtils.isEdge(position, this.grid.width, this.grid.height)
      ) {
        return
      }

      walls.push({
        vector: position,
        neightbours: this.grid
          .getNeighbours(position, validDirections)
          .filter(
            v =>
              v.value.char === '#' &&
              !VectorUtils.isEdge(
                v.value.position,
                this.grid.width,
                this.grid.height
              )
          )
          .map(v => v.value.position)
      })
    })

    return walls
  }

  public getFirstExpectedResult(): string {
    return '0' // 1976 is too high
  }

  public getSecondExpectedResult(): string {
    return '0'
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
