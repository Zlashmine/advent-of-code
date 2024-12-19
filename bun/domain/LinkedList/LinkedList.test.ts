import { describe, expect, it } from 'bun:test'
import { LinkedList } from './LinkedList'
import { OUT_OF_BOUNDS } from 'domain/constants'

describe('LinkedList', () => {
  it('should create a linked list', () => {
    const list = new LinkedList<string>()
    expect(list).toBeDefined()
    expect(list.length).toBe(0)
  })

  it('should append elements to the linked list', () => {
    const list = new LinkedList<number>()
    list.append(1)
    list.append(2)
    list.append(3)

    expect(list.length).toBe(3)
    expect(list.get(0)).toBe(1)
    expect(list.get(1)).toBe(2)
    expect(list.get(2)).toBe(3)
  })

  it('should prepend elements to the linked list', () => {
    const list = new LinkedList<number>()
    list.prepend(1)
    list.prepend(2)
    list.prepend(3)

    expect(list.length).toBe(3)
    expect(list.get(0)).toBe(3)
    expect(list.get(1)).toBe(2)
    expect(list.get(2)).toBe(1)
  })

  it('should insert elements at a specific index', () => {
    const list = new LinkedList<number>()
    list.append(1)
    list.append(3)
    list.insertAt(1, 2)

    expect(list.length).toBe(3)
    expect(list.get(0)).toBe(1)
    expect(list.get(1)).toBe(2)
    expect(list.get(2)).toBe(3)
  })

  it('should throw an error when inserting at an invalid index', () => {
    const list = new LinkedList<number>()
    list.append(1)

    expect(() => list.insertAt(-1, 2)).toThrow('Index out of bounds')
    expect(() => list.insertAt(2, 2)).toThrow('Index out of bounds')
  })

  it('should remove elements at a specific index', () => {
    const list = new LinkedList<number>()
    list.append(1)
    list.append(2)
    list.append(3)

    const removed = list.removeAt(1)

    expect(removed).toBe(2)
    expect(list.length).toBe(2)
    expect(list.get(0)).toBe(1)
    expect(list.get(1)).toBe(3)
  })

  it('should throw an error when removing at an invalid index', () => {
    const list = new LinkedList<number>()
    list.append(1)

    expect(() => list.removeAt(-1)).toThrow('Index out of bounds')
    expect(() => list.removeAt(1)).toThrow('Index out of bounds')
  })

  it('should handle traversal correctly', () => {
    const list = new LinkedList<string>()
    list.append('a')
    list.append('b')
    list.append('c')

    const result: string[] = []
    list.traverse(value => result.push(value))

    expect(result).toEqual(['a', 'b', 'c'])
  })

  it('should convert the linked list to an array', () => {
    const list = new LinkedList<number>()
    list.append(1)
    list.append(2)
    list.append(3)

    expect(list.toArray()).toEqual([1, 2, 3])
  })

  it('should handle an empty linked list', () => {
    const list = new LinkedList<number>()

    expect(list.length).toBe(0)
    expect(() => list.get(0)).toThrow(OUT_OF_BOUNDS)
    expect(list.toArray()).toEqual([])
  })

  it('should handle edge cases with single-element lists', () => {
    const list = new LinkedList<string>()
    list.append('only')

    expect(list.length).toBe(1)
    expect(list.get(0)).toBe('only')

    const removed = list.removeAt(0)
    expect(removed).toBe('only')
    expect(list.length).toBe(0)
    expect(list.toArray()).toEqual([])
  })

  it('should correctly rebuild the cache after modifications', () => {
    const list = new LinkedList<number>()
    list.append(1)
    list.append(2)
    list.append(3)

    expect(list.get(2)).toBe(3)

    list.insertAt(1, 4)
    expect(list.get(1)).toBe(4)

    list.removeAt(2)
    expect(list.get(2)).toBe(3)
  })
})
