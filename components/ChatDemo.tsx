"use client";

import { useEffect, useRef, useState } from "react";

type Scene = {
  command: string;
  tool: string;
  reply: {
    title: string;
    rows: [string, string][];
    badge: string;
    badgeTone: "green" | "amber";
  };
};

const SCENES: Scene[] = [
  {
    command: "Yılmaz İnşaat'a 10.000 TL + KDV fatura kes",
    tool: "create_invoice",
    reply: {
      title: "e-Arşiv Fatura oluşturuldu",
      rows: [
        ["Alıcı", "Yılmaz İnşaat"],
        ["Matrah", "10.000,00 ₺"],
        ["KDV (%20)", "2.000,00 ₺"],
        ["Toplam", "12.000,00 ₺"],
      ],
      badge: "GİB'e iletildi",
      badgeTone: "green",
    },
  },
  {
    command: "Bu ay kestiğim faturaları göster",
    tool: "invoice_totals",
    reply: {
      title: "Temmuz 2026 — Giden Faturalar",
      rows: [
        ["Kesilen", "14 fatura"],
        ["Toplam", "186.400,00 ₺"],
        ["Kabul edilen", "11"],
        ["Yanıt bekleyen", "3"],
      ],
      badge: "Özet hazır",
      badgeTone: "green",
    },
  },
  {
    command: "Gelen son faturayı kabul et",
    tool: "invoice_inbox_action",
    reply: {
      title: "Gelen fatura yanıtlandı",
      rows: [
        ["Gönderici", "Aksa Enerji A.Ş."],
        ["Tutar", "3.240,00 ₺"],
        ["Belge no", "AKS2026000001874"],
        ["Durum", "Kabul edildi"],
      ],
      badge: "Yanıt iletildi",
      badgeTone: "green",
    },
  },
  {
    command: "Geçen ayın faturalarını Excel'e dök",
    tool: "excel_export",
    reply: {
      title: "haziran-faturalar.xlsx",
      rows: [
        ["Dönem", "Haziran 2026"],
        ["Satır", "42 fatura"],
        ["Boyut", "38 KB"],
        ["Paylaşım", "Hazır"],
      ],
      badge: "İndirmeye hazır",
      badgeTone: "amber",
    },
  },
];

type Phase = "typing" | "sent" | "thinking" | "tool" | "reply";

export default function ChatDemo() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const scene = SCENES[sceneIdx];
    let timer: ReturnType<typeof setTimeout>;

    const next = () => {
      setSceneIdx((i) => (i + 1) % SCENES.length);
      setPhase("typing");
      setTyped("");
    };

    if (reduced.current) {
      setTyped(scene.command);
      setPhase("reply");
      timer = setTimeout(next, 6000);
      return () => clearTimeout(timer);
    }

    if (phase === "typing") {
      if (typed.length < scene.command.length) {
        timer = setTimeout(() => setTyped(scene.command.slice(0, typed.length + 1)), 30);
      } else {
        timer = setTimeout(() => setPhase("sent"), 350);
      }
    } else if (phase === "sent") {
      timer = setTimeout(() => setPhase("thinking"), 420);
    } else if (phase === "thinking") {
      timer = setTimeout(() => setPhase("tool"), 950);
    } else if (phase === "tool") {
      timer = setTimeout(() => setPhase("reply"), 1000);
    } else {
      timer = setTimeout(next, 4300);
    }
    return () => clearTimeout(timer);
  }, [typed, phase, sceneIdx]);

  const scene = SCENES[sceneIdx];
  const showBubble = typed.length > 0 || phase !== "typing";

  return (
    <div
      aria-label="finla sohbet demosu: yazılan komut, yapay zekânın çalıştırdığı araç ve dönen fatura kartı"
      className="relative mx-auto w-full max-w-[380px] select-none"
    >
      {/* device frame */}
      <div className="rounded-[3.2rem] border border-black/60 bg-ink p-[10px] shadow-[0_60px_120px_-30px_rgba(10,10,10,0.45),0_25px_50px_-20px_rgba(10,10,10,0.3)]">
        <div className="relative overflow-hidden rounded-[2.6rem] bg-white">
          {/* status bar + island */}
          <div className="relative flex items-center justify-between px-7 pb-1 pt-3.5 text-[13px] font-semibold">
            <span>13:51</span>
            <span className="absolute left-1/2 top-2.5 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-ink" />
            <span className="flex items-center gap-1" aria-hidden>
              <svg width="15" height="11" viewBox="0 0 16 12" fill="currentColor">
                <rect x="0" y="7" width="3" height="5" rx="0.8" />
                <rect x="4.3" y="5" width="3" height="7" rx="0.8" />
                <rect x="8.6" y="2.5" width="3" height="9.5" rx="0.8" />
                <rect x="12.9" y="0" width="3" height="12" rx="0.8" />
              </svg>
              <svg width="20" height="11" viewBox="0 0 22 12" fill="none" aria-hidden>
                <rect x="0.5" y="0.5" width="18" height="11" rx="3" stroke="currentColor" opacity="0.4" />
                <rect x="2" y="2" width="13" height="8" rx="1.6" fill="currentColor" />
                <path d="M20.5 4v4a2 2 0 0 0 0-4z" fill="currentColor" opacity="0.4" />
              </svg>
            </span>
          </div>

          {/* app header */}
          <div className="flex items-center justify-between border-b border-line/70 px-5 pb-3 pt-2">
            <span aria-hidden className="space-y-[3px]">
              <span className="block h-[2px] w-4 rounded bg-ink" />
              <span className="block h-[2px] w-4 rounded bg-ink" />
              <span className="block h-[2px] w-4 rounded bg-ink" />
            </span>
            <span className="text-[17px] font-extrabold tracking-[-0.03em]">finla</span>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-bright opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-bright" />
            </span>
          </div>

          {/* conversation */}
          <div className="flex h-[430px] flex-col justify-end gap-3 bg-paper p-4">
            {/* user bubble */}
            {showBubble && (
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-[20px] rounded-br-md bg-ink px-4 py-3 text-[13.5px] leading-snug text-white">
                  {phase === "typing" ? (
                    <>
                      {typed}
                      <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-[2px] animate-blink bg-white" />
                    </>
                  ) : (
                    scene.command
                  )}
                </div>
              </div>
            )}

            {/* thinking dots */}
            {phase === "thinking" && (
              <div className="flex justify-start">
                <div className="flex animate-pop items-center gap-1.5 rounded-[20px] rounded-bl-md border border-line bg-white px-4 py-3.5">
                  <span className="dot-think h-1.5 w-1.5 rounded-full bg-ink" />
                  <span className="dot-think h-1.5 w-1.5 rounded-full bg-ink" />
                  <span className="dot-think h-1.5 w-1.5 rounded-full bg-ink" />
                </div>
              </div>
            )}

            {/* tool chip */}
            {(phase === "tool" || phase === "reply") && (
              <div className="flex justify-start">
                <div className="flex animate-pop items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 font-mono text-[11px] text-muted">
                  {phase === "tool" ? (
                    <span
                      aria-hidden
                      className="h-3 w-3 animate-spin rounded-full border-[1.5px] border-line border-t-ink"
                    />
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <circle cx="12" cy="12" r="10" fill="#22C55E" />
                      <path
                        d="M8 12.5l2.6 2.6L16 9.6"
                        stroke="#fff"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {scene.tool}
                </div>
              </div>
            )}

            {/* reply card */}
            {phase === "reply" && (
              <div className="flex justify-start">
                <div className="w-full max-w-[92%] animate-rise rounded-[20px] rounded-bl-md border border-line bg-white p-4 text-ink shadow-sm">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <p className="text-[13.5px] font-semibold tracking-tight">
                      {scene.reply.title}
                    </p>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[10.5px] font-semibold ${
                        scene.reply.badgeTone === "green"
                          ? "bg-green-soft text-green-dark"
                          : "bg-amber-soft text-amber"
                      }`}
                    >
                      {scene.reply.badge}
                    </span>
                  </div>
                  <dl>
                    {scene.reply.rows.map(([k, v], i) => (
                      <div
                        key={k}
                        className="flex animate-rise items-baseline justify-between border-b border-line/60 py-1.5 text-[12.5px] last:border-0"
                        style={{ animationDelay: `${120 + i * 110}ms` }}
                      >
                        <dt className="text-muted">{k}</dt>
                        <dd className="font-semibold tabular-nums tracking-tight">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}
          </div>

          {/* input bar */}
          <div className="border-t border-line/70 bg-white px-4 pb-6 pt-3">
            <div className="flex items-center gap-2 rounded-full bg-surface px-4 py-2.5 text-[13px] text-faint">
              finla&apos;ya yaz
              <span className="ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-ink text-white">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M12 19V5M6 11l6-6 6 6"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
            <span className="mx-auto mt-3 block h-1 w-28 rounded-full bg-ink/80" aria-hidden />
          </div>
        </div>
      </div>
    </div>
  );
}
