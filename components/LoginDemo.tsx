"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "phone" | "pin" | "hold";

const PHONE = "532 421 08 16";
const PIN = "258149";

const PHASE_MS: Record<Phase, number> = {
  idle: 1200,
  phone: 2200,
  pin: 1800,
  hold: 2800,
};

const ORDER: Phase[] = ["idle", "phone", "pin", "hold"];

export default function LoginDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [phoneTyped, setPhoneTyped] = useState("");
  const [pinLen, setPinLen] = useState(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (reduced.current) {
      setPhoneTyped(PHONE);
      setPinLen(6);
      setPhase("hold");
      return;
    }

    if (phase === "idle") {
      setPhoneTyped("");
      setPinLen(0);
      const t = setTimeout(() => setPhase("phone"), PHASE_MS.idle);
      return () => clearTimeout(t);
    }

    if (phase === "phone") {
      if (phoneTyped.length < PHONE.length) {
        const t = setTimeout(
          () => setPhoneTyped(PHONE.slice(0, phoneTyped.length + 1)),
          70,
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("pin"), 400);
      return () => clearTimeout(t);
    }

    if (phase === "pin") {
      if (pinLen < 6) {
        const t = setTimeout(() => setPinLen((n) => n + 1), 220);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("hold"), 350);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setPhase("idle"), PHASE_MS.hold);
    return () => clearTimeout(t);
  }, [phase, phoneTyped, pinLen]);

  return (
    <div
      aria-label="finla giriş demosu: telefon ve PIN girişi"
      className="relative mx-auto w-full max-w-[280px] select-none overflow-hidden rounded-[2.5rem] border border-black/70 bg-ink p-[9px] shadow-[0_35px_60px_-20px_rgba(10,10,10,0.35)]"
    >
      <div className="relative flex h-[560px] flex-col overflow-hidden rounded-[2rem] bg-ink">
        <div className="relative flex items-center justify-between px-6 pb-0.5 pt-3 text-[11px] font-semibold text-white">
          <span>13:51</span>
          <span className="absolute left-1/2 top-2 h-[20px] w-[74px] -translate-x-1/2 rounded-full bg-black" />
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

        <div className="px-5 pb-5 pt-4 text-white">
          <p className="text-[15px] font-extrabold tracking-[-0.03em]">finla</p>
          <h3 className="mt-5 text-[26px] font-bold tracking-tight">Giriş yap</h3>
          <p className="mt-1.5 text-[12px] leading-relaxed text-white/55">
            Telefon numaran ve 6 haneli PIN&apos;in ile giriş yap.
          </p>
        </div>

        <div className="flex flex-1 flex-col rounded-t-[1.75rem] bg-white px-5 pb-6 pt-6">
          <label className="text-[12px] font-medium text-muted">Telefon</label>
          <div className="mt-1.5 flex items-center gap-2 rounded-xl bg-surface px-3.5 py-3">
            <span className="text-[13px] font-bold">+90</span>
            <span className="text-[13px] tabular-nums tracking-wide">
              {phoneTyped || (
                <span className="text-faint">5XX XXX XX XX</span>
              )}
              {phase === "phone" && phoneTyped.length < PHONE.length && (
                <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-[2px] animate-blink bg-ink" />
              )}
            </span>
          </div>

          <label className="mt-5 text-[12px] font-medium text-muted">PIN</label>
          <div className="mt-1.5 flex gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className={`flex h-10 flex-1 items-center justify-center rounded-xl bg-surface text-[15px] font-bold transition-all duration-200 ${
                  i < pinLen ? "scale-105 ring-1 ring-ink/10" : ""
                }`}
              >
                {i < pinLen ? "•" : ""}
              </span>
            ))}
          </div>

          <div
            className={`mt-7 flex items-center justify-center rounded-2xl bg-ink py-3.5 text-[14px] font-semibold text-white transition-transform duration-300 ${
              phase === "hold" ? "scale-[1.02]" : ""
            }`}
          >
            Giriş Yap
          </div>

          <p className="mt-5 text-center text-[12px] text-muted">
            Hesabın yok mu? <span className="font-bold text-ink">Kayıt ol</span>
          </p>
        </div>
      </div>
    </div>
  );
}
