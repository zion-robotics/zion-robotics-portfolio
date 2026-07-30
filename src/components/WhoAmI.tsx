import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const BRANCHES = [
  {
    tab: "dev",
    label: "Dev",
    emoji: "💻",
    desc: "Fullstack, AI tools, SaaS",
    color: "hsl(var(--primary))",
    // SVG path: trunk up, branch left
    path: "M 300 340 L 300 220 L 140 100",
    tipX: 140,
    tipY: 100,
    labelAnchor: "end" as const,
    labelDx: -14,
    labelDy: 0,
  },
  {
    tab: "robotics",
    label: "Robotics",
    emoji: "🤖",
    desc: "Arduino, circuits, mechatronics",
    color: "hsl(var(--accent))",
    // SVG path: trunk up, branch straight up
    path: "M 300 340 L 300 80",
    tipX: 300,
    tipY: 80,
    labelAnchor: "middle" as const,
    labelDx: 0,
    labelDy: -14,
  },
  {
    tab: "personal",
    label: "Personal",
    emoji: "🎹",
    desc: "Music keyboard, life outside code",
    color: "hsl(var(--glow-secondary))",
    // SVG path: trunk up, branch right
    path: "M 300 340 L 300 220 L 460 100",
    tipX: 460,
    tipY: 100,
    labelAnchor: "start" as const,
    labelDx: 14,
    labelDy: 0,
  },
];

const WhoAmI = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 circuit-bg overflow-hidden">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className={`text-center mb-4 transition-all duration-700 ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="font-exo text-xs tracking-[0.3em] uppercase text-accent mb-3">Who I am</p>
          <h2 className="font-orbitron text-2xl md:text-4xl font-bold text-foreground">
            Daniel Adeogun
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-2">Three sides. One person.</p>
        </div>

        {/* Tree SVG */}
        <div className="flex justify-center">
          <svg
            viewBox="0 0 600 400"
            className="w-full max-w-lg"
            style={{ overflow: "visible" }}
          >
            {/* Trunk root glow */}
            {animate && (
              <circle cx="300" cy="340" r="8" fill="hsl(var(--primary))" opacity="0.4">
                <animate attributeName="r" values="8;16;8" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2s" repeatCount="indefinite" />
              </circle>
            )}

            {/* Trunk dot */}
            <circle cx="300" cy="340" r="5" fill="hsl(var(--primary))" opacity={animate ? 1 : 0}
              style={{ transition: "opacity 0.3s 0.2s" }} />

            {/* Branches */}
            {BRANCHES.map((b, i) => (
              <g key={b.tab}>
                {/* Branch path with draw animation */}
                <path
                  d={b.path}
                  fill="none"
                  stroke={b.color}
                  strokeWidth={hovered === b.tab ? 3 : 2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={animate ? 1 : 0}
                  style={{
                    strokeDasharray: 400,
                    strokeDashoffset: animate ? 0 : 400,
                    transition: `stroke-dashoffset 0.9s ease ${0.3 + i * 0.2}s, opacity 0.1s ${0.3 + i * 0.2}s, stroke-width 0.2s`,
                  }}
                />

                {/* Tip circle */}
                <circle
                  cx={b.tipX}
                  cy={b.tipY}
                  r={hovered === b.tab ? 10 : 7}
                  fill={b.color}
                  opacity={animate ? 1 : 0}
                  style={{
                    transition: `opacity 0.3s ${0.9 + i * 0.2}s, r 0.2s`,
                    cursor: "pointer",
                    filter: hovered === b.tab ? `drop-shadow(0 0 8px ${b.color})` : "none",
                  }}
                  onClick={() => navigate(`/portfolio?tab=${b.tab}`)}
                  onMouseEnter={() => setHovered(b.tab)}
                  onMouseLeave={() => setHovered(null)}
                />

                {/* Emoji */}
                <text
                  x={b.tipX}
                  y={b.tipY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="10"
                  opacity={animate ? 1 : 0}
                  style={{ transition: `opacity 0.3s ${1.0 + i * 0.2}s`, pointerEvents: "none" }}
                >
                  {b.emoji}
                </text>

                {/* Label */}
                <text
                  x={b.tipX + b.labelDx}
                  y={b.tipY + b.labelDy}
                  textAnchor={b.labelAnchor}
                  dominantBaseline="middle"
                  fontSize="13"
                  fontWeight="700"
                  fontFamily="Orbitron, sans-serif"
                  fill={b.color}
                  opacity={animate ? 1 : 0}
                  style={{
                    transition: `opacity 0.4s ${1.1 + i * 0.2}s`,
                    cursor: "pointer",
                    letterSpacing: "0.05em",
                  }}
                  onClick={() => navigate(`/portfolio?tab=${b.tab}`)}
                  onMouseEnter={() => setHovered(b.tab)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {b.label}
                </text>

                {/* Sub-label */}
                <text
                  x={b.tipX + b.labelDx}
                  y={b.tipY + b.labelDy + 16}
                  textAnchor={b.labelAnchor}
                  fontSize="9"
                  fontFamily="sans-serif"
                  fill="hsl(var(--muted-foreground))"
                  opacity={animate && hovered === b.tab ? 1 : 0}
                  style={{ transition: "opacity 0.2s", pointerEvents: "none" }}
                >
                  {b.desc}
                </text>
              </g>
            ))}

            {/* Root label */}
            <text
              x="300"
              y="368"
              textAnchor="middle"
              fontSize="11"
              fontFamily="sans-serif"
              fill="hsl(var(--muted-foreground))"
              opacity={animate ? 1 : 0}
              style={{ transition: "opacity 0.4s 0.2s" }}
            >
              tap a branch to explore
            </text>
          </svg>
        </div>

        {/* Cards below tree */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {BRANCHES.map((b, i) => (
            <button
              key={b.tab}
              onClick={() => navigate(`/portfolio?tab=${b.tab}`)}
              className={`glass-card rounded-2xl p-5 text-left transition-all duration-300 border ${
                hovered === b.tab ? "border-accent/60 scale-[1.02]" : "border-border hover:border-accent/30"
              }`}
              style={{
                opacity: animate ? 1 : 0,
                transform: animate ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ${1.4 + i * 0.15}s, transform 0.5s ${1.4 + i * 0.15}s, border-color 0.2s, scale 0.2s`,
              }}
              onMouseEnter={() => setHovered(b.tab)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="text-2xl">{b.emoji}</span>
              <p className="font-orbitron text-sm font-bold mt-2" style={{ color: b.color }}>{b.label}</p>
              <p className="font-body text-xs text-muted-foreground mt-1">{b.desc}</p>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhoAmI;
