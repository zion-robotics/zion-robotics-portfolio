import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Use these with gsap.matchMedia() so every animation has a safe branch.
export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 768px)",
  mobile: "(max-width: 767px)",
  fine: "(hover: hover) and (pointer: fine)",
};

export { gsap, ScrollTrigger, useGSAP };
