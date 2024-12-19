import { beforeEach, describe, expect, it } from 'bun:test'

import {
  sumNumbers,
  sumReducer,
  multiplyReducer,
  isNumber,
  numbersInString,
  numbersInStrings,
  numbersByWhitespace,
  uniqueNumbersInString,
  groupArrayBy,
  groupArraysInChunks,
  clamp,
  generateVariations
} from '@/math'

describe('math.ts', () => {
  beforeEach(() => {})

  it('sumNumbers - should sum numbers', () => {
    const result = sumNumbers([1, 2, 3])
    expect(result).toBe(6)
  })

  it('sumReducer - should sum numbers', () => {
    const result = sumReducer(0, 1)
    expect(result).toBe(1)
  })

  it('multiplyReducer - should multiply numbers', () => {
    const result = multiplyReducer(1, 20)
    expect(result).toBe(20)
  })

  it('isNumber - should return true if number', () => {
    const result = isNumber('1')
    expect(result).toBe(true)
  })

  it('isNumber - should return false if not number', () => {
    const result = isNumber('a')
    expect(result).toBe(false)
  })

  it('numbersInString - should return numbers in string', () => {
    const result = numbersInString('1,2,3', ',')
    expect(result).toEqual([1, 2, 3])
  })

  it('numbersInStrings - should return numbers in strings', () => {
    const result = numbersInStrings(['1,2,3', '4,5,6'], ',')
    expect(result).toEqual([
      [1, 2, 3],
      [4, 5, 6]
    ])
  })

  it('numbersByWhitespace - should return numbers by whitespace', () => {
    const result = numbersByWhitespace('1 2 3')
    expect(result).toEqual([1, 2, 3])
  })

  it('uniqueNumbersInString - should return unique numbers in string', () => {
    const result = uniqueNumbersInString('1,1,2,3')
    expect(result).toEqual([1, 2, 3])
  })

  it('groupArrayBy - should group array by count', () => {
    const result = groupArrayBy([1, 2, 3, 4, 5, 6], 2)
    expect(result).toEqual([
      [1, 2],
      [3, 4],
      [5, 6]
    ])
  })

  it('groupArraysInChunks - should group arrays in chunks', () => {
    const result = groupArraysInChunks(
      [
        [1, 2],
        [3, 4],
        [5, 6]
      ],
      2
    )
    expect(result).toEqual([
      [1, 2],
      [3, 4]
    ])
  })

  it('groupArraysInChunks - should group arrays in many chunks', () => {
    const result = groupArraysInChunks(
      [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
      ],
      20
    )

    expect(result).toEqual([
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
    ])
  })

  it('clamp - should clamp number', () => {
    const result = clamp(1, 2, 3)
    expect(result).toBe(2)
  })

  it('generateVariations - should generate variations', () => {
    const result = generateVariations(['1', '2', '3'], ['+', '-'])
    expect(result).toEqual(['1+2+3', '1+2-3', '1-2+3', '1-2-3'])
  })

  it('generateVariations - should return array if length is less than 2', () => {
    const result = generateVariations(['1'], ['+', '-'])
    expect(result).toEqual(['1'])
  })

  it('generateVariations - should return empty array if empty array', () => {
    const result = generateVariations([], ['+', '-'])
    expect(result).toEqual([])
  })
})
