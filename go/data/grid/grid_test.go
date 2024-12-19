package grid

import (
	"testing"
)

func TestGrid(t *testing.T) {
	grid := Create[int](3, 3)

	t.Run("Create", func(t *testing.T) {
		if grid.width != 3 || grid.height != 3 {
			t.Errorf("Grid dimensions are incorrect: got width=%d, height=%d, expected width=3, height=3", grid.width, grid.height)
		}
	})

	t.Run("Set and Get", func(t *testing.T) {
		grid.Set(1, 1, 42)
		value := grid.Get(1, 1)
		if value != 42 {
			t.Errorf("Get/Set failed: got %d, expected 42", value)
		}
	})

	t.Run("Get Out of Bounds", func(t *testing.T) {
		value := grid.Get(10, 10)
		if value != 0 {
			t.Errorf("Get for out-of-bounds failed: got %d, expected 0", value)
		}
	})

	t.Run("Set Out of Bounds", func(t *testing.T) {
		grid.Set(10, 10, 42)
		value := grid.Get(10, 10)
		if value != 0 {
			t.Errorf("Set for out-of-bounds should not modify grid: got %d, expected 0", value)
		}
	})

	t.Run("GetAllInRow", func(t *testing.T) {
		grid.Set(0, 0, 1)
		grid.Set(0, 1, 2)
		grid.Set(0, 2, 3)
		row := grid.GetAllInRow(0)
		expected := []int{1, 2, 3}
		for i, val := range row {
			if val != expected[i] {
				t.Errorf("GetAllInRow failed at index %d: got %d, expected %d", i, val, expected[i])
			}
		}
	})

	t.Run("GetAllInColumn", func(t *testing.T) {
		grid.Set(0, 1, 4)
		grid.Set(1, 1, 5)
		grid.Set(2, 1, 6)
		col := grid.GetAllInColumn(1)
		expected := []int{4, 5, 6}
		for i, val := range col {
			if val != expected[i] {
				t.Errorf("GetAllInColumn failed at index %d: got %d, expected %d", i, val, expected[i])
			}
		}
	})

	t.Run("GetAllInDiagonal", func(t *testing.T) {
		grid.Set(0, 0, 7)
		grid.Set(1, 1, 8)
		grid.Set(2, 2, 9)
		diag := grid.GetAllInDiagonal(0, 0)
		expected := []int{7, 8, 9}
		for i, val := range diag {
			if val != expected[i] {
				t.Errorf("GetAllInDiagonal failed at index %d: got %d, expected %d", i, val, expected[i])
			}
		}
	})

	t.Run("GetAllInAntiDiagonal", func(t *testing.T) {
		grid.Set(0, 2, 10)
		grid.Set(1, 1, 11)
		grid.Set(2, 0, 12)
		antiDiag := grid.GetAllInAntiDiagonal(0, 2)
		expected := []int{10, 11, 12}
		for i, val := range antiDiag {
			if val != expected[i] {
				t.Errorf("GetAllInAntiDiagonal failed at index %d: got %d, expected %d", i, val, expected[i])
			}
		}
	})

	t.Run("IsOutOfBounds", func(t *testing.T) {
		if !grid.IsOutOfBounds(-1, 0) {
			t.Errorf("IsOutOfBounds failed for negative row")
		}
		if !grid.IsOutOfBounds(0, -1) {
			t.Errorf("IsOutOfBounds failed for negative column")
		}
		if !grid.IsOutOfBounds(3, 0) {
			t.Errorf("IsOutOfBounds failed for row out of range")
		}
		if !grid.IsOutOfBounds(0, 3) {
			t.Errorf("IsOutOfBounds failed for column out of range")
		}
		if grid.IsOutOfBounds(2, 2) {
			t.Errorf("IsOutOfBounds failed for valid indices")
		}
	})
}
