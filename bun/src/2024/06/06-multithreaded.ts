import { Vector2 } from 'app/type'
import { WorkerFactory } from 'domain/Workers'

import { sumReducer } from '@/math'

import ConcretePuzzle, { GUARD } from './06'

export type WorkerInput = {
  chunk: Vector2[]
  input: { input: string }
}

export default class MultiThreadedPuzzle extends ConcretePuzzle {
  public async solveSecond(): Promise<string> {
    const chunks = this.createChunks()

    return new WorkerFactory<WorkerInput, number>({
      inputs: Array.from({ length: chunks.length }).map((_, index) => ({
        chunk: chunks[index]!,
        input: { input: this.input }
      })),
      results: [],
      options: { log: false },
      path: `${import.meta.dir}/worker.ts`
    })
      .scheduleJob()
      .then(result => result.reduce(sumReducer, 0).toString())
  }

  private createChunks(): Vector2[][] {
    this.createGrid()

    const chunks: Vector2[][] = []
    for (let y = 0; y < this.grid.length; y++) {
      chunks[y] = []

      for (let x = 0; x < this.grid[y]!.length; x++) {
        if (this.grid[y]![x] === GUARD) {
          continue
        }

        chunks[y]![x] = [x, y]
      }
    }

    return chunks
  }
}
