import { useEffect } from "react";

interface Props {
  src: string;
  alt: string;
  onClose: () => void;
}

const BadgeLightbox = ({ src, alt, onClose }: Props) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[300] overflow-y-auto"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-background/90 backdrop-blur-md" />

      {/* Scrollable container */}
      <div className="relative min-h-full flex flex-col items-center justify-start py-16 px-4">

        {/* Close button — always visible, top right */}
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="fixed top-4 right-4 z-[310] w-10 h-10 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:border-accent transition-all duration-200 flex items-center justify-center text-xl leading-none shadow-lg"
          aria-label="Close"
        >
          ×
        </button>

        {/* Hint */}
        <p className="relative z-10 font-body text-xs text-muted-foreground mb-4 text-center">
          Press <kbd className="px-1.5 py-0.5 rounded border border-border font-mono text-[10px]">Esc</kbd> or click outside to close
        </p>

        {/* Badge image — stops click propagation so clicking image doesn't close */}
        <div
          className="relative z-10 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Bottom close button for tall images on small screens */}
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="relative z-10 mt-6 px-6 py-2.5 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:border-accent font-body text-sm transition-all duration-200"
        >
          Close
        </button>

      </div>
    </div>
  );
};

export default BadgeLightbox;
