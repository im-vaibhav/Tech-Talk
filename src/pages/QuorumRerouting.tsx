import { useEffect, useRef, useState } from "react";
import EpamLogo from "@/components/EpamLogo";
import SlideBackdrop from "@/components/SlideBackdrop";
import SlideNav from "@/components/SlideNav";

const QuorumRerouting = () => {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const animationStarted = useRef(false);

  useEffect(() => {
    if (animationStarted.current) return;
    animationStarted.current = true;
  }, []);

  useEffect(() => {
    if (paused) return;
    
    // 2.5 seconds per step (slower, clear)
    const timer = setTimeout(() => {
      if (step < 12) {
        setStep(s => s + 1);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [step, paused]);

  const reset = () => {
    setStep(0);
    setPaused(false);
  };

  // Colors
  const TEAL_GLOW = "hsl(186 90% 55%)";
  const GRAY_DEAD = "#666666";

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
              Availability · Solution 2 of 2
            </span>
          </div>
          <h1
            className="text-3xl font-bold tracking-tight text-foreground opacity-0 lg:text-4xl"
            style={{ animation: "fade-in-smooth 0.8s 0.6s ease-out both" }}
          >
            <span className="text-gradient-teal">Quorum + Automatic Rerouting</span>
          </h1>
          <p
            className="mt-2 text-base text-muted-foreground opacity-0 lg:text-lg"
            style={{ animation: "fade-in-smooth 0.8s 0.9s ease-out both" }}
          >
            A majority decides. Traffic moves in seconds. Users never notice.
          </p>
        </header>

        {/* Controls */}
        <div className="mb-3 flex items-center justify-between">
          <div className="rounded-lg border border-border/50 bg-card/30 px-3 py-1.5">
            <p className="text-xs font-semibold text-foreground">
              {step < 5 && "Part A: Quorum — Majority Rules"}
              {step >= 5 && step < 9 && "Part B: Automatic Traffic Rerouting"}
              {step >= 9 && "Summary: Full Chain"}
            </p>
          </div>

          <div className="flex gap-2">
            {step < 12 && (
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
        <section className="relative flex flex-1 flex-col justify-center gap-4">
          
          {/* PART A: Quorum */}
          <div className="flex-1">
            {step >= 1 && (
              <h3 className="mb-3 text-center text-base font-bold text-[hsl(var(--teal-glow))] opacity-0" style={{ animation: "fade-in-smooth 0.6s ease-out both" }}>
                Quorum: Majority Rules
              </h3>
            )}

            <div className="flex flex-col gap-6">
              
              {/* Scenario 1: Normal write (3 of 3) */}
              {step >= 1 && step < 4 && (
                <div className="flex items-center justify-center gap-8">
                  {/* Client/Write Request */}
                  <div className="opacity-0" style={{ animation: "fade-scale-smooth 0.6s ease-out both" }}>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--teal)/0.2)] text-2xl">
                        💾
                      </div>
                      <p className="text-xs font-semibold text-foreground">Write</p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="opacity-0" style={{ animation: "fade-in-smooth 0.6s 0.3s ease-out both" }}>
                    <svg viewBox="0 0 80 20" className="h-6 w-20">
                      <defs>
                        <marker id="arrowTeal" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" viewBox="0 0 8 8">
                          <path d="M 0 0 L 8 4 L 0 8 z" fill={TEAL_GLOW} />
                        </marker>
                      </defs>
                      <line x1="5" y1="10" x2="75" y2="10" stroke={TEAL_GLOW} strokeWidth="2" markerEnd="url(#arrowTeal)" />
                    </svg>
                  </div>

                  {/* Three nodes */}
                  <div className="flex gap-4">
                    {["A", "B", "C"].map((node, idx) => (
                      <div key={node} className="opacity-0" style={{ animation: `fade-scale-smooth 0.6s ${0.4 + idx * 0.1}s ease-out both` }}>
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className="flex h-14 w-14 items-center justify-center rounded-full border-2"
                            style={{
                              borderColor: TEAL_GLOW,
                              backgroundColor: "hsl(220 25% 20%)",
                              filter: "drop-shadow(0 0 8px hsl(186 90% 55% / 0.4))",
                            }}
                          >
                            <p className="text-sm font-bold text-foreground">{node}</p>
                          </div>
                          {step >= 2 && (
                            <div className="opacity-0" style={{ animation: `fade-scale-smooth 0.5s ${0.2 * idx}s ease-out both` }}>
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[hsl(var(--teal))]">
                                <span className="text-xs font-bold text-white">✓</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Success message */}
                  {step >= 3 && (
                    <div className="opacity-0" style={{ animation: "fade-scale-smooth 0.6s ease-out both" }}>
                      <div className="rounded-lg border-2 border-[hsl(var(--teal-glow))] bg-[hsl(var(--teal)/0.1)] px-4 py-2">
                        <p className="text-xs font-bold text-[hsl(var(--teal-glow))]">✓ Write successful</p>
                        <p className="text-[10px] text-muted-foreground">3 of 3 agree</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Scenario 2: Write with 1 node down (2 of 3) */}
              {step >= 4 && step < 9 && (
                <div className="flex items-center justify-center gap-8">
                  {/* Client/Write Request */}
                  <div className="opacity-0" style={{ animation: "fade-scale-smooth 0.6s ease-out both" }}>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--teal)/0.2)] text-2xl">
                        💾
                      </div>
                      <p className="text-xs font-semibold text-foreground">Write</p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="opacity-0" style={{ animation: "fade-in-smooth 0.6s 0.3s ease-out both" }}>
                    <svg viewBox="0 0 80 20" className="h-6 w-20">
                      <line x1="5" y1="10" x2="75" y2="10" stroke={TEAL_GLOW} strokeWidth="2" markerEnd="url(#arrowTeal)" />
                    </svg>
                  </div>

                  {/* Three nodes - C is dead */}
                  <div className="flex gap-4">
                    {["A", "B", "C"].map((node, idx) => {
                      const isDead = node === "C";
                      return (
                        <div key={node} className="opacity-0" style={{ animation: `fade-scale-smooth 0.6s ${0.4 + idx * 0.1}s ease-out both` }}>
                          <div className="flex flex-col items-center gap-2">
                            <div
                              className="flex h-14 w-14 items-center justify-center rounded-full border-2"
                              style={{
                                borderColor: isDead ? GRAY_DEAD : TEAL_GLOW,
                                backgroundColor: isDead ? "#1a1a1a" : "hsl(220 25% 20%)",
                                filter: isDead ? "grayscale(1)" : "drop-shadow(0 0 8px hsl(186 90% 55% / 0.4))",
                                transition: "all 1s ease",
                              }}
                            >
                              <p className="text-sm font-bold" style={{ color: isDead ? "#888888" : "#F1F5F9", transition: "color 1s ease" }}>
                                {node}
                              </p>
                            </div>
                            {step >= 5 && (
                              <>
                                {!isDead && (
                                  <div className="opacity-0" style={{ animation: `fade-scale-smooth 0.5s ${0.2 * idx}s ease-out both` }}>
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[hsl(var(--teal))]">
                                      <span className="text-xs font-bold text-white">✓</span>
                                    </div>
                                  </div>
                                )}
                                {isDead && (
                                  <div className="opacity-0" style={{ animation: "fade-scale-smooth 0.5s 0.4s ease-out both" }}>
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[hsl(var(--destructive)/0.3)]">
                                      <span className="text-xs font-bold text-[hsl(var(--destructive))]">✗</span>
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Success message */}
                  {step >= 6 && (
                    <div className="opacity-0" style={{ animation: "fade-scale-smooth 0.6s ease-out both" }}>
                      <div className="rounded-lg border-2 border-[hsl(var(--teal-glow))] bg-[hsl(var(--teal)/0.1)] px-4 py-2">
                        <p className="text-xs font-bold text-[hsl(var(--teal-glow))]">✓ Write successful</p>
                        <p className="text-[10px] text-muted-foreground">2 of 3 agree</p>
                        <p className="text-[10px] font-semibold text-foreground">Quorum met</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Quorum formula */}
              {step >= 7 && step < 9 && (
                <div className="flex justify-center opacity-0" style={{ animation: "fade-in-smooth 0.8s ease-out both" }}>
                  <div className="rounded-lg border border-border/50 bg-card/40 px-6 py-3">
                    <p className="text-center text-sm font-semibold text-foreground">
                      Quorum = <span className="text-[hsl(var(--teal-glow))]">(N / 2) + 1</span>
                    </p>
                    <p className="mt-1 text-center text-xs text-muted-foreground">
                      With 3 nodes, 2 must agree. Operations continue despite failures.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          {step >= 8 && (
            <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent opacity-0" style={{ animation: "fade-in-smooth 0.6s ease-out both" }} />
          )}

          {/* PART B: Automatic Rerouting */}
          {step >= 8 && (
            <div className="flex-1">
              <h3 className="mb-3 text-center text-base font-bold text-[hsl(var(--teal-glow))] opacity-0" style={{ animation: "fade-in-smooth 0.6s ease-out both" }}>
                Automatic Traffic Rerouting
              </h3>

              <div className="flex flex-col gap-6">
                
                {/* Before/After visualization */}
                <div className="flex items-center justify-center gap-12">
                  
                  {/* Load Balancer */}
                  <div className="opacity-0" style={{ animation: "fade-scale-smooth 0.6s ease-out both" }}>
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className="flex h-20 w-20 items-center justify-center"
                        style={{
                          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                          backgroundColor: "hsl(217 50% 25%)",
                          border: "2px solid hsl(217 50% 45%)",
                        }}
                      >
                        <p className="text-xs font-bold text-foreground">LB</p>
                      </div>
                      <p className="text-[10px] text-muted-foreground">Load Balancer</p>
                    </div>
                  </div>

                  {/* Traffic flows */}
                  <div className="relative w-32">
                    <svg viewBox="0 0 100 150" className="h-32 w-24">
                      <defs>
                        <marker id="arrowFlow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" viewBox="0 0 6 6">
                          <path d="M 0 0 L 6 3 L 0 6 z" fill={TEAL_GLOW} />
                        </marker>
                        <marker id="arrowFlowDead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" viewBox="0 0 6 6">
                          <path d="M 0 0 L 6 3 L 0 6 z" fill={GRAY_DEAD} />
                        </marker>
                      </defs>

                      {/* Flow to A */}
                      <line
                        x1="10" y1="30" x2="90" y2="30"
                        stroke={TEAL_GLOW}
                        strokeWidth={step >= 9 ? "3" : "2"}
                        markerEnd="url(#arrowFlow)"
                        style={{ transition: "stroke-width 0.8s ease" }}
                      />

                      {/* Flow to B */}
                      <line
                        x1="10" y1="75" x2="90" y2="75"
                        stroke={TEAL_GLOW}
                        strokeWidth={step >= 9 ? "3" : "2"}
                        markerEnd="url(#arrowFlow)"
                        style={{ transition: "stroke-width 0.8s ease" }}
                      />

                      {/* Flow to C (disappears after failure) */}
                      <line
                        x1="10" y1="120" x2="90" y2="120"
                        stroke={step >= 9 ? GRAY_DEAD : TEAL_GLOW}
                        strokeWidth="2"
                        strokeDasharray={step >= 9 ? "4 4" : "0"}
                        markerEnd={step >= 9 ? "url(#arrowFlowDead)" : "url(#arrowFlow)"}
                        opacity={step >= 9 ? 0.3 : 1}
                        style={{ transition: "all 0.8s ease" }}
                      />
                    </svg>
                  </div>

                  {/* Three nodes */}
                  <div className="flex flex-col gap-4">
                    {["A", "B", "C"].map((node, idx) => {
                      const isDead = node === "C" && step >= 9;
                      return (
                        <div key={node} className="opacity-0" style={{ animation: `fade-scale-smooth 0.6s ${0.2 + idx * 0.1}s ease-out both` }}>
                          <div className="flex items-center gap-3">
                            <div
                              className="flex h-12 w-12 items-center justify-center rounded-full border-2"
                              style={{
                                borderColor: isDead ? GRAY_DEAD : TEAL_GLOW,
                                backgroundColor: isDead ? "#1a1a1a" : "hsl(220 25% 20%)",
                                filter: isDead ? "grayscale(1)" : "drop-shadow(0 0 8px hsl(186 90% 55% / 0.4))",
                                transition: "all 0.8s ease",
                              }}
                            >
                              <p className="text-sm font-bold" style={{ color: isDead ? "#888888" : "#F1F5F9", transition: "color 0.8s ease" }}>
                                {node}
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {isDead ? "Failed" : "Active"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Status message */}
                {step >= 9 && (
                  <div className="flex flex-col items-center gap-3 opacity-0" style={{ animation: "fade-in-smooth 0.8s ease-out both" }}>
                    <div className="flex items-center gap-3">
                      <div className="rounded border border-[hsl(var(--teal-glow)/0.5)] bg-[hsl(var(--teal)/0.1)] px-3 py-1">
                        <p className="text-xs font-bold text-[hsl(var(--teal-glow))]">⏱ 1.2 seconds since failure</p>
                      </div>
                      <div className="rounded-lg border-2 border-[hsl(var(--teal-glow))] bg-[hsl(var(--teal)/0.1)] px-4 py-2">
                        <p className="text-xs font-bold text-[hsl(var(--teal-glow))]">✓ Traffic rerouted</p>
                        <p className="text-[10px] text-muted-foreground">No requests lost. No manual intervention.</p>
                      </div>
                    </div>

                    {/* User perspective */}
                    <div className="mt-2 flex items-center gap-3 opacity-0" style={{ animation: "fade-scale-smooth 0.6s 0.5s ease-out both" }}>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--teal)/0.2)] text-xl">
                        👤
                      </div>
                      <div className="rounded-lg bg-card/80 px-4 py-2">
                        <p className="text-xs italic text-foreground">"I didn't notice anything."</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Connection Summary */}
        {step >= 10 && (
          <section className="mt-4 opacity-0" style={{ animation: "slide-up-smooth 0.8s ease-out both" }}>
            <div className="rounded-lg border border-[hsl(var(--teal-glow)/0.4)] bg-[hsl(var(--teal)/0.05)] p-4">
              <div className="flex items-center justify-center gap-2 text-xs">
                <span className="font-semibold text-[hsl(var(--teal-glow))]">SWIM detects failure</span>
                <span className="text-muted-foreground">→</span>
                <span className="font-semibold text-[hsl(var(--teal-glow))]">Quorum allows operations</span>
                <span className="text-muted-foreground">→</span>
                <span className="font-semibold text-[hsl(var(--teal-glow))]">Load Balancer reroutes</span>
                <span className="text-muted-foreground">→</span>
                <span className="font-semibold text-foreground">Users unaffected</span>
              </div>
              <p className="mt-2 text-center text-[10px] text-muted-foreground">
                All within ~1 second. No human involved.
              </p>
            </div>
          </section>
        )}

        {/* Bottom Row */}
        {step >= 11 && (
          <div className="mt-4 flex items-end justify-between opacity-0" style={{ animation: "fade-in-smooth 0.8s ease-out both" }}>
            <p className="max-w-md text-xs italic text-muted-foreground">
              "A jury of 12. If 2 jurors are sick, the remaining 10 can still deliver a verdict. The trial continues. 
              Meanwhile, security quietly redirects anyone who was walking toward the closed courtroom."
            </p>
            <div>
              <EpamLogo />
            </div>
          </div>
        )}
      </div>

      <SlideNav prev="/swim" next="/bridge" />
    </main>
  );
};

export default QuorumRerouting;
