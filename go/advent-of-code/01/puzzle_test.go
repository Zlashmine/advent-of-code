package main

import (
	"testing"

	"advent_of_code/utils"
)

func TestDay01_Part1(t *testing.T) {
	input, _ := utils.LoadFileContent("input.txt")
	solver := &Puzzle{input}

	expectedResult := 2196996

	result := solver.solvePart1()

	if result != expectedResult {
		t.Errorf("Expected %d, but got %d", expectedResult, result)
	}
}

func TestDay01_Part2(t *testing.T) {
	input, _ := utils.LoadFileContent("input.txt")
	solver := &Puzzle{input}

	expectedResult := 23655822

	result := solver.solvePart2()

	if result != expectedResult {
		t.Errorf("Expected %d, but got %d", expectedResult, result)
	}
}
