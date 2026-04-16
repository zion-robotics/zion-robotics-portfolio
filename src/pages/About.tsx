import { useScrollReveal } from "../hooks/useScrollReveal";

const skills = ["React", "JavaScript", "HTML/CSS", "Lovable", "Sanity CMS", "Paystack", "EmailJS", "Git", "Vercel"];

const About = () => {
  useScrollReveal();

  return (
    <div className="page-enter pt-24 circuit-bg min-h-screen">
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Photo frame */}
          <div className="reveal flex justify-center">
            <div className="relative">
              <div className="w-64 h-80 md:w-80 md:h-96 rounded-2xl border-2 border-accent/30 glow-frame bg-secondary/20 flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary/40 to-accent/20 flex items-center justify-center mb-4">
                    <span className="font-orbitron text-accent text-2xl font-bold">ADJ</span>
                  </div>
                  <p className="font-body text-xs text-muted-foreground">Photo coming soon</p>
                </div>
              </div>
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 blur-xl -z-10" />
            </div>
          </div>

          {/* Bio */}
          <div className="reveal">
            <h1 className="font-orbitron text-3xl md:text-5xl font-bold text-foreground mb-8">About Me</h1>
            <div className="font-body text-muted-foreground leading-relaxed space-y-4 text-sm md:text-base">
              <p>
                I'm Adeogun Daniel Joseph, a Nigerian web developer and the mind behind Zion Robotics. I build modern, high-performance websites and web applications for ambitious brands — focusing on speed, clarity, and real-world functionality.
              </p>
              <p>
                Beyond web development, I'm actively learning robotics and embedded systems. Web development isn't just a skill for me — it's a tool I use to fund and accelerate my journey into building intelligent systems and hardware.
              </p>
              <p>
                Every project I take on is part of a bigger vision: creating technology that solves real problems, both online and in the physical world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="reveal font-orbitron text-xl md:text-2xl font-bold text-foreground mb-8">Skills & Tools</h2>
          <div className="reveal flex flex-wrap gap-3">
            {skills.map((s) => (
              <span key={s} className="skill-pill px-4 py-2 rounded-full font-body text-sm text-accent">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="reveal glass-card rounded-2xl p-8 md:p-12 grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-orbitron text-2xl md:text-4xl font-bold text-accent">6+</p>
              <p className="font-body text-xs md:text-sm text-muted-foreground mt-1">Months Experience</p>
            </div>
            <div>
              <p className="font-orbitron text-2xl md:text-4xl font-bold text-accent">3</p>
              <p className="font-body text-xs md:text-sm text-muted-foreground mt-1">Projects Shipped</p>
            </div>
            <div>
              <p className="font-orbitron text-2xl md:text-4xl font-bold text-accent">2</p>
              <p className="font-body text-xs md:text-sm text-muted-foreground mt-1">SaaS Platforms</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
