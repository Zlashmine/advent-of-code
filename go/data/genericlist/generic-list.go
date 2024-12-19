package genericlist

type GenericList[T any] struct {
	data []T
}

func Create[T any]() *GenericList[T] {
	return &GenericList[T]{
		data: make([]T, 0),
	}
}

func (l *GenericList[T]) Add(value T) {
	l.data = append(l.data, value)
}

func (l *GenericList[T]) Get(index int) T {
	return l.data[index]
}

func (l *GenericList[T]) Size() int {
	return len(l.data)
}

func (l *GenericList[T]) Remove(index int) {
	l.data = append(l.data[:index], l.data[index+1:]...)
}

func (l *GenericList[T]) Traverse(f func(T)) {
	for _, v := range l.data {
		f(v)
	}
}
