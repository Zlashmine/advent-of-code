package utils

import (
	"os"
)

func LoadFileContent(filePath string) (string, error) {
	data, err := os.ReadFile(filePath)

	if err != nil {
		return "", err
	}

	return string(data), nil
}
