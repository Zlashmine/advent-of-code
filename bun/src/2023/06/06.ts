import { multiplyReducer, numbersByWhitespace } from '@/math'
import { Puzzle } from 'domain/index'
import { IRaceResult, IRaceSheet } from './types'

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    return this.solveRaceWith(numbers => numbers)
  }

  public solveSecond(): string {
    const mergeNumbers = (numbers: number[]) => [
      Number(numbers.map(number => number.toString()).join(''))
    ]

    return this.solveRaceWith(mergeNumbers)
  }

  public getFirstExpectedResult(): string {
    return '2449062'
  }

  public getSecondExpectedResult(): string {
    return '33149631'
  }

  private solveRaceWith(
    withNumbersFunc: (numbers: number[]) => number[]
  ): string {
    return this.createRaceResults(this.input, withNumbersFunc)
      .raceResults.map(this.calculateNumbersOfWaysToBeatRace)
      .reduce(multiplyReducer, 1)
      .toString()
  }

  private calculateNumbersOfWaysToBeatRace(race: IRaceResult): number {
    const holdResults: IRaceResult[] = []

    for (let raceIndex = 0; raceIndex < race.time; raceIndex++) {
      const timeLeft = race.time - raceIndex

      holdResults.push({
        time: raceIndex,
        distance: timeLeft * raceIndex
      })
    }

    return holdResults.filter(result => result.distance > race.distance).length
  }

  private createRaceResults(
    input: string,
    withNumbersFunc: (numbers: number[]) => number[]
  ): IRaceSheet {
    return {
      raceResults: input
        .split('\n')
        .reduce((acc: IRaceResult[], row: string) => {
          const rowKey = row.split(':')[0]!.toLowerCase() as keyof IRaceResult
          const numbersInRow = numbersByWhitespace(row.split(':').pop())

          withNumbersFunc(numbersInRow).forEach((value, valueIndex) => {
            if (!acc[valueIndex]) {
              acc[valueIndex] = {
                time: 0,
                distance: 0
              }
            }

            acc[valueIndex]![rowKey] = value
          })

          return acc
        }, [])
    }
  }
}
