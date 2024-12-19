export interface IWorkerJob<T, TRes> {
  readonly inputs: T[]
  readonly results: TRes[]
  readonly options?: { log: boolean }
  path: string
}
