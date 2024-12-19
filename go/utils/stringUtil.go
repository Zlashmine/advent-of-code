package utils

import "regexp"

// Returns:
//
//	A slice of slices of integers, where each inner slice contains the start and end indices of a match.
func MatchesInString(word string, target string) [][]int {
	re := regexp.MustCompile(word)
	matches := re.FindAllStringIndex(target, -1)

	return matches
}

func ReverseString(s string) string {
	// Convert the string to a slice of runes to handle multi-byte characters
	runes := []rune(s)

	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}

	return string(runes)
}
