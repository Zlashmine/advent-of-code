import { Vector2 } from 'app/type'
import { Grid, Puzzle } from 'domain/index'

import VectorUtils from '@/vectors'

export default class ConcretePuzzle extends Puzzle {
  private grid!: Grid<string>

  public solveFirst(): string {
    const antinodePositionMap: Map<string, boolean> = new Map()
    const antennaPositionMap: Map<string, Vector2[]> = this.createAntennaMap()

    const handleNodeCalculated = (antinode: string | null) =>
      antinode && antinodePositionMap.set(antinode, true)

    this.calculateAntinodes(antennaPositionMap, handleNodeCalculated)

    return antinodePositionMap.size.toString()
  }

  public solveSecond(): string {
    const antennaPositionMap: Map<string, Vector2[]> = this.createAntennaMap()
    const antinodePositionMap: Map<string, boolean> = new Map()

    for (const positions of antennaPositionMap.values()) {
      for (const position of positions) {
        antinodePositionMap.set(VectorUtils.asString(position), true)
      }
    }

    const handleNodeCalculated = (
      antinode: string | null,
      direction: Vector2
    ) => {
      while (antinode) {
        antinodePositionMap.set(antinode, true)

        const nodePoint = antinode.split(',').map(Number) as Vector2
        const repeatingPoint = VectorUtils.add(nodePoint, direction)

        antinode = this.grid.isInsideGrid(repeatingPoint)
          ? VectorUtils.asString(repeatingPoint)
          : null
      }
    }

    this.calculateAntinodes(antennaPositionMap, handleNodeCalculated)

    return antinodePositionMap.size.toString()
  }

  private calculateAntinodes(
    antennaPositionMap: Map<string, Vector2[]>,
    handleNodeCalculated: (antinode: string | null, direction: Vector2) => void
  ) {
    for (const [_, positions] of antennaPositionMap) {
      for (const positionA of positions) {
        for (const positionB of positions) {
          handleNodeCalculated(
            this.tryGetAntinodePosition(positionA, positionB),
            VectorUtils.directionTo(positionA, positionB)
          )
        }
      }
    }
  }

  private tryGetAntinodePosition(
    positionA: Vector2,
    positionB: Vector2
  ): string | null {
    if (VectorUtils.isSame(positionA, positionB)) {
      return null
    }

    const antinode = VectorUtils.add(
      positionB,
      VectorUtils.directionTo(positionA, positionB)
    )

    return this.grid.isInsideGrid(antinode)
      ? VectorUtils.asString(antinode)
      : null
  }

  private createAntennaMap() {
    const frequencyAntennaMap: Map<string, Vector2[]> = new Map()

    this.grid = new Grid<string>(this.input).forEach(
      (character: string, vector: Vector2) => {
        if (!character || character === '.') {
          return
        }

        const antennasForFrequency = frequencyAntennaMap.get(character) || []
        frequencyAntennaMap.set(character, [...antennasForFrequency, vector])
      }
    )

    return frequencyAntennaMap
  }

  public getFirstExpectedResult(): string {
    return '261'
  }

  public getSecondExpectedResult(): string {
    return '898'
  }
}
