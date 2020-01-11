import GraphHelper from "../DataStructures/GraphHelper";
import PriorityQueue from "../DataStructures/PriorityQueue";

export default function dijkstra(maze, start, end) {
  var pQueue = new PriorityQueue(function(x) {
    return x.distance;
  });
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

  var order = [];
  var finalDistance = -1;
  distances[start[0]][start[1]] = 0;
  // store
  // {
  //  index:[],
  //  distance:[]
  // }
  pQueue.enqueue({
    index: start,
    distance: 0
  });
  while (!pQueue.isEmpty()) {
    var currNode = pQueue.dequeue();

    order.push(currNode.index);
    var currDistance = distances[currNode.index[0]][currNode.index[1]];
    if (currNode.index[0] !== end[0] || currNode.index[1] !== end[1]) {
      var currNeighbours = graphHelper.returnNeighbours(currNode.index);

      for (let i = 0; i <= currNeighbours.length - 1; i++) {
        let currNeighbour = currNeighbours[i];
        let currNeighbourIndex = currNeighbour.neighbour;

        if (distances[currNeighbourIndex[0]][currNeighbourIndex[1]] === -1) {
          pQueue.enqueue({
            index: currNeighbourIndex,
            distance: currDistance + currNeighbour.weight
          });

          distances[currNeighbourIndex[0]][currNeighbourIndex[1]] =
            currDistance + currNeighbour.weight;
          parentTracking[currNeighbourIndex[0]][currNeighbourIndex[1]] =
            currNode.index;
        } else if (
          distances[currNeighbourIndex[0]][currNeighbourIndex[1]] >
          currDistance + currNeighbour.weight
        ) {
          let heapIndex = pQueue.findElement(function(element) {
            return (
              element.index[0] === currNeighbourIndex[0] &&
              element.index[1] === currNeighbourIndex[1]
            );
          });
          if (heapIndex) {
            pQueue.update(heapIndex, {
              index: currNeighbourIndex,
              distance: currDistance + currNeighbour.weight
            });
            distances[currNeighbourIndex[0]][currNeighbourIndex[1]] =
              currDistance + currNeighbour.weight;
            parentTracking[currNeighbourIndex[0]][currNeighbourIndex[1]] =
              currNode.index;
          }
        }
      }
      //
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

  // returning the exploration order, shortest path accoding to algorithm and distance
  return {
    traversalOrder: order,
    shortestPath: shortestPath,
    distance: finalDistance
  };
}
