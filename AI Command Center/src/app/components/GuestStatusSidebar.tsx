import React from 'react';
import { User, Users, Shield, Navigation, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export interface Guest {
  id: string;
  name: string;
  room: string;
  status: 'safe' | 'unsafe';
  distance: 'close' | 'far';
  type: 'individual' | 'group';
  groupSize?: number;
  ledBy?: string;
  location: { x: number; y: number };
}

interface GuestStatusSidebarProps {
  guests: Guest[];
  onSelectGuest: (guestId: string) => void;
  selectedGuestId?: string;
  isDark: boolean;
}

export function GuestStatusSidebar({ guests, onSelectGuest, selectedGuestId, isDark }: GuestStatusSidebarProps) {
  const safeCount = guests.filter((g) => g.status === 'safe').length;
  const unsafeCount = guests.filter((g) => g.status === 'unsafe').length;
  const totalGuests = guests.reduce((acc, g) => acc + (g.type === 'group' ? (g.groupSize || 1) : 1), 0);

  const bgColor = isDark ? '#050810' : '#f8fafc';
  const borderColor = isDark ? 'rgba(0, 255, 255, 0.3)' : 'rgba(100, 116, 139, 0.3)';
  const primaryColor = isDark ? '#00ffff' : '#0ea5e9';
  const secondaryColor = isDark ? 'rgba(0, 255, 255, 0.6)' : 'rgba(14, 165, 233, 0.6)';
  const cardBg = isDark ? 'rgba(15, 20, 35, 0.8)' : 'rgba(255, 255, 255, 0.8)';

  return (
    <div
      className="w-96 h-full border-l-2 flex flex-col"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
      }}
    >
      {/* Header */}
      <div className="p-4 border-b" style={{ borderColor: borderColor }}>
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6" style={{ color: primaryColor }} />
          <div className="flex-1">
            <h2 className="uppercase tracking-wider" style={{ color: primaryColor }}>INTERCONNECT</h2>
            <p className="text-xs" style={{ color: secondaryColor }}>{totalGuests} Total Guests</p>
          </div>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div
            className="rounded-lg p-3 border-2"
            style={{
              backgroundColor: cardBg,
              borderColor: 'rgba(0, 255, 255, 0.3)',
            }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-xs" style={{ color: primaryColor }}>SAFE</span>
            </div>
            <div className="text-2xl text-green-400 mt-1">{safeCount}</div>
          </div>
          <div
            className="rounded-lg p-3 border-2"
            style={{
              backgroundColor: cardBg,
              borderColor: 'rgba(255, 0, 64, 0.3)',
            }}
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-xs text-red-400">AT RISK</span>
            </div>
            <div className="text-2xl text-red-400 mt-1">{unsafeCount}</div>
          </div>
        </div>
      </div>

      {/* Guest Cards */}
      <div className="flex-1 overflow-y-auto tactical-scrollbar p-4 space-y-3">
        {guests.map((guest, index) => {
          const isSelected = selectedGuestId === guest.id;
          const guestBorderColor = isSelected
            ? primaryColor
            : guest.status === 'safe'
              ? 'rgba(34, 197, 94, 0.3)'
              : 'rgba(239, 68, 68, 0.3)';
          const guestBg = isDark ? 'rgba(31, 41, 55, 0.5)' : 'rgba(241, 245, 249, 0.8)';

          return (
            <motion.button
              key={guest.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelectGuest(guest.id)}
              className="w-full text-left p-4 rounded-lg transition-all border-2"
              style={{
                backgroundColor: isSelected ? `${primaryColor}15` : guestBg,
                borderColor: guestBorderColor,
              }}
            >
              {/* Guest Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {guest.type === 'group' ? (
                    <Users className={`w-5 h-5 ${guest.status === 'safe' ? 'text-green-400' : 'text-red-400'}`} />
                  ) : (
                    <User className={`w-5 h-5 ${guest.status === 'safe' ? 'text-green-400' : 'text-red-400'}`} />
                  )}
                  <div>
                    <div className={`${guest.status === 'safe' ? 'text-green-300' : 'text-red-300'}`}>
                      {guest.name}
                    </div>
                    <div className="text-xs" style={{ color: isDark ? '#6b7280' : '#94a3b8' }}>
                      Room {guest.room}
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div
                  className={`px-2 py-1 rounded text-xs uppercase tracking-wider ${
                    guest.status === 'safe'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                      : 'bg-red-500/20 text-red-400 border border-red-500/50'
                  }`}
                >
                  {guest.status}
                </div>
              </div>

              {/* Guest Details */}
              <div className="space-y-2 text-xs">
                {guest.type === 'group' && (
                  <div className="flex items-center gap-2" style={{ color: primaryColor }}>
                    <Users className="w-3 h-3" />
                    <span>Group of {guest.groupSize}</span>
                  </div>
                )}

                {guest.ledBy && (
                  <div className="flex items-center gap-2" style={{ color: primaryColor }}>
                    <Shield className="w-3 h-3" />
                    <span>Led by {guest.ledBy}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Navigation className={`w-3 h-3 ${guest.distance === 'close' ? 'text-cyan-400' : 'text-amber-400'}`} />
                  <span className={guest.distance === 'close' ? 'text-cyan-400' : 'text-amber-400'}>
                    {guest.distance === 'close' ? 'Close to response team' : 'Far from response team'}
                  </span>
                </div>
              </div>

              {/* Scan Effect */}
              {selectedGuestId === guest.id && (
                <motion.div
                  className="mt-3 h-1"
                  style={{
                    background: `linear-gradient(to right, transparent, ${primaryColor}, transparent)`,
                  }}
                  animate={{ x: [-100, 100] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}