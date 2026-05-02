import EpamLogo from "@/components/EpamLogo";
import SlideBackdrop from "@/components/SlideBackdrop";
import SlideNav from "@/components/SlideNav";

const fade = (delay: number) => ({
  animation: `fade-in-smooth 0.7s ${delay}s cubic-bezier(0.4, 0, 0.2, 1) both`,
});

const TEAL_GLOW = "hsl(187 80% 55%)";
const ORANGE = "hsl(28 90% 60%)";
const RED = "hsl(0 70% 55%)";

export default function AgenticOps() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-hero">
      <SlideBackdrop />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-10 py-6 lg:px-14 lg:py-8">
        {/* Header */}
        <header className="mb-3">
          <div className="mb-2 opacity-0" style={fade(0.3)}>
            <span className="rounded-full border border-[hsl(var(--teal-glow)/0.4)] bg-[hsl(var(--teal)/0.15)] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.3em] text-[hsl(var(--teal-glow))]">
              OBSERVABILITY · Agentic Operations
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground opacity-0 lg:text-3xl" style={fade(0.5)}>
            The Leap: <span className="text-gradient-teal">From Dashboards to an Intelligent Agent</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground opacity-0 lg:text-base" style={fade(0.7)}>
            The system explains itself, proposes fixes, and acts only with your permission.
          </p>
        </header>

        {/* Maturity Bar */}
        <div className="mb-4 opacity-0" style={fade(0.9)}>
          <div className="flex items-end gap-1">
            {[
              { level: "0", label: "No observability", desc: "Don't know it's broken" },
              { level: "1", label: "Dashboards", desc: "Can see it's broken" },
              { level: "2", label: "Alerting", desc: "Get told it's broken" },
              { level: "3", label: "AGENTIC OPS", desc: "Explains WHY, proposes HOW, acts with APPROVAL" },
            ].map((item, i) => {
              const isActive = i === 3;
              return (
                <div
                  key={i}
                  className="flex-1 rounded-lg border p-2 transition-all"
                  style={{
                    borderColor: isActive ? TEAL_GLOW : "hsl(215 20% 30%)",
                    backgroundColor: isActive ? "hsl(186 85% 38% / 0.12)" : "hsl(220 25% 14% / 0.4)",
                    boxShadow: isActive ? `0 0 16px hsl(186 85% 38% / 0.3)` : "none",
                  }}
                >
                  <p className="text-[10px] font-bold" style={{ color: isActive ? TEAL_GLOW : "hsl(215 20% 60%)" }}>
                    L{item.level}: {item.label}
                  </p>
                  <p className="mt-0.5 text-[9px]" style={{ color: isActive ? "#F1F5F9" : "hsl(215 20% 55%)" }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main content: Architecture + Principles */}
        <section className="flex flex-1 gap-5">
          {/* Architecture Diagram */}
          <div className="flex-1 rounded-xl border border-border/40 bg-card/20 p-5 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-5">

              {/* LAYER 1: Human / Operator */}
              <div className="opacity-0" style={fade(1.5)}>
                <div className="flex flex-col items-center gap-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[hsl(var(--teal-glow)/0.5)] bg-[hsl(var(--teal)/0.1)]">
                    <span className="text-lg">👤</span>
                  </div>
                  <p className="text-[10px] font-semibold text-foreground">Operator</p>
                  <p className="text-[9px] text-muted-foreground">Web UI · Teams · Slack</p>
                </div>
              </div>

              {/* Arrows from Operator to Agent */}
              <div className="flex items-center gap-12 opacity-0" style={fade(1.8)}>
                <div className="flex flex-col items-center">
                  <span className="text-[9px] text-muted-foreground">ask question</span>
                  <span className="text-lg text-[hsl(var(--teal-glow))]">↓</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[9px] text-muted-foreground">approve / reject</span>
                  <span className="text-lg text-[hsl(var(--teal-glow))]">↓</span>
                </div>
              </div>

              {/* LAYER 2: Ops Agent */}
              <div className="w-full max-w-xl opacity-0" style={fade(2.5)}>
                <div className="rounded-xl border-2 border-[hsl(var(--teal-glow))] bg-[hsl(220_25%_14%/_0.7)] p-4" style={{ boxShadow: `0 0 20px hsl(186 85% 38% / 0.2)` }}>
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-foreground">Ops Agent</h3>
                    <div className="flex gap-2">
                      <span className="rounded-full bg-[hsl(var(--teal)/0.2)] px-2 py-0.5 text-[8px] font-semibold text-[hsl(var(--teal-glow))]">
                        LLM: GPT-4o via EPAM Dial
                      </span>
                      <span className="rounded-full bg-[hsl(var(--teal)/0.2)] px-2 py-0.5 text-[8px] font-semibold text-[hsl(var(--teal-glow))]">
                        LangGraph + FastAPI
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] text-muted-foreground">
                    <p className="opacity-0" style={fade(2.8)}>• Periodic health monitor (every 5 min)</p>
                    <p className="opacity-0" style={fade(3.0)}>• Alert webhook receiver</p>
                    <p className="opacity-0" style={fade(3.2)}>• Manual query handler (plain English)</p>
                    <p className="opacity-0" style={fade(3.4)}>• Human approval manager (30 min expiry)</p>
                    <p className="opacity-0" style={fade(3.6)}>• Post-action verifier (re-check at 60s)</p>
                  </div>
                </div>
              </div>

              {/* Arrows from Agent to MCP servers */}
              <div className="flex w-full max-w-xl items-center justify-around opacity-0" style={fade(4.5)}>
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-semibold" style={{ color: TEAL_GLOW }}>observe</span>
                  <span className="text-lg text-[hsl(var(--teal-glow))]">↓</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-semibold" style={{ color: ORANGE }}>act (post-approval only)</span>
                  <span className="text-lg" style={{ color: ORANGE }}>↓</span>
                </div>
              </div>

              {/* LAYER 3: Two MCP Servers */}
              <div className="flex w-full gap-4">
                {/* MCP Observe */}
                <div className="flex-1 opacity-0" style={fade(5.0)}>
                  <div className="rounded-xl border border-[hsl(var(--teal-glow)/0.6)] bg-[hsl(220_25%_14%/_0.6)] p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="text-xs font-bold text-foreground">MCP Observe</h4>
                      <span className="rounded-full border border-[hsl(var(--teal-glow)/0.4)] px-2 py-0.5 text-[8px] text-[hsl(var(--teal-glow))]">read-only</span>
                    </div>
                    <ul className="space-y-1 text-[9px] text-muted-foreground">
                      {[
                        "Prometheus API (SLOs, latency, hit rate)",
                        "Loki API (logs, correlation ID)",
                        "Actuator health (per-service)",
                        "SWIM members + health",
                        "Service Registry node list",
                        "LB hash ring state",
                        "Rebalance status",
                      ].map((item, i) => (
                        <li key={i} className="opacity-0" style={fade(5.2 + i * 0.08)}>
                          <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: TEAL_GLOW }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 text-[9px] font-semibold" style={{ color: TEAL_GLOW }}>
                      Zero side effects. Safe to call anytime.
                    </p>
                  </div>
                </div>

                {/* MCP Act */}
                <div className="flex-1 opacity-0" style={fade(6.2)}>
                  <div className="rounded-xl border-2 border-dashed bg-[hsl(220_25%_14%/_0.6)] p-3" style={{ borderColor: "hsl(28 90% 60% / 0.5)" }}>
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="text-xs font-bold text-foreground">MCP Act</h4>
                      <span className="rounded-full border px-2 py-0.5 text-[8px]" style={{ borderColor: "hsl(28 90% 60% / 0.5)", color: ORANGE }}>gated actions</span>
                    </div>
                    <ul className="space-y-1 text-[9px] text-muted-foreground">
                      {[
                        { text: "Deregister dead node", risk: "low" },
                        { text: "Force SWIM rejoin", risk: "low" },
                        { text: "Toggle tracing", risk: "low" },
                        { text: "Trigger rebalance", risk: "medium" },
                        { text: "Pause/Resume rebalance", risk: "low" },
                        { text: "Restart container", risk: "medium" },
                        { text: "Start/Stop VM", risk: "high" },
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-1.5 opacity-0" style={fade(6.4 + i * 0.08)}>
                          <span
                            className="inline-block h-1.5 w-1.5 rounded-full"
                            style={{
                              backgroundColor:
                                item.risk === "high" ? RED : item.risk === "medium" ? ORANGE : TEAL_GLOW,
                            }}
                          />
                          {item.text}
                          {item.risk === "high" && (
                            <span className="ml-auto text-[7px] font-bold" style={{ color: RED }}>disabled</span>
                          )}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 text-[9px] font-semibold" style={{ color: ORANGE }}>
                      dry_run=True by default. Human approval required.
                    </p>
                    <div className="mt-1.5 opacity-0" style={fade(7.2)}>
                      <span className="rounded border border-[hsl(215_20%_40%)] bg-[hsl(220_25%_14%)] px-2 py-0.5 text-[7px] font-bold uppercase tracking-wider text-muted-foreground">
                        Internal Network Only
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* LAYER 4: Infrastructure */}
              <div className="flex w-full gap-4 opacity-0" style={fade(7.4)}>
                <div className="flex-1 text-center">
                  <p className="text-[9px] text-muted-foreground">Prometheus · Loki · Actuator · SWIM APIs</p>
                </div>
                <div className="flex-1 text-center">
                  <p className="text-[9px] text-muted-foreground">Docker Socket · Spring REST · Azure SDK</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Key Design Principles */}
          <aside className="w-52 opacity-0" style={fade(7.8)}>
            <h4 className="mb-3 text-xs font-bold text-foreground">Key Principles</h4>
            <div className="space-y-3">
              {[
                { num: "1", text: "MCP Observe = read-only. Zero side effects." },
                { num: "2", text: "MCP Act = gated. dry_run=True by default." },
                { num: "3", text: "Agent NEVER bypasses human approval." },
              ].map((item, i) => (
                <div key={i} className="rounded-lg border border-border/50 bg-card/30 p-2 opacity-0" style={fade(8.0 + i * 0.3)}>
                  <p className="text-[10px]">
                    <span className="mr-1 font-bold text-[hsl(var(--teal-glow))]">{item.num}.</span>
                    <span className="text-muted-foreground">{item.text}</span>
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </section>

        {/* Footer */}
        <footer className="mt-4 flex items-end justify-between">
          <p className="max-w-2xl text-xs italic text-muted-foreground opacity-0" style={fade(9.0)}>
            "MCP Observe is the diagnostic lab. MCP Act is the pharmacy. The Ops Agent is the doctor.
            But YOU sign consent before any treatment."
          </p>
          <div className="opacity-0" style={fade(9.3)}>
            <EpamLogo />
          </div>
        </footer>
      </div>

      <SlideNav prev="/observability" next="/trigger-modes" />
    </main>
  );
}
