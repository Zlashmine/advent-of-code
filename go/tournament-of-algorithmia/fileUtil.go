package tournament

import (
	"fmt"

	"advent_of_code/utils"
)

func LoadFiles() ([3]string, error) {
	inputs := [3]string{}

	for i := 0; i < 3; i++ {
		input, err := utils.LoadFileContent(fmt.Sprintf("input_%d.txt", i+1))

		if err != nil {
			fmt.Printf("Failed to read file: %v\n", err)
			return inputs, err
		}

		inputs[i] = input
	}

	return inputs, nil
}
