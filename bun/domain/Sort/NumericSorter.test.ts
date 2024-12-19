import { describe, expect, it } from 'bun:test'

import { NumericSorter } from './NumericSorter'

describe('NumericSorter', () => {
  it('should sort an empty array', () => {
    const result = NumericSorter.sort([])
    expect(result).toEqual([])
  })

  it('should sort an array with one element', () => {
    const result = NumericSorter.sort([42])
    expect(result).toEqual([42])
  })

  it('should sort a small array (≤10 elements)', () => {
    const result = NumericSorter.sort([5, 3, 8, 6, 2, 7, 4, 1, 9, 0])
    expect(result).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  it('should sort a large array (>10 elements)', () => {
    const result = NumericSorter.sort([
      34, 7, 23, 32, 5, 62, 1, 4, 8, 15, 16, 3
    ])
    expect(result).toEqual([1, 3, 4, 5, 7, 8, 15, 16, 23, 32, 34, 62])
  })

  it('should sort an already sorted array', () => {
    const result = NumericSorter.sort([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  it('should sort a reverse sorted array', () => {
    const result = NumericSorter.sort([10, 9, 8, 7, 6, 5, 4, 3, 2, 1])
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  it('should sort an array with duplicate values', () => {
    const result = NumericSorter.sort([5, 1, 3, 3, 2, 5, 2])
    expect(result).toEqual([1, 2, 2, 3, 3, 5, 5])
  })

  it('should sort an array with negative numbers', () => {
    const result = NumericSorter.sort([3, -2, 1, -5, 0, -1])
    expect(result).toEqual([-5, -2, -1, 0, 1, 3])
  })

  it('should sort an array with all identical values', () => {
    const result = NumericSorter.sort([7, 7, 7, 7, 7])
    expect(result).toEqual([7, 7, 7, 7, 7])
  })

  it('should handle arrays with large numbers', () => {
    const result = NumericSorter.sort([1000000, 500, 100, -100, -1000, 0])
    expect(result).toEqual([-1000, -100, 0, 100, 500, 1000000])
  })

  it('should handle arrays with floating-point numbers', () => {
    const result = NumericSorter.sort([3.1, 2.5, 1.2, 4.8, 3.3])
    expect(result).toEqual([1.2, 2.5, 3.1, 3.3, 4.8])
  })

  it('should handle arrays with mixed positive and negative floating-point numbers', () => {
    const result = NumericSorter.sort([-3.1, -2.5, 1.2, -4.8, 3.3, 0])
    expect(result).toEqual([-4.8, -3.1, -2.5, 0, 1.2, 3.3])
  })

  it('should not mutate the original array', () => {
    const input = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]
    const result = NumericSorter.sort(input)
    expect(result).not.toEqual([3, 1, 4, 1, 5, 9, 2, 6, 5, 3])
  })
})
