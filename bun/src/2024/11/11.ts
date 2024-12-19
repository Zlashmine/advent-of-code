import { sumReducer } from '@/math'
import { EnhancedMap, NumberMap, Puzzle } from 'domain/index'

export default class ConcretePuzzle extends Puzzle {
  private cacheMap: EnhancedMap<string, string[]> = new EnhancedMap<
    string,
    string[]
  >()

  private stoneReadMap!: NumberMap<string>
  private stoneWriteMap!: NumberMap<string>

  public solveFirst(): string {
    return this.blinkTimes(25).toString()
  }

  public solveSecond(): string {
    return this.blinkTimes(75).toString()
  }

  private initialiseMaps(): void {
    this.stoneReadMap = new NumberMap<string>()
    this.stoneWriteMap = new NumberMap<string>()

    for (const stone of this.input.split(' ')) {
      this.stoneReadMap.increment(stone)
    }
  }

  private blinkTimes = (times: number): number => {
    this.initialiseMaps()

    for (let i = 0; i < times; i++) {
      for (const [stone, count] of this.stoneReadMap) {
        this.cacheMap
          .getOrSet(stone, () => this.transformStone(stone))
          .forEach(newStone => this.stoneWriteMap.increment(newStone, count))
      }

      this.stoneReadMap = this.stoneWriteMap
      this.stoneWriteMap = new NumberMap<string>()
    }

    return Array.from(this.stoneReadMap.values()).reduce(sumReducer, 0)
  }

  private transformStone(stone: string): string[] {
    if (stone[0] === '0') {
      return ['1']
    }

    if (stone.length % 2 === 0) {
      const half = Math.floor(stone.length / 2)

      const left = stone.slice(0, half)
      const right = Number(stone.slice(half))

      return [left, right.toString()]
    }

    return [(Number(stone) * 2024).toString()]
  }

  public getFirstExpectedResult(): string {
    return '199753'
  }

  public getSecondExpectedResult(): string {
    return '239413123020116'
  }
}
