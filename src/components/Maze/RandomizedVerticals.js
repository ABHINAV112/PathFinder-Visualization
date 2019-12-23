function RandomizedVerticals(grid) {
  var rows = grid.length;
  var cols = grid[0].length;
  var lines = parseInt((cols - 2) / 2);
  var holes = [];
  for (let i = 0; i < lines; i++) {
    var currHoleI = parseInt(Math.random() * (rows - 2) + 1);
    holes.push(currHoleI);
  }
  var result = [];
  for (let i = 0; i < holes.length; i++) {
    for (let j = 1; j < rows - 1; j++) {
      if (j !== holes[i]) {
        result.push([j, 2 * i + 2]);
      }
    }
  }
  return result;
}
module.exports = RandomizedVerticals;
