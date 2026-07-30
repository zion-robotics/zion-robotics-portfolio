import { useState } from "react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import AnimatedLetters from "../components/AnimatedLetters";

const roboticsProjects = [
  {
    id: 1,
    title: "Smart Motion-Sensing Light Controller",
    status: "built",
    context: "School project",
    description: "A room light that turns itself on when someone walks in and off after they leave. Built a state machine in Arduino to handle detection, a grace period to stop false triggers from a sticky PIR sensor, and relay switching for the actual bulb.",
    components: ["Arduino Uno", "PIR Sensor", "5V Relay Module", "1W LED Bulb", "18650 Li-ion Battery x2", "Buck Converter", "Breadboard", "Veroboard x2", "Electrical Junction Box"],
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
    description: "An automatic timer for an electric stove built during the Student Work Experience Programme. Set a cook time, it cuts power once done so food does not burn unattended.",
    components: ["Timer circuit", "Relay module", "Electric stove", "Power supply"],
    code: null,
  },
];

const PortfolioRobotics = () => {
  useScrollReveal();
  const [openCode, setOpenCode] = useState<number | null>(null);

  return (
    <div className="page-enter pt-20 md:pt-24 min-h-screen">

      <section className="py-14 md:py-20 px-4 sm:px-6 circuit-bg">
        <div className="max-w-4xl mx-auto">
          <Link to="/portfolio" className="font-body text-xs text-muted-foreground hover:text-accent transition-colors mb-6 inline-flex items-center gap-1">
            ← Portfolio
          </Link>
          <p className="font-exo text-xs tracking-[0.3em] uppercase text-accent mb-3">Robotics</p>
          <h1 className="font-orbitron text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4">
            <AnimatedLetters text="Hardware" step={0.07} />
          </h1>
          <p className="reveal-blur font-body text-muted-foreground text-sm sm:text-base max-w-xl">
            Hardware builds from school and SWEP. More coming as Year 2 goes deeper.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">

          <div className="reveal-blur mb-10 glass-card rounded-2xl p-6 border-l-2 border-accent">
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Mechatronics is the long game. Most of what I have built so far has been software, but the hardware work has started. Two builds from school and SWEP, with more coming as I go deeper into the degree.
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
    </div>
  );
};

export default PortfolioRobotics;
