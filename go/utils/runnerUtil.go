package utils

import (
	"fmt"

	"github.com/jwalton/gchalk"
)

func ShowResult(part int, expected int, result int, performance string) {
	if result == expected {
		fmt.Printf(gchalk.Green("Part %v: %v (%v)\n"), part, result, performance)
		return
	}

	fmt.Printf(gchalk.Red("Part %v: %v (%v)\nExpected: %v\n"), part, result, 23655822, performance)
}
