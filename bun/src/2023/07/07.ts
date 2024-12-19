import { Puzzle } from 'domain/index'

import { sumReducer } from '@/math'

import { CARDS_JOKERS, CARDS_REGULAR, HANDS, NO_OUTCOME } from './constants'
import { IDict, IHand, IHandsGroupedDict, IOutcome } from './types'

export default class ConcretePuzzle extends Puzzle {
  private rules: string[] = []
  private withJokers: boolean = false

  public async solveFirst(): Promise<string> {
    const res = this.solveWithRules(CARDS_REGULAR)
    console.log(res)
    return res
  }

  public async solveSecond(): Promise<string> {
    this.withJokers = true
    return this.solveWithRules(CARDS_JOKERS)
  }

  public getFirstExpectedResult(): string {
    return '246409899'
  }

  public getSecondExpectedResult(): string {
    return '244848487'
  }

  private solveWithRules(rules: string[]): string {
    this.rules = rules

    const handsPerGroup: IHandsGroupedDict = this.createHands().reduce(
      (acc: IHandsGroupedDict, hand) => {
        const key = Number(hand.outcome.power)

        if (!acc[key]) {
          acc[key] = []
        }

        acc[key]!.push(hand)
        return acc
      },
      {}
    )

    return Object.keys(handsPerGroup)
      .reduce((acc: IHandsGroupedDict, key: string) => {
        const handsForGroup = handsPerGroup[Number(key)]!
        const internallySortedCards = handsForGroup
          .sort((a: IHand, b: IHand) => this.sortCards(a, b))
          .map((hand, index) => ({
            ...hand,
            // Internal ranking -> Rank 5 Index 0 becomes 5.99, Rank 5 index 1 becomes 5.98 etc.
            rank: hand.rank! + (1 - index / handsForGroup.length)
          }))

        acc[Number(key)] = internallySortedCards
        return acc
      }, {})
      .flatMapValues<IHand>()
      .sort((a, b) => a.rank! - b.rank!)
      .map((hand: IHand, index: number) => hand.bid * (index + 1), 1)
      .reduce(sumReducer, 0)
      .toString()
  }

  private createHands(): IHand[] {
    return this.input
      .split('\n')
      .map(row => {
        const [cardPart, bidPart] = row.split(' ')
        const cards = cardPart!.split('')
        const outcome = this.createOutcome(cards)

        return {
          cards,
          outcome,
          rank: outcome.power,
          bid: Number(bidPart)
        }
      })
      .sort((a, b) => b.outcome.power - a.outcome.power)
  }

  private sortCards(a: IHand, b: IHand): number {
    const cardsCount = Math.min(a.cards.length, b.cards.length)

    for (let charIndex = 0; charIndex < cardsCount; charIndex++) {
      const aCard = a.cards[charIndex]
      const bCard = b.cards[charIndex]

      if (aCard === bCard) {
        continue
      }

      return this.rules.indexOf(aCard!) > this.rules.indexOf(bCard!) ? 1 : -1
    }

    return 0
  }

  private createOutcome(cards: string[]): IOutcome {
    if (!this.withJokers || !cards.includes('J')) {
      return this.getOutcomeForHand(cards)
    }

    const outcomes: IOutcome[] = []

    const cardString = cards.join('')
    for (let charIndex = 0; charIndex < cards.length; charIndex++) {
      const replacedCards = cardString.replace(/J/g, cards[charIndex]!).split('')

      outcomes.push(this.getOutcomeForHand(replacedCards))
    }

    return outcomes.sort((a, b) => b.power - a.power)[0]!
  }

  private getOutcomeForHand(cards: string[]): IOutcome {
    const bestOutcome = cards
      .reduce((acc: IDict, card) => {
        acc[card] = acc[card] ? acc[card]! + 1 : 1

        return acc
      }, {})
      .getValues<number>()
      .sort((a, b) => b - a)
      .toString()

    return HANDS.find(({ outcome }) => outcome === bestOutcome) || NO_OUTCOME
  }
}
