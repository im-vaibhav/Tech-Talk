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
  { title: "Scale", desc: "How to add capacity without disruption?", hint: "Consistent Hashing", icon: "📈" },
  { title: "Failure", desc: "What if a machine crashes mid-operation?", hint: "Replication & WAL", icon: "⚠️" },
  { title: "Coordination", desc: "How do machines agree without a boss?", hint: "SWIM Protocol & Quorum", icon: "🔄" },
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

            {/* LEFT — Technical Definition */}
            <div className="flex flex-col gap-6">
              <span
                className="self-start rounded-full border border-border/50 bg-card/40 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground opacity-0 backdrop-blur-sm"
                style={{ animation: "fade-in-up 0.5s 0.6s ease-out both" }}
              >
                Definition
              </span>

              <div className="flex flex-col gap-4">
                <p
                  className="text-base leading-relaxed text-foreground opacity-0 lg:text-lg"
                  style={{ animation: "fade-in-up 0.7s 1.0s ease-out both" }}
                >
                  <span className="font-semibold text-[hsl(var(--teal-glow))]">Distributed System:</span>{" "}
                  Multiple independent machines working together as one unified system.
                </p>

                <ul className="flex flex-col gap-3 text-muted-foreground">
                  <li
                    className="flex gap-3 opacity-0"
                    style={{ animation: "fade-in-up 0.6s 1.3s ease-out both" }}
                  >
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[hsl(var(--teal-glow))]" />
                    <p className="text-sm lg:text-base">
                      Nodes communicate over network
                    </p>
                  </li>
                  <li
                    className="flex gap-3 opacity-0"
                    style={{ animation: "fade-in-up 0.6s 1.6s ease-out both" }}
                  >
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[hsl(var(--teal-glow))]" />
                    <p className="text-sm lg:text-base">
                      No shared memory
                    </p>
                  </li>
                  <li
                    className="flex gap-3 opacity-0"
                    style={{ animation: "fade-in-up 0.6s 1.9s ease-out both" }}
                  >
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[hsl(var(--teal-glow))]" />
                    <p className="text-sm lg:text-base">
                      Handle partial failures gracefully
                    </p>
                  </li>
                </ul>

                <div
                  className="mt-4 rounded-lg border border-[hsl(var(--teal-glow)/0.3)] bg-[hsl(var(--teal)/0.08)] p-4 opacity-0"
                  style={{ animation: "fade-in-up 0.6s 2.2s ease-out both" }}
                >
                  <p className="text-xs text-muted-foreground lg:text-sm">
                    <span className="font-semibold text-foreground">Real-world scale:</span>{" "}
                    Netflix serves{" "}
                    <span className="font-bold text-[hsl(var(--teal-glow))]">250M+ users</span>,{" "}
                    banks process{" "}
                    <span className="font-bold text-[hsl(var(--teal-glow))]">1M tx/sec</span>
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT — Visual Animation */}
            <div className="flex flex-col gap-5">
              <span
                className="self-start rounded-full border border-border/50 bg-card/40 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground opacity-0 backdrop-blur-sm"
                style={{ animation: "fade-in-up 0.5s 0.6s ease-out both" }}
              >
                Visual Representation
              </span>

              {/* Animated comparison: Single vs Distributed */}
              <div className="flex flex-col gap-8">
                {/* Single Server - Vulnerable with traffic visualization */}
                <div
                  className="flex flex-col items-center gap-4 opacity-0"
                  style={{ animation: "fade-scale 0.6s 1.0s ease-out both" }}
                >
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Centralized System
                  </p>
                  <div className="relative flex h-32 w-full items-center justify-center">
                    <svg viewBox="0 0 320 120" className="h-full w-full">
                      {/* Traffic coming from multiple clients */}
                      {[...Array(5)].map((_, i) => {
                        const yPos = 20 + i * 20;
                        return (
                          <g key={i}>
                            {/* Client nodes */}
                            <circle
                              cx="30"
                              cy={yPos}
                              r="6"
                              fill="hsl(var(--muted))"
                              stroke="hsl(var(--border))"
                              strokeWidth="1"
                            />
                            {/* Traffic arrows */}
                            <line
                              x1="40"
                              y1={yPos}
                              x2="120"
                              y2="60"
                              stroke="hsl(var(--teal-glow))"
                              strokeWidth="2"
                              strokeOpacity="0.4"
                              style={{
                                strokeDasharray: "4 4",
                                animation: `dash-flow 1.5s ${i * 0.2}s linear infinite`,
                              }}
                            />
                          </g>
                        );
                      })}
                      
                      {/* Label: Clients */}
                      <text
                        x="30"
                        y="115"
                        textAnchor="middle"
                        fill="hsl(var(--muted-foreground))"
                        fontSize="9"
                        fontWeight="500"
                      >
                        Clients
                      </text>
                      
                      {/* Central server with overload effect */}
                      <g>
                        {/* Overload pulse rings */}
                        <circle
                          cx="160"
                          cy="60"
                          r="35"
                          fill="none"
                          stroke="hsl(var(--destructive))"
                          strokeWidth="1.5"
                          strokeOpacity="0.3"
                          style={{ animation: "overload-pulse 2s 1.5s ease-out infinite" }}
                        />
                        <circle
                          cx="160"
                          cy="60"
                          r="35"
                          fill="none"
                          stroke="hsl(var(--destructive))"
                          strokeWidth="1.5"
                          strokeOpacity="0.3"
                          style={{ animation: "overload-pulse 2s 2s ease-out infinite" }}
                        />
                        
                        {/* Server box */}
                        <rect
                          x="135"
                          y="40"
                          width="50"
                          height="40"
                          rx="4"
                          fill="hsl(var(--teal))"
                          stroke="hsl(var(--teal-glow))"
                          strokeWidth="2"
                          style={{ 
                            filter: "drop-shadow(0 0 10px hsl(var(--destructive) / 0.5))",
                            animation: "server-stress 2s 1.5s ease-in-out infinite"
                          }}
                        />
                        
                        {/* Warning symbol */}
                        <text
                          x="160"
                          y="65"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="hsl(var(--destructive))"
                          fontSize="24"
                          fontWeight="bold"
                          style={{ animation: "pulse-fail 2s 1.5s ease-in-out infinite" }}
                        >
                          !
                        </text>
                        
                        {/* Label: Server */}
                        <text
                          x="160"
                          y="95"
                          textAnchor="middle"
                          fill="hsl(var(--muted-foreground))"
                          fontSize="9"
                          fontWeight="500"
                        >
                          Overloaded
                        </text>
                      </g>

                      {/* Blocked/failed responses */}
                      {[...Array(5)].map((_, i) => {
                        const yPos = 20 + i * 20;
                        return (
                          <g key={`blocked-${i}`}>
                            <line
                              x1="190"
                              y1="60"
                              x2="270"
                              y2={yPos}
                              stroke="hsl(var(--destructive))"
                              strokeWidth="2"
                              strokeOpacity="0.3"
                              strokeDasharray="4 4"
                              style={{
                                animation: `fade-pulse 2s ${2 + i * 0.15}s ease-in-out infinite`,
                              }}
                            />
                            {/* X mark for failed response */}
                            {i === 2 && (
                              <text
                                x="230"
                                y="63"
                                textAnchor="middle"
                                fill="hsl(var(--destructive))"
                                fontSize="12"
                                fontWeight="bold"
                                opacity="0.6"
                              >
                                ✕
                              </text>
                            )}
                          </g>
                        );
                      })}
                      
                      {/* Label: Failed */}
                      <text
                        x="270"
                        y="115"
                        textAnchor="middle"
                        fill="hsl(var(--destructive))"
                        fontSize="9"
                        fontWeight="500"
                        opacity="0.7"
                      >
                        Failed
                      </text>
                    </svg>
                  </div>
                  <p className="text-center text-xs text-muted-foreground">
                    Bottleneck & Single point of failure
                  </p>
                </div>

                {/* Arrow down */}
                <div className="flex justify-center opacity-0" style={{ animation: "fade-in-up 0.5s 1.8s ease-out both" }}>
                  <svg viewBox="0 0 20 60" className="h-16 w-5">
                    <defs>
                      <linearGradient id="arr-down" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="hsl(var(--teal))" />
                        <stop offset="1" stopColor="hsl(var(--teal-glow))" />
                      </linearGradient>
                    </defs>
                    <line x1="10" y1="2" x2="10" y2="52" stroke="url(#arr-down)" strokeWidth="2" />
                    <polygon points="4,52 16,52 10,58" fill="hsl(var(--teal-glow))" />
                  </svg>
                </div>

                {/* Distributed System - Resilient */}
                <div
                  className="flex flex-col items-center gap-4 opacity-0"
                  style={{ animation: "fade-scale 0.6s 2.0s ease-out both" }}
                >
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Distributed System
                  </p>
                  <svg viewBox="0 0 200 130" className="h-32 w-full">
                    {(() => {
                      const nodes = [
                        { x: 100, y: 20, label: "1" },
                        { x: 40, y: 60, label: "2" },
                        { x: 160, y: 60, label: "3" },
                        { x: 70, y: 100, label: "4" },
                        { x: 130, y: 100, label: "5" },
                      ];
                      const edges = [
                        [0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [1, 2], [0, 3], [0, 4],
                      ];
                      return (
                        <>
                          {/* Animated connections */}
                          {edges.map(([a, b], i) => (
                            <line
                              key={i}
                              x1={nodes[a].x}
                              y1={nodes[a].y}
                              x2={nodes[b].x}
                              y2={nodes[b].y}
                              stroke="hsl(var(--teal-glow))"
                              strokeOpacity="0.5"
                              strokeWidth="1.5"
                              style={{
                                strokeDasharray: "3 3",
                                animation: `dash-flow 2s ${i * 0.1}s linear infinite`,
                              }}
                            />
                          ))}
                          {/* Nodes with pulse */}
                          {nodes.map((n, i) => (
                            <g key={i}>
                              {/* Glow ring */}
                              <circle
                                cx={n.x}
                                cy={n.y}
                                r="18"
                                fill="none"
                                stroke="hsl(var(--teal-glow))"
                                strokeWidth="1"
                                strokeOpacity="0.3"
                                style={{
                                  animation: `pulse-ring 2.5s ${i * 0.3}s ease-in-out infinite`,
                                }}
                              />
                              <circle
                                cx={n.x}
                                cy={n.y}
                                r="12"
                                fill="hsl(var(--teal))"
                                stroke="hsl(var(--teal-glow))"
                                strokeWidth="2"
                                style={{
                                  filter: "drop-shadow(0 0 6px hsl(var(--teal-glow) / 0.6))",
                                }}
                              />
                              <text
                                x={n.x}
                                y={n.y}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="hsl(var(--background))"
                                fontSize="11"
                                fontWeight="bold"
                              >
                                {n.label}
                              </text>
                            </g>
                          ))}
                          
                          {/* Labels for distributed system */}
                          <text
                            x="100"
                            y="125"
                            textAnchor="middle"
                            fill="hsl(var(--muted-foreground))"
                            fontSize="9"
                            fontWeight="500"
                          >
                            Load Balanced Nodes
                          </text>
                        </>
                      );
                    })()}
                  </svg>
                  <p className="text-center text-xs text-muted-foreground">
                    Load balanced & fault tolerant
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom — Challenges with inline mini-animations */}
          <section className="border-t border-border/40 pt-5">
            <p
              className="mb-3 text-sm uppercase tracking-[0.3em] text-muted-foreground opacity-0"
              style={{ animation: "fade-in-up 0.5s 2.8s ease-out both" }}
            >
              Key Challenges
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {/* Scale Challenge */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="group relative cursor-default overflow-hidden rounded-lg border border-[hsl(var(--teal-glow)/0.3)] bg-[hsl(222_47%_11%)] p-3 opacity-0 transition hover:border-[hsl(var(--teal-glow))] hover:shadow-[0_0_12px_hsl(var(--teal-glow)/0.25)]"
                    style={{ animation: "fade-in-up 0.6s 3.0s ease-out both" }}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-foreground lg:text-base">
                        Scale
                      </h4>
                      <svg viewBox="0 0 70 40" className="h-8 w-14">
                        {/* Growing bars representing scale */}
                        {[8, 16, 24].map((height, i) => (
                          <rect
                            key={i}
                            x={i * 20 + 8}
                            y={30 - height}
                            width="12"
                            height={height}
                            fill="hsl(var(--teal-glow))"
                            opacity="0.6"
                            rx="1"
                            style={{
                              animation: `scale-grow 3s ${i * 0.3}s ease-in-out infinite`,
                            }}
                          />
                        ))}
                        {/* Label */}
                        <text
                          x="35"
                          y="38"
                          textAnchor="middle"
                          fill="hsl(var(--muted-foreground))"
                          fontSize="7"
                          opacity="0.8"
                        >
                          +Capacity
                        </text>
                      </svg>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {challenges[0].desc}
                    </p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>Solution: {challenges[0].hint}</TooltipContent>
              </Tooltip>

              {/* Failure Challenge */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="group relative cursor-default overflow-hidden rounded-lg border border-[hsl(var(--teal-glow)/0.3)] bg-[hsl(222_47%_11%)] p-3 opacity-0 transition hover:border-[hsl(var(--teal-glow))] hover:shadow-[0_0_12px_hsl(var(--teal-glow)/0.25)]"
                    style={{ animation: "fade-in-up 0.6s 3.15s ease-out both" }}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-foreground lg:text-base">
                        Failure
                      </h4>
                      <svg viewBox="0 0 70 40" className="h-8 w-14">
                        {/* Nodes failing and recovering */}
                        {[12, 35, 58].map((x, i) => (
                          <g key={i}>
                            <circle
                              cx={x}
                              cy="15"
                              r="5"
                              fill={i === 1 ? "hsl(var(--destructive))" : "hsl(var(--teal-glow))"}
                              opacity="0.7"
                              style={{
                                animation: i === 1 
                                  ? "node-fail 3s ease-in-out infinite"
                                  : "pulse-node 3s ease-in-out infinite",
                              }}
                            />
                            {/* X mark on failing node */}
                            {i === 1 && (
                              <text
                                x={x}
                                y="18"
                                textAnchor="middle"
                                fill="hsl(var(--background))"
                                fontSize="8"
                                fontWeight="bold"
                              >
                                ✕
                              </text>
                            )}
                          </g>
                        ))}
                        {/* Label */}
                        <text
                          x="35"
                          y="32"
                          textAnchor="middle"
                          fill="hsl(var(--muted-foreground))"
                          fontSize="7"
                          opacity="0.8"
                        >
                          Auto-heal
                        </text>
                      </svg>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {challenges[1].desc}
                    </p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>Solution: {challenges[1].hint}</TooltipContent>
              </Tooltip>

              {/* Coordination Challenge */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="group relative cursor-default overflow-hidden rounded-lg border border-[hsl(var(--teal-glow)/0.3)] bg-[hsl(222_47%_11%)] p-3 opacity-0 transition hover:border-[hsl(var(--teal-glow))] hover:shadow-[0_0_12px_hsl(var(--teal-glow)/0.25)]"
                    style={{ animation: "fade-in-up 0.6s 3.3s ease-out both" }}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-foreground lg:text-base">
                        Coordination
                      </h4>
                      <svg viewBox="0 0 70 40" className="h-8 w-14">
                        {/* Message passing between nodes */}
                        <circle cx="12" cy="15" r="4" fill="hsl(var(--teal-glow))" opacity="0.7" />
                        <circle cx="35" cy="15" r="4" fill="hsl(var(--teal-glow))" opacity="0.7" />
                        <circle cx="58" cy="15" r="4" fill="hsl(var(--teal-glow))" opacity="0.7" />
                        <line
                          x1="16"
                          y1="15"
                          x2="31"
                          y2="15"
                          stroke="hsl(var(--teal-glow))"
                          strokeWidth="2"
                          strokeOpacity="0.5"
                          style={{
                            strokeDasharray: "2 2",
                            animation: "dash-flow 2s linear infinite",
                          }}
                        />
                        <line
                          x1="39"
                          y1="15"
                          x2="54"
                          y2="15"
                          stroke="hsl(var(--teal-glow))"
                          strokeWidth="2"
                          strokeOpacity="0.5"
                          style={{
                            strokeDasharray: "2 2",
                            animation: "dash-flow 2s 0.5s linear infinite",
                          }}
                        />
                        {/* Arrows */}
                        <polygon points="31,13 31,17 34,15" fill="hsl(var(--teal-glow))" opacity="0.5" />
                        <polygon points="54,13 54,17 57,15" fill="hsl(var(--teal-glow))" opacity="0.5" />
                        {/* Label */}
                        <text
                          x="35"
                          y="32"
                          textAnchor="middle"
                          fill="hsl(var(--muted-foreground))"
                          fontSize="7"
                          opacity="0.8"
                        >
                          Consensus
                        </text>
                      </svg>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {challenges[2].desc}
                    </p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>Solution: {challenges[2].hint}</TooltipContent>
              </Tooltip>
            </div>
          </section>

          {/* Logo */}
          <div
            className="mt-4 flex justify-end opacity-0"
            style={{ animation: "fade-in-right 0.6s 3.6s ease-out both" }}
          >
            <EpamLogo />
          </div>
        </div>

        <SlideNav prev="/agenda" next="/scalability" />
      </main>
    </TooltipProvider>
  );
};

export default Distributed;
