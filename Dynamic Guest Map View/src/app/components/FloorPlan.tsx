import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Flame, Droplets, DoorClosed, Zap } from 'lucide-react';
import { findPath, Point } from '../utils/pathfinding';

const GRID_SIZE = 60;
const CELL_SIZE = 12;

interface Hazard {
  id: string;
  type: 'fire' | 'flood' | 'blocked-exit' | 'broken-lift';
  position: Point;
  active: boolean;
}

interface Exit {
  id: string;
  position: Point;
  type: 'exit' | 'stairway' | 'lift';
  blocked?: boolean;
}

export default function FloorPlan() {
  const [guestPosition, setGuestPosition] = useState<Point>({ x: 8, y: 10 });
  const [targetType, setTargetType] = useState<'exit' | 'response-team'>('exit');
  const [responseTeamPosition] = useState<Point>({ x: 52, y: 30 });
  const [hazards, setHazards] = useState<Hazard[]>([
    { id: 'fire-1', type: 'fire', position: { x: 20, y: 15 }, active: false },
    { id: 'flood-1', type: 'flood', position: { x: 35, y: 25 }, active: false },
    { id: 'blocked-1', type: 'blocked-exit', position: { x: 57, y: 10 }, active: false },
    { id: 'lift-1', type: 'broken-lift', position: { x: 30, y: 45 }, active: false },
  ]);

  const exits: Exit[] = [
    { id: 'exit-1', position: { x: 57, y: 10 }, type: 'exit' },
    { id: 'exit-2', position: { x: 57, y: 50 }, type: 'exit' },
    { id: 'stair-1', position: { x: 5, y: 30 }, type: 'stairway' },
    { id: 'stair-2', position: { x: 55, y: 30 }, type: 'stairway' },
    { id: 'lift-1', position: { x: 30, y: 45 }, type: 'lift' },
    { id: 'lift-2', position: { x: 30, y: 15 }, type: 'lift' },
  ];

  const walls = useMemo(() => {
    const wallPositions: Point[] = [];

    // Outer perimeter
    for (let x = 0; x < GRID_SIZE; x++) {
      wallPositions.push({ x, y: 0 });
      wallPositions.push({ x, y: GRID_SIZE - 1 });
    }
    for (let y = 0; y < GRID_SIZE; y++) {
      wallPositions.push({ x: 0, y });
      wallPositions.push({ x: GRID_SIZE - 1, y });
    }

    // Main corridor walls (horizontal corridor in the middle)
    for (let x = 8; x < 52; x++) {
      wallPositions.push({ x, y: 22 });
      wallPositions.push({ x, y: 38 });
    }

    // Left side rooms (8 rooms)
    for (let i = 0; i < 4; i++) {
      const startY = 5 + i * 8;
      // Room dividers
      for (let x = 2; x < 8; x++) {
        if (i > 0) wallPositions.push({ x, y: startY });
      }
      // Vertical wall
      for (let y = startY; y < startY + 8; y++) {
        wallPositions.push({ x: 8, y });
      }
    }

    // Right side rooms (8 rooms)
    for (let i = 0; i < 4; i++) {
      const startY = 5 + i * 8;
      // Room dividers
      for (let x = 52; x < 58; x++) {
        if (i > 0) wallPositions.push({ x, y: startY });
      }
      // Vertical wall
      for (let y = startY; y < startY + 8; y++) {
        wallPositions.push({ x: 52, y });
      }
    }

    // Top corridor rooms
    for (let i = 0; i < 5; i++) {
      const startX = 12 + i * 8;
      for (let y = 2; y < 8; y++) {
        wallPositions.push({ x: startX, y });
      }
      for (let x = startX; x < startX + 8; x++) {
        if (i > 0) wallPositions.push({ x, y: 8 });
      }
    }

    // Bottom corridor rooms
    for (let i = 0; i < 5; i++) {
      const startX = 12 + i * 8;
      for (let y = 52; y < 58; y++) {
        wallPositions.push({ x: startX, y });
      }
      for (let x = startX; x < startX + 8; x++) {
        if (i > 0) wallPositions.push({ x, y: 52 });
      }
    }

    // Middle section rooms (between corridors)
    for (let i = 0; i < 2; i++) {
      const startX = 12 + i * 20;
      for (let y = 10; y < 22; y++) {
        wallPositions.push({ x: startX, y });
      }
      for (let y = 38; y < 50; y++) {
        wallPositions.push({ x: startX, y });
      }
      for (let x = startX; x < startX + 8; x++) {
        wallPositions.push({ x, y: 15 });
        wallPositions.push({ x, y: 43 });
      }
    }

    return wallPositions;
  }, []);

  const grid = useMemo(() => {
    const newGrid: boolean[][] = Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill(true));

    walls.forEach(({ x, y }) => {
      if (y >= 0 && y < GRID_SIZE && x >= 0 && x < GRID_SIZE) {
        newGrid[y][x] = false;
      }
    });

    hazards.forEach((hazard) => {
      if (hazard.active) {
        const { x, y } = hazard.position;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const newY = y + dy;
            const newX = x + dx;
            if (newY >= 0 && newY < GRID_SIZE && newX >= 0 && newX < GRID_SIZE) {
              newGrid[newY][newX] = false;
            }
          }
        }
      }
    });

    return newGrid;
  }, [walls, hazards]);

  const path = useMemo(() => {
    const target = targetType === 'exit'
      ? findNearestExit(guestPosition, exits, hazards)
      : responseTeamPosition;

    if (!target) return [];
    return findPath(guestPosition, target, grid);
  }, [guestPosition, targetType, grid, exits, hazards, responseTeamPosition]);

  const toggleHazard = (id: string) => {
    setHazards((prev) =>
      prev.map((h) => (h.id === id ? { ...h, active: !h.active } : h))
    );
  };

  const handleGuestMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / CELL_SIZE);
    const y = Math.floor((e.clientY - rect.top) / CELL_SIZE);

    if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE && grid[y][x]) {
      setGuestPosition({ x, y });
    }
  };

  return (
    <div className="flex gap-6 p-6">
      <div className="flex-1">
        <svg
          width={GRID_SIZE * CELL_SIZE}
          height={GRID_SIZE * CELL_SIZE}
          className="cursor-crosshair rounded-lg shadow-2xl"
          style={{ background: '#0a0e1a' }}
          onClick={handleGuestMove}
        >
          <defs>
            <pattern id="grid" width={CELL_SIZE} height={CELL_SIZE} patternUnits="userSpaceOnUse">
              <path d={`M ${CELL_SIZE} 0 L 0 0 0 ${CELL_SIZE}`} fill="none" stroke="#1e293b" strokeWidth="0.3" opacity="0.4" />
            </pattern>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="strong-glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {walls.map((wall, i) => (
            <rect
              key={`wall-${i}`}
              x={wall.x * CELL_SIZE}
              y={wall.y * CELL_SIZE}
              width={CELL_SIZE}
              height={CELL_SIZE}
              fill="#1e40af"
              filter="url(#glow)"
              opacity="0.8"
            />
          ))}

          {exits.map((exit) => {
            const isBlocked = hazards.some(
              (h) => h.active && h.type === 'blocked-exit' && h.position.x === exit.position.x && h.position.y === exit.position.y
            );
            const isBroken = hazards.some(
              (h) => h.active && h.type === 'broken-lift' && h.position.x === exit.position.x && h.position.y === exit.position.y
            );

            return (
              <g key={exit.id}>
                <rect
                  x={exit.position.x * CELL_SIZE - 4}
                  y={exit.position.y * CELL_SIZE - 4}
                  width={CELL_SIZE + 8}
                  height={CELL_SIZE + 8}
                  fill={isBlocked || isBroken ? '#dc2626' : exit.type === 'exit' ? '#10b981' : exit.type === 'stairway' ? '#06b6d4' : '#f59e0b'}
                  opacity="0.9"
                  filter="url(#strong-glow)"
                  rx="2"
                />
                <text
                  x={exit.position.x * CELL_SIZE + CELL_SIZE / 2}
                  y={exit.position.y * CELL_SIZE + CELL_SIZE / 2 + 3}
                  fontSize="9"
                  fill="white"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {exit.type === 'exit' ? 'EXIT' : exit.type === 'stairway' ? 'STAIR' : 'LIFT'}
                </text>
              </g>
            );
          })}

          {hazards.filter(h => h.active).map((hazard) => (
            <g key={hazard.id}>
              <circle
                cx={hazard.position.x * CELL_SIZE + CELL_SIZE / 2}
                cy={hazard.position.y * CELL_SIZE + CELL_SIZE / 2}
                r={CELL_SIZE * 2}
                fill={hazard.type === 'fire' ? '#ef4444' : '#3b82f6'}
                opacity="0.2"
                filter="url(#strong-glow)"
              />
              <circle
                cx={hazard.position.x * CELL_SIZE + CELL_SIZE / 2}
                cy={hazard.position.y * CELL_SIZE + CELL_SIZE / 2}
                r={CELL_SIZE * 1.2}
                fill={hazard.type === 'fire' ? '#f87171' : '#60a5fa'}
                opacity="0.4"
                filter="url(#glow)"
              />
              <circle
                cx={hazard.position.x * CELL_SIZE + CELL_SIZE / 2}
                cy={hazard.position.y * CELL_SIZE + CELL_SIZE / 2}
                r={CELL_SIZE / 2 + 2}
                fill={hazard.type === 'fire' ? '#dc2626' : '#2563eb'}
                filter="url(#glow)"
              />
            </g>
          ))}

          {path.length > 1 && (
            <>
              <motion.path
                d={`M ${path.map((p) => `${p.x * CELL_SIZE + CELL_SIZE / 2},${p.y * CELL_SIZE + CELL_SIZE / 2}`).join(' L ')}`}
                stroke="#a78bfa"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.3"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.path
                d={`M ${path.map((p) => `${p.x * CELL_SIZE + CELL_SIZE / 2},${p.y * CELL_SIZE + CELL_SIZE / 2}`).join(' L ')}`}
                stroke="#8b5cf6"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              />
            </>
          )}

          <motion.circle
            cx={guestPosition.x * CELL_SIZE + CELL_SIZE / 2}
            cy={guestPosition.y * CELL_SIZE + CELL_SIZE / 2}
            r={CELL_SIZE / 2 + 3}
            fill="#8b5cf6"
            filter="url(#strong-glow)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />

          {targetType === 'response-team' && (
            <g>
              <circle
                cx={responseTeamPosition.x * CELL_SIZE + CELL_SIZE / 2}
                cy={responseTeamPosition.y * CELL_SIZE + CELL_SIZE / 2}
                r={CELL_SIZE}
                fill="#ec4899"
                opacity="0.3"
                filter="url(#glow)"
              />
              <circle
                cx={responseTeamPosition.x * CELL_SIZE + CELL_SIZE / 2}
                cy={responseTeamPosition.y * CELL_SIZE + CELL_SIZE / 2}
                r={CELL_SIZE / 2 + 2}
                fill="#ec4899"
                filter="url(#glow)"
              />
            </g>
          )}
        </svg>
      </div>

      <div className="w-72 space-y-4 bg-slate-900 p-6 rounded-lg shadow-2xl border border-slate-700">
        <div>
          <h3 className="font-semibold mb-3 text-slate-100 text-sm uppercase tracking-wider">Navigation Target</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setTargetType('exit')}
              className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-all ${
                targetType === 'exit'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Nearest Exit
            </button>
            <button
              onClick={() => setTargetType('response-team')}
              className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-all ${
                targetType === 'response-team'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Response Team
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-slate-100 text-sm uppercase tracking-wider">Active Hazards</h3>
          <div className="space-y-2">
            {hazards.map((hazard) => (
              <button
                key={hazard.id}
                onClick={() => toggleHazard(hazard.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-all font-medium text-sm ${
                  hazard.active
                    ? 'bg-red-600 text-white shadow-lg shadow-red-500/50'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {hazard.type === 'fire' && <Flame size={18} />}
                {hazard.type === 'flood' && <Droplets size={18} />}
                {hazard.type === 'blocked-exit' && <DoorClosed size={18} />}
                {hazard.type === 'broken-lift' && <Zap size={18} />}
                <span className="capitalize">{hazard.type.replace('-', ' ')}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-700 space-y-3 text-sm">
          <h3 className="font-semibold text-slate-100 text-xs uppercase tracking-wider mb-2">Legend</h3>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-purple-600 rounded-full shadow-lg shadow-purple-500/50"></div>
            <span className="text-slate-300">Guest (click map to move)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-green-500 rounded shadow-lg shadow-green-500/50"></div>
            <span className="text-slate-300">Emergency Exit</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-cyan-500 rounded shadow-lg shadow-cyan-500/50"></div>
            <span className="text-slate-300">Stairway</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-amber-500 rounded shadow-lg shadow-amber-500/50"></div>
            <span className="text-slate-300">Elevator</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-pink-500 rounded-full shadow-lg shadow-pink-500/50"></div>
            <span className="text-slate-300">Response Team</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-blue-700 rounded shadow-lg shadow-blue-500/30"></div>
            <span className="text-slate-300">Walls (glowing)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function findNearestExit(
  position: Point,
  exits: Exit[],
  hazards: Hazard[]
): Point | null {
  const availableExits = exits.filter((exit) => {
    const isBlocked = hazards.some(
      (h) => h.active && h.type === 'blocked-exit' && h.position.x === exit.position.x && h.position.y === exit.position.y
    );
    const isBroken = hazards.some(
      (h) => h.active && h.type === 'broken-lift' && exit.type === 'lift' && h.position.x === exit.position.x && h.position.y === exit.position.y
    );
    return !isBlocked && !isBroken;
  });

  if (availableExits.length === 0) return null;

  let nearest = availableExits[0];
  let minDist = Infinity;

  for (const exit of availableExits) {
    const dist = Math.abs(position.x - exit.position.x) + Math.abs(position.y - exit.position.y);
    if (dist < minDist) {
      minDist = dist;
      nearest = exit;
    }
  }

  return nearest.position;
}
