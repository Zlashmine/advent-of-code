export default class GridUtils {
  private constructor() {}

  public static createGrid<T>(input: string): T[][] {
    return input
      .trim()
      .split('\n')
      .map(row => row.split('').map(char => char as unknown as T))
  }

  public static createGridWithSize<T>(width: number, height: number): T[][] {
    return Array.from({ length: height }, () => Array.from({ length: width }))
  }
}
