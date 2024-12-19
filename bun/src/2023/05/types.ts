export interface IMap {
  name: string
  getValueForSeed: (seed: number) => number
}

export interface IRangeDictionary {
  [x: number]: number
}

export interface IRange {
  dest: number
  start: number
  range: number
}
