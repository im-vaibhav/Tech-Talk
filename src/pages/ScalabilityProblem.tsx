import { useEffect, useRef, useState } from "react";
import EpamLogo from "@/components/EpamLogo";
import SlideBackdrop from "@/components/SlideBackdrop";
import SlideNav from "@/components/SlideNav";

/* ──────────────────────────────────────────────────────────
   REQUEST DOT COMPONENT
   A single animated dot (representing a request) that moves
   from left to right across the flow area.
────────────────────────────────────────────────────────── */
interface RequestDotProps {
  top: number;       // vertical offset (%)
  delay: number;     // animation-delay (s)
  duration: number;  // how fast it travels (s)
  color: string;     // dot color
  size?: number;     // dot size px
  dropped?: boolean; // if true, bounces off at the end
}

const RequestDot = ({ top, delay, duration, color, size = 8, dropped = false }: RequestDotProps) => (
  <span
    className="absolute left-0 rounded-full"
    style={{
      top: `${top}%`,
      width: `${size}px`,
      height: `${size}px`,
      background: color,
      boxShadow: `0 0 ${size}px ${color}`,
      animation: dropped
        ? `request-dot-dropped ${duration}s ${delay}s ease-in infinite`
        : `request-dot-flow ${duration}s ${delay}s linear infinite`,
      opacity: 0,
    }}
  />
);

const ScalabilityProblem = () => {
  const [phase, setPhase] = useState(0);
  const animationStarted = useRef(false);

  useEffect(() => {
    if (animationStarted.current) return;
    animationStarted.current = true;

    const timers = [
      setTimeout(() => setPhase(1), 1500),   // Stage 1: Normal Load
      setTimeout(() => setPhase(2), 5500),   // Stage 2: Moderate Spike
      setTimeout(() => setPhase(3), 10000),  // Stage 3: Massive Surge
      setTimeout(() => setPhase(4), 14500),  // Stage 4: Questions
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // Stage 1: 4 dots, well-spaced, calm teal
  const normalDots: RequestDotProps[] = Array.from({ length: 4 }, (_, i) => ({
    top: 25 + i * 17,
    delay: i * 0.8,
    duration: 3,
    color: "hsl(186, 90%, 55%)",
    size: 8,
  }));

  // Stage 2: 10 dots, closer together, orange-ish, faster
  const spikeDots: RequestDotProps[] = Array.from({ length: 10 }, (_, i) => ({
    top: 12 + i * 8,
    delay: i * 0.3,
    duration: 2,
    color: "hsl(28, 90%, 55%)",
    size: 9,
  }));

  // Stage 3: 18 dots (packed), fast, red, 4 are "dropped"
  const surgeDots: RequestDotProps[] = Array.from({ length: 18 }, (_, i) => ({
    top: 6 + i * 5,
    delay: i * 0.15,
    duration: 1.2,
    color: "hsl(0, 84%, 60%)",
    size: 9,
    dropped: i % 4 === 0, // every 4th request is dropped
  }));

  // Server color based on phase
  const getServerColor = () => {
    if (phase <= 1) return "hsl(var(--teal))";
    if (phase === 2) return "hsl(28, 90%, 55%)";
    return "hsl(0, 84%, 60%)";
  };

  const getServerGlow = () => {
    if (phase <= 1) return "0 0 30px hsl(186, 90%, 55%, 0.5)";
    if (phase === 2) return "0 0 30px hsl(28, 90%, 55%, 0.6)";
    return "0 0 35px hsl(0, 84%, 60%, 0.7)";
  };

  const getStatusColor = () => {
    if (phase <= 1) return "hsl(186, 90%, 55%)";
    if (phase === 2) return "hsl(28, 90%, 60%)";
    return "hsl(0, 84%, 60%)";
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-hero">
      <SlideBackdrop />

      {/* Custom keyframes for request dot animations */}
      <style>{`
        @keyframes request-dot-flow {
          0% { left: 0%; opacity: 0; transform: scale(0.5); }
          8% { opacity: 1; transform: scale(1); }
          88% { opacity: 0.8; transform: scale(1); }
          100% { left: 92%; opacity: 0; transform: scale(0.5); }
        }
        @keyframes request-dot-dropped {
          0% { left: 0%; opacity: 0; transform: scale(0.5) translateY(0); }
          8% { opacity: 1; transform: scale(1) translateY(0); }
          65% { left: 75%; opacity: 0.9; transform: scale(1) translateY(0); }
          75% { left: 76%; opacity: 0.8; transform: scale(1.3) translateY(-4px); }
          100% { left: 70%; opacity: 0; transform: scale(0.3) translateY(12px); }
        }
        @keyframes server-shake {
          0%, 100% { transform: translateX(0) translateY(0); }
          20% { transform: translateX(-3px) translateY(1px); }
          40% { transform: translateX(3px) translateY(-1px); }
          60% { transform: translateX(-2px) translateY(1px); }
          80% { transform: translateX(2px) translateY(-1px); }
        }
        @keyframes dropped-x {
          0% { opacity: 0; transform: translateY(0) scale(0.5); }
          30% { opacity: 1; transform: translateY(-6px) scale(1); }
          100% { opacity: 0; transform: translateY(-18px) scale(0.6); }
        }
      `}</style>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-10 py-8 lg:px-16 lg:py-10">
        {/* Section Tag */}
        <span
          className="mb-2 inline-block w-fit rounded-full border border-[hsl(var(--teal-glow)/0.4)] bg-[hsl(var(--teal)/0.1)] px-3 py-1 text-xs font-medium uppercase tracking-wider text-[hsl(var(--teal-glow))] opacity-0"
          style={{ animation: "fade-in-left 0.6s 0.2s ease-out both" }}
        >
          Scalability
        </span>

        {/* Header */}
        <header className="mb-4">
          <h1
            className="text-4xl font-bold tracking-tight text-foreground opacity-0 lg:text-5xl"
            style={{ animation: "fade-in-left 0.7s 0.3s ease-out both" }}
          >
            The <span className="text-gradient-teal">Scalability</span> Problem
          </h1>
          <p
            className="mt-2 text-lg text-muted-foreground opacity-0 lg:text-xl"
            style={{ animation: "fade-in-left 0.7s 0.6s ease-out both" }}
          >
            Traffic doesn't grow linearly. It spikes.
          </p>
        </header>

        {/* Main Visual Area */}
        <section className="relative flex flex-1 items-center justify-center">
          {/* Stage Indicator */}
          <div className="absolute left-0 top-0 rounded-lg border border-border/50 bg-card/40 px-4 py-2 backdrop-blur-sm">
            <p className="text-xs font-medium uppercase tracking-wider" style={{ color: getStatusColor(), transition: "color 0.6s" }}>
              {phase === 0 && "Initializing..."}
              {phase === 1 && "Stage 1 · Normal Load"}
              {phase === 2 && "Stage 2 · Traffic Spike (5×)"}
              {phase === 3 && "Stage 3 · Massive Surge (10×)"}
              {phase === 4 && "⚠ What now?"}
            </p>
          </div>

          {/* Main Animation Container */}
          <div className="relative flex h-[320px] w-full max-w-5xl items-center">

            {/* LEFT: Client Source */}
            <div className="flex w-28 flex-shrink-0 flex-col items-center gap-2">
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-border/40 bg-card/50">
                <span className="text-3xl">👥</span>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold transition-all duration-700" style={{ color: getStatusColor() }}>
                  {phase <= 1 && "100 req/s"}
                  {phase === 2 && "500 req/s"}
                  {phase >= 3 && "1,000+ req/s"}
                </p>
                <p className="text-[10px] text-muted-foreground">Clients</p>
              </div>
            </div>

            {/* CENTER: Request Flow Area - Animated Dots */}
            <div className="relative mx-4 h-[240px] flex-1">
              {/* Flow lane guide lines (subtle) */}
              <div className="absolute inset-0 flex items-center opacity-20">
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[hsl(var(--teal-glow))] to-transparent" />
              </div>

              {/* Stage 1: Normal - 4 calm teal dots */}
              {phase === 1 && normalDots.map((dot, i) => (
                <RequestDot key={`normal-${i}`} {...dot} />
              ))}

              {/* Stage 2: Spike - 10 orange dots, faster, closer */}
              {phase === 2 && spikeDots.map((dot, i) => (
                <RequestDot key={`spike-${i}`} {...dot} />
              ))}

              {/* Stage 3 & 4: Surge - 18 red dots, very fast, some dropped */}
              {(phase === 3 || phase === 4) && surgeDots.map((dot, i) => (
                <RequestDot key={`surge-${i}`} {...dot} />
              ))}

              {/* Dropped request X markers (Stage 3) */}
              {phase >= 3 && (
                <>
                  {[20, 40, 60, 80].map((top, i) => (
                    <span
                      key={`x-${i}`}
                      className="absolute text-sm font-bold text-[hsl(var(--destructive))]"
                      style={{
                        top: `${top}%`,
                        right: "12%",
                        animation: `dropped-x 2s ${i * 0.5}s ease-out infinite`,
                        opacity: 0,
                      }}
                    >
                      ✕
                    </span>
                  ))}
                </>
              )}

              {/* "QUEUE BUILDING" indicator in stage 3 */}
              {phase >= 3 && (
                <div
                  className="absolute right-[8%] top-1/2 -translate-y-1/2 rounded border border-[hsl(var(--destructive)/0.5)] bg-[hsl(var(--destructive)/0.1)] px-2 py-1 opacity-0"
                  style={{ animation: "fade-scale 0.6s 0.8s ease-out both" }}
                >
                  <p className="text-[9px] font-bold uppercase text-[hsl(var(--destructive))]">Queue Full</p>
                </div>
              )}
            </div>

            {/* RIGHT: Single Server */}
            <div className="flex w-40 flex-shrink-0 flex-col items-center gap-3">
              {/* Server circle with stress effects */}
              <div className="relative">
                {/* Stress rings */}
                {phase === 2 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="absolute h-32 w-32 rounded-full border-2"
                      style={{ borderColor: "hsl(28, 90%, 55%, 0.3)", animation: "stress-ring 2s ease-out infinite" }}
                    />
                  </div>
                )}
                {phase >= 3 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="absolute h-36 w-36 rounded-full border-2"
                      style={{ borderColor: "hsl(0, 84%, 60%, 0.4)", animation: "stress-ring 1.2s ease-out infinite" }}
                    />
                    <div
                      className="absolute h-36 w-36 rounded-full border-2"
                      style={{ borderColor: "hsl(0, 84%, 60%, 0.3)", animation: "stress-ring 1.2s 0.4s ease-out infinite" }}
                    />
                  </div>
                )}

                {/* Server node */}
                <div
                  className="relative flex h-24 w-24 items-center justify-center rounded-full transition-all duration-700"
                  style={{
                    backgroundColor: getServerColor(),
                    boxShadow: getServerGlow(),
                    animation: phase >= 3 ? "server-shake 0.4s ease-in-out infinite" : "none",
                  }}
                >
                  <div className="text-center text-white">
                    <p className="text-[10px] font-semibold uppercase tracking-wider opacity-80">Server</p>
                    <p className="text-xl font-bold">
                      {phase <= 1 ? "✓" : phase === 2 ? "⚠" : "✕"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Metrics Card */}
              <div className="w-full rounded-lg border border-border/40 bg-card/40 p-2.5 backdrop-blur-sm">
                {/* CPU */}
                <div className="mb-1.5">
                  <div className="mb-0.5 flex justify-between text-[10px]">
                    <span className="text-muted-foreground">CPU</span>
                    <span className="font-bold transition-colors duration-500" style={{ color: getStatusColor() }}>
                      {phase <= 1 ? "30%" : phase === 2 ? "72%" : "99%"}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/30">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: phase <= 1 ? "30%" : phase === 2 ? "72%" : "99%",
                        backgroundColor: getStatusColor(),
                        boxShadow: `0 0 6px ${getStatusColor()}`,
                      }}
                    />
                  </div>
                </div>
                {/* Memory */}
                <div className="mb-1.5">
                  <div className="mb-0.5 flex justify-between text-[10px]">
                    <span className="text-muted-foreground">Memory</span>
                    <span className="font-bold transition-colors duration-500" style={{ color: getStatusColor() }}>
                      {phase <= 1 ? "40%" : phase === 2 ? "68%" : "95%"}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/30">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: phase <= 1 ? "40%" : phase === 2 ? "68%" : "95%",
                        backgroundColor: getStatusColor(),
                        boxShadow: `0 0 6px ${getStatusColor()}`,
                      }}
                    />
                  </div>
                </div>
                {/* Response Time */}
                <div className="flex justify-between text-[10px]">
                  <span className="text-muted-foreground">Response</span>
                  <span className="font-bold transition-colors duration-500" style={{ color: getStatusColor() }}>
                    {phase <= 1 ? "15ms" : phase === 2 ? "180ms" : "TIMEOUT"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stage Description Label */}
          <div className="absolute bottom-2 left-0 right-0 text-center">
            {phase === 1 && (
              <p className="text-sm text-muted-foreground opacity-0" style={{ animation: "fade-in-up 0.5s 0.3s ease-out both" }}>
                Tuesday afternoon. Business as usual. Server is comfortable.
              </p>
            )}
            {phase === 2 && (
              <p className="text-sm opacity-0" style={{ color: "hsl(28, 90%, 60%)", animation: "fade-in-up 0.5s 0.3s ease-out both" }}>
                Marketing campaign goes live. Traffic 5×. Server under pressure.
              </p>
            )}
            {phase === 3 && (
              <p className="text-sm text-[hsl(var(--destructive))] opacity-0" style={{ animation: "fade-in-up 0.5s 0.3s ease-out both" }}>
                Product goes viral overnight. 10× traffic. Requests dropping. Users leaving.
              </p>
            )}
          </div>
        </section>

        {/* Phase 4: Questions + Comparison */}
        {phase === 4 && (
          <section className="mt-2">
            {/* Open Questions */}
            <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {[
                {
                  question: "Should we buy a bigger machine?",
                  note: "Vertical scaling has a ceiling. The most powerful server still has limits.",
                  delay: 0,
                },
                {
                  question: "How long until the next spike?",
                  note: "Traffic is unpredictable. You can't plan for what you can't predict.",
                  delay: 0.2,
                },
                {
                  question: "Can we add more machines?",
                  note: "But how do we split the work? How do clients know where to go?",
                  delay: 0.4,
                },
                {
                  question: "What if traffic 10x's again... while we are asleep?",
                  note: "",
                  highlight: true,
                  delay: 0.6,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`rounded-lg border p-2.5 opacity-0 ${
                    item.highlight
                      ? "border-[hsl(var(--teal-glow)/0.6)] bg-[hsl(var(--teal)/0.08)] sm:col-span-2"
                      : "border-border/40 bg-card/30"
                  }`}
                  style={{ animation: `fade-in-up 0.5s ${item.delay}s ease-out both` }}
                >
                  <p className={`text-sm font-semibold ${item.highlight ? "text-[hsl(var(--teal-glow))]" : "text-foreground"}`}>
                    {item.question}
                  </p>
                  {item.note && (
                    <p className="mt-0.5 text-xs text-muted-foreground">{item.note}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Vertical vs Horizontal comparison */}
            <div className="grid grid-cols-2 gap-3">
              <div
                className="rounded-lg border border-[hsl(28,90%,55%,0.4)] bg-card/30 p-3 opacity-0"
                style={{ animation: "fade-in-up 0.5s 0.9s ease-out both" }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-1 w-5 rounded-full bg-[hsl(28,90%,55%)]" />
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[hsl(28,90%,60%)]">
                    Scale Up (Vertical)
                  </h4>
                </div>
                <ul className="space-y-1 text-[11px] text-muted-foreground">
                  <li>• Bigger CPU, more RAM</li>
                  <li>• Has a hardware ceiling</li>
                  <li>• Single point of failure remains</li>
                </ul>
              </div>
              <div
                className="rounded-lg border border-[hsl(var(--teal-glow)/0.4)] bg-card/30 p-3 opacity-0"
                style={{ animation: "fade-in-up 0.5s 1.1s ease-out both" }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-1 w-5 rounded-full bg-[hsl(var(--teal-glow))]" />
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--teal-glow))]">
                    Scale Out (Horizontal)
                  </h4>
                </div>
                <ul className="space-y-1 text-[11px] text-muted-foreground">
                  <li>• Add more machines</li>
                  <li>• No hardware ceiling</li>
                  <li>• But how to split traffic? <span className="text-[hsl(var(--teal-glow))]">→ Next</span></li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Bottom Row */}
        <div className="mt-auto flex items-end justify-between pt-3">
          <p
            className="max-w-sm text-xs italic text-muted-foreground opacity-0"
            style={{ animation: "fade-in-left 0.6s 1.5s ease-out both" }}
          >
            "One cashier at a supermarket during Black Friday. The line wraps around the building. Do you make the cashier faster? Or open more lanes?"
          </p>
          <div className="opacity-0" style={{ animation: "fade-in-right 0.6s 1.5s ease-out both" }}>
            <EpamLogo />
          </div>
        </div>
      </div>

      <SlideNav prev="/distributed" next="/load-balancing" />
    </main>
  );
};

export default ScalabilityProblem;
