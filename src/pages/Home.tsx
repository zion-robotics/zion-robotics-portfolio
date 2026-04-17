import { useEffect, useState } from "react";
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

const FULL_NAME = "Adeogun Daniel Joseph";

const Home = () => {
  useScrollReveal();
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setTyped(FULL_NAME.slice(0, i));
        if (i >= FULL_NAME.length) clearInterval(interval);
      }, 90);
    }, 600);
    return () => clearTimeout(startDelay);
  }, []);

  const featured = projects.filter((p: Project) => p.featured);

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden circuit-bg">
        <ParticleCanvas />
        {/* Video bg — much more visible */}
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80"
        >
          <source src="https://videos.pexels.com/video-files/3129957/3129957-uhd_3840_2160_25fps.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/2611250/2611250-uhd_3840_2160_30fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/55 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_90%)]" />

        {/* Animated orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-primary/25 blur-3xl float-y" />
        <div className="absolute bottom-1/4 -right-20 w-[28rem] h-[28rem] rounded-full bg-accent/20 blur-3xl float-y" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="hero-reveal hero-delay-1 font-exo text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Web Developer · Robotics Enthusiast
          </p>
          <h1 className="font-orbitron text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-3 text-foreground min-h-[1.2em]">
            {typed}
            <span className="type-caret">|</span>
          </h1>
          <p className="hero-reveal hero-delay-3 font-orbitron text-lg md:text-2xl font-semibold text-accent tracking-wider mb-4 glow-pulse-text">
            Zion Robotics
          </p>
          <p className="hero-reveal hero-delay-4 font-exo text-xl md:text-2xl text-foreground/90 mb-2">
            Web development for ambitious brands
          </p>
          <p className="hero-reveal hero-delay-4 font-body text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mb-10">
            I build fast, scalable web applications — while pushing toward the future of robotics and intelligent systems.
          </p>

          <div className="hero-reveal hero-delay-5 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/portfolio"
              className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm btn-glow magnetic-btn"
            >
              See My Work
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-lg border border-accent/40 text-accent font-body font-semibold text-sm btn-ghost-glow magnetic-btn"
            >
              Contact Me
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
          <svg className="w-6 h-6 text-accent/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7" />
          </svg>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 md:py-32 px-6 circuit-bg">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="reveal-left">
            <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-foreground mb-6">
              Building the digital future
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed text-base md:text-lg">
              I'm Daniel, a Nigerian web developer focused on building fast, reliable websites and web applications for real-world use. I create clean, high-performance digital products — from business websites to full-scale platforms — designed to deliver results.
            </p>
          </div>
          <div className="reveal-right flex justify-center md:justify-end">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border border-accent/20 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-2xl" />
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-full border border-accent/30 bg-secondary/30 flex items-center justify-center">
                <span className="font-orbitron text-accent text-3xl md:text-4xl font-bold">ZR</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 aurora-bg opacity-40" />
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="reveal-blur font-orbitron text-2xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Featured <span className="shimmer-text">Work</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((p: Project, i: number) => (
              <div key={p.id} className={`reveal-blur reveal-delay-${i} glass-card tilt-card rounded-2xl p-6 flex flex-col`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-orbitron text-xs text-accent/60">0{i + 1}</span>
                  <span className="text-[10px] uppercase tracking-widest font-body text-accent/70 px-2 py-0.5 border border-accent/30 rounded-full">{p.status}</span>
                </div>
                <h3 className="font-orbitron text-lg font-bold text-foreground mb-2">{p.title}</h3>
                <p className="font-body text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">{p.fullDescription}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tags.map((t: string) => (
                    <span key={t} className="text-xs font-body text-accent/80 bg-accent/5 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-accent hover:text-foreground transition-colors group"
                >
                  View Project <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
