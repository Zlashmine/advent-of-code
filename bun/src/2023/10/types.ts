export interface IGrid {
  [cord: string]: IPipe
}

export interface IConnection {
  direction: string
  validConnections: string[]
}

export interface IPipe {
  symbol: string
  validConnections: IConnection[]
  cord?: string
  distance: number
}
