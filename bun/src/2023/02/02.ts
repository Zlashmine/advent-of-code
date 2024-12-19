import { sumReducer } from '@/math';
import { Puzzle } from 'domain/index'
import { IGame, ISet } from './types';

const maxLimits: ISet = {
  red: 12,
  green: 13,
  blue: 14,
};

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    return this.input
      .split('\n')
      .map((row) => this.getRounds(row))
      .filter((round) => !this.hasImpossibleRoundInSets(round.rounds))
      .map((round) => round.id)
      .reduce(sumReducer, 0)
      .toString();
  }

  public solveSecond(): string {
    return this.input
      .split('\n')
      .map((row) => this.getRounds(row))
      .map((round) => this.getHighestRollOfCubes(round))
      .map((set) => set.blue * set.green * set.red)
      .reduce(sumReducer, 0)
      .toString();
  }

  public getFirstExpectedResult(): string {
    return '3035';
  }

  public getSecondExpectedResult(): string {
    return '66027';
  }

  private getRounds(row: string): IGame {
    const [id, sets] = row.split(':');

    if (!sets || !id) {
      return {
        id: 0,
        rounds: [],
      };
    }

    const rounds = sets
      .split(';')
      .map((set) => this.getCubeRollsFromRound(set));

    return {
      id: Number(id.split(' ').pop()),
      rounds,
    };
  }

  private hasImpossibleRoundInSets(sets: ISet[]): boolean {
    return sets.some(
      (set) =>
        set.red > maxLimits.red ||
        set.green > maxLimits.green ||
        set.blue > maxLimits.blue
    );
  }

  private getCubeRollsFromRound(set: string): ISet {
    return set
      .split(', ')
      .map((round) => {
        const [count, color] = round.trim().split(' ');

        return {
          count: Number(count),
          color: color as keyof ISet,
        };
      })
      .reduce(
        (acc, curr) => {
          acc[curr.color] += curr.count;

          return acc;
        },
        { red: 0, green: 0, blue: 0 }
      );
  }

  private getHighestRollOfCubes({ rounds }: IGame): ISet {
    return rounds.reduce((acc, curr) => {
      Object.keys(curr).forEach((color: string) => {
        const key = color as keyof ISet;
        acc[key] = Math.max(acc[key], curr[key]);
      });

      return acc;
    }, { red: 0, green: 0, blue: 0 });
  }
}