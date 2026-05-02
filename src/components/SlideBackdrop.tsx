const SlideBackdrop = () => {
  return (
    <>
      {/* Subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--teal-glow)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--teal-glow)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />
      {/* Drifting particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {Array.from({ length: 22 }).map((_, i) => {
          const top = (i * 41) % 100;
          const left = (i * 57) % 100;
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
                opacity: 0.3,
                filter: "blur(0.5px)",
                animation: `particle-float ${6 + (i % 5)}s ${i * 0.2}s ease-in-out infinite`,
              }}
            />
          );
        })}
      </div>
      {/* Soft accent glows */}
      <div
        aria-hidden
        className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, hsl(var(--blue) / 0.18), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -right-32 h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, hsl(var(--teal) / 0.15), transparent 70%)" }}
      />
    </>
  );
};

export default SlideBackdrop;
