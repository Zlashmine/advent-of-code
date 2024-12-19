export interface Equation {
  value: number
  operators: number[]
  variations: string[]
}

export interface EquationConfiguration {
  left: number
  right: number
  operation?: 'multiply' | 'add'
}
