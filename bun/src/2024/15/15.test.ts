import { describe, expect, it } from 'bun:test'
import createTest from 'app/test'

const puzzleInstance = await createTest(15)

describe('Day 15', () => {
  it('Part One', async () => {
    const result = await puzzleInstance.solveFirst()

    expect(result).toEqual(puzzleInstance.getFirstExpectedResult())
  })

  it('Part Two', async () => {
    const result = await puzzleInstance.solveSecond()

    expect(result).toEqual(puzzleInstance.getSecondExpectedResult())
  })
})
