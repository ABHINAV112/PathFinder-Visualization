import GraphHelper from "../DataStructures/GraphHelper";
import Stack from "../DataStructures/Stack";

// function will return the order in which nodes are traversed during BFS
function DepthFirstSearch(maze, start, end) {
  var stack = new Stack();
  var rows = maze.length;
  var cols = maze[0].length;
  var graphHelper = new GraphHelper(maze);

  // making the distances and tracking array
  var distances = [];
  var parentTracking = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    let parentRow = [];
    for (let j = 0; j < cols; j++) {
      row.push(-1);
      parentRow.push(false);
    }
    parentTracking.push(parentRow);
    distances.push(row);
  }

  // BFS
  var order = [];
  var finalDistance = -1;
  distances[start[0]][start[1]] = 0;
  stack.push(start);
  while (!stack.isEmpty()) {
    // console.log("stack", JSON.stringify(stack.stack));
    var currNode = stack.pop();
    var currDistance = distances[currNode[0]][currNode[1]];
    if (currNode[0] !== end[0] || currNode[1] !== end[1]) {
      var currNeighbours = graphHelper.returnNeighbours(currNode);
      for (let i = 0; i < currNeighbours.length; i++) {
        if (distances[currNeighbours[i][0]][currNeighbours[i][1]] === -1) {
          stack.push(currNeighbours[i]);
          distances[currNeighbours[i][0]][currNeighbours[i][1]] =
            currDistance + 1;
          parentTracking[currNeighbours[i][0]][currNeighbours[i][1]] = currNode;
        }
      }
      order.push(currNode);
    } else {
      finalDistance = currDistance;
      break;
    }
  }

  // finding the shortest path
  var itr = parentTracking[end[0]][end[1]];
  var shortestPath = [end];
  while (itr) {
    shortestPath.push(itr);
    itr = parentTracking[itr[0]][itr[1]];
  }

  return {
    traversalOrder: order,
    shortestPath: shortestPath,
    distance: finalDistance
  };
}

export default DepthFirstSearch;
