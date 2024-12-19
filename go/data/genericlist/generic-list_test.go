package genericlist

import (
	"testing"
)

func TestGenericList(t *testing.T) {
	t.Run("AddAndGet", func(t *testing.T) {
		list := Create[int]()
		list.Add(10)
		list.Add(20)

		if value := list.Get(0); value != 10 {
			t.Errorf("Expected value at index 0 to be 10, got %d", value)
		}

		if value := list.Get(1); value != 20 {
			t.Errorf("Expected value at index 1 to be 20, got %d", value)
		}
	})

	t.Run("Size", func(t *testing.T) {
		list := Create[string]()

		if list.Size() != 0 {
			t.Errorf("Expected size 0, got %d", list.Size())
		}

		list.Add("apple")
		list.Add("banana")

		if list.Size() != 2 {
			t.Errorf("Expected size 2, got %d", list.Size())
		}
	})

	t.Run("Remove", func(t *testing.T) {
		list := Create[int]()
		list.Add(10)
		list.Add(20)
		list.Add(30)

		list.Remove(1) // Remove the element at index 1 (20)

		if list.Size() != 2 {
			t.Errorf("Expected size 2 after removal, got %d", list.Size())
		}

		if value := list.Get(0); value != 10 {
			t.Errorf("Expected value at index 0 to be 10, got %d", value)
		}

		if value := list.Get(1); value != 30 {
			t.Errorf("Expected value at index 1 to be 30, got %d", value)
		}
	})

	t.Run("Traverse", func(t *testing.T) {
		list := Create[int]()
		list.Add(1)
		list.Add(2)
		list.Add(3)

		sum := 0
		list.Traverse(func(v int) {
			sum += v
		})

		if sum != 6 {
			t.Errorf("Expected sum to be 6, got %d", sum)
		}
	})

	t.Run("OutOfBoundsAccess", func(t *testing.T) {
		list := Create[int]()
		list.Add(10)

		defer func() {
			if r := recover(); r == nil {
				t.Errorf("Expected panic for out-of-bounds access, but no panic occurred")
			}
		}()

		_ = list.Get(1) // This should panic
	})
}
