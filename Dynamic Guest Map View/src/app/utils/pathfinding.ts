export interface Point {
  x: number;
  y: number;
}

export interface GridCell {
  x: number;
  y: number;
  walkable: boolean;
}

class PriorityQueue<T> {
  private items: { element: T; priority: number }[] = [];

  enqueue(element: T, priority: number) {
    this.items.push({ element, priority });
    this.items.sort((a, b) => a.priority - b.priority);
  }

  dequeue(): T | undefined {
    return this.items.shift()?.element;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

function heuristic(a: Point, b: Point): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function getNeighbors(point: Point, grid: boolean[][]): Point[] {
  const neighbors: Point[] = [];
  const directions = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
  ];

  for (const dir of directions) {
    const newX = point.x + dir.x;
    const newY = point.y + dir.y;

    if (
      newY >= 0 &&
      newY < grid.length &&
      newX >= 0 &&
      newX < grid[0].length &&
      grid[newY][newX]
    ) {
      neighbors.push({ x: newX, y: newY });
    }
  }

  return neighbors;
}

export function findPath(
  start: Point,
  end: Point,
  grid: boolean[][]
): Point[] {
  const openSet = new PriorityQueue<Point>();
  const cameFrom = new Map<string, Point>();
  const gScore = new Map<string, number>();
  const fScore = new Map<string, number>();

  const startKey = `${start.x},${start.y}`;
  const endKey = `${end.x},${end.y}`;

  gScore.set(startKey, 0);
  fScore.set(startKey, heuristic(start, end));
  openSet.enqueue(start, fScore.get(startKey)!);

  while (!openSet.isEmpty()) {
    const current = openSet.dequeue()!;
    const currentKey = `${current.x},${current.y}`;

    if (currentKey === endKey) {
      const path: Point[] = [];
      let temp: Point | undefined = current;

      while (temp) {
        path.unshift(temp);
        const tempKey = `${temp.x},${temp.y}`;
        temp = cameFrom.get(tempKey);
      }

      return path;
    }

    const neighbors = getNeighbors(current, grid);

    for (const neighbor of neighbors) {
      const neighborKey = `${neighbor.x},${neighbor.y}`;
      const tentativeGScore = (gScore.get(currentKey) || 0) + 1;

      if (
        !gScore.has(neighborKey) ||
        tentativeGScore < gScore.get(neighborKey)!
      ) {
        cameFrom.set(neighborKey, current);
        gScore.set(neighborKey, tentativeGScore);
        const f = tentativeGScore + heuristic(neighbor, end);
        fScore.set(neighborKey, f);
        openSet.enqueue(neighbor, f);
      }
    }
  }

  return [];
}
