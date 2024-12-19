package main

import (
	"testing"

	"advent_of_code/utils"
)

func TestDay02_Part1(t *testing.T) {
	input, _ := utils.LoadFileContent("input.txt")
	solver := &Puzzle{input}

	expectedResult := 332

	result := solver.solvePart1()

	if result != expectedResult {
		t.Errorf("Expected %d, but got %d", expectedResult, result)
	}
}

func TestDay02_Part2(t *testing.T) {
	input, _ := utils.LoadFileContent("input.txt")
	solver := &Puzzle{input}

	expectedResult := 398

	result := solver.solvePart2()

	if result != expectedResult {
		t.Errorf("Expected %d, but got %d", expectedResult, result)
	}
}
