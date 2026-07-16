"use client";

import { useEffect, useRef, useState } from "react";

const USER_MSG = "Acme Ltd'ye 25.000 TL + KDV danışmanlık faturası kes";
const REPLY_MSG = "e-Fatura · 30.000,00 ₺";

type Phase =
  | "idle"
  | "userTyping"
  | "userDone"
  | "replyIn"
  | "replyTyping"
  | "loading"
  | "done";

const USER_CHAR_MS = 14;
const REPLY_CHAR_MS = 28;
const USER_HOLD_MS = 400;
const REPLY_IN_MS = 280;
const LOADING_MS = 1000;

export default function InvoiceChatDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [userTyped, setUserTyped] = useState("");
  const [replyTyped, setReplyTyped] = useState("");
  const [playId, setPlayId] = useState(0);
  const reduced = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const runningRef = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  function showFinal() {
    setUserTyped(USER_MSG);
    setReplyTyped(REPLY_MSG);
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
    setUserTyped("");
    setReplyTyped("");
    setPhase("userTyping");
    setPlayId((p) => p + 1);
  }

  // Autostart once when scrolled into view
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

  // Phase machine
  useEffect(() => {
    if (phase === "idle" || phase === "done") return;

    let timer: ReturnType<typeof setTimeout>;

    if (phase === "userTyping") {
      if (userTyped.length < USER_MSG.length) {
        timer = setTimeout(
          () => setUserTyped(USER_MSG.slice(0, userTyped.length + 1)),
          USER_CHAR_MS,
        );
      } else {
        timer = setTimeout(() => setPhase("userDone"), USER_HOLD_MS);
      }
    } else if (phase === "userDone") {
      timer = setTimeout(() => setPhase("replyIn"), 80);
    } else if (phase === "replyIn") {
      timer = setTimeout(() => setPhase("replyTyping"), REPLY_IN_MS);
    } else if (phase === "replyTyping") {
      if (replyTyped.length < REPLY_MSG.length) {
        timer = setTimeout(
          () => setReplyTyped(REPLY_MSG.slice(0, replyTyped.length + 1)),
          REPLY_CHAR_MS,
        );
      } else {
        timer = setTimeout(() => setPhase("loading"), 120);
      }
    } else if (phase === "loading") {
      timer = setTimeout(() => {
        setPhase("done");
        runningRef.current = false;
      }, LOADING_MS);
    }

    return () => clearTimeout(timer);
  }, [phase, userTyped, replyTyped, playId]);

  function onHover() {
    if (phase === "done" || phase === "idle") start();
  }

  const showUser = phase !== "idle";
  const showReply =
    phase === "replyIn" ||
    phase === "replyTyping" ||
    phase === "loading" ||
    phase === "done";
  const showSpinner = phase === "loading";
  const showBadge = phase === "done";

  return (
    <div ref={rootRef} className="flex h-full flex-col" onMouseEnter={onHover}>
      <div className="p-7 pb-6">
        <h3 className="text-lg font-bold tracking-tight">Sohbetle e-Fatura & e-Arşiv kes</h3>
        <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
          Alıcı, tutar, vergi — hepsini tek cümleden çıkarır, onayınla GİB&apos;e iletir. Fatura
          tipini (e-Fatura / e-Arşiv) alıcının mükellefiyetine göre kendi seçer.
        </p>
      </div>

      <div className="relative mt-auto flex min-h-[7.5rem] flex-col justify-end gap-2.5 px-7 pb-7">
        {showUser && (
          <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-[13px] text-white">
            {userTyped}
            {phase === "userTyping" && (
              <span className="ml-0.5 inline-block h-3.5 w-[2px] animate-blink bg-white align-middle" />
            )}
          </div>
        )}

        {showReply && (
          <div className="mr-auto flex w-full max-w-[75%] animate-rise items-center justify-between gap-3 rounded-2xl rounded-bl-md border border-line bg-paper px-4 py-3 text-[13px]">
            <span className="min-w-0 font-semibold">
              {replyTyped}
              {phase === "replyTyping" && (
                <span className="ml-0.5 inline-block h-3.5 w-[2px] animate-blink bg-ink align-middle" />
              )}
            </span>
            {showSpinner && (
              <span
                aria-hidden
                className="h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-[1.5px] border-line border-t-ink"
              />
            )}
            {showBadge && (
              <span className="shrink-0 animate-pop rounded-full bg-green-soft px-2.5 py-0.5 text-[11px] font-semibold text-green-dark">
                GİB&apos;e iletildi
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
