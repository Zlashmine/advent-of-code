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

	expectedResult := 0
	result := solver.solvePart1()

	if result != expectedResult {
		t.Errorf("Expected %d, but got %d", expectedResult, result)
	}
}

func Test_Quest_02_Part1(t *testing.T) {
	input, _ := utils.LoadFileContent("input_2.txt")

	solver := &Puzzle{
		inputs: [3]string{"", input},
	}

	expectedResult := 0
	result := solver.solvePart2()

	if result != expectedResult {
		t.Errorf("Expected %d, but got %d", expectedResult, result)
	}
}

func Test_Quest_03_Part1(t *testing.T) {
	input, _ := utils.LoadFileContent("input_3.txt")

	solver := &Puzzle{
		inputs: [3]string{"", "", input},
	}

	expectedResult := 0
	result := solver.solvePart3()

	if result != expectedResult {
		t.Errorf("Expected %d, but got %d", expectedResult, result)
	}
}
