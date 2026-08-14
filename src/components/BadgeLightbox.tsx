import { useEffect, useRef } from "react";

interface Props {
  src: string;
  alt: string;
  onClose: () => void;
}

const BadgeLightbox = ({ src, alt, onClose }: Props) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Close on Escape
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);

    // Lock background scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Auto-scroll image into center view after render
    const t = setTimeout(() => {
      imgRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    }, 80);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [onClose]);

  return (
    <>
      {/* Backdrop — clicking closes */}
      <div
        className="fixed inset-0 z-[300] bg-background/90 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Scrollable layer — sits above backdrop, does NOT block clicks on backdrop */}
      <div
        className="fixed inset-0 z-[301] overflow-y-auto overflow-x-hidden pointer-events-none"
      >
        <div className="min-h-full flex flex-col items-center justify-center py-20 px-4 pointer-events-none">

          {/* Image card — re-enables pointer events only here */}
          <div
            className="pointer-events-auto w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              ref={imgRef}
              src={src}
              alt={alt}
              className="w-full h-auto object-contain block"
            />
          </div>

          {/* Bottom close button */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="pointer-events-auto mt-6 px-8 py-2.5 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:border-accent font-body text-sm transition-all duration-200 shadow-lg"
          >
            Close
          </button>

        </div>
      </div>

      {/* X button — fixed top right, always on top */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-[302] w-10 h-10 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:border-accent transition-all duration-200 flex items-center justify-center shadow-lg text-xl leading-none"
        aria-label="Close"
      >
        ×
      </button>
    </>
  );
};

export default BadgeLightbox;
