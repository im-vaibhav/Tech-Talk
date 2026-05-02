import { useEffect, useRef, useState } from "react";
import EpamLogo from "@/components/EpamLogo";
import SlideBackdrop from "@/components/SlideBackdrop";
import SlideNav from "@/components/SlideNav";

const AvailabilityProblem = () => {
  const [phase, setPhase] = useState(0);
  const animationStarted = useRef(false);

  useEffect(() => {
    if (animationStarted.current) return;
    animationStarted.current = true;

    // SLOWER 20-second animation timeline
    const timers = [
      setTimeout(() => setPhase(1), 2000),   // Nodes appear
      setTimeout(() => setPhase(2), 4000),   // Clients appear
      setTimeout(() => setPhase(3), 6000),   // Normal traffic flows
      setTimeout(() => setPhase(4), 8000),   // Node-2 crashes (silent)
      setTimeout(() => setPhase(5), 10000),  // Clients still route to Node-2
      setTimeout(() => setPhase(6), 12000),  // Timeouts accumulate
      setTimeout(() => setPhase(7), 14000),  // Users get errors
      setTimeout(() => setPhase(8), 16000),  // Manual intervention needed
      setTimeout(() => setPhase(9), 18000),  // Impact cards appear
      setTimeout(() => setPhase(10), 20000), // Analogy appears
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
              Availability · Problem
            </span>
          </div>
          <h1
            className="text-4xl font-bold tracking-tight text-foreground opacity-0 lg:text-5xl"
            style={{ animation: "fade-in-smooth 0.8s 0.6s ease-out both" }}
          >
            The <span className="text-gradient-teal">Downtime</span> Problem
          </h1>
          <p
            className="mt-2 text-lg text-muted-foreground opacity-0 lg:text-xl"
            style={{ animation: "fade-in-smooth 0.8s 0.9s ease-out both" }}
          >
            What happens when a server dies at 3 AM?
          </p>
        </header>

        {/* Main Visual - Distributed System Failure */}
        <section className="relative flex flex-1 flex-col items-center justify-center gap-12">
          
          {/* Scenario Label */}
          {phase >= 1 && (
            <div className="absolute left-0 top-0 opacity-0" style={{ animation: "fade-in-smooth 0.8s ease-out both" }}>
              <div className="rounded-lg border border-border/50 bg-card/30 px-4 py-2">
                <p className="text-sm font-semibold text-foreground">
                  {phase < 4 && "Normal Operation"}
                  {phase >= 4 && phase < 8 && "Node Failure → Traffic Still Routes to Dead Node"}
                  {phase >= 8 && "Manual Intervention Required"}
                </p>
              </div>
            </div>
          )}

          {/* Distributed System Visualization */}
          <div className="relative flex w-full max-w-6xl items-center justify-between">
            
            {/* CLIENT SIDE (Left) */}
            <div className="flex flex-col gap-6">
              <p className="text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">Clients</p>
              
              {/* 3 Client Groups */}
              {phase >= 2 && (
                <>
                  {/* Client Group 1 */}
                  <div className="flex flex-col items-center gap-2 opacity-0" style={{ animation: "fade-scale-smooth 0.8s ease-out both" }}>
                    <div className="flex gap-1">
                      {[1, 2, 3].map((i) => (
                        <svg key={i} viewBox="0 0 30 30" className="h-6 w-6">
                          <circle cx="15" cy="15" r="12" fill="hsl(var(--teal))" opacity="0.6" />
                          <text x="15" y="19" textAnchor="middle" fontSize="16">👤</text>
                        </svg>
                      ))}
                    </div>
                    {phase >= 7 && (
                      <div className="flex items-center gap-1 opacity-0" style={{ animation: "fade-in-smooth 0.8s ease-out both" }}>
                        <svg viewBox="0 0 20 20" className="h-5 w-5">
                          <text x="10" y="15" textAnchor="middle" fontSize="16" fill="hsl(var(--destructive))">⚠</text>
                        </svg>
                        <p className="text-[10px] font-bold text-[hsl(var(--destructive))]">Errors</p>
                      </div>
                    )}
                  </div>

                  {/* Client Group 2 */}
                  <div className="flex flex-col items-center gap-2 opacity-0" style={{ animation: "fade-scale-smooth 0.8s 0.2s ease-out both" }}>
                    <div className="flex gap-1">
                      {[1, 2, 3].map((i) => (
                        <svg key={i} viewBox="0 0 30 30" className="h-6 w-6">
                          <circle cx="15" cy="15" r="12" fill="hsl(var(--teal))" opacity="0.6" />
                          <text x="15" y="19" textAnchor="middle" fontSize="16">👤</text>
                        </svg>
                      ))}
                    </div>
                    {phase >= 7 && (
                      <div className="flex items-center gap-1 opacity-0" style={{ animation: "fade-in-smooth 0.8s 0.2s ease-out both" }}>
                        <svg viewBox="0 0 20 20" className="h-5 w-5">
                          <text x="10" y="15" textAnchor="middle" fontSize="16" fill="hsl(var(--destructive))">⚠</text>
                        </svg>
                        <p className="text-[10px] font-bold text-[hsl(var(--destructive))]">Timeout</p>
                      </div>
                    )}
                  </div>

                  {/* Client Group 3 */}
                  <div className="flex flex-col items-center gap-2 opacity-0" style={{ animation: "fade-scale-smooth 0.8s 0.4s ease-out both" }}>
                    <div className="flex gap-1">
                      {[1, 2, 3].map((i) => (
                        <svg key={i} viewBox="0 0 30 30" className="h-6 w-6">
                          <circle cx="15" cy="15" r="12" fill="hsl(var(--teal))" opacity="0.6" />
                          <text x="15" y="19" textAnchor="middle" fontSize="16">👤</text>
                        </svg>
                      ))}
                    </div>
                    {phase >= 7 && (
                      <div className="flex items-center gap-1 opacity-0" style={{ animation: "fade-in-smooth 0.8s 0.4s ease-out both" }}>
                        <svg viewBox="0 0 20 20" className="h-5 w-5">
                          <text x="10" y="15" textAnchor="middle" fontSize="16" fill="hsl(var(--destructive))">⚠</text>
                        </svg>
                        <p className="text-[10px] font-bold text-[hsl(var(--destructive))]">Errors</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* MIDDLE SPACE - Traffic Flows */}
            <div className="relative flex-1">
              {phase >= 3 && (
                <>
                  {/* Flow lines to each node */}
                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="flowHealthy" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--teal))" stopOpacity="0" />
                        <stop offset="50%" stopColor="hsl(var(--teal))" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="hsl(var(--teal))" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="flowDead" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#666666" stopOpacity="0" />
                        <stop offset="50%" stopColor="#666666" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#666666" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Flow to Node-1 */}
                    <line 
                      x1="20" y1="50" x2="380" y2="50" 
                      stroke="url(#flowHealthy)" 
                      strokeWidth="2" 
                      strokeDasharray="8 4"
                      style={{ animation: "flow-smooth 3s linear infinite" }}
                    />
                    <polygon points="380,50 375,48 375,52" fill="hsl(var(--teal))" opacity="0.7" />
                    
                    {/* Flow to Node-2 (becomes dead after crash) */}
                    <line 
                      x1="20" y1="150" x2="380" y2="150" 
                      stroke={phase >= 4 ? "url(#flowDead)" : "url(#flowHealthy)"} 
                      strokeWidth="2" 
                      strokeDasharray="8 4"
                      style={{ 
                        animation: phase >= 4 ? "flow-congested 5s linear infinite" : "flow-smooth 3s 0.3s linear infinite",
                        transition: "all 1s ease"
                      }}
                    />
                    {phase >= 6 && (
                      <text x="200" y="140" textAnchor="middle" fontSize="14" fill="#999999" className="opacity-0" style={{ animation: "fade-in-smooth 0.8s ease-out both" }}>
                        Requests timing out...
                      </text>
                    )}
                    <polygon points="380,150 375,148 375,152" fill={phase >= 4 ? "#666666" : "hsl(var(--teal))"} opacity={phase >= 4 ? 0.4 : 0.7} />
                    
                    {/* Flow to Node-3 */}
                    <line 
                      x1="20" y1="250" x2="380" y2="250" 
                      stroke="url(#flowHealthy)" 
                      strokeWidth="2" 
                      strokeDasharray="8 4"
                      style={{ animation: "flow-smooth 3s 0.6s linear infinite" }}
                    />
                    <polygon points="380,250 375,248 375,252" fill="hsl(var(--teal))" opacity="0.7" />
                  </svg>
                </>
              )}
            </div>

            {/* SERVER NODES (Right) */}
            <div className="flex flex-col gap-6">
              <p className="text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Distributed Nodes
              </p>
              
              {/* Node-1 (Always healthy) */}
              {phase >= 1 && (
                <div className="flex flex-col items-center gap-2 opacity-0" style={{ animation: "fade-scale-smooth 0.8s ease-out both" }}>
                  <div 
                    className="flex h-20 w-32 flex-col items-center justify-center rounded-lg border-2 bg-card/40"
                    style={{
                      borderColor: "hsl(var(--teal-glow))",
                      filter: "drop-shadow(0 0 12px hsl(var(--teal-glow) / 0.5))",
                    }}
                  >
                    <p className="text-sm font-bold text-[hsl(var(--teal-glow))]">Node-1</p>
                    <p className="text-[10px] text-[hsl(var(--teal-glow))]">Healthy</p>
                  </div>
                </div>
              )}

              {/* Node-2 (Crashes but traffic still routes to it) */}
              {phase >= 1 && (
                <div className="relative flex flex-col items-center gap-2 opacity-0" style={{ animation: "fade-scale-smooth 0.8s 0.2s ease-out both" }}>
                  <div 
                    className="flex h-20 w-32 flex-col items-center justify-center rounded-lg border-2 bg-card/40"
                    style={{
                      borderColor: phase >= 4 ? "#333333" : "hsl(var(--teal-glow))",
                      backgroundColor: phase >= 4 ? "#1a1a1a" : "hsl(var(--card)/0.4)",
                      filter: phase >= 4 
                        ? "grayscale(1) drop-shadow(0 0 12px #666666)"
                        : "drop-shadow(0 0 12px hsl(var(--teal-glow) / 0.5))",
                      transition: "all 1.5s ease"
                    }}
                  >
                    <p className="text-sm font-bold" style={{
                      color: phase >= 4 ? "#666666" : "hsl(var(--teal-glow))",
                      transition: "color 1.5s ease"
                    }}>Node-2</p>
                    <p className="text-[10px]" style={{
                      color: phase >= 4 ? "#666666" : "hsl(var(--teal-glow))",
                      transition: "color 1.5s ease"
                    }}>
                      {phase >= 4 ? "CRASHED" : "Healthy"}
                    </p>
                  </div>
                  
                  {phase >= 4 && (
                    <div className="absolute -right-4 -top-2 opacity-0" style={{ animation: "crash-appear 0.8s ease-out both" }}>
                      <svg viewBox="0 0 40 40" className="h-10 w-10">
                        <text x="20" y="28" textAnchor="middle" fontSize="28">💀</text>
                      </svg>
                    </div>
                  )}

                  {phase >= 5 && (
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0" style={{ animation: "fade-in-smooth 0.8s ease-out both" }}>
                      <div className="rounded border-2 border-[hsl(28_90%_60%)] bg-[hsl(28_90%_60%/0.2)] px-3 py-1">
                        <p className="whitespace-nowrap text-[10px] font-bold text-[hsl(28_90%_60%)]">
                          Still receiving traffic!
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Node-3 (Always healthy) */}
              {phase >= 1 && (
                <div className="flex flex-col items-center gap-2 opacity-0" style={{ animation: "fade-scale-smooth 0.8s 0.4s ease-out both" }}>
                  <div 
                    className="flex h-20 w-32 flex-col items-center justify-center rounded-lg border-2 bg-card/40"
                    style={{
                      borderColor: "hsl(var(--teal-glow))",
                      filter: "drop-shadow(0 0 12px hsl(var(--teal-glow) / 0.5))",
                    }}
                  >
                    <p className="text-sm font-bold text-[hsl(var(--teal-glow))]">Node-3</p>
                    <p className="text-[10px] text-[hsl(var(--teal-glow))]">Healthy</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Problem Explanation */}
          <div className="w-full max-w-4xl text-center">
            {phase >= 4 && phase < 8 && (
              <div className="opacity-0" style={{ animation: "fade-in-smooth 1s ease-out both" }}>
                <p className="text-xl font-bold text-[hsl(28_90%_60%)]">
                  Node-2 crashed, but the system doesn't know yet.
                </p>
                <p className="mt-2 text-base text-muted-foreground">
                  Clients continue routing requests to the dead node → Timeouts → Errors
                </p>
              </div>
            )}
            
            {phase >= 8 && (
              <div className="opacity-0" style={{ animation: "fade-in-smooth 1s ease-out both" }}>
                <p className="text-xl font-bold text-[hsl(var(--destructive))]">
                  Manual intervention required. Someone needs to SSH in and investigate.
                </p>
                <p className="mt-2 text-base text-muted-foreground">
                  No automatic health checks. No traffic rerouting. Downtime = $5,600/minute.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Bottom Section - Impact Cards */}
        {phase >= 9 && (
          <section className="mt-6 opacity-0" style={{ animation: "slide-up-smooth 1s ease-out both" }}>
            <div className="grid grid-cols-3 gap-4">
              
              {/* Card 1: Detection Lag */}
              <div 
                className="rounded-lg border bg-card/30 p-4 backdrop-blur-sm"
                style={{
                  borderColor: "hsl(var(--teal-glow)/0.3)",
                  borderTopWidth: "3px",
                  borderTopColor: "hsl(var(--teal-glow))",
                }}
              >
                <h4 className="mb-2 text-sm font-bold text-[hsl(var(--teal-glow))]">Detection Lag</h4>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Without health checks, failures go <span className="font-bold text-foreground">undetected for minutes</span>. 
                  Traffic keeps routing to dead nodes.
                </p>
              </div>

              {/* Card 2: Downtime Cost */}
              <div 
                className="rounded-lg border bg-card/30 p-4 backdrop-blur-sm"
                style={{
                  borderColor: "hsl(var(--teal-glow)/0.3)",
                  borderTopWidth: "3px",
                  borderTopColor: "hsl(var(--teal-glow))",
                }}
              >
                <h4 className="mb-2 text-sm font-bold text-[hsl(var(--teal-glow))]">Downtime Cost</h4>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Industry average: <span className="font-bold text-foreground">$5,600 per minute</span>. 
                  99.9% SLA = only 8.7 hours allowed per year.
                </p>
              </div>

              {/* Card 3: Manual Response */}
              <div 
                className="rounded-lg border bg-card/30 p-4 backdrop-blur-sm"
                style={{
                  borderColor: "hsl(var(--teal-glow)/0.3)",
                  borderTopWidth: "3px",
                  borderTopColor: "hsl(var(--teal-glow))",
                }}
              >
                <h4 className="mb-2 text-sm font-bold text-[hsl(var(--teal-glow))]">Manual Response</h4>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Humans must detect, diagnose, and fix. At 3 AM. <span className="font-bold text-foreground">Slow, error-prone, exhausting.</span>
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Bottom Row */}
        {phase >= 10 && (
          <div className="mt-6 flex items-end justify-between opacity-0" style={{ animation: "fade-in-smooth 1s ease-out both" }}>
            <p className="max-w-md text-xs italic text-muted-foreground">
              "A highway lane closes. No signs, no rerouting. Traffic keeps piling into the blocked lane. 
              By the time someone notices, half the highway is gridlocked."
            </p>
            <div>
              <EpamLogo />
            </div>
          </div>
        )}
      </div>

      <SlideNav prev="/wal" next="/swim" />
    </main>
  );
};

export default AvailabilityProblem;
