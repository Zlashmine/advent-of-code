import { Vector2 } from 'app/type'

export class Cell {
  public char: string
  public cost: number
  public position: Vector2

  constructor(char: string, cost: number, position: Vector2) {
    this.char = char
    this.cost = cost
    this.position = position
  }

  public static Empty(): Cell {
    return new Cell('.', 0, [0, 0])
  }
}
