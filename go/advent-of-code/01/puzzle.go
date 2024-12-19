package main

import (
	"fmt"
	"sort"
	"strconv"
	"strings"

	"advent_of_code/utils"
)

type Puzzle struct {
	input string
}

func main() {
	input, err := utils.LoadFileContent("input.txt")

	if err != nil {
		fmt.Printf("Failed to read file: %v\n", err)
		return
	}

	solver := &Puzzle{input}

	firstResult, firstPerformance := utils.WithPerformance(solver.solvePart1)
	secondResult, secondPerformance := utils.WithPerformance(solver.solvePart2)

	utils.ShowResult(1, 2196996, firstResult, firstPerformance)
	utils.ShowResult(2, 23655822, secondResult, secondPerformance)
}

func (s *Puzzle) solvePart1() int {
	leftArray, rightArray := s.parseInput()

	sort.Ints(leftArray)
	sort.Ints(rightArray)

	total := 0

	for i := 0; i < len(leftArray); i++ {
		total += utils.Abs(leftArray[i] - rightArray[i])
	}
	return total
}

func (s *Puzzle) solvePart2() int {
	leftArray, rightArray := s.parseInput()

	total := 0

	for i := 0; i < len(leftArray); i++ {
		number := leftArray[i]
		occurrences := utils.CountOccurrences(rightArray, number)
		total += number * occurrences
	}

	return total
}

func (s *Puzzle) parseInput() ([]int, []int) {
	leftArray, rightArray := []int{}, []int{}

	rows := strings.Split(s.input, "\n")

	for _, r := range rows {
		records := strings.Split(r, "   ")

		left, _ := strconv.Atoi(records[0])
		right, _ := strconv.Atoi(records[1])

		leftArray = append(leftArray, left)
		rightArray = append(rightArray, right)
	}

	return leftArray, rightArray
}
