import { IPuzzleInterface } from './Puzzle.types'

export default abstract class Puzzle implements IPuzzleInterface {
  protected input: string = ''

  public setInput(input: string): Puzzle {
    this.input = input

    return this
  }

  public getInput(): string {
    return this.input
  }

  public abstract solveFirst(): string | Promise<string>
  public abstract solveSecond(): string | Promise<string>

  public abstract getFirstExpectedResult(): string
  public abstract getSecondExpectedResult(): string
}

export { Puzzle }
