package grid

import (
	"fmt"
	"strconv"
	"strings"
)

type Vector2 struct {
	X int
	Y int
}

type Directions struct {
	Up        Vector2
	Down      Vector2
	Left      Vector2
	Right     Vector2
	UpLeft    Vector2
	UpRight   Vector2
	DownLeft  Vector2
	DownRight Vector2
}

func (v Vector2) Add(other Vector2) Vector2 {
	return Vector2{
		X: v.X + other.X,
		Y: v.Y + other.Y,
	}
}

func (v Vector2) Sub(other Vector2) Vector2 {
	return Vector2{
		X: v.X - other.X,
		Y: v.Y - other.Y,
	}
}

func (v Vector2) Mul(scalar int) Vector2 {
	return Vector2{
		X: v.X * scalar,
		Y: v.Y * scalar,
	}
}

func (v Vector2) DirectionTo(other Vector2) Vector2 {
	return other.Sub(v)
}

func (v Vector2) DirectionBetween(other Vector2) Vector2 {
	return other.Sub(v)
}

func (v Vector2) IsSame(other Vector2) bool {
	return v.X == other.X && v.Y == other.Y
}

func (v Vector2) AsString() string {
	return fmt.Sprintf("%d,%d", v.X, v.Y)
}

func (v Vector2) FromString(str string) Vector2 {
	splitted := strings.Split(str, ",")

	x, _ := strconv.Atoi(splitted[0])
	y, _ := strconv.Atoi(splitted[1])

	return Vector2{
		X: x,
		Y: y,
	}
}

func Get8Directions() []Directions {
	return []Directions{
		{
			Up:        Vector2{X: 0, Y: 1},
			Down:      Vector2{X: 0, Y: -1},
			Left:      Vector2{X: -1, Y: 0},
			Right:     Vector2{X: 1, Y: 0},
			UpLeft:    Vector2{X: -1, Y: 1},
			UpRight:   Vector2{X: 1, Y: 1},
			DownLeft:  Vector2{X: -1, Y: -1},
			DownRight: Vector2{X: 1, Y: -1},
		},
	}
}

func Get4Directions() []Directions {
	return []Directions{
		{
			Up:    Vector2{X: 0, Y: 1},
			Down:  Vector2{X: 0, Y: -1},
			Left:  Vector2{X: -1, Y: 0},
			Right: Vector2{X: 1, Y: 0},
		},
	}
}
