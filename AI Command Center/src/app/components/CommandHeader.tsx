import React, { useState, useEffect } from 'react';
import { Radio, Clock, Wifi } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface CommandHeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export function CommandHeader({ isDark, onToggleTheme }: CommandHeaderProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const bgColor = isDark ? '#050810' : '#f8fafc';
  const borderColor = isDark ? 'rgba(0, 255, 255, 0.3)' : 'rgba(100, 116, 139, 0.3)';
  const primaryColor = isDark ? '#00ffff' : '#0ea5e9';
  const secondaryColor = isDark ? 'rgba(0, 255, 255, 0.6)' : 'rgba(14, 165, 233, 0.6)';
  const textColor = isDark ? '#ffffff' : '#1e293b';

  return (
    <div
      className="absolute top-0 left-0 right-0 z-20 h-16 backdrop-blur-sm border-b-2 flex items-center justify-between px-6"
      style={{
        backgroundColor: `${bgColor}e6`,
        borderColor: borderColor,
        color: textColor,
      }}
    >
      {/* Left: System Name */}
      <div className="flex items-center gap-3">
        <Radio className="w-6 h-6" style={{ color: primaryColor }} />
        <div>
          <h1 className="uppercase tracking-wider" style={{ color: primaryColor }}>
            SENTINEL-PULSE
          </h1>
          <p className="text-xs" style={{ color: secondaryColor }}>AI-Native Emergency Coordination</p>
        </div>
      </div>

      {/* Center: Status Indicators */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-green-400">ALL SYSTEMS OPERATIONAL</span>
        </div>
        <div className="flex items-center gap-2">
          <Wifi className="w-4 h-4" style={{ color: primaryColor }} />
          <span className="text-xs" style={{ color: primaryColor }}>CONNECTED</span>
        </div>
      </div>

      {/* Right: Time and Theme Toggle */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5" style={{ color: primaryColor }} />
          <div className="text-right">
            <div className="font-mono" style={{ color: primaryColor }}>
              {time.toLocaleTimeString('en-US', { hour12: false })}
            </div>
            <div className="text-xs" style={{ color: secondaryColor }}>
              {time.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        </div>
        <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
      </div>
    </div>
  );
}
