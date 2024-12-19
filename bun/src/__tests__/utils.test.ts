import { beforeEach, describe, expect, it } from 'bun:test'

import {
  getMatchIndexes,
  isAfter,
  isBefore,
  findMiddleElementInArray,
  shiftElementToNextIndex,
  getAllPermutations,
  swapIndicesInString
} from '@/utils'

describe('utils.ts', () => {
  beforeEach(() => {})

  it('getMatchIndexes - should return indexes of all matches', () => {
    const str = '123456789'
    const toMatch = '3'
    const result = getMatchIndexes(str, toMatch)
    expect(result).toEqual([2])
  })

  it('isBefore - should return true if a is before b', () => {
    const a = 1
    const b = 2
    const array = [1, 2, 3]
    const result = isBefore(a, b, array)
    expect(result).toBe(true)
  })

  it('isBefore - should return false if a is after b', () => {
    const a = 2
    const b = 1
    const array = [1, 2, 3]
    const result = isBefore(a, b, array)
    expect(result).toBe(false)
  })

  it('isAfter - should return true if a is after b', () => {
    const a = 2
    const b = 1
    const array = [1, 2, 3]
    const result = isAfter(a, b, array)
    expect(result).toBe(true)
  })

  it('isAfter - should return false if a is before b', () => {
    const a = 1
    const b = 2
    const array = [1, 2, 3]
    const result = isAfter(a, b, array)
    expect(result).toBe(false)
  })

  it('findMiddleElementInArray - should return middle element', () => {
    const array = [1, 2, 3]
    const result = findMiddleElementInArray(array)
    expect(result).toBe(2)
  })

  it('findMiddleElementInArray - should return undefined if array length is even', () => {
    const array = [1, 2, 3, 4]
    const result = findMiddleElementInArray(array)
    expect(result).toBe(undefined!)
  })

  it('shiftElementToNextIndex - should shift element to next index', () => {
    const array = [1, 2, 3]
    const index = 0
    const result = shiftElementToNextIndex(array, index)
    expect(result).toEqual([2, 1, 3])
  })

  it('shiftElementToNextIndex - should return array if index is last element', () => {
    const array = [1, 2, 3]
    const index = 2
    const result = shiftElementToNextIndex(array, index)
    expect(result).toEqual([1, 2, 3])
  })

  it('getAllPermutations - should return all permutations of a string', () => {
    const result = getAllPermutations<string>(['a', 'b', 'c'])
    expect(result).toEqual([
      ['a', 'b', 'c'],
      ['a', 'c', 'b'],
      ['b', 'a', 'c'],
      ['b', 'c', 'a'],
      ['c', 'a', 'b'],
      ['c', 'b', 'a']
    ])
  })

  it('swapIndicesInString - should swap indices in a string', () => {
    const result = swapIndicesInString<string>(['a', 'b', 'c', 'd', 'e'], 0, 2)
    expect(result).toEqual(['c', 'b', 'a', 'd', 'e'])
  })
})
