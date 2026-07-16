import Reveal from "./Reveal";
import { CONTACT_EMAIL, EARLY_ACCESS_FORM_URL } from "../content/site";

export default function Footer() {
  return (
    <>
      {/* final CTA */}
      <section className="relative overflow-hidden bg-ink py-24 text-white md:py-36">
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.07),transparent)]"
        />
        <div className="wrap relative text-center">
          <Reveal>
            <h2 className="display mx-auto max-w-4xl text-5xl sm:text-6xl md:text-7xl">
              Son faturanı
              <br />
              <span className="text-white/40">form doldurarak</span> kestin.
            </h2>
            <p className="mx-auto mt-7 max-w-md text-lg text-white/60">
              Bir sonrakini finla&apos;ya yaz. Erken erişim listesine katıl,
              davetin geldiğinde ilk faturanı sohbetten kes.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href={EARLY_ACCESS_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-full bg-white px-7 py-4 text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M21 11.5a8.5 8.5 0 01-8.5 8.5c-1.19 0-2.32-.24-3.35-.69L3 21l1.69-6.15A8.5 8.5 0 1121 11.5z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <circle cx="8.6" cy="11.5" r="1" fill="currentColor" />
                  <circle cx="12.5" cy="11.5" r="1" fill="currentColor" />
                  <circle cx="16.4" cy="11.5" r="1" fill="currentColor" />
                </svg>
                <span className="text-sm font-bold sm:text-base">Erken erişime katıl</span>
              </a>
            </div>
            <p className="mt-8 text-sm text-white/40">
              Kredi kartı gerekmez · Davetler kayıt sırasına göre gönderiliyor
            </p>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-line-dark bg-ink pb-10 pt-14 text-white">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
            <div className="max-w-xs">
              <span className="text-2xl font-extrabold tracking-[-0.04em]">finla</span>
              <p className="mt-3 text-sm leading-relaxed text-white/45">
                Türkiye&apos;deki serbest çalışanlar ve KOBİ&apos;ler için yapay zekâ
                destekli e-fatura asistanı.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-4 inline-block text-sm text-white/45 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60"
              >
                {CONTACT_EMAIL}
              </a>
            </div>

            <div className="grid grid-cols-2 gap-10 text-sm sm:gap-16">
              <div>
                <p className="mb-3 font-semibold text-white/85">Ürün</p>
                <ul className="space-y-2.5 text-white/45">
                  <li><a href="#ozellikler" className="transition-colors hover:text-white">Özellikler</a></li>
                  <li><a href="#nasil-calisir" className="transition-colors hover:text-white">Nasıl çalışır</a></li>
                  <li><a href="#guvenlik" className="transition-colors hover:text-white">Güvenlik</a></li>
                  <li><a href="#sss" className="transition-colors hover:text-white">SSS</a></li>
                </ul>
              </div>
              <div>
                <p className="mb-3 font-semibold text-white/85">Şirket</p>
                <ul className="space-y-2.5 text-white/45">
                  <li><a href="#teknoloji" className="transition-colors hover:text-white">Teknoloji</a></li>
                  <li><a href="#kimler-icin" className="transition-colors hover:text-white">Kimler için</a></li>
                  <li><a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-white">İletişim</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line-dark pt-6 text-[13px] text-white/35 md:flex-row md:items-center">
            <span>© 2026 finla. Tüm hakları saklıdır.</span>
            <span>Bodrum&apos;da yazıldı. Kahveyle, tek cümleyle.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
