import type Lenis from "lenis";

// Shared handle so other components (like ScrollToTop) can reach the smooth scroller.
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export const getLenis = () => instance;
