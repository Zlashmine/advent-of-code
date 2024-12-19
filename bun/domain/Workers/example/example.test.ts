import { describe, expect, it } from 'bun:test'
import WorkerExample from './example'

const puzzleInstance = new WorkerExample()

describe('Worker examples', () => {
  it('Count job and resolve', async () => {
    const result = await puzzleInstance.solveFirst()

    expect(result).toEqual(puzzleInstance.getFirstExpectedResult())
  })

  it('Wait job and resolve', async () => {
    const result = await puzzleInstance.solveSecond()

    expect(result).toEqual(puzzleInstance.getSecondExpectedResult())
  })
})
