function RandomizedHorizontals(grid) {
  var rows = grid.length;
  var cols = grid[0].length;

  var lines = parseInt((rows - 2) / 2);
  var holes = [];
  for (let i = 0; i < lines; i++) {
    var currHoleI = parseInt(Math.random() * (cols - 2) + 1);
    holes.push(currHoleI);
  }
  var result = [];
  for (let i = 0; i < holes.length; i++) {
    for (let j = 1; j < cols - 1; j++) {
      if (j != holes[i]) {
        result.push([2 * i + 2, j]);
      }
    }
  }
  return result;
}
module.exports = RandomizedHorizontals;
