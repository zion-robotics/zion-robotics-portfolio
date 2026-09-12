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
  const assemblyRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const section = sectionRef.current;
    const yard = assemblyRef.current;
    if (!section || !yard) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 760px)");

    let raf = 0;
    let running = false;
    let current = 0;
    let target = 0;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    // Scroll window: starts when the yard's top edge crosses 88% of the
    // viewport, completes when the yard is centred at 52% of the viewport.
    const computeTarget = () => {
      const rect = yard.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.88;
      const end = vh * 0.52 - rect.height / 2;
      return Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
    };

    const apply = (v: number) => {
      section.style.setProperty("--assembly", easeOutCubic(v).toFixed(4));
      const r = section.getBoundingClientRect();
      const p = Math.max(
        -1,
        Math.min(1, (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight),
      );
      section.style.setProperty("--section-parallax", `${p * 24}px`);
    };

    const tick = () => {
      current += (target - current) * 0.14; // scrub smoothing, both directions
      if (Math.abs(target - current) < 0.001) {
        current = target;
        running = false;
      }
      apply(current);
      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const onScroll = () => {
      if (reduce.matches || mobile.matches) {
        section.style.setProperty("--assembly", "1");
        section.style.setProperty("--section-parallax", "0px");
        return;
      }
      target = computeTarget();
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
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

        <div ref={assemblyRef} className="container-yard">
          {BRANCHES.map((branch, index) => (
            <div
              key={branch.path}
              className="container-position"
              data-side={index === 0 ? "left" : index === 2 ? "right" : "middle"}
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
