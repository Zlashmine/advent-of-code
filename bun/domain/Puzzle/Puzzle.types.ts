export interface IPuzzleInterface {
  solveFirst: () => string | Promise<string>
  solveSecond: () => string | Promise<string>
  getFirstExpectedResult: () => string
  getSecondExpectedResult: () => string
}
