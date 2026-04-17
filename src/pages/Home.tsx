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

const Home = () => {
  useScrollReveal();

  const featured = projects.filter((p: Project) => p.featured);

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden circuit-bg">
        <ParticleCanvas />
        {/* Video bg */}
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=60"
        >
          <source src="https://videos.pexels.com/video-files/3129957/3129957-uhd_3840_2160_25fps.mp4" type="video/mp4" />
          <source src="https://cdn.coverr.co/videos/coverr-a-network-of-stars-2633/1080p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="hero-reveal hero-delay-1 font-exo text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Web Developer · Robotics Enthusiast
          </p>
          <h1 className="hero-reveal hero-delay-2 font-orbitron text-4xl sm:text-5xl md:text-7xl font-bold leading-tight text-foreground mb-3">
            Adeogun Daniel Joseph
          </h1>
          <p className="hero-reveal hero-delay-3 font-orbitron text-lg md:text-2xl font-semibold text-accent tracking-wider mb-4">
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
              className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm btn-glow"
            >
              See My Work
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-lg border border-accent/40 text-accent font-body font-semibold text-sm btn-ghost-glow"
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
          <div className="reveal">
            <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-foreground mb-6">
              Building the digital future
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed text-base md:text-lg">
              I'm Daniel, a Nigerian web developer focused on building fast, reliable websites and web applications for real-world use. I create clean, high-performance digital products — from business websites to full-scale platforms — designed to deliver results.
            </p>
          </div>
          <div className="reveal flex justify-center md:justify-end">
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
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="reveal font-orbitron text-2xl md:text-3xl font-bold text-foreground mb-12 text-center">
            Featured Work
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((p: Project, i: number) => (
              <div key={p.id} className={`reveal glass-card rounded-2xl p-6 flex flex-col reveal-delay-${i}`}>
                <h3 className="font-orbitron text-lg font-bold text-foreground mb-2">{p.title}</h3>
                <p className="font-body text-sm text-muted-foreground mb-4 flex-1">{p.fullDescription}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tags.map((t: string) => (
                    <span key={t} className="text-xs font-body text-accent/80 bg-accent/5 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-accent hover:text-foreground transition-colors"
                >
                  View Project →
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
