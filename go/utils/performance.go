package utils

import (
	"fmt"
	"time"
)

func WithPerformance[T any](fn func() T) (T, string) {
	start := time.Now()
	result := fn()
	elapsed := time.Since(start)

	if elapsed.Microseconds() > 1000 {
		return result, fmt.Sprintf("%v ms", elapsed.Milliseconds())
	}

	return result, fmt.Sprintf("%v µs", elapsed.Microseconds())
}
