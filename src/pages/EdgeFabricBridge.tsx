import { useEffect, useRef, useState } from "react";
import EpamLogo from "@/components/EpamLogo";
import SlideBackdrop from "@/components/SlideBackdrop";
import SlideNav from "@/components/SlideNav";

// NOTE: Project does not have framer-motion installed.
// This slide mimics the provided framer-motion architecture style using existing CSS animations.

const fadeStyle = (delaySeconds: number) => ({
  animation: `fade-in-smooth 0.6s ${delaySeconds}s ease-out both`,
});

type TextAnchor = "start" | "middle" | "end" | "inherit";

function Arrow({
  x1,
  y1,
  x2,
  y2,
  delay,
  color = "hsl(215 20% 55%)",
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
  const h = 7;

  return (
    <g className="opacity-0" style={fadeStyle(delay)}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.3" strokeDasharray={dashed ? "5 3" : "none"} />
      <polygon
        points={`${x2},${y2} ${x2 - h * Math.cos(angle - 0.4)},${y2 - h * Math.sin(angle - 0.4)} ${x2 - h * Math.cos(angle + 0.4)},${y2 - h * Math.sin(angle + 0.4)}`}
        fill={color}
      />
    </g>
  );
}

function PolyArrow({
  points,
  delay,
  color,
  dashed = false,
}: {
  points: [number, number][];
  delay: number;
  color: string;
  dashed?: boolean;
}) {
  const pts = points;
  const last = pts[pts.length - 1];
  const prev = pts[pts.length - 2];
  const angle = Math.atan2(last[1] - prev[1], last[0] - prev[0]);
  const h = 7;
  const d = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");

  return (
    <g className="opacity-0" style={fadeStyle(delay)}>
      <path d={d} fill="none" stroke={color} strokeWidth="1.3" strokeDasharray={dashed ? "5 3" : "none"} />
      <polygon
        points={`${last[0]},${last[1]} ${last[0] - h * Math.cos(angle - 0.4)},${last[1] - h * Math.sin(angle - 0.4)} ${last[0] - h * Math.cos(angle + 0.4)},${last[1] - h * Math.sin(angle + 0.4)}`}
        fill={color}
      />
    </g>
  );
}

function Box({
  x,
  y,
  w,
  h,
  label,
  sub,
  color,
  delay,
  rx = 6,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  color: string;
  delay: number;
  rx?: number;
}) {
  return (
    <g className="opacity-0" style={fadeStyle(delay)}>
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={color} stroke="hsl(215 20% 35%)" strokeWidth="1" />
      <text
        x={x + w / 2}
        y={y + (sub ? h / 2 - 4 : h / 2 + 4)}
        textAnchor="middle"
        fill="#F1F5F9"
        fontSize="10"
        fontWeight="600"
      >
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 8} textAnchor="middle" fill="hsl(215 20% 72%)" fontSize="7.5">
          {sub}
        </text>
      )}
    </g>
  );
}

function Callout({
  x,
  y,
  text,
  delay,
  anchor = "start",
}: {
  x: number;
  y: number;
  text: string;
  delay: number;
  anchor?: TextAnchor;
}) {
  return (
    <text className="opacity-0" style={fadeStyle(delay)} x={x} y={y} textAnchor={anchor} fill="hsl(187 80% 55%)" fontSize="7" fontStyle="italic">
      {text}
    </text>
  );
}

const HTTP_COLOR = "hsl(210 70% 60%)";
// No green allowed in this deck, so MQTT stays teal.
const MQTT_COLOR = "hsl(187 80% 55%)";
const UDP_COLOR = "hsl(35 80% 60%)";

const EdgeFabricBridge = () => {
  const [step, setStep] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    // Drive a 9s storyboard (approx) to match the bridge timing.
    // 0-1s entry
    // 1-5s build
    // 5-7.5s gap
    // 7.5-9s close
    const timers = [
      setTimeout(() => setStep(1), 1000),
      setTimeout(() => setStep(2), 1300),
      setTimeout(() => setStep(3), 1500),
      setTimeout(() => setStep(4), 1700),
      setTimeout(() => setStep(5), 2000),
      setTimeout(() => setStep(6), 2500),
      setTimeout(() => setStep(7), 2800),
      setTimeout(() => setStep(8), 3000),
      setTimeout(() => setStep(9), 3200),
      setTimeout(() => setStep(10), 3400),
      setTimeout(() => setStep(11), 3800),
      setTimeout(() => setStep(12), 4000),
      setTimeout(() => setStep(13), 5000),
      setTimeout(() => setStep(14), 5300),
      setTimeout(() => setStep(15), 5500),
      setTimeout(() => setStep(16), 5800),
      setTimeout(() => setStep(17), 6500),
      setTimeout(() => setStep(18), 7500),
      setTimeout(() => setStep(19), 8000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);


  const TEAL = "hsl(186 85% 38%)";
  const TEAL_GLOW = "hsl(187 80% 55%)";
  const GAP = "hsl(28 90% 60% / 0.5)";

  const architectureOpacity = step >= 13 ? 0.7 : 1;

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-hero">
      <SlideBackdrop />
  
      {/* Logo in top-right corner */}
      <div className="absolute right-8 top-8 z-20 opacity-0" style={{ animation: "fade-in-right 0.6s 0.3s ease-out both" }}>
        <EpamLogo />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-10 py-8 lg:px-16 lg:py-10">
        {/* Header */}
        <header className="mb-5">
          <div className="mb-3 opacity-0" style={{ animation: "fade-in-smooth 0.6s 0.2s ease-out both" }}>
            <span className="rounded-full border border-[hsl(var(--teal-glow)/0.4)] bg-[hsl(var(--teal)/0.15)] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.3em] text-[hsl(var(--teal-glow))]">
              FROM THEORY TO PRACTICE
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground opacity-0 lg:text-4xl" style={{ animation: "fade-in-smooth 0.6s 0.5s ease-out both" }}>
            We Built This. <span className="text-gradient-teal">Now How Do We Operate It?</span>
          </h1>
        </header>

        {/* Diagram + Pillars */}
        <section className="flex flex-1 items-start gap-8">
          <div className="flex-1 rounded-xl border border-border/40 bg-card/20 p-4 backdrop-blur-sm" style={{ opacity: architectureOpacity, transition: "opacity 0.7s ease" }}>
            <svg viewBox="0 0 760 500" className="h-auto w-full">
              {/* Client Applications */}
              {step >= 1 && <Box x={280} y={12} w={160} h={38} label="Client Applications" sub="HTTP REST" color="hsl(220 25% 22%)" delay={0.2} />}

              {/* Client -> LB */}
              {step >= 1 && <Arrow x1={360} y1={50} x2={360} y2={82} delay={0.3} color={HTTP_COLOR} />}
              {step >= 1 && <Callout x={360} y={72} text="HTTP API" delay={0.34} anchor="middle" />}

              {/* Load Balancer */}
              {/* Azure L4 Load Balancer */}
              {step >= 2 && (
                <g className="opacity-0" style={fadeStyle(0.3)}>
                  <rect x={240} y={82} width={240} height={52} rx={8} fill="hsl(217 60% 28%)" stroke="hsl(217 50% 45%)" strokeWidth="1.2" />
                  <text x={360} y={101} textAnchor="middle" fill="#F1F5F9" fontSize="11" fontWeight="700">
                    Azure L4 Load Balancer
                  </text>
                  <text x={360} y={116} textAnchor="middle" fill="hsl(215 20% 70%)" fontSize="8">
                    routes to L7 LB instances
                  </text>
                </g>
              )}

              {/* Two L7 LB Instances */}
              {step >= 4 && (
                <>
                  <g className="opacity-0" style={fadeStyle(0.38)}>
                    <rect x={170} y={150} width={170} height={40} rx={8} fill="hsl(217 55% 22%)" stroke={TEAL_GLOW} strokeWidth="1" opacity={0.9} />
                    <text x={255} y={168} textAnchor="middle" fill="#F1F5F9" fontSize="9.5" fontWeight="700">
                      L7 LB Instance #1
                    </text>
                    <text x={255} y={182} textAnchor="middle" fill="hsl(215 20% 70%)" fontSize="7.5">
                      consistent hashing + quorum
                    </text>
                  </g>
                  <g className="opacity-0" style={fadeStyle(0.42)}>
                    <rect x={380} y={150} width={170} height={40} rx={8} fill="hsl(217 55% 22%)" stroke={TEAL_GLOW} strokeWidth="1" opacity={0.9} />
                    <text x={465} y={168} textAnchor="middle" fill="#F1F5F9" fontSize="9.5" fontWeight="700">
                      L7 LB Instance #2
                    </text>
                    <text x={465} y={182} textAnchor="middle" fill="hsl(215 20% 70%)" fontSize="7.5">
                      consistent hashing + quorum
                    </text>
                  </g>

                  {/* Azure L4 -> L7 fanout */}
                  <Arrow x1={320} y1={134} x2={255} y2={150} delay={0.44} color={HTTP_COLOR} />
                    <Arrow x1={400} y1={134} x2={465} y2={150} delay={0.46} color={HTTP_COLOR} />
                </>
              )}

              {/* Hash ring mini icon */}
              {step >= 3 && (
                <g className="opacity-0" style={fadeStyle(0.45)}>
                  <ellipse cx={272} cy={108} rx={18} ry={10} fill="none" stroke={TEAL_GLOW} strokeWidth="1" strokeDasharray="3 2" />
                  <text x={272} y={111} textAnchor="middle" fill={TEAL_GLOW} fontSize="5.5" fontWeight="500">
                    Hash Ring
                  </text>
                </g>
              )}

              {/* LB tags (theory mapping) */}
              {step >= 3 && (
                <g className="opacity-0" style={fadeStyle(0.48)}>
                  <rect x={240} y={66} width={92} height={14} rx={4} fill={TEAL} opacity={0.2} stroke={TEAL_GLOW} strokeWidth={0.8} />
                  <text x={286} y={76} textAnchor="middle" fill={TEAL_GLOW} fontSize="7" fontWeight="600">
                    L4/L7 Routing
                  </text>
                </g>
              )}
              {step >= 3 && (
                <g className="opacity-0" style={fadeStyle(0.52)}>
                  <rect x={338} y={66} width={142} height={14} rx={4} fill={TEAL} opacity={0.2} stroke={TEAL_GLOW} strokeWidth={0.8} />
                  <text x={409} y={76} textAnchor="middle" fill={TEAL_GLOW} fontSize="7" fontWeight="600">
                    Consistent Hash Ring
                  </text>
                </g>
              )}

              {/* LB behaviors box is excluded on bridge slide (keeps it clean / per requirements) */}

              {/* LB -> Cache */}
              {step >= 6 && (
                <>
                  {/* L7 LB instances -> Cache Cluster (clean bus + taps) */}
                  <g className="opacity-0" style={fadeStyle(0.5)}>
                    {/* down from each L7 into a shared bus */}
                    <line x1={255} y1={190} x2={255} y2={205} stroke={HTTP_COLOR} strokeWidth="1.3" />
                    <line x1={465} y1={190} x2={465} y2={205} stroke={HTTP_COLOR} strokeWidth="1.3" />

                    {/* shared horizontal bus (kept above cluster border) */}
                    <line x1={235} y1={205} x2={485} y2={205} stroke={HTTP_COLOR} strokeWidth="1.3" opacity="0.9" />

                    {/* taps into nodes */}
                    <line x1={255} y1={205} x2={210} y2={220} stroke={HTTP_COLOR} strokeWidth="1.3" />
                    <line x1={360} y1={205} x2={360} y2={220} stroke={HTTP_COLOR} strokeWidth="1.3" />
                    <line x1={465} y1={205} x2={510} y2={220} stroke={HTTP_COLOR} strokeWidth="1.3" />

                    <text x={360} y={197} textAnchor="middle" fill={HTTP_COLOR} fontSize="7.5" fontWeight="500">HTTP fan-out</text>
                  </g>

                  {/* removed extra callout to reduce clutter */}
                </>
              )}

              {/* Cache cluster region */}
              {step >= 6 && (
                <g className="opacity-0" style={fadeStyle(0.45)}>
                  <rect x={120} y={200} width={490} height={90} rx={10} fill="hsl(50 60% 50% / 0.06)" stroke="hsl(50 60% 50%)" strokeWidth="1" strokeDasharray="6 3" />
                  <text x={135} y={215} fill="hsl(50 60% 55%)" fontSize="8" fontWeight="700" letterSpacing="0.5">
                    CACHE CLUSTER
                  </text>
                </g>
              )}

              {step >= 6 && (
                <>
                  <Box x={140} y={225} w={130} h={40} label="Cache Node 1" sub="Spring Boot · :8081" color="hsl(50 40% 22%)" delay={0.55} />
                  <Box x={295} y={225} w={130} h={40} label="Cache Node 2" sub="Spring Boot · :8082" color="hsl(50 40% 22%)" delay={0.57} />
                  <Box x={455} y={225} w={130} h={40} label="Cache Node 3" sub="Spring Boot · :8083" color="hsl(50 40% 22%)" delay={0.59} />
                </>
              )}

              {/* SWIM UDP lines */}
              {step >= 7 && (
                <>
                  <Arrow x1={270} y1={250} x2={295} y2={250} delay={0.65} color={UDP_COLOR} />
                  <Arrow x1={295} y1={240} x2={270} y2={240} delay={0.65} color={UDP_COLOR} />
                  <Arrow x1={425} y1={250} x2={455} y2={250} delay={0.65} color={UDP_COLOR} />
                  <Arrow x1={455} y1={240} x2={425} y2={240} delay={0.65} color={UDP_COLOR} />
                  {/* keep SWIM subtle and uncluttered */}
                  <Callout x={360} y={328} text="SWIM (UDP ping/ack + gossip)" delay={0.7} anchor="middle" />
                </>
              )}

              {/* Bottom: Service Registry + Mosquitto */}
              {step >= 5 && <Box x={70} y={380} w={180} h={50} label="Service Registry" sub="Spring Boot · :8090" color="hsl(160 40% 22%)" delay={0.6} />}
              {step >= 5 && <Callout x={70} y={445} text="Source of truth for active nodes" delay={0.7} />}

              {step >= 5 && <Box x={480} y={380} w={180} h={50} label="Mosquitto MQTT Broker" sub="MQTT · :1883" color="hsl(220 25% 18%)" delay={0.6} />}
              {step >= 5 && <Callout x={480} y={445} text="Real-time topology notification channel" delay={0.7} />}

              {/* Cache -> Service Registry */}
              {step >= 5 && (
                <>
                  <PolyArrow points={[[155, 265], [155, 330], [160, 380]]} delay={0.65} color={HTTP_COLOR} />
                  <Callout x={95} y={340} text="HTTP register/deregister" delay={0.67} anchor="start" />
                </>
              )}

              {/* Service Registry -> Mosquitto */}
              {step >= 5 && <Arrow x1={250} y1={405} x2={480} y2={405} delay={0.7} color={MQTT_COLOR} />}
              {step >= 5 && <Callout x={365} y={395} text="MQTT: NODE_ADDED / NODE_REMOVED" delay={0.72} anchor="middle" />}

              {/* Mosquitto -> LB (right-side route) */}
              {step >= 5 && (
                <>
                  {/* Mosquitto -> Azure L4 -> L7s (clean right-side route) */}
                  <PolyArrow points={[[660, 405], [720, 405], [720, 108], [480, 108]]} delay={0.75} color={MQTT_COLOR} />
                  <text
                    className="opacity-0"
                    style={fadeStyle(0.75)}
                    x={732}
                    y={270}
                    textAnchor="middle"
                    fill={MQTT_COLOR}
                    fontSize="7"
                    fontWeight="500"
                    transform="rotate(-90 732 270)"
                  >
                    MQTT subscribe: node-events
                  </text>
                </>
              )}

              {/* LB -> Service Registry (left-side safety net) */}
              {step >= 5 && (
                <>
                  <PolyArrow points={[[240, 108], [60, 108], [60, 405], [70, 405]]} delay={0.8} color={HTTP_COLOR} dashed />
                  <text
                    className="opacity-0"
                    style={fadeStyle(0.8)}
                    x={54}
                    y={270}
                    textAnchor="middle"
                    fill={HTTP_COLOR}
                    fontSize="7"
                    fontStyle="italic"
                    transform="rotate(-90 54 270)"
                  >
                    periodic sync / poll
                  </text>
                </>
              )}

              {/* Cache tags: Reliability + Availability mapping */}
              {step >= 8 && (
                <g className="opacity-0" style={fadeStyle(0.9)}>
                  <rect x={140} y={312} width={160} height={16} rx={5} fill={TEAL} opacity={0.18} stroke={TEAL_GLOW} strokeWidth={0.8} />
                  <text x={220} y={323} textAnchor="middle" fill={TEAL_GLOW} fontSize="7" fontWeight="600">
                    Replication RF=3 + Quorum
                  </text>
                </g>
              )}
              {step >= 9 && (
                <g className="opacity-0" style={fadeStyle(1.05)}>
                  <rect x={305} y={292} width={120} height={16} rx={5} fill={TEAL} opacity={0.18} stroke={TEAL_GLOW} strokeWidth={0.8} />
                  <text x={365} y={303} textAnchor="middle" fill={TEAL_GLOW} fontSize="7" fontWeight="600">
                    WAL + Snapshots
                  </text>
                </g>
              )}
              {step >= 10 && (
                <g className="opacity-0" style={fadeStyle(1.2)}>
                  <rect x={430} y={292} width={95} height={16} rx={5} fill={TEAL} opacity={0.18} stroke={TEAL_GLOW} strokeWidth={0.8} />
                  <text x={477.5} y={303} textAnchor="middle" fill={TEAL_GLOW} fontSize="7" fontWeight="600">
                    SWIM Protocol
                  </text>
                </g>
              )}

              {/* Rebalance (simple) */}
              {step >= 11 && (
                <>
                  <Box x={300} y={320} w={130} h={40} label="Rebalance" sub="Drain, warm-up, safe key movement" color="hsl(280 30% 22%)" delay={1.35} />
                  <PolyArrow points={[[360, 320], [360, 290]]} delay={1.4} color={TEAL_GLOW} dashed />
                </>
              )}

              {/* Legend removed (bridge slide stays focused) */}
            </svg>
          </div>

          {/* Pillar mapping list */}
          <aside className="w-56 pt-10">
            {step >= 4 && (
              <div className="opacity-0" style={fadeStyle(1.7)}>
                <div className="rounded-lg border border-[hsl(var(--teal-glow)/0.4)] bg-[hsl(var(--teal)/0.12)] px-3 py-2">
                  <p className="text-xs font-bold text-[hsl(var(--teal-glow))]">Scalability</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">LB: routing + hash ring</p>
                </div>
              </div>
            )}

            {step >= 9 && (
              <div className="mt-3 opacity-0" style={fadeStyle(3.2)}>
                <div className="rounded-lg border border-[hsl(var(--teal-glow)/0.4)] bg-[hsl(var(--teal)/0.12)] px-3 py-2">
                  <p className="text-xs font-bold text-[hsl(var(--teal-glow))]">Reliability</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">RF=3 + Quorum</p>
                  <p className="text-[11px] text-muted-foreground">WAL + Snapshots</p>
                </div>
              </div>
            )}

            {step >= 10 && (
              <div className="mt-3 opacity-0" style={fadeStyle(3.5)}>
                <div className="rounded-lg border border-[hsl(var(--teal-glow)/0.4)] bg-[hsl(var(--teal)/0.12)] px-3 py-2">
                  <p className="text-xs font-bold text-[hsl(var(--teal-glow))]">Availability</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">SWIM detection + reroute</p>
                </div>
              </div>
            )}
          </aside>
        </section>

        {/* Gap reveal */}
        {step >= 14 && (
          <section className="mt-6">
            <div className="mx-auto w-full max-w-4xl rounded-xl border-2 border-dashed p-4 opacity-0" style={{ borderColor: GAP, backgroundColor: "hsl(28 90% 60% / 0.06)", animation: "fade-in-smooth 0.6s 0.2s ease-out both" }}>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed" style={{ borderColor: "hsl(28 90% 60% / 0.7)" }}>
                  <span className="text-2xl font-bold" style={{ color: "hsl(28 90% 60%)" }}>
                    ?
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground">Observability = ?</p>
                  <p className="mt-1 text-[11px] text-muted-foreground opacity-0" style={{ animation: "fade-in-smooth 0.6s 0.5s ease-out both" }}>
                    5 services · 6+ containers · Multiple Azure VMs · Thousands of requests/sec
                  </p>
                </div>
              </div>

              {step >= 17 && (
                <div className="mt-3 rounded-lg border border-[hsl(var(--teal-glow)/0.35)] bg-[hsl(var(--teal)/0.06)] px-5 py-3 opacity-0" style={{ animation: "fade-in-smooth 0.6s 0.2s ease-out both" }}>
                  <p className="text-center text-lg font-bold text-foreground">
                    It works. But how do we <span className="text-gradient-teal">KNOW</span> it's working?
                  </p>
                  <div className="mx-auto mt-2 h-[2px] w-0 bg-[hsl(var(--teal-glow))] opacity-80" style={{ animation: "grow-line 0.8s 0.3s ease-out both" }} />
                </div>
              )}
            </div>
          </section>
        )}
      </div>
      
      <SlideNav prev="/wal" next="/observability" />
    </main>
  );
};

export default EdgeFabricBridge;
