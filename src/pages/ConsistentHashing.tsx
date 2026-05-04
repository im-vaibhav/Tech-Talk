import { useEffect, useRef, useState, useCallback } from "react";
import EpamLogo from "@/components/EpamLogo";
import SlideBackdrop from "@/components/SlideBackdrop";
import SlideNav from "@/components/SlideNav";

const ConsistentHashing = () => {
  const [phase, setPhase] = useState(0);
  const [replayMode, setReplayMode] = useState<"none" | "add" | "remove">("none");
  const [replayPhase, setReplayPhase] = useState(0);
  const [replayKey, setReplayKey] = useState(0);
  const animationStarted = useRef(false);
  const replayTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Initial auto-animation
  useEffect(() => {
    if (animationStarted.current) return;
    animationStarted.current = true;

    const timers = [
      setTimeout(() => setPhase(1), 2500),   // Ring draws
      setTimeout(() => setPhase(2), 6000),   // 3 servers appear
      setTimeout(() => setPhase(3), 10000),  // Keys appear
      setTimeout(() => setPhase(4), 14000),  // Keys connect to servers (clockwise assignment)
      setTimeout(() => setPhase(5), 18500),  // Add Server 4 + show rebalance
      setTimeout(() => setPhase(6), 24000),  // Remove Server 2 + show rebalance
      setTimeout(() => setPhase(7), 29500),  // Final state + buttons appear
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // Replay logic
  const clearReplayTimers = () => {
    replayTimers.current.forEach(clearTimeout);
    replayTimers.current = [];
  };

  const handleReplayAdd = useCallback(() => {
    clearReplayTimers();
    setReplayMode("add");
    setReplayPhase(0);
    setReplayKey(k => k + 1);

    const timers = [
      setTimeout(() => setReplayPhase(1), 800),    // Show ring + 3 servers + keys connected
      setTimeout(() => setReplayPhase(2), 4000),   // Add Server 4
      setTimeout(() => setReplayPhase(3), 7000),   // Show which keys moved
      setTimeout(() => setReplayPhase(4), 11000),  // Done - show summary
    ];
    replayTimers.current = timers;
  }, []);

  const handleReplayRemove = useCallback(() => {
    clearReplayTimers();
    setReplayMode("remove");
    setReplayPhase(0);
    setReplayKey(k => k + 1);

    const timers = [
      setTimeout(() => setReplayPhase(1), 800),    // Show ring + 3 servers + keys connected
      setTimeout(() => setReplayPhase(2), 4000),   // Remove Server 2
      setTimeout(() => setReplayPhase(3), 7000),   // Show which keys moved
      setTimeout(() => setReplayPhase(4), 11000),  // Done - show summary
    ];
    replayTimers.current = timers;
  }, []);

  useEffect(() => {
    return () => clearReplayTimers();
  }, []);

  const centerX = 250;
  const centerY = 230;
  const radius = 150;

  // 3 initial servers (matching the LB slide)
  const serverData = [
    { id: "s1", angle: 60, label: "Server 1", color: "#87CEEB" },
    { id: "s2", angle: 180, label: "Server 2", color: "#FF69B4" },
    { id: "s3", angle: 300, label: "Server 3", color: "#FFB347" },
  ];

  const server4 = { id: "s4", angle: 120, label: "Server 4", color: "#90EE90" };

  const keyData = [
    { id: "k1", angle: 30, label: "k1" },
    { id: "k2", angle: 100, label: "k2" },
    { id: "k3", angle: 150, label: "k3" },
    { id: "k4", angle: 230, label: "k4" },
    { id: "k5", angle: 330, label: "k5" },
  ];

  const getPosition = (angle: number, r: number = radius) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: centerX + r * Math.cos(rad),
      y: centerY + r * Math.sin(rad),
    };
  };

  const findNearestCW = (keyAngle: number, servers: { id: string; angle: number; color: string }[]) => {
    let nearest = servers[0];
    let minDist = 360;
    for (const s of servers) {
      const dist = (s.angle - keyAngle + 360) % 360;
      if (dist < minDist) {
        minDist = dist;
        nearest = s;
      }
    }
    return nearest;
  };

  // ─── MAIN ANIMATION: determine visible state ───
  const getMainState = () => {
    // Which servers are visible
    let visibleServers = [...serverData];
    let showS4 = false;
    let s2Removed = false;

    if (phase >= 6) {
      s2Removed = true;
      visibleServers = serverData.filter(s => s.id !== "s2");
    }
    if (phase >= 5) {
      showS4 = true;
    }

    const activeServers = s2Removed
      ? [...visibleServers, ...(showS4 ? [server4] : [])]
      : [...visibleServers, ...(showS4 ? [server4] : [])];

    // Which keys moved (compared to base 3 servers)
    let movedKeys: string[] = [];
    if (phase === 5) {
      // Just added S4: compare 3-server vs 4-server
      movedKeys = keyData.filter(k => {
        const before = findNearestCW(k.angle, serverData);
        const after = findNearestCW(k.angle, [...serverData, server4]);
        return before.id !== after.id;
      }).map(k => k.id);
    } else if (phase >= 6) {
      // Removed S2: compare 4-server vs 3-server-without-s2
      const withS4 = [...serverData, server4];
      const withoutS2 = [...serverData.filter(s => s.id !== "s2"), server4];
      movedKeys = keyData.filter(k => {
        const before = findNearestCW(k.angle, withS4);
        const after = findNearestCW(k.angle, withoutS2);
        return before.id !== after.id;
      }).map(k => k.id);
    }

    return { visibleServers, showS4, s2Removed, activeServers, movedKeys };
  };

  // ─── REPLAY MODE: determine visible state ───
  const getReplayState = () => {
    let visibleServers = [...serverData];
    let showS4 = false;
    let s2Removed = false;
    let activeServers = [...serverData];
    let movedKeys: string[] = [];

    if (replayMode === "add") {
      if (replayPhase >= 2) showS4 = true;
      activeServers = showS4 ? [...serverData, server4] : [...serverData];

      if (replayPhase >= 3) {
        movedKeys = keyData.filter(k => {
          const before = findNearestCW(k.angle, serverData);
          const after = findNearestCW(k.angle, [...serverData, server4]);
          return before.id !== after.id;
        }).map(k => k.id);
      }
    } else if (replayMode === "remove") {
      if (replayPhase >= 2) s2Removed = true;
      visibleServers = s2Removed ? serverData.filter(s => s.id !== "s2") : [...serverData];
      activeServers = s2Removed ? serverData.filter(s => s.id !== "s2") : [...serverData];

      if (replayPhase >= 3) {
        movedKeys = keyData.filter(k => {
          const before = findNearestCW(k.angle, serverData);
          const after = findNearestCW(k.angle, serverData.filter(s => s.id !== "s2"));
          return before.id !== after.id;
        }).map(k => k.id);
      }
    }

    return { visibleServers, showS4, s2Removed, activeServers, movedKeys };
  };

  // Decide which state to render
  const isReplaying = replayMode !== "none" && phase >= 7;
  const state = isReplaying ? getReplayState() : getMainState();
  const showRing = isReplaying ? replayPhase >= 1 : phase >= 1;
  const showServers = isReplaying ? replayPhase >= 1 : phase >= 2;
  const showKeys = isReplaying ? replayPhase >= 1 : phase >= 3;
  const showConnections = isReplaying ? replayPhase >= 1 : phase >= 4;
  const showButtons = phase >= 7;

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-hero">
      <SlideBackdrop />

      <style>{`
        @keyframes ring-draw {
          from { stroke-dashoffset: 944; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes node-pop {
          0% { opacity: 0; transform: scale(0); }
          70% { transform: scale(1.12); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes connection-draw {
          from { stroke-dashoffset: 200; opacity: 0.3; }
          to { stroke-dashoffset: 0; opacity: 0.45; }
        }
        @keyframes key-glow-moved {
          0%, 100% { filter: drop-shadow(0 0 4px hsl(28, 90%, 55%)); }
          50% { filter: drop-shadow(0 0 14px hsl(28, 90%, 55%)); }
        }
        @keyframes key-glow-stay {
          0% { filter: drop-shadow(0 0 0px white); }
          50% { filter: drop-shadow(0 0 8px white); }
          100% { filter: drop-shadow(0 0 2px white); }
        }
        @keyframes server-remove {
          0% { opacity: 1; transform: scale(1); }
          40% { opacity: 0.6; transform: scale(0.8); }
          100% { opacity: 0; transform: scale(0.2); }
        }
        @keyframes server-add {
          0% { opacity: 0; transform: scale(0.2); }
          60% { opacity: 1; transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes slide-in-status {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes btn-pulse {
          0%, 100% { box-shadow: 0 0 0 0 hsl(var(--teal-glow) / 0.3); }
          50% { box-shadow: 0 0 0 5px hsl(var(--teal-glow) / 0); }
        }
      `}</style>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-10 py-8 lg:px-16 lg:py-10">

        {/* Section Tag */}
        <span
          className="mb-2 inline-block w-fit rounded-full border border-[hsl(var(--teal-glow)/0.4)] bg-[hsl(var(--teal)/0.1)] px-3 py-1 text-xs font-medium uppercase tracking-wider text-[hsl(var(--teal-glow))] opacity-0"
          style={{ animation: "fade-in-left 0.6s 0.2s ease-out both" }}
        >
          Scalability — Solution 2 of 2
        </span>

        {/* Header */}
        <header className="mb-3">
          <h1
            className="text-4xl font-bold tracking-tight text-foreground opacity-0 lg:text-5xl"
            style={{ animation: "fade-in-left 0.7s 0.3s ease-out both" }}
          >
            <span className="text-gradient-teal">Consistent Hashing</span>
          </h1>
          <p
            className="mt-2 text-lg text-muted-foreground opacity-0 lg:text-xl"
            style={{ animation: "fade-in-left 0.7s 0.6s ease-out both" }}
          >
            The algorithm inside the Load Balancer — add or remove servers without reshuffling everything.
          </p>
        </header>

        {/* Connection to Slide 5 */}
        {phase === 0 && (
          <div
            className="mb-4 rounded-lg border border-border/40 bg-card/30 p-3 opacity-0"
            style={{ animation: "fade-in-up 0.8s 1s ease-out both" }}
          >
            <p className="text-sm text-muted-foreground">
              We have a Load Balancer splitting traffic to 3 servers. But <span className="font-semibold text-foreground">how does it decide WHERE each key goes?</span> Using <code className="rounded bg-muted/50 px-1 text-[hsl(var(--teal-glow))]">hash(key) % N</code> reshuffles 100% when N changes. The hash ring solves this.
            </p>
          </div>
        )}

        {/* Main Content */}
        <section className="relative flex flex-1 items-center justify-center">
          <div className="flex items-start gap-8">

            {/* Hash Ring SVG */}
            <div className="relative" key={isReplaying ? `replay-${replayKey}` : "main"}>
              <svg viewBox="0 0 500 480" className="h-[400px] w-[400px]">
                <defs>
                  <filter id="glow-sm">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Ring */}
                {showRing && (
                  <circle
                    cx={centerX} cy={centerY} r={radius}
                    fill="none"
                    stroke="hsl(var(--teal-glow))"
                    strokeWidth="2.5"
                    opacity="0.5"
                    strokeDasharray="944"
                    strokeDashoffset="944"
                    style={{ animation: "ring-draw 2s 0.3s ease-out both" }}
                  />
                )}

                {/* Clockwise label */}
                {showRing && (
                  <g opacity="0" style={{ animation: "fade-in-smooth 0.8s 2.5s ease-out both" }}>
                    <text x={centerX} y={centerY - 10} textAnchor="middle" fill="hsl(var(--teal-glow))" fontSize="10" opacity="0.4">
                      ↻ clockwise
                    </text>
                  </g>
                )}

                {/* Servers on ring */}
                {showServers && serverData.map((server, idx) => {
                  const pos = getPosition(server.angle);
                  const isRemoved = state.s2Removed && server.id === "s2";

                  if (isRemoved) {
                    return (
                      <g
                        key={server.id + "-rem-" + replayKey}
                        style={{
                          animation: "server-remove 1.2s ease-in both",
                          transformOrigin: `${pos.x}px ${pos.y}px`,
                        }}
                      >
                        <circle cx={pos.x} cy={pos.y} r="22" fill={server.color} stroke={server.color} strokeWidth="2" filter="url(#glow-sm)" />
                        <text x={pos.x} y={pos.y + 5} textAnchor="middle" fill="#333" fontSize="11" fontWeight="bold">S{server.id.replace("s", "")}</text>
                      </g>
                    );
                  }

                  return (
                    <g
                      key={server.id}
                      style={{
                        animation: `node-pop 0.9s ${0.8 + idx * 0.5}s ease-out both`,
                        transformOrigin: `${pos.x}px ${pos.y}px`,
                        opacity: 0,
                      }}
                    >
                      <circle cx={pos.x} cy={pos.y} r="22" fill={server.color} stroke={server.color} strokeWidth="2" filter="url(#glow-sm)" />
                      <text x={pos.x} y={pos.y + 5} textAnchor="middle" fill="#333" fontSize="11" fontWeight="bold">S{server.id.replace("s", "")}</text>
                    </g>
                  );
                })}

                {/* Server 4 */}
                {state.showS4 && (() => {
                  const pos = getPosition(server4.angle);
                  return (
                    <g
                      key={"s4-" + replayKey}
                      style={{
                        animation: "server-add 1s ease-out both",
                        transformOrigin: `${pos.x}px ${pos.y}px`,
                      }}
                    >
                      <circle cx={pos.x} cy={pos.y} r="22" fill={server4.color} stroke={server4.color} strokeWidth="2" filter="url(#glow-sm)" />
                      <text x={pos.x} y={pos.y + 5} textAnchor="middle" fill="#333" fontSize="11" fontWeight="bold">S4</text>
                    </g>
                  );
                })()}

                {/* Keys */}
                {showKeys && keyData.map((key, idx) => {
                  const pos = getPosition(key.angle, radius - 30);
                  const assigned = findNearestCW(key.angle, state.activeServers);
                  const assignedPos = getPosition(assigned.angle);
                  const isMoved = state.movedKeys.includes(key.id);

                  return (
                    <g key={key.id + "-" + replayKey} style={{ opacity: 0, animation: `fade-in-smooth 0.8s ${0.5 + idx * 0.4}s ease-out both` }}>
                      {/* Connection line */}
                      {showConnections && (
                        <line
                          x1={pos.x} y1={pos.y}
                          x2={assignedPos.x} y2={assignedPos.y}
                          stroke={assigned.color}
                          strokeWidth="1.5"
                          strokeDasharray="200"
                          strokeDashoffset="200"
                          opacity="0"
                          style={{ animation: `connection-draw 1.5s ${1 + idx * 0.4}s ease-out both` }}
                        />
                      )}

                      {/* Key dot */}
                      <circle
                        cx={pos.x} cy={pos.y} r="8"
                        fill="white"
                        stroke={isMoved ? "hsl(28, 90%, 55%)" : "hsl(var(--teal-glow))"}
                        strokeWidth={isMoved ? "3" : "2"}
                        style={{
                          animation: isMoved
                            ? "key-glow-moved 1.5s ease-in-out infinite"
                            : state.movedKeys.length > 0
                            ? "key-glow-stay 1.2s ease-out both"
                            : "none",
                        }}
                      />
                      <text x={pos.x} y={pos.y - 14} textAnchor="middle" fill="white" fontSize="10" fontWeight="600">
                        {key.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Right Panel */}
            <div className="flex w-60 flex-col gap-4">

              {/* ─── MAIN ANIMATION STATUS ─── */}
              {!isReplaying && (
                <>
                  {phase >= 2 && phase < 5 && (
                    <div className="rounded-lg border border-border/40 bg-card/30 p-3 opacity-0" style={{ animation: "slide-in-status 0.8s ease-out both" }}>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Initial State</p>
                      <p className="mt-1 text-sm text-foreground">3 servers on the ring</p>
                      <p className="mt-1 text-xs text-muted-foreground">Each key maps to its nearest server clockwise</p>
                    </div>
                  )}

                  {phase === 5 && (
                    <div className="rounded-lg border border-[hsl(var(--teal-glow)/0.4)] bg-[hsl(var(--teal)/0.06)] p-3 opacity-0" style={{ animation: "slide-in-status 0.8s 0.5s ease-out both" }}>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--teal-glow))]">+ Server 4 Added</p>
                      <p className="mt-1 text-sm text-foreground">Placed between S1 and S2</p>
                      <div className="mt-2 rounded border border-border/30 bg-card/40 px-2 py-1.5">
                        <p className="text-xs text-muted-foreground">
                          <span className="font-bold text-[hsl(28,90%,55%)]">{state.movedKeys.length} key{state.movedKeys.length !== 1 ? "s" : ""} moved</span> · {keyData.length - state.movedKeys.length} keys stayed
                        </p>
                      </div>
                      <p className="mt-2 text-[10px] text-muted-foreground">Only keys between S1 and S4 are affected.</p>
                    </div>
                  )}

                  {phase === 6 && (
                    <div className="rounded-lg border border-[hsl(28,90%,55%,0.4)] bg-[hsl(28,90%,55%,0.06)] p-3 opacity-0" style={{ animation: "slide-in-status 0.8s 0.5s ease-out both" }}>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(28,90%,60%)]">− Server 2 Removed</p>
                      <p className="mt-1 text-sm text-foreground">S2 goes offline</p>
                      <div className="mt-2 rounded border border-border/30 bg-card/40 px-2 py-1.5">
                        <p className="text-xs text-muted-foreground">
                          <span className="font-bold text-[hsl(28,90%,55%)]">{state.movedKeys.length} key{state.movedKeys.length !== 1 ? "s" : ""} moved</span> · {keyData.length - state.movedKeys.length} keys stayed
                        </p>
                      </div>
                      <p className="mt-2 text-[10px] text-muted-foreground">Only S2's keys move to the next server clockwise.</p>
                    </div>
                  )}

                  {phase >= 7 && (
                    <div className="rounded-lg border border-[hsl(var(--teal-glow)/0.5)] bg-[hsl(var(--teal)/0.08)] p-3 opacity-0" style={{ animation: "slide-in-status 0.8s ease-out both" }}>
                      <p className="text-sm font-bold text-[hsl(var(--teal-glow))]">✓ Minimal Disruption</p>
                      <p className="mt-1 text-xs text-muted-foreground">Add or remove servers — only nearby keys move. The rest stays untouched.</p>
                    </div>
                  )}
                </>
              )}

              {/* ─── REPLAY STATUS ─── */}
              {isReplaying && (
                <>
                  {replayPhase >= 1 && replayPhase < 2 && (
                    <div key={"rs1-" + replayKey} className="rounded-lg border border-border/40 bg-card/30 p-3 opacity-0" style={{ animation: "slide-in-status 0.6s ease-out both" }}>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Base State</p>
                      <p className="mt-1 text-sm text-foreground">3 servers · 5 keys · All mapped clockwise</p>
                    </div>
                  )}

                  {replayMode === "add" && replayPhase >= 2 && replayPhase < 4 && (
                    <div key={"rs2-add-" + replayKey} className="rounded-lg border border-[hsl(var(--teal-glow)/0.4)] bg-[hsl(var(--teal)/0.06)] p-3 opacity-0" style={{ animation: "slide-in-status 0.6s 0.3s ease-out both" }}>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--teal-glow))]">+ Server 4 Added</p>
                      <p className="mt-1 text-sm text-foreground">Between S1 and S2</p>
                      {replayPhase >= 3 && (
                        <div className="mt-2 rounded border border-border/30 bg-card/40 px-2 py-1.5">
                          <p className="text-xs text-muted-foreground">
                            <span className="font-bold text-[hsl(28,90%,55%)]">{state.movedKeys.length} key{state.movedKeys.length !== 1 ? "s" : ""} moved</span> · {keyData.length - state.movedKeys.length} stayed
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {replayMode === "remove" && replayPhase >= 2 && replayPhase < 4 && (
                    <div key={"rs2-rem-" + replayKey} className="rounded-lg border border-[hsl(28,90%,55%,0.4)] bg-[hsl(28,90%,55%,0.06)] p-3 opacity-0" style={{ animation: "slide-in-status 0.6s 0.3s ease-out both" }}>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(28,90%,60%)]">− Server 2 Removed</p>
                      <p className="mt-1 text-sm text-foreground">S2 goes offline</p>
                      {replayPhase >= 3 && (
                        <div className="mt-2 rounded border border-border/30 bg-card/40 px-2 py-1.5">
                          <p className="text-xs text-muted-foreground">
                            <span className="font-bold text-[hsl(28,90%,55%)]">{state.movedKeys.length} key{state.movedKeys.length !== 1 ? "s" : ""} moved</span> · {keyData.length - state.movedKeys.length} stayed
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {replayPhase >= 4 && (
                    <div key={"rs4-" + replayKey} className="rounded-lg border border-[hsl(var(--teal-glow)/0.5)] bg-[hsl(var(--teal)/0.08)] p-3 opacity-0" style={{ animation: "slide-in-status 0.6s ease-out both" }}>
                      <p className="text-sm font-bold text-[hsl(var(--teal-glow))]">✓ Minimal Disruption</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {replayMode === "add"
                          ? "New server absorbed only nearby keys. Everything else untouched."
                          : "Removed server's keys redistributed to next clockwise. Everything else untouched."}
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Legend */}
              {(phase >= 3 || isReplaying) && (
                <div className="rounded-lg border border-border/30 bg-card/20 p-3 opacity-0" style={{ animation: "fade-in-smooth 0.8s 1s ease-out both" }}>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Legend</p>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full border-2 border-[hsl(var(--teal-glow))] bg-white" />
                      <span className="text-[10px] text-muted-foreground">Key (stayed)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full border-2 border-[hsl(28,90%,55%)] bg-white" />
                      <span className="text-[10px] text-muted-foreground">Key (moved)</span>
                    </div>
                    {serverData.map(s => (
                      <div key={s.id} className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: s.color }} />
                        <span className="text-[10px] text-muted-foreground">{s.label}</span>
                      </div>
                    ))}
                    {state.showS4 && (
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: server4.color }} />
                        <span className="text-[10px] text-muted-foreground">{server4.label}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Replay Buttons */}
              {showButtons && (
                <div className="flex flex-col gap-2 opacity-0" style={{ animation: "fade-in-smooth 0.8s 0.5s ease-out both" }}>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Replay Demo</p>
                  <button
                    onClick={handleReplayAdd}
                    className="rounded-lg border border-[hsl(var(--teal-glow)/0.5)] bg-[hsl(var(--teal)/0.1)] px-3 py-2 text-left text-xs font-medium text-[hsl(var(--teal-glow))] transition-all hover:bg-[hsl(var(--teal)/0.2)] active:scale-95"
                    style={{ animation: "btn-pulse 3s 1s ease-in-out infinite" }}
                  >
                    <span className="mr-1.5">＋</span> Replay: Add Server
                  </button>
                  <button
                    onClick={handleReplayRemove}
                    className="rounded-lg border border-[hsl(28,90%,55%,0.5)] bg-[hsl(28,90%,55%,0.08)] px-3 py-2 text-left text-xs font-medium text-[hsl(28,90%,60%)] transition-all hover:bg-[hsl(28,90%,55%,0.15)] active:scale-95"
                  >
                    <span className="mr-1.5">－</span> Replay: Remove Server
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Bottom comparison */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div
            className="rounded-lg border-t-2 border-[hsl(28,90%,60%,0.7)] bg-card/30 p-3 opacity-0"
            style={{ animation: phase >= 7 ? "fade-in-up 0.6s 0.5s ease-out both" : "none" }}
          >
            <h4 className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <span className="text-[hsl(28,90%,60%)]">✕</span> hash(key) % N
            </h4>
            <p className="mt-1 text-[11px] text-muted-foreground">Add/remove 1 server → 100% keys reshuffle → total cache miss storm</p>
          </div>
          <div
            className="rounded-lg border-t-2 border-[hsl(var(--teal-glow)/0.7)] bg-card/30 p-3 opacity-0"
            style={{ animation: phase >= 7 ? "fade-in-up 0.6s 0.8s ease-out both" : "none" }}
          >
            <h4 className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <span className="text-[hsl(var(--teal-glow))]">✓</span> Consistent Hashing
            </h4>
            <p className="mt-1 text-[11px] text-muted-foreground">Add/remove 1 server → only nearby keys move → system stays stable</p>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-auto flex items-end justify-end pt-2">
          <div className="opacity-0" style={{ animation: "fade-in-right 0.8s 2s ease-out both" }}>
            <EpamLogo />
          </div>
        </div>
      </div>

      <SlideNav prev="/load-balancing" next="/availability" />
    </main>
  );
};

export default ConsistentHashing;
