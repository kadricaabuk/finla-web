"use client";

import { useEffect, useRef, useState } from "react";
import {
  CHATS,
  INBOX_SEED,
  OUTBOX,
  PROFILE,
  STATUS_CLASS,
  STATUS_LABEL,
  type InboxInvoice,
  type InvoiceStatus,
  type OutboxInvoice,
} from "./demo/mockData";

type Screen = "chat" | "outbox" | "inbox" | "profile";

type Scene = {
  chip: string;
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
    chip: "Fatura kes",
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
    chip: "Bu ayı göster",
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
    chip: "Kabul et",
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
    chip: "Excel'e dök",
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

const SCREEN_TITLE: Record<Screen, string> = {
  chat: "finla",
  outbox: "Giden Faturalar",
  inbox: "Gelen Faturalar",
  profile: "Profil",
};

const MENU_ITEMS: { key: Screen; label: string }[] = [
  { key: "chat", label: "Yeni Sohbet" },
  { key: "outbox", label: "Giden Faturalar" },
  { key: "inbox", label: "Gelen Faturalar" },
  { key: "profile", label: "Profil" },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={`text-faint transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StatusBadge({ status }: { status: InvoiceStatus }) {
  return (
    <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${STATUS_CLASS[status]}`}>
      {STATUS_LABEL[status]}
    </span>
  );
}

function MenuIcon({ kind }: { kind: Screen }) {
  return (
    <span className="flex h-5 w-5 items-center justify-center text-muted" aria-hidden>
      {kind === "chat" && (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {kind === "outbox" && (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M12 16V8m0 0l-3.5 3.5M12 8l3.5 3.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {kind === "inbox" && (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M12 8v8m0 0l3.5-3.5M12 16l-3.5-3.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {kind === "profile" && (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M5 19c1.5-3 4-4.5 7-4.5S17.5 16 19 19"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      )}
    </span>
  );
}

function Filters() {
  return (
    <div className="flex gap-1.5 px-3.5 pb-2.5 pt-3.5">
      {["Bu Ay", "Geçen Ay", "Bu Yıl"].map((f, i) => (
        <span
          key={f}
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
            i === 0 ? "bg-ink text-white" : "border border-line bg-white text-ink"
          }`}
        >
          {f}
        </span>
      ))}
    </div>
  );
}

export default function ChatDemo() {
  const [screen, setScreen] = useState<Screen>("chat");
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [inbox, setInbox] = useState<InboxInvoice[]>(INBOX_SEED);

  const [sceneIdx, setSceneIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");
  const [playId, setPlayId] = useState(0);
  const [paused, setPaused] = useState(false);
  const [nudgeMenu, setNudgeMenu] = useState(false);
  const introDone = useRef(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // After the first scene lands on reply, stop looping and nudge the menu button
  useEffect(() => {
    if (screen !== "chat" || phase !== "reply" || introDone.current) return;

    const timer = setTimeout(() => {
      introDone.current = true;
      setPaused(true);
      setNudgeMenu(true);
    }, 900);

    return () => clearTimeout(timer);
  }, [screen, phase, sceneIdx]);

  // Autoplay one scene on chat (no loop — nudge effect owns the handoff)
  useEffect(() => {
    if (screen !== "chat" || paused) return;

    const scene = SCENES[sceneIdx];
    let timer: ReturnType<typeof setTimeout>;

    if (reduced.current) {
      setTyped(scene.command);
      setPhase("reply");
      return;
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
    }
    return () => clearTimeout(timer);
  }, [screen, typed, phase, sceneIdx, playId, paused]);

  function pauseAutoplay() {
    introDone.current = true;
    setPaused(true);
    setNudgeMenu(false);
  }

  function playScene(i: number) {
    introDone.current = true;
    setNudgeMenu(false);
    setPaused(false);
    setSceneIdx(i);
    setTyped("");
    setPhase("typing");
    setPlayId((p) => p + 1);
  }

  function navigate(next: Screen) {
    pauseAutoplay();
    setScreen(next);
    setMenuOpen(false);
    setExpandedId(null);
  }

  function openChatScene(idx: number) {
    setScreen("chat");
    setMenuOpen(false);
    setExpandedId(null);
    playScene(idx);
  }

  function toggleExpand(id: string) {
    setExpandedId((cur) => (cur === id ? null : id));
  }

  function acceptInvoice(id: string) {
    setInbox((rows) =>
      rows.map((r) => (r.id === id ? { ...r, status: "accepted" as const } : r)),
    );
  }

  function rejectInvoice(id: string) {
    setInbox((rows) =>
      rows.map((r) => (r.id === id ? { ...r, status: "rejected" as const } : r)),
    );
  }

  const scene = SCENES[sceneIdx];
  const showBubble = typed.length > 0 || phase !== "typing";

  return (
    <div
      aria-label="finla uygulama demosu: sohbet, menü, giden ve gelen faturalar"
      className="relative mx-auto w-full max-w-[380px] select-none"
    >
      <div className="rounded-[3.2rem] border border-black/60 bg-ink p-[10px] shadow-[0_60px_120px_-30px_rgba(10,10,10,0.45),0_25px_50px_-20px_rgba(10,10,10,0.3)]">
        <div className="relative flex h-[620px] flex-col overflow-hidden rounded-[2.6rem] bg-white">
          {/* status bar */}
          <div className="relative flex shrink-0 items-center justify-between px-7 pb-1 pt-3.5 text-[13px] font-semibold">
            <span>13:51</span>
            <span className="absolute left-1/2 top-2.5 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-ink" />
            <span className="flex items-center gap-1" aria-hidden>
              <svg width="15" height="11" viewBox="0 0 16 12" fill="currentColor">
                <rect x="0" y="7" width="3" height="5" rx="0.8" />
                <rect x="4.3" y="5" width="3" height="7" rx="0.8" />
                <rect x="8.6" y="2.5" width="3" height="9.5" rx="0.8" />
                <rect x="12.9" y="0" width="3" height="12" rx="0.8" />
              </svg>
              <svg width="20" height="11" viewBox="0 0 22 12" fill="none">
                <rect x="0.5" y="0.5" width="18" height="11" rx="3" stroke="currentColor" opacity="0.4" />
                <rect x="2" y="2" width="13" height="8" rx="1.6" fill="currentColor" />
                <path d="M20.5 4v4a2 2 0 0 0 0-4z" fill="currentColor" opacity="0.4" />
              </svg>
            </span>
          </div>

          {/* app header */}
          <div className="flex shrink-0 items-center justify-between border-b border-line/70 px-4 pb-3 pt-2">
            <button
              type="button"
              aria-label="Menüyü aç"
              aria-expanded={menuOpen}
              onClick={() => {
                pauseAutoplay();
                setMenuOpen(true);
              }}
              className={`flex h-8 w-8 items-center justify-center rounded-lg hover:bg-surface ${
                nudgeMenu ? "menu-nudge" : ""
              }`}
            >
              <span aria-hidden className="space-y-[3px]">
                <span className="block h-[2px] w-4 rounded bg-ink" />
                <span className="block h-[2px] w-4 rounded bg-ink" />
                <span className="block h-[2px] w-4 rounded bg-ink" />
              </span>
            </button>
            <span
              className={`tracking-tight ${
                screen === "chat"
                  ? "text-[17px] font-extrabold tracking-[-0.03em]"
                  : "text-[14px] font-bold"
              }`}
            >
              {SCREEN_TITLE[screen]}
            </span>
            {screen === "chat" ? (
              <span className="relative flex h-8 w-8 items-center justify-center">
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-green-bright opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-green-bright" />
              </span>
            ) : (
              <span className="w-8" aria-hidden />
            )}
          </div>

          {/* screens */}
          <div className="relative min-h-0 flex-1">
            {screen === "chat" && (
              <div className="flex h-full flex-col">
                <div className="flex min-h-0 flex-1 flex-col justify-end gap-3 overflow-hidden bg-paper p-4">
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

                  {phase === "thinking" && (
                    <div className="flex justify-start">
                      <div className="flex animate-pop items-center gap-1.5 rounded-[20px] rounded-bl-md border border-line bg-white px-4 py-3.5">
                        <span className="dot-think h-1.5 w-1.5 rounded-full bg-ink" />
                        <span className="dot-think h-1.5 w-1.5 rounded-full bg-ink" />
                        <span className="dot-think h-1.5 w-1.5 rounded-full bg-ink" />
                      </div>
                    </div>
                  )}

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

                <div className="shrink-0 border-t border-line/70 bg-white px-3 pb-5 pt-2.5">
                  <div
                    role="group"
                    aria-label="Demo senaryosu seç"
                    className="-mx-0.5 mb-2.5 flex gap-1.5 overflow-x-auto px-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  >
                    {SCENES.map((s, i) => {
                      const active = sceneIdx === i;
                      return (
                        <button
                          key={s.chip}
                          type="button"
                          aria-pressed={active}
                          onClick={() => playScene(i)}
                          className={`shrink-0 rounded-full border px-3 py-1.5 text-[11.5px] font-semibold tracking-tight transition-colors ${
                            active
                              ? "border-ink bg-ink text-white"
                              : "border-line bg-white text-muted hover:border-ink/35 hover:text-ink"
                          }`}
                        >
                          {s.chip}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    title="Demo — aşağıdaki senaryolardan seç"
                    aria-label="Demo — senaryolardan birini seç"
                    onClick={pauseAutoplay}
                    className="flex w-full cursor-default items-center gap-2 rounded-full bg-surface px-4 py-2.5 text-left text-[13px] text-faint"
                  >
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
                  </button>
                </div>
              </div>
            )}

            {screen === "outbox" && (
              <div className="flex h-full flex-col bg-paper">
                <Filters />
                <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-3 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {OUTBOX.map((inv) => (
                    <OutboxCard
                      key={inv.id}
                      inv={inv}
                      open={expandedId === inv.id}
                      onToggle={() => toggleExpand(inv.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {screen === "inbox" && (
              <div className="flex h-full flex-col bg-paper">
                <Filters />
                <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-3 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {inbox.map((inv) => (
                    <InboxCard
                      key={inv.id}
                      inv={inv}
                      open={expandedId === inv.id}
                      onToggle={() => toggleExpand(inv.id)}
                      onAccept={() => acceptInvoice(inv.id)}
                      onReject={() => rejectInvoice(inv.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {screen === "profile" && (
              <div className="h-full overflow-y-auto bg-paper px-4 py-5">
                <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-[16px] font-bold text-white">
                      {PROFILE.initial}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[15px] font-bold tracking-tight">{PROFILE.company}</p>
                      <p className="mt-0.5 text-[12px] text-muted">VKN {PROFILE.vkn}</p>
                    </div>
                  </div>
                  <dl className="mt-5 space-y-3 border-t border-line/70 pt-4 text-[13px]">
                    {(
                      [
                        ["Telefon", PROFILE.phone],
                        ["Paket", PROFILE.plan],
                        ["Entegratör", "GİB onaylı"],
                      ] as const
                    ).map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-3">
                        <dt className="text-muted">{k}</dt>
                        <dd className="font-semibold tabular-nums">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}
          </div>

          <span className="mx-auto mb-2.5 mt-1 block h-1 w-28 shrink-0 rounded-full bg-ink/80" aria-hidden />

          {/* side menu */}
          <div
            className={`absolute inset-0 z-30 ${menuOpen ? "" : "pointer-events-none"}`}
            aria-hidden={!menuOpen}
          >
            <button
              type="button"
              aria-label="Menüyü kapat"
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
              className={`absolute inset-0 bg-black/45 transition-opacity duration-300 ${
                menuOpen ? "opacity-100" : "opacity-0"
              }`}
            />
            <aside
              className={`absolute inset-y-0 left-0 flex w-[86%] flex-col bg-white shadow-[8px_0_32px_rgba(0,0,0,0.18)] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
                menuOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="px-5 pb-3 pt-8">
                <p className="text-[20px] font-extrabold tracking-[-0.03em]">finla</p>
              </div>

              <nav className="space-y-0.5 px-2.5" aria-label="Ana menü">
                {MENU_ITEMS.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => navigate(item.key)}
                    className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[13px] font-semibold transition-colors ${
                      screen === item.key ? "bg-surface text-ink" : "text-ink hover:bg-surface/70"
                    }`}
                  >
                    <MenuIcon kind={item.key} />
                    {item.label}
                  </button>
                ))}
              </nav>

              <p className="mb-1.5 mt-6 px-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-faint">
                Sohbetler
              </p>
              <div className="min-h-0 flex-1 space-y-0.5 overflow-y-auto px-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {CHATS.map((c) => (
                  <button
                    key={c.title}
                    type="button"
                    onClick={() => openChatScene(c.sceneIdx)}
                    className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left hover:bg-surface/70"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface text-muted">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path
                          d="M5 6h14v9H9l-4 3V6z"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12px] font-semibold">{c.title}</p>
                      <p className="text-[10px] text-faint">{c.date}</p>
                    </div>
                    <span className="text-faint" aria-hidden>
                      ›
                    </span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => navigate("profile")}
                className="mt-auto flex items-center gap-2.5 border-t border-line px-3.5 py-3.5 text-left hover:bg-surface/50"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-[13px] font-bold text-white">
                  {PROFILE.initial}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] font-bold">{PROFILE.short}</p>
                  <p className="truncate text-[10px] text-faint">VKN/TCKN: {PROFILE.vkn}</p>
                </div>
              </button>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

function OutboxCard({
  inv,
  open,
  onToggle,
}: {
  inv: OutboxInvoice;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
      <button type="button" onClick={onToggle} className="w-full p-3 text-left">
        <div className="flex items-start justify-between gap-2">
          <p className="min-w-0 truncate text-[13px] font-bold leading-snug">{inv.name}</p>
          <span className="shrink-0 text-[13px] font-bold tabular-nums">{inv.amount}</span>
        </div>
        <div className="mt-1.5 flex items-center justify-between gap-2">
          <p className="truncate text-[11px] text-faint">
            {inv.date} · {inv.id}
          </p>
          <div className="flex shrink-0 items-center gap-1.5">
            <span className="rounded-md bg-green-soft px-2 py-0.5 text-[10px] font-semibold text-green-dark">
              ONAYLANDI
            </span>
            <Chevron open={open} />
          </div>
        </div>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-line/70 bg-surface/60 px-3 pb-3 pt-2.5">
            <dl className="space-y-1.5 text-[11px]">
              {(
                [
                  ["Müşteri", inv.details.customer],
                  ["Tarih", inv.details.isoDate],
                  ["VKN/TCKN", inv.details.vkn],
                  ["Matrah", inv.details.matrah],
                  ["KDV", inv.details.kdv],
                  ["Brüt", inv.details.brut],
                ] as const
              ).map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <dt className="w-16 shrink-0 text-faint">{k}</dt>
                  <dd className="min-w-0 truncate font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

function InboxCard({
  inv,
  open,
  onToggle,
  onAccept,
  onReject,
}: {
  inv: InboxInvoice;
  open: boolean;
  onToggle: () => void;
  onAccept: () => void;
  onReject: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
      <button type="button" onClick={onToggle} className="w-full p-3 text-left">
        <div className="flex items-start justify-between gap-2">
          <p className="min-w-0 truncate text-[13px] font-bold leading-snug">{inv.name}</p>
          <span className="shrink-0 text-[13px] font-bold tabular-nums">{inv.amount}</span>
        </div>
        <div className="mt-1.5 flex items-center justify-between gap-2">
          <p className="truncate text-[11px] text-faint">
            {inv.date} · {inv.id}
          </p>
          <div className="flex shrink-0 items-center gap-1.5">
            <StatusBadge status={inv.status} />
            <Chevron open={open} />
          </div>
        </div>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-line/70 bg-surface/60 px-3 pb-3 pt-2.5">
            <dl className="space-y-1.5 text-[11px]">
              {(
                [
                  ["Gönderici", inv.details.sender],
                  ["Tarih", inv.details.isoDate],
                  ["VKN/TCKN", inv.details.vkn],
                  ["Matrah", inv.details.matrah],
                  ["KDV", inv.details.kdv],
                  ["Brüt", inv.details.brut],
                ] as const
              ).map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <dt className="w-16 shrink-0 text-faint">{k}</dt>
                  <dd className="min-w-0 truncate font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            {inv.status === "pending" && (
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAccept();
                  }}
                  className="flex-1 rounded-xl bg-ink py-2.5 text-[12px] font-semibold text-white"
                >
                  Kabul et
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onReject();
                  }}
                  className="flex-1 rounded-xl border border-line bg-white py-2.5 text-[12px] font-semibold text-ink"
                >
                  Reddet
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
