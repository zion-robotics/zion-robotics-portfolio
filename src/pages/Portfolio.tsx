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
}

const Portfolio = () => {
  useScrollReveal();
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <div className="page-enter pt-20 md:pt-24 circuit-bg min-h-screen">
      <section className="py-12 md:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-orbitron text-4xl sm:text-5xl md:text-7xl font-bold text-foreground mb-4">
            <span className="glow-underline">
              <AnimatedLetters text="Project" step={0.08} />
            </span>
          </h1>
          <p className="reveal-blur font-body text-muted-foreground mb-12 md:mb-16 text-sm sm:text-base md:text-lg">
            Projects I've built for real clients and real users.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {projects.map((p: Project, i: number) => (
              <div
                key={p.id}
                className={`reveal-blur reveal-delay-${i % 5} glass-card tilt-card rounded-2xl p-5 md:p-6 flex flex-col cursor-pointer`}
              >
                <h3 className="font-orbitron text-lg font-bold text-foreground mb-2">{p.title}</h3>
                <p className="font-body text-sm text-muted-foreground mb-4 flex-1">{p.shortDescription}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tags.map((t: string) => (
                    <span key={t} className="text-xs font-body text-accent/80 bg-accent/5 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-body text-sm font-semibold btn-glow btn-sheen magnetic-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Live Site
                  </a>
                  <button
                    onClick={() => setSelected(p)}
                    className="px-5 py-2 rounded-lg border border-accent/30 text-accent font-body text-sm font-semibold btn-ghost-glow btn-sheen"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
};
export default Portfolio;
