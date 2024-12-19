import { beforeEach, describe, expect, it } from 'bun:test'

import GridUtils from '@/grid'
import dedent from 'dedent'

describe('GridUtils.ts', () => {
  beforeEach(() => {})

  it('should create a grid', () => {
    const input = dedent(`
    1..2.3
    4X....
    .X....
    .X....
    .X....
    .X....`)

    expect(GridUtils.createGrid<string>(input)).toEqual([
      ['1', '.', '.', '2', '.', '3'],
      ['4', 'X', '.', '.', '.', '.'],
      ['.', 'X', '.', '.', '.', '.'],
      ['.', 'X', '.', '.', '.', '.'],
      ['.', 'X', '.', '.', '.', '.'],
      ['.', 'X', '.', '.', '.', '.']
    ])
  })
})
