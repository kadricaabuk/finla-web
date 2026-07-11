"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "splash" | "scan" | "success" | "chat" | "focus" | "suggestions" | "hold";

const PHASE_MS: Record<Phase, number> = {
  splash: 1200,
  scan: 1800,
  success: 900,
  chat: 350,
  focus: 280,
  suggestions: 1600,
  hold: 1000,
};

const ORDER: Phase[] = [
  "splash",
  "scan",
  "success",
  "chat",
  "focus",
  "suggestions",
  "hold",
];

const SUGGESTIONS = [
  { icon: "doc" as const, text: "Yılmaz İnşaat'a 10.000 TL + KDV fatura kes" },
  { icon: "box" as const, text: "Bu ay kestiğim faturaları göster" },
  { icon: "mail" as const, text: "Gelen son faturaları listele" },
  { icon: "download" as const, text: "Geçen ayın faturalarını Excel'e dök" },
];

function SuggestIcon({ kind }: { kind: (typeof SUGGESTIONS)[number]["icon"] }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8E7F0] text-[#5B5A78]">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        {kind === "doc" && (
          <>
            <path d="M7 3.5h7.5L18.5 8v12.5H7V3.5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
            <path d="M14.5 3.5V8H18.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
            <path d="M10 12h5M10 15.5h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </>
        )}
        {kind === "box" && (
          <>
            <path d="M4 8.5L12 4l8 4.5v9.5l-8 4.5-8-4.5V8.5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
            <path d="M4 8.5l8 4.5 8-4.5M12 13v9" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          </>
        )}
        {kind === "mail" && (
          <path d="M4 7h16v11H4V7zm0 0l8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        )}
        {kind === "download" && (
          <>
            <path d="M4 14v4.5A1.5 1.5 0 005.5 20h13a1.5 1.5 0 001.5-1.5V14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M12 4v11m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}
      </svg>
    </span>
  );
}

function FaceScanIcon({ scanning, success }: { scanning: boolean; success: boolean }) {
  return (
    <div className="relative flex h-20 w-20 items-center justify-center">
      <span
        className={`absolute inset-0 rounded-full border-2 transition-opacity duration-500 ${
          success ? "border-green-bright/50 opacity-0" : scanning ? "border-white/40 opacity-100" : "border-white/25 opacity-100"
        }`}
      />
      <span
        className={`absolute inset-2 rounded-full border transition-opacity duration-500 ${
          success ? "opacity-0" : "border-white/20 opacity-100"
        }`}
      />

      {/* face stays mounted; check fades over it */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className={`text-white transition-opacity duration-300 ${success ? "opacity-0" : "opacity-100"}`}
      >
        <path
          d="M7 9V7.5A1.5 1.5 0 018.5 6H10M14 6h1.5A1.5 1.5 0 0117 7.5V9M17 15v1.5a1.5 1.5 0 01-1.5 1.5H14M10 18H8.5A1.5 1.5 0 017 16.5V15"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="9.5" cy="11" r="0.9" fill="currentColor" />
        <circle cx="14.5" cy="11" r="0.9" fill="currentColor" />
        <path
          d="M9.5 14.5c.7.7 1.5 1 2.5 1s1.8-.3 2.5-1"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M6 12h12"
          stroke="#22C55E"
          strokeWidth="1.6"
          strokeLinecap="round"
          className={`origin-center transition-opacity duration-300 ${scanning && !success ? "opacity-100" : "opacity-0"}`}
        />
      </svg>

      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className={`absolute transition-opacity duration-300 ${success ? "opacity-100" : "opacity-0"}`}
      >
        <circle cx="12" cy="12" r="10" fill="#22C55E" />
        <path
          d="M8 12.5l2.6 2.6L16 9.6"
          stroke="#fff"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function StatusBar({ light }: { light?: boolean }) {
  const c = light ? "text-white" : "text-ink";
  return (
    <div className={`relative z-30 flex items-center justify-between px-6 pb-0.5 pt-3 text-[11px] font-semibold ${c}`}>
      <span>13:50</span>
      <span
        className={`absolute left-1/2 top-2 h-[20px] w-[74px] -translate-x-1/2 rounded-full ${
          light ? "bg-black" : "bg-ink"
        }`}
      />
      <span className="flex items-center gap-0.5" aria-hidden>
        <svg width="12" height="9" viewBox="0 0 16 12" fill="currentColor">
          <rect x="0" y="7" width="3" height="5" rx="0.8" />
          <rect x="4.3" y="5" width="3" height="7" rx="0.8" />
          <rect x="8.6" y="2.5" width="3" height="9.5" rx="0.8" />
          <rect x="12.9" y="0" width="3" height="12" rx="0.8" />
        </svg>
        <svg width="16" height="9" viewBox="0 0 22 12" fill="none">
          <rect x="0.5" y="0.5" width="18" height="11" rx="3" stroke="currentColor" opacity="0.4" />
          <rect x="2" y="2" width="13" height="8" rx="1.6" fill="currentColor" />
          <path d="M20.5 4v4a2 2 0 0 0 0-4z" fill="currentColor" opacity="0.4" />
        </svg>
      </span>
    </div>
  );
}

export default function FaceLockDemo() {
  const [phase, setPhase] = useState<Phase>("splash");
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (reduced.current) {
      setPhase("hold");
      return;
    }
    const idx = ORDER.indexOf(phase);
    const t = setTimeout(() => setPhase(ORDER[(idx + 1) % ORDER.length]), PHASE_MS[phase]);
    return () => clearTimeout(t);
  }, [phase]);

  const onSplash = phase === "splash" || phase === "scan" || phase === "success";
  const showFace = phase === "scan" || phase === "success";
  const showChat =
    phase === "chat" || phase === "focus" || phase === "suggestions" || phase === "hold";
  const focused = phase === "focus" || phase === "suggestions" || phase === "hold";
  const showSuggestions = phase === "suggestions" || phase === "hold";

  return (
    <div
      aria-label="finla Face ID kilidi: splash, doğrulama ve sohbet"
      className="relative mx-auto h-[560px] w-[280px] select-none overflow-hidden rounded-[2.5rem] border border-black/70 bg-ink p-[9px] shadow-[0_35px_60px_-20px_rgba(10,10,10,0.35)]"
    >
      <div className="relative h-full overflow-hidden rounded-[2rem] bg-ink">
        {/* SPLASH + Face ID */}
        <div
          className={`absolute inset-0 z-20 flex flex-col bg-ink transition-opacity duration-500 ${
            onSplash ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <StatusBar light />

          <div className="relative flex-1">
            {/* logo stays pinned — never moves */}
            <p className="absolute left-1/2 top-[36%] -translate-x-1/2 -translate-y-1/2 text-[28px] font-extrabold tracking-[-0.04em] text-white">
              finla
            </p>

            {/* Face ID only fades in below logo; no layout shift */}
            <div
              className={`absolute left-1/2 top-[36%] flex w-full -translate-x-1/2 flex-col items-center pt-[52px] transition-opacity duration-500 ${
                showFace ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <FaceScanIcon scanning={phase === "scan"} success={phase === "success"} />
              <p className="mt-5 text-[13px] font-medium text-white/90">
                {phase === "success" ? "Doğrulandı" : "Face ID ile aç"}
              </p>
              <p className="mt-1.5 max-w-[190px] text-center text-[11px] leading-relaxed text-white/40">
                {phase === "success"
                  ? "Oturum cihazında güvenle açıldı."
                  : "Uygulama kilitliyken biyometrik doğrulama ister."}
              </p>
            </div>
          </div>

          <span className="mx-auto mb-2 block h-1 w-28 rounded-full bg-white/40" aria-hidden />
        </div>

        {/* CHAT after unlock */}
        <div
          className={`absolute inset-0 z-10 flex flex-col bg-white transition-opacity duration-500 ${
            showChat ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <StatusBar />

          <div className="flex items-center justify-between px-4 pb-3 pt-2">
            <span aria-hidden className="space-y-[3px]">
              <span className="block h-[1.5px] w-3.5 rounded bg-ink" />
              <span className="block h-[1.5px] w-3.5 rounded bg-ink" />
              <span className="block h-[1.5px] w-3.5 rounded bg-ink" />
            </span>
            <span className="text-[15px] font-extrabold tracking-[-0.03em]">finla</span>
            <span className="w-3.5" />
          </div>

          <div className="flex min-h-0 flex-1 flex-col justify-end px-3.5">
            {showSuggestions ? (
              <ul className="mb-3 space-y-3">
                {SUGGESTIONS.map((s, i) => (
                  <li
                    key={s.text}
                    className="flex animate-rise items-center gap-3"
                    style={{ animationDelay: `${i * 70}ms` }}
                  >
                    <SuggestIcon kind={s.icon} />
                    <span className="text-[12.5px] font-medium leading-snug tracking-tight text-ink">
                      {s.text}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mb-auto flex flex-1 items-center justify-center">
                {phase === "chat" && (
                  <p className="animate-rise max-w-[180px] text-center text-[12px] leading-relaxed text-faint">
                    finla&apos;ya yazarak başla
                  </p>
                )}
              </div>
            )}

            <div className="shrink-0 pb-5">
              <div
                className={`flex min-h-[42px] items-center rounded-full bg-[#F2F2F4] px-4 text-[13px] transition-shadow duration-300 ${
                  focused ? "ring-1 ring-[#007AFF]/30" : ""
                }`}
              >
                {focused ? (
                  <span className="inline-block h-4 w-[2px] animate-blink bg-[#007AFF]" />
                ) : (
                  <span className="text-[#AEAEB2]">finla&apos;ya yaz</span>
                )}
              </div>
              <span className="mx-auto mt-3 block h-1 w-24 rounded-full bg-ink/70" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
