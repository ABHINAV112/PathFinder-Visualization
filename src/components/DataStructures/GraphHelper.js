class GraphHelper {
  constructor(graph) {
    this.graph = graph;
    this.rows = graph.length;
    this.cols = graph[0].length;
    console.log("cols", this.cols);
  }

  returnNeighbours = index => {
    var result = [];

    let i = index[0],
      j = index[1];

    if (j + 1 < this.cols - 1) {
      let neighbour = this.graph[i][j + 1];
      if (neighbour === 0 || neighbour === 4) {
        result.push([i, j + 1]);
      }
    }
    if (i + 1 < this.rows - 1) {
      let neighbour = this.graph[i + 1][j];
      if (neighbour === 0 || neighbour === 4) {
        result.push([i + 1, j]);
      }
    }

    if (i - 1 >= 1) {
      let neighbour = this.graph[i - 1][j];
      if (neighbour === 0 || neighbour === 4) {
        result.push([i - 1, j]);
      }
    }

    if (j - 1 >= 1) {
      let neighbour = this.graph[i][j - 1];
      if (neighbour === 0 || neighbour === 4) {
        result.push([i, j - 1]);
      }
    }

    return result;
  };
}

module.exports = GraphHelper;
