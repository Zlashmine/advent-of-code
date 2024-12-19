export interface Instruction {
  type: 'enable' | 'disable' | 'multiply'
  index: number
  number: number
}
