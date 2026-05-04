import EpamLogo from "@/components/EpamLogo";
import SlideBackdrop from "@/components/SlideBackdrop";
import SlideNav from "@/components/SlideNav";

const fade = (delay: number) => ({
  animation: `fade-in-smooth 0.7s ${delay}s cubic-bezier(0.4, 0, 0.2, 1) both`,
});

const TEAL_GLOW = "hsl(187 80% 55%)";

export default function ClosingRecap() {
  const quadrants = [
    {
      title: "Scalability",
      problem: "Single machine limits",
      solution: "Load Balancing + Consistent Hashing",
      icon: "⚖️",
      highlight: false,
    },
    {
      title: "Reliability",
      problem: "Data loss and corruption",
      solution: "Replication + Read Repair + WAL",
      icon: "📋",
      highlight: false,
    },
    {
      title: "Availability",
      problem: "Downtime and cascading failure",
      solution: "Gossip/SWIM + Quorum + Auto-Rerouting",
      icon: "🔄",
      highlight: false,
    },
    {
      title: "Observability",
      problem: "Flying blind and slow response",
      solution: "Metrics + Logs + Agentic Ops (MCP + LLM)",
      icon: "🧠",
      highlight: true,
    },
  ];

  const phases = [
    { label: "Log Aggregation", desc: "Loki + Promtail + Alertmanager" },
    { label: "MCP Observe", desc: "Read-only system state" },
    { label: "MCP Act", desc: "Gated actions + dry-run" },
    { label: "Ops Agent", desc: "LLM + LangGraph + FastAPI" },
    { label: "Azure Deploy", desc: "Production + notifications" },
  ];

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-hero">
      <SlideBackdrop />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-10 py-6 lg:px-14 lg:py-8">
        {/* Header */}
        <header className="mb-5">
          <div className="mb-2 opacity-0" style={fade(0.2)}>
            <span className="rounded-full border border-[hsl(var(--teal-glow)/0.4)] bg-[hsl(var(--teal)/0.15)] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.3em] text-[hsl(var(--teal-glow))]">
              CLOSING
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground opacity-0 lg:text-3xl" style={fade(0.5)}>
            Recap: <span className="text-gradient-teal">From Surviving Failures to Responding Intelligently</span>
          </h1>
        </header>

        {/* 4-Quadrant Grid */}
        <section className="mb-5 grid grid-cols-2 gap-3">
          {quadrants.map((q, i) => (
            <div
              key={q.title}
              className="rounded-xl border p-4 opacity-0"
              style={{
                borderColor: q.highlight ? TEAL_GLOW : "hsl(215 20% 30%)",
                backgroundColor: q.highlight ? "hsl(186 85% 38% / 0.08)" : "hsl(220 25% 14% / 0.5)",
                boxShadow: q.highlight ? `0 0 20px hsl(186 85% 38% / 0.2)` : "none",
                ...fade(1.0 + i * 0.5),
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{q.icon}</span>
                <div className="flex-1">
                  <h3 className="text-sm font-bold" style={{ color: q.highlight ? TEAL_GLOW : "#F1F5F9" }}>
                    {q.title}
                  </h3>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">{q.problem}</p>
                  <p className="mt-1 text-[11px] font-semibold text-foreground">{q.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Key Insight Quote */}
        <section className="mb-5 opacity-0" style={fade(4.0)}>
          <div className="mx-auto max-w-4xl rounded-xl border-l-4 bg-[hsl(220_25%_10%/_0.7)] px-6 py-4" style={{ borderColor: TEAL_GLOW }}>
            <p className="text-center text-sm leading-relaxed text-foreground lg:text-base">
              <span className="opacity-0" style={fade(4.2)}>
                The first three pillars make your system <span className="font-bold">SURVIVE</span> failures.
              </span>{" "}
              <span className="opacity-0" style={fade(4.5)}>
                Observability makes you <span className="font-bold">AWARE</span> of failures.
              </span>{" "}
              <span className="opacity-0" style={fade(4.8)}>
                Agentic Ops makes you{" "}
                <span className="font-bold" style={{ color: TEAL_GLOW }}>
                  RESPOND
                </span>{" "}
                to failures — intelligently, in minutes, with accountability.
              </span>
            </p>
          </div>
        </section>

        {/* Delivery Timeline */}
        <section className="mb-5 opacity-0" style={fade(5.5)}>
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center justify-between">
              {phases.map((phase, i) => (
                <div key={i} className="flex flex-col items-center opacity-0" style={fade(5.7 + i * 0.2)}>
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-full border text-[9px] font-bold"
                    style={{ borderColor: TEAL_GLOW, color: TEAL_GLOW, backgroundColor: "hsl(186 85% 38% / 0.1)" }}
                  >
                    {i + 1}
                  </div>
                  <p className="mt-1.5 text-center text-[10px] font-semibold text-foreground">{phase.label}</p>
                  <p className="text-center text-[8px] text-muted-foreground">{phase.desc}</p>
                </div>
              ))}
            </div>
            {/* Connecting line */}
            <div className="relative -mt-[52px] mx-auto h-[2px] w-[80%]" style={{ backgroundColor: "hsl(186 85% 38% / 0.3)" }}>
              <div className="absolute left-0 top-0 h-full w-0 opacity-0" style={{ backgroundColor: TEAL_GLOW, ...fade(5.7), animationName: "grow-line" }} />
            </div>
            <p className="mt-8 text-center text-[10px] font-semibold text-muted-foreground opacity-0" style={fade(6.8)}>
              This is not a concept. This is a <span className="text-foreground">real delivery plan</span>.
            </p>
          </div>
        </section>

        {/* Closing Thought */}
        <section className="mb-4 opacity-0" style={fade(7.0)}>
          <p className="text-center text-base font-bold leading-relaxed text-foreground lg:text-lg">
            "Distributed systems aren't about preventing failure — failure is inevitable.
            <br />
            They're about making failure{" "}
            <span style={{ color: TEAL_GLOW }}>invisible to your users</span>."
          </p>
        </section>

        {/* Thank You + Q&A */}
        <footer className="flex items-end justify-between border-t border-border/30 pt-4">
          <div className="opacity-0" style={fade(8.0)}>
            <p className="text-lg font-bold text-foreground">Thank You</p>
          </div>
          <div className="text-center opacity-0" style={fade(8.0)}>
            <p className="text-sm text-muted-foreground">
              We'd love to hear your thoughts, questions, and ideas.
            </p>
            <p className="mt-1 text-xs font-semibold" style={{ color: TEAL_GLOW }}>
              The floor is yours.
            </p>
          </div>
          <div className="flex items-center gap-4 opacity-0" style={fade(8.3)}>
            <span className="rounded-full border border-[hsl(var(--teal-glow)/0.5)] px-3 py-1 text-xs font-bold" style={{ color: TEAL_GLOW }}>
              Q&A
            </span>
            <EpamLogo />
          </div>
        </footer>
      </div>

      <SlideNav prev="/human-approval" />
    </main>
  );
}
