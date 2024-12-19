import { Vector2 } from 'app/type'

export const sumNumbers = (numbers: number[]): number =>
  (numbers || []).reduce(sumReducer, 0)

export const sumReducer = (acc: number, number: number | string) =>
  acc + Number(number)

export const multiplyReducer = (acc: number, number: number | string) =>
  acc * Number(number)

export const isNumber = (value: string | undefined) =>
  value && !Number.isNaN(Number(value))

export const numbersInString = (
  string: string | undefined,
  delimiter: string
): number[] =>
  (string || '')
    .split(delimiter || '')
    .filter(isNumber)
    .map(Number)

export const numbersInStrings = (
  strings: string[] | undefined,
  delimiter: string | undefined
): number[][] =>
  (strings || []).map(string => string.split(delimiter || '').map(Number))

export const numbersByWhitespace = (string: string | undefined): number[] =>
  (string || '').split(' ').map(Number).filter(Boolean)

export const uniqueNumbersInString = (string: string | undefined) =>
  Array.from(new Set(numbersInString(string, '')))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const groupArrayBy = (arrayToGroup: any[], grupByCount: number): any[] =>
  arrayToGroup.reduce((acc, _, index, array) => {
    if (index % grupByCount === 0) {
      acc.push(array.slice(index, index + grupByCount))
    }

    return acc
  }, [])

export const groupArraysInChunks = (
  arraysToGroup: any[][],
  groupByCount: number
): any[][] => {
  const acc: any[][][] = []

  let i = 0
  while (i < arraysToGroup.length) {
    const newArray = arraysToGroup.slice(i, i + groupByCount)
    acc.push(newArray)

    i += groupByCount
  }

  return acc[0]!
}

export const clamp = (num: number, min: number, max: number): number =>
  Math.min(Math.max(num, min), max)

/**
 * Generates all possible variations of the array with the given operators
 * @param array
 * @param operators
 * @returns
 * @example
 * generateVariations(['1', '2', '3'], ['+', '-'])
 * // ['1+2+3', '1+2-3', '1-2+3', '1-2-3']
 */
export function generateVariations(
  array: string[],
  operators: string[]
): string[] {
  if (array.length < 2) {
    return array
  }

  const result: string[] = []

  function generate(index: number, current: string) {
    if (index === array.length - 1) {
      result.push(current)
      return
    }

    for (const operator of operators) {
      generate(index + 1, current + operator + array[index + 1])
    }
  }

  generate(0, `${array[0]}`)
  return result
}
