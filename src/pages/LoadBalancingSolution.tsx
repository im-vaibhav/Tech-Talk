import { useEffect, useRef, useState } from "react";
import EpamLogo from "@/components/EpamLogo";
import SlideBackdrop from "@/components/SlideBackdrop";
import SlideNav from "@/components/SlideNav";

/* ──────────────────────────────────────────────────────────
   REQUEST DOT — animated dot flowing left → right
────────────────────────────────────────────────────────── */
interface DotProps {
  top: number;
  delay: number;
  duration: number;
  color: string;
  size?: number;
}

const FlowDot = ({ top, delay, duration, color, size = 7 }: DotProps) => (
  <span
    className="absolute left-0 rounded-full"
    style={{
      top: `${top}%`,
      width: `${size}px`,
      height: `${size}px`,
      background: color,
      boxShadow: `0 0 ${size}px ${color}`,
      animation: `dot-flow ${duration}s ${delay}s linear infinite`,
      opacity: 0,
    }}
  />
);

const LoadBalancingSolution = () => {
  const [phase, setPhase] = useState(0);
  const started = useRef(false);
  const SPEED = 0.85;
  const t = (ms: number) => Math.round(ms * SPEED);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const timers = [
      setTimeout(() => setPhase(1), t(1500)),   // 3 servers scale up
      setTimeout(() => setPhase(2), t(5000)),   // Question: "Where does traffic go?"
      setTimeout(() => setPhase(3), t(8500)),   // LB appears between client and servers
      setTimeout(() => setPhase(4), t(12000)),  // Dots start flowing through LB to servers
      setTimeout(() => setPhase(5), t(17000)),  // Transition questions appear one by one
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // Dots for flowing through LB to 3 servers (3 lanes, 4 dots each)
  const lane1Dots: DotProps[] = Array.from({ length: 4 }, (_, i) => ({
    top: 20 + i * 8,
    delay: i * 0.6,
    duration: 2.5,
    color: "hsl(186, 90%, 55%)",
    size: 7,
  }));
  const lane2Dots: DotProps[] = Array.from({ length: 4 }, (_, i) => ({
    top: 20 + i * 8,
    delay: i * 0.6 + 0.2,
    duration: 2.5,
    color: "hsl(186, 90%, 55%)",
    size: 7,
  }));
  const lane3Dots: DotProps[] = Array.from({ length: 4 }, (_, i) => ({
    top: 20 + i * 8,
    delay: i * 0.6 + 0.4,
    duration: 2.5,
    color: "hsl(186, 90%, 55%)",
    size: 7,
  }));

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-hero">
      <SlideBackdrop />
  
      {/* Logo in top-right corner */}
      <div className="absolute right-8 top-8 z-20 opacity-0" style={{ animation: "fade-in-right 0.6s 0.3s ease-out both" }}>
        <EpamLogo />
      </div>

      {/* Custom keyframes */}
      <style>{`
        @keyframes dot-flow {
          0% { left: 0%; opacity: 0; transform: scale(0.5); }
          8% { opacity: 1; transform: scale(1); }
          88% { opacity: 0.8; transform: scale(1); }
          100% { left: 92%; opacity: 0; transform: scale(0.4); }
        }
        @keyframes lb-pulse {
          0%, 100% { filter: drop-shadow(0 0 12px hsl(186, 90%, 55%, 0.4)); }
          50% { filter: drop-shadow(0 0 28px hsl(186, 90%, 55%, 0.8)); }
        }
        @keyframes server-pop {
          0% { opacity: 0; transform: scale(0.3); }
          60% { transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes split-line-draw {
          0% { stroke-dashoffset: 120; opacity: 0; }
          15% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0.7; }
        }
        @keyframes lb-enter {
          0% { opacity: 0; transform: scale(0.4) translateY(10px); }
          60% { transform: scale(1.08) translateY(-2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes question-slide-in {
          0% { opacity: 0; transform: translateX(-30px); }
          100% { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-10 py-8 lg:px-16 lg:py-10">
        {/* Section Tag */}
        <span
          className="mb-2 inline-block w-fit rounded-full border border-[hsl(var(--teal-glow)/0.4)] bg-[hsl(var(--teal)/0.1)] px-3 py-1 text-xs font-medium uppercase tracking-wider text-[hsl(var(--teal-glow))] opacity-0"
          style={{ animation: "fade-in-left 0.6s 0.2s ease-out both" }}
        >
          Scalability — Solution 1 of 2
        </span>

        {/* Header */}
        <header className="mb-4">
          <h1
            className="text-4xl font-bold tracking-tight text-foreground opacity-0 lg:text-5xl"
            style={{ animation: "fade-in-left 0.7s 0.3s ease-out both" }}
          >
            <span className="text-gradient-teal">Load Balancing</span>
          </h1>
          <p
            className="mt-2 text-lg text-muted-foreground opacity-0 lg:text-xl"
            style={{ animation: "fade-in-left 0.7s 0.6s ease-out both" }}
          >
            Scale out. Add more servers. Then put a traffic director in front.
          </p>
        </header>

        {/* Main Visual Area */}
        <section className="relative flex flex-1 items-center justify-center">
          <div className="relative flex h-[340px] w-full max-w-5xl items-center justify-between">

            {/* LEFT: Clients */}
            <div className="flex w-24 flex-shrink-0 flex-col items-center gap-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border/40 bg-card/50">
                <span className="text-2xl">👥</span>
              </div>
              <p className="text-[10px] text-muted-foreground">Clients</p>
            </div>

            {/* CENTER: LB (appears in phase 3) */}
            <div className="flex w-24 flex-shrink-0 flex-col items-center gap-2">
              {phase >= 3 && (
                <div style={{ animation: "lb-enter 0.8s ease-out both" }}>
                  <svg viewBox="0 0 80 80" className="h-16 w-16" style={{ animation: "lb-pulse 3s 1s ease-in-out infinite" }}>
                    <polygon
                      points="40,5 72,22 72,58 40,75 8,58 8,22"
                      fill="hsl(var(--teal))"
                      stroke="hsl(var(--teal-glow))"
                      strokeWidth="2"
                    />
                    <text x="40" y="47" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">LB</text>
                  </svg>
                  <p className="mt-1 text-center text-[10px] font-semibold text-[hsl(var(--teal-glow))]">
                    Load Balancer
                  </p>
                </div>
              )}

              {/* "Where does traffic go?" question before LB appears */}
              {phase === 2 && (
                <div
                  className="rounded-lg border border-[hsl(var(--teal-glow)/0.4)] bg-card/50 px-3 py-2 text-center opacity-0"
                  style={{ animation: "fade-in-up 0.6s 0.2s ease-out both" }}
                >
                  <p className="text-xs font-medium text-[hsl(var(--teal-glow))]">Where does<br />traffic go?</p>
                  <p className="mt-1 text-xl">🤔</p>
                </div>
              )}
            </div>

            {/* Flow arrows from LB to servers (appear with LB) */}
            {phase >= 3 && (
              <svg className="absolute left-[38%] top-0 h-full w-[25%] pointer-events-none" viewBox="0 0 200 340" preserveAspectRatio="none">
                {[
                  { x1: 10, y1: 170, x2: 190, y2: 65 },
                  { x1: 10, y1: 170, x2: 190, y2: 170 },
                  { x1: 10, y1: 170, x2: 190, y2: 275 },
                ].map((line, i) => (
                  <line
                    key={`split-${i}`}
                    x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                    stroke="hsl(var(--teal-glow))"
                    strokeWidth="1.5"
                    strokeDasharray="120"
                    strokeDashoffset="120"
                    opacity="0"
                    style={{ animation: `split-line-draw 1.2s ${0.5 + i * 0.2}s ease-out both` }}
                  />
                ))}
              </svg>
            )}

            {/* Flow dots from LB to each server (appear in phase 4) */}
            {phase >= 4 && (
              <>
                {/* Lane 1 → S1 (top) */}
                <div className="absolute left-[40%] top-[8%] h-[18%] w-[32%] pointer-events-none">
                  {lane1Dots.map((dot, i) => <FlowDot key={`l1-${i}`} {...dot} />)}
                </div>
                {/* Lane 2 → S2 (middle) */}
                <div className="absolute left-[40%] top-[40%] h-[18%] w-[32%] pointer-events-none">
                  {lane2Dots.map((dot, i) => <FlowDot key={`l2-${i}`} {...dot} />)}
                </div>
                {/* Lane 3 → S3 (bottom) */}
                <div className="absolute left-[40%] top-[68%] h-[18%] w-[32%] pointer-events-none">
                  {lane3Dots.map((dot, i) => <FlowDot key={`l3-${i}`} {...dot} />)}
                </div>
              </>
            )}

            {/* RIGHT: 3 Servers (appear in phase 1) */}
            <div className="flex w-36 flex-shrink-0 flex-col items-center gap-5">
              {[
                { label: "Server 1", delay: 0 },
                { label: "Server 2", delay: 0.3 },
                { label: "Server 3", delay: 0.6 },
              ].map((server, i) => (
                <div
                  key={server.label}
                  className="flex items-center gap-3"
                  style={{
                    opacity: phase >= 1 ? 1 : 0,
                    animation: phase >= 1 ? `server-pop 0.6s ${server.delay}s ease-out both` : "none",
                  }}
                >
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: phase >= 4 ? "hsl(var(--teal))" : "hsl(var(--muted))",
                      boxShadow: phase >= 4 ? "0 0 18px hsl(186, 90%, 55%, 0.4)" : "none",
                      transition: "all 0.8s ease",
                    }}
                  >
                    <span className="text-xs font-bold text-white">S{i + 1}</span>
                  </div>
                  {phase >= 4 && (
                    <span
                      className="text-[10px] font-bold text-[hsl(var(--teal-glow))] opacity-0"
                      style={{ animation: `fade-in-right 0.4s ${0.5 + i * 0.2}s ease-out both` }}
                    >
                      {["15ms", "18ms", "12ms"][i]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Phase description text */}
          <div className="absolute bottom-0 left-0 right-0 text-center">
            {phase === 1 && (
              <p className="text-sm text-muted-foreground opacity-0" style={{ animation: "fade-in-up 0.5s 0.8s ease-out both" }}>
                Step 1: Scale out — add more servers to handle the load.
              </p>
            )}
            {phase === 2 && (
              <p className="text-sm text-[hsl(var(--teal-glow))] opacity-0" style={{ animation: "fade-in-up 0.5s 0.3s ease-out both" }}>
                But now... who decides which server gets which request?
              </p>
            )}
            {phase === 3 && (
              <p className="text-sm text-[hsl(var(--teal-glow))] opacity-0" style={{ animation: "fade-in-up 0.5s 0.5s ease-out both" }}>
                Step 2: Place a Load Balancer in front — the traffic director.
              </p>
            )}
            {phase === 4 && (
              <p className="text-sm text-[hsl(var(--teal-glow))] opacity-0" style={{ animation: "fade-in-up 0.5s 0.5s ease-out both" }}>
                Traffic split evenly. All servers healthy. No single bottleneck.
              </p>
            )}
            <p className="mt-1 text-[10px] text-muted-foreground">Animation: servers pop in, then flow dots split to show balanced routing.</p>
          </div>
        </section>

        {/* Phase 5: Transition Questions — one by one, slow, left to right */}
        {phase >= 5 && (
          <section className="mt-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              {[
                {
                  question: "But HOW does the LB decide where each request goes?",
                  note: "Random? Round-robin? Something smarter?",
                  delay: 0,
                },
                {
                  question: "What if we add a 4th server?",
                  note: "If using hash(key) % N, EVERY cached item is now in the wrong place. 100% cache miss.",
                  delay: 2.5,
                },
                {
                  question: "We need a routing algorithm that scales gracefully.",
                  note: "",
                  highlight: true,
                  delay: 5.0,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`flex-1 rounded-lg border p-3 opacity-0 ${
                    item.highlight
                      ? "border-[hsl(var(--teal-glow)/0.6)] bg-[hsl(var(--teal)/0.08)]"
                      : "border-border/40 bg-card/30"
                  }`}
                  style={{ animation: `question-slide-in 0.8s ${item.delay}s ease-out both` }}
                >
                  <p className={`text-sm font-semibold ${item.highlight ? "text-[hsl(var(--teal-glow))]" : "text-foreground"}`}>
                    {item.question}
                  </p>
                  {item.note && (
                    <p className="mt-1 text-xs text-muted-foreground">{item.note}</p>
                  )}
                  {item.highlight && (
                    <p className="mt-2 text-xs font-bold text-[hsl(var(--teal-glow))]">
                      → Next: Consistent Hashing
                    </p>
                  )}
                </div>
              ))}
          </div>
        </section>
      )}
      </div>
      
      <SlideNav prev="/scalability" next="/consistent-hashing" />
    </main>
  );
};

export default LoadBalancingSolution;
