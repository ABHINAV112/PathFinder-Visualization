# Path finder visualized

This project visualizes popular path finding algorithms(may not be the shortest path), we have weighted and unweighted algorithms. The project also includes a few algorithms which generate mazes. The projects is built using the react-js framework and a p5js wrapper for reactjs. The project may be found at this [link](https://abhinav112.github.io/PathFinder-Visualization/).

---

## Objects

These are the objects which are placed on the grid.

### Start

The start indicates the start location to apply our path finding algorithms.

### End

The end indicates the end location to apply our path finding algorithms.

### Wall

The wall represents a node which cannot be traversed by our path finding algorithms.

### Weight

The weight is a node whose connection has a weight of 5, so going to this node and going out of it has a distance of 5 units.

---

## Path Finding algorithms

### Breadth First Search

Breadth first search is an unweighted graph search algorithm which can be used to calculate the shortest path to a node, here we implement the BFS using a queue data structure.

### Depth First Search

Depth first search is an unweighted graph search algorithm which can be used to calculate a path to a node, here we implement the DFS using a stack data structure.

### Dijkstra

Dijkstra's is a weighted graph search algorithm which can be used to calculate the shortest path to a node, here we implement Dijkstra's using a priority queue made by a heap.

### Astar

Astar is a weighted graph search algorithm which can be used to calculate the shortest path to a node, here we implement Astar using a priority queue made by a heap. The Astar uses a heuristic to reduce computation time, the heuristic used here is [Manhattan Distance](https://xlinux.nist.gov/dads/HTML/manhattanDistance.html).

---

## Maze generation algorithms

### Randomized verticals

Randomized verticals is a maze generation algorithm in which we make a maze consisting of several vertical lines, with holes placed in random locations.

### Randomized horizontals

Randomized horizontals is a maze generation algorithm in which we make a maze consisting of several horizontal lines, with holes placed in random locations.

### Recursive division

Recursive division is a recursive maze generation algorithm in which we keep splitting the grid into sub sections by drawing vertical and horizontal lines, we randomize the location of these lines and also generate random holes. The holes and lines will never coincide.
