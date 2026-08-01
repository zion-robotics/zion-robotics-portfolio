import { useScrollReveal } from "../hooks/useScrollReveal";
import AnimatedLetters from "../components/AnimatedLetters";
import zionpics from "@/assets/zion-pic7.png";
import badgeCchub from "@/assets/badge-cchub.png";
import badgeHng from "@/assets/badge-hng.jpeg";


const skillCategories = [
  {
    label: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Framer Motion", "shadcn/ui"],
  },
  {
    label: "Backend & DB",
    skills: ["Node.js", "Supabase", "PostgreSQL", "REST APIs", "TanStack Router", "Vite"],
  },
  {
    label: "AI & Cloud",
    skills: ["Groq API", "OpenRouter", "Claude API", "Alibaba Cloud", "Vercel", "PWA"],
  },
  {
    label: "Tools",
    skills: ["Git / GitHub", "Chrome Extensions (MV3)", "Python", "Playwright", "Paystack"],
  },
];

const stats = [
  { value: "9+", label: "Projects shipped" },
  { value: "5", label: "Hackathons" },
  { value: "Top 3", label: "Inter-Varsity Competition" },
  { value: "2", label: "Universities" },
];

const timeline = [
  {
    year: "2026",
    items: [
      "Top 3 finish at the Mechatronics Inter-Varsity Competition among 9 universities in Nigeria (co-built with Nicholas Sobowale)",
      "Built SentryAI — AI omnichannel inbox for African SMEs (Qwen Hackathon 2026)",
      "Built StudyPal — offline-first AI study companion (YPIT Hackathon 2026)",
      "Built EcoConnect — AI economic platform across 10 African countries (Squad Hackathon 3.0)",
      "Built SwarmDesk — AI support dashboard with blockchain agent memory (MemForks Bounty)",
      "Co-founded Ingenium AI — AI engineering platform for African students",
      "Shipped LitePress — browser-based file utility (open source)",
      "Built client ecommerce site for Bioresonance Africa, Lagos",
    ],
  },
  {
    year: "2025",
    items: [
      "Started my software development journey",
      "Built my first landing pages using HTML, CSS, and JavaScript",
      "Learned SEO, digital marketing, and website optimization",
      "Began using Git and GitHub for version control",
      "Laid the foundation for my journey as a developer",
    ],
  },
  {
    year: "2024",
    items: [
      "Started B.Eng. Mechatronics Engineering at FUNAAB",
      "Also enrolled at University of the People",
      "Started Zion Robotics — building under this brand from day one",
    ],
  },
];

const About = () => {
  useScrollReveal();

  return (
    <div className="page-enter pt-20 md:pt-24 min-h-screen">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 sm:px-6 circuit-bg">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Portrait */}
          <div className="reveal-left flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/5 blur-2xl" />
              <div className="relative w-60 h-72 sm:w-72 sm:h-88 md:w-80 md:h-96 rounded-2xl border border-accent/20 glow-frame overflow-hidden bg-card">
                <img
                  src={zionpics}
                  alt="Adeogun Daniel Joseph"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-orbitron text-sm font-bold text-foreground">Adeogun Daniel Joseph</p>
                  <p className="font-body text-xs text-accent mt-0.5">Fullstack Dev · AI Builder · Co-founder</p>
                </div>
              </div>

              {/* Floating tags */}
              <div className="absolute -top-3 -right-3 px-3 py-1.5 bg-card border border-border rounded-full text-xs font-body text-muted-foreground shadow-lg">
                🎓 FUNAAB · UoPeople
              </div>
              <div className="absolute -bottom-3 -left-3 px-3 py-1.5 bg-card border border-border rounded-full text-xs font-body text-muted-foreground shadow-lg">
                🇳🇬 Abeokuta, Nigeria
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="reveal-right">
            <p className="font-exo text-xs tracking-[0.3em] uppercase text-accent mb-3">Who I am</p>
            <h1 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              <AnimatedLetters text="About Me" step={0.06} />
            </h1>
            <div className="font-body text-muted-foreground leading-relaxed space-y-4 text-sm md:text-base">
              <p>
                I'm Daniel — a fullstack developer and AI application builder based in Abeokuta, Nigeria. I build production-grade web apps across the full stack: React frontends, Supabase backends, and AI integrations using Groq, OpenRouter, and Claude.
              </p>
              <p>
                I co-founded <span className="text-accent">Ingenium AI</span>, an AI engineering platform for African students, and have shipped products across five hackathons. I also build under my own brand, <span className="text-accent">Zion Robotics</span> — tools that solve real problems for real people.
              </p>
              <p>
                Outside of code, I'm a Year 2 Mechatronics Engineering student at FUNAAB, also enrolled at the University of the People. Web development funds and accelerates my long-term path into robotics and intelligent systems.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:adeogunjosephdaniel@gmail.com"
                className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-body text-sm font-semibold btn-glow btn-sheen magnetic-btn"
              >
                Email me
              </a>
              <a
                href="https://github.com/zion-robotics"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg border border-border text-muted-foreground font-body text-sm hover:border-accent hover:text-accent transition-colors"
              >
                GitHub →
              </a>
              <a
                href="https://ingeniumai.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg border border-accent/30 text-accent font-body text-sm hover:border-accent transition-colors"
              >
                Ingenium AI →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────── */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-blur grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
            {stats.map((s) => (
              <div key={s.label} className="bg-card px-6 py-6 text-center">
                <p className="font-orbitron text-3xl font-bold text-accent glow-pulse-text">{s.value}</p>
                <p className="font-body text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Badges & Certifications ──────────────────────── */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-blur mb-10">
            <p className="font-exo text-xs tracking-[0.3em] uppercase text-accent mb-2">External recognition</p>
            <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-foreground">Badges & Programs</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* CcHUB Gateway */}
            <div className="reveal-blur reveal-delay-0 glass-card rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-orbitron text-sm font-bold text-foreground">Gateway Program</p>
                  <p className="font-body text-xs text-accent mt-0.5">CcHUB x Mastercard Foundation</p>
                </div>
                <span className="text-[10px] font-body px-2 py-0.5 rounded-full border text-green-400 border-green-400/30 bg-green-400/5">Active</span>
              </div>
              <p className="font-body text-xs text-muted-foreground leading-relaxed">
                Selected for the CcHUB Gateway Program, a Mastercard Foundation initiative. Taking UI/UX Design skills to the next level. Nigeria cohort.
              </p>
              <div className="mt-auto rounded-xl overflow-hidden border border-border bg-muted/20 h-32">
                <img src={badgeCchub} alt="CcHUB Gateway Badge" className="w-full h-full object-contain p-2" />
              </div>
              <a href="https://gateway.cchub.africa" target="_blank" rel="noopener noreferrer"
                className="font-body text-xs text-accent hover:text-foreground transition-colors flex items-center gap-1">
                gateway.cchub.africa →
              </a>
            </div>

            {/* HNG Internship */}
            <div className="reveal-blur reveal-delay-1 glass-card rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-orbitron text-sm font-bold text-foreground">HNG Internship</p>
                  <p className="font-body text-xs text-accent mt-0.5">Frontend Track</p>
                </div>
                <span className="text-[10px] font-body px-2 py-0.5 rounded-full border text-muted-foreground border-border">Week 5</span>
              </div>
              <p className="font-body text-xs text-muted-foreground leading-relaxed">
                Participated in the HNG Internship on the Frontend track. Made it to week 5 before the program required payment to continue. Solid exposure to fast-paced collaborative dev work.
              </p>
              <div className="mt-auto rounded-xl overflow-hidden border border-border bg-muted/20 h-32">
                <img src={badgeHng} alt="HNG Internship Badge" className="w-full h-full object-contain p-2" />
              </div>
              <a href="https://hng.tech" target="_blank" rel="noopener noreferrer"
                className="font-body text-xs text-accent hover:text-foreground transition-colors flex items-center gap-1">
                hng.tech →
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ── Skills ───────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 circuit-bg">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-blur mb-10">
            <p className="font-exo text-xs tracking-[0.3em] uppercase text-accent mb-2">What I work with</p>
            <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-foreground">Skills & Tools</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((cat, ci) => (
              <div key={cat.label} className={`reveal-zoom reveal-delay-${ci} glass-card rounded-2xl p-5`}>
                <p className="font-exo text-xs tracking-[0.2em] uppercase text-accent mb-4">{cat.label}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((s) => (
                    <span key={s} className="skill-pill px-3 py-1 rounded-full font-body text-xs text-accent/90">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="reveal-blur mb-10">
            <p className="font-exo text-xs tracking-[0.3em] uppercase text-accent mb-2">The journey</p>
            <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-foreground">Experience</h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />

            <div className="space-y-10">
              {timeline.map((block, bi) => (
                <div key={block.year} className={`reveal-left reveal-delay-${bi} relative pl-10`}>
                  {/* Dot */}
                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-card border-2 border-accent flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>

                  <p className="font-orbitron text-sm font-bold text-accent mb-3">{block.year}</p>
                  <ul className="space-y-2">
                    {block.items.map((item) => (
                      <li key={item} className="font-body text-sm text-muted-foreground flex gap-2">
                        <span className="text-accent mt-0.5 flex-shrink-0">›</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
