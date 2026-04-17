import { CSSProperties } from "react";

interface Props {
  text: string;
  className?: string;
  delay?: number;
  step?: number;
}

const AnimatedLetters = ({ text, className = "", delay = 0, step = 0.05 }: Props) => (
  <span className={className} aria-label={text}>
    {text.split("").map((ch, i) => (
      <span
        key={i}
        className="letter-anim"
        style={{ animationDelay: `${delay + i * step}s` } as CSSProperties}
      >
        {ch === " " ? "\u00A0" : ch}
      </span>
    ))}
  </span>
);

export default AnimatedLetters;
