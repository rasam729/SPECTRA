import React, { useState } from 'react';
import { AlertTriangle, Lock } from 'lucide-react';
import { motion } from 'motion/react';

interface GlobalSOSButtonProps {
  onActivate: () => void;
  isDark: boolean;
}

export function GlobalSOSButton({ onActivate, isDark }: GlobalSOSButtonProps) {
  const [isArmed, setIsArmed] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const handleArm = () => {
    if (!isArmed) {
      setIsArmed(true);
    } else {
      // Start countdown
      let count = 3;
      setCountdown(count);
      const timer = setInterval(() => {
        count--;
        if (count === 0) {
          clearInterval(timer);
          setCountdown(null);
          setIsArmed(false);
          onActivate();
        } else {
          setCountdown(count);
        }
      }, 1000);
    }
  };

  const handleDisarm = () => {
    setIsArmed(false);
    setCountdown(null);
  };

  const sosGlow = '0 0 20px rgba(255, 0, 64, 0.6), 0 0 40px rgba(255, 0, 64, 0.4)';
  const bgColor = isDark ? 'rgba(15, 20, 35, 0.9)' : 'rgba(255, 255, 255, 0.95)';
  const borderColor = 'rgba(255, 0, 64, 0.6)';

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: countdown ? [1, 1.1, 1] : 1 }}
        transition={{ repeat: countdown ? Infinity : 0, duration: 0.5 }}
      >
        {!isArmed ? (
          <button
            onClick={handleArm}
            className="rounded-full w-32 h-32 flex flex-col items-center justify-center hover:scale-105 transition-all backdrop-blur-md border-4"
            style={{
              backgroundColor: bgColor,
              borderColor: borderColor,
              boxShadow: sosGlow,
            }}
          >
            <Lock className="w-10 h-10 text-red-500 mb-1" />
            <span className="uppercase tracking-wider text-red-500 text-sm">
              SOS
            </span>
            <span className="text-xs text-red-400/70">UNLOCK</span>
          </button>
        ) : (
          <div className="flex gap-4 items-center">
            <button
              onClick={handleDisarm}
              className="rounded-xl px-6 py-4 backdrop-blur-md border-2 hover:bg-cyan-500/20 transition-all"
              style={{
                backgroundColor: bgColor,
                borderColor: 'rgba(0, 255, 255, 0.4)',
                color: '#00ffff',
              }}
            >
              CANCEL
            </button>
            <button
              onClick={handleArm}
              className="rounded-full w-40 h-40 flex flex-col items-center justify-center hover:scale-105 transition-all backdrop-blur-md border-4"
              style={{
                backgroundColor: bgColor,
                borderColor: borderColor,
                boxShadow: sosGlow,
              }}
            >
              <AlertTriangle className="w-16 h-16 text-red-500 animate-pulse mb-2" />
              <span className="uppercase tracking-wider text-2xl text-red-500">
                {countdown ? countdown : 'SOS'}
              </span>
              <span className="text-xs text-red-400/70">
                {countdown ? 'SENDING...' : 'ACTIVATE'}
              </span>
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
