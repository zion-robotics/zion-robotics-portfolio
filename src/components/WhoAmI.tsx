import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const BRANCHES = [
  {
    path: "/portfolio/dev",
    label: "Dev",
    color: "#3B82F6",
    shadow: "0 0 30px rgba(59,130,246,0.6), 0 0 60px rgba(59,130,246,0.3)",
    border: "rgba(59,130,246,0.8)",
    bg: "rgba(59,130,246,0.08)",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
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
    shadow: "0 0 30px rgba(168,85,247,0.6), 0 0 60px rgba(168,85,247,0.3)",
    border: "rgba(168,85,247,0.8)",
    bg: "rgba(168,85,247,0.08)",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
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
    shadow: "0 0 30px rgba(34,197,94,0.6), 0 0 60px rgba(34,197,94,0.3)",
    border: "rgba(34,197,94,0.8)",
    bg: "rgba(34,197,94,0.08)",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
        <circle cx="24" cy="16" r="7"/>
        <path d="M10 40c0-7.732 6.268-14 14-14s14 6.268 14 14"/>
      </svg>
    ),
    desc: "Music · Student · Nigeria",
  },
];

const WhoAmI = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger steps
          setTimeout(() => setStep(1), 100);   // name appears
          setTimeout(() => setStep(2), 700);   // trunk draws
          setTimeout(() => setStep(3), 1200);  // bar draws
          setTimeout(() => setStep(4), 1700);  // drops + cards
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 overflow-hidden"
      style={{ background: "hsl(var(--background))" }}
    >
      <div className="max-w-3xl mx-auto px-4 flex flex-col items-center">

        {/* Label */}
        <p className="font-exo text-xs tracking-[0.35em] uppercase text-accent mb-10"
          style={{ opacity: step >= 1 ? 1 : 0, transition: "opacity 0.5s" }}>
          Who I am
        </p>

        {/* DANIEL — clean bold with perspective tilt + glow */}
        <div
          className="relative mb-1 select-none"
          style={{
            opacity: step >= 1 ? 1 : 0,
            transform: step >= 1 ? "perspective(400px) rotateX(8deg)" : "perspective(400px) rotateX(20deg) translateY(-30px)",
            transition: "opacity 0.7s, transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* Glow layer behind */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ filter: "blur(24px)", opacity: 0.5 }}>
            <span className="font-orbitron font-black uppercase text-primary"
              style={{ fontSize: "clamp(3rem, 14vw, 7rem)", letterSpacing: "0.05em" }}>
              Daniel
            </span>
          </div>

          {/* Main text */}
          <span
            className="relative font-orbitron font-black uppercase text-foreground"
            style={{
              fontSize: "clamp(3rem, 14vw, 7rem)",
              letterSpacing: "0.05em",
              textShadow: "0 2px 0 hsl(var(--muted-foreground)/0.3), 0 4px 20px hsl(var(--primary)/0.4)",
            }}
          >
            Daniel
          </span>
        </div>

        {/* Platform — glowing line under the name */}
        <div className="relative w-full flex justify-center mb-0"
          style={{ opacity: step >= 1 ? 1 : 0, transition: "opacity 0.6s 0.5s" }}>
          <div
            className="h-px rounded-full"
            style={{
              width: step >= 1 ? "70%" : "0%",
              background: "linear-gradient(90deg, transparent, #3B82F6, #A855F7, #22C55E, transparent)",
              boxShadow: "0 0 12px rgba(168,85,247,0.6)",
              transition: "width 0.8s ease 0.5s",
            }}
          />
        </div>

        {/* SVG connector tree */}
        <svg viewBox="0 0 360 130" className="w-full max-w-sm md:max-w-md" style={{ overflow: "visible" }}>
          <defs>
            <linearGradient id="trunkG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="barG" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#22C55E" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Vertical trunk */}
          <line x1="180" y1="0" x2="180" y2="55"
            stroke="url(#trunkG)" strokeWidth="2.5" strokeLinecap="round"
            filter="url(#glow)"
            strokeDasharray="55"
            strokeDashoffset={step >= 2 ? "0" : "55"}
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />

          {/* Horizontal bar */}
          <line x1="40" y1="55" x2="320" y2="55"
            stroke="url(#barG)" strokeWidth="2.5" strokeLinecap="round"
            filter="url(#glow)"
            strokeDasharray="280"
            strokeDashoffset={step >= 3 ? "0" : "280"}
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />

          {/* Three drops + junction dots */}
          {BRANCHES.map((b, i) => {
            const x = i === 0 ? 40 : i === 1 ? 180 : 320;
            return (
              <g key={b.label}>
                <line x1={x} y1="55" x2={x} y2="120"
                  stroke={b.color} strokeWidth="2.5" strokeLinecap="round"
                  filter="url(#glow)"
                  strokeDasharray="65"
                  strokeDashoffset={step >= 4 ? "0" : "65"}
                  style={{ transition: `stroke-dashoffset 0.4s ease ${i * 0.12}s` }}
                />
                <circle cx={x} cy="55" r="5" fill={b.color}
                  filter="url(#glow)"
                  opacity={step >= 3 ? 1 : 0}
                  style={{ transition: `opacity 0.3s ${0.4 + i * 0.05}s` }}
                />
                <circle cx={x} cy="120" r="5" fill={b.color}
                  filter="url(#glow)"
                  opacity={step >= 4 ? 1 : 0}
                  style={{ transition: `opacity 0.3s ${0.3 + i * 0.12}s` }}
                />
              </g>
            );
          })}
        </svg>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full" style={{ marginTop: "-8px" }}>
          {BRANCHES.map((b, i) => (
            <button
              key={b.path}
              onClick={() => navigate(b.path)}
              onMouseEnter={() => setHovered(b.label)}
              onMouseLeave={() => setHovered(null)}
              className="relative flex flex-col items-center rounded-2xl p-3 sm:p-5 border-2 transition-all duration-300 focus:outline-none cursor-pointer"
              style={{
                opacity: step >= 4 ? 1 : 0,
                transform: step >= 4 ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ${i * 0.15}s, transform 0.5s ${i * 0.15}s, box-shadow 0.3s, border-color 0.3s`,
                background: hovered === b.label ? b.bg : "hsl(var(--card))",
                borderColor: b.border,
                boxShadow: hovered === b.label ? b.shadow : `0 0 10px ${b.bg}`,
              }}
            >
              {/* Floor glow reflection */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2/3 h-3 rounded-full blur-lg"
                style={{ background: b.color, opacity: hovered === b.label ? 0.5 : 0.2, transition: "opacity 0.3s" }} />

              <div className="mb-2 transition-all duration-300"
                style={{
                  color: b.color,
                  filter: hovered === b.label ? `drop-shadow(0 0 10px ${b.color})` : "none",
                  transform: hovered === b.label ? "scale(1.15)" : "scale(1)",
                }}>
                {b.icon}
              </div>

              <p className="font-orbitron font-bold text-xs sm:text-sm" style={{ color: b.color }}>
                {b.label}
              </p>
              <p className="hidden sm:block font-body text-[10px] text-muted-foreground mt-1 text-center leading-tight">
                {b.desc}
              </p>
              <p className="font-body text-[10px] mt-2 flex items-center gap-1"
                style={{ color: b.color, opacity: hovered === b.label ? 1 : 0.5, transition: "opacity 0.2s" }}>
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
