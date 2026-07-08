import { knightMoves } from './index.js';

const isOnBoard = ([x, y]) => {
  return (
    Number.isInteger(x) &&
    Number.isInteger(y) &&
    x >= 0 &&
    x <= 7 &&
    y >= 0 &&
    y <= 7
  );
};

const isKnightMove = ([x1, y1], [x2, y2]) => {
  const dx = Math.abs(x1 - x2);
  const dy = Math.abs(y1 - y2);

  return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
};

const expectValidShortestPath = (path, start, end, expectedMoves) => {
  expect(Array.isArray(path)).toBe(true);
  expect(path.length).toBeGreaterThan(0);

  expect(path[0]).toEqual(start);
  expect(path[path.length - 1]).toEqual(end);

  for (const square of path) {
    expect(isOnBoard(square)).toBe(true);
  }

  for (let i = 1; i < path.length; i++) {
    expect(isKnightMove(path[i - 1], path[i])).toBe(true);
  }

  expect(path.length - 1).toBe(expectedMoves);
};

describe('knightMoves(start, end)', () => {
  test('returns the same square when start and end are equal', () => {
    const path = knightMoves([0, 0], [0, 0]);

    expectValidShortestPath(path, [0, 0], [0, 0], 0);
  });

  test('finds a one-move path', () => {
    const path = knightMoves([0, 0], [1, 2]);

    expectValidShortestPath(path, [0, 0], [1, 2], 1);
  });

  test('finds a shortest path from [0,0] to [3,3]', () => {
    const path = knightMoves([0, 0], [3, 3]);

    expectValidShortestPath(path, [0, 0], [3, 3], 2);
  });

  test('finds a shortest path from [3,3] to [0,0]', () => {
    const path = knightMoves([3, 3], [0, 0]);

    expectValidShortestPath(path, [3, 3], [0, 0], 2);
  });

  test('finds a shortest path from [0,0] to [7,7]', () => {
    const path = knightMoves([0, 0], [7, 7]);

    expectValidShortestPath(path, [0, 0], [7, 7], 6);
  });

  test('finds a shortest path from [3,3] to [4,3]', () => {
    const path = knightMoves([3, 3], [4, 3]);

    expectValidShortestPath(path, [3, 3], [4, 3], 3);
  });

  test('does not require one exact path when multiple shortest paths exist', () => {
    const path = knightMoves([0, 0], [3, 3]);

    const possiblePaths = [
      [
        [0, 0],
        [2, 1],
        [3, 3],
      ],
      [
        [0, 0],
        [1, 2],
        [3, 3],
      ],
    ];

    expect(possiblePaths).toContainEqual(path);
  });
});
