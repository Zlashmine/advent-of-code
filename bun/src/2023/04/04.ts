import { numbersByWhitespace, sumReducer } from '@/math'
import { Puzzle } from 'domain/index'

import { ICard, ICardCollection } from './types'

export default class ConcretePuzzle extends Puzzle {
  private originalCards: ICard[] = []
  private cardCollection: ICardCollection = {}

  public solveFirst(): string {
    this.originalCards = this.input.split('\n').map(this.createCard)

    return this.originalCards
      .map(({ id, matchingNumbers }) => ({
        id,
        value: matchingNumbers.reduce(acc => (acc ? acc * 2 : 1), 0)
      }))
      .map(({ value }) => value)
      .reduce(sumReducer, 0)
      .toString()
  }

  public solveSecond(): string {
    this.addCardsToCollection(this.originalCards.map(card => card.id))

    for (let index = 0; index < this.originalCards.length; index++) {
      const card = this.originalCards[index]

      if (!card) {
        continue
      }

      this.addCardsToCollection(
        this.getWonCardsFrom(card.id),
        this.cardCollection[card.id]
      )
    }

    return Object.values(this.cardCollection).reduce(sumReducer, 0).toString()
  }

  public getFirstExpectedResult(): string {
    return '24175'
  }

  public getSecondExpectedResult(): string {
    return '18846301'
  }

  private createCard(row: string): ICard {
    const [firstPart, winningNumbers] = row.split('|')
    const [game, numbers] = firstPart!.split(':')

    return {
      id: Number(game!.substring(5, game!.length)),
      value: 0,
      matchingNumbers: numbersByWhitespace(winningNumbers).filter(number =>
        numbersByWhitespace(numbers).includes(number)
      )
    }
  }

  private getWonCardsFrom(cardId: number): number[] {
    const card = this.originalCards.find(card => card.id === cardId)

    return card
      ? card.matchingNumbers.map((_, index) => cardId + index + 1)
      : []
  }

  private addCardsToCollection(
    numbersToAdd: number[],
    copies: number = 1
  ): void {
    for (let index = 0; index < copies; index++) {
      numbersToAdd.forEach(number => {
        if (!this.cardCollection[number]) {
          this.cardCollection[number] = 0
        }

        this.cardCollection[number] += 1
      })
    }
  }
}
