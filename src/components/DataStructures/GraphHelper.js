// class with methods to convert the 2D array into a graph
class GraphHelper {
  constructor(graph) {
    this.graph = graph;
    this.rows = graph.length;
    this.cols = graph[0].length;
  }

  // return neighbours of cell with given index
  returnNeighbours = index => {
    var result = [];

    let i = index[0],
      j = index[1];
    let currentCell = this.graph[i][j];

    if (i - 1 >= 1) {
      let neighbour = this.graph[i - 1][j];
      let weight = false;
      if (neighbour === 0 || neighbour === 4) {
        weight = 1;
      }
      if (neighbour === 5 || (currentCell === 5 && neighbour !== 2)) {
        weight = 5;
      }
      if (weight) {
        result.push({
          neighbour: [i - 1, j],
          weight: weight
        });
      }
    }

    if (j - 1 >= 1) {
      let neighbour = this.graph[i][j - 1];
      let weight = false;
      if (neighbour === 0 || neighbour === 4) {
        weight = 1;
      }
      if (neighbour === 5 || (currentCell === 5 && neighbour !== 2)) {
        weight = 5;
      }
      if (weight) {
        result.push({
          neighbour: [i, j - 1],
          weight: weight
        });
      }
    }

    if (j + 1 < this.cols - 1) {
      let neighbour = this.graph[i][j + 1];
      let weight = false;
      if (neighbour === 0 || neighbour === 4) {
        weight = 1;
      }
      if (neighbour === 5 || (currentCell === 5 && neighbour !== 2)) {
        weight = 5;
      }
      if (weight) {
        result.push({
          neighbour: [i, j + 1],
          weight: weight
        });
      }
    }

    if (i + 1 < this.rows - 1) {
      let neighbour = this.graph[i + 1][j];
      let weight = false;
      if (neighbour === 0 || neighbour === 4) {
        weight = 1;
      }
      if (neighbour === 5 || (currentCell === 5 && neighbour !== 2)) {
        weight = 5;
      }
      if (weight) {
        result.push({
          neighbour: [i + 1, j],
          weight: weight
        });
      }
    }

    return result;
  };
}

export default GraphHelper;
