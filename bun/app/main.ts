import chalk from 'chalk'
import { formatPerformance, withPerformance } from './utils.ts'
import { Context } from './type.ts'

export async function runner(context: Context) {
  const name = `${context.day}`.padStart(2, '0')

  const { default: input } = await import(
    `@/${context.year}/${name}/${context.file}.txt`
  )
  const puzzle = await import(
    `@/${context.year}/${name}/${name}${context.specialName}.ts`
  )

  const puzzleInstance = new puzzle.default()

  puzzleInstance.setInput(input)

  const [one, onePerformance] = await withPerformance(() =>
    puzzleInstance.solveFirst()
  )
  const [two, twoPerformance] = await withPerformance(() =>
    puzzleInstance.solveSecond()
  )

  const oneSuccess = one === puzzleInstance.getFirstExpectedResult()
  const twoSuccess = two === puzzleInstance.getSecondExpectedResult()

  const oneColor = oneSuccess ? chalk.green : chalk.red
  const twoColor = twoSuccess ? chalk.green : chalk.red

  console.log(
    '🌲',
    'Part One:',
    oneColor(one ?? '?'),
    one ? `(${formatPerformance(onePerformance)})` : ''
  )
  console.log(
    '🎄',
    'Part Two:',
    twoColor(two ?? '?'),
    two ? `(${formatPerformance(twoPerformance)})` : ''
  )
}
