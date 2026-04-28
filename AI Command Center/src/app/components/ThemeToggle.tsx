import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300"
      style={{
        backgroundColor: isDark ? 'rgba(15, 20, 35, 0.8)' : 'rgba(240, 245, 250, 0.9)',
        borderColor: isDark ? 'rgba(0, 255, 255, 0.3)' : 'rgba(100, 116, 139, 0.3)',
        color: isDark ? '#00ffff' : '#1e293b',
      }}
    >
      {isDark ? (
        <>
          <Moon className="w-4 h-4" />
          <span className="text-xs">DARK</span>
        </>
      ) : (
        <>
          <Sun className="w-4 h-4" />
          <span className="text-xs">LIGHT</span>
        </>
      )}
    </button>
  );
}
