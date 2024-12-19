import { Vector2 } from 'app/type'
import { LinkedList } from 'domain/index'

import VectorUtils from '@/vectors'

export const DIRECTIONS: Vector2[] = [
  VectorUtils.DIRECTIONS.up,
  VectorUtils.DIRECTIONS.right,
  VectorUtils.DIRECTIONS.down,
  VectorUtils.DIRECTIONS.left
] as const

export type OnTrailCompletedFunc = (pathKey: string) => void
