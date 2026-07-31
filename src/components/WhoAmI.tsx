import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import pic from "@/assets/zion-pic9.png";

const BRANCHES = [
  {
    path: "/portfolio/dev",
    label: "Dev",
    emoji: "💻",
    desc: "Fullstack · AI · SaaS",
    color: "hsl(var(--primary))",
  },
  {
    path: "/portfolio/robotics",
    label: "Robotics",
    emoji: "🤖",
    desc: "Arduino · Embedded · Mechatronics",
    color: "hsl(var(--accent))",
  },
  {
    path: "/portfolio/personal",
    label: "Personal",
    emoji: "🎹",
    desc: "Music · Student · Nigeria",
    color: "hsl(var(--glow-secondary))",
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
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 circuit-bg overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center">

        {/* Section label */}
        <p className={`font-exo text-xs tracking-[0.3em] uppercase text-accent mb-8 transition-all duration-700 ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Who I am
        </p>

        {/* Root — 3D name + portrait */}
        <div className={`flex flex-col items-center transition-all duration-700 delay-100 ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

          {/* Portrait circle */}
          <div className="relative mb-4">
            {/* Outer glow ring */}
            <div className="absolute -inset-2 rounded-full opacity-40 blur-md" style={{ background: "hsl(var(--primary))" }} />
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary/50 shadow-2xl">
              <img src={pic} alt="Daniel" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* 3D name */}
          <div className="relative select-none">
            <span
              className="font-orbitron font-black text-5xl md:text-7xl tracking-tight"
              style={{
                color: "hsl(var(--foreground))",
                textShadow: `
                  0 1px 0 hsl(var(--muted-foreground)),
                  0 2px 0 hsl(var(--border)),
                  0 3px 0 hsl(var(--border)),
                  0 4px 0 hsl(var(--border)),
                  0 5px 0 hsl(var(--border)),
                  0 6px 0 hsl(var(--border)),
                  0 8px 20px rgba(0,0,0,0.4)
                `,
              }}
            >
              Daniel
            </span>
            {/* Accent underline */}
            <div
              className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(var(--primary)), hsl(var(--accent)), transparent)",
                opacity: animate ? 1 : 0,
                transition: "opacity 0.5s 0.6s",
              }}
            />
          </div>

          <p
            className="font-body text-xs text-muted-foreground mt-3 tracking-widest uppercase"
            style={{ opacity: animate ? 1 : 0, transition: "opacity 0.5s 0.8s" }}
          >
            Three sides. One person.
          </p>
        </div>

        {/* SVG tree — rope down, splits into 3 */}
        <div className="w-full flex justify-center mt-2">
          <svg
            viewBox="0 0 600 280"
            className="w-full max-w-2xl"
            style={{ overflow: "visible" }}
          >
            {/* Vertical trunk from name down */}
            <line
              x1="300" y1="0"
              x2="300" y2="100"
              stroke="hsl(var(--border))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="300"
              strokeDashoffset={animate ? "0" : "300"}
              style={{ transition: "stroke-dashoffset 0.6s ease 0.8s" }}
            />

            {/* Horizontal crossbar */}
            <line
              x1="100" y1="100"
              x2="500" y2="100"
              stroke="hsl(var(--border))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="400"
              strokeDashoffset={animate ? "0" : "400"}
              style={{ transition: "stroke-dashoffset 0.5s ease 1.2s" }}
            />

            {/* Three vertical drops */}
            {BRANCHES.map((b, i) => {
              const x = i === 0 ? 100 : i === 1 ? 300 : 500;
              return (
                <g key={b.label}>
                  <line
                    x1={x} y1="100"
                    x2={x} y2="180"
                    stroke={b.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="80"
                    strokeDashoffset={animate ? "0" : "80"}
                    style={{ transition: `stroke-dashoffset 0.4s ease ${1.5 + i * 0.1}s` }}
                  />
                  {/* Dot at junction */}
                  <circle
                    cx={x} cy="100" r="4"
                    fill={b.color}
                    opacity={animate ? 1 : 0}
                    style={{ transition: `opacity 0.3s ${1.2}s` }}
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Branch cards — tight below the SVG */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full -mt-10">
          {BRANCHES.map((b, i) => (
            <button
              key={b.path}
              onClick={() => navigate(b.path)}
              onMouseEnter={() => setHovered(b.label)}
              onMouseLeave={() => setHovered(null)}
              className="group relative glass-card rounded-2xl p-6 flex flex-col items-center text-center border border-border transition-all duration-300 overflow-hidden cursor-pointer"
              style={{
                opacity: animate ? 1 : 0,
                transform: animate ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.5s ${1.6 + i * 0.15}s, transform 0.5s ${1.6 + i * 0.15}s`,
                borderColor: hovered === b.label ? b.color : undefined,
                boxShadow: hovered === b.label ? `0 0 20px ${b.color}22` : undefined,
              }}
            >
              {/* Glow bg */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                style={{ background: `radial-gradient(ellipse at center, ${b.color}15, transparent 70%)` }}
              />

              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 relative z-10">{b.emoji}</span>
              <p className="font-orbitron text-base font-bold mb-1 relative z-10" style={{ color: b.color }}>{b.label}</p>
              <p className="font-body text-xs text-muted-foreground relative z-10">{b.desc}</p>

              <div
                className="mt-4 font-body text-xs font-semibold flex items-center gap-1 relative z-10 transition-all duration-200 group-hover:gap-2"
                style={{ color: b.color }}
              >
                Explore <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhoAmI;



You are out of free messages until 6:40 PM
