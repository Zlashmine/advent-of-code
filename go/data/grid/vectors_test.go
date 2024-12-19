package grid

import (
	"testing"
)

func TestVector2Operations(t *testing.T) {
	v1 := Vector2{X: 2, Y: 3}
	v2 := Vector2{X: 4, Y: 5}

	t.Run("Add", func(t *testing.T) {
		result := v1.Add(v2)
		expected := Vector2{X: 6, Y: 8}
		if result != expected {
			t.Errorf("Add failed: got %v, expected %v", result, expected)
		}
	})

	t.Run("Sub", func(t *testing.T) {
		result := v1.Sub(v2)
		expected := Vector2{X: -2, Y: -2}
		if result != expected {
			t.Errorf("Sub failed: got %v, expected %v", result, expected)
		}
	})

	t.Run("Mul", func(t *testing.T) {
		result := v1.Mul(2)
		expected := Vector2{X: 4, Y: 6}
		if result != expected {
			t.Errorf("Mul failed: got %v, expected %v", result, expected)
		}
	})

	t.Run("DirectionTo", func(t *testing.T) {
		result := v1.DirectionTo(v2)
		expected := Vector2{X: 2, Y: 2}
		if result != expected {
			t.Errorf("DirectionTo failed: got %v, expected %v", result, expected)
		}
	})

	t.Run("IsSame", func(t *testing.T) {
		if !v1.IsSame(Vector2{X: 2, Y: 3}) {
			t.Errorf("IsSame failed: expected true")
		}
		if v1.IsSame(v2) {
			t.Errorf("IsSame failed: expected false")
		}
	})

	t.Run("AsString", func(t *testing.T) {
		result := v1.AsString()
		expected := "2,3"
		if result != expected {
			t.Errorf("AsString failed: got %v, expected %v", result, expected)
		}
	})

	t.Run("FromString", func(t *testing.T) {
		v := Vector2{}
		result := v.FromString("2,3")
		expected := Vector2{X: 2, Y: 3}
		if result != expected {
			t.Errorf("FromString failed: got %v, expected %v", result, expected)
		}
	})
}

func TestGet8Directions(t *testing.T) {
	directions := Get8Directions()
	expected := Directions{
		Up:        Vector2{X: 0, Y: 1},
		Down:      Vector2{X: 0, Y: -1},
		Left:      Vector2{X: -1, Y: 0},
		Right:     Vector2{X: 1, Y: 0},
		UpLeft:    Vector2{X: -1, Y: 1},
		UpRight:   Vector2{X: 1, Y: 1},
		DownLeft:  Vector2{X: -1, Y: -1},
		DownRight: Vector2{X: 1, Y: -1},
	}

	if len(directions) != 1 {
		t.Errorf("Get8Directions failed: expected 1 direction set, got %d", len(directions))
	}

	if directions[0] != expected {
		t.Errorf("Get8Directions failed: got %v, expected %v", directions[0], expected)
	}
}

func TestGet4Directions(t *testing.T) {
	directions := Get4Directions()
	expected := Directions{
		Up:    Vector2{X: 0, Y: 1},
		Down:  Vector2{X: 0, Y: -1},
		Left:  Vector2{X: -1, Y: 0},
		Right: Vector2{X: 1, Y: 0},
	}

	if len(directions) != 1 {
		t.Errorf("Get4Directions failed: expected 1 direction set, got %d", len(directions))
	}

	if directions[0] != expected {
		t.Errorf("Get4Directions failed: got %v, expected %v", directions[0], expected)
	}
}
