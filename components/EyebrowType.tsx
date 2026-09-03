"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: string;
  dark?: boolean;
  className?: string;
};

/**
 * Scroll-triggered typewriter for section eyebrows, styled as an actual chip
 * (border, pill, colored glyph) matching ChatDemo's real tool-call chips
 * instead of plain gray label text — same character-by-character reveal
 * ChatDemo uses for its chat bubbles, bound to scroll position instead of a
 * timer. The page narrates each section the way finla narrates its own tool
 * calls, and now looks like it, not just reads like it.
 */
export default function EyebrowType({ children, dark = false, className = "" }: Props) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  const glyph = children.slice(0, 1); // "→" or "✓"
  const label = children.slice(2); // drop glyph + the space after it
  const typedLabel = typed.slice(2);
  const isDoneGlyph = glyph === "✓";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setTyped(children);
      setDone(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        let i = 0;
        const timer = setInterval(() => {
          i += 1;
          setTyped(children.slice(0, i));
          if (i >= children.length) {
            clearInterval(timer);
            setDone(true);
          }
        }, 22);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [children]);

  return (
    <p
      ref={ref}
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[11px] font-medium tracking-[0.01em] ${
        dark ? "border-line-dark bg-white/[0.04] text-white/70" : "border-line bg-white text-muted shadow-sm"
      } ${className}`}
    >
      <span
        aria-hidden
        className={isDoneGlyph ? "text-signal-bright" : dark ? "text-white/35" : "text-faint"}
      >
        {glyph}
      </span>
      <span aria-hidden>
        {typedLabel}
        <span
          className={`ml-px inline-block w-[6px] ${done ? "opacity-0" : "animate-blink"}`}
        >
          ▌
        </span>
      </span>
      <span className="sr-only">{children}</span>
    </p>
  );
}
