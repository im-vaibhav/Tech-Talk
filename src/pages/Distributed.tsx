import EpamLogo from "@/components/EpamLogo";
import SlideBackdrop from "@/components/SlideBackdrop";
import SlideNav from "@/components/SlideNav";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const challenges = [
  { title: "Scale", desc: "How to add capacity without disruption?", hint: "Consistent Hashing" },
  { title: "Failure", desc: "What if a machine crashes mid-operation?", hint: "Replication & WAL" },
  { title: "Coordination", desc: "How do machines agree without a boss?", hint: "SWIM Protocol & Quorum" },
];

const Distributed = () => {
  return (
    <TooltipProvider delayDuration={150}>
      <main className="relative min-h-screen w-full overflow-hidden bg-hero">
        <SlideBackdrop />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-10 py-10 lg:px-16 lg:py-12">
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
            <h1 className="text-3xl font-bold tracking-tight text-foreground lg:text-5xl">
              What Is a <span className="text-gradient-teal">Distributed System?</span>
            </h1>
          </header>

          {/* Two column body */}
          <section className="relative my-6 grid flex-1 grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
            {/* Vertical divider */}
            <div
              aria-hidden
              className="absolute left-1/2 top-0 hidden h-full w-px lg:block"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, hsl(var(--teal-glow)/0.5), transparent)",
                animation: "draw-line-v 0.9s 0.5s ease-out both",
              }}
            />

            {/* LEFT — Simple Version */}
            <div className="flex flex-col gap-5">
              <span
                className="self-start rounded-full border border-border/50 bg-card/40 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground opacity-0 backdrop-blur-sm"
                style={{ animation: "fade-in-up 0.5s 0.6s ease-out both" }}
              >
                The Simple Version
              </span>

              <blockquote
                className="relative border-l-2 border-[hsl(var(--teal-glow)/0.6)] pl-4 text-base italic leading-relaxed text-muted-foreground opacity-0 lg:text-lg"
                style={{ animation: "fade-in-up 0.7s 1.0s ease-out both" }}
              >
                "Imagine a hospital with 100 doctors instead of 1. Each specializes in a section.
                They talk to each other, share patient records, and if one calls in sick, another
                covers. <span className="text-foreground not-italic">The hospital never closes.</span>"
              </blockquote>

              {/* Before / after diagram */}
              <div className="mt-2 flex items-center justify-between gap-4">
                {/* Single node */}
                <div
                  className="flex flex-1 flex-col items-center gap-3 opacity-0"
                  style={{ animation: "fade-scale 0.5s 1.8s ease-out both" }}
                >
                  <div className="relative flex h-20 w-20 items-center justify-center">
                    <div className="h-16 w-16 rounded-full border-2 border-[hsl(var(--teal)/0.6)] bg-[hsl(var(--teal)/0.18)]" />
                    <span
                      aria-hidden
                      className="absolute inset-0 m-auto h-8 w-8 text-2xl font-bold text-destructive"
                      style={{ lineHeight: "2rem", textAlign: "center" }}
                    >
                      ✕
                    </span>
                  </div>
                  <p
                    className="text-center text-xs text-muted-foreground opacity-0"
                    style={{ animation: "fade-in-up 0.5s 2.4s ease-out both" }}
                  >
                    Single point of failure
                  </p>
                </div>

                {/* Arrow */}
                <svg
                  viewBox="0 0 80 20"
                  className="h-5 w-20 flex-shrink-0 opacity-0"
                  style={{ animation: "fade-in-up 0.5s 2.0s ease-out both" }}
                >
                  <defs>
                    <linearGradient id="arr" x1="0" x2="1">
                      <stop offset="0" stopColor="hsl(var(--teal))" />
                      <stop offset="1" stopColor="hsl(var(--teal-glow))" />
                    </linearGradient>
                  </defs>
                  <line x1="2" y1="10" x2="70" y2="10" stroke="url(#arr)" strokeWidth="2" />
                  <polygon points="70,4 78,10 70,16" fill="hsl(var(--teal-glow))" />
                </svg>

                {/* Mesh */}
                <div
                  className="flex flex-1 flex-col items-center gap-3 opacity-0"
                  style={{ animation: "fade-scale 0.6s 2.2s ease-out both" }}
                >
                  <svg viewBox="0 0 140 90" className="h-24 w-36">
                    {(() => {
                      const nodes = [
                        { x: 70, y: 18 },
                        { x: 22, y: 50 },
                        { x: 118, y: 50 },
                        { x: 46, y: 80 },
                        { x: 94, y: 80 },
                      ];
                      const edges = [
                        [0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [1, 2], [0, 3], [0, 4],
                      ];
                      return (
                        <>
                          {edges.map(([a, b], i) => (
                            <line
                              key={i}
                              x1={nodes[a].x}
                              y1={nodes[a].y}
                              x2={nodes[b].x}
                              y2={nodes[b].y}
                              stroke="hsl(var(--teal-glow))"
                              strokeOpacity="0.55"
                              strokeWidth="1"
                            />
                          ))}
                          {nodes.map((n, i) => (
                            <circle
                              key={i}
                              cx={n.x}
                              cy={n.y}
                              r="6"
                              fill="hsl(var(--teal))"
                              stroke="hsl(var(--teal-glow))"
                              strokeWidth="1.5"
                              style={{
                                filter: "drop-shadow(0 0 6px hsl(var(--teal-glow) / 0.7))",
                              }}
                            />
                          ))}
                        </>
                      );
                    })()}
                  </svg>
                  <p
                    className="text-center text-xs text-muted-foreground opacity-0"
                    style={{ animation: "fade-in-up 0.5s 2.4s ease-out both" }}
                  >
                    Fault tolerant & scalable
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT — Technical Definition */}
            <div className="flex flex-col gap-5">
              <span
                className="self-start rounded-full border border-border/50 bg-card/40 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground opacity-0 backdrop-blur-sm"
                style={{ animation: "fade-in-up 0.5s 0.6s ease-out both" }}
              >
                The Technical Definition
              </span>

              <ul className="flex flex-col gap-4 text-foreground">
                <li
                  className="flex gap-3 opacity-0"
                  style={{ animation: "fade-in-up 0.6s 2.5s ease-out both" }}
                >
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[hsl(var(--teal-glow))]" />
                  <p className="text-base lg:text-lg">
                    Multiple independent machines{" "}
                    <span className="text-muted-foreground">(nodes)</span> working together as one system.
                  </p>
                </li>
                <li
                  className="flex gap-3 opacity-0"
                  style={{ animation: "fade-in-up 0.6s 2.8s ease-out both" }}
                >
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[hsl(var(--teal-glow))]" />
                  <p className="text-base lg:text-lg">
                    They communicate over a network, share no memory, and handle{" "}
                    <span className="text-foreground">partial failures</span>.
                  </p>
                </li>
                <li
                  className="flex gap-3 opacity-0"
                  style={{ animation: "fade-in-up 0.6s 3.1s ease-out both" }}
                >
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[hsl(var(--teal-glow))]" />
                  <p className="text-base lg:text-lg">
                    Real-world necessity: Netflix serves{" "}
                    <span
                      className="font-bold text-[hsl(var(--teal-glow))]"
                      style={{ textShadow: "0 0 14px hsl(var(--teal-glow) / 0.6)" }}
                    >
                      250M+
                    </span>{" "}
                    users, banks process{" "}
                    <span
                      className="font-bold text-[hsl(var(--teal-glow))]"
                      style={{ textShadow: "0 0 14px hsl(var(--teal-glow) / 0.6)" }}
                    >
                      1M tx/sec
                    </span>
                    . Any internet-scale problem requires distribution.
                  </p>
                </li>
              </ul>
            </div>
          </section>

          {/* Bottom — Why does this create challenges? */}
          <section className="border-t border-border/40 pt-5">
            <p
              className="mb-3 text-sm uppercase tracking-[0.3em] text-muted-foreground opacity-0"
              style={{ animation: "fade-in-up 0.5s 3.3s ease-out both" }}
            >
              Why does this create challenges?
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {challenges.map((c, i) => (
                <Tooltip key={c.title}>
                  <TooltipTrigger asChild>
                    <div
                      className="group relative cursor-default rounded-lg border-t-2 border-[hsl(var(--teal-glow))] bg-[hsl(222_47%_11%)] p-4 opacity-0 transition hover:border-[hsl(var(--teal-glow))] hover:shadow-[0_0_18px_hsl(var(--teal-glow)/0.35)]"
                      style={{
                        animation: `fade-in-up 0.6s ${3.5 + i * 0.05}s ease-out both`,
                      }}
                    >
                      <h4 className="text-base font-semibold text-foreground lg:text-lg">
                        {c.title}
                      </h4>
                      <p className="mt-1 text-xs font-light text-muted-foreground lg:text-sm">
                        {c.desc}
                      </p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Solution: {c.hint}</TooltipContent>
                </Tooltip>
              ))}
            </div>
            <p
              className="mt-3 text-center text-xs italic text-muted-foreground opacity-0"
              style={{ animation: "fade-in-up 0.5s 4.4s ease-out both" }}
            >
              These are exactly the problems we'll solve today
            </p>
          </section>

          {/* Logo */}
          <div
            className="mt-4 flex justify-end opacity-0"
            style={{ animation: "fade-in-right 0.6s 4.6s ease-out both" }}
          >
            <EpamLogo />
          </div>
        </div>

        <SlideNav prev="/agenda" current={3} total={3} />
      </main>
    </TooltipProvider>
  );
};

export default Distributed;
