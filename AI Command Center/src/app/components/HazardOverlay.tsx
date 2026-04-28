import React from 'react';
import { Flame, AlertTriangle, DoorOpen, CircuitBoard, Users, Droplets, X } from 'lucide-react';

export interface HazardType {
  id: string;
  type: 'fire' | 'blocked-exit' | 'broken-lift' | 'broken-stairway' | 'crowded' | 'flooded';
  enabled: boolean;
  label: string;
  icon: React.ReactNode;
  color: string;
}

interface HazardOverlayProps {
  hazards: HazardType[];
  onToggleHazard: (id: string) => void;
  isDark: boolean;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export function HazardOverlay({ hazards, onToggleHazard, isDark, isOpen, onToggleOpen }: HazardOverlayProps) {
  const bgColor = isDark ? 'rgba(15, 20, 35, 0.9)' : 'rgba(255, 255, 255, 0.95)';
  const borderColor = isDark ? 'rgba(100, 116, 139, 0.3)' : 'rgba(148, 163, 184, 0.3)';
  const textColor = isDark ? '#94a3b8' : '#64748b';

  if (!isOpen) {
    return (
      <button
        onClick={onToggleOpen}
        className="absolute top-24 right-6 z-10 rounded-lg px-4 py-2 backdrop-blur-md border-2 flex items-center gap-2 transition-all hover:scale-105"
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
        }}
      >
        <AlertTriangle className="w-5 h-5" style={{ color: '#f59e0b' }} />
        <span className="text-sm" style={{ color: '#f59e0b' }}>HAZARDS</span>
      </button>
    );
  }

  return (
    <div
      className="absolute top-24 right-6 z-10 rounded-lg p-4 w-72 backdrop-blur-md border-2"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" style={{ color: '#f59e0b' }} />
          <span className="uppercase tracking-wider" style={{ color: '#f59e0b' }}>
            Hazard Overlay
          </span>
        </div>
        <button
          onClick={onToggleOpen}
          className="p-1 rounded hover:bg-gray-500/20 transition-all"
        >
          <X className="w-5 h-5" style={{ color: textColor }} />
        </button>
      </div>

      <div className="space-y-3">
        {hazards.map((hazard) => {
          const hazardGlow = hazard.enabled ? '0 0 15px rgba(255, 0, 64, 0.5)' : 'none';
          return (
            <button
              key={hazard.id}
              onClick={() => onToggleHazard(hazard.id)}
              className="w-full flex items-center justify-between p-3 rounded-lg transition-all border-2"
              style={{
                backgroundColor: hazard.enabled
                  ? 'rgba(255, 0, 64, 0.15)'
                  : isDark
                    ? 'rgba(31, 41, 55, 0.3)'
                    : 'rgba(226, 232, 240, 0.5)',
                borderColor: hazard.enabled ? 'rgba(255, 0, 64, 0.5)' : 'rgba(100, 116, 139, 0.3)',
                boxShadow: hazardGlow,
              }}
            >
              <div className="flex items-center gap-3">
                <div style={{ color: hazard.enabled ? '#ef4444' : textColor }}>{hazard.icon}</div>
                <span
                  className="text-sm"
                  style={{ color: hazard.enabled ? '#f87171' : textColor }}
                >
                  {hazard.label}
                </span>
              </div>
              <div
                className="w-10 h-6 rounded-full transition-all"
                style={{
                  backgroundColor: hazard.enabled ? '#ef4444' : '#64748b',
                }}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full mt-1 transition-transform ${
                    hazard.enabled ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>

      <div
        className="mt-4 p-3 border rounded-lg"
        style={{
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          borderColor: 'rgba(245, 158, 11, 0.3)',
        }}
      >
        <p className="text-xs" style={{ color: 'rgba(245, 158, 11, 0.8)' }}>
          Toggle hazards to visualize danger zones and pathfinding routes avoiding these areas
        </p>
      </div>
    </div>
  );
}

export const defaultHazards: HazardType[] = [
  {
    id: 'fire',
    type: 'fire',
    enabled: false,
    label: 'Fire Zones',
    icon: <Flame className="w-5 h-5" />,
    color: '#ff0040',
  },
  {
    id: 'flooded',
    type: 'flooded',
    enabled: false,
    label: 'Flooded Areas',
    icon: <Droplets className="w-5 h-5" />,
    color: '#0ea5e9',
  },
  {
    id: 'crowded',
    type: 'crowded',
    enabled: false,
    label: 'Crowded Zones',
    icon: <Users className="w-5 h-5" />,
    color: '#f59e0b',
  },
  {
    id: 'blocked-exit',
    type: 'blocked-exit',
    enabled: false,
    label: 'Blocked Exits',
    icon: <DoorOpen className="w-5 h-5" />,
    color: '#ff0040',
  },
  {
    id: 'broken-lift',
    type: 'broken-lift',
    enabled: false,
    label: 'Broken Lifts',
    icon: <CircuitBoard className="w-5 h-5" />,
    color: '#ff0040',
  },
  {
    id: 'broken-stairway',
    type: 'broken-stairway',
    enabled: false,
    label: 'Broken Stairways',
    icon: <AlertTriangle className="w-5 h-5" />,
    color: '#ff0040',
  },
];
