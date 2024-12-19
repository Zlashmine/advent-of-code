package utils

func Abs(x int) int {
	if x < 0 {
		return -x
	}

	return x
}

func Clamp(x int, min int, max int) int {
	if x < min {
		return min
	}

	if x > max {
		return max
	}

	return x
}

func Min(x int, min int) int {
	if x < min {
		return min
	}

	return x
}

func CountOccurrences(arr []int, num int) int {
	count := 0
	for _, v := range arr {
		if v == num {
			count++
		}
	}

	return count
}

func IsBetween(value, min, max int) bool {
	return value >= min && value <= max
}

func Ternary[T any](condition bool, a, b T) T {
	if condition {
		return a
	}
	return b
}
