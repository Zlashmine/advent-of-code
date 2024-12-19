import chalk from 'chalk'
import { existsSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'

import { fetchInput } from './api.ts'
import { puzzleTemplate, puzzleTestTemplate } from './templates/index.ts'

export async function scaffold(day: number, year: number) {
  const name = `${day}`.padStart(2, '0')
  const directory = new URL(`../src/${year}/${name}/`, import.meta.url)

  if (existsSync(directory)) {
    return
  }

  console.log(`📂 Setting up day ${day} of ${year}`)

  await mkdir(directory)

  const input = await fetchInput({ day, year }).catch(() => {
    console.log(
      chalk.red.bold(
        '📂 Fetching your input have failed, empty file will be created.'
      )
    )
  })

  await Bun.write(
    new URL(`${name}.test.ts`, directory.href),
    puzzleTestTemplate(day)
  )
  await Bun.write(new URL(`${name}.ts`, directory.href), puzzleTemplate(day))
  await Bun.write(new URL(`types.ts`, directory.href), '')
  await Bun.write(new URL(`input.txt`, directory.href), input ?? '')
  await Bun.write(new URL(`example.txt`, directory.href), '')
}
