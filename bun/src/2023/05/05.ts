import { numbersByWhitespace } from '@/math'
import { Puzzle } from 'domain/index'

import { IMap, IRange, IRangeDictionary } from './types'

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const [seedsPart, ...maps] = this.input.split('\n\n')
    const seeds = numbersByWhitespace(seedsPart!.split(': ').pop())

    return this.solveWithSeeds(seeds, maps)
  }

  public solveSecond(): string {
    return '0'
  }

  public getFirstExpectedResult(): string {
    return '51752125'
  }

  public getSecondExpectedResult(): string {
    return '0'
  }

  private solveWithSeeds(seeds: number[], maps: string[]): string {
    const seedDict: IRangeDictionary = seeds.reduce(
      (acc: IRangeDictionary, seed) => {
        acc[seed] = seed

        return acc
      },
      {}
    )

    return maps
      .map(map => this.createMap(map))
      .map(map => {
        seeds.forEach(seed => {
          seedDict[seed] = map.getValueForSeed(seedDict[seed]!)
        })

        return seedDict
      })
      .flatMap(dict => Object.values(dict).sort((a, b) => a - b))[0]
      .toString()
  }

  private createMap(chunk: string): IMap {
    const [name, mappingsChunk] = chunk.split(':')
    const ranges = this.getRanges(mappingsChunk!)

    if (!ranges.length) {
      throw new Error('No ranges found')
    }

    if (!name) {
      throw new Error('No name found')
    }

    return {
      name,
      getValueForSeed: (seed: number) => {
        const matchingRange = ranges.find(
          ({ start, range }) => start <= seed && start + range >= seed
        )

        return (
          seed + (matchingRange ? matchingRange.dest - matchingRange.start : 0)
        )
      }
    }
  }

  private getRanges(mappingsChunk: string): IRange[] {
    return mappingsChunk.split('\n').map(row => {
      const [dest, start, range] = row.split(' ').map(Number)

      return {
        dest: dest!,
        start: start!,
        range: range!
      }
    })
  }
}
