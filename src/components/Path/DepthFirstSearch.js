import GraphHelper from "../DataStructures/GraphHelper";
// import Stack from "../DataStructures/Stack";

// function will return the order in which nodes are traversed during DFS
function DepthFirstSearch(maze, start, end) {
  var stack = [];
  var rows = maze.length;
  var cols = maze[0].length;
  var graphHelper = new GraphHelper(maze);

  // making the distances and tracking array
  var distances = [];
  var parentTracking = [];
  var visited = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    let parentRow = [];
    let visitedRow = [];
    for (let j = 0; j < cols; j++) {
      row.push(-1);
      parentRow.push(false);
      visitedRow.push(false);
    }
    parentTracking.push(parentRow);
    distances.push(row);
    visited.push(visitedRow);
  }

  // DFS
  var order = [];
  var finalDistance = -1;
  distances[start[0]][start[1]] = 0;
  stack.push(start);
  while (stack.length !== 0) {
    var currNode = stack.pop();
    var currDistance = distances[currNode[0]][currNode[1]];
    if (!visited[currNode[0]][currNode[1]]) {
      visited[currNode[0]][currNode[1]] = true;

      if (currNode[0] !== end[0] || currNode[1] !== end[1]) {
        var currNeighbours = graphHelper.returnNeighbours(currNode);

        for (let i = currNeighbours.length - 1; i >= 0; i--) {
          let currNeighbour = currNeighbours[i].neighbour;

          if (!visited[currNeighbour[0]][currNeighbour[1]]) {
            stack.push(currNeighbour);

            distances[currNeighbour[0]][currNeighbour[1]] = currDistance + 1;
            parentTracking[currNeighbour[0]][currNeighbour[1]] = currNode;
          }
        }

        order.push(currNode);
      } else {
        finalDistance = currDistance;
        break;
      }
    }
  }

  // finding the shortest path
  var itr = parentTracking[end[0]][end[1]];
  var shortestPath = [end];
  while (itr) {
    shortestPath.push(itr);
    itr = parentTracking[itr[0]][itr[1]];
  }

  // returning the exploration order, shortest path accoding to algorithm and distance
  return {
    traversalOrder: order,
    shortestPath: shortestPath,
    distance: finalDistance
  };
}

export default DepthFirstSearch;
