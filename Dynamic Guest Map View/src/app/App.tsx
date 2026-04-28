import FloorPlan from './components/FloorPlan';

export default function App() {
  return (
    <div className="size-full bg-slate-950 overflow-auto">
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Emergency Navigation System</h1>
          <p className="text-slate-400">
            Click anywhere on the floor plan to reposition guest. Toggle hazards to see real-time pathfinding reroute around obstacles.
          </p>
        </div>
        <FloorPlan />
      </div>
    </div>
  );
}