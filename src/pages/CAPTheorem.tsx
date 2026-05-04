import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EpamLogo from "@/components/EpamLogo";
import SlideBackdrop from "@/components/SlideBackdrop";
import SlideNav from "@/components/SlideNav";

const CAPTheorem = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 700),
      setTimeout(() => setStep(2), 1600),
      setTimeout(() => setStep(3), 2600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Ensure arrow-key navigation works even if some components intercept keys.
  const navigate = useNavigate();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;

      const el = document.activeElement as HTMLElement | null;
      const tag = el?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || (el as any)?.isContentEditable) return;

      e.preventDefault();
      e.stopPropagation();

      if (e.key === "ArrowRight") navigate("/distributed");
      if (e.key === "ArrowLeft") navigate("/agenda");
    };

    window.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", handleKeyDown, { capture: true } as any);
  }, [navigate]);


  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-hero">
      <SlideBackdrop />

      {/* Logo in top-right corner */}
      <div
        className="absolute right-8 top-8 z-20 opacity-0"
        style={{ animation: "fade-in-right 0.6s 0.3s ease-out both" }}
      >
        <EpamLogo />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 lg:px-10 lg:py-8">
        {/* Heading */}
        <header
          className="opacity-0"
          style={{ animation: "fade-in-left 0.7s 0.3s ease-out both" }}
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent via-[hsl(var(--teal-glow))] to-transparent" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-[hsl(var(--teal-glow))]">
              Foundations · Slide 03
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-4xl">
            CAP Theorem: Choosing <span className="text-gradient-teal">AP</span> in Practice
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground lg:text-base">
            When the network splits (<b>P</b>), we must trade <b>C</b> for <b>A</b>.
          </p>
        </header>

        <section className="mt-5 grid flex-1 grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
          {/* LEFT: CAP triangle + AP emphasis */}
          <div
            className="relative rounded-2xl border border-white/10 bg-black/25 p-4 backdrop-blur opacity-0"
            style={{ animation: "fade-in-up 0.7s 0.7s ease-out both" }}
          >
            <div className="mb-4 text-sm font-semibold tracking-wide text-[hsl(var(--teal-glow))]">
              Visual model
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-[340px]">
              <svg viewBox="0 0 520 520" className="h-full w-full">
                <polygon
                  points="260,70 70,420 450,420"
                  fill="hsl(var(--teal)/0.06)"
                  stroke="hsl(var(--teal-glow)/0.55)"
                  strokeWidth="2"
                  style={{ animation: "cap-draw 1.1s 0.9s ease-out both" }}
                />

                <g style={{ animation: "fade-in 0.6s 1.2s ease-out both" }}>
                  <text x="260" y="55" textAnchor="middle" className="fill-foreground" fontSize="18" fontWeight="700">
                    C
                  </text>
                  <text x="55" y="445" textAnchor="start" className="fill-foreground" fontSize="18" fontWeight="700">
                    A
                  </text>
                  <text x="465" y="445" textAnchor="end" className="fill-foreground" fontSize="18" fontWeight="700">
                    P
                  </text>
                </g>

                {/* AP highlight */}
                <line
                  x1="70"
                  y1="420"
                  x2="450"
                  y2="420"
                  stroke="hsl(var(--teal-glow))"
                  strokeWidth="7"
                  strokeLinecap="round"
                  opacity={step >= 1 ? 1 : 0}
                  style={{ animation: step >= 1 ? "cap-ap 0.9s ease-out both" : undefined }}
                />

                {/* Partition crack */}
                <g opacity={step >= 2 ? 1 : 0} style={{ animation: step >= 2 ? "fade-in-up 0.6s ease-out both" : undefined }}>
                  <line x1="260" y1="120" x2="240" y2="210" stroke="rgba(255,255,255,0.35)" strokeWidth="3" />
                  <line x1="240" y1="210" x2="275" y2="290" stroke="rgba(255,255,255,0.35)" strokeWidth="3" />
                  <line x1="275" y1="290" x2="250" y2="360" stroke="rgba(255,255,255,0.35)" strokeWidth="3" />
                </g>

                {/* Small callout */}
                <g opacity={step >= 2 ? 1 : 0} style={{ animation: step >= 2 ? "fade-in-up 0.6s 0.1s ease-out both" : undefined }}>
                  <rect x="140" y="245" rx="12" ry="12" width="240" height="60" fill="rgba(0,0,0,0.45)" stroke="rgba(255,255,255,0.12)" />
                  <text x="260" y="277" textAnchor="middle" className="fill-foreground" fontSize="15" fontWeight="700">
                    Partition (P) is unavoidable
                  </text>
                </g>
              </svg>
            </div>

            {/* Quick legend */}
            <div
              className="mt-4 grid grid-cols-3 gap-2 text-sm opacity-0"
              style={{ animation: "fade-in-up 0.6s 1.6s ease-out both" }}
            >
              <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                <div className="font-semibold text-foreground">C</div>
                <div className="text-muted-foreground">Same answer everywhere</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                <div className="font-semibold text-foreground">A</div>
                <div className="text-muted-foreground">Always responds</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                <div className="font-semibold text-foreground">P</div>
                <div className="text-muted-foreground">Network can split</div>
              </div>
            </div>
          </div>

          {/* RIGHT: CP vs AP as diagrams */}
          <div className="flex flex-col gap-5">
            <div
              className="rounded-2xl border border-white/10 bg-black/25 p-4 backdrop-blur opacity-0"
              style={{ animation: "fade-in-up 0.7s 1.0s ease-out both" }}
            >
              <div className="text-sm font-semibold tracking-wide text-[hsl(var(--teal-glow))]">
                If we choose CP (keep C)
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">During partition</div>
                  <div className="mt-2 text-base font-semibold text-foreground">Some requests must stop</div>
                  <div className="mt-1 text-sm text-muted-foreground">Timeouts / errors to preserve correctness</div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">Impact</div>
                  <div className="mt-2 text-base font-semibold text-foreground">User-visible downtime</div>
                  <div className="mt-1 text-sm text-muted-foreground">Throughput drops when quorum is unreachable</div>
                </div>
              </div>

              {/* Tiny CP diagram */}
              <div className="mt-3 rounded-xl border border-white/10 bg-black/30 p-2">
                <svg viewBox="0 0 520 110" className="h-[70px] w-full">
                  <g opacity={step >= 2 ? 1 : 0} style={{ animation: step >= 2 ? "fade-in 0.5s ease-out both" : undefined }}>
                    <circle cx="120" cy="55" r="20" fill="hsl(var(--blue)/0.35)" stroke="rgba(255,255,255,0.22)" />
                    <circle cx="400" cy="55" r="20" fill="hsl(var(--blue)/0.35)" stroke="rgba(255,255,255,0.22)" />
                    <line x1="150" y1="55" x2="370" y2="55" stroke="rgba(255,255,255,0.18)" strokeWidth="6" strokeLinecap="round" />
                    <line x1="250" y1="25" x2="270" y2="85" stroke="rgba(255,80,80,0.6)" strokeWidth="6" strokeLinecap="round" />
                    <text x="260" y="105" textAnchor="middle" className="fill-muted-foreground" fontSize="14">Partition → block writes to stay consistent</text>
                  </g>
                </svg>
              </div>
            </div>

            <div
              className="rounded-2xl border border-[hsl(var(--teal-glow))/0.35] bg-[hsl(var(--teal))/0.08] p-4 shadow-[0_0_24px_hsl(var(--teal-glow)/0.18)] backdrop-blur opacity-0"
              style={{ animation: "fade-in-up 0.7s 1.4s ease-out both" }}
            >
              <div className="text-sm font-semibold tracking-wide text-[hsl(var(--teal-glow))]">
                Why we choose AP
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">During partition</div>
                  <div className="mt-2 text-base font-semibold text-foreground">Keep serving</div>
                  <div className="mt-1 text-sm text-muted-foreground">Return best-effort, queue, retry</div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">After heal</div>
                  <div className="mt-2 text-base font-semibold text-foreground">Reconcile</div>
                  <div className="mt-1 text-sm text-muted-foreground">Replication, conflict resolution</div>
                </div>
              </div>

              {/* Tiny AP diagram */}
              <div className="mt-3 rounded-xl border border-white/10 bg-black/30 p-2">
                <svg viewBox="0 0 520 110" className="h-[70px] w-full">
                  <g opacity={step >= 3 ? 1 : 0} style={{ animation: step >= 3 ? "fade-in 0.5s ease-out both" : undefined }}>
                    <circle cx="120" cy="55" r="20" fill="hsl(var(--teal)/0.35)" stroke="rgba(255,255,255,0.22)" />
                    <circle cx="400" cy="55" r="20" fill="hsl(var(--teal)/0.35)" stroke="rgba(255,255,255,0.22)" />
                    <line x1="150" y1="55" x2="370" y2="55" stroke="rgba(255,255,255,0.14)" strokeWidth="6" strokeLinecap="round" />
                    <line x1="240" y1="55" x2="280" y2="55" stroke="hsl(var(--teal-glow))" strokeWidth="6" strokeLinecap="round" style={{ animation: "pulse-line 1.2s 0.2s ease-in-out infinite" }} />
                    <text x="260" y="105" textAnchor="middle" className="fill-muted-foreground" fontSize="14">Serve locally → reconcile later</text>
                  </g>
                </svg>
              </div>

              <div
                className="mt-3 rounded-xl border border-white/10 bg-black/30 p-3 text-xs text-muted-foreground opacity-0"
                style={{ animation: "fade-in-up 0.6s 2.0s ease-out both" }}
              >
                <div className="font-semibold text-foreground">Bridge to the next slide</div>
                <p className="mt-1">
                  AP means we design around <b>scale</b>, <b>failures</b>, and <b>coordination</b> — the core challenges of a
                  distributed system.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Arrow-key navigation */}
        <SlideNav prev="/agenda" next="/distributed" />
      </div>

      <style>{`
        @keyframes cap-draw {
          from { stroke-dasharray: 1600; stroke-dashoffset: 1600; }
          to { stroke-dasharray: 1600; stroke-dashoffset: 0; }
        }
        @keyframes cap-ap {
          from { opacity: 0; stroke-dasharray: 420; stroke-dashoffset: 420; }
          to { opacity: 1; stroke-dasharray: 420; stroke-dashoffset: 0; }
        }
        @keyframes pulse-line {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 1; }
        }
      `}</style>
    </main>
  );
};

export default CAPTheorem;
