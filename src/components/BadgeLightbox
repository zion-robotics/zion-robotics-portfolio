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
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/95 backdrop-blur-md" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:border-accent transition-colors flex items-center justify-center text-xl leading-none"
      >
        ×
      </button>

      {/* Badge image */}
      <div
        className="relative z-10 max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-contain"
        />
      </div>

      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-body text-xs text-muted-foreground z-10">
        Click outside or press Esc to close
      </p>
    </div>
  );
};

export default BadgeLightbox;
