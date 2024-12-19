package main

import (
	"fmt"
	"regexp"
	"sort"
	"strconv"

	"advent_of_code/utils"
)

type Puzzle struct {
	input string
}

type Instruction struct {
	typeof string
	index  int
	number int
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

	utils.ShowResult(1, 181345830, firstResult, firstPerformance)
	utils.ShowResult(2, 98729041, secondResult, secondPerformance)
}

func (s *Puzzle) solvePart1() int {
	total := 0
	regex := regexp.MustCompile(`mul\((\d+),(\d+)\)`)
	matches := regex.FindAllStringSubmatch(s.input, -1)

	for _, match := range matches {
		first, _ := strconv.Atoi(match[1])
		second, _ := strconv.Atoi(match[2])

		total += first * second
	}

	return total
}

func (s *Puzzle) solvePart2() int {
	total := 0
	instructions := []Instruction{}

	mul := regexp.MustCompile(`mul\((\d+),(\d+)\)`)
	donts := regexp.MustCompile(`don't\(\)`)
	dos := regexp.MustCompile(`do\(\)`)

	for _, match := range donts.FindAllStringSubmatchIndex(s.input, -1) {
		instructions = append(instructions, Instruction{"disable", match[0], 0})
	}

	for _, match := range dos.FindAllStringSubmatchIndex(s.input, -1) {
		instructions = append(instructions, Instruction{"enable", match[0], 0})
	}

	for _, match := range mul.FindAllStringSubmatchIndex(s.input, -1) {
		firstNumStart, firstNumEnd := match[2], match[3]
		secondNumStart, secondNumEnd := match[4], match[5]

		first, _ := strconv.Atoi(s.input[firstNumStart:firstNumEnd])
		second, _ := strconv.Atoi(s.input[secondNumStart:secondNumEnd])

		instructions = append(instructions, Instruction{"multiply", match[0], first * second})
	}

	sort.Slice(instructions, func(i, j int) bool {
		return instructions[i].index < instructions[j].index
	})

	currentInstructionType := instructions[0].typeof

	for _, instruction := range instructions {
		switch instruction.typeof {
		case "multiply":
			if currentInstructionType == "disable" {
				continue
			}

			total += instruction.number

		default:
			currentInstructionType = instruction.typeof
		}
	}

	return total
}
