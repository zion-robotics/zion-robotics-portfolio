import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ParticleCanvas from "./ParticleCanvas";
import zionLogo from "@/assets/zion-logo.png";
import { gsap, SplitText, MQ } from "@/lib/gsap";

const ROLES = ["Web Developer", "Robotics Enthusiast", "AI Builder", "SaaS Founder"];

// depth = how far the sticker drifts while you scroll. rot = extra spin.
const STICKERS = [
  { label: "Mechatronics", pos: "left-[4%] top-[24%]", tilt: -8, depth: 0.9, rot: -10, tone: "bg-accent text-accent-foreground", mobile: true },
  { label: "Fullstack + AI", pos: "right-[5%] top-[20%]", tilt: 6, depth: 1.3, rot: 12, tone: "bg-primary text-primary-foreground", mobile: true },
  { label: "Ingenium AI", pos: "left-[44%] top-[15%]", tilt: -4, depth: 0.6, rot: 8, tone: "bg-card text-foreground border border-border", mobile: false },
  { label: "Zion Robotics", pos: "right-[26%] top-[47%]", tilt: 5, depth: 1.1, rot: -14, tone: "bg-accent text-accent-foreground", mobile: false },
];

const PATH_D =
  "M -40 720 C 200 500, 380 840, 560 540 S 900 150, 1080 430 S 1300 780, 1500 360";

const Hero = () => {
  const rootRef = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Typewriter cycling through roles
  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  // Motion: intro reveal, then (desktop) a pinned scene driven by scroll.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let cancelled = false;
    let mm: gsap.MatchMedia | undefined;

    const start = () => {
      if (cancelled) return;

      const q = gsap.utils.selector(root);
      const hold = root.querySelector<HTMLElement>("[data-hold]");
      const path = root.querySelector<SVGPathElement>("[data-path]");
      const chip = root.querySelector<SVGGElement>("[data-chip]");
      const lineOne = root.querySelector<HTMLElement>("[data-l1]");
      const lineTwo = root.querySelector<HTMLElement>("[data-l2]");
      const portrait = root.querySelector<HTMLElement>("[data-portrait]");
      const hint = root.querySelector<HTMLElement>("[data-hint]");
      if (!hold || !path || !chip || !lineOne || !lineTwo) return;

      const motionPath = (from: number, to: number) => ({
        path,
        align: path,
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
        start: from,
        end: to,
      });

      mm = gsap.matchMedia();
      mm.add(
        {
          reduce: MQ.reduce,
          desktop: `${MQ.motion} and ${MQ.desktop}`,
          mobile: `${MQ.motion} and ${MQ.mobile}`,
        },
        (ctx) => {
          const { reduce, desktop } = ctx.conditions as { reduce: boolean; desktop: boolean };

          // Reduced motion: everything visible and still.
          if (reduce) {
            gsap.set(hold, { autoAlpha: 1 });
            gsap.set(path, { drawSVG: "0% 100%" });
            gsap.set(chip, { opacity: 1, motionPath: motionPath(1, 1) });
            return;
          }

          const split = new SplitText([lineOne, lineTwo], { type: "chars" });
          const lines = [lineOne, lineTwo];

          // Intro (runs on desktop and mobile)
          const intro = gsap.timeline({
            defaults: { ease: "power4.out" },
            onComplete: () => {
              gsap.set(lines, { overflow: "visible" });
            },
          });
          intro
            .from(split.chars, { yPercent: 115, duration: 1, stagger: 0.03 }, 0)
            .from(q("[data-fade]"), { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 0.4)
            .from(q("[data-pop]"), { scale: 0, duration: 0.7, ease: "back.out(2)", stagger: 0.1 }, 0.7);
          gsap.set(hold, { autoAlpha: 1 });

          if (desktop) {
            gsap.set(chip, { opacity: 0, motionPath: motionPath(0, 0) });
            intro.to(chip, { opacity: 1, duration: 0.4 }, 0.9);

            const stretch = split.chars.filter((c) => c.textContent === "U" || c.textContent === "O");
            const stickers = q("[data-sticker]");

            const tl = gsap.timeline({
              defaults: { ease: "none", duration: 1 },
              scrollTrigger: {
                trigger: root,
                start: "top top",
                end: () => `+=${Math.round(window.innerHeight * 1.1)}`,
                pin: true,
                scrub: 0.6,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            tl.fromTo(path, { drawSVG: "0% 6%" }, { drawSVG: "0% 100%" }, 0)
              .to(chip, { motionPath: motionPath(0, 1) }, 0)
              .to(lineOne, { xPercent: -5 }, 0)
              .to(lineTwo, { xPercent: 5 }, 0)
              .to(stretch, { scaleX: 1.35 }, 0)
              .to(portrait, { scale: 0.82, yPercent: -8, rotate: 6 }, 0);

            stickers.forEach((el) => {
              const depth = Number((el as HTMLElement).dataset.depth || 1);
              const rot = Number((el as HTMLElement).dataset.rot || 0);
              tl.to(el, { y: -depth * 140, rotation: `+=${rot}` }, 0);
            });

            if (hint) tl.to(hint, { opacity: 0, duration: 0.15 }, 0);
          } else {
            // Mobile: no pinning. The line simply draws in once.
            gsap.fromTo(
              path,
              { drawSVG: "0% 0%" },
              { drawSVG: "0% 100%", duration: 1.8, ease: "power2.inOut", delay: 0.4 }
            );
          }

          return () => {
            split.revert();
          };
        }
      );
    };

    // Wait for fonts so SplitText measures the real letters.
    document.fonts.ready.then(start);

    return () => {
      cancelled = true;
      mm?.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-screen flex-col overflow-hidden md:h-[100svh] md:min-h-[640px]"
    >
      <ParticleCanvas />

      {/* Ambient orbs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-primary/15 blur-[120px] float-y pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] float-y orb-delay pointer-events-none" />

      {/* The line that draws itself, with a chip riding the tip */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path
          data-path
          d={PATH_D}
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          opacity={0.85}
        />
        <g data-chip style={{ opacity: 0 }}>
          <rect x={-14} y={-14} width={28} height={28} rx={6} fill="hsl(var(--accent))" />
          <rect x={-7} y={-7} width={14} height={14} rx={3} fill="hsl(var(--background))" />
          <path
            d="M -14 -6 h -6 M -14 6 h -6 M 14 -6 h 6 M 14 6 h 6"
            stroke="hsl(var(--accent))"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        </g>
      </svg>

      {/* Stickers */}
      {STICKERS.map((s) => (
        <div
          key={s.label}
          data-sticker
          data-depth={s.depth}
          data-rot={s.rot}
          className={`pointer-events-none absolute z-20 ${s.pos} ${s.mobile ? "" : "hidden md:block"}`}
          style={{ transform: `rotate(${s.tilt}deg)` }}
        >
          <span
            data-pop
            className={`inline-block rounded-full px-4 py-2 font-exo text-[10px] uppercase tracking-[0.18em] shadow-lg md:text-xs ${s.tone}`}
          >
            {s.label}
          </span>
        </div>
      ))}

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between gap-10 px-6 pb-10 pt-28">
        <p data-fade className="font-exo text-xs uppercase tracking-[0.35em] text-accent">
          Daniel Adeogun
        </p>

        <div data-hold className="hero-hold">
          <h1 className="hero-headline font-display text-[clamp(2.2rem,9.4vw,11rem)] font-extrabold uppercase leading-[0.88] text-foreground">
            <span data-l1 className="hl-line">I build</span>
            <span data-l2 className="hl-line">
              things <span className="text-primary">that move.</span>
            </span>
          </h1>
        </div>

        <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <div data-fade className="mb-4 h-7 font-exo text-base text-muted-foreground md:text-lg">
              <span>{displayed}</span>
              <span className="type-caret">|</span>
            </div>

            <p data-fade className="mb-6 max-w-md font-body text-sm leading-relaxed text-muted-foreground md:text-base">
              Mechatronics student by day, builder by night. I ship AI tools, web platforms, and
              robotics projects out of Nigeria, under the Zion Robotics banner.
            </p>

            <div data-fade className="flex flex-wrap gap-3">
              <Link
                to="/portfolio"
                className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm btn-glow btn-sheen magnetic-btn"
              >
                View Projects
              </Link>
              <Link
                to="/about"
                className="px-6 py-3 rounded-lg border border-border text-foreground font-body font-semibold text-sm hover:border-accent hover:text-accent transition-colors"
              >
                About Me
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-lg border border-accent/40 text-accent font-body font-semibold text-sm btn-ghost-glow btn-sheen magnetic-btn"
              >
                Contact
              </Link>
            </div>
          </div>

          <div data-fade data-portrait className="relative flex justify-start md:justify-end">
            <div className="relative">
              <div className="absolute -inset-3 rounded-full border border-accent/20 spin-slow" />
              <div className="absolute -inset-6 rounded-full border border-primary/10 spin-slow-reverse" />
              <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-accent/30 glow-frame md:h-44 md:w-44 lg:h-56 lg:w-56">
                <img src={zionLogo} alt="Daniel, Zion Robotics" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div data-hint className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 scroll-indicator md:block">
        <svg className="h-5 w-5 text-accent/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
