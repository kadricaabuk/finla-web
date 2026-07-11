"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "focus" | "open" | "hold";

const SUGGESTIONS = [
  { icon: "doc" as const, text: "Yılmaz İnşaat'a 10.000 TL + KDV fatura kes" },
  { icon: "box" as const, text: "Bu ay kestiğim faturaları göster" },
  { icon: "mail" as const, text: "Gelen son faturaları listele" },
  { icon: "download" as const, text: "Geçen ayın faturalarını Excel'e dök" },
];

const PHASE_MS: Record<Phase, number> = {
  idle: 1800,
  focus: 500,
  open: 2800,
  hold: 3200,
};

const ORDER: Phase[] = ["idle", "focus", "open", "hold"];

function SuggestIcon({ kind }: { kind: (typeof SUGGESTIONS)[number]["icon"] }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8E7F0] text-[#5B5A78]">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        {kind === "doc" && (
          <>
            <path
              d="M7 3.5h7.5L18.5 8v12.5H7V3.5z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
            <path d="M14.5 3.5V8H18.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
            <path d="M10 12h5M10 15.5h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </>
        )}
        {kind === "box" && (
          <>
            <path
              d="M4 8.5L12 4l8 4.5v9.5l-8 4.5-8-4.5V8.5z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
            <path d="M4 8.5l8 4.5 8-4.5M12 13v9" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          </>
        )}
        {kind === "mail" && (
          <path
            d="M4 7h16v11H4V7zm0 0l8 6 8-6"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        )}
        {kind === "download" && (
          <>
            <path
              d="M4 14v4.5A1.5 1.5 0 005.5 20h13a1.5 1.5 0 001.5-1.5V14"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            <path
              d="M12 4v11m0 0l-4-4m4 4l4-4"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
      </svg>
    </span>
  );
}

const KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "Ğ", "Ü"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ş", "İ"],
  ["⇧", "Z", "X", "C", "V", "B", "N", "M", "Ö", "Ç", "⌫"],
];

export default function SuggestDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
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

  const showSuggestions = phase === "open" || phase === "hold";
  const showKeyboard = phase === "open" || phase === "hold";
  const focused = phase !== "idle";

  return (
    <div
      aria-label="finla sohbet demosu: öneriler ve klavye"
      className="relative mx-auto w-full max-w-[280px] select-none overflow-hidden rounded-[2.5rem] border border-black/70 bg-ink p-[9px] shadow-[0_35px_60px_-20px_rgba(10,10,10,0.35)]"
    >
      <div className="relative flex h-[560px] flex-col overflow-hidden rounded-[2rem] bg-white">
        <div className="relative flex items-center justify-between px-6 pb-0.5 pt-3 text-[11px] font-semibold">
          <span>13:50</span>
          <span className="absolute left-1/2 top-2 h-[20px] w-[74px] -translate-x-1/2 rounded-full bg-ink" />
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

        <div className="flex items-center justify-between px-4 pb-3 pt-2">
          <span aria-hidden className="space-y-[3px]">
            <span className="block h-[1.5px] w-3.5 rounded bg-ink" />
            <span className="block h-[1.5px] w-3.5 rounded bg-ink" />
            <span className="block h-[1.5px] w-3.5 rounded bg-ink" />
          </span>
          <span className="text-[15px] font-extrabold tracking-[-0.03em]">finla</span>
          <span className="w-3.5" />
        </div>

        {/* suggestions sit just above the input (not pinned to header) */}
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
              <p className="max-w-[180px] text-center text-[12px] leading-relaxed text-faint">
                finla&apos;ya yazarak başla
              </p>
            </div>
          )}

          <div className="shrink-0 pb-2.5">
            <div
              className={`flex min-h-[42px] items-center rounded-full bg-[#F2F2F4] px-4 text-[13px] ${
                focused ? "ring-1 ring-[#007AFF]/30" : ""
              }`}
            >
              {focused ? (
                <span className="inline-block h-4 w-[2px] animate-blink bg-[#007AFF]" />
              ) : (
                <span className="text-[#AEAEB2]">finla&apos;ya yaz</span>
              )}
            </div>
          </div>
        </div>

        <div
          className={`shrink-0 overflow-hidden bg-[#D1D3D9] transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
            showKeyboard ? "max-h-[220px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-1.5 px-1.5 pb-2 pt-1.5">
            {KEYS.map((row) => (
              <div key={row[0]} className="flex justify-center gap-[3px]">
                {row.map((k) => (
                  <span
                    key={k}
                    className={`flex h-7 items-center justify-center rounded-[5px] bg-white text-[10px] font-medium text-ink shadow-sm ${
                      k === "⇧" || k === "⌫" ? "w-8" : "w-[18px]"
                    }`}
                  >
                    {k}
                  </span>
                ))}
              </div>
            ))}
            <div className="flex justify-center gap-[3px]">
              <span className="flex h-7 w-10 items-center justify-center rounded-[5px] bg-[#ADB1B9] text-[9px] font-semibold">
                123
              </span>
              <span className="flex h-7 flex-1 items-center justify-center rounded-[5px] bg-white text-[9px] text-muted shadow-sm">
                TR EN
              </span>
              <span className="flex h-7 w-10 items-center justify-center rounded-[5px] bg-[#007AFF] text-[9px] font-semibold text-white">
                ↵
              </span>
            </div>
          </div>
          <span className="mx-auto mb-1.5 block h-1 w-24 rounded-full bg-ink/70" aria-hidden />
        </div>
      </div>
    </div>
  );
}
