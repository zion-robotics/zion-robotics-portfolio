import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/lenis";

const SmoothScroll = () => {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

    // Reduced motion and touch devices keep native scrolling (smoothest on phones).
    if (reduce || touch) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      // Let modals and lightboxes scroll on their own.
      prevent: (node) => !!node.closest('[role="dialog"], [data-lenis-prevent]'),
    });
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
};

export default SmoothScroll;
