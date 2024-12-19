package main

import (
	"strings"

	"advent_of_code/tournament-of-algorithmia"
	"advent_of_code/utils"
)

type Puzzle struct {
	inputs [3]string
}

func main() {
	inputs, _ := tournament.LoadFiles()

	solver := &Puzzle{inputs}

	firstResult, firstPerformance := utils.WithPerformance(solver.solvePart1)
	secondsResult, secondPerformance := utils.WithPerformance(solver.solvePart2)
	thirdResult, thirdPerformance := utils.WithPerformance(solver.solvePart3)

	utils.ShowResult(1, 1321, firstResult, firstPerformance)
	utils.ShowResult(2, 5643, secondsResult, secondPerformance)
	utils.ShowResult(3, 28175, thirdResult, thirdPerformance)
}

func (s *Puzzle) solvePart1() int {
	creaturesMap := map[string]int{
		"A": 0,
		"B": 1,
		"C": 3,
	}

	total := 0
	for _, creature := range strings.Split(s.inputs[0], "") {
		if value, exists := creaturesMap[creature]; exists {
			total += value
		}
	}

	return total
}

func (s *Puzzle) solvePart2() int {
	return s.calculateWithPower(2, s.inputs[1])
}

func (s *Puzzle) solvePart3() int {
	return s.calculateWithPower(3, s.inputs[2])
}

func (s *Puzzle) calculateWithPower(power int, input string) int {
	creaturesMap := map[string]int{
		"A": 0,
		"B": 1,
		"C": 3,
		"D": 5,
	}

	creatures := strings.Split(input, "")

	index := 0
	total := 0
	for index < len(creatures) {
		checkAhead := utils.Ternary(index >= len(input)-1, 0, power)
		pair := input[index:utils.Clamp(index+checkAhead, 0, len(input))]

		emptySlots := utils.Filter(strings.Split(pair, ""), func(n string) bool {
			return n == "x"
		})

		perCreaturePower := utils.Min((power-1)-len(emptySlots), 0)

		for _, creature := range strings.Split(pair, "") {
			if value, exists := creaturesMap[creature]; exists {
				total += value + perCreaturePower
			}
		}

		index += power
	}

	return total
}
