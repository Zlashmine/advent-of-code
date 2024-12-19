package main

import (
	"fmt"
	"strconv"
	"strings"

	"advent_of_code/data/grid"
	"advent_of_code/utils"
)

type Puzzle struct {
	input string
}

type Machine struct {
	buttonA grid.Vector2
	buttonB grid.Vector2

	target grid.Vector2
}

func main() {
	input, err := utils.LoadFileContent("input.txt")

	if err != nil {
		fmt.Printf("Failed to read file: %v\n", err)
		return
	}

	solver := &Puzzle{
		input:    input,
	}

	firstResult, firstPerformance := utils.WithPerformance(solver.solvePart1)
	secondResult, secondPerformance := utils.WithPerformance(solver.solvePart2)

	utils.ShowResult(1, 29522, firstResult, firstPerformance)
	utils.ShowResult(2, 0, secondResult, secondPerformance)
}

func (s *Puzzle) solvePart1() int {
	machines := s.parseInput()

	total := 0
	for _, machine := range machines {
		total += runMachine(&machine)
	}

	return total
}

func (s *Puzzle) solvePart2() int {
	return 0
}

func runMachine(machine *Machine) int {
	for x := 0; x < 100; x++ {
		for y := 0; y < 100; y++ {
			if (x*machine.buttonA.X+y*machine.buttonB.X) == machine.target.X &&
				(x*machine.buttonA.Y+y*machine.buttonB.Y) == machine.target.Y {
				return 3*x + y
			}
		}
	}

	return 0
}

func (s *Puzzle) parseInput() []Machine {
	machines := []Machine{}

	for _, part := range strings.Split(s.input, "\n\n") {
		machineParts := [][]int{}

		for _, line := range strings.Split(part, "\n") {
			delimiter := utils.Ternary(strings.Contains(line, "Prize"), "=", ":")

			for _, part := range strings.Split(line, delimiter) {
				part = strings.Replace(part, "Y", "", -1)
				part = strings.Replace(part, "X", "", -1)
				part = strings.Replace(part, "+", "", -1)
				part = strings.Replace(part, ",", "", -1)
				part = strings.Trim(part, " ")

				numbers := []int{}
				for _, stringNumber := range strings.Split(part, " ") {
					number, _ := strconv.Atoi(stringNumber)

					if number == 0 {
						continue
					}

					numbers = append(numbers, number)
				}

				if len(numbers) == 0 {
					continue
				}

				machineParts = append(machineParts, numbers)
			}
		}

		machine := &Machine{
			buttonA: grid.Vector2{X: machineParts[0][0], Y: machineParts[0][1]},
			buttonB: grid.Vector2{X: machineParts[1][0], Y: machineParts[1][1]},
			target:  grid.Vector2{X: machineParts[2][0], Y: machineParts[3][0]},
		}

		machines = append(machines, *machine)
	}

	return machines
}
