import React, { useRef, useEffect, useState } from 'react';
import { Guest } from './GuestStatusSidebar';
import { HazardType } from './HazardOverlay';
import { findPath, isOnPath, Point } from '../utils/pathfinding';
import { floorDataMap } from '../data/floorData';

interface DigitalTwinMapProps {
  floor: number;
  guests: Guest[];
  hazards: HazardType[];
  firebaseHazards?: any[];
  selectedGuestId?: string;
  onGuestClick: (guestId: string) => void;
  isDark: boolean;
}

interface Hazard {
  x: number;
  y: number;
  radius: number;
  type: string;
}

interface ResponderTeam {
  id: string;
  x: number;
  y: number;
  label: string;
}

export function DigitalTwinMap({ floor, guests, hazards, firebaseHazards = [], selectedGuestId, onGuestClick, isDark }: DigitalTwinMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  // Hotel layout with exits
  const exits = [
    { x: 100, y: 100, label: 'EXIT A' },
    { x: 700, y: 100, label: 'EXIT B' },
    { x: 100, y: 500, label: 'EXIT C' },
    { x: 700, y: 500, label: 'EXIT D' },
  ];

  // Responder teams
  const responders: ResponderTeam[] = [
    { id: 'team-1', x: 400, y: 200, label: 'TEAM ALPHA' },
    { id: 'team-2', x: 400, y: 400, label: 'TEAM BRAVO' },
  ];

  // Get hazard locations from floor data based on enabled hazards
  const floorData = floorDataMap[floor];
  const hazardLocations: Hazard[] = [];

  if (floorData) {
    hazards.forEach((hazard) => {
      if (hazard.enabled && floorData.hazardLocations[hazard.id]) {
        hazardLocations.push(...floorData.hazardLocations[hazard.id]);
      }
    });
  }

  // Add Firebase hazards for current floor
  firebaseHazards.forEach((hazard) => {
    if (hazard.floor === floor && hazard.location) {
      hazardLocations.push({
        x: hazard.location.x,
        y: hazard.location.y,
        radius: 60,
        type: hazard.hazardType || hazard.sensorType?.toLowerCase() || 'fire',
      });
    }
  });

  // Draw realistic hazard symbols
  const drawHazardSymbol = (ctx: CanvasRenderingContext2D, hazard: Hazard, zoom: number) => {
    ctx.save();
    ctx.translate(hazard.x, hazard.y);

    const iconSize = 30 / zoom;

    switch (hazard.type) {
      case 'fire':
        // Draw flame icon
        ctx.fillStyle = '#ff4500';
        ctx.beginPath();
        ctx.moveTo(0, iconSize / 2);
        ctx.bezierCurveTo(-iconSize / 4, iconSize / 4, -iconSize / 3, 0, 0, -iconSize / 2);
        ctx.bezierCurveTo(iconSize / 3, 0, iconSize / 4, iconSize / 4, 0, iconSize / 2);
        ctx.fill();

        ctx.fillStyle = '#ffaa00';
        ctx.beginPath();
        ctx.moveTo(0, iconSize / 3);
        ctx.bezierCurveTo(-iconSize / 6, iconSize / 6, -iconSize / 5, 0, 0, -iconSize / 3);
        ctx.bezierCurveTo(iconSize / 5, 0, iconSize / 6, iconSize / 6, 0, iconSize / 3);
        ctx.fill();
        break;

      case 'flooded':
        // Draw water droplets
        ctx.fillStyle = '#0ea5e9';
        for (let i = 0; i < 3; i++) {
          const offsetX = (i - 1) * iconSize / 3;
          ctx.beginPath();
          ctx.arc(offsetX, 0, iconSize / 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(offsetX, 0);
          ctx.lineTo(offsetX - iconSize / 8, -iconSize / 4);
          ctx.lineTo(offsetX + iconSize / 8, -iconSize / 4);
          ctx.closePath();
          ctx.fill();
        }
        break;

      case 'crowded':
        // Draw people silhouettes
        ctx.fillStyle = '#f59e0b';
        for (let i = 0; i < 3; i++) {
          const offsetX = (i - 1) * iconSize / 3;
          // Head
          ctx.beginPath();
          ctx.arc(offsetX, -iconSize / 4, iconSize / 8, 0, Math.PI * 2);
          ctx.fill();
          // Body
          ctx.fillRect(offsetX - iconSize / 12, -iconSize / 8, iconSize / 6, iconSize / 3);
        }
        break;

      case 'blocked-exit':
        // Draw door with X
        ctx.strokeStyle = '#ff0040';
        ctx.lineWidth = 3 / zoom;
        ctx.strokeRect(-iconSize / 2, -iconSize / 2, iconSize, iconSize);
        ctx.beginPath();
        ctx.moveTo(-iconSize / 3, -iconSize / 3);
        ctx.lineTo(iconSize / 3, iconSize / 3);
        ctx.moveTo(iconSize / 3, -iconSize / 3);
        ctx.lineTo(-iconSize / 3, iconSize / 3);
        ctx.stroke();
        break;

      case 'broken-lift':
        // Draw elevator with warning
        ctx.strokeStyle = '#ff0040';
        ctx.fillStyle = '#ff0040';
        ctx.lineWidth = 2 / zoom;
        ctx.strokeRect(-iconSize / 2, -iconSize / 2, iconSize, iconSize);
        ctx.fillRect(-iconSize / 2.5, -iconSize / 8, iconSize / 5, iconSize / 2);
        ctx.fillRect(iconSize / 6, -iconSize / 8, iconSize / 5, iconSize / 2);
        // Warning triangle
        ctx.beginPath();
        ctx.moveTo(0, -iconSize / 3);
        ctx.lineTo(-iconSize / 4, 0);
        ctx.lineTo(iconSize / 4, 0);
        ctx.closePath();
        ctx.fill();
        break;

      case 'broken-stairway':
        // Draw stairs with break
        ctx.strokeStyle = '#ff0040';
        ctx.fillStyle = '#ff0040';
        ctx.lineWidth = 2 / zoom;
        for (let i = 0; i < 3; i++) {
          const y = -iconSize / 3 + i * iconSize / 4;
          const x = -iconSize / 2 + i * iconSize / 6;
          ctx.strokeRect(x, y, iconSize / 4, iconSize / 8);
        }
        // Break mark
        ctx.beginPath();
        ctx.moveTo(-iconSize / 4, 0);
        ctx.lineTo(iconSize / 4, 0);
        ctx.stroke();
        break;
    }

    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.fillStyle = isDark ? '#0a0e1a' : '#f1f5f9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);

    // Draw grid
    const gridColor = isDark ? 'rgba(0, 255, 255, 0.1)' : 'rgba(100, 116, 139, 0.15)';
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1 / zoom;
    for (let x = 0; x < canvas.width / zoom; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height / zoom);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height / zoom; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width / zoom, y);
      ctx.stroke();
    }

    // Draw hotel outline
    const outlineColor = isDark ? '#00ffff' : '#0ea5e9';
    ctx.strokeStyle = outlineColor;
    ctx.lineWidth = 3 / zoom;
    ctx.strokeRect(50, 50, 700, 500);

    // Draw rooms
    const roomWidth = 100;
    const roomHeight = 80;
    const roomColor = isDark ? 'rgba(0, 255, 255, 0.3)' : 'rgba(14, 165, 233, 0.3)';
    ctx.strokeStyle = roomColor;
    ctx.lineWidth = 1 / zoom;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 4; j++) {
        ctx.strokeRect(100 + i * 110, 100 + j * 100, roomWidth, roomHeight);
      }
    }

    // Draw hazard zones with glow
    hazardLocations.forEach((hazard) => {
      const gradient = ctx.createRadialGradient(hazard.x, hazard.y, 0, hazard.x, hazard.y, hazard.radius);

      let color1, color2;
      switch (hazard.type) {
        case 'fire':
          color1 = 'rgba(255, 0, 64, 0.4)';
          color2 = 'rgba(255, 0, 64, 0)';
          break;
        case 'flooded':
          color1 = 'rgba(14, 165, 233, 0.3)';
          color2 = 'rgba(14, 165, 233, 0)';
          break;
        case 'crowded':
          color1 = 'rgba(245, 158, 11, 0.3)';
          color2 = 'rgba(245, 158, 11, 0)';
          break;
        default:
          color1 = 'rgba(255, 0, 64, 0.4)';
          color2 = 'rgba(255, 0, 64, 0)';
      }

      gradient.addColorStop(0, color1);
      gradient.addColorStop(1, color2);
      ctx.fillStyle = gradient;
      ctx.fillRect(hazard.x - hazard.radius, hazard.y - hazard.radius, hazard.radius * 2, hazard.radius * 2);

      // Draw hazard border with glow for red hazards
      const isRedHazard = ['fire', 'blocked-exit', 'broken-lift', 'broken-stairway'].includes(hazard.type);
      ctx.strokeStyle = isRedHazard ? '#ff0040' : hazard.type === 'flooded' ? '#0ea5e9' : '#f59e0b';
      ctx.lineWidth = 2 / zoom;

      if (isRedHazard) {
        ctx.shadowColor = 'rgba(255, 0, 64, 0.6)';
        ctx.shadowBlur = 10;
      }

      ctx.setLineDash([5 / zoom, 5 / zoom]);
      ctx.beginPath();
      ctx.arc(hazard.x, hazard.y, hazard.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.shadowBlur = 0;

      // Draw hazard symbol
      drawHazardSymbol(ctx, hazard, zoom);
    });

    // Draw exits
    exits.forEach((exit) => {
      const isBlocked = hazardLocations.some((h) => {
        const dist = Math.sqrt(Math.pow(exit.x - h.x, 2) + Math.pow(exit.y - h.y, 2));
        return h.type === 'blocked-exit' && dist < h.radius;
      });

      ctx.fillStyle = isBlocked ? '#ff0040' : '#00ff00';
      ctx.fillRect(exit.x - 15, exit.y - 15, 30, 30);

      ctx.strokeStyle = isBlocked ? '#ff0040' : '#00ff00';
      ctx.lineWidth = 2 / zoom;
      ctx.strokeRect(exit.x - 15, exit.y - 15, 30, 30);

      ctx.fillStyle = isBlocked ? '#ff0040' : '#00ff00';
      ctx.font = `${10 / zoom}px monospace`;
      ctx.fillText(exit.label, exit.x - 20, exit.y - 20);
    });

    // Draw responder teams
    responders.forEach((responder) => {
      ctx.fillStyle = '#00ffff';
      ctx.beginPath();
      ctx.arc(responder.x, responder.y, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 3 / zoom;
      ctx.beginPath();
      ctx.arc(responder.x, responder.y, 20, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#00ffff';
      ctx.font = `${10 / zoom}px monospace`;
      ctx.fillText(responder.label, responder.x - 30, responder.y - 30);
    });

    // Draw pathfinding lines for selected guest
    const selectedGuest = guests.find((g) => g.id === selectedGuestId);
    if (selectedGuest) {
      // Find nearest safe exit using A* pathfinding
      let nearestExit = exits[0];
      let minDistance = Infinity;
      exits.forEach((exit) => {
        const distance = Math.sqrt(Math.pow(selectedGuest.location.x - exit.x, 2) + Math.pow(selectedGuest.location.y - exit.y, 2));
        const isExitBlocked = hazardLocations.some((h) => {
          const dist = Math.sqrt(Math.pow(exit.x - h.x, 2) + Math.pow(exit.y - h.y, 2));
          return h.type === 'blocked-exit' && dist < h.radius;
        });

        if (!isExitBlocked && distance < minDistance) {
          minDistance = distance;
          nearestExit = exit;
        }
      });

      const pathToExit = findPath(selectedGuest.location, nearestExit, hazardLocations, canvas.width / zoom, canvas.height / zoom);
      const isGuestOnPath = isOnPath(selectedGuest.location, pathToExit, 35);
      const pathColor = isGuestOnPath ? '#10b981' : '#ff0040';

      // Draw path to safe exit
      ctx.strokeStyle = pathColor;
      ctx.lineWidth = 3 / zoom;
      ctx.shadowColor = isGuestOnPath ? 'rgba(16, 185, 129, 0.8)' : 'rgba(255, 0, 64, 0.8)';
      ctx.shadowBlur = 15;
      ctx.setLineDash([10 / zoom, 5 / zoom]);
      ctx.beginPath();
      ctx.moveTo(pathToExit[0].x, pathToExit[0].y);
      for (let i = 1; i < pathToExit.length; i++) {
        ctx.lineTo(pathToExit[i].x, pathToExit[i].y);
      }
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.shadowBlur = 0;

      // Draw arrow at end
      if (pathToExit.length >= 2) {
        const lastPoint = pathToExit[pathToExit.length - 1];
        const secondLast = pathToExit[pathToExit.length - 2];
        const exitAngle = Math.atan2(lastPoint.y - secondLast.y, lastPoint.x - secondLast.x);
        ctx.fillStyle = pathColor;
        ctx.beginPath();
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(lastPoint.x - 15 * Math.cos(exitAngle - Math.PI / 6), lastPoint.y - 15 * Math.sin(exitAngle - Math.PI / 6));
        ctx.lineTo(lastPoint.x - 15 * Math.cos(exitAngle + Math.PI / 6), lastPoint.y - 15 * Math.sin(exitAngle + Math.PI / 6));
        ctx.closePath();
        ctx.fill();
      }

      // Find nearest responder team
      let nearestResponder = responders[0];
      minDistance = Infinity;
      responders.forEach((responder) => {
        const distance = Math.sqrt(Math.pow(selectedGuest.location.x - responder.x, 2) + Math.pow(selectedGuest.location.y - responder.y, 2));
        if (distance < minDistance) {
          minDistance = distance;
          nearestResponder = responder;
        }
      });

      const pathToResponder = findPath(selectedGuest.location, nearestResponder, hazardLocations, canvas.width / zoom, canvas.height / zoom);

      // Draw path to nearest responder with blue
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 3 / zoom;
      ctx.shadowColor = 'rgba(34, 211, 238, 0.8)';
      ctx.shadowBlur = 15;
      ctx.setLineDash([10 / zoom, 5 / zoom]);
      ctx.beginPath();
      ctx.moveTo(pathToResponder[0].x, pathToResponder[0].y);
      for (let i = 1; i < pathToResponder.length; i++) {
        ctx.lineTo(pathToResponder[i].x, pathToResponder[i].y);
      }
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.shadowBlur = 0;

      // Draw arrow at end
      if (pathToResponder.length >= 2) {
        const lastPoint = pathToResponder[pathToResponder.length - 1];
        const secondLast = pathToResponder[pathToResponder.length - 2];
        const responderAngle = Math.atan2(lastPoint.y - secondLast.y, lastPoint.x - secondLast.x);
        ctx.fillStyle = '#22d3ee';
        ctx.beginPath();
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(lastPoint.x - 15 * Math.cos(responderAngle - Math.PI / 6), lastPoint.y - 15 * Math.sin(responderAngle - Math.PI / 6));
        ctx.lineTo(lastPoint.x - 15 * Math.cos(responderAngle + Math.PI / 6), lastPoint.y - 15 * Math.sin(responderAngle + Math.PI / 6));
        ctx.closePath();
        ctx.fill();
      }
    }

    // Draw guests
    guests.forEach((guest) => {
      const isSelected = guest.id === selectedGuestId;

      ctx.fillStyle = guest.status === 'safe' ? '#00ff00' : '#ff0040';
      ctx.beginPath();
      ctx.arc(guest.location.x, guest.location.y, isSelected ? 10 : 8, 0, Math.PI * 2);
      ctx.fill();

      if (isSelected) {
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 3 / zoom;
        ctx.beginPath();
        ctx.arc(guest.location.x, guest.location.y, 20, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.fillStyle = guest.status === 'safe' ? '#00ff00' : '#ff0040';
      ctx.font = `${9 / zoom}px monospace`;
      ctx.fillText(guest.name, guest.location.x + 15, guest.location.y - 5);
      ctx.font = `${7 / zoom}px monospace`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.fillText(`Room ${guest.room}`, guest.location.x + 15, guest.location.y + 5);
    });

    ctx.restore();
  }, [floor, guests, hazards, selectedGuestId, pan, zoom, hazardLocations, isDark]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((prev) => Math.max(0.5, Math.min(3, prev * delta)));
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (isDragging) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left - pan.x) / zoom;
    const y = (e.clientY - rect.top - pan.y) / zoom;

    guests.forEach((guest) => {
      const distance = Math.sqrt(Math.pow(x - guest.location.x, 2) + Math.pow(y - guest.location.y, 2));
      if (distance < 15) {
        onGuestClick(guest.id);
      }
    });
  };

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onClick={handleCanvasClick}
      />

      {/* Controls hint */}
      <div
        className="absolute bottom-4 right-6 rounded-lg px-4 py-2 backdrop-blur-md border-2"
        style={{
          backgroundColor: isDark ? 'rgba(15, 20, 35, 0.9)' : 'rgba(255, 255, 255, 0.95)',
          borderColor: isDark ? 'rgba(0, 255, 255, 0.3)' : 'rgba(14, 165, 233, 0.3)',
        }}
      >
        <p
          className="text-xs"
          style={{ color: isDark ? '#00ffff' : '#0ea5e9' }}
        >
          <span>CONTROLS:</span> Drag to pan • Scroll to zoom • Click guests to select
        </p>
      </div>

      {/* Floor indicator */}
      <div
        className="absolute top-24 left-1/2 -translate-x-1/2 rounded-lg px-6 py-3 backdrop-blur-md border-2"
        style={{
          backgroundColor: isDark ? 'rgba(15, 20, 35, 0.9)' : 'rgba(255, 255, 255, 0.95)',
          borderColor: isDark ? 'rgba(0, 255, 255, 0.3)' : 'rgba(14, 165, 233, 0.3)',
        }}
      >
        <div className="text-center">
          <div
            className="text-xs mb-1"
            style={{ color: isDark ? '#00ffff' : '#0ea5e9' }}
          >
            VIEWING FLOOR
          </div>
          <div
            className="text-3xl"
            style={{ color: isDark ? '#00ffff' : '#0ea5e9' }}
          >
            {floor}
          </div>
        </div>
      </div>
    </div>
  );
}
