import { NumberMap, Puzzle } from 'domain/index'

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const { patterns, designs } = this.parseInput()

    const buildableDesigns = designs.filter(design =>
      this.canBuildDesign(patterns, design)
    )

    return (buildableDesigns.length - 1).toString()
  }

  public solveSecond(): string {
    return '0'
  }

  private canBuildDesign(patterns: string[], design: string): boolean {
    const matchMap = new NumberMap<string>()

    let from = 0
    let to = 1

    let foudMatch = false
    while (from < design.length) {
      const part = design.substring(from, from + to)

      if (patterns.includes(part)) {
        matchMap.set(part, 1)
        foudMatch = true
        from += part.length
        to = 1
      }

      if (++to > design.length) {
        if (!foudMatch) matchMap.set(design.substring(from), 0)

        from++
        to = 1
        foudMatch = false
      }
    }

    return Array.from(matchMap).every(([, count]) => count > 0)
  }

  public getFirstExpectedResult(): string {
    return '342'
  }

  public getSecondExpectedResult(): string {
    return '0'
  }

  private parseInput(): { patterns: string[]; designs: string[] } {
    const [a, b] = this.input.split('\n\n')

    if (!a || !b) {
      throw new Error('Invalid input')
    }

    return {
      patterns: a
        .trim()
        .split(',')
        .map(d => d.trim()),
      designs: b.split('\n').filter(t => t.length)
    }
  }
}
