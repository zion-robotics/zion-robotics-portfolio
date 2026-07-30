import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { projects } from "../data/projectsData";
import ProjectModal from "../components/ProjectModal";
import AnimatedLetters from "../components/AnimatedLetters";

interface Project {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string | null;
  status: string;
  category: string;
  featured: boolean;
}

const CATEGORIES = ["All", "SaaS", "Hackathon", "Tool", "Client Work"];

const statusColor: Record<string, string> = {
  live: "text-green-400 border-green-400/30 bg-green-400/5",
  shipped: "text-accent border-accent/30 bg-accent/5",
  "in development": "text-yellow-400 border-yellow-400/30 bg-yellow-400/5",
};

const Portfolio = () => {
  useScrollReveal();
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p: Project) => p.category === activeCategory);

  return (
    <div className="page-enter pt-20 md:pt-24 min-h-screen">

      {/* ── Header ─────────────────────────────────── */}
      <section className="py-14 md:py-20 px-4 sm:px-6 circuit-bg">
        <div className="max-w-7xl mx-auto">
          <p className="font-exo text-xs tracking-[0.3em] uppercase text-accent mb-3">What I've built</p>
          <h1 className="font-orbitron text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4">
            <AnimatedLetters text="Projects" step={0.07} />
          </h1>
          <p className="reveal-blur font-body text-muted-foreground text-sm sm:text-base max-w-xl">
            9 projects shipped across SaaS, hackathons, open source, and client work — all production, all real users.
          </p>
        </div>
      </section>

      {/* ── Filter tabs ────────────────────────────── */}
      <section className="sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b border-border py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full font-body text-sm transition-all duration-200 border ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-accent hover:text-accent"
              }`}
            >
              {cat}
              <span className="ml-1.5 text-xs opacity-60">
                {cat === "All" ? projects.length : projects.filter((p: Project) => p.category === cat).length}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Grid ───────────────────────────────────── */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {filtered.map((p: Project, i: number) => (
              <div
                key={p.id}
                className={`reveal-blur reveal-delay-${i % 5} glass-card tilt-card rounded-2xl p-5 md:p-6 flex flex-col group`}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-3">
                  <span className="font-orbitron text-xs text-accent/50">0{i + 1}</span>
                  <div className="flex items-center gap-2">
                    {p.featured && (
                      <span className="text-[10px] font-body px-2 py-0.5 rounded-full border text-yellow-400 border-yellow-400/30 bg-yellow-400/5">
                        Featured
                      </span>
                    )}
                    <span className={`text-[10px] uppercase tracking-widest font-body px-2 py-0.5 border rounded-full ${statusColor[p.status] ?? "text-muted-foreground border-border"}`}>
                      {p.status}
                    </span>
                  </div>
                </div>

                <h3 className="font-orbitron text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {p.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">
                  {p.shortDescription}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tags.slice(0, 4).map((t: string) => (
                    <span key={t} className="text-xs font-body text-accent/80 bg-accent/5 border border-accent/10 px-2 py-0.5 rounded-full">
                      {t}
                    </span>
                  ))}
                  {p.tags.length > 4 && (
                    <span className="text-xs font-body text-muted-foreground px-2 py-0.5">
                      +{p.tags.length - 4}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-wrap">
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-body text-xs font-semibold btn-glow btn-sheen magnetic-btn"
                  >
                    Live →
                  </a>
                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-4 py-2 rounded-lg border border-border text-muted-foreground font-body text-xs hover:border-accent hover:text-accent transition-colors"
                    >
                      GitHub
                    </a>
                  )}
                  <button
                    onClick={() => setSelected(p)}
                    className="px-4 py-2 rounded-lg border border-accent/30 text-accent font-body text-xs btn-ghost-glow"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-body text-muted-foreground">No projects in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
};

export default Portfolio;
