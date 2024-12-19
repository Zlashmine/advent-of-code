import { Vector2 } from 'app/type'
import { describe, expect, it } from 'bun:test'

import { WrappingGrid } from './WrappingGrid'

const grid: WrappingGrid<string> = new WrappingGrid().createFrom(
  6,
  6,
  '.'
) as WrappingGrid<string>

describe('Wrapping', () => {
  it('should add vectors and wrap correctly', () => {
    const cases: [Vector2, Vector2, Vector2][] = [
      [
        [0, 0],
        [1, 1],
        [1, 1]
      ],
      [
        [0, 0],
        [10, 0],
        [4, 0]
      ],
      [
        [0, 0],
        [10, 0],
        [4, 0]
      ],
      [
        [0, 0],
        [-1, -1],
        [5, 5]
      ],
      [
        [0, 0],
        [-11, -13],
        [1, 5]
      ]
    ]

    cases.forEach(([position, velocity, expected]) => {
      const result = grid.translate(position, velocity)

      expect(result).toEqual(expected)
    })
  })
})
