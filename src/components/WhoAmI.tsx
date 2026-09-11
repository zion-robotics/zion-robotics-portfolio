import {
  useEffect,
  useRef,
  type CSSProperties,
  type PointerEvent,
} from "react";
import { useNavigate } from "react-router-dom";

const BRANCHES = [
  {
    path: "/portfolio/dev",
    number: "01",
    label: "Development",
    shortLabel: "Dev",
    desc: "Full-stack | AI | SaaS",
    accent: "#3b82f6",
    darkAccent: "#1d4ed8",
  },
  {
    path: "/portfolio/robotics",
    number: "02",
    label: "Robotics",
    shortLabel: "Robotics",
    desc: "Arduino | Embedded | Mechatronics",
    accent: "#f97316",
    darkAccent: "#c2410c",
  },
  {
    path: "/portfolio/personal",
    number: "03",
    label: "Personal",
    shortLabel: "Personal",
    desc: "Music | Student | Nigeria",
    accent: "#16a34a",
    darkAccent: "#15803d",
  },
];

type ContainerStyle = CSSProperties & {
  "--container-accent": string;
  "--container-dark": string;
  "--mouse-x": string;
  "--mouse-y": string;
  "--parallax-y": string;
};

const WhoAmI = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    let frame = 0;

    const updateParallax = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const sectionCenter = rect.top + rect.height / 2;
        const progress = Math.max(
          -1,
          Math.min(1, (sectionCenter - viewportCenter) / window.innerHeight),
        );

        section.style.setProperty("--section-parallax", `${progress * 24}px`);
      });
    };

    updateParallax();
    window.addEventListener("scroll", updateParallax, { passive: true });
    window.addEventListener("resize", updateParallax);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateParallax);
      window.removeEventListener("resize", updateParallax);
    };
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "touch") return;

    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    card.style.setProperty("--mouse-x", `${y * -5}deg`);
    card.style.setProperty("--mouse-y", `${x * 7}deg`);
  };

  const resetPointer = (event: PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.style.setProperty("--mouse-x", "0deg");
    event.currentTarget.style.setProperty("--mouse-y", "0deg");
  };

  return (
    <section ref={sectionRef} className="identity-section">
      <div className="identity-grid" aria-hidden="true" />

      <div className="identity-content">
        <div className="identity-heading">
          <p className="identity-kicker">Who I am</p>
          <h2 className="identity-name">Daniel</h2>
          <p className="identity-intro">Three disciplines. One builder.</p>
        </div>

        <div className="container-yard">
          {BRANCHES.map((branch, index) => (
            <div
              key={branch.path}
              className="container-position"
              style={
                {
                  "--parallax-y": `${index === 1 ? -10 : index * 7}px`,
                } as ContainerStyle
              }
            >
              <button
                type="button"
                className="cargo-container"
                onClick={() => navigate(branch.path)}
                onPointerMove={handlePointerMove}
                onPointerLeave={resetPointer}
                onPointerCancel={resetPointer}
                aria-label={`Explore ${branch.label}`}
                style={
                  {
                    "--container-accent": branch.accent,
                    "--container-dark": branch.darkAccent,
                    "--mouse-x": "0deg",
                    "--mouse-y": "0deg",
                  } as ContainerStyle
                }
              >
                <span className="container-ribs" aria-hidden="true" />

                <span className="container-header">
                  <span className="container-code">ZR / {branch.number}</span>
                  <span className="container-status">ACTIVE</span>
                </span>

                <span className="container-copy">
                  <span className="container-title">{branch.shortLabel}</span>
                  <span className="container-description">{branch.desc}</span>
                </span>

                <span className="container-footer">
                  <span>Explore division</span>
                  <span className="container-arrow" aria-hidden="true">
                    ↗
                  </span>
                </span>

                <span className="container-lock left" aria-hidden="true" />
                <span className="container-lock right" aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>

        <div className="yard-floor" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
};

export default WhoAmI;
