import { Puzzle } from 'domain/index'

export default class ConcretePuzzle extends Puzzle {
  public async solveFirst(): Promise<string> {
    let id = 0

    const data: (number | null)[] = this.parseInput().reduce(
      (acc: (number | null)[], number, index) => {
        for (let counter = 0; counter < number; counter++) {
          acc.push(index % 2 === 0 ? id : null)
        }

        if (index % 2 === 0) {
          id++
        }

        return acc
      },
      []
    )

    let left = 0
    let right = data.length - 1

    while (true) {
      while (data[left] !== null) left++
      while (data[right] === null) right--
      if (left >= right) break
      ;[data[left], data[right]] = [data[right]!, data[left]!]
    }

    return (data as number[])
      .reduce((acc, id, index) => acc + id * index, 0)
      .toString()
  }

  public solveSecond(): string {
    let id = 0

    const data: (number | null)[][] = this.parseInput().reduce(
      (acc: (number | null)[][], number, index) => {
        const blocks: (number | null)[] = []

        for (let counter = 0; counter < number; counter++) {
          blocks.push(index % 2 === 0 ? id : null)
        }

        if (index % 2 === 0) id++

        blocks.length && acc.push(blocks)
        return acc
      },
      []
    )

    let left = 0
    let right = data.length - 1

    while (true) {
      if (left >= right) break
      while (data[right]?.every(id => id === null)) right--

      const rightLength = data[right]!.length
      let leftEmptySlots = data[left]!.filter(id => id === null).length

      while (leftEmptySlots < rightLength) {
        if (++left >= right) break
        leftEmptySlots = data[left]!.filter(id => id === null).length
      }

      if (leftEmptySlots < rightLength) {
        left = 0
        right--
        continue
      }

      const startIndex = data[left]!.findIndex(id => id === null)

      for (let i = startIndex; i < startIndex + rightLength; i++) {
        data[left]![i] = data[right]![i - startIndex]!
        data[right]![i - startIndex] = null
      }

      left = 0
      right--
    }

    return (data as number[][])
      .flat()
      .reduce((acc, id, index) => acc + id * index, 0)
      .toString()
  }

  public getFirstExpectedResult(): string {
    return '6330095022244'
  }

  public getSecondExpectedResult(): string {
    return '6359491814941'
  }

  private parseInput(): number[] {
    return this.input.split('').map(Number)
  }
}
