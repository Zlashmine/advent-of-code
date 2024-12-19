import { beforeEach, describe, expect, it } from 'bun:test'

import VectorUtils from '@/vectors'

describe('VectorUtils.ts', () => {
  beforeEach(() => {})

  it('should add two vectors', () => {
    const result = VectorUtils.add([1, 2], [3, 4])
    expect(result).toEqual([4, 6])
  })

  it('should subtract two vectors', () => {
    const result = VectorUtils.subtract([1, 2], [3, 4])
    expect(result).toEqual([-2, -2])
  })

  it('should multiply two vectors', () => {
    const result = VectorUtils.multiply([3, 2], 3)
    expect(result).toEqual([9, 6])
  })

  it('should return direction from vector a to b', () => {
    const result = VectorUtils.directionTo([1, 1], [2, 2])
    expect(result).toEqual([1, 1])
  })

  it('should return distance between vectror a and b', () => {
    const result = VectorUtils.distanceBetween([1, 1], [2, 2])
    expect(result).toBe(2)
  })

  it('should return true if vectors are the same', () => {
    const result = VectorUtils.isSame([1, 1], [1, 1])
    expect(result).toBe(true)
  })

  it('should return string representation of vector', () => {
    const result = VectorUtils.asString([1, 1])
    expect(result).toBe('1,1')
  })

  it('should return true if vector is out of bounds', () => {
    const result = VectorUtils.isOutOfBounds([1, 1], 1, 1)
    expect(result).toBe(true)
  })

  it('should return true if vector is inside grid', () => {
    const result = VectorUtils.isInsideGrid<number>(
      [1, 1],
      [
        [5, 5],
        [5, 5]
      ]
    )
    expect(result).toBe(true)
  })

  it('should return false if vector is out of bounds', () => {
    const result = VectorUtils.isInsideGrid<number>([1, 1], [[0], [0]])
    expect(result).toBe(false)
  })
})
