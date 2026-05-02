import { useEffect, useRef, useState } from "react";
import EpamLogo from "@/components/EpamLogo";
import SlideBackdrop from "@/components/SlideBackdrop";
import SlideNav from "@/components/SlideNav";

const ScalabilityProblem = () => {
  const [phase, setPhase] = useState(0);
  const animationStarted = useRef(false);

  useEffect(() => {
    if (animationStarted.current) return;
    animationStarted.current = true;

    const timers = [
      setTimeout(() => setPhase(1), 2000),  // Stage 1: Normal with 1 node
      setTimeout(() => setPhase(2), 5000),  // Stage 2: Traffic spike - server struggles
      setTimeout(() => setPhase(3), 8000),  // Stage 3: Add more nodes
      setTimeout(() => setPhase(4), 11000), // Stage 4: Load balanced across nodes
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-hero">
      <SlideBackdrop />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-10 py-8 lg:px-16 lg:py-10">
        {/* Header */}
        <header className="mb-6">
          <h1
            className="text-4xl font-bold tracking-tight text-foreground opacity-0 lg:text-5xl"
            style={{ animation: "fade-in-left 0.7s 0.3s ease-out both" }}
          >
            The <span className="text-gradient-teal">Scalability</span> Challenge
          </h1>
          <p
            className="mt-2 text-lg text-muted-foreground opacity-0 lg:text-xl"
            style={{ animation: "fade-in-left 0.7s 0.6s ease-out both" }}
          >
            What happens when traffic 10x's overnight?
          </p>
        </header>

        {/* Main Visual Area - 65% of space */}
        <section className="relative flex flex-1 items-center justify-center">
          {/* Stage Indicator */}
          <div className="absolute left-4 top-0 rounded-lg border border-border/50 bg-card/30 px-4 py-2">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {phase === 0 && "Loading..."}
              {phase === 1 && "Stage 1: Normal Load"}
              {phase === 2 && "Stage 2: Traffic Spike (10x)"}
              {phase === 3 && "Stage 3: Horizontal Scaling"}
              {phase === 4 && "Stage 4: Load Balanced"}
            </p>
          </div>

          {/* Main Animation Container */}
          <div className="relative flex h-full w-full max-w-6xl items-center justify-between px-8">
            
            {/* LEFT: Traffic Source */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <svg viewBox="0 0 120 120" className="h-24 w-24 lg:h-28 lg:w-28">
                  <circle cx="60" cy="60" r="50" fill="hsl(var(--muted))" opacity="0.2" />
                  <text x="60" y="70" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="40">
                    👥
                  </text>
                </svg>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold" style={{ 
                  color: phase <= 1 ? "hsl(var(--teal-glow))" : "hsl(var(--destructive))",
                  transition: "color 0.5s ease"
                }}>
                  {phase <= 1 ? "100" : "1000"} req/s
                </p>
                <p className="text-xs text-muted-foreground">Users</p>
              </div>
            </div>

            {/* CENTER: Request Flow Lines */}
            <div className="relative flex-1">
              {/* Single Line (Phase 1) */}
              {phase === 1 && (
                <svg className="h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="normalFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--teal-glow))" stopOpacity="0" />
                      <stop offset="50%" stopColor="hsl(var(--teal-glow))" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="hsl(var(--teal-glow))" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <line
                    x1="0"
                    y1="150"
                    x2="400"
                    y2="150"
                    stroke="url(#normalFlow)"
                    strokeWidth="4"
                    style={{
                      strokeDasharray: "20 10",
                      animation: "dash-flow-simple 2s linear infinite"
                    }}
                  />
                </svg>
              )}

              {/* Multiple Congested Lines (Phase 2) */}
              {phase === 2 && (
                <svg className="h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="congestedFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--destructive))" stopOpacity="0" />
                      <stop offset="30%" stopColor="hsl(var(--destructive))" stopOpacity="0.9" />
                      <stop offset="70%" stopColor="hsl(var(--destructive))" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="hsl(var(--destructive))" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <line
                      key={i}
                      x1="0"
                      y1={100 + i * 12}
                      x2="400"
                      y2={100 + i * 12}
                      stroke="url(#congestedFlow)"
                      strokeWidth="3"
                      opacity="0.7"
                      style={{
                        strokeDasharray: "15 8",
                        animation: `dash-flow-congested 1s ${i * 0.1}s linear infinite`
                      }}
                    />
                  ))}
                </svg>
              )}

              {/* Distributed Lines to Multiple Nodes (Phase 3-4) */}
              {phase >= 3 && (
                <svg className="h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="balancedFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--teal-glow))" stopOpacity="0" />
                      <stop offset="50%" stopColor="hsl(var(--teal-glow))" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="hsl(var(--teal-glow))" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Line to Node 1 */}
                  <line
                    x1="0"
                    y1="150"
                    x2="400"
                    y2="80"
                    stroke="url(#balancedFlow)"
                    strokeWidth="3"
                    style={{
                      strokeDasharray: "15 8",
                      animation: "dash-flow-simple 2s 0s linear infinite"
                    }}
                  />
                  {/* Line to Node 2 */}
                  <line
                    x1="0"
                    y1="150"
                    x2="400"
                    y2="150"
                    stroke="url(#balancedFlow)"
                    strokeWidth="3"
                    style={{
                      strokeDasharray: "15 8",
                      animation: "dash-flow-simple 2s 0.3s linear infinite"
                    }}
                  />
                  {/* Line to Node 3 */}
                  <line
                    x1="0"
                    y1="150"
                    x2="400"
                    y2="220"
                    stroke="url(#balancedFlow)"
                    strokeWidth="3"
                    style={{
                      strokeDasharray: "15 8",
                      animation: "dash-flow-simple 2s 0.6s linear infinite"
                    }}
                  />
                </svg>
              )}
            </div>

            {/* RIGHT: Server Nodes */}
            <div className="relative">
              {/* Single Node (Phase 1-2) */}
              {phase <= 2 && (
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    {/* Stress rings for phase 2 */}
                    {phase === 2 && (
                      <>
                        <div
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                          style={{ animation: "stress-ring 2s ease-out infinite" }}
                        >
                          <div className="h-40 w-40 rounded-full border-2 border-[hsl(var(--destructive))] opacity-30 lg:h-48 lg:w-48" />
                        </div>
                        <div
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                          style={{ animation: "stress-ring 2s 0.5s ease-out infinite" }}
                        >
                          <div className="h-40 w-40 rounded-full border-2 border-[hsl(var(--destructive))] opacity-30 lg:h-48 lg:w-48" />
                        </div>
                      </>
                    )}
                    
                    <svg viewBox="0 0 200 200" className="h-32 w-32 lg:h-40 lg:w-40">
                      <circle
                        cx="100"
                        cy="100"
                        r="60"
                        fill={phase === 1 ? "hsl(var(--teal))" : "hsl(var(--destructive))"}
                        stroke={phase === 1 ? "hsl(var(--teal-glow))" : "hsl(var(--destructive))"}
                        strokeWidth="4"
                        style={{
                          filter: phase === 1 
                            ? "drop-shadow(0 0 20px hsl(var(--teal-glow) / 0.6))"
                            : "drop-shadow(0 0 25px hsl(var(--destructive) / 0.8))",
                          transition: "all 0.5s ease"
                        }}
                      />
                      <text
                        x="100"
                        y="115"
                        textAnchor="middle"
                        fill="white"
                        fontSize="32"
                        fontWeight="bold"
                      >
                        {phase === 1 ? "✓" : "!"}
                      </text>
                    </svg>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xl font-bold" style={{ 
                      color: phase === 1 ? "hsl(var(--teal-glow))" : "hsl(var(--destructive))",
                      transition: "color 0.5s ease"
                    }}>
                      {phase === 1 ? "45ms" : "850ms"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {phase === 1 ? "Healthy" : "Overloaded"}
                    </p>
                  </div>
                </div>
              )}

              {/* Multiple Nodes (Phase 3-4) */}
              {phase >= 3 && (
                <div className="flex flex-col gap-8">
                  {[1, 2, 3].map((nodeNum, idx) => (
                    <div
                      key={nodeNum}
                      className="flex items-center gap-4 opacity-0"
                      style={{
                        animation: `fade-scale 0.6s ${0.3 + idx * 0.2}s ease-out both`,
                      }}
                    >
                      <svg viewBox="0 0 120 120" className="h-20 w-20">
                        <circle
                          cx="60"
                          cy="60"
                          r="45"
                          fill="hsl(var(--teal))"
                          stroke="hsl(var(--teal-glow))"
                          strokeWidth="3"
                          style={{
                            filter: "drop-shadow(0 0 15px hsl(var(--teal-glow) / 0.6))",
                          }}
                        />
                        <text
                          x="60"
                          y="70"
                          textAnchor="middle"
                          fill="white"
                          fontSize="24"
                          fontWeight="bold"
                        >
                          {nodeNum}
                        </text>
                      </svg>
                      
                      <div className="text-left">
                        <p className="text-lg font-bold text-[hsl(var(--teal-glow))]">
                          42ms
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          Node {nodeNum}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Stage Description Text */}
          <div className="absolute bottom-0 left-1/2 w-full max-w-3xl -translate-x-1/2 text-center">
            {phase === 1 && (
              <p
                className="text-sm italic text-muted-foreground opacity-0"
                style={{ animation: "fade-in-up 0.6s 2.5s ease-out both" }}
              >
                Single server handles normal traffic smoothly
              </p>
            )}
            {phase === 2 && (
              <div
                className="opacity-0"
                style={{ animation: "fade-in-up 0.6s 5.5s ease-out both" }}
              >
                <p className="text-lg font-semibold text-[hsl(var(--destructive))]">
                  10x Traffic → Latency Spikes → Requests Dropped
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  One machine has physical limits
                </p>
              </div>
            )}
            {phase === 3 && (
              <p
                className="text-lg font-semibold text-[hsl(var(--teal-glow))] opacity-0"
                style={{ animation: "fade-in-up 0.6s 8.5s ease-out both" }}
              >
                Solution: Scale Horizontally → Add More Nodes
              </p>
            )}
            {phase === 4 && (
              <div
                className="opacity-0"
                style={{ animation: "fade-in-up 0.6s 11.5s ease-out both" }}
              >
                <p className="text-lg font-semibold text-[hsl(var(--teal-glow))]">
                  ✓ Load Distributed → Latency Normalized → System Scales
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Each node handles 1/3 of the traffic
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Bottom Section - Problem Cards */}
        <section className="mt-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                title: "Single Bottleneck",
                desc: "One server = one ceiling for CPU, memory, and network",
                delay: 1.5,
              },
              {
                title: "Hot Keys",
                desc: "One popular item gets all traffic → one machine drowns",
                delay: 1.7,
              },
              {
                title: "Uneven Load",
                desc: "Some machines at 95%, others idle at 5%",
                delay: 1.9,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-[hsl(var(--teal-glow)/0.3)] bg-card/30 p-3 opacity-0"
                style={{ animation: `fade-in-up 0.6s ${item.delay}s ease-out both` }}
              >
                <h4 className="mb-1 text-sm font-semibold text-foreground">
                  {item.title}
                </h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Row */}
        <div className="mt-3 flex items-end justify-between">
          <p
            className="max-w-md text-xs italic text-muted-foreground opacity-0"
            style={{ animation: "fade-in-left 0.6s 2s ease-out both" }}
          >
            "One cashier at a supermarket during Black Friday. The line wraps around the building."
          </p>
          <div
            className="opacity-0"
            style={{ animation: "fade-in-right 0.6s 2s ease-out both" }}
          >
            <EpamLogo />
          </div>
        </div>
      </div>

      <SlideNav prev="/distributed" next="/load-balancing" current={4} total={5} />
    </main>
  );
};

export default ScalabilityProblem;
