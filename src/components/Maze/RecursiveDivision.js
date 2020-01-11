function RecursiveDivision(grid) {
  let order = [];
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  function checkInside(array, element) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][0] === element[0] && array[i][1] === element[1]) {
        return true;
      }
    }
    return false;
  }

  function addHorizontalWall(minX, maxX, y) {
    var hole = Math.floor(randomNumber(minX, maxX) / 2) * 2 + 1;

    for (var i = minX; i <= maxX; i++) {
      if (i !== hole && !checkInside(order, [i, y])) order.push([i, y]);
    }
  }
  function addVerticalWall(minY, maxY, x) {
    var hole = Math.floor(randomNumber(minY, maxY) / 2) * 2 + 1;

    for (var i = minY; i <= maxY; i++) {
      if (i !== hole && !checkInside(order, [x, i])) order.push([x, i]);
    }
  }

  function divide(grid, horizontal, start, end) {
    let diff = [end[0] - start[0], end[1] - start[1]];

    if (horizontal) {
      if (diff[0] < 1) {
        return;
      }
      var y = Math.floor(randomNumber(start[1], end[1]) / 2) * 2;
      addHorizontalWall(start[0], end[0], y);
      divide(grid, !horizontal, start, [end[0], y - 1]);
      divide(grid, !horizontal, [start[0], y + 1], end);
    } else {
      if (diff[1] < 1) {
        return;
      }
      var x = Math.floor(randomNumber(start[0], end[0]) / 2) * 2;
      addVerticalWall(start[1], end[1], x);
      divide(grid, !horizontal, start, [x - 1, end[1]]);
      divide(grid, !horizontal, [x + 1, start[1]], end);
    }
  }

  divide(grid, false, [1, 1], [grid.length - 2, grid[0].length - 2]);
  return order;
}

export default RecursiveDivision;
