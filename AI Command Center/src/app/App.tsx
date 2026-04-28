import React, { useState, useEffect } from 'react';
import { DigitalTwinMap } from './components/DigitalTwinMap';
import { GuestStatusSidebar, Guest } from './components/GuestStatusSidebar';
import { FloorSelector } from './components/FloorSelector';
import { GlobalSOSButton } from './components/GlobalSOSButton';
import { HazardOverlay, HazardType, defaultHazards } from './components/HazardOverlay';
import { CommandHeader } from './components/CommandHeader';
import { NotificationToast, Notification } from './components/NotificationToast';
import { MapLegend } from './components/MapLegend';
import { DirectionalController } from './components/DirectionalController';
import { Compass } from './components/Compass';
import { DirectionDisplay } from './components/DirectionDisplay';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { floorDataMap } from './data/floorData';
import '../styles/command-center.css';

export default function App() {
  const [currentFloor, setCurrentFloor] = useState(3);
  const [selectedGuestId, setSelectedGuestId] = useState<string>();
  const [hazards, setHazards] = useState<HazardType[]>(defaultHazards);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isDark, setIsDark] = useState(true);
  const [compassDirection, setCompassDirection] = useState(0);
  const [nextMove, setNextMove] = useState<string>('Move forward to safe exit');
  const [floorSelectorOpen, setFloorSelectorOpen] = useState(false);
  const [hazardOverlayOpen, setHazardOverlayOpen] = useState(false);
  const [guestPositions, setGuestPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [firebaseGuests, setFirebaseGuests] = useState<Guest[]>([]);
  const [firebaseHazards, setFirebaseHazards] = useState<any[]>([]);
  const [sosAlerts, setSosAlerts] = useState<any[]>([]);

  // Listen to Firebase guests collection
  useEffect(() => {
    const q = query(collection(db, 'guests'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const guestData: Guest[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        guestData.push({
          id: doc.id,
          name: data.name,
          room: data.room,
          floor: data.floor,
          location: data.location || { x: 200, y: 250 },
          status: data.status || 'unsafe',
          sosActive: data.sosActive || false,
          stealthMode: data.stealthMode || false,
        });
      });
      setFirebaseGuests(guestData);
      
      // Update guest positions from Firebase
      const positions: Record<string, { x: number; y: number }> = {};
      guestData.forEach((guest) => {
        positions[guest.id] = guest.location;
      });
      setGuestPositions(positions);
    });

    return () => unsubscribe();
  }, []);

  // Listen to Firebase hazards collection
  useEffect(() => {
    const q = query(collection(db, 'hazards'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const hazardData: any[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        hazardData.push(data);
        
        // Show notification for critical hazards on current floor
        if (data.floor === currentFloor && data.status === 'Critical') {
          addNotification(
            'error',
            `🚨 CRITICAL: ${data.sensorType} sensor on Floor ${data.floor} - Value: ${data.value}`
          );
        }
      });
      setFirebaseHazards(hazardData);
    });

    return () => unsubscribe();
  }, [currentFloor]);

  // Listen to SOS alerts
  useEffect(() => {
    const q = query(collection(db, 'sosAlerts'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const sosData: any[] = [];
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const data = change.doc.data();
          sosData.push(data);
          addNotification(
            'error',
            `🚨 SOS ALERT: ${data.guestName} in Room ${data.room}, Floor ${data.floor} needs immediate help!`
          );
        }
      });
      setSosAlerts(sosData);
    });

    return () => unsubscribe();
  }, []);

  // Initialize guest positions from floor data
  const currentGuests = floorDataMap[currentFloor]?.guests || [];

  // Get guests with updated positions - combine static floor data with Firebase data
  const guests: Guest[] = firebaseGuests
    .filter(guest => guest.floor === currentFloor)
    .map((guest) => ({
      ...guest,
      location: guestPositions[guest.id] || guest.location,
    }));

  const addNotification = (type: Notification['type'], message: string) => {
    const notification: Notification = {
      id: `notif-${Date.now()}`,
      type,
      message,
      timestamp: new Date(),
    };
    setNotifications((prev) => [...prev, notification]);
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleToggleHazard = (id: string) => {
    setHazards((prev) => {
      const updated = prev.map((h) => (h.id === id ? { ...h, enabled: !h.enabled } : h));
      const hazard = updated.find((h) => h.id === id);
      if (hazard) {
        addNotification(
          hazard.enabled ? 'warning' : 'info',
          `${hazard.label} ${hazard.enabled ? 'ACTIVATED' : 'DEACTIVATED'}`
        );
      }
      return updated;
    });
  };

  const handleSOSActivate = () => {
    addNotification('error', '🚨 GLOBAL SOS BROADCAST ACTIVATED - All response teams notified');
    // Show alert or trigger SOS broadcast
    alert('🚨 GLOBAL SOS BROADCAST ACTIVATED\n\nAll response teams and emergency services have been notified.\nEvacuation protocols initiated.');
  };

  const handleSelectGuest = (guestId: string) => {
    setSelectedGuestId(guestId === selectedGuestId ? undefined : guestId);
    if (guestId !== selectedGuestId) {
      const guest = guests.find((g) => g.id === guestId);
      if (guest) {
        addNotification('info', `Guest ${guest.name} selected - Room ${guest.room}`);
        // Calculate initial direction to nearest exit
        setCompassDirection(45);
        setNextMove('Move forward 20m toward Exit A');
      }
    } else {
      setNextMove('Select a guest to navigate');
    }
  };

  const handleMove = async (direction: 'forward' | 'back' | 'left' | 'right') => {
    if (!selectedGuestId) return;

    const directionMap = {
      forward: 0,
      right: 90,
      back: 180,
      left: 270,
    };
    setCompassDirection(directionMap[direction]);

    // Move guest on map
    const MOVE_DISTANCE = 25;
    setGuestPositions((prev) => {
      const currentPos = prev[selectedGuestId];
      if (!currentPos) return prev;

      let newX = currentPos.x;
      let newY = currentPos.y;

      switch (direction) {
        case 'forward':
          newY -= MOVE_DISTANCE;
          break;
        case 'back':
          newY += MOVE_DISTANCE;
          break;
        case 'left':
          newX -= MOVE_DISTANCE;
          break;
        case 'right':
          newX += MOVE_DISTANCE;
          break;
      }

      // Keep within bounds
      newX = Math.max(80, Math.min(720, newX));
      newY = Math.max(80, Math.min(520, newY));

      return {
        ...prev,
        [selectedGuestId]: { x: newX, y: newY },
      };
    });

    // Update Firebase with new position
    try {
      const { doc, updateDoc, serverTimestamp } = await import('firebase/firestore');
      await updateDoc(doc(db, 'guests', selectedGuestId), {
        location: guestPositions[selectedGuestId],
        lastUpdated: serverTimestamp(),
      });
    } catch (error) {
      console.error('Failed to update guest position in Firebase:', error);
    }

    const moves = [
      'Continue forward 15m toward Exit B',
      'Turn left and proceed 10m to stairwell',
      'Move right to avoid hazard zone',
      'Proceed straight to nearest responder team',
      'Good - Stay on evacuation path',
    ];
    setNextMove(moves[Math.floor(Math.random() * moves.length)]);
    addNotification('info', `Guest moving ${direction}`);
  };

  const handleToggleTheme = () => {
    setIsDark(!isDark);
    addNotification('info', `Theme changed to ${isDark ? 'light' : 'dark'} mode`);
  };

  const handleFloorChange = (floor: number) => {
    setCurrentFloor(floor);
    addNotification('info', `Switched to Floor ${floor}`);
  };

  return (
    <div
      className="w-screen h-screen flex overflow-hidden"
      style={{
        backgroundColor: isDark ? '#0a0e1a' : '#f1f5f9',
        color: isDark ? '#ffffff' : '#1e293b',
      }}
    >
      {/* Command Header */}
      <CommandHeader isDark={isDark} onToggleTheme={handleToggleTheme} />

      {/* Notifications */}
      <NotificationToast notifications={notifications} onDismiss={dismissNotification} />

      {/* Main Canvas Area */}
      <div className="flex-1 relative pt-16">
        <DigitalTwinMap
          floor={currentFloor}
          guests={guests}
          hazards={hazards}
          firebaseHazards={firebaseHazards}
          selectedGuestId={selectedGuestId}
          onGuestClick={handleSelectGuest}
          isDark={isDark}
        />

        {/* Floor Selector */}
        <FloorSelector
          currentFloor={currentFloor}
          totalFloors={8}
          onFloorChange={handleFloorChange}
          isDark={isDark}
          isOpen={floorSelectorOpen}
          onToggleOpen={() => setFloorSelectorOpen(!floorSelectorOpen)}
        />

        {/* Hazard Overlay Panel */}
        <HazardOverlay
          hazards={hazards}
          onToggleHazard={handleToggleHazard}
          isDark={isDark}
          isOpen={hazardOverlayOpen}
          onToggleOpen={() => setHazardOverlayOpen(!hazardOverlayOpen)}
        />

        {/* Map Legend */}
        <MapLegend isDark={isDark} />

        {/* Compass */}
        <Compass direction={compassDirection} isDark={isDark} />

        {/* Directional Controller */}
        <DirectionalController
          onMove={handleMove}
          selectedGuestId={selectedGuestId}
          isDark={isDark}
        />

        {/* Direction Display */}
        <DirectionDisplay
          selectedGuestId={selectedGuestId}
          nextMove={nextMove}
          isDark={isDark}
        />

        {/* Global SOS Button */}
        <GlobalSOSButton onActivate={handleSOSActivate} isDark={isDark} />
      </div>

      {/* Guest Status Sidebar */}
      <GuestStatusSidebar
        guests={guests}
        onSelectGuest={handleSelectGuest}
        selectedGuestId={selectedGuestId}
        isDark={isDark}
      />
    </div>
  );
}