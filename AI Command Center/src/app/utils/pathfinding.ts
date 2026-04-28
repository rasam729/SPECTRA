// A* pathfinding algorithm for navigating around hazards

export interface Point {
  x: number;
  y: number;
}

export interface Hazard {
  x: number;
  y: number;
  radius: number;
  type: string;
}

interface Node {
  x: number;
  y: number;
  g: number; // Cost from start
  h: number; // Heuristic cost to end
  f: number; // Total cost
  parent?: Node;
}

const GRID_SIZE = 20; // Size of each grid cell for pathfinding

export function findPath(start: Point, end: Point, hazards: Hazard[], mapWidth: number, mapHeight: number): Point[] {
  // Create grid
  const cols = Math.ceil(mapWidth / GRID_SIZE);
  const rows = Math.ceil(mapHeight / GRID_SIZE);

  // Convert points to grid coordinates
  const startNode: Node = {
    x: Math.floor(start.x / GRID_SIZE),
    y: Math.floor(start.y / GRID_SIZE),
    g: 0,
    h: 0,
    f: 0,
  };

  const endNode: Node = {
    x: Math.floor(end.x / GRID_SIZE),
    y: Math.floor(end.y / GRID_SIZE),
    g: 0,
    h: 0,
    f: 0,
  };

  startNode.h = heuristic(startNode, endNode);
  startNode.f = startNode.h;

  const openList: Node[] = [startNode];
  const closedList: Set<string> = new Set();

  const getKey = (node: Node) => `${node.x},${node.y}`;

  // Check if a grid cell is blocked by a hazard
  const isBlocked = (gridX: number, gridY: number): boolean => {
    const worldX = gridX * GRID_SIZE + GRID_SIZE / 2;
    const worldY = gridY * GRID_SIZE + GRID_SIZE / 2;

    for (const hazard of hazards) {
      const distance = Math.sqrt(
        Math.pow(worldX - hazard.x, 2) + Math.pow(worldY - hazard.y, 2)
      );
      if (distance < hazard.radius + GRID_SIZE) {
        return true;
      }
    }
    return false;
  };

  while (openList.length > 0) {
    // Find node with lowest f score
    let currentIndex = 0;
    for (let i = 1; i < openList.length; i++) {
      if (openList[i].f < openList[currentIndex].f) {
        currentIndex = i;
      }
    }

    const current = openList[currentIndex];

    // Check if we reached the goal
    if (current.x === endNode.x && current.y === endNode.y) {
      // Reconstruct path
      const path: Point[] = [];
      let temp: Node | undefined = current;
      while (temp) {
        path.unshift({
          x: temp.x * GRID_SIZE + GRID_SIZE / 2,
          y: temp.y * GRID_SIZE + GRID_SIZE / 2,
        });
        temp = temp.parent;
      }

      // Smooth the path
      return smoothPath(path, hazards);
    }

    // Move current from open to closed
    openList.splice(currentIndex, 1);
    closedList.add(getKey(current));

    // Check all neighbors
    const neighbors = [
      { x: current.x + 1, y: current.y },
      { x: current.x - 1, y: current.y },
      { x: current.x, y: current.y + 1 },
      { x: current.x, y: current.y - 1 },
      { x: current.x + 1, y: current.y + 1 },
      { x: current.x - 1, y: current.y - 1 },
      { x: current.x + 1, y: current.y - 1 },
      { x: current.x - 1, y: current.y + 1 },
    ];

    for (const neighborPos of neighbors) {
      // Check bounds
      if (neighborPos.x < 0 || neighborPos.x >= cols || neighborPos.y < 0 || neighborPos.y >= rows) {
        continue;
      }

      // Check if blocked
      if (isBlocked(neighborPos.x, neighborPos.y)) {
        continue;
      }

      // Check if in closed list
      if (closedList.has(getKey(neighborPos))) {
        continue;
      }

      // Calculate costs
      const isDiagonal = neighborPos.x !== current.x && neighborPos.y !== current.y;
      const g = current.g + (isDiagonal ? 1.414 : 1);
      const h = heuristic(neighborPos, endNode);
      const f = g + h;

      // Check if in open list with better score
      const existingIndex = openList.findIndex(
        (n) => n.x === neighborPos.x && n.y === neighborPos.y
      );

      if (existingIndex !== -1) {
        if (g < openList[existingIndex].g) {
          openList[existingIndex].g = g;
          openList[existingIndex].f = f;
          openList[existingIndex].parent = current;
        }
      } else {
        openList.push({
          x: neighborPos.x,
          y: neighborPos.y,
          g,
          h,
          f,
          parent: current,
        });
      }
    }
  }

  // No path found, return straight line
  return [start, end];
}

function heuristic(a: Node, b: Node): number {
  // Euclidean distance
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

function smoothPath(path: Point[], hazards: Hazard[]): Point[] {
  if (path.length <= 2) return path;

  const smoothed: Point[] = [path[0]];
  let current = 0;

  while (current < path.length - 1) {
    let farthest = current + 1;

    // Find the farthest point we can see
    for (let i = current + 2; i < path.length; i++) {
      if (hasLineOfSight(path[current], path[i], hazards)) {
        farthest = i;
      } else {
        break;
      }
    }

    smoothed.push(path[farthest]);
    current = farthest;
  }

  return smoothed;
}

function hasLineOfSight(start: Point, end: Point, hazards: Hazard[]): boolean {
  const steps = 20;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = start.x + (end.x - start.x) * t;
    const y = start.y + (end.y - start.y) * t;

    for (const hazard of hazards) {
      const distance = Math.sqrt(Math.pow(x - hazard.x, 2) + Math.pow(y - hazard.y, 2));
      if (distance < hazard.radius) {
        return false;
      }
    }
  }
  return true;
}

// Check if a point is on the path (within threshold)
export function isOnPath(point: Point, path: Point[], threshold: number = 30): boolean {
  if (path.length < 2) return false;

  for (let i = 0; i < path.length - 1; i++) {
    const distance = pointToLineSegmentDistance(point, path[i], path[i + 1]);
    if (distance < threshold) {
      return true;
    }
  }
  return false;
}

function pointToLineSegmentDistance(point: Point, lineStart: Point, lineEnd: Point): number {
  const dx = lineEnd.x - lineStart.x;
  const dy = lineEnd.y - lineStart.y;
  const lenSq = dx * dx + dy * dy;

  if (lenSq === 0) {
    return Math.sqrt(Math.pow(point.x - lineStart.x, 2) + Math.pow(point.y - lineStart.y, 2));
  }

  let t = ((point.x - lineStart.x) * dx + (point.y - lineStart.y) * dy) / lenSq;
  t = Math.max(0, Math.min(1, t));

  const projX = lineStart.x + t * dx;
  const projY = lineStart.y + t * dy;

  return Math.sqrt(Math.pow(point.x - projX, 2) + Math.pow(point.y - projY, 2));
}
