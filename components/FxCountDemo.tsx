"use client";

import { useEffect, useRef, useState } from "react";

const USD_TARGET = 500;
const TRY_TARGET = 20410;
const DURATION_MS = 1400;

type Phase = "idle" | "counting" | "done";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function formatTry(n: number) {
  const fixed = n.toFixed(2);
  const [whole, frac] = fixed.split(".");
  const withDots = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${withDots},${frac} ₺`;
}

export default function FxCountDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [usd, setUsd] = useState(0);
  const [tryAmount, setTryAmount] = useState(0);
  const reduced = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const runningRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function showFinal() {
    setUsd(USD_TARGET);
    setTryAmount(TRY_TARGET);
    setPhase("done");
    runningRef.current = false;
  }

  function start() {
    startedRef.current = true;
    if (reduced.current) {
      showFinal();
      return;
    }
    if (runningRef.current) return;
    runningRef.current = true;

    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);

    setUsd(0);
    setTryAmount(0);
    setPhase("counting");

    const t0 = performance.now();

    function tick(now: number) {
      const t = Math.min(1, (now - t0) / DURATION_MS);
      const e = easeOutCubic(t);
      setUsd(Math.round(USD_TARGET * e));
      setTryAmount(TRY_TARGET * e);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        showFinal();
        rafRef.current = null;
      }
    }

    rafRef.current = requestAnimationFrame(tick);
  }

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        start();
      },
      { threshold: 0.45 },
    );

    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- observe once on mount
  }, []);

  function onHover() {
    if (phase === "done" || phase === "idle") start();
  }

  const displayUsd = phase === "idle" ? 0 : usd;
  const displayTry = phase === "idle" ? 0 : tryAmount;

  return (
    <div ref={rootRef} className="flex h-full flex-col" onMouseEnter={onHover}>
      <div className="p-7 pb-6">
        <h3 className="text-lg font-bold tracking-tight">Dövizli fatura, güncel kurla</h3>
        <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
          “500 dolarlık fatura kes” de; finla günün kurunu çeker, TL karşılığını hesaplar, faturaya
          işler.
        </p>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-2 px-7 pb-7 text-sm font-semibold tabular-nums">
        <span className="shrink-0 whitespace-nowrap rounded-xl border border-line bg-paper px-3.5 py-2">
          ${displayUsd}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className="shrink-0 text-faint"
        >
          <path
            d="M5 12h14m0 0l-5-5m5 5l-5 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="shrink-0 whitespace-nowrap rounded-xl border border-line bg-paper px-3.5 py-2">
          {formatTry(displayTry)}
        </span>
        <span className="whitespace-nowrap rounded-full bg-surface px-2.5 py-1 text-[10.5px] font-medium text-muted">
          güncel kur
        </span>
      </div>
    </div>
  );
}
