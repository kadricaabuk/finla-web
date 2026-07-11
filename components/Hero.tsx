import ChatDemo from "./ChatDemo";
import Reveal from "./Reveal";

const TRUST = ["GİB uyumlu e-Fatura & e-Arşiv", "GİB onaylı entegratör altyapısı", "KVKK uyumlu"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper pt-16 md:pt-[72px]">
      {/* backdrop: dotted grid + soft glow */}
      <div aria-hidden className="bg-grid mask-fade-y absolute inset-0" />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-white blur-3xl"
      />

      <div className="wrap relative grid items-center gap-14 pb-20 pt-14 md:pb-28 md:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[13px] font-medium text-muted shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-bright opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-bright" />
              </span>
              Türkiye&apos;nin sohbetle çalışan e-fatura asistanı
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="display mt-7 text-[44px] sm:text-6xl lg:text-7xl xl:text-[84px]">
              Yaz.
              <br />
              Faturan
              <br />
              GİB&apos;de.
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-muted sm:text-xl">
              Form yok, menü yok, muhasebe programı ekranı yok.
              Fatura kesmek, sorgulamak ve paylaşmak için finla&apos;ya
              yazman yeterli — gerisini yapay zekâ halleder.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-9 flex flex-wrap items-center gap-3" id="indir">
              <a
                href="#"
                className="group flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-white transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <span className="text-left leading-tight">
                  <span className="block text-[10px] font-medium uppercase tracking-wide text-white/60">
                    İndir
                  </span>
                  <span className="block text-sm font-semibold">App Store</span>
                </span>
              </a>
              <a
                href="#"
                className="group flex items-center gap-3 rounded-full border border-ink/15 bg-white px-6 py-3.5 transition-all hover:border-ink/40"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M3.6 1.8c-.35.37-.55.94-.55 1.68v17.07c0 .74.2 1.31.56 1.67l.09.08L13.24 12.7v-.21L3.7 1.72l-.1.08z" />
                  <path d="M16.4 15.88l-3.16-3.18v-.21l3.17-3.18.07.04 3.76 2.14c1.07.6 1.07 1.6 0 2.21l-3.76 2.14-.08.04z" />
                  <path d="M16.48 15.84L13.24 12.6 3.6 22.3c.36.38.94.42 1.6.05l11.28-6.5" />
                  <path d="M16.48 9.35L5.2 2.87c-.66-.38-1.24-.33-1.6.04l9.64 9.68 3.24-3.24z" />
                </svg>
                <span className="text-left leading-tight">
                  <span className="block text-[10px] font-medium uppercase tracking-wide text-muted">
                    İndir
                  </span>
                  <span className="block text-sm font-semibold">Google Play</span>
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-faint">
              {TRUST.map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M12 2.5l7.5 3.2v5.1c0 4.9-3.2 9.2-7.5 10.7-4.3-1.5-7.5-5.8-7.5-10.7V5.7L12 2.5z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 12l2.2 2.2L15.4 10"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(10,10,10,0.06),transparent)]"
          />
          <ChatDemo />
        </Reveal>
      </div>
    </section>
  );
}
