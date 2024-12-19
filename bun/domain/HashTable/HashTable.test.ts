import { describe, expect, it } from 'bun:test'

import { HashTable } from './HashTable'

describe('HashTable', () => {
  it('should create a hash table', () => {
    const hashTable = HashTable.create<string>(10)
    expect(hashTable).toBeDefined()
  })

  it('should add and retrieve a key-value pair', () => {
    const hashTable = HashTable.create<string>(10)
    hashTable.set('apple', 'fruit')
    expect(hashTable.get('apple')).toBe('fruit')
  })

  it('should update the value for an existing key', () => {
    const hashTable = HashTable.create<string>(10)
    hashTable.set('apple', 'fruit')
    hashTable.set('apple', 'snack')
    expect(hashTable.get('apple')).toBe('snack')
  })

  it('should handle collisions correctly', () => {
    const hashTable = HashTable.create<string>(5) // Small size to force collisions
    hashTable.set('apple', 'fruit')
    hashTable.set('elppa', 'backwards-apple') // Same hash index as "apple"

    expect(hashTable.get('apple')).toBe('fruit')
    expect(hashTable.get('elppa')).toBe('backwards-apple')
  })

  it('should return undefined for a non-existent key', () => {
    const hashTable = HashTable.create<string>(10)
    expect(hashTable.get('nonexistent')).toBeUndefined()
  })

  it('should remove a key-value pair', () => {
    const hashTable = HashTable.create<string>(10)
    hashTable.set('apple', 'fruit')
    hashTable.remove('apple')

    expect(hashTable.get('apple')).toBeUndefined()
  })

  it('should only remove the specified key during collisions', () => {
    const hashTable = HashTable.create<string>(5) // Small size to force collisions
    hashTable.set('apple', 'fruit')
    hashTable.set('elppa', 'backwards-apple')

    hashTable.remove('apple')
    expect(hashTable.get('apple')).toBeUndefined()
    expect(hashTable.get('elppa')).toBe('backwards-apple')
  })

  it('should handle multiple keys and values', () => {
    const hashTable = HashTable.create<string>(10)
    hashTable.set('apple', 'fruit')
    hashTable.set('carrot', 'vegetable')
    hashTable.set('pear', 'fruit')

    expect(hashTable.get('apple')).toBe('fruit')
    expect(hashTable.get('carrot')).toBe('vegetable')
    expect(hashTable.get('pear')).toBe('fruit')
  })

  it('should not throw errors on operations in an empty hash table', () => {
    const hashTable = HashTable.create<string>(10)
    expect(() => hashTable.get('nothing')).not.toThrow()
    expect(() => hashTable.remove('nothing')).not.toThrow()
  })

  it('should handle large numbers of keys efficiently', () => {
    const hashTable = HashTable.create<number>(1000)
    const numKeys = 5000

    for (let i = 0; i < numKeys; i++) {
      hashTable.set(`key${i}`, i)
    }

    for (let i = 0; i < numKeys; i++) {
      expect(hashTable.get(`key${i}`)).toBe(i)
    }

    expect(hashTable.get('nonexistent')).toBeUndefined()
  })

  it('should allow keys of different lengths', () => {
    const hashTable = HashTable.create<string>(10)
    hashTable.set('a', 'value1')
    hashTable.set('very-long-key', 'value2')

    expect(hashTable.get('a')).toBe('value1')
    expect(hashTable.get('very-long-key')).toBe('value2')
  })
})
