package main

import (
	"advent_of_code/tournament-of-algorithmia"
	"advent_of_code/utils"
)

type Puzzle struct {
	inputs [3]string
}

func main() {
	inputs, _ := tournament.LoadFiles()

	solver := &Puzzle{inputs}

	utils.ShowResult(1, 0, solver.solvePart1())
	utils.ShowResult(2, 0, solver.solvePart2())
	utils.ShowResult(3, 0, solver.solvePart3())
}

func (s *Puzzle) solvePart1() int {
	return 0
}

func (s *Puzzle) solvePart2() int {
	return 0
}

func (s *Puzzle) solvePart3() int {
	return 0
}
