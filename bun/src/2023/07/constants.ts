import { IOutcome } from './types'

export const CARDS_REGULAR: string[] = [
  'A',
  'K',
  'Q',
  'J',
  'T',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2'
]
export const CARDS_JOKERS: string[] = [
  'A',
  'K',
  'Q',
  'T',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
  'J'
]

export const HANDS: IOutcome[] = [
  {
    outcome: '5',
    name: 'FIVE_OF_A_KIND',
    power: 7
  },
  {
    outcome: '4,1',
    name: 'FOUR_OF_A_KIND',
    power: 6
  },
  {
    outcome: '3,2',
    name: 'FULL_HOUSE',
    power: 5
  },
  {
    outcome: '3,1,1',
    name: 'THREE_OF_A_KIND',
    power: 4
  },
  {
    outcome: '2,2,1',
    name: 'TWO_PAIR',
    power: 3
  },
  {
    outcome: '2,1,1,1',
    name: 'ONE_PAIR',
    power: 2
  },
  {
    outcome: '1,1,1,1,1',
    name: 'HIGH_CARD',
    power: 1
  }
]

export const NO_OUTCOME: IOutcome = {
  outcome: '?',
  name: 'UNKNOWN',
  power: 0
}
