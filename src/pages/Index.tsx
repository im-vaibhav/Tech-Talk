import NetworkVisualization from "@/components/NetworkVisualization";
import EpamLogo from "@/components/EpamLogo";
import SlideNav from "@/components/SlideNav";

const Index = () => {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-hero">
      {/* Constellation / grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--teal-glow)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--teal-glow)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      {/* Drifting particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {Array.from({ length: 28 }).map((_, i) => {
          const top = (i * 37) % 100;
          const left = (i * 53) % 100;
          const size = 1 + (i % 3);
          return (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                background: "hsl(var(--teal-glow))",
                opacity: 0.35,
                filter: "blur(0.5px)",
                animation: `particle-float ${6 + (i % 5)}s ${i * 0.2}s ease-in-out infinite`,
              }}
            />
          );
        })}
      </div>

      {/* Soft accent glows */}
      <div aria-hidden className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full" style={{ background: "radial-gradient(circle, hsl(var(--blue) / 0.18), transparent 70%)" }} />
      <div aria-hidden className="absolute -bottom-40 -right-32 h-[600px] w-[600px] rounded-full" style={{ background: "radial-gradient(circle, hsl(var(--teal) / 0.15), transparent 70%)" }} />

      {/* Slide content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-12 py-12 lg:px-20 lg:py-16">
        {/* Top: Title + subtitle */}
        <header className="pt-6 lg:pt-10">
          <div className="anim-title mb-5 flex items-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent via-[hsl(var(--teal-glow))] to-transparent" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-[hsl(var(--teal-glow))]">
              EPAM Tech Talk
            </span>
          </div>
          <h1 className="anim-title max-w-5xl text-5xl font-bold leading-[1.05] tracking-tight text-foreground lg:text-7xl">
            Distributed Systems &{" "}
            <span className="text-gradient-teal">Agentic Operations</span>
          </h1>
          <p className="anim-subtitle mt-6 max-w-3xl text-lg font-light leading-relaxed text-muted-foreground lg:text-xl">
            Building systems that autonomously detect issues, adapt in real time, and heal themselves.
          </p>
        </header>

        {/* Middle: Network visualization */}
        <section className="my-8 flex flex-1 items-center justify-center lg:my-10">
          <div className="relative w-full max-w-5xl">
            <NetworkVisualization />
          </div>
        </section>

        {/* Bottom: Speakers + Logo */}
        <footer className="flex flex-col items-start justify-between gap-8 border-t border-border/40 pt-8 sm:flex-row sm:items-end">
          <div className="anim-speakers grid gap-4 sm:grid-cols-3 sm:gap-10">
            <div>
              <p className="text-base font-semibold text-foreground lg:text-lg">Saad Ahmad</p>
              <p className="text-sm font-light text-muted-foreground">Aligarh Muslim University</p>
            </div>
            <div>
              <p className="text-base font-semibold text-foreground lg:text-lg">Vaibhav Raj</p>
              <p className="text-sm font-light text-muted-foreground">NIT Raipur</p>
            </div>
            <div>
              <p className="text-base font-semibold text-foreground lg:text-lg">Jakka Abhilash Reddy</p>
              <p className="text-sm font-light text-muted-foreground">Keshav Memorial Institute of Technology</p>
            </div>
          </div>

          <div className="anim-logo">
            <EpamLogo />
          </div>
        </footer>
      </div>

      <SlideNav next="/agenda" />
    </main>
  );
};

export default Index;
