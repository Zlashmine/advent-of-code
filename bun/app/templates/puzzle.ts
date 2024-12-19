import dedent from 'dedent'

export function getTemplate(day: number): string {
  return dedent`
  import { Puzzle } from 'domain/index'

  export default class ConcretePuzzle extends Puzzle {
    public solveFirst(): string {
      return '0';
    }

    public solveSecond(): string {
      return '0';
    }

    public getFirstExpectedResult(): string {
      return '0';
    }

    public getSecondExpectedResult(): string {
      return '0';
    }
  }

`
}
