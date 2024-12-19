export interface IHand {
  outcome: IOutcome
  cards: string[]
  bid: number
  rank?: number
}

export interface IOutcome {
  outcome: string
  name: string
  power: number
}

export interface IDict {
  [x: string]: number
}

export interface IHandsGroupedDict {
  [x: number]: IHand[]
}
