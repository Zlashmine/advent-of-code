package graph

type Graph struct {
	Vertices map[int]*Vertex
}

type Vertex struct {
	Val   int
	Edges map[int]*Edge
}

type Edge struct {
	Weight int
	Vertex *Vertex
}

func (graph *Graph) AddVertex(key, value int) {
	graph.Vertices[key] = &Vertex{
		Val:   value,
		Edges: map[int]*Edge{},
	}
}

func (graph *Graph) AddEdge(from, to int, weight int) {
	if _, ok := graph.Vertices[from]; !ok {
		return
	}
	if _, ok := graph.Vertices[to]; !ok {
		return
	}

	graph.Vertices[from].Edges[to] = &Edge{Weight: weight, Vertex: graph.Vertices[to]}
}

func (graph *Graph) Neighbours(from int) []int {
	result := []int{}

	for _, edge := range graph.Vertices[from].Edges {
		result = append(result, edge.Vertex.Val)
	}

	return result
}

func NewGraph(opts ...GraphOption) *Graph {
	g := &Graph{Vertices: map[int]*Vertex{}}

	for _, opt := range opts {
		opt(g)
	}

	return g
}

type GraphOption func(graph *Graph)

func WithAdjacencyList(list map[int][]int) GraphOption {
	return func(graph *Graph) {
		for vertex, edges := range list {
			if _, ok := graph.Vertices[vertex]; !ok {
				graph.AddVertex(vertex, vertex)
			}

			for _, edge := range edges {
				if _, ok := graph.Vertices[edge]; !ok {
					graph.AddVertex(edge, edge)
				}

				graph.AddEdge(vertex, edge, 0)
			}
		}
	}
}
