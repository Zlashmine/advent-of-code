/**
 * Get the indexes of all the matches of a string in another string.
 * @param str The string to search in.
 * @param toMatch The string to search for.
 * @returns An array of indexes where the string was found.
 * @example
 * getMatchIndexes('Hello, World!', 'o'); // [4, 8]
 */
export function getMatchIndexes(str: string, toMatch: string): number[] {
  const toMatchLength = toMatch.length
  const indexMatches = []
  let match
  let i = 0

  while ((match = str.indexOf(toMatch, i)) > -1) {
    indexMatches.push(match)
    i = match + toMatchLength
  }

  return indexMatches
}

export const isBefore = (
  a: number | undefined,
  b: number | undefined,
  array: number[]
): boolean => {
  if (a === undefined || b === undefined) {
    return false
  }

  if (!array.includes(a) || !array.includes(b)) {
    return false
  }

  return array.indexOf(a) < array.indexOf(b)
}

export const isAfter = (
  a: number | undefined,
  b: number | undefined,
  array: number[]
): boolean => {
  if (a === undefined || b === undefined) {
    return false
  }

  if (!array.includes(a) || !array.includes(b)) {
    return false
  }

  return array.indexOf(a) > array.indexOf(b)
}

export const findMiddleElementInArray = <T>(array: T[]): T | undefined => {
  if (array.length % 2 === 0) {
    return undefined
  }

  return array[Math.floor(array.length / 2)]
}

export const shiftElementToNextIndex = <T>(array: T[], index: number): T[] => {
  if (index === array.length - 1) {
    return array
  }

  const newArray = [...array]
  const [element] = newArray.splice(index, 1)

  if (element === undefined) {
    return array
  }

  return [
    ...newArray.slice(0, index + 1),
    element,
    ...newArray.slice(index + 1)
  ]
}

// Helper function to generate permutations recursively
export function getAllPermutations<T>(arr: T[]): T[][] {
  const results: T[][] = []

  function permute(current: T[], remaining: T[]) {
    if (remaining.length === 0) {
      results.push([...current])
      return
    }

    for (let i = 0; i < remaining.length; i++) {
      current.push(remaining[i]!)
      permute(
        current,
        remaining.filter((_, index) => index !== i)
      )
      current.pop()
    }
  }

  permute([], arr)
  return results
}

export const swapIndicesInString = <T>(
  array: T[],
  indexA: number,
  indexB: number
): T[] => {
  let originalAValue = array[indexA]
  let originalBValue = array[indexB]

  array[indexA] = originalBValue as T
  array[indexB] = originalAValue as T

  return array
}

/* 
  This function is a memoization function that caches the results of a function
  based on the arguments it receives. If the function is called with the same
  arguments, it will return the cached result instead of recalculating it.
  Found on: https://retz.dev/blog/typescript-memoization
*/
export function memo<T extends unknown[], A>(fn: (...args: T) => A) {
  const cache = new Map()

  return function (...args: T) {
    const key = args.map(arg => `${arg}_${typeof arg}`).join('|')

    if (cache.has(key)) {
      return cache.get(key)
    }
    const result = fn(...args)

    cache.set(key, result)
    return result
  }
}
