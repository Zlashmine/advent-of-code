import { Puzzle } from 'domain/index'

export default async function createTest(day: number, year: number = 2024): Promise<Puzzle> {
  const name = `${day}`.padStart(2, '0')

  const { default: input } = await import(`@/${year}/${name}/input.txt`)
  const puzzle = await import(`@/${year}/${name}/${name}.ts`)

  const puzzleInstance = new puzzle.default().setInput(input)

  return puzzleInstance
}
