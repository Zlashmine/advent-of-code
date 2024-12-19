import { Puzzle } from 'domain/index'

import { INode } from './types'
import { clamp } from '@/math'

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const [directionsPart, rows] = this.input.split('\n\n')
    const directions = directionsPart!.split('')

    const nodes = this.createNodes(rows!)
    let currentNode: INode | undefined = nodes.find(
      ({ point }) => point === 'AAA'
    )

    let stepsTaken = 0
    while (currentNode?.point !== 'ZZZ') {
      for (let index = 0; index < directions.length; index++) {
        const operation = clamp(this.getMoveIndex(directions[index]!), 0, 1)

        currentNode = nodes.find(
          ({ point }) => point === currentNode!.destinations[operation]
        )

        stepsTaken++
        if (currentNode!.point === 'ZZZ') {
          break
        }
      }
    }

    return stepsTaken.toString()
  }

  public solveSecond(): string {
    return '0'
  }

  public getFirstExpectedResult(): string {
    return '19199'
  }

  public getSecondExpectedResult(): string {
    return '0'
  }

  private getMoveIndex(string: string) {
    return string === 'R' ? 1 : -1
  }

  private createNodes(rows: string): INode[] {
    return rows.split('\n').map(row => {
      const [point, destinationPart] = row.split(' = ')

      if (!point || !destinationPart) {
        return {
          point: '',
          destinations: []
        }
      }

      const destinations = destinationPart
        .replace('(', '')
        .replace(')', '')
        .split(', ')

      return {
        point,
        destinations
      }
    })
  }
}
