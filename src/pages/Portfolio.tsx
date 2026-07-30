import { useNavigate } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import AnimatedLetters from "../components/AnimatedLetters";

const blocks = [
  {
    path: "/portfolio/dev",
    emoji: "💻",
    label: "Dev",
    color: "hsl(var(--primary))",
    borderColor: "border-primary/30 hover:border-primary",
    glowColor: "from-primary/10",
    desc: "Fullstack, AI tools, SaaS, hackathon projects, client work.",
    count: "9 projects",
    tags: ["React", "TypeScript", "AI", "Supabase", "Node.js"],
  },
  {
    path: "/portfolio/robotics",
    emoji: "🤖",
    label: "Robotics",
    color: "hsl(var(--accent))",
    borderColor: "border-accent/30 hover:border-accent",
    glowColor: "from-accent/10",
    desc: "Arduino builds, embedded systems, mechatronics school projects.",
    count: "2 builds",
    tags: ["Arduino", "C++", "PIR Sensor", "Relay", "State Machine"],
  },
  {
    path: "/portfolio/personal",
    emoji: "🎹",
    label: "Personal",
    color: "hsl(var(--glow-secondary))",
    borderColor: "border-[hsl(var(--glow-secondary))]/30 hover:border-[hsl(var(--glow-secondary))]",
    glowColor: "from-[hsl(var(--glow-secondary))]/10",
    desc: "Music keyboard, student life, building from Nigeria.",
    count: "3 things",
    tags: ["Music", "FUNAAB", "UoPeople", "Nigeria", "Life"],
  },
];

const Portfolio = () => {
  useScrollReveal();
  const navigate = useNavigate();

  return (
    <div className="page-enter pt-20 md:pt-24 min-h-screen">

      {/* Header */}
      <section className="py-14 md:py-20 px-4 sm:px-6 circuit-bg">
        <div className="max-w-7xl mx-auto">
          <p className="font-exo text-xs tracking-[0.3em] uppercase text-accent mb-3">Three sides of Daniel</p>
          <h1 className="font-orbitron text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4">
            <AnimatedLetters text="Portfolio" step={0.07} />
          </h1>
          <p className="reveal-blur font-body text-muted-foreground text-sm sm:text-base max-w-lg">
            Pick a side. Each one is a different part of who I am.
          </p>
        </div>
      </section>

      {/* Three blocks */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-6">
          {blocks.map((b, i) => (
            <button
              key={b.path}
              onClick={() => navigate(b.path)}
              className={`reveal-blur reveal-delay-${i} group relative glass-card rounded-3xl p-8 flex flex-col items-start text-left border transition-all duration-300 cursor-pointer overflow-hidden ${b.borderColor}`}
              style={{ minHeight: 280 }}
            >
              {/* Background glow on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${b.glowColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="relative z-10 flex flex-col h-full w-full">
                {/* Emoji */}
                <span className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {b.emoji}
                </span>

                {/* Label */}
                <h2
                  className="font-orbitron text-2xl font-bold mb-2 transition-colors duration-200"
                  style={{ color: b.color }}
                >
                  {b.label}
                </h2>

                {/* Count */}
                <span className="font-body text-xs text-muted-foreground mb-3">{b.count}</span>

                {/* Description */}
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                  {b.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {b.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-body px-2 py-0.5 rounded-full border border-border text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <div
                  className="flex items-center gap-2 font-body text-sm font-semibold transition-all duration-200 group-hover:gap-3"
                  style={{ color: b.color }}
                >
                  <span>Explore</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Portfolio;
