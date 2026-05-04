import { useEffect, useRef, useState } from "react";
import EpamLogo from "@/components/EpamLogo";
import SlideBackdrop from "@/components/SlideBackdrop";
import SlideNav from "@/components/SlideNav";

const ReliabilityProblem = () => {
  const [phase, setPhase] = useState(0);
  const animationStarted = useRef(false);

  useEffect(() => {
    if (animationStarted.current) return;
    animationStarted.current = true;

    // MUCH SLOWER timeline - 20+ seconds
    const timers = [
      setTimeout(() => setPhase(1), 2000),   // Client appears
      setTimeout(() => setPhase(2), 4000),   // Write request sent
      setTimeout(() => setPhase(3), 6000),   // Server receives
      setTimeout(() => setPhase(4), 8000),   // Server processing (progress bar)
      setTimeout(() => setPhase(5), 11000),  // Server crash (dramatic)
      setTimeout(() => setPhase(6), 13000),  // Aftermath label
      setTimeout(() => setPhase(7), 14000),  // Outcome 1
      setTimeout(() => setPhase(8), 16000),  // Outcome 2
      setTimeout(() => setPhase(9), 18000),  // Outcome 3
      setTimeout(() => setPhase(10), 20000), // Why this hurts cards
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-hero">
      <SlideBackdrop />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-10 py-8 lg:px-16 lg:py-10">
        
        {/* Header */}
        <header className="mb-10">
          <div
            className="mb-3 opacity-0"
            style={{ animation: "fade-in-smooth 0.8s 0.3s ease-out both" }}
          >
            <span className="rounded-full border border-[hsl(var(--teal-glow)/0.4)] bg-[hsl(var(--teal)/0.15)] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.3em] text-[hsl(var(--teal-glow))]">
              Reliability
            </span>
          </div>
          <h1
            className="text-4xl font-bold tracking-tight text-foreground opacity-0 lg:text-5xl"
            style={{ animation: "fade-in-smooth 0.8s 0.6s ease-out both" }}
          >
            The <span className="text-gradient-teal">Reliability</span> Problem
          </h1>
          <p
            className="mt-2 text-lg text-muted-foreground opacity-0 lg:text-xl"
            style={{ animation: "fade-in-smooth 0.8s 0.9s ease-out both" }}
          >
            What if a server crashes mid-write?
          </p>
        </header>

        {/* Main Visual - Horizontal Flow with Clear Labels */}
        <section className="relative flex flex-1 items-center justify-center py-6">
          <div className="relative flex w-full max-w-6xl items-start justify-between gap-8">
            
            {/* Step 1: Client Side */}
            <div className="flex w-1/3 flex-col items-center gap-4">
              {/* Client Icon */}
              {phase >= 1 && (
                <div
                  className="opacity-0"
                  style={{ animation: "fade-scale-smooth 0.8s ease-out both" }}
                >
                  <div className="rounded-lg border-2 border-[hsl(var(--teal-glow)/0.5)] bg-card/40 p-6">
                    <svg viewBox="0 0 100 100" className="h-24 w-24">
                      <circle cx="50" cy="50" r="45" fill="hsl(var(--muted))" opacity="0.3" />
                      <text x="50" y="62" textAnchor="middle" fontSize="48">💻</text>
                    </svg>
                  </div>
                </div>
              )}
              
              {/* Client Label */}
              {phase >= 1 && (
                <div
                  className="text-center opacity-0"
                  style={{ animation: "fade-in-smooth 0.6s 0.5s ease-out both" }}
                >
                  <p className="mb-1 text-lg font-bold text-foreground">Client</p>
                  <p className="text-sm text-muted-foreground">Sends write request</p>
                </div>
              )}

              {/* Data Packet */}
              {phase >= 2 && (
                <div
                  className="mt-4 opacity-0"
                  style={{ animation: "fade-scale-smooth 0.8s ease-out both" }}
                >
                  <div className="rounded-md border border-[hsl(var(--teal-glow))] bg-[hsl(var(--teal)/0.2)] px-4 py-2">
                    <p className="text-xs font-mono text-[hsl(var(--teal-glow))]">
                      📄 data.json
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Arrow Animation */}
            {phase >= 2 && (
              <div className="flex w-1/3 items-center justify-center">
                <svg viewBox="0 0 200 100" className="h-32 w-full">
                  <defs>
                    <linearGradient id="dataFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--teal-glow))" stopOpacity="0" />
                      <stop offset="50%" stopColor="hsl(var(--teal-glow))" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="hsl(var(--teal-glow))" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Animated line */}
                  <line
                    x1="10"
                    y1="50"
                    x2="190"
                    y2="50"
                    stroke="url(#dataFlow)"
                    strokeWidth="4"
                    style={{
                      strokeDasharray: "15 10",
                      animation: phase < 5 ? "flow-smooth 2.5s ease-in-out infinite" : "none",
                      opacity: phase >= 5 ? 0.2 : 1,
                      transition: "opacity 1s"
                    }}
                  />
                  
                  {/* Arrow head */}
                  <polygon
                    points="190,50 180,45 180,55"
                    fill="hsl(var(--teal-glow))"
                    style={{
                      opacity: phase >= 5 ? 0.2 : 0.9,
                      transition: "opacity 1s"
                    }}
                  />
                  
                  {/* "Writing..." label */}
                  {phase >= 3 && phase < 5 && (
                    <text
                      x="100"
                      y="35"
                      textAnchor="middle"
                      fill="hsl(var(--teal-glow))"
                      fontSize="12"
                      fontWeight="600"
                      style={{ animation: "fade-in-smooth 0.6s ease-out both" }}
                    >
                      Writing data...
                    </text>
                  )}
                </svg>
              </div>
            )}

            {/* Step 2: Server Side */}
            <div className="flex w-1/3 flex-col items-center gap-4">
              {/* Server Box */}
              {phase >= 3 && (
                <div className="relative">
                  {/* Crash warning rings */}
                  {phase >= 5 && (
                    <>
                      <div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{ animation: "stress-ring-smooth 2s ease-out infinite" }}
                      >
                        <div className="h-56 w-56 rounded-lg border-2 border-[hsl(28_90%_60%)]" />
                      </div>
                      <div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{ animation: "stress-ring-smooth 2s 0.5s ease-out infinite" }}
                      >
                        <div className="h-56 w-56 rounded-lg border-2 border-[hsl(28_90%_60%)]" />
                      </div>
                    </>
                  )}

                  <div
                    className="relative opacity-0"
                    style={{ animation: "fade-scale-smooth 0.8s ease-out both" }}
                  >
                    <div
                      className="rounded-lg border-2 p-6 shadow-lg transition-all duration-1000"
                      style={{
                        borderColor: phase >= 5 ? "hsl(28 90% 60%)" : "hsl(var(--teal-glow))",
                        backgroundColor: phase >= 5 ? "hsl(var(--muted)/0.3)" : "hsl(var(--teal)/0.2)",
                        transform: phase >= 5 ? "scale(0.98)" : "scale(1)",
                        animation: phase >= 5 ? "shake-crash 0.5s ease-out" : "none"
                      }}
                    >
                      <svg viewBox="0 0 140 100" className="h-24 w-32">
                        <rect
                          x="10"
                          y="15"
                          width="120"
                          height="70"
                          rx="6"
                          fill={phase >= 5 ? "hsl(var(--muted))" : "hsl(var(--teal))"}
                          stroke={phase >= 5 ? "hsl(28 90% 60%)" : "hsl(var(--teal-glow))"}
                          strokeWidth="2"
                          style={{
                            transition: "all 1s",
                            filter: phase >= 5 ? "grayscale(0.5)" : "drop-shadow(0 0 12px hsl(var(--teal-glow) / 0.5))"
                          }}
                        />
                        <line x1="25" y1="35" x2="115" y2="35" stroke="hsl(var(--background))" strokeWidth="2" opacity="0.4" />
                        <line x1="25" y1="50" x2="115" y2="50" stroke="hsl(var(--background))" strokeWidth="2" opacity="0.4" />
                        <line x1="25" y1="65" x2="115" y2="65" stroke="hsl(var(--background))" strokeWidth="2" opacity="0.4" />
                        
                        {/* Status indicator light */}
                        <circle
                          cx="25"
                          cy="25"
                          r="4"
                          fill={phase >= 5 ? "hsl(28 90% 60%)" : "hsl(var(--teal-glow))"}
                          style={{
                            animation: phase >= 4 && phase < 5 ? "blink-light 1s ease-in-out infinite" : "none"
                          }}
                        />

                        {/* Progress bar during write */}
                        {phase >= 4 && phase < 5 && (
                          <g>
                            <rect x="25" y="75" width="90" height="6" rx="3" fill="hsl(var(--background))" opacity="0.3" />
                            <rect
                              x="25"
                              y="75"
                              width="45"
                              height="6"
                              rx="3"
                              fill="hsl(var(--teal-glow))"
                              style={{ animation: "progress-fill-slow 3s ease-in-out infinite" }}
                            />
                          </g>
                        )}
                      </svg>
                    </div>

                    {/* Crash Symbol - Large and Clear */}
                    {phase >= 5 && (
                      <div
                        className="absolute -right-10 -top-10 opacity-0"
                        style={{ animation: "crash-dramatic 0.8s ease-out both" }}
                      >
                        <div className="relative">
                          <svg viewBox="0 0 80 80" className="h-20 w-20">
                            <circle cx="40" cy="40" r="35" fill="hsl(28 90% 60%)" opacity="0.2" />
                            <circle cx="40" cy="40" r="30" fill="hsl(28 90% 60%)" opacity="0.3" />
                            <text
                              x="40"
                              y="50"
                              textAnchor="middle"
                              fontSize="36"
                              style={{
                                filter: "drop-shadow(0 0 12px hsl(28 90% 60% / 0.8))"
                              }}
                            >
                              ⚡
                            </text>
                          </svg>
                          <p className="mt-1 text-center text-xs font-bold uppercase text-[hsl(28_90%_60%)]">
                            CRASH!
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Server Label */}
              {phase >= 3 && (
                <div
                  className="text-center opacity-0"
                  style={{ animation: "fade-in-smooth 0.6s 0.5s ease-out both" }}
                >
                  <p
                    className="mb-1 text-lg font-bold transition-colors duration-1000"
                    style={{ color: phase >= 5 ? "hsl(28 90% 60%)" : "hsl(var(--foreground))" }}
                  >
                    Server
                  </p>
                  <p
                    className="text-sm transition-colors duration-1000"
                    style={{ color: phase >= 5 ? "hsl(28 90% 60%)" : "hsl(var(--muted-foreground))" }}
                  >
                    {phase < 4 ? "Receiving data..." : phase < 5 ? "Processing write..." : "💥 Crashed mid-write!"}
                  </p>
                </div>
              )}

              {/* Progress indicator text */}
              {phase >= 4 && phase < 5 && (
                <div
                  className="opacity-0"
                  style={{ animation: "fade-in-smooth 0.6s ease-out both" }}
                >
                  <div className="rounded-md border border-[hsl(var(--teal-glow)/0.5)] bg-card/40 px-4 py-2">
                    <p className="text-xs font-semibold text-[hsl(var(--teal-glow))]">
                      ⚙️ Writing 50%...
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* The Aftermath Section */}
        {phase >= 6 && (
          <section className="mt-6">
            <div
              className="mb-6 text-center opacity-0"
              style={{ animation: "fade-in-smooth 0.8s ease-out both" }}
            >
              <h3 className="text-2xl font-bold text-[hsl(28_90%_60%)]">
                ⚠️ The Aftermath
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                What happens to the data?
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                {
                  icon: "🗑️",
                  title: "Data Lost",
                  desc: "Write never completed",
                  detail: "The operation was interrupted",
                  delay: 0
                },
                {
                  icon: "⚠️",
                  title: "Half-Written Record",
                  desc: "Corrupted state",
                  detail: "Partial data saved",
                  delay: 0.6
                },
                {
                  icon: "❌",
                  title: "Replicas Disagree",
                  desc: "Inconsistent copies",
                  detail: "Different versions exist",
                  delay: 1.2
                }
              ].map((outcome, idx) => (
                phase >= 7 + idx && (
                  <div
                    key={idx}
                    className="rounded-lg border-2 border-[hsl(28_90%_60%/0.5)] bg-[hsl(28_90%_60%/0.05)] p-5 opacity-0 backdrop-blur-sm"
                    style={{ animation: `slide-up-smooth 0.8s ${outcome.delay}s ease-out both` }}
                  >
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(28_90%_60%/0.2)]">
                      <span className="text-2xl">{outcome.icon}</span>
                    </div>
                    <h4 className="mb-2 text-base font-bold text-foreground">
                      {outcome.title}
                    </h4>
                    <p className="mb-1 text-sm text-muted-foreground">
                      {outcome.desc}
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                      {outcome.detail}
                    </p>
                  </div>
                )
              ))}
            </div>
          </section>
        )}

        {/* Why This Hurts Section */}
        {phase >= 10 && (
          <section className="mt-6">
            <p
              className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground opacity-0"
              style={{ animation: "fade-in-smooth 0.6s ease-out both" }}
            >
              Why This Hurts Business
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                {
                  title: "💰 Cost",
                  desc: "Average cost of 1 hour data loss: $100K to $1M+",
                  delay: 0.3
                },
                {
                  title: "🤝 Trust",
                  desc: "User confidence lost is nearly impossible to rebuild",
                  delay: 0.6
                },
                {
                  title: "⚖️ Compliance",
                  desc: "GDPR, HIPAA, financial regs demand zero data loss",
                  delay: 0.9
                }
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border-t-2 border-[hsl(var(--teal-glow)/0.5)] bg-card/30 p-4 opacity-0 backdrop-blur-sm transition-all hover:border-[hsl(var(--teal-glow))]"
                  style={{ animation: `slide-up-smooth 0.6s ${card.delay}s ease-out both` }}
                >
                  <h4 className="mb-2 text-base font-semibold text-foreground">
                    {card.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Row */}
        {phase >= 10 && (
          <div className="mt-6 flex items-end justify-between">
            <p
              className="max-w-md text-xs italic text-muted-foreground opacity-0"
              style={{ animation: "fade-in-smooth 0.8s 1.5s ease-out both" }}
            >
              "You're writing an important email. Power goes out. Did it save? Was it the complete email or just half?"
            </p>
            <div
              className="opacity-0"
              style={{ animation: "fade-in-smooth 0.8s 1.8s ease-out both" }}
            >
              <EpamLogo />
            </div>
          </div>
        )}
      </div>

      <SlideNav prev="/quorum" next="/replication" />
    </main>
  );
};

export default ReliabilityProblem;
