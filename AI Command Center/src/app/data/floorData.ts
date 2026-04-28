import { Guest } from '../components/GuestStatusSidebar';

export interface FloorHazardLocation {
  x: number;
  y: number;
  radius: number;
  type: string;
}

export interface FloorData {
  guests: Guest[];
  hazardLocations: Record<string, FloorHazardLocation[]>;
}

export const floorDataMap: Record<number, FloorData> = {
  1: {
    guests: [
      { id: 'f1-g1', name: 'John Smith', room: '101', status: 'safe', distance: 'close', type: 'individual', location: { x: 150, y: 180 } },
      { id: 'f1-g2', name: 'Lobby Group', room: 'Lobby', status: 'safe', distance: 'close', type: 'group', groupSize: 6, ledBy: 'Staff Tom', location: { x: 400, y: 300 } },
      { id: 'f1-g3', name: 'Emma Wilson', room: '115', status: 'unsafe', distance: 'far', type: 'individual', location: { x: 600, y: 450 } },
    ],
    hazardLocations: {
      fire: [{ x: 200, y: 400, radius: 70, type: 'fire' }],
      flooded: [{ x: 500, y: 200, radius: 60, type: 'flooded' }],
      crowded: [{ x: 350, y: 350, radius: 50, type: 'crowded' }],
      'blocked-exit': [{ x: 100, y: 500, radius: 40, type: 'blocked-exit' }],
      'broken-lift': [{ x: 450, y: 150, radius: 35, type: 'broken-lift' }],
      'broken-stairway': [{ x: 650, y: 350, radius: 35, type: 'broken-stairway' }],
    },
  },
  2: {
    guests: [
      { id: 'f2-g1', name: 'Sarah Chen', room: '202', status: 'safe', distance: 'close', type: 'individual', location: { x: 250, y: 200 } },
      { id: 'f2-g2', name: 'James Rodriguez', room: '210', status: 'safe', distance: 'close', type: 'individual', location: { x: 180, y: 150 } },
      { id: 'f2-g3', name: 'Conference Room A', room: '220-225', status: 'unsafe', distance: 'far', type: 'group', groupSize: 10, ledBy: 'Staff Maria', location: { x: 550, y: 280 } },
      { id: 'f2-g4', name: 'Emily Park', room: '215', status: 'safe', distance: 'close', type: 'individual', location: { x: 320, y: 400 } },
    ],
    hazardLocations: {
      fire: [{ x: 450, y: 250, radius: 80, type: 'fire' }],
      flooded: [{ x: 250, y: 450, radius: 65, type: 'flooded' }],
      crowded: [{ x: 600, y: 150, radius: 55, type: 'crowded' }],
      'blocked-exit': [{ x: 700, y: 100, radius: 40, type: 'blocked-exit' }],
      'broken-lift': [{ x: 150, y: 300, radius: 35, type: 'broken-lift' }],
      'broken-stairway': [{ x: 500, y: 450, radius: 35, type: 'broken-stairway' }],
    },
  },
  3: {
    guests: [
      { id: 'f3-g1', name: 'Michael Zhang', room: '301', status: 'safe', distance: 'close', type: 'individual', location: { x: 200, y: 250 } },
      { id: 'f3-g2', name: 'Family Williams', room: '305', status: 'unsafe', distance: 'far', type: 'group', groupSize: 4, ledBy: 'Staff Lisa', location: { x: 350, y: 180 } },
      { id: 'f3-g3', name: 'Alex Thompson', room: '312', status: 'safe', distance: 'close', type: 'individual', location: { x: 480, y: 320 } },
      { id: 'f3-g4', name: 'Business Group', room: '318-320', status: 'unsafe', distance: 'far', type: 'group', groupSize: 8, ledBy: 'Staff John', location: { x: 600, y: 420 } },
    ],
    hazardLocations: {
      fire: [{ x: 300, y: 250, radius: 75, type: 'fire' }],
      flooded: [{ x: 550, y: 180, radius: 60, type: 'flooded' }],
      crowded: [{ x: 200, y: 450, radius: 50, type: 'crowded' }],
      'blocked-exit': [{ x: 700, y: 500, radius: 40, type: 'blocked-exit' }],
      'broken-lift': [{ x: 400, y: 400, radius: 35, type: 'broken-lift' }],
      'broken-stairway': [{ x: 150, y: 180, radius: 35, type: 'broken-stairway' }],
    },
  },
  4: {
    guests: [
      { id: 'f4-g1', name: 'David Lee', room: '401', status: 'safe', distance: 'close', type: 'individual', location: { x: 180, y: 200 } },
      { id: 'f4-g2', name: 'Seminar Group', room: '410-415', status: 'unsafe', distance: 'far', type: 'group', groupSize: 15, ledBy: 'Staff Rachel', location: { x: 450, y: 250 } },
      { id: 'f4-g3', name: 'Nina Patel', room: '420', status: 'safe', distance: 'close', type: 'individual', location: { x: 600, y: 380 } },
    ],
    hazardLocations: {
      fire: [{ x: 380, y: 350, radius: 85, type: 'fire' }],
      flooded: [{ x: 180, y: 420, radius: 70, type: 'flooded' }],
      crowded: [{ x: 520, y: 180, radius: 60, type: 'crowded' }],
      'blocked-exit': [{ x: 100, y: 100, radius: 40, type: 'blocked-exit' }],
      'broken-lift': [{ x: 650, y: 280, radius: 35, type: 'broken-lift' }],
      'broken-stairway': [{ x: 300, y: 150, radius: 35, type: 'broken-stairway' }],
    },
  },
  5: {
    guests: [
      { id: 'f5-g1', name: 'Sophie Martin', room: '501', status: 'safe', distance: 'close', type: 'individual', location: { x: 220, y: 180 } },
      { id: 'f5-g2', name: 'Tour Group Alpha', room: '510', status: 'unsafe', distance: 'far', type: 'group', groupSize: 12, ledBy: 'Staff Kevin', location: { x: 380, y: 320 } },
      { id: 'f5-g3', name: 'Robert Kim', room: '518', status: 'safe', distance: 'close', type: 'individual', location: { x: 550, y: 200 } },
      { id: 'f5-g4', name: 'Wedding Party', room: '520-525', status: 'unsafe', distance: 'far', type: 'group', groupSize: 18, ledBy: 'Staff Anna', location: { x: 320, y: 450 } },
    ],
    hazardLocations: {
      fire: [{ x: 500, y: 380, radius: 90, type: 'fire' }],
      flooded: [{ x: 280, y: 250, radius: 65, type: 'flooded' }],
      crowded: [{ x: 600, y: 200, radius: 55, type: 'crowded' }],
      'blocked-exit': [{ x: 700, y: 450, radius: 40, type: 'blocked-exit' }],
      'broken-lift': [{ x: 200, y: 400, radius: 35, type: 'broken-lift' }],
      'broken-stairway': [{ x: 450, y: 150, radius: 35, type: 'broken-stairway' }],
    },
  },
  6: {
    guests: [
      { id: 'f6-g1', name: 'Lisa Anderson', room: '601', status: 'safe', distance: 'close', type: 'individual', location: { x: 250, y: 220 } },
      { id: 'f6-g2', name: 'Corporate Group', room: '610-615', status: 'unsafe', distance: 'far', type: 'group', groupSize: 14, ledBy: 'Staff Mike', location: { x: 480, y: 280 } },
      { id: 'f6-g3', name: 'Chris Brown', room: '620', status: 'safe', distance: 'close', type: 'individual', location: { x: 350, y: 400 } },
    ],
    hazardLocations: {
      fire: [{ x: 420, y: 200, radius: 75, type: 'fire' }],
      flooded: [{ x: 600, y: 350, radius: 70, type: 'flooded' }],
      crowded: [{ x: 250, y: 380, radius: 50, type: 'crowded' }],
      'blocked-exit': [{ x: 100, y: 150, radius: 40, type: 'blocked-exit' }],
      'broken-lift': [{ x: 550, y: 480, radius: 35, type: 'broken-lift' }],
      'broken-stairway': [{ x: 350, y: 250, radius: 35, type: 'broken-stairway' }],
    },
  },
  7: {
    guests: [
      { id: 'f7-g1', name: 'Daniel White', room: '701', status: 'safe', distance: 'close', type: 'individual', location: { x: 180, y: 250 } },
      { id: 'f7-g2', name: 'VIP Suite Guests', room: '710-712', status: 'unsafe', distance: 'far', type: 'group', groupSize: 6, ledBy: 'Staff Sarah', location: { x: 500, y: 320 } },
      { id: 'f7-g3', name: 'Jessica Taylor', room: '715', status: 'safe', distance: 'close', type: 'individual', location: { x: 300, y: 180 } },
      { id: 'f7-g4', name: 'Event Group B', room: '720-725', status: 'unsafe', distance: 'far', type: 'group', groupSize: 20, ledBy: 'Staff David', location: { x: 420, y: 450 } },
    ],
    hazardLocations: {
      fire: [{ x: 350, y: 300, radius: 80, type: 'fire' }],
      flooded: [{ x: 550, y: 450, radius: 65, type: 'flooded' }],
      crowded: [{ x: 200, y: 200, radius: 55, type: 'crowded' }],
      'blocked-exit': [{ x: 650, y: 180, radius: 40, type: 'blocked-exit' }],
      'broken-lift': [{ x: 280, y: 420, radius: 35, type: 'broken-lift' }],
      'broken-stairway': [{ x: 580, y: 250, radius: 35, type: 'broken-stairway' }],
    },
  },
  8: {
    guests: [
      { id: 'f8-g1', name: 'Penthouse Suite A', room: '801', status: 'safe', distance: 'close', type: 'group', groupSize: 3, ledBy: 'Private Staff', location: { x: 300, y: 250 } },
      { id: 'f8-g2', name: 'Penthouse Suite B', room: '805', status: 'unsafe', distance: 'far', type: 'group', groupSize: 5, ledBy: 'Private Staff', location: { x: 500, y: 350 } },
      { id: 'f8-g3', name: 'Rooftop Event', room: 'Terrace', status: 'unsafe', distance: 'far', type: 'group', groupSize: 25, ledBy: 'Staff Manager', location: { x: 400, y: 200 } },
    ],
    hazardLocations: {
      fire: [{ x: 450, y: 280, radius: 70, type: 'fire' }],
      flooded: [{ x: 250, y: 350, radius: 60, type: 'flooded' }],
      crowded: [{ x: 550, y: 200, radius: 65, type: 'crowded' }],
      'blocked-exit': [{ x: 700, y: 350, radius: 40, type: 'blocked-exit' }],
      'broken-lift': [{ x: 350, y: 450, radius: 35, type: 'broken-lift' }],
      'broken-stairway': [{ x: 180, y: 200, radius: 35, type: 'broken-stairway' }],
    },
  },
};
