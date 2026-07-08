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

    if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
      neighbors.push([nx, ny]);
    }
  }
  return neighbors;
}
export function knightMoves(start, end) {
  if (JSON.stringify(start) === JSON.stringify(end)) return [start];
  const queue = [];
  const visited = new Set();
  queue.push({ position: start, path: [start] });
  visited.add(JSON.stringify(start));
  let index = 0;
  while (index < queue.length && queue.length !== 0) {
    const current = queue[index].position;
    const currentNeighbors = getNeighbors(current);
    for (const neighbor of currentNeighbors) {
      if (JSON.stringify(neighbor) === JSON.stringify(end)) {
        queue[index].path.push(neighbor);
        return queue[index].path;
      }
      if (!visited.has(JSON.stringify(neighbor))) {
        const currentPath = [...queue[index].path];
        currentPath.push(neighbor);
        queue.push({ position: neighbor, path: currentPath });
        visited.add(JSON.stringify(neighbor));
      }
    }
    index++;
  }
}
