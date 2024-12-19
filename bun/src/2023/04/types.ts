export interface ICard {
  id: number
  value: number
  matchingNumbers: number[]
}

export interface ICardCollection {
  [key: string]: number
}
