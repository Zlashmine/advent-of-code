import dedent from 'dedent'

export function getTemplate(day: number) {
  return dedent`
import { describe, expect, it } from 'bun:test'
import createTest from 'app/test'

const puzzleInstance = await createTest(${`${day}`})

describe(${`'Day ${day}'`}, () => {
  it('Part One', async () => {
    const result = await puzzleInstance.solveFirst()

    expect(result).toEqual(puzzleInstance.getFirstExpectedResult())
  })

  it('Part Two', async () => {
    const result = await puzzleInstance.solveSecond()

    expect(result).toEqual(puzzleInstance.getSecondExpectedResult())
  })
})

`
}
