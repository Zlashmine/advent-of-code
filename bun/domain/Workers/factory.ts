/* eslint-disable @typescript-eslint/no-explicit-any */
import { IWorkerJob } from './types'

type ResolveType<TRes> = (value: Array<TRes>) => void

export class WorkerFactory<T, TRes> {
  completedWorkers = 0
  jobStartTime = 0

  constructor(private job: IWorkerJob<T, TRes>) {}

  public async scheduleJob() {
    return new Promise((resolve: ResolveType<TRes>) => {
      const workers = this.createWorkers()

      this.jobStartTime = this.job.options?.log ? performance.now() : 0

      for (let i = 0; i < this.job.inputs.length; i++) {
        const worker = workers[i]

        if (!worker) {
          continue
        }

        worker.postMessage(this.job.inputs[i])
        worker.onmessage = (event: MessageEvent) =>
          this.handleOnWorkerCompleted(i, event.data, resolve)
      }
    })
  }

  private createWorkers(): Worker[] {
    const workers: Worker[] = []

    for (let i = 0; i < this.job.inputs.length; i++) {
      workers.push(new Worker(this.job.path, { type: 'module' }))
    }

    return workers
  }

  private handleOnWorkerCompleted(
    index: number,
    data: TRes,
    resolve: ResolveType<TRes>
  ) {
    this.completedWorkers++
    this.job.results[index] = data

    if (this.job.options?.log) {
      console.log('Worker', index, 'completed work with', data)
    }

    if (this.completedWorkers !== this.job.inputs.length) {
      return
    }

    if (this.job.options?.log) {
      const duration = performance.now() - this.jobStartTime
      console.log(
        'Job completed after',
        (duration / 1000).toPrecision(2),
        's\n'
      )
    }

    resolve(this.job.results)
  }
}
