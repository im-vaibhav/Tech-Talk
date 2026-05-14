import { useEffect, useRef, useState, useCallback } from "react";
import EpamLogo from "@/components/EpamLogo";
import SlideBackdrop from "@/components/SlideBackdrop";
import SlideNav from "@/components/SlideNav";

const ReplicationSolution = () => {
  const [phase, setPhase] = useState(0);
  const [mode, setMode] = useState<"auto" | "replication" | "readrepair">("auto");
  const [modePhase, setModePhase] = useState(0);
  const [modeKey, setModeKey] = useState(0);
  const animationStarted = useRef(false);
  const modeTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const SPEED = 0.85;
  const t = (ms: number) => Math.round(ms * SPEED);

  // Auto animation: Replication → crash → Read Repair → done
  useEffect(() => {
    if (animationStarted.current) return;
    animationStarted.current = true;

    const timers = [
      setTimeout(() => setPhase(1), t(2000)),   // 3 empty nodes appear
      setTimeout(() => setPhase(2), t(4500)),   // Client sends write "X=42"
      setTimeout(() => setPhase(3), t(7000)),   // Data replicates to all 3 nodes
      setTimeout(() => setPhase(4), t(10000)),  // RF=3 label, all healthy
      setTimeout(() => setPhase(5), t(13000)),  // Node A crashes
      setTimeout(() => setPhase(6), t(16000)),  // "Data safe" message
      setTimeout(() => setPhase(7), t(19500)),  // READ: Client reads, Node C returns stale "39"
      setTimeout(() => setPhase(8), t(23000)),  // Mismatch detected
      setTimeout(() => setPhase(9), t(26000)),  // Repair: Node C corrected to "42"
      setTimeout(() => setPhase(10), t(29000)), // "Fixed automatically" + buttons appear
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // Replay handlers
  const clearModeTimers = () => {
    modeTimers.current.forEach(clearTimeout);
    modeTimers.current = [];
  };

  const handleReplayReplication = useCallback(() => {
    clearModeTimers();
    setMode("replication");
    setModePhase(0);
    setModeKey(k => k + 1);

    const timers = [
      setTimeout(() => setModePhase(1), t(800)),    // 3 empty nodes
      setTimeout(() => setModePhase(2), t(3500)),   // Client sends write
      setTimeout(() => setModePhase(3), t(6500)),   // Data replicates
      setTimeout(() => setModePhase(4), t(9500)),   // RF=3, all healthy
      setTimeout(() => setModePhase(5), t(12500)),  // Node A crashes
      setTimeout(() => setModePhase(6), t(15500)),  // Data safe message
    ];
    modeTimers.current = timers;
  }, []);

  const handleReplayReadRepair = useCallback(() => {
    clearModeTimers();
    setMode("readrepair");
    setModePhase(0);
    setModeKey(k => k + 1);

    const timers = [
      setTimeout(() => setModePhase(1), t(800)),    // 3 nodes (A=42, B=42, C=39 stale)
      setTimeout(() => setModePhase(2), t(3500)),   // Client reads
      setTimeout(() => setModePhase(3), t(6500)),   // Responses come back, mismatch highlighted
      setTimeout(() => setModePhase(4), t(10000)),  // Repair arrow → C fixed
      setTimeout(() => setModePhase(5), t(13000)),  // "Fixed automatically"
    ];
    modeTimers.current = timers;
  }, []);

  useEffect(() => {
    return () => clearModeTimers();
  }, []);

  const isReplaying = mode !== "auto" && phase >= 10;
  const showButtons = phase >= 10;

  // ─── NODE STATES for current view ───
  const getNodeStates = () => {
    if (isReplaying && mode === "replication") {
      return {
        showNodes: modePhase >= 1,
        nodeAValue: modePhase >= 3 ? "42" : "",
        nodeBValue: modePhase >= 3 ? "42" : "",
        nodeCValue: modePhase >= 3 ? "42" : "",
        nodeACrashed: modePhase >= 5,
        nodeCStale: false,
        nodeCFixed: false,
        showClient: modePhase >= 2,
        clientAction: "write" as const,
        showReplicateArrows: modePhase >= 2 && modePhase < 5,
        showRFLabel: modePhase >= 4,
        showCrashSafe: modePhase >= 6,
        showReadArrows: false,
        showMismatch: false,
        showRepairArrow: false,
      };
    }
    if (isReplaying && mode === "readrepair") {
      return {
        showNodes: modePhase >= 1,
        nodeAValue: "42",
        nodeBValue: "42",
        nodeCValue: modePhase >= 4 ? "42" : "39",
        nodeACrashed: false,
        nodeCStale: modePhase >= 1 && modePhase < 4,
        nodeCFixed: modePhase >= 4,
        showClient: modePhase >= 2,
        clientAction: "read" as const,
        showReplicateArrows: false,
        showRFLabel: false,
        showCrashSafe: false,
        showReadArrows: modePhase >= 2,
        showMismatch: modePhase >= 3 && modePhase < 4,
        showRepairArrow: modePhase >= 4,
      };
    }
    // Auto mode
    return {
      showNodes: phase >= 1,
      nodeAValue: phase >= 3 ? "42" : "",
      nodeBValue: phase >= 3 ? "42" : "",
      nodeCValue: phase >= 9 ? "42" : phase >= 7 ? "39" : phase >= 3 ? "42" : "",
      nodeACrashed: phase >= 5,
      nodeCStale: phase >= 7 && phase < 9,
      nodeCFixed: phase >= 9,
      showClient: phase >= 2,
      clientAction: phase >= 7 ? "read" as const : "write" as const,
      showReplicateArrows: phase >= 2 && phase < 5,
      showRFLabel: phase >= 4 && phase < 7,
      showCrashSafe: phase >= 6 && phase < 7,
      showReadArrows: phase >= 7,
      showMismatch: phase >= 8 && phase < 9,
      showRepairArrow: phase >= 9,
    };
  };

  const ns = getNodeStates();

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-hero">
      <SlideBackdrop />
  
      {/* Logo in top-right corner */}
      <div className="absolute right-8 top-8 z-20 opacity-0" style={{ animation: "fade-in-right 0.6s 0.3s ease-out both" }}>
        <EpamLogo />
      </div>

      <style>{`
        @keyframes replicate-flow {
          0% { stroke-dashoffset: 40; opacity: 0; }
          20% { opacity: 0.8; }
          100% { stroke-dashoffset: 0; opacity: 0.8; }
        }
        @keyframes crash-icon {
          0% { opacity: 0; transform: scale(0.3) rotate(-10deg); }
          50% { opacity: 1; transform: scale(1.2) rotate(5deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes repair-pulse {
          0%, 100% { filter: drop-shadow(0 0 6px hsl(var(--teal-glow) / 0.4)); }
          50% { filter: drop-shadow(0 0 16px hsl(var(--teal-glow) / 0.8)); }
        }
        @keyframes mismatch-pulse {
          0%, 100% { border-color: hsl(28, 90%, 55%, 0.4); }
          50% { border-color: hsl(28, 90%, 55%, 0.9); }
        }
        @keyframes status-slide {
          0% { opacity: 0; transform: translateY(10px); }
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
          Reliability — Solution 1 of 2
        </span>

        {/* Header */}
        <header className="mb-3">
          <h1
            className="text-4xl font-bold tracking-tight text-foreground opacity-0 lg:text-5xl"
            style={{ animation: "fade-in-left 0.7s 0.3s ease-out both" }}
          >
            <span className="text-gradient-teal">Replication</span> + Read Repair
          </h1>
          <p
            className="mt-2 text-lg text-muted-foreground opacity-0 lg:text-xl"
            style={{ animation: "fade-in-left 0.7s 0.6s ease-out both" }}
          >
            Store multiple copies. If one crashes, data survives. If copies disagree, fix on the fly.
          </p>
          <p className="mt-1 text-[10px] text-muted-foreground">Animation: write fans out, one node fails, then read repair corrects drift.</p>
        </header>

        {/* Connection to Reliability Problem */}
        {phase === 0 && (
          <div
            className="mb-4 rounded-lg border border-border/40 bg-card/30 p-3 opacity-0"
            style={{ animation: "fade-in-up 0.8s 1s ease-out both" }}
          >
            <p className="text-sm text-muted-foreground">
              The problem: a server crashes mid-write and <span className="font-semibold text-foreground">data is gone forever</span>. 
              The solution: <span className="font-semibold text-[hsl(var(--teal-glow))]">never store data in just one place</span>. 
              Replicate it across multiple nodes so no single crash can destroy it.
            </p>
          </div>
        )}

        {/* Main Diagram */}
        <section className="relative flex flex-1 items-center justify-center" key={isReplaying ? `replay-${modeKey}` : "main"}>
          <div className="flex items-center gap-6">

            {/* LEFT: Client */}
            {ns.showClient && (
              <div className="flex w-24 flex-col items-center gap-2 opacity-0" style={{ animation: "fade-in-smooth 0.8s 0.3s ease-out both" }}>
                <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-border/40 bg-card/50">
                  <span className="text-2xl">💻</span>
                </div>
                <p className="text-[10px] text-muted-foreground">Client</p>
                <div className="rounded border border-[hsl(var(--teal-glow)/0.5)] bg-[hsl(var(--teal)/0.1)] px-2 py-1">
                  <p className="text-[10px] font-mono font-bold text-[hsl(var(--teal-glow))]">
                    {ns.clientAction === "write" ? "WRITE X=42" : "READ X"}
                  </p>
                </div>
              </div>
            )}

            {/* CENTER: Arrows area */}
            <div className="flex w-28 flex-col items-center justify-center gap-12">
              {/* Replicate arrows (write flow: client → nodes) */}
              {ns.showReplicateArrows && (
                <>
                  {[0, 1, 2].map(i => (
                    <svg key={`rep-${i}`} viewBox="0 0 100 10" className="h-3 w-24">
                      <line
                        x1="5" y1="5" x2="95" y2="5"
                        stroke="hsl(var(--teal-glow))"
                        strokeWidth="2"
                        strokeDasharray="40"
                        strokeDashoffset="40"
                        style={{ animation: `replicate-flow 1.5s ${i * 0.3}s ease-out both` }}
                      />
                      <polygon points="95,5 89,3 89,7" fill="hsl(var(--teal-glow))" opacity="0" style={{ animation: `fade-in-smooth 0.4s ${0.8 + i * 0.3}s ease-out both` }} />
                    </svg>
                  ))}
                </>
              )}

              {/* Read arrows (read flow: nodes → client) */}
              {ns.showReadArrows && !ns.showReplicateArrows && (
                <>
                  {[0, 1, 2].map(i => (
                    <svg key={`read-${i}`} viewBox="0 0 100 10" className="h-3 w-24">
                      <line
                        x1="95" y1="5" x2="5" y2="5"
                        stroke={i === 2 && ns.nodeCStale ? "hsl(28, 90%, 55%)" : "hsl(var(--teal-glow))"}
                        strokeWidth="2"
                        strokeDasharray="40"
                        strokeDashoffset="40"
                        style={{ animation: `replicate-flow 1.5s ${i * 0.3}s ease-out both` }}
                      />
                      <polygon
                        points="5,5 11,3 11,7"
                        fill={i === 2 && ns.nodeCStale ? "hsl(28, 90%, 55%)" : "hsl(var(--teal-glow))"}
                        opacity="0"
                        style={{ animation: `fade-in-smooth 0.4s ${0.8 + i * 0.3}s ease-out both` }}
                      />
                    </svg>
                  ))}
                </>
              )}

              {/* Repair arrow (system → Node C) */}
              {ns.showRepairArrow && (
                <div className="absolute right-[30%] bottom-[22%] opacity-0" style={{ animation: "fade-in-smooth 0.8s ease-out both" }}>
                  <p className="text-[9px] font-bold text-[hsl(var(--teal-glow))]">REPAIR →</p>
                </div>
              )}
            </div>

            {/* RIGHT: 3 Nodes stacked */}
            <div className="flex w-40 flex-col items-center gap-5">
              {/* Node A */}
              {ns.showNodes && (
                <div className="flex items-center gap-3 opacity-0" style={{ animation: "fade-in-smooth 0.8s 0.5s ease-out both" }}>
                  <div
                    className="relative flex h-16 w-16 flex-col items-center justify-center rounded-full border-[3px] transition-all duration-700"
                    style={{
                      borderColor: ns.nodeACrashed ? "hsl(28, 90%, 55%)" : "hsl(var(--teal-glow))",
                      backgroundColor: ns.nodeACrashed ? "hsl(var(--muted)/0.3)" : "hsl(var(--teal)/0.2)",
                      filter: ns.nodeACrashed ? "grayscale(0.5)" : "drop-shadow(0 0 10px hsl(var(--teal-glow) / 0.4))",
                    }}
                  >
                    <p className="text-sm font-bold" style={{ color: ns.nodeACrashed ? "hsl(28, 90%, 55%)" : "hsl(var(--teal-glow))" }}>A</p>
                    {ns.nodeAValue && <p className="text-[9px] font-mono text-foreground">{ns.nodeAValue}</p>}
                    {ns.nodeACrashed && (
                      <span className="absolute -right-2 -top-2 text-base" style={{ animation: "crash-icon 0.6s ease-out both" }}>⚡</span>
                    )}
                  </div>
                  <span className="text-[10px] text-muted-foreground">{ns.nodeACrashed ? "Crashed" : "Primary"}</span>
                </div>
              )}

              {/* Node B */}
              {ns.showNodes && (
                <div className="flex items-center gap-3 opacity-0" style={{ animation: "fade-in-smooth 0.8s 0.8s ease-out both" }}>
                  <div
                    className="flex h-16 w-16 flex-col items-center justify-center rounded-full border-[3px] border-[hsl(var(--teal-glow))] bg-[hsl(var(--teal)/0.2)]"
                    style={{ filter: "drop-shadow(0 0 10px hsl(var(--teal-glow) / 0.4))" }}
                  >
                    <p className="text-sm font-bold text-[hsl(var(--teal-glow))]">B</p>
                    {ns.nodeBValue && <p className="text-[9px] font-mono text-foreground">{ns.nodeBValue}</p>}
                  </div>
                  <span className="text-[10px] text-muted-foreground">Replica</span>
                </div>
              )}

              {/* Node C */}
              {ns.showNodes && (
                <div className="flex items-center gap-3 opacity-0" style={{ animation: "fade-in-smooth 0.8s 1.1s ease-out both" }}>
                  <div
                    className="flex h-16 w-16 flex-col items-center justify-center rounded-full border-[3px] transition-all duration-700"
                    style={{
                      borderColor: ns.nodeCStale ? "hsl(28, 90%, 55%)" : "hsl(var(--teal-glow))",
                      backgroundColor: ns.nodeCStale ? "hsl(28, 90%, 55%, 0.15)" : "hsl(var(--teal)/0.2)",
                      filter: ns.nodeCFixed
                        ? "drop-shadow(0 0 10px hsl(var(--teal-glow) / 0.4))"
                        : ns.nodeCStale
                        ? "drop-shadow(0 0 10px hsl(28, 90%, 55%, 0.4))"
                        : "drop-shadow(0 0 10px hsl(var(--teal-glow) / 0.4))",
                      animation: ns.nodeCStale ? "mismatch-pulse 1.5s ease-in-out infinite" : "none",
                    }}
                  >
                    <p className="text-sm font-bold" style={{ color: ns.nodeCStale ? "hsl(28, 90%, 55%)" : "hsl(var(--teal-glow))" }}>C</p>
                    {ns.nodeCValue && (
                      <p className="text-[9px] font-mono text-foreground">{ns.nodeCValue}</p>
                    )}
                  </div>
                  <span className="text-[10px]" style={{ color: ns.nodeCStale ? "hsl(28, 90%, 55%)" : ns.nodeCFixed ? "hsl(var(--teal-glow))" : "hsl(var(--muted-foreground))" }}>
                    {ns.nodeCStale ? "Stale!" : ns.nodeCFixed ? "✓ Fixed" : "Replica"}
                  </span>
                </div>
              )}
            </div>

            {/* FAR RIGHT: Status Panel */}
            <div className="flex w-52 flex-col gap-3 pl-4">
              {/* Auto mode status messages */}
              {!isReplaying && (
                <>
                  {phase >= 4 && phase < 7 && (
                    <div className="rounded-lg border border-[hsl(var(--teal-glow)/0.4)] bg-[hsl(var(--teal)/0.06)] p-2.5 opacity-0" style={{ animation: "status-slide 0.8s ease-out both" }}>
                      <p className="text-xs font-bold text-[hsl(var(--teal-glow))]">Replication Factor = 3</p>
                      <p className="mt-1 text-[10px] text-muted-foreground">Every write goes to 3 nodes. Data survives if 2 nodes die.</p>
                    </div>
                  )}
                  {phase >= 6 && phase < 7 && (
                    <div className="rounded-lg border border-[hsl(var(--teal-glow)/0.5)] bg-[hsl(var(--teal)/0.08)] p-2.5 opacity-0" style={{ animation: "status-slide 0.8s 0.3s ease-out both" }}>
                      <p className="text-xs font-bold text-[hsl(var(--teal-glow))]">✓ Node A crashed. Data safe.</p>
                      <p className="mt-1 text-[10px] text-muted-foreground">B and C still have the data.</p>
                    </div>
                  )}
                  {phase >= 8 && phase < 9 && (
                    <div className="rounded-lg border border-[hsl(28,90%,55%,0.4)] bg-[hsl(28,90%,55%,0.06)] p-2.5 opacity-0" style={{ animation: "status-slide 0.8s ease-out both" }}>
                      <p className="text-xs font-bold text-[hsl(28,90%,60%)]">⚠ Mismatch Detected</p>
                      <p className="mt-1 text-[10px] text-muted-foreground">Node C returned "39" but A and B say "42". Majority wins.</p>
                    </div>
                  )}
                  {phase >= 9 && phase < 10 && (
                    <div className="rounded-lg border border-[hsl(var(--teal-glow)/0.5)] bg-[hsl(var(--teal)/0.08)] p-2.5 opacity-0" style={{ animation: "status-slide 0.8s ease-out both" }}>
                      <p className="text-xs font-bold text-[hsl(var(--teal-glow))]">✓ Read Repair Complete</p>
                      <p className="mt-1 text-[10px] text-muted-foreground">Node C auto-corrected to "42". No human intervention needed.</p>
                    </div>
                  )}
                  {phase >= 10 && (
                    <div className="rounded-lg border border-[hsl(var(--teal-glow)/0.5)] bg-[hsl(var(--teal)/0.08)] p-2.5 opacity-0" style={{ animation: "status-slide 0.8s ease-out both" }}>
                      <p className="text-xs font-bold text-[hsl(var(--teal-glow))]">✓ Self-Healing System</p>
                      <p className="mt-1 text-[10px] text-muted-foreground">Replication prevents data loss. Read Repair fixes drift. No manual intervention.</p>
                    </div>
                  )}
                </>
              )}

              {/* Replay mode status messages */}
              {isReplaying && mode === "replication" && (
                <>
                  {modePhase >= 4 && (
                    <div key={"rp-rf-" + modeKey} className="rounded-lg border border-[hsl(var(--teal-glow)/0.4)] bg-[hsl(var(--teal)/0.06)] p-2.5 opacity-0" style={{ animation: "status-slide 0.6s ease-out both" }}>
                      <p className="text-xs font-bold text-[hsl(var(--teal-glow))]">RF = 3</p>
                      <p className="mt-1 text-[10px] text-muted-foreground">All 3 nodes have the data.</p>
                    </div>
                  )}
                  {modePhase >= 6 && (
                    <div key={"rp-safe-" + modeKey} className="rounded-lg border border-[hsl(var(--teal-glow)/0.5)] bg-[hsl(var(--teal)/0.08)] p-2.5 opacity-0" style={{ animation: "status-slide 0.6s ease-out both" }}>
                      <p className="text-xs font-bold text-[hsl(var(--teal-glow))]">✓ Node A crashed. Data safe.</p>
                      <p className="mt-1 text-[10px] text-muted-foreground">B and C still have "X=42".</p>
                    </div>
                  )}
                </>
              )}
              {isReplaying && mode === "readrepair" && (
                <>
                  {modePhase >= 3 && modePhase < 4 && (
                    <div key={"rr-mis-" + modeKey} className="rounded-lg border border-[hsl(28,90%,55%,0.4)] bg-[hsl(28,90%,55%,0.06)] p-2.5 opacity-0" style={{ animation: "status-slide 0.6s ease-out both" }}>
                      <p className="text-xs font-bold text-[hsl(28,90%,60%)]">⚠ Mismatch</p>
                      <p className="mt-1 text-[10px] text-muted-foreground">C says "39", but A and B say "42". Majority wins.</p>
                    </div>
                  )}
                  {modePhase >= 5 && (
                    <div key={"rr-fix-" + modeKey} className="rounded-lg border border-[hsl(var(--teal-glow)/0.5)] bg-[hsl(var(--teal)/0.08)] p-2.5 opacity-0" style={{ animation: "status-slide 0.6s ease-out both" }}>
                      <p className="text-xs font-bold text-[hsl(var(--teal-glow))]">✓ Fixed Automatically</p>
                      <p className="mt-1 text-[10px] text-muted-foreground">Node C corrected during the read. Zero human intervention.</p>
                    </div>
                  )}
                </>
              )}

              {/* Replay Buttons */}
              {showButtons && (
                <div className="flex flex-col gap-2 opacity-0" style={{ animation: "fade-in-smooth 0.8s 0.5s ease-out both" }}>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Replay Demo</p>
                  <button
                    onClick={handleReplayReplication}
                    className="rounded-lg border border-[hsl(var(--teal-glow)/0.5)] bg-[hsl(var(--teal)/0.1)] px-3 py-2 text-left text-xs font-medium text-[hsl(var(--teal-glow))] transition-all hover:bg-[hsl(var(--teal)/0.2)] active:scale-95"
                    style={{ animation: "btn-pulse 3s 1s ease-in-out infinite" }}
                  >
                    📋 Replication
                  </button>
                  <button
                    onClick={handleReplayReadRepair}
                    className="rounded-lg border border-[hsl(var(--teal-glow)/0.5)] bg-[hsl(var(--teal)/0.1)] px-3 py-2 text-left text-xs font-medium text-[hsl(var(--teal-glow))] transition-all hover:bg-[hsl(var(--teal)/0.2)] active:scale-95"
                  >
                    🔧 Read Repair
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Bottom: Quorum bar + analogy */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div
            className="rounded-lg border-t-2 border-[hsl(var(--teal-glow)/0.7)] bg-card/30 p-2.5 opacity-0"
            style={{ animation: phase >= 10 ? "fade-in-up 0.6s 0.5s ease-out both" : "none" }}
          >
            <h4 className="text-xs font-semibold text-foreground">Quorum: Majority Decides</h4>
            <p className="mt-0.5 text-[10px] text-muted-foreground">With RF=3: W=2 (2 must confirm write), R=2 (2 must respond to read). Works even with 1 node down.</p>
          </div>
          <div
            className="rounded-lg border-t-2 border-[hsl(var(--teal-glow)/0.7)] bg-card/30 p-2.5 opacity-0"
            style={{ animation: phase >= 10 ? "fade-in-up 0.6s 0.8s ease-out both" : "none" }}
          >
            <h4 className="text-xs font-semibold text-foreground">Connection to Problem</h4>
            <p className="mt-0.5 text-[10px] text-muted-foreground">Server crashes mid-write? Other copies still have it. Copies disagree? Read Repair auto-fixes. Zero data loss.</p>
          </div>
        </div>
      </div>
      
      <SlideNav prev="/reliability" next="/wal" />
    </main>
  );
};

export default ReplicationSolution;
