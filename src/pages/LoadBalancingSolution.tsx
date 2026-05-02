import { useEffect, useRef, useState } from "react";
import EpamLogo from "@/components/EpamLogo";
import SlideBackdrop from "@/components/SlideBackdrop";
import SlideNav from "@/components/SlideNav";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const LoadBalancingSolution = () => {
  const [phase, setPhase] = useState(0);
  const animationStarted = useRef(false);

  useEffect(() => {
    if (animationStarted.current) return;
    animationStarted.current = true;

    const timers = [
      setTimeout(() => setPhase(1), 1500),  // Show problem
      setTimeout(() => setPhase(2), 4000),  // Transition
      setTimeout(() => setPhase(3), 5000),  // Show solution
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <TooltipProvider delayDuration={150}>
      <main className="relative min-h-screen w-full overflow-hidden bg-hero">
        <SlideBackdrop />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-10 py-8 lg:px-16 lg:py-10">
          {/* Section Tag & Header */}
          <header className="mb-6">
            <div
              className="mb-3 opacity-0"
              style={{ animation: "fade-in-left 0.6s 0.2s ease-out both" }}
            >
              <span className="rounded-full border border-[hsl(var(--teal-glow)/0.4)] bg-[hsl(var(--teal)/0.15)] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.3em] text-[hsl(var(--teal-glow))]">
                Scalability - Solution 1 of 2
              </span>
            </div>
            <h1
              className="text-4xl font-bold tracking-tight text-foreground opacity-0 lg:text-5xl"
              style={{ animation: "fade-in-left 0.7s 0.4s ease-out both" }}
            >
              <span className="text-gradient-teal">Load Balancing</span>
            </h1>
            <p
              className="mt-2 text-lg text-muted-foreground opacity-0 lg:text-xl"
              style={{ animation: "fade-in-left 0.7s 0.7s ease-out both" }}
            >
              A traffic director that distributes requests across multiple servers
            </p>
          </header>

          {/* Main Visual - Before/After */}
          <section className="relative flex flex-1 items-center justify-center">
            <div className="relative grid h-full w-full max-w-6xl grid-cols-2 gap-8">
              
              {/* LEFT SIDE - Without Load Balancer */}
              <div
                className="relative flex flex-col"
                style={{
                  opacity: phase >= 2 ? 0.3 : 1,
                  transform: phase >= 2 ? "scale(0.95)" : "scale(1)",
                  transition: "all 0.8s ease-out"
                }}
              >
                <p
                  className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground opacity-0"
                  style={{ animation: "fade-in-up 0.5s 1.0s ease-out both" }}
                >
                  Without Load Balancer
                </p>

                <div className="relative flex flex-1 items-center justify-center">
                  {/* Request flow - many dots */}
                  {phase >= 1 && (
                    <div className="absolute left-0 top-1/2 h-full w-1/2 -translate-y-1/2">
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={`req-left-${i}`}
                          className="absolute h-2 w-2 rounded-full"
                          style={{
                            left: "10%",
                            top: `${30 + (i % 12) * 4}%`,
                            backgroundColor: "hsl(28 90% 60%)",
                            animation: `request-overload 1.2s ${1.5 + i * 0.08}s ease-in-out infinite`,
                            opacity: 0,
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Single Server */}
                  <div
                    className="relative opacity-0"
                    style={{ animation: "fade-scale 0.6s 1.2s ease-out both" }}
                  >
                    <svg viewBox="0 0 200 200" className="h-32 w-32 lg:h-40 lg:w-40">
                      <circle
                        cx="100"
                        cy="100"
                        r="60"
                        fill="hsl(var(--teal))"
                        stroke="hsl(var(--teal-glow))"
                        strokeWidth="4"
                        style={{
                          filter: "drop-shadow(0 0 20px hsl(var(--teal-glow) / 0.6))",
                          animation: phase >= 1 ? "server-overload-lb 2s 2s ease-out forwards" : "none"
                        }}
                      />
                      <text
                        x="100"
                        y="115"
                        textAnchor="middle"
                        fill="white"
                        fontSize="28"
                        fontWeight="bold"
                      >
                        !
                      </text>
                    </svg>

                    {/* Dropped requests */}
                    {phase >= 1 && [...Array(3)].map((_, i) => (
                      <div
                        key={`drop-${i}`}
                        className="absolute left-0 opacity-0"
                        style={{
                          top: `${20 + i * 25}%`,
                          animation: `request-bounce 1s ${3 + i * 0.2}s ease-out infinite`
                        }}
                      >
                        <span className="text-sm font-bold text-[hsl(var(--destructive))]">✕</span>
                      </div>
                    ))}

                    {/* Latency */}
                    <div
                      className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-center opacity-0"
                      style={{ animation: "fade-in-up 0.5s 3.2s ease-out both" }}
                    >
                      <p className="text-xl font-bold text-[hsl(28_90%_60%)]">450ms</p>
                    </div>
                  </div>
                </div>

                <p
                  className="mt-8 text-center text-xs italic text-muted-foreground opacity-0"
                  style={{ animation: "fade-in-up 0.5s 3.5s ease-out both" }}
                >
                  Single point of failure
                </p>
              </div>

              {/* Transition Line */}
              {phase >= 2 && (
                <div
                  className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[hsl(var(--teal-glow))] to-transparent opacity-0"
                  style={{ animation: "fade-in 0.5s 4.5s ease-out both" }}
                />
              )}

              {/* RIGHT SIDE - With Load Balancer */}
              <div
                className="relative flex flex-col"
                style={{
                  opacity: phase >= 2 ? 1 : 0,
                  transform: phase >= 2 ? "scale(1)" : "scale(0.95)",
                  transition: "all 0.8s 0.3s ease-out"
                }}
              >
                <p
                  className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground opacity-0"
                  style={{ animation: phase >= 2 ? "fade-in-up 0.5s 0.5s ease-out both" : "none" }}
                >
                  With Load Balancer
                </p>

                <div className="relative flex flex-1 flex-col items-center justify-center gap-6">
                  {/* Request flow to LB */}
                  {phase >= 3 && (
                    <div className="absolute left-0 top-1/2 h-1 w-1/3 -translate-y-1/2">
                      <svg className="h-full w-full" viewBox="0 0 200 10" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="flowToLB" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="hsl(var(--teal-glow))" stopOpacity="0" />
                            <stop offset="50%" stopColor="hsl(var(--teal-glow))" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="hsl(var(--teal-glow))" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <line
                          x1="0"
                          y1="5"
                          x2="200"
                          y2="5"
                          stroke="url(#flowToLB)"
                          strokeWidth="3"
                          style={{
                            strokeDasharray: "15 8",
                            animation: "dash-flow-simple 2s linear infinite"
                          }}
                        />
                      </svg>
                    </div>
                  )}

                  {/* Load Balancer */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className="relative opacity-0"
                        style={{ animation: phase >= 3 ? "fade-scale 0.6s 0.2s ease-out both" : "none" }}
                      >
                        <svg viewBox="0 0 120 120" className="h-24 w-24">
                          <defs>
                            <filter id="lb-glow">
                              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                              <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                          </defs>
                          <polygon
                            points="60,10 100,40 100,80 60,110 20,80 20,40"
                            fill="hsl(var(--teal))"
                            stroke="hsl(var(--teal-glow))"
                            strokeWidth="3"
                            filter="url(#lb-glow)"
                            style={{
                              animation: "pulse-glow 3s ease-in-out infinite"
                            }}
                          />
                          <text
                            x="60"
                            y="68"
                            textAnchor="middle"
                            fill="white"
                            fontSize="24"
                            fontWeight="bold"
                          >
                            LB
                          </text>
                        </svg>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      Receives all traffic, decides where to send each request
                    </TooltipContent>
                  </Tooltip>

                  {/* Three Servers */}
                  <div className="flex gap-6">
                    {[1, 2, 3].map((num, idx) => (
                      <div
                        key={num}
                        className="flex flex-col items-center gap-2 opacity-0"
                        style={{
                          animation: phase >= 3 ? `fade-scale 0.5s ${0.5 + idx * 0.2}s ease-out both` : "none"
                        }}
                      >
                        <svg viewBox="0 0 100 100" className="h-16 w-16">
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="hsl(var(--teal))"
                            stroke="hsl(var(--teal-glow))"
                            strokeWidth="2"
                            style={{
                              filter: "drop-shadow(0 0 10px hsl(var(--teal-glow) / 0.5))",
                            }}
                          />
                          <text
                            x="50"
                            y="58"
                            textAnchor="middle"
                            fill="white"
                            fontSize="20"
                            fontWeight="bold"
                          >
                            {num}
                          </text>
                        </svg>
                        <p className="text-xs font-semibold text-[hsl(var(--teal-glow))]">
                          {num === 1 ? "15ms" : num === 2 ? "18ms" : "12ms"}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Split flow lines from LB to servers */}
                  {phase >= 3 && (
                    <svg className="absolute left-1/2 top-1/2 h-full w-2/3 -translate-x-1/4 -translate-y-1/2" viewBox="0 0 300 300">
                      <defs>
                        <linearGradient id="flowSplit" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(var(--teal-glow))" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="hsl(var(--teal-glow))" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {/* Line to server 1 */}
                      <line
                        x1="80"
                        y1="140"
                        x2="120"
                        y2="200"
                        stroke="url(#flowSplit)"
                        strokeWidth="2"
                        style={{
                          strokeDasharray: "10 5",
                          animation: "dash-flow-simple 2s 0.8s linear infinite",
                          opacity: 0,
                          animationFillMode: "both"
                        }}
                      />
                      {/* Line to server 2 */}
                      <line
                        x1="100"
                        y1="150"
                        x2="150"
                        y2="210"
                        stroke="url(#flowSplit)"
                        strokeWidth="2"
                        style={{
                          strokeDasharray: "10 5",
                          animation: "dash-flow-simple 2s 1.0s linear infinite",
                          opacity: 0,
                          animationFillMode: "both"
                        }}
                      />
                      {/* Line to server 3 */}
                      <line
                        x1="120"
                        y1="140"
                        x2="180"
                        y2="200"
                        stroke="url(#flowSplit)"
                        strokeWidth="2"
                        style={{
                          strokeDasharray: "10 5",
                          animation: "dash-flow-simple 2s 1.2s linear infinite",
                          opacity: 0,
                          animationFillMode: "both"
                        }}
                      />
                    </svg>
                  )}
                </div>

                <p
                  className="mt-6 text-center text-xs italic text-muted-foreground opacity-0"
                  style={{ animation: phase >= 3 ? "fade-in-up 0.5s 2.3s ease-out both" : "none" }}
                >
                  Even distribution, no single bottleneck
                </p>
              </div>
            </div>
          </section>

          {/* L4 vs L7 Info Blocks */}
          <section className="mt-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Layer 4 */}
              <div
                className="relative overflow-hidden rounded-lg border-t-2 border-[hsl(var(--teal-glow))] bg-card/30 p-4 opacity-0"
                style={{ animation: "slide-up-stagger 0.6s 8s ease-out both" }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="text-base font-semibold text-foreground lg:text-lg">
                    Layer 4 (Transport)
                  </h4>
                  <svg viewBox="0 0 60 40" className="h-8 w-12">
                    <defs>
                      <linearGradient id="arrow-l4" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--teal-glow))" />
                        <stop offset="100%" stopColor="hsl(var(--teal-glow))" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>
                    <line x1="5" y1="20" x2="25" y2="10" stroke="url(#arrow-l4)" strokeWidth="2" />
                    <line x1="5" y1="20" x2="25" y2="20" stroke="url(#arrow-l4)" strokeWidth="2" />
                    <line x1="5" y1="20" x2="25" y2="30" stroke="url(#arrow-l4)" strokeWidth="2" />
                  </svg>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-[hsl(var(--teal-glow))]">•</span>
                    Routes by IP address and port
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[hsl(var(--teal-glow))]">•</span>
                    Fast, simple, no request inspection
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[hsl(var(--teal-glow))]">•</span>
                    Use case: Raw TCP/UDP splitting
                  </li>
                </ul>
              </div>

              {/* Layer 7 */}
              <div
                className="relative overflow-hidden rounded-lg border-t-2 border-[hsl(var(--teal-glow))] bg-card/30 p-4 opacity-0"
                style={{ animation: "slide-up-stagger 0.6s 8.3s ease-out both" }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="text-base font-semibold text-foreground lg:text-lg">
                    Layer 7 (Application)
                  </h4>
                  <svg viewBox="0 0 60 40" className="h-8 w-12">
                    <defs>
                      <linearGradient id="arrow-l7-1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--teal-glow))" />
                        <stop offset="100%" stopColor="hsl(var(--blue))" />
                      </linearGradient>
                      <linearGradient id="arrow-l7-2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--teal-glow))" />
                        <stop offset="100%" stopColor="hsl(var(--teal))" />
                      </linearGradient>
                    </defs>
                    <line x1="5" y1="20" x2="25" y2="10" stroke="url(#arrow-l7-1)" strokeWidth="2" />
                    <line x1="5" y1="20" x2="25" y2="30" stroke="url(#arrow-l7-2)" strokeWidth="2" />
                  </svg>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-[hsl(var(--teal-glow))]">•</span>
                    Routes by HTTP path, headers, cookies
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[hsl(var(--teal-glow))]">•</span>
                    Intelligent, content-aware decisions
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[hsl(var(--teal-glow))]">•</span>
                    /api/users → Service A, /api/orders → Service B
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Bottom Row */}
          <div className="mt-4 flex items-end justify-between">
            <p
              className="max-w-md text-xs italic text-muted-foreground opacity-0"
              style={{ animation: "fade-in-left 0.6s 10s ease-out both" }}
            >
              "A hotel receptionist who assigns guests to available rooms. She never sends everyone to Room 101."
            </p>
            <div
              className="opacity-0"
              style={{ animation: "fade-in-right 0.6s 10.3s ease-out both" }}
            >
              <EpamLogo />
            </div>
          </div>
        </div>

        <SlideNav prev="/scalability" next="/consistent-hashing" current={5} total={6} />
      </main>
    </TooltipProvider>
  );
};

export default LoadBalancingSolution;
