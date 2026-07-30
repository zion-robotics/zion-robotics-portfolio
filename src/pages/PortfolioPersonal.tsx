import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import AnimatedLetters from "../components/AnimatedLetters";

const cards = [
  {
    emoji: "🎹",
    title: "Music Keyboard",
    sub: "Still learning",
    body: "I play keyboard. Been at it long enough to get around but not long enough to stop making mistakes. It is the one thing I do that has nothing to do with building or shipping or learning a new framework. I think that matters.",
  },
  {
    emoji: "🎓",
    title: "Student life",
    sub: "FUNAAB x UoPeople",
    body: "Year 2 Mechatronics Engineering at FUNAAB in Abeokuta, also running coursework at the University of the People online. Two institutions at once is a lot. It keeps me sharp though.",
  },
  {
    emoji: "🇳🇬",
    title: "Building from Nigeria",
    sub: "Abeokuta",
    body: "Most of my projects are built with African users in mind, people who have been left out of the tools that exist. Ingenium, EcoConnect, SentryAI. The market is real. Most people building software just are not looking at it.",
  },
];

const PortfolioPersonal = () => {
  useScrollReveal();

  return (
    <div className="page-enter pt-20 md:pt-24 min-h-screen">

      <section className="py-14 md:py-20 px-4 sm:px-6 circuit-bg">
        <div className="max-w-3xl mx-auto">
          <Link to="/portfolio" className="font-body text-xs text-muted-foreground hover:text-accent transition-colors mb-6 inline-flex items-center gap-1">
            ← Portfolio
          </Link>
          <p className="font-exo text-xs tracking-[0.3em] uppercase text-accent mb-3">Personal</p>
          <h1 className="font-orbitron text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4">
            <AnimatedLetters text="Beyond code" step={0.07} />
          </h1>
          <p className="reveal-blur font-body text-muted-foreground text-sm sm:text-base max-w-lg">
            The stuff that has nothing to do with shipping code.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {cards.map((c, i) => (
            <div key={c.title} className={`reveal-blur reveal-delay-${i} glass-card rounded-2xl p-8`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{c.emoji}</span>
                <div>
                  <h3 className="font-orbitron text-lg font-bold text-foreground">{c.title}</h3>
                  <span className="font-body text-xs text-muted-foreground">{c.sub}</span>
                </div>
              </div>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default PortfolioPersonal;
