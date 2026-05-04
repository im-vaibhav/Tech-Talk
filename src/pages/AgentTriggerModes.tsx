import EpamLogo from "@/components/EpamLogo";
import SlideBackdrop from "@/components/SlideBackdrop";
import SlideNav from "@/components/SlideNav";

const fade = (delay: number) => ({
  animation: `fade-in-smooth 0.7s ${delay}s cubic-bezier(0.4, 0, 0.2, 1) both`,
});

const TEAL_GLOW = "hsl(187 80% 55%)";
const ORANGE = "hsl(28 90% 60%)";

export default function AgentTriggerModes() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-hero">
      <SlideBackdrop />
    
      {/* Logo in top-right corner */}
      <div className="absolute right-8 top-8 z-20 opacity-0" style={{ animation: "fade-in-right 0.6s 0.3s ease-out both" }}>
        <EpamLogo />
      </div>
    
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-10 py-6 lg:px-14 lg:py-8">
        {/* Header */}
        <header className="mb-4">
          <div className="mb-2 opacity-0" style={fade(0.3)}>
            <span className="rounded-full border border-[hsl(var(--teal-glow)/0.4)] bg-[hsl(var(--teal)/0.15)] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.3em] text-[hsl(var(--teal-glow))]">
              OBSERVABILITY · How the Agent Works
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground opacity-0 lg:text-3xl" style={fade(0.5)}>
            How the Agent Thinks: <span className="text-gradient-teal">Three Trigger Modes</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground opacity-0" style={fade(0.7)}>
            It doesn't just wait. It monitors, it responds, it answers.
          </p>
        </header>

        {/* Three Columns */}
        <section className="mb-4 grid flex-1 grid-cols-3 gap-4">
          {/* Column 1: Periodic Monitor */}
          <div className="flex flex-col rounded-xl border border-border/50 bg-[hsl(220_25%_14%/_0.6)] opacity-0" style={fade(1.0)}>
            <div className="border-b border-[hsl(var(--teal-glow)/0.3)] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">🕐</span>
                <h3 className="text-sm font-bold text-foreground">Periodic Monitor</h3>
              </div>
              <p className="mt-1 text-[10px] font-semibold" style={{ color: TEAL_GLOW }}>Every 5 minutes</p>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-4">
              <p className="text-[10px] text-muted-foreground opacity-0" style={fade(1.6)}>
                Collects SLO values, node count, SWIM state, error logs. Generates a plain-English health digest.
              </p>

              {/* Healthy output */}
              <div className="rounded-lg border-l-2 bg-[hsl(220_25%_10%/_0.8)] p-2 opacity-0" style={{ borderColor: TEAL_GLOW, ...fade(1.8) }}>
                <p className="font-mono text-[9px] text-muted-foreground">
                  System healthy. 3 nodes online. P99 read 45ms (SLO &lt;100ms). Hit rate 78% (SLO ≥70%). No active alerts.
                </p>
              </div>

              {/* Warning output */}
              <div className="rounded-lg border-l-2 bg-[hsl(220_25%_10%/_0.8)] p-2 opacity-0" style={{ borderColor: ORANGE, ...fade(2.2) }}>
                <p className="font-mono text-[9px] text-muted-foreground">
                  <span style={{ color: ORANGE }}>WARNING:</span> cache-node-2 has 3 active SWIM suspicion timers. Error rate 1.3% (SLO &lt;1%). Recommend investigating.
                </p>
              </div>

            </div>
          </div>

          {/* Column 2: Alert-Driven */}
          <div className="flex flex-col rounded-xl border-2 border-border/50 bg-[hsl(220_25%_14%/_0.6)] opacity-0" style={{ borderColor: "hsl(187 80% 55% / 0.4)", ...fade(3.0) }}>
            <div className="border-b border-[hsl(var(--teal-glow)/0.3)] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">🔔</span>
                <h3 className="text-sm font-bold text-foreground">Alert-Driven</h3>
              </div>
              <p className="mt-1 text-[10px] font-semibold" style={{ color: TEAL_GLOW }}>SLO alert fires via Alertmanager webhook</p>
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <ol className="space-y-1.5 text-[10px] text-muted-foreground">
                {[
                  "Identifies affected service/node from alert labels",
                  "Gathers evidence (logs, SWIM state, latency)",
                  "Produces root-cause analysis in plain English",
                  "Proposes 2-3 ranked remediation actions",
                  "Waits for human approval",
                  "After execution, re-observes at 60 seconds",
                ].map((step, i) => (
                  <li key={i} className="flex gap-2 opacity-0" style={fade(3.6 + i * 0.2)}>
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[8px] font-bold" style={{ backgroundColor: "hsl(186 85% 38% / 0.2)", color: TEAL_GLOW }}>
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>

            </div>
          </div>

          {/* Column 3: Manual Query */}
          <div className="flex flex-col rounded-xl border border-border/50 bg-[hsl(220_25%_14%/_0.6)] opacity-0" style={fade(5.5)}>
            <div className="border-b border-[hsl(var(--teal-glow)/0.3)] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">💬</span>
                <h3 className="text-sm font-bold text-foreground">Manual Query</h3>
              </div>
              <p className="mt-1 text-[10px] font-semibold" style={{ color: TEAL_GLOW }}>Operator asks in natural language</p>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-4">
              {/* Example questions */}
              <div className="rounded-lg bg-[hsl(220_25%_10%/_0.8)] p-2 opacity-0" style={fade(6.2)}>
                <p className="font-mono text-[9px] text-muted-foreground">"Why is cache hit rate dropping on node-3?"</p>
                <p className="mt-1 font-mono text-[9px] text-muted-foreground">"What happened to node-2 in the last 30 min?"</p>
                <p className="mt-1 font-mono text-[9px] text-muted-foreground">"Is the rebalance stuck?"</p>
              </div>

              <p className="text-[10px] text-muted-foreground opacity-0" style={fade(6.5)}>
                Agent selects correct MCP Observe tools, runs them, returns plain-English answer. No PromQL. No SSH.
              </p>

            </div>
          </div>
        </section>

        {/* Alert-to-Action Runbook Table */}
        <section className="opacity-0" style={fade(7.5)}>
          <h4 className="mb-2 text-xs font-bold text-foreground">Alert-to-Action Runbook</h4>
          <div className="overflow-hidden rounded-xl border border-border/40">
            <table className="w-full text-[10px]">
              <thead>
                <tr className="border-b border-border/40 bg-[hsl(220_25%_14%/_0.8)]">
                  <th className="px-3 py-2 text-left font-semibold text-foreground">Alert</th>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">Investigates</th>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">Proposes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { alert: "Availability Critical", investigates: "Error logs, SWIM, per-node latency", proposes: "Restart node · Deregister dead · Rebalance" },
                  { alert: "Read Latency Critical", investigates: "Per-node latency, SWIM, eviction rate", proposes: "Restart slowest node · Trigger rebalance" },
                  { alert: "Write Latency Critical", investigates: "Quorum rate, rebalance status", proposes: "Pause rebalance · Restart slowest node" },
                  { alert: "Cache Hit Rate Low", investigates: "Hit rate, eviction, store size", proposes: "Investigate eviction · Trigger rebalance" },
                  { alert: "Node SWIM DEAD", investigates: "SWIM health, SR vs LB node list", proposes: "Deregister from SR · SWIM rejoin · Restart" },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-border/20 opacity-0"
                    style={{ backgroundColor: i % 2 === 0 ? "hsl(220 25% 12% / 0.5)" : "hsl(220 25% 15% / 0.5)", ...fade(7.8 + i * 0.3) }}
                  >
                    <td className="px-3 py-1.5 font-semibold text-foreground">{row.alert}</td>
                    <td className="px-3 py-1.5 text-muted-foreground">{row.investigates}</td>
                    <td className="px-3 py-1.5 text-muted-foreground">{row.proposes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-1.5 text-[9px] text-muted-foreground opacity-0" style={fade(9.3)}>
            Each action includes risk level, expected outcome, and rollback steps.
        </p>
      </section>
      </div>
      
      <SlideNav prev="/agentic-ops" next="/human-approval" />
    </main>
  );
}
