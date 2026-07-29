import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import zionLogo from "@/assets/zion-logo.png";
import { useTheme, Theme } from "@/hooks/useTheme";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/portfolio", label: "Portfolio" },
  { path: "/contact", label: "Contact" },
];

const themes: { value: Theme; label: string; icon: string }[] = [
  { value: "light", label: "Light", icon: "☀️" },
  { value: "dark",  label: "Dark",  icon: "🌙" },
  { value: "blue",  label: "Blue",  icon: "🌊" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setThemeOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!themeOpen) return;
    const close = (e: MouseEvent) => {
      if (!(e.target as Element).closest("#theme-toggle")) setThemeOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [themeOpen]);

  const current = themes.find((t) => t.value === theme)!;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled ? "nav-frosted" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-orbitron font-bold text-lg tracking-wider text-foreground">
            <img src={zionLogo} alt="Zion Robotics" className="w-8 h-8 rounded-full object-cover" />
            Zion Robotics
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className={`font-body text-sm tracking-wide transition-colors relative ${
                  location.pathname === l.path ? "nav-active text-accent" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}

            {/* Theme toggle */}
            <div id="theme-toggle" className="relative">
              <button
                onClick={() => setThemeOpen(!themeOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground hover:border-accent transition-all duration-200"
                aria-label="Toggle theme"
              >
                <span>{current.icon}</span>
                <span className="font-body">{current.label}</span>
                <svg className={`w-3 h-3 transition-transform duration-200 ${themeOpen ? "rotate-180" : ""}`} viewBox="0 0 12 12" fill="none">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {themeOpen && (
                <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-xl overflow-hidden shadow-lg min-w-[120px] z-[200]">
                  {themes.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => { setTheme(t.value); setThemeOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-body transition-colors hover:bg-muted ${
                        theme === t.value ? "text-accent" : "text-muted-foreground"
                      }`}
                    >
                      <span>{t.icon}</span>
                      <span>{t.label}</span>
                      {theme === t.value && <span className="ml-auto text-accent">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile theme button (icon only) */}
            <button
              onClick={() => {
                const next = theme === "dark" ? "light" : theme === "light" ? "blue" : "dark";
                setTheme(next);
              }}
              className="p-1.5 text-lg"
              aria-label="Switch theme"
            >
              {current.icon}
            </button>

            {/* Hamburger */}
            <button
              className="flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-foreground transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-foreground transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-foreground transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[99] bg-background/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`font-orbitron text-2xl tracking-widest transition-colors ${
                location.pathname === l.path ? "text-accent" : "text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}

          {/* Mobile theme switcher in menu */}
          <div className="flex gap-3 mt-4">
            {themes.map((t) => (
              <button
                key={t.value}
                onClick={() => setTheme(t.value)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-body transition-all ${
                  theme === t.value
                    ? "border-accent text-accent bg-accent/10"
                    : "border-border text-muted-foreground"
                }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
