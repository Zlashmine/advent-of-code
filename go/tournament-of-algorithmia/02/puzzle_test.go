package main

import (
	"testing"

	"advent_of_code/utils"
)

func Test_Quest_01_Part1(t *testing.T) {
	input, _ := utils.LoadFileContent("input_1.txt")

	solver := &Puzzle{
		inputs: [3]string{input},
	}

	expectedResult := 36
	result := solver.solvePart1()

	if result != expectedResult {
		t.Errorf("Expected %d, but got %d", expectedResult, result)
	}
}
