import { Context } from '../type.ts'

const context: Context = {
  day: 6,
  file: 'input',
  year: 2024,
  specialName: ''
}

import('../main.ts').then(({ runner }) => runner(context))
