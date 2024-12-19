export interface Grid {
  rows: GridRow[]
}

export interface GridRow {
  index: number
  gridSymbols: GridNumber[]
}

export interface GridNumber {
  symbol: string
  type: SymbolType
  indexInRow: number
  rowIndex: number
  adjacentSymbols?: GridNumber[]
}

export interface SymbolIndexDictionary {
  [x: string]: {
    count: number
    symbolsConnected: GridNumber[]
  }
}

export type SymbolType = 'dot' | 'number' | 'symbol'
