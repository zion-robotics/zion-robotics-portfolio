import { useRef } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { projects } from "../data/projectsData";
import WhoAmI from "../components/WhoAmI";

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

const stats = [
  { value: "9+", label: "Projects shipped" },
  { value: "Top 3", label: "Inter-Varsity Competition" },
  { value: "5", label: "Hackathons" },
  { value: "2", label: "Universities" },
];

const Home = () => {
  useScrollReveal();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 360 : -360, behavior: "smooth" });
  };

  const featured = projects.filter((p: Project) => p.featured);

  return (
    <div className="page-enter">

      {/* Hero */}
      <Hero />

      {/* Stats */}
      <section className="px-6 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
          {stats.map((s) => (
            <div key={s.label} className="bg-card px-6 py-5 flex flex-col gap-1">
              <span className="font-orbitron text-2xl font-bold text-foreground">{s.value}</span>
              <span className="font-body text-xs text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Who Am I */}
      <WhoAmI />

      {/* Featured Projects */}
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
