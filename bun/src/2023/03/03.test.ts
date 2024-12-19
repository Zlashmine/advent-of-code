import { describe, expect, it } from 'bun:test'
import createTest from 'app/test'

const puzzleInstance = await createTest(3)

describe('Day 3', () => {
  it('Part One', async () => {
    expect(puzzleInstance.solveFirst()).toEqual(
      puzzleInstance.getFirstExpectedResult()
    )
  })

  it('Part Two', async () => {
    expect(puzzleInstance.solveSecond()).toEqual(
      puzzleInstance.getSecondExpectedResult()
    )
  })
})