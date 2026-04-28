export default function App() {
  return (
    <div className="size-full flex items-center justify-center bg-gray-950 p-8">
      <div className="relative w-full max-w-6xl aspect-[16/10] bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-800">
        {/* Floor Plan SVG */}
        <svg
          viewBox="0 0 1600 1000"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Grid Pattern */}
          <defs>
            <pattern id="gridPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="#0f172a" />
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
            </pattern>

            {/* Gradients */}
            <linearGradient id="roomGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            <linearGradient id="corridorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>

            <radialGradient id="blueGlow">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="greenGlow">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="fireGradient">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#dc2626" />
            </radialGradient>

            <radialGradient id="redGlow">
              <stop offset="0%" stopColor="#dc2626" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
            </radialGradient>

            {/* Filters for Glow Effects */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Chevron Arrow Pattern for Navigation */}
            <marker id="chevronBlue" markerWidth="12" markerHeight="12" refX="6" refY="6" orient="auto">
              <path d="M 1 3 L 6 6 L 1 9" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
            <marker id="chevronGreen" markerWidth="12" markerHeight="12" refX="6" refY="6" orient="auto">
              <path d="M 1 3 L 6 6 L 1 9" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </marker>

            {/* Pulsing Animation */}
            <style>
              {`
                @keyframes pulse {
                  0%, 100% { opacity: 0.8; }
                  50% { opacity: 0.3; }
                }
                .pulse-ring {
                  animation: pulse 2s ease-in-out infinite;
                }
                @keyframes pulse-core {
                  0%, 100% { opacity: 1; }
                  50% { opacity: 0.6; }
                }
                .pulse-core {
                  animation: pulse-core 2s ease-in-out infinite;
                }
                @keyframes dash {
                  to {
                    stroke-dashoffset: -40;
                  }
                }
                .animated-path {
                  animation: dash 1.5s linear infinite;
                }
              `}
            </style>
          </defs>

          {/* Floor Background */}
          <rect width="1600" height="1000" fill="url(#gridPattern)" />

          {/* Corridor Glow Effects */}
          <rect x="100" y="400" width="1400" height="200" fill="url(#blueGlow)" opacity="0.1" />
          <rect x="100" y="200" width="200" height="600" fill="url(#greenGlow)" opacity="0.1" />
          <rect x="1300" y="200" width="200" height="600" fill="url(#greenGlow)" opacity="0.1" />

          {/* Corridor - Main Horizontal */}
          <rect x="100" y="400" width="1400" height="200" fill="url(#corridorGradient)" stroke="#475569" strokeWidth="3" />
          <rect x="105" y="405" width="1390" height="190" fill="none" stroke="#64748b" strokeWidth="1" opacity="0.3" />

          {/* Corridor - Vertical Left */}
          <rect x="100" y="200" width="200" height="600" fill="url(#corridorGradient)" stroke="#475569" strokeWidth="3" />
          <rect x="105" y="205" width="190" height="590" fill="none" stroke="#64748b" strokeWidth="1" opacity="0.3" />

          {/* Corridor - Vertical Right */}
          <rect x="1300" y="200" width="200" height="600" fill="url(#corridorGradient)" stroke="#475569" strokeWidth="3" />
          <rect x="1305" y="205" width="190" height="590" fill="none" stroke="#64748b" strokeWidth="1" opacity="0.3" />

          {/* Hotel Rooms - Top Row */}
          <g>
            <rect x="400" y="100" width="180" height="180" fill="url(#roomGradient)" stroke="#475569" strokeWidth="3" />
            <rect x="405" y="105" width="170" height="170" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.2" />
          </g>
          <g>
            <rect x="620" y="100" width="180" height="180" fill="url(#roomGradient)" stroke="#475569" strokeWidth="3" />
            <rect x="625" y="105" width="170" height="170" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.2" />
          </g>
          <g>
            <rect x="840" y="100" width="180" height="180" fill="url(#roomGradient)" stroke="#475569" strokeWidth="3" />
            <rect x="845" y="105" width="170" height="170" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.2" />
          </g>
          <g>
            <rect x="1060" y="100" width="180" height="180" fill="url(#roomGradient)" stroke="#475569" strokeWidth="3" />
            <rect x="1065" y="105" width="170" height="170" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.2" />
          </g>

          {/* Hotel Rooms - Bottom Row */}
          <g>
            <rect x="400" y="720" width="180" height="180" fill="url(#roomGradient)" stroke="#475569" strokeWidth="3" />
            <rect x="405" y="725" width="170" height="170" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.2" />
          </g>
          <g>
            <rect x="620" y="720" width="180" height="180" fill="url(#roomGradient)" stroke="#475569" strokeWidth="3" />
            <rect x="625" y="725" width="170" height="170" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.2" />
          </g>
          <g>
            <rect x="840" y="720" width="180" height="180" fill="url(#roomGradient)" stroke="#475569" strokeWidth="3" />
            <rect x="845" y="725" width="170" height="170" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.2" />
          </g>
          <g>
            <rect x="1060" y="720" width="180" height="180" fill="url(#roomGradient)" stroke="#475569" strokeWidth="3" />
            <rect x="1065" y="725" width="170" height="170" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.2" />
          </g>

          {/* Elevator Shafts */}
          <g>
            <rect x="150" y="450" width="100" height="100" fill="#1e293b" stroke="#64748b" strokeWidth="3" />
            <rect x="155" y="455" width="90" height="90" fill="none" stroke="#475569" strokeWidth="1" />
            <path d="M 165 475 L 235 475 M 165 485 L 235 485 M 165 495 L 235 495 M 165 505 L 235 505 M 165 515 L 235 515 M 165 525 L 235 525" stroke="#64748b" strokeWidth="1.5" />
            <text x="200" y="470" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="600">ELEVATOR</text>
          </g>

          {/* Broken Elevator - HAZARD */}
          <g filter="url(#strongGlow)">
            {/* Danger zone radius */}
            <circle cx="1400" cy="500" r="70" fill="url(#redGlow)" opacity="0.15" />
            <circle cx="1400" cy="500" r="70" fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="8,4" opacity="0.5" />

            <rect x="1350" y="450" width="100" height="100" fill="#450a0a" stroke="#ef4444" strokeWidth="3" />
            <rect x="1355" y="455" width="90" height="90" fill="none" stroke="#dc2626" strokeWidth="2" />
            <path d="M 1365 475 L 1435 475 M 1365 485 L 1435 485 M 1365 495 L 1435 495 M 1365 505 L 1435 505 M 1365 515 L 1435 515 M 1365 525 L 1435 525" stroke="#991b1b" strokeWidth="1.5" />
            <text x="1400" y="470" textAnchor="middle" fill="#dc2626" fontSize="11" fontWeight="600">ELEVATOR</text>
            <rect x="1360" y="480" width="80" height="18" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" />
            <text x="1400" y="492" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="700">OUT OF SERVICE</text>
            {/* Warning Icon */}
            <circle cx="1400" cy="515" r="18" fill="#dc2626" opacity="0.8" />
            <text x="1400" y="523" textAnchor="middle" fill="#fef2f2" fontSize="20" fontWeight="bold">⚠</text>

            {/* Warning stripes */}
            <path d="M 1350 450 L 1370 450 L 1350 470 Z" fill="#fbbf24" opacity="0.7" />
            <path d="M 1430 540 L 1450 540 L 1450 560 Z" fill="#fbbf24" opacity="0.7" />

            {/* DO NOT USE sign */}
            <rect x="1365" y="410" width="70" height="24" rx="4" fill="#7f1d1d" stroke="#dc2626" strokeWidth="2" />
            <text x="1400" y="426" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="700">⛔ DO NOT USE</text>
          </g>

          {/* Stairs - Left */}
          <g>
            <rect x="150" y="300" width="100" height="80" fill="#1e293b" stroke="#64748b" strokeWidth="3" />
            <rect x="155" y="305" width="90" height="70" fill="none" stroke="#475569" strokeWidth="1" />
            <path d="M 160 315 L 240 315 M 160 325 L 240 325 M 160 335 L 240 335 M 160 345 L 240 345 M 160 355 L 240 355 M 160 365 L 240 365" stroke="#64748b" strokeWidth="2" />
            <text x="200" y="295" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="600">STAIRS</text>
          </g>

          {/* Stairs - Right */}
          <g>
            <rect x="1350" y="620" width="100" height="80" fill="#1e293b" stroke="#64748b" strokeWidth="3" />
            <rect x="1355" y="625" width="90" height="70" fill="none" stroke="#475569" strokeWidth="1" />
            <path d="M 1360 635 L 1440 635 M 1360 645 L 1440 645 M 1360 655 L 1440 655 M 1360 665 L 1440 665 M 1360 675 L 1440 675 M 1360 685 L 1440 685" stroke="#64748b" strokeWidth="2" />
            <text x="1400" y="615" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="600">STAIRS</text>
          </g>

          {/* Stairs - Center Bottom */}
          <g>
            <rect x="750" y="620" width="100" height="80" fill="#1e293b" stroke="#64748b" strokeWidth="3" />
            <rect x="755" y="625" width="90" height="70" fill="none" stroke="#475569" strokeWidth="1" />
            <path d="M 760 635 L 840 635 M 760 645 L 840 645 M 760 655 L 840 655 M 760 665 L 840 665 M 760 675 L 840 675 M 760 685 L 840 685" stroke="#64748b" strokeWidth="2" />
            <text x="800" y="615" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="600">STAIRS</text>
          </g>

          {/* Balconies */}
          <g>
            {/* Top Balcony */}
            <rect x="320" y="280" width="60" height="100" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
            <rect x="325" y="285" width="50" height="90" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="4,4" />
            <path d="M 330 290 L 370 290 M 330 310 L 370 310 M 330 330 L 370 330 M 330 350 L 370 350 M 330 370 L 370 370" stroke="#475569" strokeWidth="1" />
            <text x="350" y="270" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="600">BALCONY</text>
          </g>

          <g>
            {/* Bottom Balcony */}
            <rect x="320" y="620" width="60" height="100" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
            <rect x="325" y="625" width="50" height="90" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="4,4" />
            <path d="M 330 630 L 370 630 M 330 650 L 370 650 M 330 670 L 370 670 M 330 690 L 370 690 M 330 710 L 370 710" stroke="#475569" strokeWidth="1" />
            <text x="350" y="610" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="600">BALCONY</text>
          </g>

          <g>
            {/* Right Balcony */}
            <rect x="1220" y="620" width="60" height="100" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
            <rect x="1225" y="625" width="50" height="90" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="4,4" />
            <path d="M 1230 630 L 1270 630 M 1230 650 L 1270 650 M 1230 670 L 1270 670 M 1230 690 L 1270 690 M 1230 710 L 1270 710" stroke="#475569" strokeWidth="1" />
            <text x="1250" y="610" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="600">BALCONY</text>
          </g>

          {/* FIRE HAZARD ZONE */}
          <g filter="url(#strongGlow)">
            {/* Danger zone radius */}
            <circle cx="960" cy="500" r="80" fill="url(#redGlow)" opacity="0.2" />
            <circle cx="960" cy="500" r="80" fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="8,4" opacity="0.5" />

            <rect x="900" y="450" width="120" height="100" fill="#450a0a" stroke="#ef4444" strokeWidth="3" />
            <rect x="905" y="455" width="110" height="90" fill="url(#fireGradient)" opacity="0.5" />

            {/* Fire Animation Elements */}
            <circle className="pulse-core" cx="960" cy="480" r="15" fill="#ef4444" opacity="0.8" />
            <circle className="pulse-core" cx="945" cy="505" r="12" fill="#f97316" opacity="0.8" />
            <circle className="pulse-core" cx="975" cy="510" r="10" fill="#fb923c" opacity="0.8" />

            {/* Fire Icon */}
            <text x="960" y="495" textAnchor="middle" fill="#fef2f2" fontSize="32" opacity="0.9">🔥</text>

            <rect x="910" y="515" width="100" height="20" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" />
            <text x="960" y="529" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="700">FIRE HAZARD</text>

            {/* Warning stripes */}
            <path d="M 900 450 L 920 450 L 900 470 Z" fill="#fbbf24" opacity="0.7" />
            <path d="M 1000 450 L 1020 450 L 1020 470 Z" fill="#fbbf24" opacity="0.7" />

            {/* DO NOT ENTER sign */}
            <rect x="930" y="410" width="60" height="24" rx="4" fill="#7f1d1d" stroke="#dc2626" strokeWidth="2" />
            <text x="960" y="426" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="700">⛔ AVOID</text>
          </g>

          {/* BLOCKED EXIT */}
          <g filter="url(#strongGlow)">
            {/* Danger zone radius */}
            <circle cx="1400" cy="750" r="60" fill="url(#redGlow)" opacity="0.2" />
            <circle cx="1400" cy="750" r="60" fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="8,4" opacity="0.5" />

            <circle className="pulse-ring" cx="1400" cy="750" r="30" fill="#dc2626" opacity="0.4" />
            <circle cx="1400" cy="750" r="24" fill="#991b1b" stroke="#ef4444" strokeWidth="3" />
            <path d="M 1385 735 L 1415 765 M 1415 735 L 1385 765" stroke="#fca5a5" strokeWidth="4" strokeLinecap="round" />
            <circle cx="1400" cy="750" r="20" fill="none" stroke="#dc2626" strokeWidth="2" />
            <text x="1400" y="710" textAnchor="middle" fill="#dc2626" fontSize="11" fontWeight="700">BLOCKED EXIT</text>

            {/* Barrier icon */}
            <rect x="1380" y="770" width="40" height="8" fill="#dc2626" stroke="#ef4444" strokeWidth="1" />
            <rect x="1385" y="775" width="30" height="3" fill="#fbbf24" />

            {/* DO NOT ENTER sign */}
            <rect x="1360" y="785" width="80" height="20" rx="4" fill="#7f1d1d" stroke="#dc2626" strokeWidth="2" />
            <text x="1400" y="799" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="700">⛔ DO NOT ENTER</text>
          </g>

          {/* Dotted Navigation Path - Blue (Guest Route) with Glow - Avoids Fire Hazard, leads to E2 */}
          <path
            d="M 490 190 L 490 400 L 700 400 L 700 350 L 1100 350 L 1100 500 L 1300 500 L 1300 660 L 1400 660"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="8"
            strokeDasharray="12,8"
            opacity="0.3"
            filter="url(#strongGlow)"
          />
          <path
            className="animated-path"
            d="M 490 190 L 490 400 L 700 400 L 700 350 L 1100 350 L 1100 500 L 1300 500 L 1300 660 L 1400 660"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="5"
            strokeDasharray="12,8"
            markerMid="url(#chevronBlue)"
            markerEnd="url(#chevronBlue)"
            filter="url(#glow)"
          />

          {/* Chevron markers along blue path */}
          <path d="M 485 300 L 495 310 L 485 320" fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
          <path d="M 695 375 L 705 385 L 695 395" fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
          <path d="M 900 345 L 910 355 L 900 365" fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
          <path d="M 1095 425 L 1105 435 L 1095 445" fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
          <path d="M 1200 495 L 1210 505 L 1200 515" fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
          <path d="M 1295 580 L 1305 590 L 1295 600" fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />

          {/* Dotted Navigation Path - Green (Response Team Route) with Glow - Avoids Blocked Exit, leads to E3 */}
          <path
            d="M 200 320 L 200 500 L 500 500 L 500 600 L 800 600 L 800 660"
            fill="none"
            stroke="#10b981"
            strokeWidth="8"
            strokeDasharray="12,8"
            opacity="0.3"
            filter="url(#strongGlow)"
          />
          <path
            className="animated-path"
            d="M 200 320 L 200 500 L 500 500 L 500 600 L 800 600 L 800 660"
            fill="none"
            stroke="#10b981"
            strokeWidth="5"
            strokeDasharray="12,8"
            markerMid="url(#chevronGreen)"
            markerEnd="url(#chevronGreen)"
            filter="url(#glow)"
          />

          {/* Chevron markers along green path */}
          <path d="M 195 410 L 205 420 L 195 430" fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
          <path d="M 350 495 L 360 505 L 350 515" fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
          <path d="M 495 550 L 505 560 L 495 570" fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
          <path d="M 650 595 L 660 605 L 650 615" fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
          <path d="M 795 630 L 805 640 L 795 650" fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />

          {/* Safe Exit Waypoint Markers with Pulsing Effect */}
          {/* Exit 1 - Stairs Exit */}
          <g filter="url(#strongGlow)">
            <circle className="pulse-ring" cx="200" cy="250" r="30" fill="#10b981" opacity="0.4" />
            <circle className="pulse-ring" cx="200" cy="250" r="25" fill="#10b981" opacity="0.5" />
            <circle className="pulse-core" cx="200" cy="250" r="22" fill="#10b981" stroke="#22c55e" strokeWidth="2" />
            <circle cx="200" cy="250" r="16" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="200" y="257" textAnchor="middle" fill="#10b981" fontSize="14" fontWeight="bold">E1</text>
            <text x="200" y="225" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="600">SAFE EXIT</text>
          </g>

          {/* Exit 2 - Stairwell */}
          <g filter="url(#strongGlow)">
            <circle className="pulse-ring" cx="1400" cy="660" r="30" fill="#10b981" opacity="0.4" />
            <circle className="pulse-ring" cx="1400" cy="660" r="25" fill="#10b981" opacity="0.5" />
            <circle className="pulse-core" cx="1400" cy="660" r="22" fill="#10b981" stroke="#22c55e" strokeWidth="2" />
            <circle cx="1400" cy="660" r="16" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="1400" y="667" textAnchor="middle" fill="#10b981" fontSize="14" fontWeight="bold">E2</text>
            <text x="1400" y="635" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="600">SAFE EXIT</text>
          </g>

          {/* Exit 3 - Stairwell Bottom */}
          <g filter="url(#strongGlow)">
            <circle className="pulse-ring" cx="800" cy="660" r="30" fill="#10b981" opacity="0.4" />
            <circle className="pulse-ring" cx="800" cy="660" r="25" fill="#10b981" opacity="0.5" />
            <circle className="pulse-core" cx="800" cy="660" r="22" fill="#10b981" stroke="#22c55e" strokeWidth="2" />
            <circle cx="800" cy="660" r="16" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="800" y="667" textAnchor="middle" fill="#10b981" fontSize="14" fontWeight="bold">E3</text>
            <text x="800" y="635" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="600">SAFE EXIT</text>
          </g>

          {/* Exit 4 - Elevator Exit */}
          <g filter="url(#strongGlow)">
            <circle className="pulse-ring" cx="200" cy="580" r="30" fill="#10b981" opacity="0.4" />
            <circle className="pulse-ring" cx="200" cy="580" r="25" fill="#10b981" opacity="0.5" />
            <circle className="pulse-core" cx="200" cy="580" r="22" fill="#10b981" stroke="#22c55e" strokeWidth="2" />
            <circle cx="200" cy="580" r="16" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="200" y="587" textAnchor="middle" fill="#10b981" fontSize="14" fontWeight="bold">E4</text>
            <text x="200" y="555" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="600">SAFE EXIT</text>
          </g>

          {/* Guest Icon - Blue Dot */}
          <g filter="url(#strongGlow)">
            <circle cx="490" cy="190" r="28" fill="#3b82f6" opacity="0.4" />
            <circle cx="490" cy="190" r="24" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2" />
            <circle cx="490" cy="190" r="18" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
            <circle cx="490" cy="190" r="10" fill="#3b82f6" />
            <text x="490" y="160" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="700" letterSpacing="1">GUEST</text>
            <rect x="460" y="145" width="60" height="20" rx="4" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="490" y="159" textAnchor="middle" fill="#3b82f6" fontSize="13" fontWeight="700">GUEST</text>
          </g>

          {/* Response Team Icon - Green Triangle */}
          <g filter="url(#strongGlow)">
            <circle cx="200" cy="320" r="28" fill="#10b981" opacity="0.4" />
            <circle cx="200" cy="320" r="24" fill="#10b981" stroke="#22c55e" strokeWidth="2" />
            <circle cx="200" cy="320" r="18" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <path d="M 200 308 L 210 328 L 190 328 Z" fill="#10b981" />
            <rect x="155" y="285" width="90" height="20" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
            <text x="200" y="299" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="700">RESPONSE</text>
          </g>

          {/* Room Numbers */}
          <g>
            <text x="490" y="200" textAnchor="middle" fill="#3b82f6" fontSize="20" fontWeight="700" opacity="0.9">201</text>
            <text x="490" y="220" textAnchor="middle" fill="#94a3b8" fontSize="11">DELUXE</text>
          </g>
          <g>
            <text x="710" y="200" textAnchor="middle" fill="#3b82f6" fontSize="20" fontWeight="700" opacity="0.9">202</text>
            <text x="710" y="220" textAnchor="middle" fill="#94a3b8" fontSize="11">DELUXE</text>
          </g>
          <g>
            <text x="930" y="200" textAnchor="middle" fill="#3b82f6" fontSize="20" fontWeight="700" opacity="0.9">203</text>
            <text x="930" y="220" textAnchor="middle" fill="#94a3b8" fontSize="11">SUITE</text>
          </g>
          <g>
            <text x="1150" y="200" textAnchor="middle" fill="#3b82f6" fontSize="20" fontWeight="700" opacity="0.9">204</text>
            <text x="1150" y="220" textAnchor="middle" fill="#94a3b8" fontSize="11">DELUXE</text>
          </g>

          <g>
            <text x="490" y="820" textAnchor="middle" fill="#10b981" fontSize="20" fontWeight="700" opacity="0.9">205</text>
            <text x="490" y="840" textAnchor="middle" fill="#94a3b8" fontSize="11">STANDARD</text>
          </g>
          <g>
            <text x="710" y="820" textAnchor="middle" fill="#10b981" fontSize="20" fontWeight="700" opacity="0.9">206</text>
            <text x="710" y="840" textAnchor="middle" fill="#94a3b8" fontSize="11">STANDARD</text>
          </g>
          <g>
            <text x="930" y="820" textAnchor="middle" fill="#10b981" fontSize="20" fontWeight="700" opacity="0.9">207</text>
            <text x="930" y="840" textAnchor="middle" fill="#94a3b8" fontSize="11">SUITE</text>
          </g>
          <g>
            <text x="1150" y="820" textAnchor="middle" fill="#10b981" fontSize="20" fontWeight="700" opacity="0.9">208</text>
            <text x="1150" y="840" textAnchor="middle" fill="#94a3b8" fontSize="11">STANDARD</text>
          </g>

          {/* Decorative Corner Elements */}
          <g opacity="0.3">
            {/* Top Left Corner */}
            <path d="M 20 20 L 80 20 L 75 25 L 25 25 L 25 75 L 20 80 Z" fill="#3b82f6" />
            <path d="M 30 30 L 70 30 M 30 30 L 30 70" stroke="#3b82f6" strokeWidth="2" />

            {/* Top Right Corner */}
            <path d="M 1580 20 L 1520 20 L 1525 25 L 1575 25 L 1575 75 L 1580 80 Z" fill="#10b981" />
            <path d="M 1570 30 L 1530 30 M 1570 30 L 1570 70" stroke="#10b981" strokeWidth="2" />

            {/* Bottom Left Corner */}
            <path d="M 20 980 L 80 980 L 75 975 L 25 975 L 25 925 L 20 920 Z" fill="#10b981" />
            <path d="M 30 970 L 70 970 M 30 970 L 30 930" stroke="#10b981" strokeWidth="2" />

            {/* Bottom Right Corner */}
            <path d="M 1580 980 L 1520 980 L 1525 975 L 1575 975 L 1575 925 L 1580 920 Z" fill="#3b82f6" />
            <path d="M 1570 970 L 1530 970 M 1570 970 L 1570 930" stroke="#3b82f6" strokeWidth="2" />
          </g>
        </svg>

        {/* Title Header */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-orange-50 to-pink-100 rounded-xl shadow-2xl px-8 py-4 border-2 border-orange-200">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-pink-600 to-orange-600 tracking-wide">EMERGENCY EVACUATION MAP</h1>
            <p className="text-orange-800 text-sm mt-1 font-semibold">Level 2 - Active Hazards Detected</p>
          </div>
        </div>

        {/* Compass Overlay - Top Right */}
        <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-br from-orange-50 to-pink-100 rounded-full shadow-2xl flex items-center justify-center border-3 border-orange-200">
          <svg viewBox="0 0 100 100" className="w-28 h-28 relative z-10">
            <defs>
              <linearGradient id="compassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
              <filter id="compassGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Compass Circle */}
            <circle cx="50" cy="50" r="46" fill="none" stroke="#fb923c" strokeWidth="2" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#fdba74" strokeWidth="1" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="#fed7aa" strokeWidth="1" strokeDasharray="2,2" />

            {/* Degree Markers */}
            {Array.from({ length: 8 }, (_, i) => {
              const angle = (i * 45) * (Math.PI / 180);
              const x1 = 50 + 38 * Math.sin(angle);
              const y1 = 50 - 38 * Math.cos(angle);
              const x2 = 50 + 42 * Math.sin(angle);
              const y2 = 50 - 42 * Math.cos(angle);
              return `<line key="${i}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#fb923c" strokeWidth="1.5" />`;
            }).join('')}

            {/* North Arrow - Primary */}
            <path d="M 50 8 L 56 38 L 50 33 L 44 38 Z" fill="url(#compassGradient)" filter="url(#compassGlow)" />
            <path d="M 50 92 L 56 62 L 50 67 L 44 62 Z" fill="#fb923c" opacity="0.5" />

            {/* Cardinal Points */}
            <text x="50" y="10" textAnchor="middle" fill="#ea580c" fontSize="16" fontWeight="bold" filter="url(#compassGlow)">N</text>
            <text x="50" y="96" textAnchor="middle" fill="#c2410c" fontSize="13">S</text>
            <text x="93" y="55" textAnchor="middle" fill="#c2410c" fontSize="13">E</text>
            <text x="7" y="55" textAnchor="middle" fill="#c2410c" fontSize="13">W</text>

            {/* Center Dot */}
            <circle cx="50" cy="50" r="5" fill="#f97316" filter="url(#compassGlow)" />
            <circle cx="50" cy="50" r="3" fill="#fff7ed" />
          </svg>
        </div>

        {/* Status Panel */}
        <div className="absolute top-32 right-8 bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl shadow-2xl p-4 border-2 border-orange-200 min-w-[200px]">
          <div className="mb-2 pb-2 border-b border-orange-200">
            <h3 className="text-orange-800 font-bold tracking-wide text-xs">ACTIVE ALERTS</h3>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-600 font-semibold">Fire: Room 207</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-600 font-semibold">Exit Blocked: South</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-orange-600 font-semibold">Elevator: OOS</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-orange-200">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700 font-semibold">4 Safe Exits Active</span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-8 left-8 bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl shadow-2xl p-6 border-2 border-orange-200">
          <div className="mb-3 pb-3 border-b border-orange-200">
            <h3 className="text-orange-800 font-bold tracking-wide text-sm">LEGEND</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
                <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-25"></div>
                <div className="w-4 h-4 rounded-full bg-white border-2 border-blue-300"></div>
              </div>
              <div>
                <span className="text-blue-600 font-bold text-sm tracking-wide">GUEST</span>
                <p className="text-orange-600 text-xs">Current Position</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
                <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-25"></div>
                <div className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[11px] border-b-white"></div>
              </div>
              <div>
                <span className="text-green-600 font-bold text-sm tracking-wide">RESPONSE</span>
                <p className="text-orange-600 text-xs">Team Location</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
                <div className="absolute inset-0 bg-green-400 rounded-full animate-pulse opacity-30"></div>
                <span className="text-white text-sm font-bold">E</span>
              </div>
              <div>
                <span className="text-green-600 font-bold text-sm tracking-wide">SAFE EXIT</span>
                <p className="text-orange-600 text-xs">Emergency Route</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-10 h-10 rounded-full bg-red-500 flex items-center justify-center shadow-lg">
                <div className="absolute inset-0 bg-red-400 rounded-full animate-pulse opacity-40"></div>
                <span className="text-white text-sm font-bold">⚠</span>
              </div>
              <div>
                <span className="text-red-600 font-bold text-sm tracking-wide">HAZARD</span>
                <p className="text-orange-600 text-xs">Unsafe Zone</p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-12 h-1 bg-blue-500 rounded shadow-md shadow-blue-500/50"></div>
              <span className="text-orange-700 text-xs">Guest Path</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-1 bg-green-500 rounded shadow-md shadow-green-500/50"></div>
              <span className="text-orange-700 text-xs">Team Path</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
