import React from 'react';
import { Circle, Square, Triangle } from 'lucide-react';

interface MapLegendProps {
  isDark: boolean;
}

export function MapLegend({ isDark }: MapLegendProps) {
  const bgColor = isDark ? 'rgba(15, 20, 35, 0.9)' : 'rgba(255, 255, 255, 0.95)';
  const borderColor = isDark ? 'rgba(100, 116, 139, 0.3)' : 'rgba(148, 163, 184, 0.3)';
  const textColor = isDark ? '#d1d5db' : '#475569';
  const primaryColor = isDark ? '#00ffff' : '#0ea5e9';

  return (
    <div
      className="absolute bottom-56 left-6 rounded-lg p-4 w-64 backdrop-blur-md border-2"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
      }}
    >
      <h3 className="text-sm mb-3 uppercase tracking-wider" style={{ color: primaryColor }}>
        Map Legend
      </h3>
      <div className="space-y-2 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-400 rounded-full" />
          <span style={{ color: textColor }}>Safe Guest</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <span style={{ color: textColor }}>Guest At Risk</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-cyan-400 rounded-full" />
          <span style={{ color: textColor }}>Response Team</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 border-2 border-green-500" />
          <span style={{ color: textColor }}>Safe Exit</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-red-500 border-2 border-red-500" />
          <span style={{ color: textColor }}>Blocked Exit</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-green-500 border-dashed" style={{ borderTop: '2px dashed #10b981' }} />
          <span style={{ color: textColor }}>Path to Safe Exit</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-cyan-400 border-dashed" style={{ borderTop: '2px dashed #22d3ee' }} />
          <span style={{ color: textColor }}>Path to Responder</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-red-500/30 border border-red-500 rounded-full" />
          <span style={{ color: textColor }}>Hazard Zone</span>
        </div>
      </div>
    </div>
  );
}
