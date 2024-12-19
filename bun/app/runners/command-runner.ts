import { argv } from 'bun'
import chalk from 'chalk'

import { scaffold } from '../scaffold.ts'
import { Context } from '../type.ts'
import { isBetween } from '../utils.ts'

const day = parseInt(argv[2] ?? '')
const year = parseInt(process.env.YEAR ?? new Date().getFullYear())
const file = argv.includes('--test') ? 'example' : 'input'
const specialName = argv[4] || ''

if (!isBetween(day, [1, 25])) {
  console.log(`🎅 Pick a day between ${chalk.bold(1)} and ${chalk.bold(25)}.`)
  console.log(`🎅 To get started, try: ${chalk.cyan('bun solve 1')}`)
  process.exit(0)
}

await scaffold(day, year)

const context: Context = {
  day,
  file,
  year,
  specialName
}

import('../main.ts').then(({ runner }) => runner(context))
