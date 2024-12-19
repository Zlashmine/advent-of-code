import { NumberMap, Puzzle, WrappingGrid } from 'domain/index'

import VectorUtils from '@/vectors'

import { Robot } from './types'

export default class ConcretePuzzle extends Puzzle {
  private grid!: WrappingGrid<string>

  public solveFirst(): string {
    this.grid = new WrappingGrid<string>().createFrom(
      101,
      103,
      '.'
    ) as WrappingGrid<string>

    const quadrants: NumberMap<string> = this.processRobots(
      this.createRobots(),
      100
    )

    let total = 1
    for (const [_, value] of quadrants) {
      total *= value
    }

    return total.toString()
  }

  public solveSecond(): string {
    this.grid = new WrappingGrid<string>().createFrom(
      101,
      103,
      '.'
    ) as WrappingGrid<string>

    const robots = this.createRobots()
    const positionMap = new NumberMap<string>()

    let secondsElapsed = 0
    while (true) {
      positionMap.clear()

      secondsElapsed++
      for (const robot of robots) {
        robot.position = this.grid.translate(robot.position, robot.velocity)
        positionMap.increment(VectorUtils.asString(robot.position))
      }

      if (Array.from(positionMap.values()).every(value => value === 1)) {
        break
      }
    }

    return secondsElapsed.toString()
  }

  private processRobots(robots: Robot[], seconds: number): NumberMap<string> {
    for (let i = 0; i < seconds; i++) {
      for (const robot of robots) {
        robot.position = this.grid.translate(robot.position, robot.velocity)
      }
    }

    const quadrants = new NumberMap<string>()
      .set('topLeft', 0)
      .set('topRight', 0)
      .set('bottomLeft', 0)
      .set('bottomRight', 0)

    const [halfWidth, halfHeight] = [
      Math.floor(this.grid.width / 2),
      Math.floor(this.grid.height / 2)
    ]

    for (const { position } of robots) {
      const [x, y] = position

      if (x === halfWidth || y === halfHeight) {
        continue
      }

      if (x >= halfWidth && y >= halfHeight) quadrants.increment('bottomRight')
      if (x >= halfWidth && y <= halfHeight) quadrants.increment('topRight')
      if (x <= halfWidth && y >= halfHeight) quadrants.increment('bottomLeft')
      if (x <= halfWidth && y <= halfHeight) quadrants.increment('topLeft')
    }

    return quadrants
  }

  private createRobots(): Robot[] {
    return this.input.split('\n').map(line => {
      const [position, velocity] = line
        .split(' ')
        .map(part => VectorUtils.fromString(part.split('=')[1]!))

      return {
        position,
        velocity
      } as Robot
    })
  }

  public getFirstExpectedResult(): string {
    return '215476074'
  }

  public getSecondExpectedResult(): string {
    return '6285'
  }
}
