package main

import (
	"fmt"
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

	utils.ShowResult(1, 332, firstResult, firstPerformance)
	utils.ShowResult(2, 398, secondResult, secondPerformance)
}

func (s *Puzzle) solvePart1() int {
	rows := s.createRows()
	safeRows := 0

	for _, row := range rows {
		if isRowSafe(row) {
			safeRows++
		}
	}

	return safeRows
}

func (s *Puzzle) solvePart2() int {
	rows := s.createRows()
	safeRows := 0

	for index, row := range rows {
		if isRowSafe(row) {
			safeRows++
			continue
		}

		for i := 0; i < len(row); i++ {
			newRow := utils.RemoveElement(row, i)

			if isRowSafe(newRow) {
				safeRows++
				rows[index] = newRow

				break
			}
		}
	}

	return safeRows
}

func isRowSafe(row []int) bool {
	directionDict := map[int]int{}

	for index, number := range row {
		if index >= len(row)-1 {
			break
		}

		next := row[index+1]
		diff := utils.Abs(number - next)

		if number > next {
			directionDict[0]++
		} else {
			directionDict[1]++
		}

		if !utils.IsBetween(diff, 1, 3) {
			return false
		}
	}

	return len(directionDict) == 1
}

func (s *Puzzle) createRows() [][]int {
	rows := [][]int{}

	for _, r := range strings.Split(s.input, "\n") {
		numbers := []int{}

		for _, n := range strings.Split(r, " ") {
			number, _ := strconv.Atoi(n)
			numbers = append(numbers, number)
		}

		rows = append(rows, numbers)
	}

	return rows
}
