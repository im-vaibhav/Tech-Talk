import { useEffect, useRef, useState } from "react";
import EpamLogo from "@/components/EpamLogo";
import SlideBackdrop from "@/components/SlideBackdrop";
import SlideNav from "@/components/SlideNav";

const SWIMProtocol = () => {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const animationStarted = useRef(false);

  useEffect(() => {
    if (animationStarted.current) return;
    animationStarted.current = true;
  }, []);

  useEffect(() => {
    if (paused) return;
    
    // 4 seconds per step
    const timer = setTimeout(() => {
      if (step < 10) {
        setStep(s => s + 1);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [step, paused]);

  const reset = () => {
    setStep(0);
    setPaused(false);
  };

  // Node positions in a pentagon (loose circle)
  const R = 32; // node radius
  const CLUSTER_CX = 400;
  const CLUSTER_CY = 260;
  const CLUSTER_R = 110;

  const NODES = Array.from({ length: 5 }, (_, i) => {
    const angle = ((i * 360) / 5 - 90) * (Math.PI / 180);
    return {
      id: String.fromCharCode(65 + i), // A, B, C, D, E
      cx: CLUSTER_CX + CLUSTER_R * Math.cos(angle),
      cy: CLUSTER_CY + CLUSTER_R * Math.sin(angle),
    };
  });

  const [A, B, C, D, E] = NODES;

  // Colors
  const TEAL_GLOW = "hsl(186 90% 55%)";
  const GRAY_DEAD = "#666666";
  const ORANGE = "hsl(28 90% 60%)";
  const RED = "hsl(0 84% 60%)";

  // Node B status
  let bStatus: "normal" | "dead" | "suspect" | "failed" = "normal";
  if (step >= 2) bStatus = "dead";
  if (step >= 6) bStatus = "suspect";
  if (step >= 7) bStatus = "failed";

  // Helper: edge point on node circle
  const edgePt = (from: typeof NODES[0], to: typeof NODES[0]) => {
    const angle = Math.atan2(to.cy - from.cy, to.cx - from.cx);
    return {
      fx: from.cx + R * Math.cos(angle),
      fy: from.cy + R * Math.sin(angle),
      tx: to.cx - R * Math.cos(angle),
      ty: to.cy - R * Math.sin(angle),
    };
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-hero">
      <SlideBackdrop />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-10 py-8 lg:px-16 lg:py-10">
        
        {/* Header */}
        <header className="mb-4">
          <div
            className="mb-3 opacity-0"
            style={{ animation: "fade-in-smooth 0.8s 0.3s ease-out both" }}
          >
            <span className="rounded-full border border-[hsl(var(--teal-glow)/0.4)] bg-[hsl(var(--teal)/0.15)] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.3em] text-[hsl(var(--teal-glow))]">
              Availability · Solution 1 of 2
            </span>
          </div>
          <h1
            className="text-3xl font-bold tracking-tight text-foreground opacity-0 lg:text-4xl"
            style={{ animation: "fade-in-smooth 0.8s 0.6s ease-out both" }}
          >
            <span className="text-gradient-teal">Gossip / SWIM</span> Protocol
          </h1>
          <p
            className="mt-2 text-base text-muted-foreground opacity-0 lg:text-lg"
            style={{ animation: "fade-in-smooth 0.8s 0.9s ease-out both" }}
          >
            Nodes check on each other. No single monitor. No single point of failure.
          </p>
        </header>

        {/* Stage Indicator + Controls */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div className="rounded-lg border border-border/50 bg-card/30 px-3 py-1.5">
            <p className="text-xs font-semibold text-foreground">
              {step === 0 && "Stage 1: Normal Gossip"}
              {step === 1 && "Stage 1: Healthy Heartbeats"}
              {step === 2 && "Stage 2: Node B Crashes"}
              {step === 3 && "Stage 2: Direct Ping Fails"}
              {step === 4 && "Stage 3: Indirect Probe Request"}
              {step === 5 && "Stage 3: Multiple Nodes Verify"}
              {step === 6 && "Stage 4: Node Marked SUSPECT"}
              {step === 7 && "Stage 4: SUSPECT → FAILED"}
              {step === 8 && "Stage 4: Gossip Spreads"}
              {step >= 9 && "Comparison: Central vs SWIM"}
            </p>
          </div>

          <div className="flex gap-2">
            {step < 10 && (
              <button
                onClick={() => setPaused(p => !p)}
                className="rounded bg-secondary px-3 py-1 text-xs font-semibold text-foreground transition-colors hover:bg-secondary/80"
              >
                {paused ? "▶ Play" : "⏸ Pause"}
              </button>
            )}
            <button
              onClick={reset}
              className="rounded bg-secondary px-3 py-1 text-xs font-semibold text-foreground transition-colors hover:bg-secondary/80"
            >
              ⟲ Restart
            </button>
          </div>
        </div>

        {/* Main Visual */}
        <section className="relative flex flex-1 items-center justify-center">
          <div className="relative h-[460px] w-full max-w-4xl">
            <svg viewBox="0 0 800 480" className="absolute inset-0 h-full w-full">
              <defs>
                {/* Arrow markers */}
                {[TEAL_GLOW, GRAY_DEAD, ORANGE, RED].map(c => (
                  <marker
                    key={c}
                    id={`arrow-${c.replace(/[^a-z0-9]/g, "")}`}
                    markerWidth="8"
                    markerHeight="8"
                    refX="7"
                    refY="4"
                    orient="auto-start-reverse"
                    viewBox="0 0 8 8"
                  >
                    <path d="M 0 0 L 8 4 L 0 8 z" fill={c} />
                  </marker>
                ))}
              </defs>

              {/* Cluster boundary */}
              <circle
                cx={CLUSTER_CX}
                cy={CLUSTER_CY}
                r={CLUSTER_R + 55}
                fill="hsl(186 85% 38% / 0.03)"
                stroke="hsl(186 85% 38%)"
                strokeWidth="1"
                strokeDasharray="6 3"
                className="opacity-0"
                style={{ animation: "fade-in-smooth 1s 1s ease-out both" }}
              />
              <text
                x={CLUSTER_CX}
                y={CLUSTER_CY - CLUSTER_R - 65}
                textAnchor="middle"
                fill="hsl(186 85% 38%)"
                fontSize="9"
                fontWeight="600"
                letterSpacing="1"
                className="opacity-0"
                style={{ animation: "fade-in-smooth 1s 1.2s ease-out both" }}
              >
                DISTRIBUTED NODES
              </text>

              {/* Nodes */}
              {NODES.map((node, idx) => {
                const isCrashed = node.id === "B" && bStatus !== "normal";
                const isSuspect = node.id === "B" && bStatus === "suspect";
                const isFailed = node.id === "B" && bStatus === "failed";

                let fillColor = "hsl(220 25% 20%)";
                let strokeColor = TEAL_GLOW;

                if (isCrashed) {
                  fillColor = "#1a1a1a";
                  strokeColor = GRAY_DEAD;
                }

                return (
                  <g
                    key={node.id}
                    className="opacity-0"
                    style={{
                      animation: `fade-scale-smooth 0.6s ${0.2 * idx}s ease-out both`,
                    }}
                  >
                    {/* Node circle */}
                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r={R}
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth="2.5"
                      style={{
                        filter: !isCrashed ? "drop-shadow(0 0 8px hsl(186 90% 55% / 0.4))" : "none",
                        transition: "all 1s ease",
                      }}
                    />

                    {/* Node label */}
                    <text
                      x={node.cx}
                      y={node.cy + 6}
                      textAnchor="middle"
                      fill={isCrashed ? "#888888" : "#F1F5F9"}
                      fontSize="18"
                      fontWeight="700"
                      style={{ transition: "fill 1s ease" }}
                    >
                      {node.id}
                    </text>

                    {/* Status badges */}
                    {isSuspect && (
                      <g className="opacity-0" style={{ animation: "fade-scale-smooth 0.6s ease-out both" }}>
                        <rect
                          x={node.cx - 32}
                          y={node.cy - R - 22}
                          width={64}
                          height={18}
                          rx={4}
                          fill={ORANGE}
                        />
                        <text
                          x={node.cx}
                          y={node.cy - R - 9}
                          textAnchor="middle"
                          fill="#000"
                          fontSize="10"
                          fontWeight="700"
                        >
                          SUSPECT
                        </text>
                      </g>
                    )}

                    {isFailed && (
                      <g className="opacity-0" style={{ animation: "fade-scale-smooth 0.6s ease-out both" }}>
                        <rect
                          x={node.cx - 28}
                          y={node.cy - R - 22}
                          width={56}
                          height={18}
                          rx={4}
                          fill={RED}
                        />
                        <text
                          x={node.cx}
                          y={node.cy - R - 9}
                          textAnchor="middle"
                          fill="#fff"
                          fontSize="10"
                          fontWeight="700"
                        >
                          FAILED
                        </text>
                        <text
                          x={node.cx}
                          y={node.cy + 7}
                          textAnchor="middle"
                          fill={RED}
                          fontSize="26"
                        >
                          ✗
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Stage 1: Normal gossip - A pings C */}
              {step >= 1 && step < 2 && (
                <g className="opacity-0" style={{ animation: "fade-in-smooth 0.8s ease-out both" }}>
                  {(() => {
                    const { fx, fy, tx, ty } = edgePt(A, C);
                    const mx = (fx + tx) / 2 - 20;
                    const my = (fy + ty) / 2 - 12;
                    return (
                      <>
                        <line
                          x1={fx} y1={fy} x2={tx} y2={ty}
                          stroke={TEAL_GLOW} strokeWidth="2.5"
                          markerEnd={`url(#arrow-${TEAL_GLOW.replace(/[^a-z0-9]/g, "")})`}
                        />
                        <text x={mx} y={my} textAnchor="middle" fill={TEAL_GLOW} fontSize="10" fontWeight="600">
                          ping
                        </text>
                      </>
                    );
                  })()}
                </g>
              )}

              {step >= 1 && step < 2 && (
                <g className="opacity-0" style={{ animation: "fade-in-smooth 0.8s 0.5s ease-out both" }}>
                  {(() => {
                    const { fx, fy, tx, ty } = edgePt(C, A);
                    const mx = (fx + tx) / 2 + 20;
                    const my = (fy + ty) / 2 + 12;
                    return (
                      <>
                        <line
                          x1={fx} y1={fy} x2={tx} y2={ty}
                          stroke={TEAL_GLOW} strokeWidth="2" strokeDasharray="5 3"
                          markerEnd={`url(#arrow-${TEAL_GLOW.replace(/[^a-z0-9]/g, "")})`}
                        />
                        <text x={mx} y={my} textAnchor="middle" fill={TEAL_GLOW} fontSize="10" fontWeight="600">
                          ack
                        </text>
                      </>
                    );
                  })()}
                </g>
              )}

              {/* Stage 2: B crashes, A pings B */}
              {step >= 3 && step < 4 && (
                <g className="opacity-0" style={{ animation: "fade-in-smooth 0.8s ease-out both" }}>
                  {(() => {
                    const { fx, fy, tx, ty } = edgePt(A, B);
                    const mx = (fx + tx) / 2;
                    const my = (fy + ty) / 2 - 12;
                    return (
                      <>
                        <line
                          x1={fx} y1={fy} x2={tx} y2={ty}
                          stroke={GRAY_DEAD} strokeWidth="2.5" strokeDasharray="6 4"
                          markerEnd={`url(#arrow-${GRAY_DEAD.replace(/[^a-z0-9]/g, "")})`}
                        />
                        <text x={mx} y={my} textAnchor="middle" fill={GRAY_DEAD} fontSize="10" fontWeight="600">
                          ping
                        </text>
                        <text x={mx} y={my + 24} textAnchor="middle" fill="#999999" fontSize="10" fontWeight="600">
                          timeout ✗
                        </text>
                      </>
                    );
                  })()}
                </g>
              )}

              {/* Stage 3: Indirect probe - A asks D and E */}
              {step >= 4 && step < 6 && (
                <>
                  <g className="opacity-0" style={{ animation: "fade-in-smooth 0.8s ease-out both" }}>
                    {(() => {
                      const { fx, fy, tx, ty } = edgePt(A, D);
                      const angle = Math.atan2(ty - fy, tx - fx);
                      const perpX = -Math.sin(angle) * 15;
                      const perpY = Math.cos(angle) * 15;
                      const mx = (fx + tx) / 2 + perpX;
                      const my = (fy + ty) / 2 + perpY;
                      return (
                        <>
                          <line
                            x1={fx} y1={fy} x2={tx} y2={ty}
                            stroke={TEAL_GLOW} strokeWidth="2"
                            markerEnd={`url(#arrow-${TEAL_GLOW.replace(/[^a-z0-9]/g, "")})`}
                          />
                          <text x={mx} y={my} textAnchor="middle" fill={TEAL_GLOW} fontSize="9" fontWeight="600">
                            ping-req
                          </text>
                        </>
                      );
                    })()}
                  </g>
                  <g className="opacity-0" style={{ animation: "fade-in-smooth 0.8s 0.3s ease-out both" }}>
                    {(() => {
                      const { fx, fy, tx, ty } = edgePt(A, E);
                      const angle = Math.atan2(ty - fy, tx - fx);
                      const perpX = -Math.sin(angle) * 15;
                      const perpY = Math.cos(angle) * 15;
                      const mx = (fx + tx) / 2 + perpX;
                      const my = (fy + ty) / 2 + perpY;
                      return (
                        <>
                          <line
                            x1={fx} y1={fy} x2={tx} y2={ty}
                            stroke={TEAL_GLOW} strokeWidth="2"
                            markerEnd={`url(#arrow-${TEAL_GLOW.replace(/[^a-z0-9]/g, "")})`}
                          />
                          <text x={mx} y={my} textAnchor="middle" fill={TEAL_GLOW} fontSize="9" fontWeight="600">
                            ping-req
                          </text>
                        </>
                      );
                    })()}
                  </g>
                </>
              )}

              {/* Stage 3: D and E ping B (fail) and report back */}
              {step >= 5 && step < 6 && (
                <>
                  {/* D pings B */}
                  <g className="opacity-0" style={{ animation: "fade-in-smooth 0.8s ease-out both" }}>
                    {(() => {
                      const { fx, fy, tx, ty } = edgePt(D, B);
                      return (
                        <line
                          x1={fx} y1={fy} x2={tx} y2={ty}
                          stroke={GRAY_DEAD} strokeWidth="2" strokeDasharray="6 4"
                          markerEnd={`url(#arrow-${GRAY_DEAD.replace(/[^a-z0-9]/g, "")})`}
                        />
                      );
                    })()}
                  </g>
                  {/* E pings B */}
                  <g className="opacity-0" style={{ animation: "fade-in-smooth 0.8s 0.3s ease-out both" }}>
                    {(() => {
                      const { fx, fy, tx, ty } = edgePt(E, B);
                      return (
                        <line
                          x1={fx} y1={fy} x2={tx} y2={ty}
                          stroke={GRAY_DEAD} strokeWidth="2" strokeDasharray="6 4"
                          markerEnd={`url(#arrow-${GRAY_DEAD.replace(/[^a-z0-9]/g, "")})`}
                        />
                      );
                    })()}
                  </g>
                  {/* D reports No */}
                  <g className="opacity-0" style={{ animation: "fade-in-smooth 0.8s 0.6s ease-out both" }}>
                    {(() => {
                      const { fx, fy, tx, ty } = edgePt(D, A);
                      const angle = Math.atan2(ty - fy, tx - fx);
                      const perpX = -Math.sin(angle) * 12;
                      const perpY = Math.cos(angle) * 12;
                      const mx = (fx + tx) / 2 + perpX;
                      const my = (fy + ty) / 2 + perpY;
                      return (
                        <>
                          <line
                            x1={fx} y1={fy} x2={tx} y2={ty}
                            stroke={ORANGE} strokeWidth="1.5" strokeDasharray="4 2"
                            markerEnd={`url(#arrow-${ORANGE.replace(/[^a-z0-9]/g, "")})`}
                          />
                          <text x={mx} y={my} textAnchor="middle" fill={ORANGE} fontSize="9" fontWeight="600">
                            No
                          </text>
                        </>
                      );
                    })()}
                  </g>
                  {/* E reports No */}
                  <g className="opacity-0" style={{ animation: "fade-in-smooth 0.8s 0.9s ease-out both" }}>
                    {(() => {
                      const { fx, fy, tx, ty } = edgePt(E, A);
                      const angle = Math.atan2(ty - fy, tx - fx);
                      const perpX = -Math.sin(angle) * 12;
                      const perpY = Math.cos(angle) * 12;
                      const mx = (fx + tx) / 2 + perpX;
                      const my = (fy + ty) / 2 + perpY;
                      return (
                        <>
                          <line
                            x1={fx} y1={fy} x2={tx} y2={ty}
                            stroke={ORANGE} strokeWidth="1.5" strokeDasharray="4 2"
                            markerEnd={`url(#arrow-${ORANGE.replace(/[^a-z0-9]/g, "")})`}
                          />
                          <text x={mx} y={my} textAnchor="middle" fill={ORANGE} fontSize="9" fontWeight="600">
                            No
                          </text>
                        </>
                      );
                    })()}
                  </g>
                </>
              )}

              {/* Stage 4: Gossip spreads */}
              {step >= 8 && step < 9 && (
                <>
                  {[[A, C], [C, D], [D, E], [A, E]].map(([from, to], i) => {
                    const { fx, fy, tx, ty } = edgePt(from, to);
                    return (
                      <g key={i} className="opacity-0" style={{ animation: `fade-in-smooth 0.6s ${i * 0.2}s ease-out both` }}>
                        <line
                          x1={fx} y1={fy} x2={tx} y2={ty}
                          stroke={ORANGE} strokeWidth="1.5" strokeDasharray="3 3"
                          opacity="0.5"
                        />
                      </g>
                    );
                  })}
                </>
              )}
            </svg>

            {/* Stage description overlay - FIXED POSITION */}
            {step < 9 && (
              <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{ bottom: "10px" }}
                key={step}
              >
                <div className="rounded-lg border border-border/50 bg-card/90 px-5 py-2.5 backdrop-blur-sm">
                  <p className="text-center text-xs font-semibold text-foreground">
                    {step === 0 && "All nodes healthy, running peer-to-peer gossip protocol"}
                    {step === 1 && "Node A randomly selects Node C and sends a ping"}
                    {step === 2 && "Node B crashes silently (no alarm, no notification)"}
                    {step === 3 && "Node A tries to ping B → No response (timeout)"}
                    {step === 4 && "A asks D and E: 'Can YOU reach B?' (ping-req)"}
                    {step === 5 && "Both D and E try → Both fail → Report 'No' back to A"}
                    {step === 6 && "B marked SUSPECT (brief grace period)"}
                    {step === 7 && "Suspicion timer expires → B confirmed FAILED"}
                    {step === 8 && "News spreads via gossip → Entire cluster knows in milliseconds"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Comparison Section */}
        {step >= 9 && (
          <section
            className="mt-4 opacity-0"
            style={{ animation: "slide-up-smooth 1s ease-out both" }}
          >
            <h3 className="mb-3 text-center text-lg font-bold text-foreground">
              Why Not a Central Monitor?
            </h3>
            <div className="grid grid-cols-2 gap-5">
              
              {/* Central Monitor (BAD) */}
              <div className="relative rounded-lg border border-[hsl(var(--destructive)/0.4)] bg-[hsl(var(--destructive)/0.05)] p-4">
                <div className="absolute right-3 top-3 text-2xl opacity-40">❌</div>
                <h4 className="mb-2 text-sm font-bold text-[hsl(var(--destructive))]">
                  Central Health Checker
                </h4>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-[hsl(var(--destructive))]">•</span>
                    <span>Single monitoring server pings everyone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[hsl(var(--destructive))]">•</span>
                    <span>If the monitor dies, nobody detects anything</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[hsl(var(--destructive))]">•</span>
                    <span className="font-bold text-foreground">Single point of failure for detection</span>
                  </li>
                </ul>
                
                {/* Star topology diagram */}
                <div className="mt-3 flex justify-center">
                  <svg viewBox="0 0 120 90" className="h-20 w-28">
                    <circle cx="60" cy="45" r="9" fill="hsl(var(--destructive))" opacity="0.6" />
                    <text x="60" y="49" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold">M</text>
                    {[0, 72, 144, 216, 288].map((angle, i) => {
                      const rad = (angle * Math.PI) / 180;
                      const x = 60 + 32 * Math.cos(rad);
                      const y = 45 + 32 * Math.sin(rad);
                      return (
                        <g key={i}>
                          <line x1="60" y1="45" x2={x} y2={y} stroke="hsl(var(--destructive))" strokeWidth="2" opacity="0.4" />
                          <circle cx={x} cy={y} r="6" fill="#666666" opacity="0.6" />
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* SWIM Decentralized (GOOD) */}
              <div className="relative rounded-lg border border-[hsl(var(--teal-glow)/0.4)] bg-[hsl(var(--teal)/0.1)] p-4">
                <div className="absolute right-3 top-3 text-2xl opacity-60">✓</div>
                <h4 className="mb-2 text-sm font-bold text-[hsl(var(--teal-glow))]">
                  SWIM (Decentralized)
                </h4>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-[hsl(var(--teal-glow))]">•</span>
                    <span>Every node monitors peers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[hsl(var(--teal-glow))]">•</span>
                    <span>If any one node dies, others still detect</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[hsl(var(--teal-glow))]">•</span>
                    <span className="font-bold text-foreground">No single point of failure</span>
                  </li>
                </ul>
                
                {/* Mesh topology diagram */}
                <div className="mt-3 flex justify-center">
                  <svg viewBox="0 0 120 90" className="h-20 w-28">
                    {[
                      { x: 40, y: 20 },
                      { x: 80, y: 20 },
                      { x: 95, y: 50 },
                      { x: 60, y: 75 },
                      { x: 25, y: 50 },
                    ].map((node, i, arr) => (
                      <g key={i}>
                        {arr.slice(i + 1).map((other, j) => (
                          <line 
                            key={j} 
                            x1={node.x} 
                            y1={node.y} 
                            x2={other.x} 
                            y2={other.y} 
                            stroke="hsl(var(--teal-glow))" 
                            strokeWidth="1.5" 
                            opacity="0.3" 
                          />
                        ))}
                        <circle cx={node.x} cy={node.y} r="6" fill="hsl(var(--teal))" opacity="0.8" />
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Bottom Row */}
        {step >= 9 && (
          <div
            className="mt-4 flex items-end justify-between opacity-0"
            style={{ animation: "fade-in-smooth 1s 0.5s ease-out both" }}
          >

            <div>
              <EpamLogo />
            </div>
          </div>
        )}
      </div>

      <SlideNav prev="/availability" next="/quorum" />
    </main>
  );
};

export default SWIMProtocol;
