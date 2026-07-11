import InboxDemo from "./InboxDemo";
import Reveal from "./Reveal";

function Cell({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal
      delay={delay}
      className={`group flex flex-col overflow-hidden rounded-3xl border border-line bg-white transition-shadow duration-300 hover:shadow-[0_24px_60px_-24px_rgba(10,10,10,0.18)] ${className}`}
    >
      {children}
    </Reveal>
  );
}

function CellText({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-7 pb-6">
      <h3 className="text-lg font-bold tracking-tight">{title}</h3>
      <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{desc}</p>
    </div>
  );
}

export default function Features() {
  return (
    <section className="bg-paper py-20 md:py-28" id="ozellikler">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow mb-4">Özellikler</p>
          <h2 className="h2-display max-w-2xl text-4xl sm:text-5xl">
            Muhasebe programı değil. Muhasebe asistanı.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* A — chat ile fatura kes (geniş) */}
          <Cell className="sm:col-span-2" delay={0}>
            <CellText
              title="Sohbetle e-Fatura & e-Arşiv kes"
              desc="Alıcı, tutar, vergi — hepsini tek cümleden çıkarır, onayınla GİB'e iletir. Fatura tipini (e-Fatura / e-Arşiv) alıcının mükellefiyetine göre kendi seçer."
            />
            <div className="relative mt-auto flex flex-col gap-2.5 px-7 pb-7">
              <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-[13px] text-white">
                Acme Ltd&apos;ye 25.000 TL + KDV danışmanlık faturası kes
              </div>
              <div className="mr-auto flex w-full max-w-[75%] items-center justify-between rounded-2xl rounded-bl-md border border-line bg-paper px-4 py-3 text-[13px]">
                <span className="font-semibold">e-Fatura · 30.000,00 ₺</span>
                <span className="rounded-full bg-green-soft px-2.5 py-0.5 text-[11px] font-semibold text-green-dark">
                  GİB&apos;e iletildi
                </span>
              </div>
            </div>
          </Cell>

          {/* B — gelen kutusu (uzun, animasyonlu telefon) */}
          <Cell className="lg:row-span-2" delay={120}>
            <CellText
              title="Gelen faturalar tek listede"
              desc="Entegratörden düşen her fatura anında listelenir; kabul ya da ret yanıtını sohbetten veya listeden tek dokunuşla ver."
            />
            <div className="relative mt-auto h-64 overflow-hidden px-7 sm:h-72 lg:h-auto lg:flex-1 lg:pt-2">
              <div className="transition-transform duration-500 group-hover:-translate-y-2">
                <InboxDemo />
              </div>
            </div>
          </Cell>

          {/* C — vergi zekâsı */}
          <Cell delay={60}>
            <CellText
              title="Vergi zekâsı içeride"
              desc="KDV oranları, tevkifat ve istisna kodları GİB kod listeleriyle birebir — sen oranı bilmesen de finla bilir."
            />
            <div className="mt-auto flex flex-wrap gap-2 px-7 pb-7 font-mono text-[11.5px]">
              <span className="rounded-lg bg-surface px-2.5 py-1.5 text-muted">KDV %20</span>
              <span className="rounded-lg bg-surface px-2.5 py-1.5 text-muted">Tevkifat 9/10</span>
              <span className="rounded-lg bg-surface px-2.5 py-1.5 text-muted">İstisna 301</span>
              <span className="rounded-lg bg-ink px-2.5 py-1.5 text-white">otomatik</span>
            </div>
          </Cell>

          {/* D — dövizli fatura */}
          <Cell delay={120}>
            <CellText
              title="Dövizli fatura, güncel kurla"
              desc="“500 dolarlık fatura kes” de; finla günün kurunu çeker, TL karşılığını hesaplar, faturaya işler."
            />
            <div className="mt-auto flex flex-wrap items-center gap-2 px-7 pb-7 text-sm font-semibold tabular-nums">
              <span className="shrink-0 whitespace-nowrap rounded-xl border border-line bg-paper px-3.5 py-2">
                $500
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0 text-faint">
                <path d="M5 12h14m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="shrink-0 whitespace-nowrap rounded-xl border border-line bg-paper px-3.5 py-2">
                20.410,00 ₺
              </span>
              <span className="whitespace-nowrap rounded-full bg-surface px-2.5 py-1 text-[10.5px] font-medium text-muted">
                güncel kur
              </span>
            </div>
          </Cell>

          {/* E — rapor & excel */}
          <Cell delay={100} className="lg:col-span-2">
            <CellText
              title="Raporunu iste, Excel'ini al"
              desc="“Geçen ayı Excel'e dök” — muhasebecinle paylaşıma hazır .xlsx dosyası, saniyeler içinde elinde."
            />
            <div className="mt-auto space-y-2 px-7 pb-7 text-[13px] tabular-nums">
              <div className="flex justify-between border-b border-line/70 pb-2">
                <span className="text-muted">Haziran cirosu</span>
                <span className="font-semibold">186.400,00 ₺</span>
              </div>
              <div className="flex justify-between border-b border-line/70 pb-2">
                <span className="text-muted">Kesilen fatura</span>
                <span className="font-semibold">42</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="flex items-center gap-2 font-mono text-[11.5px] text-muted">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-green-soft text-[10px] font-bold text-green-dark">
                    X
                  </span>
                  haziran-faturalar.xlsx
                </span>
                <span className="text-[11.5px] font-semibold text-green-dark">Paylaş →</span>
              </div>
            </div>
          </Cell>

          {/* F — canlı akış */}
          <Cell delay={160} className="sm:col-span-2 lg:col-span-1">
            <CellText
              title="Cevaplar canlı akar"
              desc="Yanıtlar kelime kelime, gerçek zamanlı gelir. Bekleme çarkı yok; finla düşünürken ne yaptığını görürsün."
            />
            <div className="mt-auto space-y-2 px-7 pb-7" aria-hidden>
              <span className="block h-2 w-4/5 animate-pulse-soft rounded bg-ink/15" />
              <span className="block h-2 w-full animate-pulse-soft rounded bg-ink/10 [animation-delay:200ms]" />
              <span className="block h-2 w-2/3 animate-pulse-soft rounded bg-ink/15 [animation-delay:400ms]" />
              <span className="mt-1 inline-block h-3.5 w-[2px] animate-blink bg-ink" />
            </div>
          </Cell>
        </div>
      </div>
    </section>
  );
}
