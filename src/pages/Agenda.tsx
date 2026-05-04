import EpamLogo from "@/components/EpamLogo";
import SlideBackdrop from "@/components/SlideBackdrop";
import SlideNav from "@/components/SlideNav";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AgendaItem {
  n: number;
  title: string;
  desc: string;
  hint: string;
  variant: "theory" | "bridge" | "highlight" | "demo";
}

const items: AgendaItem[] = [
  { n: 1, title: "Scalability", desc: "Handling 10x traffic without breaking", hint: "Consistent Hashing keeps load balanced as nodes scale.", variant: "theory" },
  { n: 2, title: "Reliability", desc: "Never losing data, even when machines crash", hint: "Replication + Write-Ahead Logs guarantee durability.", variant: "theory" },
  { n: 3, title: "Availability", desc: "Staying online when things go wrong", hint: "Quorum and graceful degradation keep us up.", variant: "theory" },
  { n: 4, title: "EdgeFabric Atlas", desc: "A real system where all 4 pillars meet", hint: "A production blueprint stitching the pillars together.", variant: "bridge" },
  { n: 5, title: "Observability & Agentic Ops", desc: "AI that operates your infrastructure", hint: "Agents that detect, decide, and self-heal in real time.", variant: "highlight" },
  { n: 6, title: "Live Demo", desc: "Agentic Operations in action", hint: "Watch the agents triage and remediate live.", variant: "demo" },
];

const nodeStyles: Record<AgendaItem["variant"], string> = {
  theory: "bg-[hsl(var(--teal))] border-[hsl(var(--teal-glow))] shadow-[0_0_18px_hsl(var(--teal)/0.55)]",
  bridge: "bg-[hsl(var(--blue))] border-[hsl(var(--teal-glow))] shadow-[0_0_18px_hsl(var(--blue)/0.55)]",
  highlight:
    "bg-[hsl(var(--teal-glow))] border-white shadow-[0_0_38px_hsl(var(--teal-glow)/0.95)] scale-110",
  demo: "bg-[hsl(var(--blue))] border-[hsl(var(--teal-glow))] shadow-[0_0_18px_hsl(var(--blue)/0.55)]",
};

const Agenda = () => {
  return (
    <TooltipProvider delayDuration={150}>
      <main className="relative min-h-screen w-full overflow-hidden bg-hero">
        <SlideBackdrop />
    
        {/* Logo in top-right corner */}
        <div className="absolute right-8 top-8 z-20 opacity-0" style={{ animation: "fade-in-right 0.6s 0.3s ease-out both" }}>
          <EpamLogo />
        </div>
    
        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-12 py-12 lg:px-20 lg:py-16">
          {/* Heading */}
          <header className="anim-title mb-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-12 bg-gradient-to-r from-transparent via-[hsl(var(--teal-glow))] to-transparent" />
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-[hsl(var(--teal-glow))]">
                Agenda · Slide 02
              </span>
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground lg:text-6xl">
              What We'll <span className="text-gradient-teal">Cover</span>
            </h1>
          </header>

          {/* Timeline */}
          <section className="relative flex-1">
            <div className="relative grid grid-cols-[80px_1fr_140px] gap-x-6">
              {/* Vertical line */}
              <div
                aria-hidden
                className="absolute bottom-2 left-[39px] top-2 w-px overflow-hidden"
              >
                <div
                  className="h-full w-full origin-top"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent, hsl(var(--teal-glow)) 10%, hsl(var(--teal)) 50%, hsl(var(--blue)) 90%, transparent)",
                    boxShadow: "0 0 12px hsl(var(--teal-glow) / 0.6)",
                    animation: "draw-line-v 0.9s 0.4s ease-out both",
                  }}
                />
              </div>

              {items.map((item, idx) => {
                const isHighlight = item.variant === "highlight";
                const groupLabel = null;
                const showDivider = false;
                const delay = 0.6 + idx * 0.2;

                return (
                  <div key={item.n} className="contents">


                    {/* Node column */}
                    <div
                      className="relative flex justify-center pt-2 opacity-0"
                      style={{ animation: `fade-scale 0.5s ${delay}s ease-out both` }}
                    >
                      {isHighlight && (
                        <span
                          aria-hidden
                          className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[hsl(var(--teal-glow))]"
                          style={{ animation: "ripple 2.2s ease-out infinite" }}
                        />
                      )}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 text-base font-bold text-background transition ${nodeStyles[item.variant]}`}
                          >
                            {item.n}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="max-w-xs">
                          {item.hint}
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    {/* Text column */}
                    <div
                      className="py-3 opacity-0"
                      style={{ animation: `fade-in-left 0.6s ${delay + 0.05}s ease-out both` }}
                    >
                      <h3
                        className={`font-semibold text-foreground ${isHighlight ? "text-2xl lg:text-3xl" : "text-xl lg:text-2xl"}`}
                      >
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm font-light text-muted-foreground lg:text-base">
                        {item.desc}
                      </p>
                    </div>

                    {/* Empty column for layout consistency */}
                    <div className="flex items-center justify-end pr-2" />
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <SlideNav prev="/" next="/cap" />
      </main>
    </TooltipProvider>
  );
};

export default Agenda;
