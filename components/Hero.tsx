import ChatDemo from "./ChatDemo";
import Reveal from "./Reveal";
import { EARLY_ACCESS_FORM_URL } from "../content/site";

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
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-bright opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal-bright" />
              </span>
              Erken erişim başladı
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="display mt-5 text-[44px] sm:mt-6 sm:text-6xl lg:text-7xl xl:text-[84px]">
              Menü yok,
              <br />
              yazışalım.
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted sm:mt-6 sm:text-xl">
              Form yok, menü yok, muhasebe programı ekranı yok.
              Fatura kesmek, sorgulamak ve paylaşmak için finla&apos;ya
              yazman yeterli. Gerisini yapay zekâ halleder.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-8 sm:mt-10" id="indir">
              <a
                href={EARLY_ACCESS_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-white transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                {/* <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M21 11.5a8.5 8.5 0 01-8.5 8.5c-1.19 0-2.32-.24-3.35-.69L3 21l1.69-6.15A8.5 8.5 0 1121 11.5z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <circle cx="8.6" cy="11.5" r="1" fill="currentColor" />
                  <circle cx="12.5" cy="11.5" r="1" fill="currentColor" />
                  <circle cx="16.4" cy="11.5" r="1" fill="currentColor" />
                </svg> */}
                <span className="text-sm font-semibold sm:text-base">Erken erişime katıl</span>
              </a>
              <p className="mt-3.5 max-w-sm text-sm leading-relaxed text-muted">
                Türkiye&apos;nin sohbetle çalışan ilk e-fatura asistanını ilk
                deneyenlerden ol. Davetler kayıt sırasına göre gönderiliyor.
              </p>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[13px] text-faint sm:mt-12">
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
