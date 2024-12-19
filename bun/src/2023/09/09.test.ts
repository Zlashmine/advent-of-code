import { describe, expect, it } from 'bun:test'
import createTest from 'app/test'

const puzzleInstance = await createTest(9)

describe('Day 9', () => {
  it('Part One', async () => {
    const result = await puzzleInstance.solveFirst()

    expect(result).toEqual(puzzleInstance.getFirstExpectedResult())
  })

  it('Part Two', async () => {
    const result = await puzzleInstance.solveSecond()

    expect(result).toEqual(puzzleInstance.getSecondExpectedResult())
  })
})