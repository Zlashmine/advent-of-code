import { describe, expect, it } from 'bun:test'
import { BinarySearchTree } from './BinarySearchTree'

describe('BinarySearchTree', () => {
  it('should create a BinarySearchTree instance', () => {
    const bst = new BinarySearchTree<number>()
    expect(bst).toBeDefined()
  })

  it('should insert values into the tree', () => {
    const bst = new BinarySearchTree<number>()
    bst.insert(10)
    bst.insert(5)
    bst.insert(15)

    // In-order traversal should return sorted values
    expect(bst.inOrderTraversal()).toEqual([5, 10, 15])
  })

  it('should find existing values using search()', () => {
    const bst = new BinarySearchTree<number>()
    bst.insert(10)
    bst.insert(5)
    bst.insert(15)

    expect(bst.searchTree(10)).toBe(true)
    expect(bst.searchTree(5)).toBe(true)
    expect(bst.searchTree(15)).toBe(true)
  })

  it('should return false for non-existent values', () => {
    const bst = new BinarySearchTree<number>()
    bst.insert(10)
    bst.insert(5)

    expect(bst.searchTree(20)).toBe(false)
    expect(bst.searchTree(0)).toBe(false)
  })

  it('should handle duplicates gracefully', () => {
    const bst = new BinarySearchTree<number>()
    bst.insert(10)
    bst.insert(10)
    bst.insert(10)

    expect(bst.inOrderTraversal()).toEqual([10, 10, 10]) // Modify this based on desired behavior for duplicates
  })

  it('should return values in correct in-order traversal', () => {
    const bst = new BinarySearchTree<number>()
    bst.insert(10)
    bst.insert(5)
    bst.insert(15)
    bst.insert(3)
    bst.insert(7)

    expect(bst.inOrderTraversal()).toEqual([3, 5, 7, 10, 15])
  })

  it('should return values in correct pre-order traversal', () => {
    const bst = new BinarySearchTree<number>()
    bst.insert(10)
    bst.insert(5)
    bst.insert(15)
    bst.insert(3)
    bst.insert(7)

    expect(bst.preOrderTraversal()).toEqual([10, 5, 3, 7, 15])
  })

  it('should return values in correct post-order traversal', () => {
    const bst = new BinarySearchTree<number>()
    bst.insert(10)
    bst.insert(5)
    bst.insert(15)
    bst.insert(3)
    bst.insert(7)

    expect(bst.postOrderTraversal()).toEqual([3, 7, 5, 15, 10])
  })

  it('should handle inserting a single value', () => {
    const bst = new BinarySearchTree<number>()
    bst.insert(42)

    expect(bst.inOrderTraversal()).toEqual([42])
    expect(bst.preOrderTraversal()).toEqual([42])
    expect(bst.postOrderTraversal()).toEqual([42])
  })

  it('should handle inserting values in sorted order', () => {
    const bst = new BinarySearchTree<number>()
    bst.insert(1)
    bst.insert(2)
    bst.insert(3)
    bst.insert(4)
    bst.insert(5)

    expect(bst.inOrderTraversal()).toEqual([1, 2, 3, 4, 5])
    expect(bst.preOrderTraversal()).toEqual([1, 2, 3, 4, 5])
    expect(bst.postOrderTraversal()).toEqual([5, 4, 3, 2, 1])
  })

  it('should handle inserting values in reverse order', () => {
    const bst = new BinarySearchTree<number>()
    bst.insert(5)
    bst.insert(4)
    bst.insert(3)
    bst.insert(2)
    bst.insert(1)

    expect(bst.inOrderTraversal()).toEqual([1, 2, 3, 4, 5])
    expect(bst.preOrderTraversal()).toEqual([5, 4, 3, 2, 1])
    expect(bst.postOrderTraversal()).toEqual([1, 2, 3, 4, 5])
  })

  it('should handle empty tree gracefully', () => {
    const bst = new BinarySearchTree<number>()

    expect(bst.inOrderTraversal()).toEqual([])
    expect(bst.preOrderTraversal()).toEqual([])
    expect(bst.postOrderTraversal()).toEqual([])
    expect(bst.searchTree(10)).toBe(false)
  })

  it('should handle large numbers of values efficiently', () => {
    const bst = new BinarySearchTree<number>()
    const numValues = 1000

    for (let i = 0; i < numValues; i++) {
      bst.insert(i)
    }

    expect(bst.inOrderTraversal()).toEqual(
      Array.from({ length: numValues }, (_, i) => i)
    )
  })

  it('min should return the minimum value', () => {
    const bst = new BinarySearchTree<number>()
    bst.insert(10)
    bst.insert(5)
    bst.insert(15)
    bst.insert(3)
    bst.insert(7)

    expect(bst.min(bst.getRoot())).toBe(3)
  })

  it('max should return the maximum value', () => {
    const bst = new BinarySearchTree<number>()
    bst.insert(10)
    bst.insert(5)
    bst.insert(15)
    bst.insert(3)
    bst.insert(7)

    expect(bst.max(bst.getRoot())).toBe(15)
  })
})
