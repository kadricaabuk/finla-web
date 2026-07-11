import Reveal from "./Reveal";

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
              Bir sonrakini finla&apos;ya yaz. İki dakikada kaydol, ilk faturanı
              sohbetten kes.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#"
                className="flex items-center gap-3 rounded-full bg-white px-7 py-4 text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <span className="text-left leading-tight">
                  <span className="block text-[10px] font-medium uppercase tracking-wide text-ink/50">
                    İndir
                  </span>
                  <span className="block text-sm font-bold">App Store</span>
                </span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-full border border-white/25 px-7 py-4 transition-colors hover:border-white/60"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M3.6 1.8c-.35.37-.55.94-.55 1.68v17.07c0 .74.2 1.31.56 1.67l.09.08L13.24 12.7v-.21L3.7 1.72l-.1.08z" />
                  <path d="M16.4 15.88l-3.16-3.18v-.21l3.17-3.18.07.04 3.76 2.14c1.07.6 1.07 1.6 0 2.21l-3.76 2.14-.08.04z" />
                  <path d="M16.48 15.84L13.24 12.6 3.6 22.3c.36.38.94.42 1.6.05l11.28-6.5" />
                  <path d="M16.48 9.35L5.2 2.87c-.66-.38-1.24-.33-1.6.04l9.64 9.68 3.24-3.24z" />
                </svg>
                <span className="text-left leading-tight">
                  <span className="block text-[10px] font-medium uppercase tracking-wide text-white/50">
                    İndir
                  </span>
                  <span className="block text-sm font-bold">Google Play</span>
                </span>
              </a>
            </div>
            <p className="mt-8 text-sm text-white/40">
              Kredi kartı gerekmez · Telefonunla kaydol, SMS kodunu doğrula
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
            </div>

            <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3 sm:gap-16">
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
                </ul>
              </div>
              <div>
                <p className="mb-3 font-semibold text-white/85">Yatırımcı & Partner</p>
                <ul className="space-y-2.5 text-white/45">
                  <li>
                    <a href="https://www.heyfinla.com" className="transition-colors hover:text-white">
                      www.heyfinla.com
                    </a>
                  </li>
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
