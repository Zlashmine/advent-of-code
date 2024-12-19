package grid

type Grid[T any] struct {
	grid [][]T

	width  int
	height int
}

func Create[T any](rows, cols int) *Grid[T] {
	grid := make([][]T, rows)

	for i := range grid {
		grid[i] = make([]T, cols)
	}

	return &Grid[T]{
		grid,
		cols,
		rows,
	}
}

func (grid *Grid[T]) Get(row, col int) T {
	if grid.IsOutOfBounds(row, col) {
		return *new(T)
	}

	return grid.grid[row][col]
}

func (grid *Grid[T]) Set(row, col int, value T) {
	if grid.IsOutOfBounds(row, col) {
		return
	}

	grid.grid[row][col] = value
}

func (grid *Grid[T]) GetAllInRow(y int) []T {
	if grid.IsOutOfBounds(y, 0) {
		return nil
	}

	return grid.grid[y]
}

func (grid *Grid[T]) GetAllInColumn(x int) []T {
	if grid.IsOutOfBounds(0, x) {
		return nil
	}

	result := make([]T, grid.height)

	for i := 0; i < grid.height; i++ {
		result[i] = grid.grid[i][x]
	}

	return result
}

func (grid *Grid[T]) GetAllInDiagonal(row, col int) []T {
	if grid.IsOutOfBounds(row, col) {
		return nil
	}

	result := []T{}

	for (row >= 0 && col >= 0) && (row < grid.height && col < grid.width) {
		result = append(result, grid.grid[row][col])
		row++
		col++
	}

	return result
}

func (grid *Grid[T]) GetAllInAntiDiagonal(row, col int) []T {
	if grid.IsOutOfBounds(row, col) {
		return nil
	}

	result := []T{}

	for (row >= 0 && col < grid.width) && (row < grid.height && col >= 0) {
		result = append(result, grid.grid[row][col])
		row++
		col--
	}

	return result
}

func (grid *Grid[T]) GetNeighbours(row, col int, direction []Vector2) []T {
	if grid.IsOutOfBounds(row, col) {
		return nil
	}

	result := []T{}



	return result
}

func (grid *Grid[T]) IsOutOfBounds(row, col int) bool {
	return row < 0 || row >= grid.height || col < 0 || col >= grid.width
}
