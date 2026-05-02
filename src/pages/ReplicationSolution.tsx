import { useEffect, useRef, useState } from "react";
import EpamLogo from "@/components/EpamLogo";
import SlideBackdrop from "@/components/SlideBackdrop";
import SlideNav from "@/components/SlideNav";

const ReplicationSolution = () => {
  const [phase, setPhase] = useState(0);
  const animationStarted = useRef(false);

  useEffect(() => {
    if (animationStarted.current) return;
    animationStarted.current = true;

    // SLOW timeline - 25+ seconds
    const timers = [
      setTimeout(() => setPhase(1), 2000),   // Part A label
      setTimeout(() => setPhase(2), 3000),   // Client + write request
      setTimeout(() => setPhase(3), 5000),   // Node A receives
      setTimeout(() => setPhase(4), 7000),   // Replicate to B
      setTimeout(() => setPhase(5), 9000),   // Replicate to C
      setTimeout(() => setPhase(6), 11000),  // All nodes labeled
      setTimeout(() => setPhase(7), 13000),  // RF=3 label
      setTimeout(() => setPhase(8), 15000),  // Node A crashes
      setTimeout(() => setPhase(9), 17000),  // Data safe label
      setTimeout(() => setPhase(10), 19000), // Part B label
      setTimeout(() => setPhase(11), 20000), // Read request
      setTimeout(() => setPhase(12), 22000), // Responses from nodes
      setTimeout(() => setPhase(13), 24000), // Mismatch detected
      setTimeout(() => setPhase(14), 26000), // Repair arrow
      setTimeout(() => setPhase(15), 28000), // Node C fixed
      setTimeout(() => setPhase(16), 30000), // Quorum bar
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-hero">
      <SlideBackdrop />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-10 py-8 lg:px-16 lg:py-10">
        
        {/* Header */}
        <header className="mb-8">
          <div
            className="mb-3 opacity-0"
            style={{ animation: "fade-in-smooth 0.8s 0.3s ease-out both" }}
          >
            <span className="rounded-full border border-[hsl(var(--teal-glow)/0.4)] bg-[hsl(var(--teal)/0.15)] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.3em] text-[hsl(var(--teal-glow))]">
              Reliability · Solution 1 of 2
            </span>
          </div>
          <h1
            className="text-4xl font-bold tracking-tight text-foreground opacity-0 lg:text-5xl"
            style={{ animation: "fade-in-smooth 0.8s 0.6s ease-out both" }}
          >
            <span className="text-gradient-teal">Replication</span> + Read Repair
          </h1>
          <p
            className="mt-2 text-lg text-muted-foreground opacity-0 lg:text-xl"
            style={{ animation: "fade-in-smooth 0.8s 0.9s ease-out both" }}
          >
            Store multiple copies. Fix inconsistency on the fly.
          </p>
        </header>

        {/* Main Content - Two Parts Stacked */}
        <section className="relative flex flex-1 flex-col gap-8">
          
          {/* PART A: Replication */}
          <div className="flex-1">
            {phase >= 1 && (
              <div
                className="mb-6 opacity-0"
                style={{ animation: "fade-in-smooth 0.8s ease-out both" }}
              >
                <h3 className="text-xl font-bold text-[hsl(var(--teal-glow))]">
                  Part A: Replication
                </h3>
                <p className="text-sm text-muted-foreground">Write operation flows to multiple nodes</p>
              </div>
            )}

            <div className="relative flex items-center justify-between">
              
              {/* Client */}
              {phase >= 2 && (
                <div className="flex flex-col items-center gap-3 opacity-0" style={{ animation: "fade-scale-smooth 0.8s ease-out both" }}>
                  <div className="rounded-lg border-2 border-[hsl(var(--teal-glow)/0.5)] bg-card/40 p-4">
                    <svg viewBox="0 0 80 80" className="h-16 w-16">
                      <circle cx="40" cy="40" r="35" fill="hsl(var(--muted))" opacity="0.3" />
                      <text x="40" y="50" textAnchor="middle" fontSize="40">💻</text>
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-foreground">Client</p>
                  {phase >= 2 && (
                    <div className="mt-2 rounded border border-[hsl(var(--teal-glow))] bg-[hsl(var(--teal)/0.2)] px-3 py-1.5 opacity-0" style={{ animation: "fade-in-smooth 0.6s 0.5s ease-out both" }}>
                      <p className="text-xs font-mono text-[hsl(var(--teal-glow))]">X = 42</p>
                    </div>
                  )}
                </div>
              )}

              {/* Arrows to nodes */}
              {phase >= 3 && (
                <div className="flex flex-col gap-16">
                  {/* Arrow to A */}
                  <svg viewBox="0 0 120 20" className="h-6 w-32">
                    <defs>
                      <linearGradient id="replicateFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--teal-glow))" stopOpacity="0" />
                        <stop offset="50%" stopColor="hsl(var(--teal-glow))" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="hsl(var(--teal-glow))" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <line x1="10" y1="10" x2="110" y2="10" stroke="url(#replicateFlow)" strokeWidth="2" style={{ strokeDasharray: "8 4", animation: phase < 8 ? "flow-smooth 2s ease-in-out infinite" : "none", opacity: phase >= 8 ? 0.2 : 1 }} />
                    <polygon points="110,10 105,8 105,12" fill="hsl(var(--teal-glow))" opacity={phase >= 8 ? 0.2 : 0.8} />
                  </svg>

                  {/* Arrows to B and C */}
                  {phase >= 4 && (
                    <>
                      <svg viewBox="0 0 120 20" className="h-6 w-32">
                        <line x1="10" y1="10" x2="110" y2="10" stroke="url(#replicateFlow)" strokeWidth="2" style={{ strokeDasharray: "8 4", animation: "flow-smooth 2s 0.3s ease-in-out infinite" }} />
                        <polygon points="110,10 105,8 105,12" fill="hsl(var(--teal-glow))" opacity="0.8" />
                      </svg>
                      
                      <svg viewBox="0 0 120 20" className="h-6 w-32">
                        <line x1="10" y1="10" x2="110" y2="10" stroke="url(#replicateFlow)" strokeWidth="2" style={{ strokeDasharray: "8 4", animation: "flow-smooth 2s 0.6s ease-in-out infinite" }} />
                        <polygon points="110,10 105,8 105,12" fill="hsl(var(--teal-glow))" opacity="0.8" />
                      </svg>
                    </>
                  )}
                </div>
              )}

              {/* Three Nodes */}
              <div className="flex flex-col gap-8">
                {/* Node A */}
                {phase >= 3 && (
                  <div className="flex items-center gap-3 opacity-0" style={{ animation: "fade-scale-smooth 0.8s ease-out both" }}>
                    <div
                      className="relative flex h-24 w-24 flex-col items-center justify-center rounded-full border-4 transition-all duration-1000"
                      style={{
                        borderColor: phase >= 8 ? "hsl(28 90% 60%)" : "hsl(var(--teal-glow))",
                        backgroundColor: phase >= 8 ? "hsl(var(--muted)/0.3)" : "hsl(var(--teal)/0.3)",
                        filter: phase >= 8 ? "grayscale(0.6)" : "drop-shadow(0 0 12px hsl(var(--teal-glow) / 0.5))"
                      }}
                    >
                      <p className="text-lg font-bold" style={{ color: phase >= 8 ? "hsl(28 90% 60%)" : "hsl(var(--teal-glow))" }}>A</p>
                      <p className="text-xs font-mono text-foreground">X=42</p>
                      {phase >= 8 && (
                        <div className="absolute -right-4 -top-4 opacity-0" style={{ animation: "crash-dramatic 0.6s ease-out both" }}>
                          <svg viewBox="0 0 40 40" className="h-10 w-10">
                            <text x="20" y="26" textAnchor="middle" fontSize="24">⚡</text>
                          </svg>
                        </div>
                      )}
                    </div>
                    {phase >= 6 && (
                      <p className="text-xs text-muted-foreground opacity-0" style={{ animation: "fade-in-smooth 0.5s ease-out both" }}>Copy 1{phase >= 8 ? " (crashed)" : ""}</p>
                    )}
                  </div>
                )}

                {/* Node B */}
                {phase >= 4 && (
                  <div className="flex items-center gap-3 opacity-0" style={{ animation: "fade-scale-smooth 0.8s ease-out both" }}>
                    <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-4 border-[hsl(var(--teal-glow))] bg-[hsl(var(--teal)/0.3)]" style={{ filter: "drop-shadow(0 0 12px hsl(var(--teal-glow) / 0.5))" }}>
                      <p className="text-lg font-bold text-[hsl(var(--teal-glow))]">B</p>
                      <p className="text-xs font-mono text-foreground">X=42</p>
                    </div>
                    {phase >= 6 && (
                      <p className="text-xs text-muted-foreground opacity-0" style={{ animation: "fade-in-smooth 0.5s ease-out both" }}>Copy 2</p>
                    )}
                  </div>
                )}

                {/* Node C */}
                {phase >= 5 && (
                  <div className="flex items-center gap-3 opacity-0" style={{ animation: "fade-scale-smooth 0.8s ease-out both" }}>
                    <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-4 border-[hsl(var(--teal-glow))] bg-[hsl(var(--teal)/0.3)]" style={{ filter: "drop-shadow(0 0 12px hsl(var(--teal-glow) / 0.5))" }}>
                      <p className="text-lg font-bold text-[hsl(var(--teal-glow))]">C</p>
                      <p className="text-xs font-mono text-foreground">X=42</p>
                    </div>
                    {phase >= 6 && (
                      <p className="text-xs text-muted-foreground opacity-0" style={{ animation: "fade-in-smooth 0.5s ease-out both" }}>Copy 3</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* RF label */}
            {phase >= 7 && (
              <div className="mt-6 text-center opacity-0" style={{ animation: "fade-in-smooth 0.8s ease-out both" }}>
                <p className="text-sm font-semibold text-[hsl(var(--teal-glow))]">Replication Factor = 3</p>
                <p className="text-xs text-muted-foreground">Data survives even if 2 nodes die</p>
              </div>
            )}

            {/* Data safe message */}
            {phase >= 9 && (
              <div className="mt-4 flex justify-center opacity-0" style={{ animation: "fade-in-smooth 0.8s ease-out both" }}>
                <div className="rounded-lg border-2 border-[hsl(var(--teal-glow)/0.6)] bg-[hsl(var(--teal)/0.1)] px-6 py-2">
                  <p className="text-sm font-bold text-[hsl(var(--teal-glow))]">✓ Node A crashes. Data safe on B and C.</p>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          {phase >= 10 && (
            <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent opacity-0" style={{ animation: "fade-in-smooth 0.8s ease-out both" }} />
          )}

          {/* PART B: Read Repair */}
          {phase >= 10 && (
            <div className="flex-1">
              <div className="mb-6 opacity-0" style={{ animation: "fade-in-smooth 0.8s ease-out both" }}>
                <h3 className="text-xl font-bold text-[hsl(var(--teal-glow))]">Part B: Read Repair</h3>
                <p className="text-sm text-muted-foreground">What happens when replicas disagree</p>
              </div>

              <div className="relative flex items-center justify-between">
                {/* Client read */}
                {phase >= 11 && (
                  <div className="flex flex-col items-center gap-3 opacity-0" style={{ animation: "fade-scale-smooth 0.8s ease-out both" }}>
                    <div className="rounded-lg border-2 border-[hsl(var(--teal-glow)/0.5)] bg-card/40 p-4">
                      <svg viewBox="0 0 80 80" className="h-16 w-16">
                        <circle cx="40" cy="40" r="35" fill="hsl(var(--muted))" opacity="0.3" />
                        <text x="40" y="50" textAnchor="middle" fontSize="40">💻</text>
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-foreground">Client</p>
                    <div className="mt-2 rounded border border-[hsl(var(--teal-glow))] bg-[hsl(var(--teal)/0.2)] px-3 py-1.5">
                      <p className="text-xs font-mono text-[hsl(var(--teal-glow))]">Read X</p>
                    </div>
                  </div>
                )}

                {/* Response arrows */}
                {phase >= 12 && (
                  <div className="flex flex-col gap-16">
                    {[0, 0.3, 0.6].map((delay, idx) => (
                      <svg key={idx} viewBox="0 0 120 20" className="h-6 w-32">
                        <line x1="110" y1="10" x2="10" y2="10" stroke="hsl(var(--teal-glow))" strokeWidth="2" opacity="0" style={{ animation: `fade-in-smooth 0.6s ${delay}s ease-out both`, strokeDasharray: "4 2" }} />
                        <polygon points="10,10 15,8 15,12" fill="hsl(var(--teal-glow))" opacity="0" style={{ animation: `fade-in-smooth 0.6s ${delay}s ease-out both` }} />
                      </svg>
                    ))}
                  </div>
                )}

                {/* Three nodes with responses */}
                <div className="flex flex-col gap-8">
                  {[
                    { id: "A", value: "42", isStale: false },
                    { id: "B", value: "42", isStale: false },
                    { id: "C", value: "39", isStale: true }
                  ].map((node, idx) => (
                    phase >= 12 && (
                      <div key={node.id} className="flex items-center gap-3 opacity-0" style={{ animation: `fade-scale-smooth 0.6s ${idx * 0.2}s ease-out both` }}>
                        <div
                          className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-4 transition-all duration-1000"
                          style={{
                            borderColor: phase >= 15 || !node.isStale ? "hsl(var(--teal-glow))" : "hsl(28 90% 60%)",
                            backgroundColor: phase >= 15 || !node.isStale ? "hsl(var(--teal)/0.3)" : "hsl(28 90% 60% / 0.2)",
                            filter: `drop-shadow(0 0 12px ${phase >= 15 || !node.isStale ? "hsl(var(--teal-glow) / 0.5)" : "hsl(28 90% 60% / 0.5)"})`
                          }}
                        >
                          <p className="text-lg font-bold" style={{ color: phase >= 15 || !node.isStale ? "hsl(var(--teal-glow))" : "hsl(28 90% 60%)" }}>{node.id}</p>
                          <p className="text-xs font-mono text-foreground">X={phase >= 15 && node.isStale ? "42" : node.value}</p>
                        </div>
                        <p className="text-xs" style={{ color: phase >= 15 || !node.isStale ? "hsl(var(--teal-glow))" : "hsl(28 90% 60%)" }}>
                          {phase >= 15 && node.isStale ? "✓ Fixed" : node.isStale ? "Stale!" : "✓ OK"}
                        </p>
                      </div>
                    )
                  ))}
                </div>
              </div>

              {/* Mismatch detected */}
              {phase >= 13 && (
                <div className="mt-6 text-center opacity-0" style={{ animation: "fade-in-smooth 0.8s ease-out both" }}>
                  <div className="inline-block rounded-lg border border-[hsl(28_90%_60%/0.6)] bg-[hsl(28_90%_60%/0.1)] px-4 py-2">
                    <p className="text-sm font-semibold text-[hsl(28_90%_60%)]">⚠️ Mismatch detected: Node C has stale value</p>
                  </div>
                </div>
              )}

              {/* Repair complete */}
              {phase >= 15 && (
                <div className="mt-4 flex justify-center opacity-0" style={{ animation: "fade-in-smooth 0.8s ease-out both" }}>
                  <div className="rounded-lg border-2 border-[hsl(var(--teal-glow)/0.6)] bg-[hsl(var(--teal)/0.1)] px-6 py-2">
                    <p className="text-sm font-bold text-[hsl(var(--teal-glow))]">✓ Inconsistency detected during read. Fixed automatically.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Quorum Section */}
        {phase >= 16 && (
          <section className="mt-4 opacity-0" style={{ animation: "slide-up-smooth 0.8s ease-out both" }}>
            <div className="rounded-lg border-t-2 border-[hsl(var(--teal-glow)/0.7)] bg-card/30 p-4 backdrop-blur-sm">
              <h4 className="mb-2 font-semibold text-foreground">Quorum: Majority must agree</h4>
              <p className="text-xs leading-relaxed text-muted-foreground">
                With 3 replicas, <span className="font-bold text-[hsl(var(--teal-glow))]">2 must confirm a write (W=2)</span> and <span className="font-bold text-[hsl(var(--teal-glow))]">2 must respond to a read (R=2)</span>. System works even if 1 node is down.
              </p>
            </div>
          </section>
        )}

        {/* Bottom */}
        {phase >= 16 && (
          <div className="mt-4 flex items-end justify-between">
            <p className="max-w-md text-xs italic text-muted-foreground opacity-0" style={{ animation: "fade-in-smooth 0.8s 1s ease-out both" }}>
              "Photocopy every important document. Store copies in different offices. If one office burns down, the others still have it."
            </p>
            <div className="opacity-0" style={{ animation: "fade-in-smooth 0.8s 1.3s ease-out both" }}>
              <EpamLogo />
            </div>
          </div>
        )}
      </div>

      <SlideNav prev="/reliability" next="/wal" />
    </main>
  );
};

export default ReplicationSolution;
