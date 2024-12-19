package main

import (
	"fmt"
	"strings"

	"advent_of_code/tournament-of-algorithmia"
	"advent_of_code/utils"
)

type Puzzle struct {
	inputs [3]string
}

func main() {
	inputs, _ := tournament.LoadFiles()

	solver := &Puzzle{inputs}

	firstResult, firstPerformance := utils.WithPerformance(solver.solvePart1)
	secondsResult, secondPerformance := utils.WithPerformance(solver.solvePart2)
	thirdResult, thirdPerformance := utils.WithPerformance(solver.solvePart3)

	utils.ShowResult(1, 36, firstResult, firstPerformance)
	utils.ShowResult(2, 0, secondsResult, secondPerformance)
	utils.ShowResult(3, 0, thirdResult, thirdPerformance)
}

func (s *Puzzle) solvePart1() int {
	rows := strings.Split(s.inputs[0], "\n")
	runeRow := strings.Split(rows[0], "WORDS:")[1]
	runes := strings.Split(strings.TrimSpace(runeRow), ",")

	total := 0
	sentence := rows[2]
	for _, word := range runes {
		matches := utils.MatchesInString(word, sentence)

		total += len(matches)
	}

	return total
}

func (s *Puzzle) solvePart2() int {
	rows := strings.Split(s.inputs[1], "\n")
	runeRow := strings.Split(rows[0], "WORDS:")[1]
	runes := strings.Split(strings.TrimSpace(runeRow), ",")

	sentences := []string{}
	for index := 2; index < len(rows); index++ {
		fmt.Println(rows[index])

		sentences = append(sentences, rows[index])
	}

	total := 0

	for _, sentence := range sentences {
		for _, rune := range runes {
			matches := utils.MatchesInString(rune, sentence)
			matchesReversed := utils.MatchesInString(rune, utils.ReverseString(sentence))

			captured := []string{}
			for _, index := range matches {
				start, end := index[0], index[1]

				signature := fmt.Sprintf("%d%d", start, end)

				if utils.ContainsString(captured, signature) {
					continue
				}

				captured = append(captured, signature)
				total += end - start
			}

			for _, index := range matchesReversed {
				start, end := index[0], index[1]

				signature := fmt.Sprintf("%d%d", start, end)
				if utils.ContainsString(captured, signature) {
					continue
				}

				captured = append(captured, signature)
				total += end - start
			}
		}
	}

	return total
}

func (s *Puzzle) solvePart3() int {
	return 0
}
