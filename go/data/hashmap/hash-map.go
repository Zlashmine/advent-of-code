package hashmap

type HashMap[K comparable, V any] struct {
	data map[K]V
}

func Create[K comparable, V any](initialSize int) *HashMap[K, V] {
	return &HashMap[K, V]{
		data: make(map[K]V, initialSize),
	}
}

func (h *HashMap[K, V]) Set(key K, value V) {
	h.data[key] = value
}

func (h *HashMap[K, V]) Get(key K) (V, bool) {
	value, exists := h.data[key]
	return value, exists
}

func (h *HashMap[K, V]) GetOrSet(key K, valueFunc func() V) V {
	value, exists := h.data[key]

	if !exists {
		value = valueFunc()
		h.data[key] = value
	}

	return value
}

func (h *HashMap[K, V]) Delete(key K) {
	delete(h.data, key)
}

func (h *HashMap[K, V]) Size() int {
	return len(h.data)
}

func (h *HashMap[K, V]) Items() map[K]V {
	return h.data
}

func (h *HashMap[K, V]) Clear() {
	h.data = make(map[K]V)
}
