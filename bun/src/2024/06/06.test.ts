import { describe, expect, it } from 'bun:test'
import createTest from 'app/test'
import MultiThreadedPuzzle from './06-multithreaded'

const puzzleInstance = await createTest(6)

describe('Day 6', () => {
  it('Part One', async () => {
    const result = await puzzleInstance.solveFirst()

    expect(result).toEqual(puzzleInstance.getFirstExpectedResult())
  })

  it('Part Two', async () => {
    const result = await puzzleInstance.solveSecond()

    expect(result).toEqual(puzzleInstance.getSecondExpectedResult())
  })

  it('Part Two - Multithreaded', async () => {
    if (!Boolean(process.env.IS_LOCAL)) {
      return
    }

    const puzzle = new MultiThreadedPuzzle()
    puzzle.setInput(puzzleInstance.getInput())

    const result = await puzzle.solveSecond()

    expect(result).toEqual(puzzleInstance.getSecondExpectedResult())
  })
})
