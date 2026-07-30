import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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

type Tab = "dev" | "robotics" | "personal";

const TABS: { value: Tab; label: string; emoji: string }[] = [
  { value: "dev", label: "Dev", emoji: "💻" },
  { value: "robotics", label: "Robotics", emoji: "🤖" },
  { value: "personal", label: "Personal", emoji: "🎹" },
];

const DEV_CATEGORIES = ["All", "SaaS", "Hackathon", "Tool", "Client Work"];

const statusColor: Record<string, string> = {
  live: "text-green-400 border-green-400/30 bg-green-400/5",
  shipped: "text-accent border-accent/30 bg-accent/5",
  "in development": "text-yellow-400 border-yellow-400/30 bg-yellow-400/5",
};

const roboticsProjects = [
  {
    id: 1,
    title: "Smart Motion-Sensing Light Controller",
    status: "built",
    context: "School project",
    description: "A room light that turns itself on when someone walks in and off after they leave. Built a state machine in Arduino to handle detection, a grace period to stop false triggers from a sticky PIR sensor, and relay switching for the actual bulb.",
    components: [
      "Arduino Uno",
      "PIR Sensor",
      "5V Relay Module",
      "1W LED Bulb",
      "18650 Li-ion Battery x2",
      "Buck Converter",
      "Breadboard",
      "Veroboard x2",
      "Electrical Junction Box",
    ],
    code: `const int pirPin = 2;
const int relayPin = 8;
const long LIGHT_ON_DURATION = 5000;
const long GRACE_PERIOD_DURATION = 3000;
const int RELAY_ON = LOW;
const int RELAY_OFF = HIGH;

enum State { INIT, WAITING, MOTION_DETECTED, GRACE_PERIOD };
State currentState = INIT;
unsigned long stateStartTime = 0;

void setup() {
  Serial.begin(9600);
  pinMode(relayPin, OUTPUT);
  pinMode(pirPin, INPUT);
  digitalWrite(relayPin, RELAY_OFF);
  stateStartTime = millis();
}

void loop() {
  int motionState = digitalRead(pirPin);
  unsigned long currentTime = millis();

  switch (currentState) {
    case INIT:
      if (currentTime - stateStartTime >= 2000) {
        currentState = WAITING;
        stateStartTime = currentTime;
      }
      break;
    case WAITING:
      if (motionState == HIGH) {
        digitalWrite(relayPin, RELAY_ON);
        currentState = MOTION_DETECTED;
        stateStartTime = currentTime;
      }
      break;
    case MOTION_DETECTED:
      if (currentTime - stateStartTime >= LIGHT_ON_DURATION) {
        currentState = GRACE_PERIOD;
        stateStartTime = currentTime;
      }
      break;
    case GRACE_PERIOD:
      if (currentTime - stateStartTime >= GRACE_PERIOD_DURATION) {
        digitalWrite(relayPin, RELAY_OFF);
        currentState = WAITING;
        stateStartTime = currentTime;
      }
      break;
  }
}`,
  },
  {
    id: 2,
    title: "Electric Stove Timer",
    status: "built",
    context: "SWEP",
    description: "An automatic timer for an electric stove built during the Student Work Experience Programme. Lets you set a cook time and cuts power once the timer runs out so food doesn't burn unattended.",
    components: ["Timer circuit", "Relay module", "Electric stove", "Power supply"],
    code: null,
  },
];

// ── Dev Tab ──────────────────────────────────────────────────────────────────
const DevTab = () => {
  useScrollReveal();
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p: Project) => p.category === activeCategory);

  return (
    <>
      <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b border-border py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {DEV_CATEGORIES.map((cat) => (
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
      </div>

      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {filtered.map((p: Project, i: number) => (
              <div key={p.id} className={`reveal-blur reveal-delay-${i % 5} glass-card tilt-card rounded-2xl p-5 md:p-6 flex flex-col group`}>
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
                <h3 className="font-orbitron text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">{p.title}</h3>
                <p className="font-body text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">{p.shortDescription}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tags.slice(0, 4).map((t: string) => (
                    <span key={t} className="text-xs font-body text-accent/80 bg-accent/5 border border-accent/10 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                  {p.tags.length > 4 && (
                    <span className="text-xs font-body text-muted-foreground px-2 py-0.5">+{p.tags.length - 4}</span>
                  )}
                </div>
                <div className="flex gap-2 flex-wrap">
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-body text-xs font-semibold btn-glow btn-sheen magnetic-btn">
                    Live →
                  </a>
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                      className="px-4 py-2 rounded-lg border border-border text-muted-foreground font-body text-xs hover:border-accent hover:text-accent transition-colors">
                      GitHub
                    </a>
                  )}
                  <button onClick={() => setSelected(p)}
                    className="px-4 py-2 rounded-lg border border-accent/30 text-accent font-body text-xs btn-ghost-glow">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
};

// ── Robotics Tab ─────────────────────────────────────────────────────────────
const RoboticsTab = () => {
  useScrollReveal();
  const [openCode, setOpenCode] = useState<number | null>(null);

  return (
    <section className="py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">

        <div className="reveal-blur mb-10 glass-card rounded-2xl p-6 border-l-2 border-accent">
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            Mechatronics is the long game. Most of what I've built so far has been software, but the hardware work has started. Two builds from school and SWEP, with more coming as I go deeper into Year 2.
          </p>
        </div>

        <div className="space-y-8">
          {roboticsProjects.map((p, i) => (
            <div key={p.id} className={`reveal-blur reveal-delay-${i} glass-card rounded-2xl p-6 md:p-8`}>
              <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                <div>
                  <span className="font-exo text-xs tracking-[0.2em] uppercase text-accent/60 block mb-1">{p.context}</span>
                  <h3 className="font-orbitron text-xl font-bold text-foreground">{p.title}</h3>
                </div>
                <span className="text-[10px] uppercase tracking-widest font-body px-3 py-1 border rounded-full text-green-400 border-green-400/30 bg-green-400/5">
                  {p.status}
                </span>
              </div>

              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">{p.description}</p>

              <div className="mb-6">
                <p className="font-exo text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Components</p>
                <div className="flex flex-wrap gap-2">
                  {p.components.map((c) => (
                    <span key={c} className="text-xs font-body text-accent/80 bg-accent/5 border border-accent/10 px-3 py-1 rounded-full">{c}</span>
                  ))}
                </div>
              </div>

              {p.code && (
                <div>
                  <button
                    onClick={() => setOpenCode(openCode === p.id ? null : p.id)}
                    className="flex items-center gap-2 font-body text-sm text-accent hover:text-foreground transition-colors mb-3"
                  >
                    <span>{openCode === p.id ? "Hide" : "View"} Arduino Code</span>
                    <span className={`transition-transform duration-200 ${openCode === p.id ? "rotate-180" : ""}`}>↓</span>
                  </button>
                  {openCode === p.id && (
                    <pre className="bg-background border border-border rounded-xl p-4 overflow-x-auto text-xs font-mono text-muted-foreground leading-relaxed">
                      <code>{p.code}</code>
                    </pre>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="reveal-blur mt-10 glass-card rounded-2xl p-6 text-center border border-dashed border-border">
          <p className="font-orbitron text-sm text-muted-foreground mb-2">More builds coming</p>
          <p className="font-body text-xs text-muted-foreground">Year 2 Mechatronics. The hardware work is just getting started.</p>
        </div>

      </div>
    </section>
  );
};

// ── Personal Tab ─────────────────────────────────────────────────────────────
const PersonalTab = () => {
  useScrollReveal();

  return (
    <section className="py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">

        <div className="reveal-blur glass-card rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🎹</span>
            <div>
              <h3 className="font-orbitron text-lg font-bold text-foreground">Music Keyboard</h3>
              <span className="font-body text-xs text-muted-foreground">Still learning</span>
            </div>
          </div>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            I play keyboard. Been at it long enough to get around but not long enough to stop making mistakes. It's the one thing I do that has nothing to do with building or shipping or learning a new framework. I think that matters.
          </p>
        </div>

        <div className="reveal-blur glass-card rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🎓</span>
            <div>
              <h3 className="font-orbitron text-lg font-bold text-foreground">Student life</h3>
              <span className="font-body text-xs text-muted-foreground">FUNAAB x UoPeople</span>
            </div>
          </div>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            Year 2 Mechatronics Engineering at FUNAAB in Abeokuta, also running coursework at the University of the People online. Two institutions at once is a lot. It keeps me sharp though.
          </p>
        </div>

        <div className="reveal-blur glass-card rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🇳🇬</span>
            <div>
              <h3 className="font-orbitron text-lg font-bold text-foreground">Building from Nigeria</h3>
              <span className="font-body text-xs text-muted-foreground">Abeokuta</span>
            </div>
          </div>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            Most of my projects are built with African users in mind, people who've been left out of the tools that exist. Ingenium, EcoConnect, SentryAI. The market is real. Most people building software just aren't looking at it.
          </p>
        </div>

      </div>
    </section>
  );
};

// ── Main Portfolio page ───────────────────────────────────────────────────────
const Portfolio = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = (searchParams.get("tab") as Tab) ?? "dev";

  const setTab = (t: Tab) => setSearchParams({ tab: t });

  const headers: Record<Tab, { label: string; sub: string }> = {
    dev: { label: "Dev", sub: "9 projects across SaaS, hackathons, open source, and client work." },
    robotics: { label: "Robotics", sub: "Hardware builds from school and SWEP. More coming." },
    personal: { label: "Personal", sub: "The stuff that has nothing to do with shipping code." },
  };

  return (
    <div className="page-enter pt-20 md:pt-24 min-h-screen">

      {/* Header */}
      <section className="py-14 md:py-20 px-4 sm:px-6 circuit-bg">
        <div className="max-w-7xl mx-auto">
          <p className="font-exo text-xs tracking-[0.3em] uppercase text-accent mb-3">Portfolio</p>
          <h1 className="font-orbitron text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4">
            <AnimatedLetters text={headers[tab].label} step={0.07} />
          </h1>
          <p className="reveal-blur font-body text-muted-foreground text-sm sm:text-base max-w-xl">
            {headers[tab].sub}
          </p>
        </div>
      </section>

      {/* Tab switcher */}
      <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-1 py-2">
          {TABS.map((t) => (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg font-body text-sm transition-all duration-200 ${
                tab === t.value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <span>{t.emoji}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {tab === "dev" && <DevTab />}
      {tab === "robotics" && <RoboticsTab />}
      {tab === "personal" && <PersonalTab />}

    </div>
  );
};

export default Portfolio;
