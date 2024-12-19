package utils

func RemoveElement(slice []int, index int) []int {
	if index < 0 || index >= len(slice) {
		return slice
	}

	newSlice := append([]int{}, slice[:index]...)   // Copy elements before index
	newSlice = append(newSlice, slice[index+1:]...) // Copy elements after index

	return newSlice
}

func ContainsString(slice []string, value string) bool {
	for _, v := range slice {
		if v == value {
			return true
		}
	}

	return false
}

func Filter(slice []string, condition func(string) bool) []string {
	var result []string
	for _, v := range slice {
		if condition(v) {
			result = append(result, v)
		}
	}
	return result
}
