import { WorkerFactory } from 'domain/index'
import { IWorkerJob } from 'domain/Workers'

import { sumReducer } from '@/math'

const workers = 4
const countTimes = 4

const countJob: IWorkerJob<number, number> = {
  inputs: Array.from({ length: workers * countTimes }).map(
    () => countTimes / workers
  ),
  results: [],
  options: { log: false },
  path: `${import.meta.dir}/worker-count.ts`
}

const randomWaitJob: IWorkerJob<number, number> = {
  inputs: Array.from({ length: workers }).map((_, index) => index),
  results: [],
  options: { log: false },
  path: `${import.meta.dir}/worker-wait.ts`
}

export default class WorkersExample {
  public solveFirst(): Promise<string> {
    const workerFactory = new WorkerFactory<number, number>(countJob)

    return workerFactory
      .scheduleJob()
      .then(result => result.reduce(sumReducer, 0).toString())
  }

  public solveSecond(): Promise<string> {
    const workerFactory = new WorkerFactory<number, number>(randomWaitJob)

    return workerFactory
      .scheduleJob()
      .then(result => result.reduce(sumReducer, 0).toString())
  }

  public getFirstExpectedResult(): string {
    return (1e9 * countTimes * workers).toString()
  }

  public getSecondExpectedResult(): string {
    return randomWaitJob.inputs.reduce(sumReducer, 0).toString()
  }
}
