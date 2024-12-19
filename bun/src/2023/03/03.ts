import { isNumber, sumReducer } from '@/math'
import { Puzzle } from 'domain/index'

import {
  Grid,
  GridNumber,
  GridRow,
  SymbolIndexDictionary,
  SymbolType
} from './types'

export default class ConcretePuzzle extends Puzzle {
  private grid!: Grid

  public solveFirst(): string {
    this.grid = this.createGrid()

    return this.grid.rows
      .map(row =>
        this.getSymbolsWithAdjacents(row)
          .filter(it => it.adjacentSymbols?.length)
          .map(({ symbol }) => Number(symbol))
          .reduce(sumReducer, 0)
      )
      .reduce(sumReducer, 0)
      .toString()
  }

  public solveSecond(): string {
    const occurrences: SymbolIndexDictionary = this.getOccurences()

    this.grid.rows.forEach(row =>
      this.getSymbolsWithAdjacents(row).forEach(
        symbol =>
          symbol.adjacentSymbols?.forEach(adjacent =>
            occurrences[this.getKeyFor(adjacent)]!.symbolsConnected.push(symbol)
          )
      )
    )

    return Object.values(occurrences)
      .filter(occurrence => occurrence.count === 2)
      .flatMap(occurrence => occurrence)
      .map(({ symbolsConnected }) =>
        symbolsConnected.reduce((acc, curr) => acc * Number(curr.symbol), 1)
      )
      .reduce(sumReducer, 0)
      .toString()
  }

  public getSecondExpectedResult(): string {
    return '78826761'
  }

  public getFirstExpectedResult(): string {
    return '533784'
  }

  private createGrid(): Grid {
    const rows: GridRow[] = this.input.split('\n').map((row, rowIndex) => {
      const gridSymbols: GridNumber[] = []
      const rowCharacters = row.split('')

      let skipCount = 0
      for (
        let indexInRow = 0;
        indexInRow < rowCharacters.length;
        indexInRow++
      ) {
        if (skipCount > 0) {
          skipCount--
          continue
        }

        let symbol = rowCharacters[indexInRow]

        if (!symbol) {
          continue
        }

        if (isNumber(symbol)) {
          let lookAhead = 0

          while (isNumber(rowCharacters[indexInRow + lookAhead + 1])) {
            symbol += rowCharacters[indexInRow + lookAhead + 1]
            lookAhead++
          }

          skipCount = lookAhead
        }

        gridSymbols.push({
          symbol,
          indexInRow,
          rowIndex,
          type: this.getSymbolType(symbol)
        })
      }

      return {
        index: rowIndex,
        gridSymbols
      }
    })

    return {
      rows
    }
  }

  private getSymbolsWithAdjacents(row: GridRow): GridNumber[] {
    return row.gridSymbols
      .filter(symbol => symbol.type === 'number')
      .map(symbol => ({
        ...symbol,
        adjacentSymbols: this.getAdjacentSymbols(symbol, row.index)
      }))
  }

  private getOccurences() {
    return this.grid.rows
      .map(row =>
        row.gridSymbols
          .filter(symbol => symbol.type === 'number')
          .map(symbol => this.getAdjacentSymbols(symbol, row.index))
          .flatMap(it => it)
      )
      .flatMap(it => it)
      .reduce((acc: SymbolIndexDictionary, curr) => {
        const key = this.getKeyFor(curr)

        const record = acc[key]

        if (!record) {
          acc[key] = { count: 1, symbolsConnected: [] }

          return acc
        }

        record.count += 1
        return acc
      }, {})
  }

  private getRowsToCheckForSymbols(rowIndex: number): number[] {
    const rowsToCheck = [rowIndex]

    if (rowIndex !== 0) {
      rowsToCheck.push(rowIndex - 1)
    }

    if (rowIndex < this.grid.rows.length - 1) {
      rowsToCheck.push(rowIndex + 1)
    }

    return rowsToCheck
  }

  private getSymbolType(string: string): SymbolType {
    if (string === '.' || string === '') {
      return 'dot'
    }

    if (isNumber(string)) {
      return 'number'
    }

    return 'symbol'
  }

  private getAdjacentSymbols(
    symbol: GridNumber,
    rowIndex: number
  ): GridNumber[] {
    return this.getRowsToCheckForSymbols(rowIndex)
      .map(rowIndexToCheck =>
        this.grid.rows
          .find(it => it.index === rowIndexToCheck)!
          .gridSymbols.filter(it => it.type === 'symbol')
          .filter(
            it =>
              it.indexInRow <= symbol.indexInRow + symbol.symbol.length &&
              it.indexInRow >= symbol.indexInRow - 1
          )
      )
      .filter(it => it.length)
      .flatMap(x => x)
  }

  private getKeyFor(symbol: GridNumber) {
    return `${symbol.rowIndex}-${symbol.indexInRow}`
  }
}
