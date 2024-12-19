import { beforeEach, describe, expect, it, mock } from 'bun:test'
import dedent from 'dedent'

import VectorUtils from '@/vectors'

import { Grid } from './Grid'
import { OUT_OF_BOUNDS } from 'domain/constants'

const createGrid = () => {
  const input = dedent(`
  1..2.3
  4X....
  .X....
  .X....
  .X....
  .X....`)

  return new Grid<string>(input)
}

let grid: Grid<string>

describe('Grid', () => {
  beforeEach(() => {
    grid = createGrid()
  })

  it('should create a grid', () => {
    expect(grid.isInsideGrid([0, 0])).toBe(true)
    expect(grid.isInsideGrid([1, 1])).toBe(true)
    expect(grid.isInsideGrid([5, 5])).toBe(true)
    expect(grid.isInsideGrid([6, 5])).toBe(false)
    expect(grid.isInsideGrid([5, 6])).toBe(false)
  })

  it('should get a value', () => {
    expect(grid.get([0, 0])).toEqual('1')
    expect(grid.get([1, 1])).toBe('X')
    expect(grid.get([5, 5])).toBe('.')
  })

  it('should get and throw', () => {
    expect(() => grid.get([6, 5])).toThrowError(OUT_OF_BOUNDS)
  })

  it('should get and not throw', () => {
    expect(grid.getOrNull([99, 5])).toBe(null)
  })

  it('should set a value', () => {
    expect(grid.set([0, 0], 'COOL')).toBe('COOL')
    expect(grid.get([0, 0])).toBe('COOL')
  })

  it('should get all values in row', () => {
    expect(grid.getAllInRow(0)).toEqual(['1', '.', '.', '2', '.', '3'])
    expect(grid.getAllInRow(1)).toEqual(['4', 'X', '.', '.', '.', '.'])
  })

  it('should get all values in column', () => {
    expect(grid.getAllInColumn(0)).toEqual(['1', '4', '.', '.', '.', '.'])
    expect(grid.getAllInColumn(1)).toEqual(['.', 'X', 'X', 'X', 'X', 'X'])
  })

  it('should set key points', () => {
    grid.setKeyPoint([0, 0], 'COOL')
    grid.setKeyPoint([1, 1], 'TWO')

    expect(grid.getKeyPoint([0, 0])).toEqual(['COOL'])
    expect(grid.getKeyPoint([1, 1])).toEqual(['TWO'])
  })

  it('should check inbounds', () => {
    expect(grid.isOutOfBounds([0, 0])).toBe(false)
    expect(grid.isOutOfBounds([5, 5])).toBe(false)
    expect(grid.isOutOfBounds([6, 5])).toBe(true)

    expect(grid.isOutOfBounds([-1, 0])).toBe(true)
    expect(grid.isOutOfBounds([0, -1])).toBe(true)
  })

  it('should get in N direction', () => {
    expect(grid.getNInDirection([0, 0], [1, 0], 3)).toEqual('2')
    expect(grid.getNInDirection([0, 0], [1, 1], 3)).toEqual('.')
    expect(grid.getNInDirection([0, 0], [1, 1], 1)).toEqual('X')
    expect(grid.getNInDirection([0, 0], [1, 1], 99, true)).toEqual('.')

    expect(() => grid.getNInDirection([0, 0], [1, 1], 99)).toThrowError(
      OUT_OF_BOUNDS
    )
  })

  it('should handle forEach method', () => {
    const mockedCallback = mock(() => {})

    grid.forEach(mockedCallback)

    expect(mockedCallback).toHaveBeenCalledTimes(grid.getAll().length)
  })

  it('should set all values to DONE', () => {
    grid.forEach((_, vector) => grid.set(vector, 'DONE'))

    expect(grid.getAll().every(n => n === 'DONE')).toEqual(true)
  })

  it('should get neighbour points', () => {
    expect(
      grid.getNeighbours(
        [0, 0],
        [
          VectorUtils.DIRECTIONS.right,
          VectorUtils.DIRECTIONS.left,
          VectorUtils.DIRECTIONS.down
        ]
      )
    ).toEqual([
      { vector: [1, 0], value: '.' },
      { vector: [0, 1], value: '4' }
    ])
  })

  it('should filter grid based on passed function', () => {
    const filtered = grid.filter(value => value === 'X')

    expect(filtered.length).toBe(5)
    expect(filtered.every(({ value }) => value === 'X')).toBe(true)
  })
})
