"use client";

import { useEffect, useState } from "react";

type Status = "accepted" | "pending" | "rejected";
type Phase =
  | "loading"
  | "list"
  | "expand"
  | "tap"
  | "preview"
  | "approve"
  | "closing"
  | "approved";

type Invoice = {
  id: string;
  name: string;
  amount: string;
  date: string;
  status: Status;
  details?: {
    sender: string;
    isoDate: string;
    vkn: string;
    matrah: string;
    kdv: string;
    brut: string;
    ettn: string;
  };
};

const INVOICES: Invoice[] = [
  {
    id: "NVT2026000000228",
    name: "Nova Dijital Ticaret A.Ş...",
    amount: "5.330,60 ₺",
    date: "11/07/2026",
    status: "accepted",
  },
  {
    id: "AYZ2026000000230",
    name: "Anadolu Yazılım Ltd. Şti...",
    amount: "6,40 ₺",
    date: "11/07/2026",
    status: "pending",
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
    status: "rejected",
  },
];

const TARGET = 1;

const STATUS_LABEL: Record<Status, string> = {
  accepted: "Kabul",
  pending: "Yanıt Bekleniyor",
  rejected: "Red",
};

const STATUS_CLASS: Record<Status, string> = {
  accepted: "bg-green-soft text-green-dark",
  pending: "bg-amber-soft text-amber",
  rejected: "bg-red-soft text-red",
};

const PHASE_MS: Record<Phase, number> = {
  loading: 700,
  list: 600,
  expand: 900,
  tap: 320,
  preview: 1100,
  approve: 400,
  closing: 380,
  approved: 1600,
};

function Badge({ status, pulse }: { status: Status; pulse?: boolean }) {
  return (
    <span
      className={`inline-flex rounded-md px-2 py-0.5 text-[9.5px] font-semibold leading-none transition-all duration-500 ${STATUS_CLASS[status]} ${
        pulse ? "scale-110 ring-2 ring-green-bright/40" : ""
      }`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

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
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

const PHASE_ORDER: Phase[] = [
  "loading",
  "list",
  "expand",
  "tap",
  "preview",
  "approve",
  "closing",
  "approved",
];

export default function InboxDemo() {
  const [phase, setPhase] = useState<Phase>("expand");
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setCanAnimate(wide.matches && !reduced.matches);
    sync();
    wide.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      wide.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!canAnimate) {
      setPhase("expand");
      return;
    }

    const idx = PHASE_ORDER.indexOf(phase);
    const timer = setTimeout(() => {
      setPhase(PHASE_ORDER[(idx + 1) % PHASE_ORDER.length]);
    }, PHASE_MS[phase]);

    return () => clearTimeout(timer);
  }, [phase, canAnimate]);

  const expanded = phase === "expand" || phase === "tap";
  const showPreview = phase === "preview" || phase === "approve";
  const closing = phase === "closing";
  const targetStatus: Status =
    phase === "approved" || phase === "closing" ? "accepted" : "pending";
  const showList = phase !== "loading";
  const badgePulse = phase === "approved";

  return (
    <div
      aria-label="finla gelen faturalar demosu: liste, yanıt ve onay akışı"
      className="relative mx-auto w-full max-w-[280px] select-none overflow-hidden rounded-t-[2rem] border border-b-0 border-line bg-white shadow-[0_20px_50px_-20px_rgba(10,10,10,0.3)]"
    >
      {/* status bar */}
      <div className="relative flex items-center justify-between px-5 pb-0.5 pt-3 text-[10px] font-semibold">
        <span>13:51</span>
        <span className="absolute left-1/2 top-2 h-[18px] w-[68px] -translate-x-1/2 rounded-full bg-ink" />
        <span className="flex items-center gap-0.5" aria-hidden>
          <svg width="11" height="8" viewBox="0 0 16 12" fill="currentColor">
            <rect x="0" y="7" width="3" height="5" rx="0.8" />
            <rect x="4.3" y="5" width="3" height="7" rx="0.8" />
            <rect x="8.6" y="2.5" width="3" height="9.5" rx="0.8" />
            <rect x="12.9" y="0" width="3" height="12" rx="0.8" />
          </svg>
          <svg width="15" height="8" viewBox="0 0 22 12" fill="none">
            <rect x="0.5" y="0.5" width="18" height="11" rx="3" stroke="currentColor" opacity="0.4" />
            <rect x="2" y="2" width="13" height="8" rx="1.6" fill="currentColor" />
            <path d="M20.5 4v4a2 2 0 0 0 0-4z" fill="currentColor" opacity="0.4" />
          </svg>
        </span>
      </div>

      {/* app header */}
      <div className="flex items-center justify-between px-3.5 pb-2 pt-1.5">
        <span aria-hidden className="space-y-[2.5px]">
          <span className="block h-[1.5px] w-3.5 rounded bg-ink" />
          <span className="block h-[1.5px] w-3.5 rounded bg-ink" />
          <span className="block h-[1.5px] w-3.5 rounded bg-ink" />
        </span>
        <span className="text-[12.5px] font-bold tracking-tight">Gelen Faturalar</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="text-ink">
          <path
            d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* filters */}
      <div className="flex gap-1.5 px-3 pb-2.5">
        {["Bu Ay", "Geçen Ay", "Bu Yıl"].map((f, i) => (
          <span
            key={f}
            className={`rounded-full px-2.5 py-1 text-[9.5px] font-semibold ${
              i === 0
                ? "bg-ink text-white"
                : "border border-line bg-white text-ink"
            }`}
          >
            {f}
          </span>
        ))}
      </div>

      {/* list body */}
      <div className="h-[420px] overflow-hidden bg-paper px-2.5 pb-8">
        {phase === "loading" && (
          <div className="flex flex-col gap-2 pt-0.5">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {showList && (
          <div className="flex flex-col gap-2 pt-0.5">
            {INVOICES.map((inv, i) => {
              const isTarget = i === TARGET;
              const open = isTarget && expanded;
              const status = isTarget ? targetStatus : inv.status;
              const delay = i * 90;

              return (
                <div
                  key={inv.id}
                  className={`overflow-hidden rounded-2xl border border-line bg-white shadow-sm ${
                    phase === "list" ? "animate-rise" : ""
                  }`}
                  style={
                    phase === "list" ? { animationDelay: `${delay}ms` } : undefined
                  }
                >
                  <div className="p-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <p className="min-w-0 truncate text-[10.5px] font-bold leading-snug tracking-tight">
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
                        <Badge status={status} pulse={isTarget && badgePulse} />
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
                          <button
                            type="button"
                            tabIndex={-1}
                            className={`mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-xl bg-ink py-2 text-[10.5px] font-semibold text-white transition-transform duration-200 ${
                              phase === "tap" ? "scale-[0.96]" : ""
                            }`}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                              <path
                                d="M8.5 12.5l2.4 2.4L15.8 10"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            Yanıt Ver
                          </button>
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

      {/* fullscreen preview — covers entire phone */}
      <div
        className={`absolute inset-0 z-20 flex flex-col bg-white transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
          showPreview
            ? "translate-y-0 opacity-100"
            : closing
              ? "translate-y-3 opacity-0"
              : "pointer-events-none translate-y-full opacity-0"
        }`}
      >
        <div className="relative flex items-center justify-between px-5 pb-0.5 pt-3 text-[10px] font-semibold">
          <span>13:51</span>
          <span className="absolute left-1/2 top-2 h-[18px] w-[68px] -translate-x-1/2 rounded-full bg-ink" />
          <span className="w-10" />
        </div>
        <div className="flex items-center justify-between px-3.5 py-2">
          <span className="text-[12px] font-bold tracking-tight">Gelen Fatura Yanıtı</span>
          <span aria-hidden>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </span>
        </div>
        <div className="relative min-h-0 flex-1 bg-ink px-1.5 pb-1.5">
          <div className="h-full overflow-hidden rounded-sm bg-white p-2 text-[6px] leading-tight text-ink">
            <div className="flex items-start justify-between gap-1 border-b border-line pb-1.5">
              <div>
                <p className="text-[7px] font-bold">Anadolu Yazılım Limited Şirketi</p>
                <p className="mt-0.5 text-[5px] text-muted">Maslak, İstanbul</p>
              </div>
              <p className="text-[7.5px] font-extrabold">e-FATURA</p>
            </div>
            <p className="mt-1.5 text-[5px] text-muted">SAYIN</p>
            <p className="text-[6.5px] font-bold">Demsoft Yazılım A.Ş.</p>
            <div className="mt-1.5 rounded border border-line px-1 py-1 text-[5.5px]">
              Danışmanlık · 1 × 5,33 USD · KDV %20 · <strong>6,40 USD</strong>
            </div>
            <p className="mt-2 text-[5px] text-muted">Banka: Anadolu Yazılım A.Ş.</p>
          </div>
        </div>
        <div className="flex shrink-0 gap-2 bg-white p-2.5 pb-4">
          <span className="flex flex-1 items-center justify-center rounded-xl bg-[#E57373] py-2.5 text-[11px] font-semibold text-white">
            Reddet
          </span>
          <span
            className={`flex flex-[1.15] items-center justify-center gap-1.5 rounded-xl bg-[#43A047] py-2.5 text-[11px] font-semibold text-white transition-transform duration-200 ${
              phase === "approve" ? "scale-[0.94] brightness-110 ring-2 ring-green-bright/50" : ""
            }`}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="9" fill="white" fillOpacity="0.25" />
              <path
                d="M8.5 12.5l2.4 2.4L15.8 10"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Onayla
          </span>
        </div>
      </div>
    </div>
  );
}
