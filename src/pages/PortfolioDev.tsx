import { useState } from "react";
import { Link } from "react-router-dom";
import badgeCchub from "@/assets/badge-cchub.png";
import badgeHng from "@/assets/badge-hng.jpeg";
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
  achievement?: string;
}

const CATEGORIES = ["All", "SaaS", "Hackathon", "Tool", "Client Work"];

const statusColor: Record<string, string> = {
  live: "text-green-400 border-green-400/30 bg-green-400/5",
  shipped: "text-accent border-accent/30 bg-accent/5",
  "in development": "text-yellow-400 border-yellow-400/30 bg-yellow-400/5",
};

const PortfolioDev = () => {
  useScrollReveal();
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p: Project) => p.category === activeCategory);

  return (
    <div className="page-enter pt-20 md:pt-24 min-h-screen">

      <section className="py-14 md:py-20 px-4 sm:px-6 circuit-bg">
        <div className="max-w-7xl mx-auto">
          <Link to="/portfolio" className="font-body text-xs text-muted-foreground hover:text-accent transition-colors mb-6 inline-flex items-center gap-1">
            ← Portfolio
          </Link>
          <p className="font-exo text-xs tracking-[0.3em] uppercase text-primary mb-3">Dev</p>
          <h1 className="font-orbitron text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4">
            <AnimatedLetters text="Software" step={0.07} />
          </h1>
          <p className="reveal-blur font-body text-muted-foreground text-sm sm:text-base max-w-xl">
            9 projects shipped across SaaS, hackathons, open source, and client work.
          </p>
        </div>
      </section>

      <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b border-border py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full font-body text-sm transition-all duration-200 border ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
              <span className="ml-1.5 text-xs opacity-60">
                {cat === "All" ? projects.length : projects.filter((p: Project) => p.category === cat).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {filtered.map((p: Project, i: number) => (
              <div key={p.id} className={`reveal-blur reveal-delay-${i % 5} glass-card tilt-card rounded-2xl p-5 md:p-6 flex flex-col group`}>
                <div className="flex items-start justify-between mb-3">
                  <span className="font-orbitron text-xs text-primary/50">0{i + 1}</span>
                  <div className="flex items-center gap-2">
                    {p.featured && (
                      <span className="text-[10px] font-body px-2 py-0.5 rounded-full border text-yellow-400 border-yellow-400/30 bg-yellow-400/5">Featured</span>
                    )}
                    <span className={`text-[10px] uppercase tracking-widest font-body px-2 py-0.5 border rounded-full ${statusColor[p.status] ?? "text-muted-foreground border-border"}`}>
                      {p.status}
                    </span>
                  </div>
                </div>
                {p.achievement && (
                  <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg bg-yellow-400/5 border border-yellow-400/20">
                    <span className="font-body text-[11px] text-yellow-400 leading-snug">{p.achievement}</span>
                  </div>
                )}
                <h3 className="font-orbitron text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="font-body text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">{p.shortDescription}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tags.slice(0, 4).map((t: string) => (
                    <span key={t} className="text-xs font-body text-primary/80 bg-primary/5 border border-primary/10 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                  {p.tags.length > 4 && <span className="text-xs font-body text-muted-foreground px-2 py-0.5">+{p.tags.length - 4}</span>}
                </div>
                <div className="flex gap-2 flex-wrap">
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-body text-xs font-semibold btn-glow btn-sheen magnetic-btn">
                    Live →
                  </a>
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                      className="px-4 py-2 rounded-lg border border-border text-muted-foreground font-body text-xs hover:border-primary hover:text-primary transition-colors">
                      GitHub
                    </a>
                  )}
                  <button onClick={() => setSelected(p)}
                    className="px-4 py-2 rounded-lg border border-primary/30 text-primary font-body text-xs btn-ghost-glow">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Badges ─────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 circuit-bg">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-blur mb-10">
            <p className="font-exo text-xs tracking-[0.3em] uppercase text-primary mb-2">External recognition</p>
            <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-foreground">Dev Badges</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            <div className="reveal-blur reveal-delay-0 glass-card rounded-2xl overflow-hidden flex flex-col">
              <div className="h-48 bg-muted/20 overflow-hidden">
                <img src={badgeCchub} alt="CcHUB Gateway Program Badge" className="w-full h-full object-contain p-4" />
              </div>
              <div className="p-5 flex flex-col gap-2 flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-orbitron text-sm font-bold text-foreground">Gateway Program</p>
                    <p className="font-body text-xs text-primary mt-0.5">CcHUB x Mastercard Foundation</p>
                  </div>
                  <span className="text-[10px] font-body px-2 py-0.5 rounded-full border text-green-400 border-green-400/30 bg-green-400/5 flex-shrink-0">Active</span>
                </div>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">
                  Selected for the CcHUB Gateway Program. Taking UI/UX Design to the next level. Nigeria cohort.
                </p>
                <a href="https://gateway.cchub.africa" target="_blank" rel="noopener noreferrer"
                  className="mt-auto font-body text-xs text-primary hover:text-foreground transition-colors flex items-center gap-1">
                  gateway.cchub.africa →
                </a>
              </div>
            </div>

            <div className="reveal-blur reveal-delay-1 glass-card rounded-2xl overflow-hidden flex flex-col">
              <div className="h-48 bg-muted/20 overflow-hidden">
                <img src={badgeHng} alt="HNG Internship Badge" className="w-full h-full object-contain p-4" />
              </div>
              <div className="p-5 flex flex-col gap-2 flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-orbitron text-sm font-bold text-foreground">HNG Internship</p>
                    <p className="font-body text-xs text-primary mt-0.5">Frontend Track</p>
                  </div>
                  <span className="text-[10px] font-body px-2 py-0.5 rounded-full border text-muted-foreground border-border flex-shrink-0">Week 5</span>
                </div>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">
                  Participated in the HNG Internship on the Frontend track. Made it to week 5 before the program required payment to continue. Solid exposure to fast-paced collaborative dev work.
                </p>
                <a href="https://hng.tech" target="_blank" rel="noopener noreferrer"
                  className="mt-auto font-body text-xs text-primary hover:text-foreground transition-colors flex items-center gap-1">
                  hng.tech →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
};

export default PortfolioDev;
