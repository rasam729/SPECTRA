import React from 'react';
import { Building2, X } from 'lucide-react';

interface FloorSelectorProps {
  currentFloor: number;
  totalFloors: number;
  onFloorChange: (floor: number) => void;
  isDark: boolean;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export function FloorSelector({ currentFloor, totalFloors, onFloorChange, isDark, isOpen, onToggleOpen }: FloorSelectorProps) {
  const floors = Array.from({ length: totalFloors }, (_, i) => totalFloors - i);

  const bgColor = isDark ? 'rgba(15, 20, 35, 0.9)' : 'rgba(255, 255, 255, 0.95)';
  const borderColor = isDark ? 'rgba(0, 255, 255, 0.3)' : 'rgba(14, 165, 233, 0.3)';
  const primaryColor = isDark ? '#00ffff' : '#0ea5e9';
  const textColor = isDark ? '#ffffff' : '#1e293b';

  if (!isOpen) {
    return (
      <button
        onClick={onToggleOpen}
        className="absolute top-24 left-6 z-10 rounded-lg px-4 py-2 backdrop-blur-md border-2 flex items-center gap-2 transition-all hover:scale-105"
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
        }}
      >
        <Building2 className="w-5 h-5" style={{ color: primaryColor }} />
        <span className="text-sm" style={{ color: primaryColor }}>FLOOR {currentFloor}</span>
      </button>
    );
  }

  return (
    <div
      className="absolute top-24 left-6 z-10 rounded-lg p-3 backdrop-blur-md border-2"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
      }}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5" style={{ color: primaryColor }} />
          <span className="text-sm" style={{ color: primaryColor }}>FLOOR SELECT</span>
        </div>
        <button
          onClick={onToggleOpen}
          className="p-1 rounded hover:bg-gray-500/20 transition-all"
        >
          <X className="w-4 h-4" style={{ color: textColor }} />
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {floors.map((floor) => (
          <button
            key={floor}
            onClick={() => onFloorChange(floor)}
            className="px-4 py-2 rounded transition-all border-2"
            style={{
              backgroundColor: currentFloor === floor
                ? isDark ? 'rgba(0, 255, 255, 0.15)' : 'rgba(14, 165, 233, 0.15)'
                : 'transparent',
              borderColor: currentFloor === floor ? primaryColor : `${primaryColor}50`,
              color: currentFloor === floor ? primaryColor : `${textColor}99`,
            }}
          >
            {floor === 1 ? 'GROUND' : `FLOOR ${floor}`}
          </button>
        ))}
      </div>
    </div>
  );
}
