"use client";

import { useEffect, useRef, useState } from "react";

type Screen = "outbox" | "inbox";
type InboxStatus = "accepted" | "pending" | "rejected";

type Phase =
  | "outbox_list"
  | "outbox_expand"
  | "menu_open"
  | "menu_tap"
  | "inbox_loading"
  | "inbox_list"
  | "inbox_expand"
  | "inbox_tap"
  | "preview"
  | "approve"
  | "closing"
  | "approved";

const PHASE_MS: Record<Phase, number> = {
  outbox_list: 1400,
  outbox_expand: 2200,
  menu_open: 1400,
  menu_tap: 700,
  inbox_loading: 1100,
  inbox_list: 1100,
  inbox_expand: 1600,
  inbox_tap: 500,
  preview: 2000,
  approve: 650,
  closing: 600,
  approved: 2800,
};

const ORDER: Phase[] = [
  "outbox_list",
  "outbox_expand",
  "menu_open",
  "menu_tap",
  "inbox_loading",
  "inbox_list",
  "inbox_expand",
  "inbox_tap",
  "preview",
  "approve",
  "closing",
  "approved",
];

const OUTBOX = [
  {
    id: "AMA2026000000236",
    name: "Ferhat Kiyatmaz",
    amount: "14.400,00 ₺",
    date: "02/07/2026",
  },
  {
    id: "AMA2026000000235",
    name: "Örnek Test Müşterisi",
    amount: "1.011,20 ₺",
    date: "02/07/2026",
    details: {
      customer: "BATTISTE ELIGAH WAVERLY",
      isoDate: "2026-07-02",
      vkn: "5220005019",
      matrah: "1.011,2 TRY",
      kdv: "0 TRY",
      brut: "1.011,2 TRY",
      ettn: "6716630d-a12f-4c8e-9b01-8f3e2d4a5567",
    },
  },
  {
    id: "AMA2026000000234",
    name: "Ferhat Kiyatmaz",
    amount: "3.600,00 ₺",
    date: "01/07/2026",
  },
];

const INBOX = [
  {
    id: "NVT2026000000228",
    name: "Nova Dijital Ticaret A.Ş...",
    amount: "5.330,60 ₺",
    date: "11/07/2026",
    status: "accepted" as InboxStatus,
  },
  {
    id: "AYZ2026000000230",
    name: "Anadolu Yazılım Ltd. Şti...",
    amount: "6,40 ₺",
    date: "11/07/2026",
    status: "pending" as InboxStatus,
    details: {
      sender: "Anadolu Yazılım Limited Şirketi",
      isoDate: "2026-07-11",
      vkn: "—",
      matrah: "5,33 USD",
      kdv: "1,07 USD",
      brut: "6,4 USD",
      ettn: "35e5d9d2-a54f-408f-9605-3d84e40b5618",
    },
  },
  {
    id: "ELO2026000000231",
    name: "Ege Lojistik A.Ş...",
    amount: "300,00 ₺",
    date: "11/07/2026",
    status: "rejected" as InboxStatus,
  },
];

const STATUS_LABEL: Record<InboxStatus, string> = {
  accepted: "Kabul",
  pending: "Yanıt Bekleniyor",
  rejected: "Red",
};

const STATUS_CLASS: Record<InboxStatus, string> = {
  accepted: "bg-signal-soft text-signal-dark",
  pending: "bg-amber-soft text-amber",
  rejected: "bg-red-soft text-red",
};

const CHATS = [
  { title: "Geçen ayın faturalarını Ex...", date: "7 Tem 2026" },
  { title: "Yılmaz İnşaat'a 10.000 TL...", date: "6 Tem 2026" },
  { title: "Bu ay kestiğim faturalar", date: "5 Tem 2026" },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={`text-faint transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse-soft rounded-2xl border border-line bg-white p-3">
      <div className="flex justify-between gap-3">
        <span className="h-2.5 w-[55%] rounded bg-ink/10" />
        <span className="h-2.5 w-12 rounded bg-ink/10" />
      </div>
      <div className="mt-2.5 flex items-center justify-between">
        <span className="h-2 w-[45%] rounded bg-ink/10" />
        <span className="h-4 w-14 rounded bg-ink/10" />
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="relative flex items-center justify-between px-6 pb-0.5 pt-3 text-[11px] font-semibold">
      <span>13:51</span>
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
  );
}

function Filters() {
  return (
    <div className="flex gap-1.5 px-3 pb-2.5">
      {["Bu Ay", "Geçen Ay", "Bu Yıl"].map((f, i) => (
        <span
          key={f}
          className={`rounded-full px-2.5 py-1 text-[9.5px] font-semibold ${
            i === 0 ? "bg-ink text-white" : "border border-line bg-white text-ink"
          }`}
        >
          {f}
        </span>
      ))}
    </div>
  );
}

export default function InboxFlowDemo() {
  const [phase, setPhase] = useState<Phase>("outbox_list");
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (reduced.current) {
      setPhase("approved");
      return;
    }
    const idx = ORDER.indexOf(phase);
    const t = setTimeout(() => setPhase(ORDER[(idx + 1) % ORDER.length]), PHASE_MS[phase]);
    return () => clearTimeout(t);
  }, [phase]);

  const screen: Screen =
    phase.startsWith("outbox") || phase === "menu_open" || phase === "menu_tap"
      ? "outbox"
      : "inbox";

  const menuOpen = phase === "menu_open" || phase === "menu_tap";
  const outboxExpanded = phase === "outbox_expand" || phase === "menu_open" || phase === "menu_tap";
  const inboxExpanded = phase === "inbox_expand" || phase === "inbox_tap";
  const showPreview = phase === "preview" || phase === "approve";
  const closing = phase === "closing";
  const inboxTargetStatus: InboxStatus =
    phase === "approved" || phase === "closing" ? "accepted" : "pending";
  const showInboxList = screen === "inbox" && phase !== "inbox_loading";

  return (
    <div
      aria-label="finla fatura demosu: giden faturalardan gelen faturalara geçiş ve onay"
      className="relative mx-auto w-full max-w-[280px] select-none overflow-hidden rounded-[2.5rem] border border-black/70 bg-ink p-[9px] shadow-[0_35px_60px_-20px_rgba(10,10,10,0.35)]"
    >
      <div className="relative flex h-[560px] flex-col overflow-hidden rounded-[2rem] bg-white">
        <StatusBar />

        <div className="flex items-center justify-between px-3.5 pb-2 pt-1.5">
          <span aria-hidden className="space-y-[2.5px]">
            <span className="block h-[1.5px] w-3.5 rounded bg-ink" />
            <span className="block h-[1.5px] w-3.5 rounded bg-ink" />
            <span className="block h-[1.5px] w-3.5 rounded bg-ink" />
          </span>
          <span className="text-[12.5px] font-bold tracking-tight">
            {screen === "outbox" ? "Giden Faturalar" : "Gelen Faturalar"}
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <Filters />

        <div className="relative min-h-0 flex-1 overflow-hidden bg-paper px-2.5 pb-4">
          {/* OUTBOX */}
          {screen === "outbox" && (
            <div className="flex flex-col gap-2 pt-0.5">
              {OUTBOX.map((inv, i) => {
                const open = i === 1 && outboxExpanded;
                return (
                  <div
                    key={inv.id}
                    className={`overflow-hidden rounded-2xl border border-line bg-white shadow-sm ${
                      phase === "outbox_list" ? "animate-rise" : ""
                    }`}
                    style={phase === "outbox_list" ? { animationDelay: `${i * 90}ms` } : undefined}
                  >
                    <div className="p-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <p className="min-w-0 truncate text-[10.5px] font-bold leading-snug">
                          {inv.name}
                        </p>
                        <span className="shrink-0 text-[10.5px] font-bold tabular-nums">
                          {inv.amount}
                        </span>
                      </div>
                      <div className="mt-1.5 flex items-center justify-between gap-2">
                        <p className="truncate text-[9px] text-faint">
                          {inv.date} · {inv.id}
                        </p>
                        <div className="flex shrink-0 items-center gap-1">
                          <span className="rounded-md bg-signal-soft px-2 py-0.5 text-[9.5px] font-semibold text-signal-dark">
                            ONAYLANDI
                          </span>
                          <Chevron open={open} />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
                        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        {inv.details && (
                          <div className="border-t border-line/70 bg-surface/60 px-2.5 pb-2.5 pt-2">
                            <dl className="space-y-1 text-[9px]">
                              {(
                                [
                                  ["Müşteri", inv.details.customer],
                                  ["Tarih", inv.details.isoDate],
                                  ["Durum", "Onaylandı"],
                                  ["VKN/TCKN", inv.details.vkn],
                                  ["Matrah", inv.details.matrah],
                                  ["KDV", inv.details.kdv],
                                  ["Brüt", inv.details.brut],
                                  ["ETTN", inv.details.ettn],
                                ] as const
                              ).map(([k, v]) => (
                                <div key={k} className="flex gap-2">
                                  <dt className="w-[58px] shrink-0 text-faint">{k}</dt>
                                  <dd className="min-w-0 truncate font-medium">{v}</dd>
                                </div>
                              ))}
                            </dl>
                            <div className="mt-2.5 space-y-1.5">
                              <span className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-ink py-2 text-[10.5px] font-semibold text-white">
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
                                  <path
                                    d="M7 3h7l4 4v14H7V3z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                Faturayı Gör
                              </span>
                              <span className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-line bg-white py-2 text-[10.5px] font-semibold text-ink">
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
                                  <path
                                    d="M4 12a8 8 0 0 1 14-5M20 12a8 8 0 0 1-14 5"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                  <path d="M18 3v4h-4M6 21v-4h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Yeniden fatura kes
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* INBOX */}
          {screen === "inbox" && phase === "inbox_loading" && (
            <div className="flex flex-col gap-2 pt-0.5">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          )}

          {showInboxList && (
            <div className="flex flex-col gap-2 pt-0.5">
              {INBOX.map((inv, i) => {
                const isTarget = i === 1;
                const open = isTarget && inboxExpanded;
                const status = isTarget ? inboxTargetStatus : inv.status;
                return (
                  <div
                    key={inv.id}
                    className={`overflow-hidden rounded-2xl border border-line bg-white shadow-sm ${
                      phase === "inbox_list" ? "animate-rise" : ""
                    }`}
                    style={phase === "inbox_list" ? { animationDelay: `${i * 90}ms` } : undefined}
                  >
                    <div className="p-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <p className="min-w-0 truncate text-[10.5px] font-bold leading-snug">
                          {inv.name}
                        </p>
                        <span className="shrink-0 text-[10.5px] font-bold tabular-nums">
                          {inv.amount}
                        </span>
                      </div>
                      <div className="mt-1.5 flex items-center justify-between gap-2">
                        <p className="truncate text-[9px] text-faint">
                          {inv.date} · {inv.id}
                        </p>
                        <div className="flex shrink-0 items-center gap-1">
                          <span
                            className={`rounded-md px-2 py-0.5 text-[9.5px] font-semibold transition-all duration-500 ${STATUS_CLASS[status]} ${
                              isTarget && phase === "approved" ? "scale-110 ring-2 ring-signal-bright/40" : ""
                            }`}
                          >
                            {STATUS_LABEL[status]}
                          </span>
                          <Chevron open={open} />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
                        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        {inv.details && (
                          <div className="border-t border-line/70 bg-surface/60 px-2.5 pb-2.5 pt-2">
                            <dl className="space-y-1 text-[9px]">
                              {(
                                [
                                  ["Gönderici", inv.details.sender],
                                  ["Tarih", inv.details.isoDate],
                                  ["Durum", STATUS_LABEL[status]],
                                  ["VKN/TCKN", inv.details.vkn],
                                  ["Matrah", inv.details.matrah],
                                  ["KDV", inv.details.kdv],
                                  ["Brüt", inv.details.brut],
                                  ["ETTN", inv.details.ettn],
                                ] as const
                              ).map(([k, v]) => (
                                <div key={k} className="flex gap-2">
                                  <dt className="w-[58px] shrink-0 text-faint">{k}</dt>
                                  <dd className="min-w-0 truncate font-medium">{v}</dd>
                                </div>
                              ))}
                            </dl>
                            <span
                              className={`mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-xl bg-ink py-2 text-[10.5px] font-semibold text-white transition-transform duration-200 ${
                                phase === "inbox_tap" ? "scale-[0.96]" : ""
                              }`}
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                                <path d="M8.5 12.5l2.4 2.4L15.8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              Yanıt Ver
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* side menu overlays entire screen including header */}
        <div
          className={`absolute inset-0 z-30 ${
            menuOpen ? "" : "pointer-events-none"
          }`}
        >
          <div
            className={`absolute inset-0 bg-black/45 transition-opacity duration-300 ${
              menuOpen ? "opacity-100" : "opacity-0"
            }`}
          />
          <aside
            className={`absolute inset-y-0 left-0 flex w-[86%] flex-col bg-white shadow-[8px_0_32px_rgba(0,0,0,0.18)] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
              menuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="px-4 pb-3 pt-5">
              <p className="text-[18px] font-extrabold tracking-[-0.03em]">finla</p>
            </div>
            <nav className="space-y-0.5 px-2">
              {(
                [
                  { key: "chat", label: "Yeni Sohbet", active: false },
                  { key: "out", label: "Giden Faturalar", active: phase === "menu_open" },
                  { key: "in", label: "Gelen Faturalar", active: phase === "menu_tap" },
                  { key: "profile", label: "Profil", active: false },
                ] as const
              ).map((item) => (
                <div
                  key={item.key}
                  className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[12px] font-semibold transition-colors duration-200 ${
                    item.active ? "bg-surface text-ink" : "text-ink"
                  } ${phase === "menu_tap" && item.key === "in" ? "ring-2 ring-ink/10" : ""}`}
                >
                  <span className="flex h-5 w-5 items-center justify-center text-muted" aria-hidden>
                    {item.key === "chat" && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {item.key === "out" && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                        <path d="M12 16V8m0 0l-3.5 3.5M12 8l3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {item.key === "in" && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                        <path d="M12 8v8m0 0l3.5-3.5M12 16l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {item.key === "profile" && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.8" />
                        <path d="M5 19c1.5-3 4-4.5 7-4.5S17.5 16 19 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    )}
                  </span>
                  {item.label}
                </div>
              ))}
            </nav>

            <p className="mb-1.5 mt-5 px-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-faint">
              Sohbetler
            </p>
            <div className="min-h-0 flex-1 space-y-0.5 overflow-hidden px-2">
              {CHATS.map((c) => (
                <div key={c.title} className="flex items-center gap-2 rounded-xl px-2.5 py-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface text-muted">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M5 6h14v9H9l-4 3V6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[11px] font-semibold">{c.title}</p>
                    <p className="text-[9px] text-faint">{c.date}</p>
                  </div>
                  <span className="text-faint">›</span>
                </div>
              ))}
            </div>

            <div className="mt-auto flex items-center gap-2 border-t border-line px-3 py-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[12px] font-bold text-white">
                N
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[10.5px] font-bold">Nova Dijital Tic...</p>
                <p className="truncate text-[9px] text-faint">VKN/TCKN: 1234567890</p>
              </div>
            </div>
          </aside>
        </div>

        {/* fullscreen preview */}
        <div
          className={`absolute inset-0 z-40 flex flex-col bg-white transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
            showPreview
              ? "translate-y-0 opacity-100"
              : closing
                ? "translate-y-3 opacity-0"
                : "pointer-events-none translate-y-full opacity-0"
          }`}
        >
          <StatusBar />
          <div className="flex items-center justify-between px-3.5 py-2.5">
            <span className="text-[13px] font-bold tracking-tight">Gelen Fatura Yanıtı</span>
            <span aria-hidden className="text-ink">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </span>
          </div>
          <div className="relative min-h-0 flex-1 bg-ink px-2 pb-2 pt-1">
            <div className="h-full overflow-hidden rounded-sm bg-white p-2.5 text-[6.5px] leading-tight text-ink shadow-sm">
              <div className="flex items-start justify-between gap-2 border-b border-line pb-2">
                <div className="min-w-0 flex-1">
                  <p className="text-[7.5px] font-bold">Anadolu Yazılım Limited Şirketi</p>
                  <p className="mt-0.5 text-[5.5px] text-muted">Maslak, İstanbul · VKN 1234567890</p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] font-extrabold tracking-tight">e-FATURA</p>
                  <p className="mt-0.5 text-[5.5px] text-muted">SATIŞ · AYZ2026000000230</p>
                </div>
              </div>
              <p className="mt-2 text-[5.5px] text-muted">SAYIN</p>
              <p className="text-[7px] font-bold">Demsoft Yazılım A.Ş.</p>
              <div className="mt-2 overflow-hidden rounded border border-line">
                <div className="grid grid-cols-[1fr_0.4fr_0.5fr_0.5fr] bg-surface px-1 py-0.5 text-[5px] font-semibold text-muted">
                  <span>Mal / Hizmet</span>
                  <span>Miktar</span>
                  <span>Birim</span>
                  <span>Tutar</span>
                </div>
                <div className="grid grid-cols-[1fr_0.4fr_0.5fr_0.5fr] px-1 py-1 text-[5.5px]">
                  <span>Danışmanlık hizmeti</span>
                  <span>1</span>
                  <span>5,33 USD</span>
                  <span className="font-semibold">6,40 USD</span>
                </div>
              </div>
              <div className="mt-2 ml-auto w-[42%] space-y-0.5 text-[5.5px]">
                <div className="flex justify-between"><span className="text-muted">Matrah</span><span>5,33 USD</span></div>
                <div className="flex justify-between"><span className="text-muted">KDV %20</span><span>1,07 USD</span></div>
                <div className="flex justify-between border-t border-line pt-0.5 font-bold"><span>Ödenecek</span><span>6,40 USD</span></div>
              </div>
              <p className="mt-3 text-[5px] font-semibold uppercase tracking-wide text-muted">Banka hesap bilgileri</p>
              <p className="mt-0.5 text-[5.5px]">Anadolu Yazılım A.Ş. · TR00 0000 0000 0000 0000 0000 00</p>
            </div>
          </div>
          <div className="flex shrink-0 gap-2 bg-white p-3 pb-5">
            <span className="flex flex-1 items-center justify-center rounded-xl bg-[#E57373] py-2.5 text-[12px] font-semibold text-white">
              Reddet
            </span>
            <span
              className={`flex flex-[1.15] items-center justify-center gap-1.5 rounded-xl bg-[#43A047] py-2.5 text-[12px] font-semibold text-white transition-transform duration-200 ${
                phase === "approve" ? "scale-[0.94] brightness-110 ring-2 ring-signal-bright/50" : ""
              }`}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="12" cy="12" r="9" fill="white" fillOpacity="0.25" />
                <path d="M8.5 12.5l2.4 2.4L15.8 10" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Onayla
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
