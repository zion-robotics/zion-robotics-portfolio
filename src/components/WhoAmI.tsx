import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const BRANCHES = [
  {
    path: "/portfolio/dev",
    label: "Dev",
    color: "#3B82F6",
    glow: "rgba(59,130,246,0.4)",
    reflection: "rgba(59,130,246,0.15)",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <polyline points="16,18 8,24 16,30" />
        <polyline points="32,18 40,24 32,30" />
        <line x1="26" y1="14" x2="22" y2="34" />
      </svg>
    ),
    desc: "Fullstack · AI · SaaS",
  },
  {
    path: "/portfolio/robotics",
    label: "Robotics",
    color: "#A855F7",
    glow: "rgba(168,85,247,0.4)",
    reflection: "rgba(168,85,247,0.15)",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <rect x="14" y="20" width="20" height="16" rx="3" />
        <circle cx="19" cy="28" r="2" fill="currentColor" stroke="none"/>
        <circle cx="29" cy="28" r="2" fill="currentColor" stroke="none"/>
        <line x1="24" y1="20" x2="24" y2="14"/>
        <circle cx="24" cy="12" r="3"/>
        <line x1="14" y1="26" x2="9" y2="24"/>
        <line x1="34" y1="26" x2="39" y2="24"/>
        <line x1="18" y1="36" x2="16" y2="42"/>
        <line x1="30" y1="36" x2="32" y2="42"/>
      </svg>
    ),
    desc: "Arduino · Embedded · Mechatronics",
  },
  {
    path: "/portfolio/personal",
    label: "Personal",
    color: "#22C55E",
    glow: "rgba(34,197,94,0.4)",
    reflection: "rgba(34,197,94,0.15)",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <circle cx="24" cy="16" r="7"/>
        <path d="M10 40c0-7.732 6.268-14 14-14s14 6.268 14 14"/>
      </svg>
    ),
    desc: "Music · Student · Nigeria",
  },
];

const WhoAmI = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const hLineRef = useRef<SVGLineElement>(null);
  const [animate, setAnimate] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--card)) 50%, hsl(var(--background)) 100%)" }}
    >
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">

        {/* Label */}
        <p
          className="font-exo text-xs tracking-[0.35em] uppercase text-accent mb-8"
          style={{ opacity: animate ? 1 : 0, transition: "opacity 0.6s 0.1s" }}
        >
          Who I am
        </p>

        {/* 3D DANIEL text */}
        <div
          className="relative select-none mb-2"
          style={{ opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(-20px)", transition: "opacity 0.7s 0.2s, transform 0.7s 0.2s" }}
        >
          {/* Platform glow under text */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4/5 h-2 rounded-full blur-xl"
            style={{ background: "linear-gradient(90deg, hsl(var(--primary)), gold, hsl(var(--accent)))", opacity: animate ? 0.8 : 0, transition: "opacity 0.8s 0.6s" }} />

          <span
            className="font-orbitron font-black uppercase tracking-tight"
            style={{
              fontSize: "clamp(3rem, 12vw, 6.5rem)",
              background: "linear-gradient(180deg, #ffffff 0%, #c0c0c0 40%, #888 70%, #c0c0c0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "none",
              filter: "drop-shadow(0 0 30px hsl(var(--primary)/0.3))",
            }}
          >
            Daniel
          </span>

          {/* Extruded 3D layers behind text */}
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="font-orbitron font-black uppercase tracking-tight absolute inset-0 pointer-events-none"
              aria-hidden
              style={{
                fontSize: "clamp(3rem, 12vw, 6.5rem)",
                color: `hsl(${220 + i * 3} 40% ${20 - i * 2}%)`,
                transform: `translate(${i * 1.5}px, ${i * 1.8}px)`,
                zIndex: -1,
                WebkitTextFillColor: `hsl(${220 + i * 3} 40% ${20 - i * 2}%)`,
              }}
            >
              Daniel
            </span>
          ))}
        </div>

        {/* Platform bar */}
        <div
          className="w-64 md:w-80 h-1 rounded-full mb-0"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(var(--primary)), gold, hsl(var(--accent)), transparent)",
            opacity: animate ? 1 : 0,
            transition: "opacity 0.6s 0.7s",
          }}
        />

        {/* SVG connector — vertical line + horizontal bar + 3 drops */}
        <svg
          viewBox="0 0 400 160"
          className="w-full max-w-md"
          style={{ overflow: "visible", marginTop: 0 }}
        >
          {/* Vertical trunk */}
          <line
            ref={lineRef}
            x1="200" y1="0" x2="200" y2="70"
            stroke="url(#trunkGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="70"
            strokeDashoffset={animate ? "0" : "70"}
            style={{ transition: "stroke-dashoffset 0.5s ease 0.9s" }}
          />

          {/* Horizontal bar */}
          <line
            ref={hLineRef}
            x1="60" y1="70" x2="340" y2="70"
            stroke="url(#barGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="280"
            strokeDashoffset={animate ? "0" : "280"}
            style={{ transition: "stroke-dashoffset 0.55s ease 1.3s" }}
          />

          {/* Three drops */}
          {BRANCHES.map((b, i) => {
            const x = i === 0 ? 60 : i === 1 ? 200 : 340;
            return (
              <g key={b.label}>
                <line
                  x1={x} y1="70" x2={x} y2="140"
                  stroke={b.color}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="70"
                  strokeDashoffset={animate ? "0" : "70"}
                  style={{ transition: `stroke-dashoffset 0.4s ease ${1.7 + i * 0.12}s` }}
                />
                {/* Junction dot */}
                <circle cx={x} cy="70" r="5" fill={b.color}
                  opacity={animate ? 1 : 0}
                  style={{ transition: `opacity 0.3s ${1.3}s` }}
                />
                {/* Bottom dot */}
                <circle cx={x} cy="140" r="5" fill={b.color}
                  opacity={animate ? 1 : 0}
                  style={{ transition: `opacity 0.3s ${1.9 + i * 0.12}s` }}
                />
              </g>
            );
          })}

          <defs>
            <linearGradient id="trunkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="gold" />
              <stop offset="100%" stopColor="hsl(var(--primary))" />
            </linearGradient>
            <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#22C55E" />
            </linearGradient>
          </defs>
        </svg>

        {/* Three cards */}
        <div className="grid grid-cols-3 gap-3 sm:gap-5 w-full -mt-4">
          {BRANCHES.map((b, i) => (
            <button
              key={b.path}
              onClick={() => navigate(b.path)}
              onMouseEnter={() => setHovered(b.label)}
              onMouseLeave={() => setHovered(null)}
              className="relative flex flex-col items-center rounded-2xl p-4 sm:p-6 border transition-all duration-300 group focus:outline-none"
              style={{
                opacity: animate ? 1 : 0,
                transform: animate ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.5s ${2.0 + i * 0.15}s, transform 0.5s ${2.0 + i * 0.15}s, border-color 0.2s, box-shadow 0.3s`,
                background: "hsl(var(--card))",
                borderColor: hovered === b.label ? b.color : "hsl(var(--border))",
                boxShadow: hovered === b.label
                  ? `0 0 24px ${b.glow}, 0 0 8px ${b.glow}, inset 0 0 20px ${b.glow}30`
                  : "none",
              }}
            >
              {/* Floor reflection glow */}
              <div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-3 rounded-full blur-lg transition-opacity duration-300"
                style={{ background: b.color, opacity: hovered === b.label ? 0.5 : 0.15 }}
              />

              {/* Icon */}
              <div
                className="mb-3 transition-all duration-300"
                style={{
                  color: b.color,
                  filter: hovered === b.label ? `drop-shadow(0 0 8px ${b.color})` : "none",
                  transform: hovered === b.label ? "scale(1.1)" : "scale(1)",
                }}
              >
                {b.icon}
              </div>

              {/* Label */}
              <p
                className="font-orbitron font-bold text-xs sm:text-sm transition-colors duration-200"
                style={{ color: b.color }}
              >
                {b.label}
              </p>

              {/* Desc — hidden on mobile, visible sm+ */}
              <p className="hidden sm:block font-body text-[10px] text-muted-foreground mt-1 text-center leading-tight">
                {b.desc}
              </p>

              {/* Explore arrow */}
              <p
                className="font-body text-[10px] mt-2 flex items-center gap-1 transition-all duration-200"
                style={{ color: b.color, opacity: hovered === b.label ? 1 : 0.5 }}
              >
                Explore
                <span className={`inline-block transition-transform duration-200 ${hovered === b.label ? "translate-x-1" : ""}`}>→</span>
              </p>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhoAmI;
