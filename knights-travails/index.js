const MOVES = [
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
];
function getNeighbors([x, y]) {
  const neighbors = [];
  for (const [dx, dy] of MOVES) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) neighbors.push([nx, ny]);
  }
  return neighbors;
}
