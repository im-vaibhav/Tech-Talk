import EpamLogo from "@/components/EpamLogo";
import SlideBackdrop from "@/components/SlideBackdrop";
import SlideNav from "@/components/SlideNav";

const TEAL_GLOW = "hsl(187 80% 55%)";
const ORANGE = "hsl(28 90% 60%)";

const fade = (delay: number) => ({
  animation: `fade-in-smooth 0.7s ${delay}s cubic-bezier(0.4, 0, 0.2, 1) both`,
});

function Badge({ x, y, text, delay }: { x: number; y: number; text: string; delay: number }) {
  return (
    <g className="opacity-0" style={fade(delay)}>
      <rect x={x} y={y} width={28} height={12} rx={6} fill={TEAL_GLOW} opacity={0.18} stroke={TEAL_GLOW} strokeWidth={0.8} />
      <text x={x + 14} y={y + 8.5} textAnchor="middle" fill={TEAL_GLOW} fontSize="7" fontWeight="700">
        {text}
      </text>
    </g>
  );
}

function Box({
  x,
  y,
  w,
  h,
  title,
  sub,
  delay,
  stroke = TEAL_GLOW,
  fill = "hsl(220 25% 18% / 0.55)",
  badge,
  badgeDelay,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  delay: number;
  stroke?: string;
  fill?: string;
  badge?: string;
  badgeDelay?: number;
}) {
  return (
    <g className="opacity-0" style={fade(delay)}>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={fill} stroke={stroke} strokeWidth={1} />
      <text x={x + w / 2} y={y + 18} textAnchor="middle" fill="#F1F5F9" fontSize="11" fontWeight={700}>
        {title}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + 34} textAnchor="middle" fill="hsl(215 20% 70%)" fontSize="8">
          {sub}
        </text>
      )}
      {badge && badgeDelay != null && (
        <g>
          <Badge x={x + w - 38} y={y + 6} text={badge} delay={badgeDelay} />
        </g>
      )}
    </g>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  delay,
  color = TEAL_GLOW,
  dashed = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
  color?: string;
  dashed?: boolean;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const h = 6;
  return (
    <g className="opacity-0" style={fade(delay)}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={1.2} strokeDasharray={dashed ? "5 3" : "none"} opacity={0.9} />
      <polygon
        points={`${x2},${y2} ${x2 - h * Math.cos(angle - 0.45)},${y2 - h * Math.sin(angle - 0.45)} ${x2 - h * Math.cos(angle + 0.45)},${y2 - h * Math.sin(angle + 0.45)}`}
        fill={color}
        opacity={0.9}
      />
    </g>
  );
}

function Label({ x, y, text, delay, color = "hsl(215 20% 70%)", anchor = "middle" }: { x: number; y: number; text: string; delay: number; color?: string; anchor?: "start" | "middle" | "end" }) {
  return (
    <text className="opacity-0" style={fade(delay)} x={x} y={y} textAnchor={anchor} fill={color} fontSize="8" fontStyle="italic">
      {text}
    </text>
  );
}

export default function ObservabilityFoundation() {
  // Diagram coordinates (viewBox 920x520)
  const servicesY = 420;
  const serviceW = 92;
  const serviceH = 34;
  const serviceGap = 14;
  const startX = 70;
  const services = ["LB", "SR", "Cache-1", "Cache-2", "Cache-3"].map((name, i) => ({
    name,
    x: startX + i * (serviceW + serviceGap),
    y: servicesY,
  }));

  const prom = { x: 120, y: 250, w: 210, h: 70 };
  const loki = { x: 360, y: 250, w: 210, h: 70 };
  const alertm = { x: 600, y: 260, w: 220, h: 62 };
  const graf = { x: 240, y: 120, w: 380, h: 70 };

  const operator = { x: 430, y: 58 };



  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-hero">
      <SlideBackdrop />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-10 py-8 lg:px-16 lg:py-10">
        {/* Header */}
        <header className="mb-4">
          <div className="mb-3 opacity-0" style={{ animation: "fade-in-smooth 0.7s 0.3s ease-out both" }}>
            <span className="rounded-full border border-[hsl(var(--teal-glow)/0.4)] bg-[hsl(var(--teal)/0.15)] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.3em] text-[hsl(var(--teal-glow))]">
              OBSERVABILITY
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground opacity-0 lg:text-4xl" style={{ animation: "fade-in-smooth 0.7s 0.5s ease-out both" }}>
            Traditional Observability: <span className="text-gradient-teal">The Foundation</span>
          </h1>
          <p className="mt-2 text-base text-muted-foreground opacity-0 lg:text-lg" style={{ animation: "fade-in-smooth 0.7s 0.8s ease-out both" }}>
            Metrics tell you WHAT. Logs tell you WHY. Alerts tell you WHEN.
          </p>
        </header>

        {/* Main visual + SLO panel */}
        <section className="flex flex-1 gap-8">
          {/* Diagram */}
          <div className="flex-1 rounded-xl border border-border/40 bg-card/20 p-4 backdrop-blur-sm">
            <svg viewBox="0 0 920 520" className="h-full w-full">
              <defs>
                <linearGradient id="tealStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="hsl(186 85% 38%)" />
                  <stop offset="100%" stopColor="hsl(214 90% 56%)" />
                </linearGradient>
              </defs>

              {/* Services layer */}
              {services.map((s, i) => (
                <g key={s.name} className="opacity-0" style={fade(1.0 + i * 0.08)}>
                  <rect x={s.x} y={s.y} width={serviceW} height={serviceH} rx={10} fill="hsl(220 25% 18% / 0.7)" stroke="url(#tealStroke)" strokeWidth={1} />
                  <text x={s.x + serviceW / 2} y={s.y + 22} textAnchor="middle" fill="#F1F5F9" fontSize="10" fontWeight={700}>
                    {s.name}
                  </text>
                </g>
              ))}

              {/* Metrics & logs arrows */}
              {services.map((s, i) => {
                const cx = s.x + serviceW / 2;
                return (
                  <g key={`${s.name}-arrows`}>
                    {/* metrics -> prometheus */}
                    <Arrow x1={cx - 10} y1={s.y} x2={prom.x + prom.w / 2 - 60 + i * 8} y2={prom.y + prom.h} delay={2.3} color={TEAL_GLOW} />
                    {/* logs -> loki (dashed) */}
                    <Arrow x1={cx + 10} y1={s.y} x2={loki.x + loki.w / 2 - 60 + i * 8} y2={loki.y + loki.h} delay={3.0} color={TEAL_GLOW} dashed />
                  </g>
                );
              })}

              <Label x={200} y={400} text="metrics" delay={1.5} color={TEAL_GLOW} anchor="start" />
              <Label x={290} y={400} text="logs" delay={1.5} color={TEAL_GLOW} anchor="start" />

              {/* Prometheus */}
              <Box x={prom.x} y={prom.y} w={prom.w} h={prom.h} title="Prometheus" sub="existing · scrapes every 5s · SLO recording rules" delay={2.0} stroke={TEAL_GLOW} />

              {/* Loki (NEW) */}
              <Box x={loki.x} y={loki.y} w={loki.w} h={loki.h} title="Loki" sub="NEW · centralized log search" delay={2.8} stroke={TEAL_GLOW} badge="NEW" badgeDelay={2.8} />
              <Label x={loki.x + 30} y={loki.y + loki.h + 28} text="Promtail" delay={3.2} color={TEAL_GLOW} anchor="start" />

              {/* Alertmanager (NEW) */}
              <Box x={alertm.x} y={alertm.y} w={alertm.w} h={alertm.h} title="Alertmanager" sub="NEW · 7 SLO alerts wired" delay={3.5} stroke={TEAL_GLOW} badge="NEW" badgeDelay={3.5} />

              {/* Prometheus -> Alertmanager */}
              <Arrow x1={prom.x + prom.w} y1={prom.y + prom.h / 2} x2={alertm.x} y2={alertm.y + alertm.h / 2} delay={3.8} color={TEAL_GLOW} />
              <Label x={(prom.x + prom.w + alertm.x) / 2} y={prom.y + prom.h / 2 - 12} text="SLO burn-rate alerts" delay={3.8} color={TEAL_GLOW} />

              {/* Alertmanager -> webhook */}
              <Arrow x1={alertm.x + alertm.w / 2} y1={alertm.y} x2={alertm.x + alertm.w / 2} y2={graf.y + graf.h + 6} delay={4.1} color={TEAL_GLOW} dashed />
              <Label x={alertm.x + alertm.w / 2 + 34} y={alertm.y - 8} text="webhook" delay={4.1} color={TEAL_GLOW} anchor="start" />

              {/* Grafana */}
              <Box x={graf.x} y={graf.y} w={graf.w} h={graf.h} title="Grafana" sub="Unified dashboards" delay={4.5} stroke={TEAL_GLOW} fill="hsl(220 25% 16% / 0.7)" />

              {/* Prometheus -> Grafana */}
              <Arrow x1={prom.x + prom.w / 2} y1={prom.y} x2={graf.x + 120} y2={graf.y + graf.h} delay={4.8} color={TEAL_GLOW} />
              <Label x={graf.x + 120} y={graf.y + graf.h + 18} text="Prometheus" delay={5.0} color={TEAL_GLOW} />

              {/* Loki -> Grafana */}
              <Arrow x1={loki.x + loki.w / 2} y1={loki.y} x2={graf.x + graf.w - 120} y2={graf.y + graf.h} delay={4.8} color={TEAL_GLOW} dashed />
              <Label x={graf.x + graf.w - 120} y={graf.y + graf.h + 18} text="Loki" delay={5.0} color={TEAL_GLOW} />

              {/* Operator icon */}
              <g className="opacity-0" style={fade(5.3)}>
                <circle cx={operator.x} cy={operator.y} r={16} fill="hsl(186 85% 38% / 0.14)" stroke={TEAL_GLOW} strokeWidth={1} />
                <text x={operator.x} y={operator.y + 5} textAnchor="middle" fill="#F1F5F9" fontSize="16">👤</text>
                <text x={operator.x} y={operator.y + 28} textAnchor="middle" fill="hsl(215 20% 70%)" fontSize="8" fontStyle="italic">
                  Operator
                </text>
              </g>

              {/* Layer labels (minimal) */}
              <text className="opacity-0" style={fade(2.0)} x={40} y={236} fill="hsl(215 20% 70%)" fontSize="9" fontWeight={700}>
                Collection & Storage
              </text>

              {/* Dim overlay when limitation starts */}
              {/** we emulate dim by drawing a translucent rect over the diagram area */}
              <g className={"opacity-0"} style={fade(6.5)}>
                <rect x={0} y={0} width={650} height={520} fill="hsl(220 25% 10% / 0.18)" />
              </g>
            </svg>
          </div>

          {/* SLO panel */}
          <aside className="w-[360px] rounded-xl border border-border/40 bg-card/20 p-4 backdrop-blur-sm">
            <div className="opacity-0" style={fade(5.5)}>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-bold text-foreground">SLO Alert Strategy</h3>
                <span className="rounded-full bg-[hsl(var(--teal)/0.18)] px-2 py-0.5 text-[10px] font-semibold text-[hsl(var(--teal-glow))]">burn-rate</span>
              </div>

              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="rounded-lg border border-border/40 bg-card/30 p-2">
                  <p className="font-semibold text-foreground">Availability</p>
                  <p>fast-burn: <span className="text-foreground">critical</span> · slow-burn: <span className="text-foreground">warning</span></p>
                </div>
                <div className="rounded-lg border border-border/40 bg-card/30 p-2">
                  <p className="font-semibold text-foreground">Read Latency</p>
                  <p>fast-burn: <span className="text-foreground">critical</span> · slow-burn: <span className="text-foreground">warning</span></p>
                </div>
                <div className="rounded-lg border border-border/40 bg-card/30 p-2">
                  <p className="font-semibold text-foreground">Write Latency</p>
                  <p>fast-burn: <span className="text-foreground">critical</span> · slow-burn: <span className="text-foreground">warning</span></p>
                </div>
                <div className="rounded-lg border border-border/40 bg-card/30 p-2">
                  <p className="font-semibold text-foreground">Cache Hit Rate</p>
                  <p>low: <span className="text-foreground">warning</span></p>
                </div>

                <div className="mt-3 rounded-lg border border-[hsl(var(--teal-glow)/0.35)] bg-[hsl(var(--teal)/0.06)] p-2">
                  <p className="text-[11px]">
                    Alert on <span className="text-foreground font-semibold">error budget burn</span>, not raw thresholds.
                  </p>
                  <p className="mt-1 text-[11px]">
                    If you burn <span className="text-foreground font-semibold">20%</span> of monthly budget in <span className="text-foreground font-semibold">1 hour</span> → critical.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        {/* Limitation box */}
        <section className="mt-5">
          <div
            className="mx-auto w-full max-w-5xl rounded-xl border-2 border-dashed bg-[hsl(28_90%_60%/_0.06)] p-4 opacity-0"
            style={{ borderColor: "hsl(28 90% 60% / 0.6)", ...fade(6.8) }}
          >
            <p className="text-center text-sm font-semibold text-foreground opacity-0" style={fade(7.0)}>
              This still requires a <span style={{ color: ORANGE }}>HUMAN</span> to watch dashboards, interpret PromQL, SSH into machines, and manually fix issues.
              <span className="ml-2">What if we could go further?</span>
            </p>
            <div className="mx-auto mt-2 h-[2px] w-0 bg-[hsl(var(--teal-glow))] opacity-80" style={{ animation: "grow-line 0.8s 7.3s ease-out both" }} />
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-4 flex items-end justify-end">
          <div className="opacity-0" style={fade(8.3)}>
            <EpamLogo />
          </div>
        </footer>
      </div>

      <SlideNav prev="/bridge" next="/agentic-ops" />
    </main>
  );
}
