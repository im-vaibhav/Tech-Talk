const nodes = [
  { id: 0, x: 150, y: 110, r: 7, healing: false },
  { id: 1, x: 320, y: 60, r: 5, healing: false },
  { id: 2, x: 500, y: 130, r: 9, healing: true }, // healing node
  { id: 3, x: 680, y: 50, r: 5, healing: false },
  { id: 4, x: 850, y: 120, r: 7, healing: false },
  { id: 5, x: 230, y: 230, r: 6, healing: false },
  { id: 6, x: 420, y: 260, r: 8, healing: false },
  { id: 7, x: 600, y: 240, r: 6, healing: false },
  { id: 8, x: 780, y: 270, r: 7, healing: false },
];

const edges: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 2], [6, 7],
  [7, 8], [8, 4], [2, 6], [1, 5], [3, 7],
];

const NetworkVisualization = () => {
  return (
    <svg
      viewBox="0 0 1000 320"
      className="w-full h-full anim-network"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="hsl(var(--teal))" stopOpacity="0.2" />
          <stop offset="50%" stopColor="hsl(var(--teal-glow))" stopOpacity="0.85" />
          <stop offset="100%" stopColor="hsl(var(--blue))" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="nodeGrad">
          <stop offset="0%" stopColor="hsl(var(--teal-glow))" />
          <stop offset="100%" stopColor="hsl(var(--blue))" />
        </radialGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Edges */}
      {edges.map(([a, b], i) => {
        const n1 = nodes[a], n2 = nodes[b];
        return (
          <line
            key={i}
            x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y}
            stroke="url(#edgeGrad)"
            strokeWidth="1.2"
            opacity="0.7"
          />
        );
      })}

      {/* Directional arrows on a few flow lines */}
      <g fill="hsl(var(--teal-glow))" opacity="0.8">
        <polygon points="0,-3 6,0 0,3" transform="translate(410,195) rotate(45)" />
        <polygon points="0,-3 6,0 0,3" transform="translate(640,150) rotate(-30)" />
      </g>

      {/* Nodes */}
      {nodes.map((n) => (
        <g key={n.id} filter="url(#glow)">
          {n.healing && (
            <>
              <circle
                cx={n.x} cy={n.y} r={n.r}
                fill="none"
                stroke="hsl(var(--teal-glow))"
                strokeWidth="1.5"
                style={{ transformOrigin: `${n.x}px ${n.y}px`, animation: 'ripple 2.6s ease-out infinite' }}
              />
              <circle
                cx={n.x} cy={n.y} r={n.r}
                fill="none"
                stroke="hsl(var(--teal-glow))"
                strokeWidth="1"
                style={{ transformOrigin: `${n.x}px ${n.y}px`, animation: 'ripple 2.6s 1.3s ease-out infinite' }}
              />
            </>
          )}
          <circle
            cx={n.x} cy={n.y} r={n.r}
            fill="url(#nodeGrad)"
            style={{ transformOrigin: `${n.x}px ${n.y}px`, animation: `pulse-node ${2.5 + (n.id % 3) * 0.6}s ${n.id * 0.2}s ease-in-out infinite` }}
          />
        </g>
      ))}

      {/* Heartbeat / data line */}
      <path
        d="M 0 300 L 200 300 L 220 300 L 235 280 L 250 320 L 265 270 L 280 310 L 300 300 L 1000 300"
        fill="none"
        stroke="hsl(var(--teal-glow))"
        strokeWidth="1.3"
        opacity="0.85"
        strokeDasharray="1200"
        strokeDashoffset="1200"
        className="anim-heartbeat"
        style={{ filter: 'drop-shadow(0 0 4px hsl(var(--teal-glow)))' }}
      />
    </svg>
  );
};

export default NetworkVisualization;
