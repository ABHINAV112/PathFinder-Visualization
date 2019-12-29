import GraphHelper from "../DataStructures/GraphHelper";
import Queue from "../DataStructures/Queue";

// function will return the order in which nodes are traversed during BFS
function BreadthFirstSearch(maze, start, end) {
  var queue = new Queue();
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
  queue.enqueue(start);
  while (!queue.isEmpty()) {
    // console.log("queue", JSON.stringify(queue.queue));
    var currNode = queue.dequeue();
    var currDistance = distances[currNode[0]][currNode[1]];
    if (currNode[0] !== end[0] || currNode[1] !== end[1]) {
      var currNeighbours = graphHelper.returnNeighbours(currNode);
      for (let i = currNeighbours.length - 1; i >= 0; i--) {
        let currNeighbour = currNeighbours[i].neighbour;
        if (distances[currNeighbour[0]][currNeighbour[1]] === -1) {
          queue.enqueue(currNeighbour);
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

export default BreadthFirstSearch;
