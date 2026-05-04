import { useEffect, useRef, useState } from "react";
import EpamLogo from "@/components/EpamLogo";
import SlideBackdrop from "@/components/SlideBackdrop";
import SlideNav from "@/components/SlideNav";

const WALSolution = () => {
  const [phase, setPhase] = useState(0);
  const animationStarted = useRef(false);

  useEffect(() => {
    if (animationStarted.current) return;
    animationStarted.current = true;

    // SLOW timeline - 33+ seconds total
    const timers = [
      setTimeout(() => setPhase(1), 2000),   // Part A label
      setTimeout(() => setPhase(2), 3500),   // Client appears
      setTimeout(() => setPhase(3), 5000),   // Write request
      setTimeout(() => setPhase(4), 7000),   // Step 1: Log to WAL
      setTimeout(() => setPhase(5), 9000),   // WAL shows entry
      setTimeout(() => setPhase(6), 11000),  // Step 2: Write to data store
      setTimeout(() => setPhase(7), 13000),  // Data store shows entry
      setTimeout(() => setPhase(8), 15000),  // Step 3: Success response
      setTimeout(() => setPhase(9), 17000),  // Success message to client
      setTimeout(() => setPhase(10), 19000), // Part B label
      setTimeout(() => setPhase(11), 20500), // Crashed node appears
      setTimeout(() => setPhase(12), 22000), // Restart animation
      setTimeout(() => setPhase(13), 24000), // Load snapshot
      setTimeout(() => setPhase(14), 26000), // Snapshot data shown
      setTimeout(() => setPhase(15), 28000), // Replay WAL
      setTimeout(() => setPhase(16), 30000), // Apply missing entries
      setTimeout(() => setPhase(17), 32000), // Recovered state
      setTimeout(() => setPhase(18), 34000), // Info cards appear
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-hero">
      <SlideBackdrop />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-10 py-8 lg:px-16 lg:py-10">
        
        {/* Header */}
        <header className="mb-6">
          <div
            className="mb-3 opacity-0"
            style={{ animation: "fade-in-smooth 0.8s 0.3s ease-out both" }}
          >
            <span className="rounded-full border border-[hsl(var(--teal-glow)/0.4)] bg-[hsl(var(--teal)/0.15)] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.3em] text-[hsl(var(--teal-glow))]">
              Reliability · Solution 2 of 2
            </span>
          </div>
          <h1
            className="text-4xl font-bold tracking-tight text-foreground opacity-0 lg:text-5xl"
            style={{ animation: "fade-in-smooth 0.8s 0.6s ease-out both" }}
          >
            <span className="text-gradient-teal">Write-Ahead Log</span> (WAL)
          </h1>
          <p
            className="mt-2 text-lg text-muted-foreground opacity-0 lg:text-xl"
            style={{ animation: "fade-in-smooth 0.8s 0.9s ease-out both" }}
          >
            Log intent first. Crash between log and commit? Recoverable.
          </p>
        </header>

        {/* Main Content - Two Parts Stacked */}
        <section className="relative flex flex-1 flex-col gap-6">
          
          {/* PART A: Write Path */}
          <div className="flex-1">
            {phase >= 1 && (
              <div
                className="mb-4 opacity-0"
                style={{ animation: "fade-in-smooth 0.8s ease-out both" }}
              >
                <h3 className="text-xl font-bold text-[hsl(var(--teal-glow))]">
                  Part A: Write Path
                </h3>
                <p className="text-sm text-muted-foreground">Intent is logged BEFORE data is written</p>
              </div>
            )}

            <div className="relative flex items-center justify-center gap-8">
              
              {/* Client */}
              {phase >= 2 && (
                <div className="flex flex-col items-center gap-3 opacity-0" style={{ animation: "fade-scale-smooth 0.8s ease-out both" }}>
                  <div className="rounded-lg border-2 border-[hsl(var(--teal-glow)/0.5)] bg-card/40 p-3">
                    <svg viewBox="0 0 60 60" className="h-12 w-12">
                      <circle cx="30" cy="30" r="25" fill="hsl(var(--muted))" opacity="0.3" />
                      <text x="30" y="38" textAnchor="middle" fontSize="30">💻</text>
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-foreground">Client</p>
                  {phase >= 3 && (
                    <div className="mt-1 rounded border border-[hsl(var(--teal-glow))] bg-[hsl(var(--teal)/0.2)] px-3 py-1 opacity-0" style={{ animation: "fade-in-smooth 0.6s 0.3s ease-out both" }}>
                      <p className="text-[11px] font-mono text-[hsl(var(--teal-glow))]">Write(X, 99)</p>
                    </div>
                  )}
                </div>
              )}

              {/* Arrow 1: Client to WAL */}
              {phase >= 4 && (
                <div className="flex flex-col items-center gap-1">
                  <svg viewBox="0 0 100 20" className="h-6 w-24">
                    <defs>
                      <linearGradient id="walFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--teal-glow))" stopOpacity="0" />
                        <stop offset="50%" stopColor="hsl(var(--teal-glow))" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="hsl(var(--teal-glow))" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <line x1="5" y1="10" x2="90" y2="10" stroke="url(#walFlow)" strokeWidth="2.5" style={{ strokeDasharray: "8 4", animation: "wal-write 1.5s ease-in-out infinite" }} />
                    <polygon points="90,10 85,8 85,12" fill="hsl(var(--teal-glow))" opacity="0.8" />
                  </svg>
                  <div className="rounded bg-[hsl(var(--teal)/0.15)] px-2 py-0.5 opacity-0" style={{ animation: "fade-in-smooth 0.5s 0.3s ease-out both" }}>
                    <p className="text-[10px] font-bold text-[hsl(var(--teal-glow))]">① Log</p>
                  </div>
                </div>
              )}

              {/* WAL */}
              {phase >= 4 && (
                <div className="flex flex-col items-center gap-2 opacity-0" style={{ animation: "fade-scale-smooth 0.8s ease-out both" }}>
                  <div 
                    className="flex h-32 w-40 flex-col items-start justify-start gap-1 rounded-lg border-2 border-[hsl(var(--teal-glow)/0.7)] bg-[hsl(var(--teal)/0.2)] p-3"
                    style={{ filter: "drop-shadow(0 0 12px hsl(var(--teal-glow) / 0.5))" }}
                  >
                    <p className="mb-1 text-xs font-bold text-[hsl(var(--teal-glow))]">WAL</p>
                    <div className="h-px w-full bg-[hsl(var(--teal-glow)/0.3)]" />
                    
                    {/* WAL entries */}
                    {phase >= 5 && (
                      <div className="mt-1 w-full space-y-1">
                        <div className="rounded bg-[hsl(var(--background)/0.5)] px-2 py-1 opacity-0" style={{ animation: "wal-write 0.6s ease-out both" }}>
                          <p className="text-[10px] font-mono text-foreground">LSN:42</p>
                          <p className="text-[10px] font-mono text-[hsl(var(--teal-glow))]">X=99</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground">Append-Only Log</p>
                </div>
              )}

              {/* Arrow 2: WAL to Data Store */}
              {phase >= 6 && (
                <div className="flex flex-col items-center gap-1">
                  <svg viewBox="0 0 100 20" className="h-6 w-24">
                    <line x1="5" y1="10" x2="90" y2="10" stroke="url(#walFlow)" strokeWidth="2.5" style={{ strokeDasharray: "8 4", animation: "wal-write 1.5s 0.3s ease-in-out infinite" }} />
                    <polygon points="90,10 85,8 85,12" fill="hsl(var(--teal-glow))" opacity="0.8" />
                  </svg>
                  <div className="rounded bg-[hsl(var(--teal)/0.15)] px-2 py-0.5 opacity-0" style={{ animation: "fade-in-smooth 0.5s 0.3s ease-out both" }}>
                    <p className="text-[10px] font-bold text-[hsl(var(--teal-glow))]">② Write</p>
                  </div>
                </div>
              )}

              {/* Data Store */}
              {phase >= 6 && (
                <div className="flex flex-col items-center gap-2 opacity-0" style={{ animation: "fade-scale-smooth 0.8s ease-out both" }}>
                  <div 
                    className="flex h-32 w-40 flex-col items-start justify-start gap-1 rounded-lg border-2 border-[hsl(var(--teal-glow)/0.7)] bg-[hsl(var(--teal)/0.2)] p-3"
                    style={{ filter: "drop-shadow(0 0 12px hsl(var(--teal-glow) / 0.5))" }}
                  >
                    <p className="mb-1 text-xs font-bold text-[hsl(var(--teal-glow))]">Data Store</p>
                    <div className="h-px w-full bg-[hsl(var(--teal-glow)/0.3)]" />
                    
                    {phase >= 7 && (
                      <div className="mt-1 w-full space-y-1">
                        <div className="rounded bg-[hsl(var(--background)/0.5)] px-2 py-1 opacity-0" style={{ animation: "wal-write 0.6s ease-out both" }}>
                          <p className="text-[10px] font-mono text-foreground">Key: X</p>
                          <p className="text-[10px] font-mono text-[hsl(var(--teal-glow))]">Val: 99</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground">Main Storage</p>
                </div>
              )}

              {/* Arrow 3: Response back to client */}
              {phase >= 8 && (
                <div className="flex flex-col items-center gap-1">
                  <svg viewBox="0 0 100 20" className="h-6 w-24">
                    <line x1="90" y1="10" x2="5" y2="10" stroke="hsl(var(--teal-glow))" strokeWidth="2.5" opacity="0" style={{ animation: "fade-in-smooth 0.6s ease-out both", strokeDasharray: "4 2" }} />
                    <polygon points="5,10 10,8 10,12" fill="hsl(var(--teal-glow))" opacity="0" style={{ animation: "fade-in-smooth 0.6s ease-out both" }} />
                  </svg>
                  <div className="rounded bg-[hsl(var(--teal)/0.15)] px-2 py-0.5 opacity-0" style={{ animation: "fade-in-smooth 0.5s 0.3s ease-out both" }}>
                    <p className="text-[10px] font-bold text-[hsl(var(--teal-glow))]">③ Success</p>
                  </div>
                </div>
              )}
            </div>

            {/* Success message */}
            {phase >= 9 && (
              <div className="mt-6 flex justify-center opacity-0" style={{ animation: "fade-in-smooth 0.8s ease-out both" }}>
                <div className="rounded-lg border-2 border-[hsl(var(--teal-glow)/0.6)] bg-[hsl(var(--teal)/0.1)] px-6 py-2">
                  <p className="text-sm font-bold text-[hsl(var(--teal-glow))]">✓ Intent logged in WAL. Safe to acknowledge.</p>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          {phase >= 10 && (
            <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent opacity-0" style={{ animation: "fade-in-smooth 0.8s ease-out both" }} />
          )}

          {/* PART B: Crash Recovery */}
          {phase >= 10 && (
            <div className="flex-1">
              <div className="mb-4 opacity-0" style={{ animation: "fade-in-smooth 0.8s ease-out both" }}>
                <h3 className="text-xl font-bold text-[hsl(var(--teal-glow))]">Part B: Crash Recovery</h3>
                <p className="text-sm text-muted-foreground">Node restarts and replays missing operations</p>
              </div>

              <div className="relative flex items-center justify-center gap-8">
                
                {/* Crashed Node */}
                {phase >= 11 && (
                  <div className="flex flex-col items-center gap-2 opacity-0" style={{ animation: "fade-scale-smooth 0.8s ease-out both" }}>
                    <div 
                      className="relative flex h-28 w-28 flex-col items-center justify-center rounded-lg border-4 border-[hsl(28_90%_60%)] bg-[hsl(var(--muted)/0.3)]"
                      style={{ filter: "grayscale(0.6) drop-shadow(0 0 15px hsl(28 90% 60% / 0.6))" }}
                    >
                      <p className="text-lg font-bold text-[hsl(28_90%_60%)]">Node</p>
                      <p className="text-xs text-muted-foreground">Crashed</p>
                      <div className="absolute -right-3 -top-3 opacity-0" style={{ animation: "crash-dramatic 0.6s ease-out both" }}>
                        <svg viewBox="0 0 40 40" className="h-10 w-10">
                          <text x="20" y="26" textAnchor="middle" fontSize="24">⚡</text>
                        </svg>
                      </div>
                    </div>
                    <p className="text-[10px] text-[hsl(28_90%_60%)]">Power Loss</p>
                  </div>
                )}

                {/* Arrow: Restart */}
                {phase >= 12 && (
                  <div className="flex flex-col items-center gap-1">
                  <svg viewBox="0 0 80 20" className="h-6 w-20">
                    <defs>
                      <linearGradient id="restartFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--teal-glow))" stopOpacity="0" />
                        <stop offset="50%" stopColor="hsl(var(--teal-glow))" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="hsl(var(--teal-glow))" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <line x1="5" y1="10" x2="70" y2="10" stroke="url(#restartFlow)" strokeWidth="2.5" style={{ strokeDasharray: "8 4", animation: "wal-write 1.5s ease-in-out infinite" }} />
                    <polygon points="70,10 65,8 65,12" fill="hsl(var(--teal-glow))" opacity="0.8" />
                  </svg>
                  <div className="rounded bg-[hsl(var(--teal)/0.15)] px-2 py-0.5 opacity-0" style={{ animation: "fade-in-smooth 0.5s 0.3s ease-out both" }}>
                    <p className="text-[10px] font-bold text-[hsl(var(--teal-glow))]">Restart</p>
                  </div>
                </div>
                )}

                {/* Snapshot Load */}
                {phase >= 13 && (
                  <div className="flex flex-col items-center gap-2 opacity-0" style={{ animation: "fade-scale-smooth 0.8s ease-out both" }}>
                    <div 
                      className="flex h-28 w-36 flex-col items-start justify-start gap-1 rounded-lg border-2 border-[hsl(var(--teal-glow)/0.5)] bg-[hsl(var(--teal)/0.15)] p-2"
                    >
                      <p className="text-xs font-bold text-[hsl(var(--teal-glow))]">Snapshot</p>
                      <div className="h-px w-full bg-[hsl(var(--teal-glow)/0.2)]" />
                      {phase >= 14 && (
                        <div className="mt-1 w-full space-y-1 opacity-0" style={{ animation: "fade-in-smooth 0.6s ease-out both" }}>
                          <div className="rounded bg-[hsl(var(--background)/0.4)] px-2 py-0.5">
                            <p className="text-[9px] font-mono text-muted-foreground">A=10, B=20</p>
                          </div>
                          <p className="text-[9px] text-muted-foreground">@ LSN:40</p>
                        </div>
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground">Load Last Snapshot</p>
                  </div>
                )}

                {/* Arrow: Replay */}
                {phase >= 15 && (
                  <div className="flex flex-col items-center gap-1">
                    <svg viewBox="0 0 80 20" className="h-6 w-20">
                      <line x1="5" y1="10" x2="70" y2="10" stroke="url(#restartFlow)" strokeWidth="2.5" style={{ strokeDasharray: "8 4", animation: "wal-write 1.5s 0.3s ease-in-out infinite" }} />
                      <polygon points="70,10 65,8 65,12" fill="hsl(var(--teal-glow))" opacity="0.8" />
                    </svg>
                    <div className="rounded bg-[hsl(var(--teal)/0.15)] px-2 py-0.5 opacity-0" style={{ animation: "fade-in-smooth 0.5s 0.3s ease-out both" }}>
                      <p className="text-[10px] font-bold text-[hsl(var(--teal-glow))]">Replay</p>
                    </div>
                  </div>
                )}

                {/* WAL Replay */}
                {phase >= 15 && (
                  <div className="flex flex-col items-center gap-2 opacity-0" style={{ animation: "fade-scale-smooth 0.8s ease-out both" }}>
                    <div 
                      className="flex h-28 w-36 flex-col items-start justify-start gap-1 rounded-lg border-2 border-[hsl(var(--teal-glow)/0.7)] bg-[hsl(var(--teal)/0.2)] p-2"
                      style={{ filter: "drop-shadow(0 0 12px hsl(var(--teal-glow) / 0.5))" }}
                    >
                      <p className="text-xs font-bold text-[hsl(var(--teal-glow))]">WAL</p>
                      <div className="h-px w-full bg-[hsl(var(--teal-glow)/0.3)]" />
                      {phase >= 16 && (
                        <div className="mt-1 w-full space-y-1 opacity-0" style={{ animation: "fade-in-smooth 0.6s ease-out both" }}>
                          <div className="rounded bg-[hsl(var(--background)/0.5)] px-2 py-0.5">
                            <p className="text-[9px] font-mono text-[hsl(var(--teal-glow))]">LSN:41 C=30</p>
                          </div>
                          <div className="rounded bg-[hsl(var(--background)/0.5)] px-2 py-0.5">
                            <p className="text-[9px] font-mono text-[hsl(var(--teal-glow))]">LSN:42 X=99</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground">Apply Missing Ops</p>
                  </div>
                )}

                {/* Arrow: Result */}
                {phase >= 17 && (
                  <div className="flex flex-col items-center gap-1">
                    <svg viewBox="0 0 80 20" className="h-6 w-20">
                      <line x1="5" y1="10" x2="70" y2="10" stroke="hsl(var(--teal-glow))" strokeWidth="2.5" opacity="0" style={{ animation: "fade-in-smooth 0.6s ease-out both", strokeDasharray: "4 2" }} />
                      <polygon points="70,10 65,8 65,12" fill="hsl(var(--teal-glow))" opacity="0" style={{ animation: "fade-in-smooth 0.6s ease-out both" }} />
                    </svg>
                    <div className="rounded bg-[hsl(var(--teal)/0.15)] px-2 py-0.5 opacity-0" style={{ animation: "fade-in-smooth 0.5s 0.3s ease-out both" }}>
                      <p className="text-[10px] font-bold text-[hsl(var(--teal-glow))]">Done</p>
                    </div>
                  </div>
                )}

                {/* Recovered Node */}
                {phase >= 17 && (
                  <div className="flex flex-col items-center gap-2 opacity-0" style={{ animation: "fade-scale-smooth 0.8s ease-out both" }}>
                    <div 
                      className="flex h-28 w-28 flex-col items-center justify-center rounded-lg border-4 border-[hsl(var(--teal-glow))] bg-[hsl(var(--teal)/0.3)]"
                      style={{ filter: "drop-shadow(0 0 16px hsl(var(--teal-glow) / 0.7))" }}
                    >
                      <p className="text-lg font-bold text-[hsl(var(--teal-glow))]">Node</p>
                      <p className="text-xs text-[hsl(var(--teal-glow))]">Recovered</p>
                      <div className="mt-1 text-[10px] font-mono text-foreground">X=99 ✓</div>
                    </div>
                    <p className="text-[10px] text-[hsl(var(--teal-glow))]">Fully Consistent</p>
                  </div>
                )}
              </div>

              {/* Recovery complete message */}
              {phase >= 17 && (
                <div className="mt-6 flex justify-center opacity-0" style={{ animation: "fade-in-smooth 0.8s ease-out both" }}>
                  <div className="rounded-lg border-2 border-[hsl(var(--teal-glow)/0.6)] bg-[hsl(var(--teal)/0.1)] px-6 py-2">
                    <p className="text-sm font-bold text-[hsl(var(--teal-glow))]">✓ Crash happened between log and commit. Data recovered from WAL.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Info Cards - Bottom */}
        {phase >= 18 && (
          <section className="mt-4 opacity-0" style={{ animation: "slide-up-smooth 0.8s ease-out both" }}>
            <div className="grid grid-cols-3 gap-4">
              {/* Card 1 */}
              <div className="rounded-lg border border-[hsl(var(--teal-glow)/0.3)] bg-card/30 p-3 backdrop-blur-sm">
                <h4 className="mb-1 text-xs font-bold text-[hsl(var(--teal-glow))]">Append-Only</h4>
                <p className="text-[10px] leading-relaxed text-muted-foreground">
                  Sequential writes are faster than random. No seeks, no overwrites.
                </p>
              </div>

              {/* Card 2 */}
              <div className="rounded-lg border border-[hsl(var(--teal-glow)/0.3)] bg-card/30 p-3 backdrop-blur-sm">
                <h4 className="mb-1 text-xs font-bold text-[hsl(var(--teal-glow))]">Periodic Snapshots</h4>
                <p className="text-[10px] leading-relaxed text-muted-foreground">
                  Save state at LSN checkpoints. Only replay WAL entries after last snapshot.
                </p>
              </div>

              {/* Card 3 */}
              <div className="rounded-lg border border-[hsl(var(--teal-glow)/0.3)] bg-card/30 p-3 backdrop-blur-sm">
                <h4 className="mb-1 text-xs font-bold text-[hsl(var(--teal-glow))]">Idempotent Replay</h4>
                <p className="text-[10px] leading-relaxed text-muted-foreground">
                  Applying same operation twice yields same result. Safe to re-execute.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Bottom */}
        {phase >= 18 && (
          <div className="mt-4 flex items-end justify-between">
            <p className="max-w-lg text-xs italic text-muted-foreground opacity-0" style={{ animation: "fade-in-smooth 0.8s 1s ease-out both" }}>
              "Before making any change, write it in your diary. If you forget what you were doing, read the diary and continue from where you left off."
            </p>
            <div className="opacity-0" style={{ animation: "fade-in-smooth 0.8s 1.3s ease-out both" }}>
              <EpamLogo />
            </div>
          </div>
        )}
      </div>

      <SlideNav prev="/replication" next="/bridge" />
    </main>
  );
};

export default WALSolution;
