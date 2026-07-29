import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ParticleCanvas from "../components/ParticleCanvas";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { projects } from "../data/projectsData";

interface Project {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  tags: string[];
  liveUrl: string;
  status: string;
  featured: boolean;
}

const ROLES = ["Web Developer", "Robotics Enthusiast", "AI Builder", "SaaS Founder"];

const stats = [
  { value: "6+", label: "Projects shipped" },
  { value: "2", label: "Universities" },
  { value: "3", label: "Hackathons" },
  { value: "2+", label: "Years building" },
];

const Home = () => {
  useScrollReveal();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Typewriter cycling through roles
  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 360 : -360, behavior: "smooth" });
  };

  const featured = projects.filter((p: Project) => p.featured);

  return (
    <div className="page-enter">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <ParticleCanvas />

        {/* Ambient orbs */}
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-primary/15 blur-[120px] float-y pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] float-y orb-delay pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — text */}
            <div>
              <p className="hero-reveal hero-delay-1 font-exo text-xs tracking-[0.35em] uppercase text-accent mb-5">
                Zion Robotics
              </p>

              <h1 className="hero-reveal hero-delay-2 font-orbitron text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-foreground mb-4">
                Hey, I'm<br />
                <span className="text-primary">Daniel.</span>
              </h1>

              <div className="hero-reveal hero-delay-3 font-exo text-xl md:text-2xl text-muted-foreground mb-6 h-8">
                <span>{displayed}</span>
                <span className="type-caret">|</span>
              </div>

              <p className="hero-reveal hero-delay-4 font-body text-base text-muted-foreground leading-relaxed max-w-md mb-10">
                Mechatronics student by day, builder by night. I ship AI tools, web platforms, and robotics projects out of Nigeria — under the Zion Robotics banner.
              </p>

              <div className="hero-reveal hero-delay-5 flex flex-wrap gap-3">
                <Link
                  to="/portfolio"
                  className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm btn-glow btn-sheen magnetic-btn"
                >
                  View Projects
                </Link>
                <Link
                  to="/about"
                  className="px-6 py-3 rounded-lg border border-border text-foreground font-body font-semibold text-sm hover:border-accent hover:text-accent transition-colors"
                >
                  About Me
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-lg border border-accent/40 text-accent font-body font-semibold text-sm btn-ghost-glow btn-sheen magnetic-btn"
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Right — portrait */}
            <div className="hero-reveal hero-delay-3 flex justify-center lg:justify-end">
              <div className="relative">
                {/* Decorative ring */}
                <div className="absolute -inset-4 rounded-full border border-accent/20 spin-slow" />
                <div className="absolute -inset-8 rounded-full border border-primary/10 spin-slow-reverse" />

                {/* Portrait frame */}
                <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden glow-frame border-2 border-accent/30">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
                    alt="Daniel — Zion Robotics"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-card border border-border text-xs font-body text-accent whitespace-nowrap shadow-lg">
                  🇳🇬 Building from Nigeria
                </div>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="hero-reveal hero-delay-5 mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
            {stats.map((s) => (
              <div key={s.label} className="bg-card px-6 py-5 flex flex-col gap-1">
                <span className="font-orbitron text-2xl font-bold text-foreground">{s.value}</span>
                <span className="font-body text-xs text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
          <svg className="w-5 h-5 text-accent/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7" />
          </svg>
        </div>
      </section>

      {/* ── About strip ──────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 circuit-bg">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="reveal-left">
            <p className="font-exo text-xs tracking-[0.3em] uppercase text-accent mb-3">Who I am</p>
            <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-foreground mb-6">
              Building the digital future
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed text-base md:text-lg mb-4">
              I'm Daniel — a Year 2 Mechatronics Engineering student at FUNAAB, also studying at the University of the People. I build fast, scalable products under my brand Zion Robotics.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed text-sm">
              From AI-powered platforms like Ingenium to hackathon projects like SentryAI, I focus on shipping things that actually work — for African builders and beyond.
            </p>
          </div>

          <div className="reveal-right flex justify-center md:justify-end">
            <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-2xl" />
              <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-2xl border border-accent/20 bg-card flex items-center justify-center">
                <span className="font-orbitron text-accent text-4xl md:text-5xl font-bold">ZR</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ─────────────────────────────────── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 aurora-bg opacity-30" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="reveal-blur text-center mb-12">
            <p className="font-exo text-xs tracking-[0.3em] uppercase text-accent mb-3">What I've built</p>
            <h2 className="font-orbitron text-2xl md:text-4xl font-bold text-foreground">
              Featured <span className="shimmer-text">Work</span>
            </h2>
          </div>

          <div className="relative">
            <button
              onClick={() => scroll("left")}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-10 h-10 rounded-full bg-card border border-border text-foreground text-xl items-center justify-center hover:border-accent hover:text-accent transition-colors"
            >
              ‹
            </button>

            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {featured.map((p: Project, i: number) => (
                <div
                  key={p.id}
                  className={`reveal-blur reveal-delay-${i} glass-card tilt-card rounded-2xl p-6 flex flex-col flex-shrink-0 w-[300px] md:w-[360px]`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-orbitron text-xs text-accent/60">0{i + 1}</span>
                    <span className={`text-[10px] uppercase tracking-widest font-body px-2 py-0.5 border rounded-full ${
                      p.status === "live"
                        ? "text-green-400 border-green-400/30 bg-green-400/5"
                        : "text-accent/70 border-accent/30"
                    }`}>
                      {p.status}
                    </span>
                  </div>
                  <h3 className="font-orbitron text-lg font-bold text-foreground mb-2">{p.title}</h3>
                  <p className="font-body text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">{p.fullDescription}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.tags.map((t: string) => (
                      <span key={t} className="text-xs font-body text-accent/80 bg-accent/5 border border-accent/10 px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-accent hover:text-foreground transition-colors group flex items-center gap-1"
                  >
                    View Project
                    <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </div>
              ))}
            </div>

            <button
              onClick={() => scroll("right")}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-10 h-10 rounded-full bg-card border border-border text-foreground text-xl items-center justify-center hover:border-accent hover:text-accent transition-colors"
            >
              ›
            </button>
          </div>

          <div className="text-center mt-10">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-accent transition-colors link-underline"
            >
              See all projects →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
