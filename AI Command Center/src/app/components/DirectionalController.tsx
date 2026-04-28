import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface DirectionalControllerProps {
  onMove: (direction: 'forward' | 'back' | 'left' | 'right') => void;
  selectedGuestId?: string;
  isDark: boolean;
}

export function DirectionalController({ onMove, selectedGuestId, isDark }: DirectionalControllerProps) {
  if (!selectedGuestId) return null;

  const buttonColors = {
    forward: '#10b981', // Green
    back: '#f59e0b', // Amber
    left: '#3b82f6', // Blue
    right: '#8b5cf6', // Purple
  };

  const buttonClasses = (direction: keyof typeof buttonColors) => {
    const baseColor = buttonColors[direction];
    return `
      w-14 h-14 rounded-lg flex items-center justify-center transition-all duration-200
      hover:scale-105 active:scale-95
    `;
  };

  const bgColor = isDark ? 'rgba(15, 20, 35, 0.9)' : 'rgba(255, 255, 255, 0.95)';
  const borderColor = isDark ? 'rgba(100, 116, 139, 0.3)' : 'rgba(148, 163, 184, 0.4)';

  return (
    <div
      className="absolute bottom-24 left-6 rounded-xl backdrop-blur-md border-2 p-4"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
      }}
    >
      <div className="text-xs mb-3 text-center" style={{ color: isDark ? '#94a3b8' : '#475569' }}>
        GUEST MOVEMENT
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="col-start-2">
          <button
            onClick={() => onMove('forward')}
            className={buttonClasses('forward')}
            style={{ backgroundColor: buttonColors.forward }}
          >
            <ArrowUp className="w-6 h-6 text-white" />
          </button>
        </div>
        <button
          onClick={() => onMove('left')}
          className={buttonClasses('left')}
          style={{ backgroundColor: buttonColors.left, gridColumn: '1', gridRow: '2' }}
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={() => onMove('back')}
          className={buttonClasses('back')}
          style={{ backgroundColor: buttonColors.back, gridColumn: '2', gridRow: '2' }}
        >
          <ArrowDown className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={() => onMove('right')}
          className={buttonClasses('right')}
          style={{ backgroundColor: buttonColors.right, gridColumn: '3', gridRow: '2' }}
        >
          <ArrowRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
