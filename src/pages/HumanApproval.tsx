import EpamLogo from "@/components/EpamLogo";
import SlideBackdrop from "@/components/SlideBackdrop";
import SlideNav from "@/components/SlideNav";

const fade = (delay: number) => ({
  animation: `fade-in-smooth 0.7s ${delay}s cubic-bezier(0.4, 0, 0.2, 1) both`,
});

const TEAL_GLOW = "hsl(187 80% 55%)";
const ORANGE = "hsl(28 90% 60%)";

export default function HumanApproval() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-hero">
      <SlideBackdrop />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-10 py-6 lg:px-14 lg:py-8">
        {/* Header */}
        <header className="mb-4">
          <div className="mb-2 opacity-0" style={fade(0.3)}>
            <span className="rounded-full border border-[hsl(var(--teal-glow)/0.4)] bg-[hsl(var(--teal)/0.15)] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.3em] text-[hsl(var(--teal-glow))]">
              OBSERVABILITY · Trust & Safety
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground opacity-0 lg:text-3xl" style={fade(0.5)}>
            Human Approval: <span className="text-gradient-teal">The Agent Never Acts Alone</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground opacity-0" style={fade(0.7)}>
            Every action proposed, every action approved, every action audited.
          </p>
        </header>

        {/* Main: Flow + Guardrails */}
        <section className="flex flex-1 gap-6">
          {/* Left: Flowchart */}
          <div className="flex-1">
            <div className="flex flex-col items-center gap-3">
              {/* Step 1: Agent detects */}
              <div className="flex items-center gap-2 opacity-0" style={fade(1.0)}>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[hsl(var(--teal-glow)/0.5)] bg-[hsl(var(--teal)/0.1)]">
                  <span className="text-sm">🤖</span>
                </div>
                <p className="text-[11px] font-semibold text-foreground">Agent detects issue & generates proposal</p>
              </div>

              <span className="text-lg opacity-0" style={{ color: TEAL_GLOW, ...fade(1.3) }}>↓</span>

              {/* Step 2: THE PROPOSAL CARD (centerpiece) */}
              <div
                className="w-full max-w-lg rounded-xl border bg-[hsl(220_25%_12%/_0.9)] opacity-0"
                style={{ borderColor: TEAL_GLOW, ...fade(1.5) }}
              >
                {/* Card header */}
                <div className="flex items-center justify-between rounded-t-xl px-4 py-2" style={{ backgroundColor: "hsl(186 85% 38% / 0.15)" }}>
                  <span className="text-[11px] font-bold text-foreground">Action Proposal #247</span>
                  <span className="rounded-full px-2 py-0.5 text-[9px] font-bold" style={{ color: ORANGE, backgroundColor: "hsl(28 90% 60% / 0.12)" }}>
                    ⏱ Expires in 29:45
                  </span>
                </div>

                {/* Card body */}
                <div className="space-y-2.5 px-4 py-3">
                  <div className="opacity-0" style={fade(1.8)}>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">WHAT</p>
                    <p className="text-[11px] font-semibold text-foreground">Restart container cache-node-2</p>
                  </div>

                  <div className="opacity-0" style={fade(2.0)}>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">WHY</p>
                    <p className="text-[10px] text-muted-foreground">
                      Node isolated in SWIM. 3 suspicion timers active. P95 latency 340ms (SLO &lt;100ms). Error rate 12%.
                    </p>
                  </div>

                  <div className="opacity-0" style={fade(2.2)}>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">EXPECTED OUTCOME</p>
                    <p className="text-[10px] text-muted-foreground">
                      Node rejoins cluster in ~30s. Latency returns to normal. SWIM timers clear.
                    </p>
                  </div>

                  <div className="flex items-center gap-4 opacity-0" style={fade(2.4)}>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">RISK</p>
                      <p className="flex items-center gap-1.5 text-[10px]">
                        <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: ORANGE }} />
                        <span style={{ color: ORANGE }}>Medium</span>
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">ROLLBACK</p>
                      <p className="text-[10px] text-muted-foreground">
                        If node fails to rejoin → deregister from SR (next proposal).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card buttons */}
                <div className="flex items-center gap-3 border-t border-border/30 px-4 py-2.5 opacity-0" style={fade(3.0)}>
                  <button className="rounded-lg px-4 py-1.5 text-[10px] font-bold text-white" style={{ backgroundColor: "hsl(186 85% 38%)" }}>
                    ✓ APPROVE
                  </button>
                  <button className="rounded-lg border border-[hsl(215_20%_40%)] px-4 py-1.5 text-[10px] font-semibold text-muted-foreground">
                    ✗ REJECT
                  </button>
                </div>
              </div>

              {/* Decision Branch */}
              <div className="flex w-full max-w-lg justify-between gap-6 opacity-0" style={fade(3.2)}>
                <span className="text-sm" style={{ color: TEAL_GLOW }}>↙</span>
                <span className="text-sm text-muted-foreground">↘</span>
              </div>

              <div className="flex w-full max-w-lg gap-4">
                {/* LEFT: Approved */}
                <div className="flex-1 rounded-xl border border-[hsl(var(--teal-glow)/0.4)] bg-[hsl(220_25%_14%/_0.6)] p-3 opacity-0" style={fade(3.5)}>
                  <p className="mb-2 text-[10px] font-bold" style={{ color: TEAL_GLOW }}>✓ APPROVED</p>
                  <ol className="space-y-1.5 text-[9px] text-muted-foreground">
                    {[
                      "Agent executes via MCP Act (dry_run=False)",
                      "Waits 60 seconds",
                      "Re-observes system (SWIM, latency, SLO)",
                    ].map((step, i) => (
                      <li key={i} className="flex gap-1.5 opacity-0" style={fade(3.7 + i * 0.3)}>
                        <span className="shrink-0 text-[8px] font-bold" style={{ color: TEAL_GLOW }}>{i + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                  {/* Outcomes */}
                  <div className="mt-2 space-y-1.5 opacity-0" style={fade(5.0)}>
                    <div className="rounded-lg border-l-2 bg-[hsl(220_25%_10%)] px-2 py-1" style={{ borderColor: TEAL_GLOW }}>
                      <p className="text-[9px]"><span style={{ color: TEAL_GLOW }}>✓ Resolved:</span> <span className="text-muted-foreground">Node back online. Error rate normal.</span></p>
                    </div>
                    <div className="rounded-lg border-l-2 bg-[hsl(220_25%_10%)] px-2 py-1" style={{ borderColor: ORANGE }}>
                      <p className="text-[9px]"><span style={{ color: ORANGE }}>⚠ Persists:</span> <span className="text-muted-foreground">Proposing next action.</span></p>
                    </div>
                  </div>
                </div>

                {/* RIGHT: Rejected */}
                <div className="flex-1 rounded-xl border border-border/30 bg-[hsl(220_25%_14%/_0.4)] p-3 opacity-0" style={fade(5.2)}>
                  <p className="mb-2 text-[10px] font-bold text-muted-foreground">✗ REJECTED / IGNORED</p>
                  <ul className="space-y-1.5 text-[9px] text-muted-foreground opacity-60">
                    {[
                      "Proposal expires after 30 minutes",
                      "No action taken. Agent logs rejection.",
                      "If alert persists, may propose alternative.",
                    ].map((step, i) => (
                      <li key={i} className="opacity-0" style={fade(5.4 + i * 0.2)}>• {step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Safety Guardrails */}
          <aside className="w-56 opacity-0" style={fade(6.0)}>
            <h4 className="mb-3 text-xs font-bold text-foreground">Safety Guardrails</h4>
            <div className="space-y-2">
              {[
                { icon: "🔒", text: "dry_run=True by default", desc: "Always simulates first" },
                { icon: "⏱", text: "30 minute expiry", desc: "Stale proposals auto-expire" },
                { icon: "🔄", text: "60s re-verification", desc: "Confirms fix worked" },
                { icon: "🎯", text: "Risk levels enforced", desc: "High = disabled by default" },
                { icon: "📋", text: "Full audit log", desc: "Who approved, what ran, result" },
                { icon: "🔐", text: "MCP Act internal only", desc: "Never public-facing" },
              ].map((item, i) => (
                <div key={i} className="rounded-lg border border-border/40 bg-card/30 p-2 opacity-0" style={fade(6.2 + i * 0.2)}>
                  <p className="flex items-center gap-1.5 text-[10px] font-semibold text-foreground">
                    <span className="text-xs">{item.icon}</span> {item.text}
                  </p>
                  <p className="ml-5 text-[9px] text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>

        {/* End-to-End Timeline */}
        <section className="mt-4 opacity-0" style={fade(8.0)}>
          <div className="rounded-xl border border-border/40 bg-[hsl(220_25%_14%/_0.5)] p-3">
            <p className="text-center text-[10px] text-muted-foreground">
              <span className="text-foreground font-semibold">Alert fires</span> (0s) →{" "}
              <span className="text-foreground font-semibold">Investigates</span> (5s) →{" "}
              <span className="text-foreground font-semibold">Proposal sent</span> (10s) →{" "}
              <span className="text-foreground font-semibold">Approved</span> (90s) →{" "}
              <span className="text-foreground font-semibold">Executed</span> (91s) →{" "}
              <span className="text-foreground font-semibold">Verified</span> (151s) →{" "}
              <span style={{ color: TEAL_GLOW }} className="font-bold">Resolved</span> (152s)
            </p>
            <div className="mt-2 flex items-center justify-center gap-6">
              <p className="text-[11px] font-bold" style={{ color: TEAL_GLOW }}>~2.5 minutes with Agentic Ops</p>
              <p className="text-[11px] text-muted-foreground">vs ~50+ minutes manual (SSH, read logs, diagnose, restart)</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-3 flex items-end justify-end">
          <div className="opacity-0" style={fade(9.7)}>
            <EpamLogo />
          </div>
        </footer>
      </div>

      <SlideNav prev="/trigger-modes" next="/closing" />
    </main>
  );
}
