import createTest from 'app/test'
import { describe, expect, it } from 'bun:test'

const puzzleInstance = await createTest(1)

describe('Day 1', () => {
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
