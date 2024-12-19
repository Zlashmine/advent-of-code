package main

import (
	"fmt"
	"strconv"
	"strings"

	"advent_of_code/data/hashmap"
	"advent_of_code/utils"
)

type Puzzle struct {
	input string

	cacheMap *hashmap.HashMap[string, []string]
}

func main() {
	input, err := utils.LoadFileContent("input.txt")

	if err != nil {
		fmt.Printf("Failed to read file: %v\n", err)
		return
	}

	solver := &Puzzle{
		input:    input,
		cacheMap: hashmap.Create[string, []string](10000),
	}

	firstResult, firstPerformance := utils.WithPerformance(solver.solvePart1)
	secondResult, secondPerformance := utils.WithPerformance(solver.solvePart2)

	utils.ShowResult(1, 199753, firstResult, firstPerformance)
	utils.ShowResult(2, 239413123020116, secondResult, secondPerformance)
}

func (s *Puzzle) solvePart1() int {
	return s.blinkTimes(25)
}

func (s *Puzzle) solvePart2() int {
	return s.blinkTimes(75)
}

func (s *Puzzle) blinkTimes(times int) int {
	readMap := hashmap.Create[string, int](0)
	writeMap := hashmap.Create[string, int](0)

	for _, stone := range strings.Split(s.input, " ") {
		val, _ := readMap.Get(stone)
		readMap.Set(stone, val+1)
	}

	for i := 0; i < times; i++ {
		for stone, count := range readMap.Items() {
			newStones := s.cacheMap.GetOrSet(stone, func() []string {
				return transformStone(stone)
			})

			for _, newStone := range newStones {
				val, _ := writeMap.Get(newStone)
				writeMap.Set(newStone, val+count)
			}
		}

		readMap, writeMap = writeMap, readMap
		writeMap.Clear()
	}

	total := 0

	for _, count := range readMap.Items() {
		total += count
	}

	return total
}

func transformStone(stone string) []string {
	if stone[0] == '0' {
		return []string{"1"}
	}

	if len(stone)%2 == 0 {
		half := len(stone) / 2

		leftHalf := stone[:half]
		rightHalf := stone[half:]

		rightHalfNumber, _ := strconv.Atoi(rightHalf)

		return []string{leftHalf, strconv.Itoa(rightHalfNumber)}
	}

	number, _ := strconv.Atoi(stone)

	return []string{strconv.Itoa(number * 2024)}
}
