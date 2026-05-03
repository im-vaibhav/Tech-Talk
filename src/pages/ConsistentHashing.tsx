import { useEffect, useRef, useState } from "react";
import EpamLogo from "@/components/EpamLogo";
import SlideBackdrop from "@/components/SlideBackdrop";
import SlideNav from "@/components/SlideNav";

const ConsistentHashing = () => {
  const [phase, setPhase] = useState(0);
  const animationStarted = useRef(false);

  useEffect(() => {
    if (animationStarted.current) return;
    animationStarted.current = true;

    const timers = [
      setTimeout(() => setPhase(1), 2000),   // Ring + initial servers appear
      setTimeout(() => setPhase(2), 4500),   // Keys appear
      setTimeout(() => setPhase(3), 7000),   // Keys walk to servers slowly
      setTimeout(() => setPhase(4), 10000),  // Label: how it works
      setTimeout(() => setPhase(5), 13000),  // Remove server 1
      setTimeout(() => setPhase(6), 15500),  // Only key0 moves
      setTimeout(() => setPhase(7), 18000),  // Add server 4
      setTimeout(() => setPhase(8), 20500),  // Only key0 moves again
      setTimeout(() => setPhase(9), 23000),  // Success message
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const centerX = 280;
  const centerY = 280;
  const radius = 200;

  // Servers positioned like the book images
  const initialServers = [
    { id: "s0", angle: 90, label: "server 0", color: "#D8BFD8" },   // purple (top)
    { id: "s1", angle: 180, label: "server 1", color: "#87CEEB" },  // cyan (left)
    { id: "s2", angle: 270, label: "server 2", color: "#FF69B4" },  // pink (bottom)
    { id: "s3", angle: 340, label: "server 3", color: "#FFB347" },  // orange (right)
  ];

  // Keys positioned like book (key0, key1, key2, key3)
  const keys = [
    { id: "key0", angle: 60, label: "k0" },
    { id: "key1", angle: 120, label: "k1" },
    { id: "key2", angle: 240, label: "k2" },
    { id: "key3", angle: 310, label: "k3" },
  ];

  const getPosition = (angle: number, r: number = radius) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: centerX + r * Math.cos(rad),
      y: centerY + r * Math.sin(rad),
    };
  };

  const findNearestServer = (keyAngle: number, servers: typeof initialServers) => {
    let nearest = servers[0];
    let minDist = 360;

    servers.forEach(server => {
      let dist = (server.angle - keyAngle + 360) % 360;
      if (dist < minDist) {
        minDist = dist;
        nearest = server;
      }
    });

    return nearest;
  };

  // Calculate current server state based on phase
  const getCurrentServers = () => {
    if (phase >= 5 && phase < 7) {
      // Server 1 removed
      return initialServers.filter(s => s.id !== "s1");
    } else if (phase >= 7) {
      // Server 4 added (between s0 and s1 at 135 degrees)
      return [
        ...initialServers,
        { id: "s4", angle: 135, label: "server 4", color: "#90EE90" }
      ];
    }
    return initialServers;
  };

  const currentServers = getCurrentServers();

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-hero">
      <SlideBackdrop />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-10 py-8 lg:px-16 lg:py-10">
        
        {/* Header */}
        <header className="mb-6">
          <div
            className="mb-3 opacity-0"
            style={{ animation: "fade-in-smooth 0.6s 0.2s ease-out both" }}
          >
            <span className="rounded-full border border-[hsl(var(--teal-glow)/0.4)] bg-[hsl(var(--teal)/0.15)] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.3em] text-[hsl(var(--teal-glow))]">
              Scalability · Solution 2 of 2
            </span>
          </div>
          <h1
            className="text-4xl font-bold tracking-tight text-foreground opacity-0 lg:text-5xl"
            style={{ animation: "fade-in-smooth 0.7s 0.4s ease-out both" }}
          >
            <span className="text-gradient-teal">Consistent Hashing</span>
          </h1>
          <p
            className="mt-2 text-lg text-muted-foreground opacity-0 lg:text-xl"
            style={{ animation: "fade-in-smooth 0.7s 0.7s ease-out both" }}
          >
            Minimal key redistribution when servers change
          </p>
        </header>

        {/* Main Visual */}
        <section className="relative flex flex-1 items-center justify-center">
          <div className="flex items-start gap-12">
            
            {/* Left: Server List */}
            <div className="flex flex-col gap-3 pt-20">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Servers</p>
              {initialServers.map((server, idx) => {
                const isRemoved = phase >= 5 && phase < 7 && server.id === "s1";
                const isAdded = phase >= 7 && server.id === "s4";
                
                return (
                  <div
                    key={server.id}
                    className="flex items-center gap-2 transition-all duration-700"
                    style={{
                      opacity: isRemoved ? 0.2 : phase >= 1 ? 1 : 0,
                      animation: phase >= 1 ? `fade-in-smooth 0.6s ${0.5 + idx * 0.2}s ease-out both` : "none"
                    }}
                  >
                    <div
                      className="flex h-14 w-20 items-center justify-center rounded-lg border-2 shadow-md"
                      style={{
                        backgroundColor: server.color,
                        borderColor: server.color,
                        opacity: isRemoved ? 0.3 : 1,
                      }}
                    >
                      <span className="text-sm font-semibold text-gray-800">{server.label}</span>
                    </div>
                  </div>
                );
              })}
              
              {/* Server 4 (added) */}
              {phase >= 7 && (
                <div
                  className="flex items-center gap-2"
                  style={{ animation: "fade-scale-smooth 0.8s ease-out both" }}
                >
                  <div
                    className="flex h-14 w-20 items-center justify-center rounded-lg border-2 shadow-md"
                    style={{
                      backgroundColor: "#90EE90",
                      borderColor: "#90EE90",
                    }}
                  >
                    <span className="text-sm font-semibold text-gray-800">server 4</span>
                  </div>
                </div>
              )}
            </div>

            {/* Center: Hash Ring */}
            <div className="relative">
              <svg viewBox="0 0 560 560" className="h-[560px] w-[560px]">
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Ring */}
                {phase >= 1 && (
                  <circle
                    cx={centerX}
                    cy={centerY}
                    r={radius}
                    fill="none"
                    stroke="hsl(var(--teal-glow))"
                    strokeWidth="3"
                    opacity="0.5"
                    filter="url(#glow)"
                    style={{
                      strokeDasharray: 2 * Math.PI * radius,
                      strokeDashoffset: 2 * Math.PI * radius,
                      animation: "draw-ring 2s 0.5s ease-out both"
                    }}
                  />
                )}

                {/* Clockwise arrow */}
                {phase >= 1 && (
                  <g opacity="0" style={{ animation: "fade-in-smooth 0.5s 2.5s ease-out both" }}>
                    <path
                      d={`M ${centerX + radius + 25} ${centerY} Q ${centerX + radius + 35} ${centerY - 15} ${centerX + radius + 30} ${centerY - 30}`}
                      fill="none"
                      stroke="hsl(var(--teal-glow))"
                      strokeWidth="2"
                      opacity="0.6"
                    />
                    <polygon
                      points={`${centerX + radius + 30},${centerY - 30} ${centerX + radius + 27},${centerY - 23} ${centerX + radius + 33},${centerY - 25}`}
                      fill="hsl(var(--teal-glow))"
                      opacity="0.6"
                    />
                  </g>
                )}

                {/* Server nodes on ring */}
                {currentServers.map((server, idx) => {
                  const pos = getPosition(server.angle);
                  const isNew = phase >= 7 && server.id === "s4";
                  const isRemoved = phase >= 5 && phase < 7 && server.id === "s1";
                  
                  return (
                    <g
                      key={server.id}
                      style={{
                        opacity: isRemoved ? 0 : phase >= 1 ? 1 : 0,
                        animation: isNew 
                          ? "server-appear 1s ease-out both"
                          : phase >= 1
                          ? `fade-scale-smooth 0.8s ${1 + idx * 0.3}s ease-out both`
                          : "none",
                        transition: "opacity 1s ease-out"
                      }}
                    >
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="24"
                        fill={server.color}
                        stroke={server.color}
                        strokeWidth="3"
                        filter="url(#glow)"
                        style={{
                          animation: isNew ? "pulse-glow-smooth 3s 1s ease-in-out infinite" : "none"
                        }}
                      />
                      <text
                        x={pos.x}
                        y={pos.y + 5}
                        textAnchor="middle"
                        fill="#333"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        {server.id}
                      </text>
                      <text
                        x={pos.x}
                        y={pos.y + 42}
                        textAnchor="middle"
                        fill="hsl(var(--teal-glow))"
                        fontSize="10"
                        fontWeight="600"
                      >
                        {server.label}
                      </text>
                    </g>
                  );
                })}

                {/* Keys */}
                {phase >= 2 && keys.map((key, idx) => {
                  const keyPos = getPosition(key.angle);
                  const assignedServer = findNearestServer(key.angle, currentServers);
                  const serverPos = getPosition(assignedServer.angle);
                  
                  // key0 is affected by server removal and addition
                  const isMoving = (phase >= 6 && phase < 7 && key.id === "key0") || 
                                   (phase >= 8 && phase < 9 && key.id === "key0");
                  const shouldStay = phase >= 6 && key.id !== "key0";
                  
                  return (
                    <g
                      key={key.id}
                      style={{
                        opacity: 0,
                        animation: `fade-in-smooth 0.8s ${idx * 0.4}s ease-out both`
                      }}
                    >
                      {/* Connection line (slow draw) */}
                      {phase >= 3 && (
                        <line
                          x1={keyPos.x}
                          y1={keyPos.y}
                          x2={serverPos.x}
                          y2={serverPos.y}
                          stroke={assignedServer.color}
                          strokeWidth="2"
                          opacity="0.3"
                          strokeDasharray="4 3"
                          style={{
                            strokeDasharray: "300",
                            strokeDashoffset: "300",
                            animation: `draw-connection 2s ${1 + idx * 0.5}s ease-out both`,
                            transition: "all 1.5s ease-out"
                          }}
                        />
                      )}
                      
                      {/* Key dot */}
                      <circle
                        cx={keyPos.x}
                        cy={keyPos.y}
                        r={shouldStay ? "7" : "6"}
                        fill="white"
                        stroke="hsl(var(--teal-glow))"
                        strokeWidth="2"
                        opacity={shouldStay ? "1" : "0.9"}
                        style={{
                          animation: isMoving 
                            ? "key-move 1.5s ease-out both"
                            : shouldStay
                            ? "key-stay 0.8s 0.5s ease-out both"
                            : "none",
                          filter: shouldStay ? "drop-shadow(0 0 6px white)" : "none",
                          transition: "all 1.5s ease-out"
                        }}
                      />
                      
                      {/* Key label */}
                      <text
                        x={keyPos.x}
                        y={keyPos.y - 15}
                        textAnchor="middle"
                        fill="white"
                        fontSize="11"
                        fontWeight="700"
                        opacity="0.8"
                      >
                        {key.label}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Labels below ring */}
              <div className="mt-6 space-y-3 text-center">
                {phase >= 4 && phase < 5 && (
                  <p
                    className="text-sm font-medium text-muted-foreground opacity-0"
                    style={{ animation: "fade-in-smooth 0.8s ease-out both" }}
                  >
                    Keys map to the nearest server clockwise
                  </p>
                )}

                {phase >= 5 && phase < 7 && (
                  <div
                    className="opacity-0"
                    style={{ animation: "fade-in-smooth 0.8s ease-out both" }}
                  >
                    <p className="text-base font-bold text-[hsl(28_90%_60%)]">
                      Server 1 removed
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Only key0 needs redistribution
                    </p>
                  </div>
                )}

                {phase >= 7 && phase < 9 && (
                  <div
                    className="opacity-0"
                    style={{ animation: "fade-in-smooth 0.8s ease-out both" }}
                  >
                    <p className="text-base font-bold text-[hsl(var(--teal-glow))]">
                      Server 4 added
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Only key0 moves → minimal disruption
                    </p>
                  </div>
                )}

                {phase >= 9 && (
                  <div
                    className="opacity-0"
                    style={{ animation: "fade-in-smooth 0.8s ease-out both" }}
                  >
                    <div className="mx-auto max-w-lg rounded-lg border-2 border-[hsl(var(--teal-glow)/0.6)] bg-[hsl(var(--teal)/0.1)] px-6 py-3">
                      <p className="text-base font-bold text-[hsl(var(--teal-glow))]">
                        ✓ Only affected keys move. System stays stable.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Legend */}
            <div className="flex flex-col gap-3 pt-20">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Keys</p>
              {keys.map((key, idx) => (
                <div
                  key={key.id}
                  className="flex items-center gap-2"
                  style={{
                    opacity: phase >= 2 ? 1 : 0,
                    animation: phase >= 2 ? `fade-in-smooth 0.6s ${idx * 0.2}s ease-out both` : "none"
                  }}
                >
                  <div className="flex h-8 w-16 items-center justify-center rounded border border-[hsl(var(--teal-glow))] bg-card/30">
                    <span className="text-xs font-semibold text-foreground">{key.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Cards */}
        <section className="mt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div
              className="rounded-lg border-t-2 border-[hsl(28_90%_60%/0.7)] bg-card/30 p-4 backdrop-blur-sm opacity-0"
              style={{ animation: "slide-up-smooth 0.6s 24s ease-out both" }}
            >
              <h4 className="mb-2 flex items-center gap-2 text-base font-semibold text-foreground">
                <span className="text-[hsl(28_90%_60%)]">✕</span> hash(key) % N
              </h4>
              <p className="text-xs text-muted-foreground">
                Adding/removing ANY server → ALL keys reshuffled → cache storm
              </p>
            </div>

            <div
              className="rounded-lg border-t-2 border-[hsl(var(--teal-glow)/0.7)] bg-card/30 p-4 backdrop-blur-sm opacity-0"
              style={{ animation: "slide-up-smooth 0.6s 24.3s ease-out both" }}
            >
              <h4 className="mb-2 flex items-center gap-2 text-base font-semibold text-foreground">
                <span className="text-[hsl(var(--teal-glow))]">✓</span> Consistent Hashing
              </h4>
              <p className="text-xs text-muted-foreground">
                Adding/removing server → only nearby keys move → minimal impact
              </p>
            </div>
          </div>
        </section>

        {/* Bottom */}
        <div className="mt-3 flex items-end justify-end">
          <div
            className="opacity-0"
            style={{ animation: "fade-in-smooth 0.6s 25.3s ease-out both" }}
          >
            <EpamLogo />
          </div>
        </div>
      </div>

      <SlideNav prev="/load-balancing" next="/reliability" />
    </main>
  );
};

export default ConsistentHashing;
