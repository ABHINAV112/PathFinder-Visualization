function RecursiveDivision(grid) {
  let order = [];
  let temp = [...grid];
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function addHWall(minX, maxX, y) {
    var hole = Math.floor(randomNumber(minX, maxX) / 2) * 2 + 1;

    for (var i = minX; i <= maxX; i++) {
      if (i !== hole) order.push([i, y]);
    }
  }
  function addVWall(minY, maxY, x) {
    var hole = Math.floor(randomNumber(minY, maxY) / 2) * 2 + 1;

    for (var i = minY; i <= maxY; i++) {
      if (i !== hole) order.push([x, i]);
    }
  }

  function divide(grid, horizontal, start, end) {
    let diff = [end[0] - start[0], end[1] - start[1]];
    // console.log("start", start, "end", end);
    // console.log("diff", diff);
    if (horizontal) {
      if (diff[0] < 2) {
        return;
      }
      var y = Math.floor(randomNumber(start[1], end[1]) / 2) * 2;
      addHWall(start[0], end[0], y);
      divide(grid, !horizontal, start, [end[0], y - 1]);
      divide(grid, !horizontal, [start[0], y + 1], end);
    } else {
      if (diff[1] < 2) {
        return;
      }
      var x = Math.floor(randomNumber(start[0], end[0]) / 2) * 2;
      addVWall(start[1], end[1], x);
      divide(grid, !horizontal, start, [x - 1, end[1]]);
      divide(grid, !horizontal, [x + 1, start[1]], end);
    }
  }
  // console.log(grid[0].length - 2);
  divide(temp, false, [1, 1], [grid.length - 2, grid[0].length - 2]);
  return order;
}

export default RecursiveDivision;
