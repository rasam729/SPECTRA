import React from 'react';
import { Navigation2 } from 'lucide-react';

interface DirectionDisplayProps {
  selectedGuestId?: string;
  nextMove?: string;
  isDark: boolean;
}

export function DirectionDisplay({ selectedGuestId, nextMove, isDark }: DirectionDisplayProps) {
  if (!selectedGuestId) return null;

  const bgColor = isDark ? 'rgba(15, 20, 35, 0.9)' : 'rgba(255, 255, 255, 0.95)';
  const borderColor = isDark ? 'rgba(16, 185, 129, 0.5)' : 'rgba(34, 197, 94, 0.5)';
  const textColor = isDark ? '#10b981' : '#16a34a';
  const glowColor = isDark ? '0 0 15px rgba(16, 185, 129, 0.5)' : 'none';

  return (
    <div
      className="absolute bottom-6 left-6 rounded-xl backdrop-blur-md border-2 px-6 py-4 flex items-center gap-4"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
        boxShadow: glowColor,
      }}
    >
      <Navigation2 className="w-6 h-6 animate-pulse" style={{ color: textColor }} />
      <div>
        <div className="text-xs" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>NEXT MOVE</div>
        <div className="mt-1" style={{ color: textColor }}>
          {nextMove || 'Calculating safest route...'}
        </div>
      </div>
    </div>
  );
}
