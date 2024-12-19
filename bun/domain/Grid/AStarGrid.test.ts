import { Vector2 } from 'app/type'
import { describe, expect, it } from 'bun:test'

import { AStarGrid } from './AStarGrid'
import { Cell } from './Cell'

const createSimpleGrid = (): AStarGrid => {
  const grid = new AStarGrid()
  grid.createFrom(10, 10, new Cell('.', 1, [0, 0]))
  grid.forEach((cell, [x, y]) => {
    cell.position = [x, y]
    grid.set([x, y], cell)
  })
  return grid
}

describe('AStar', () => {
  it('should initialize a grid with correct dimensions', () => {
    const grid = createSimpleGrid()

    expect(grid.width).toBe(10)
    expect(grid.height).toBe(10)
  })

  it('should allow setting and retrieving cells', () => {
    const grid = createSimpleGrid()

    const cell = new Cell('A', 2, [5, 5])
    grid.set([5, 5], cell)

    const retrievedCell = grid.get([5, 5])
    expect(retrievedCell.char).toBe('A')
    expect(retrievedCell.cost).toBe(2)
    expect(retrievedCell.position).toEqual([5, 5])
  })

  it('should avoid high-cost cells', () => {
    const grid = createSimpleGrid()

    // Add high-cost cells in a vertical line at x = 5
    for (let y = 0; y < 10; y++) {
      const cell = new Cell('X', 100, [5, y])
      grid.set([5, y], cell)
    }

    const start = [0, 0] as Vector2
    const end = [9, 9] as Vector2

    const path = grid.findShortestPath(start, end)

    // Ensure the path does not include any cell with x = 5
    for (const point of path) {
      expect(point[0]).not.toBe(5)
    }
  })

  it('should handle a case with no valid path', () => {
    const grid = createSimpleGrid()

    // Surround the start position with high-cost cells
    grid.set([1, 0], new Cell('X', 100, [1, 0]))
    grid.set([0, 1], new Cell('X', 100, [0, 1]))

    const start = [0, 0] as Vector2
    const end = [9, 9] as Vector2

    const path = grid.findShortestPath(start, end)

    expect(path.length).toBe(0) // No valid path should be found
  })

  it('should reconstruct paths correctly', () => {
    const grid = createSimpleGrid()

    const start = [0, 0] as Vector2
    const end = [3, 3] as Vector2

    const path = grid.findShortestPath(start, end)

    // Verify the path is continuous and correctly reconstructed
    for (let i = 1; i < path.length; i++) {
      const [prevX, prevY] = path[i - 1]!
      const [currX, currY] = path[i]!
      expect(Math.abs(currX - prevX) + Math.abs(currY - prevY)).toBe(1) // Manhattan distance of 1 between consecutive points
    }
  })
})
