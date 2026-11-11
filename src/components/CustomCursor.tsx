import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, [data-cursor]";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Only for real mouse devices. Touch gets no custom cursor at all.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.05, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.05, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: reduce ? 0 : 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: reduce ? 0 : 0.45, ease: "power3" });

    let shown = false;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!shown) {
        shown = true;
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
        gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const hit = !!target?.closest?.(INTERACTIVE);
      ring.classList.toggle("is-active", hit);
      dot.classList.toggle("is-active", hit);
    };

    const onLeave = () => {
      shown = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    const onDown = () => ring.classList.add("is-down");
    const onUp = () => ring.classList.remove("is-down");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf([dot, ring]);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
};

export default CustomCursor;
