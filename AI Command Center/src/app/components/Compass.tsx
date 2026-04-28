import React from 'react';
import { Navigation } from 'lucide-react';

interface CompassProps {
  direction: number; // 0-360 degrees, 0 = North
  isDark: boolean;
}

export function Compass({ direction, isDark }: CompassProps) {
  const bgColor = isDark ? 'rgba(15, 20, 35, 0.9)' : 'rgba(255, 255, 255, 0.95)';
  const borderColor = isDark ? 'rgba(100, 116, 139, 0.3)' : 'rgba(148, 163, 184, 0.4)';
  const textColor = isDark ? '#94a3b8' : '#475569';
  const compassColor = isDark ? '#00ffff' : '#0ea5e9';

  return (
    <div
      className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full backdrop-blur-md border-2 flex flex-col items-center justify-center"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
      }}
    >
      <div className="text-xs mb-2" style={{ color: textColor }}>COMPASS</div>
      <div className="relative w-16 h-16">
        {/* Compass circle */}
        <div
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: compassColor + '40' }}
        />
        {/* Cardinal directions */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-xs" style={{ color: compassColor, position: 'absolute', top: '-2px' }}>N</div>
          <div className="text-xs" style={{ color: textColor, position: 'absolute', right: '-2px' }}>E</div>
          <div className="text-xs" style={{ color: textColor, position: 'absolute', bottom: '-2px' }}>S</div>
          <div className="text-xs" style={{ color: textColor, position: 'absolute', left: '-2px' }}>W</div>
        </div>
        {/* Rotating needle */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-500"
          style={{ transform: `rotate(${direction}deg)` }}
        >
          <Navigation className="w-8 h-8" style={{ color: compassColor }} fill={compassColor} />
        </div>
      </div>
      <div className="text-xs mt-2" style={{ color: textColor }}>{Math.round(direction)}°</div>
    </div>
  );
}
