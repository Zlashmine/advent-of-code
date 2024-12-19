import { Vector2 } from 'app/type'
import { Grid } from 'domain/index'

import VectorUtils from '@/vectors'

export const BOX = 'O'
export const WALL = '#'
export const ROBOT = '@'

const INSTRUCTION_MOVE_MAP = new Map<string, Vector2>([
  ['^', [0, -1]],
  ['v', [0, 1]],
  ['<', [-1, 0]],
  ['>', [1, 0]]
])

export interface Box {
  position: Vector2
  newPosition?: Vector2
}

export interface MoveOperation {
  start: Vector2
  robotPosition: Vector2
  boxes: Box[]
}

export class BoxGrid extends Grid<string> {
  public handleMoveInstruction(vector: Vector2, instruction: string): Vector2 {
    const moveOperation = this.getObjectsInDirection(
      vector,
      INSTRUCTION_MOVE_MAP.get(instruction)!
    )

    return this.updateGrid(moveOperation)
  }

  private updateGrid(moveOperation: MoveOperation): Vector2 {
    moveOperation.boxes.forEach(box => this.set(box.position!, '.'))
    moveOperation.boxes.forEach(box => this.set(box.newPosition!, BOX))

    this.set(moveOperation.start, '.')
    this.set(moveOperation.robotPosition, '@')

    return moveOperation.robotPosition
  }

  private getObjectsInDirection(
    position: Vector2,
    direction: Vector2
  ): MoveOperation {
    const boxes: Box[] = []
    let currentPosition = VectorUtils.add(position, direction)

    while (true) {
      if (this.get(currentPosition) === WALL) {
        return {
          start: position,
          robotPosition: position,
          boxes: []
        }
      }

      if (this.get(currentPosition) === '.') {
        break
      }

      boxes.push({ position: currentPosition })
      currentPosition = VectorUtils.add(currentPosition, direction)
    }

    for (const box of boxes) {
      box.newPosition = VectorUtils.add(box.position, direction)
    }

    return {
      start: position,
      robotPosition: VectorUtils.add(position, direction),
      boxes
    }
  }
}
