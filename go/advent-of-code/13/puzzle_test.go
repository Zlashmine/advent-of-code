package main

import (
	"testing"

	"advent_of_code/utils"
)

func TestDay03_Part1(t *testing.T) {
	input, _ := utils.LoadFileContent("input.txt")
	solver := &Puzzle{input}

	expectedResult := 29522

	result := solver.solvePart1()

	if result != expectedResult {
		t.Errorf("Expected %d, but got %d", expectedResult, result)
	}
}

func TestDay03_Part2(t *testing.T) {
	input, _ := utils.LoadFileContent("input.txt")
	solver := &Puzzle{input}

	expectedResult := 0

	result := solver.solvePart2()

	if result != expectedResult {
		t.Errorf("Expected %d, but got %d", expectedResult, result)
	}
}
