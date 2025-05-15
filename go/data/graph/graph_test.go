package graph

import (
	"testing"
)

func TestGraph(t *testing.T) {
	t.Run("AddVertex", func(t *testing.T) {
		graph := NewGraph()
		graph.AddVertex(1, 100)

		if vertex, exists := graph.Vertices[1]; !exists {
			t.Errorf("Vertex not added: expected vertex with key 1")
		} else if vertex.Val != 100 {
			t.Errorf("Vertex value mismatch: got %d, expected 100", vertex.Val)
		}
	})

	t.Run("AddEdge", func(t *testing.T) {
		graph := NewGraph()
		graph.AddVertex(1, 100)
		graph.AddVertex(2, 200)

		graph.AddEdge(1, 2, 10)

		if edge, exists := graph.Vertices[1].Edges[2]; !exists {
			t.Errorf("Edge not added: expected edge from 1 to 2")
		} else if edge.Weight != 10 {
			t.Errorf("Edge weight mismatch: got %d, expected 10", edge.Weight)
		} else if edge.Vertex.Val != 200 {
			t.Errorf("Edge destination mismatch: got vertex with value %d, expected 200", edge.Vertex.Val)
		}
	})

	t.Run("AddEdgeNonExistentVertex", func(t *testing.T) {
		graph := NewGraph()
		graph.AddVertex(1, 100)

		graph.AddEdge(1, 3, 10)

		if _, exists := graph.Vertices[1].Edges[3]; exists {
			t.Errorf("Edge added to non-existent vertex: should not exist")
		}
	})

	// t.Run("Neighbours", func(t *testing.T) {
	// 	graph := NewGraph()
	// 	graph.AddVertex(1, 100)
	// 	graph.AddVertex(2, 200)
	// 	graph.AddVertex(3, 300)

	// 	graph.AddEdge(1, 2, 5)
	// 	graph.AddEdge(1, 3, 15)

	// 	neighbours := graph.Neighbours(1)
	// 	expected := []int{300, 200}

	// 	if !reflect.DeepEqual(neighbours, expected) {
	// 		t.Errorf("Neighbours mismatch: got %v, expected %v", neighbours, expected)
	// 	}
	// })

	t.Run("WithAdjacencyList", func(t *testing.T) {
		adjList := map[int][]int{
			1: {2, 3},
			2: {4},
			3: {},
			4: {},
		}

		graph := NewGraph(WithAdjacencyList(adjList))

		if len(graph.Vertices) != 4 {
			t.Errorf("Adjacency list processing failed: got %d vertices, expected 4", len(graph.Vertices))
		}

		if _, exists := graph.Vertices[1].Edges[2]; !exists {
			t.Errorf("Edge missing from 1 to 2")
		}

		if _, exists := graph.Vertices[2].Edges[4]; !exists {
			t.Errorf("Edge missing from 2 to 4")
		}
	})

	t.Run("EmptyGraph", func(t *testing.T) {
		graph := NewGraph()
		if len(graph.Vertices) != 0 {
			t.Errorf("Empty graph should have 0 vertices, got %d", len(graph.Vertices))
		}
	})
}
