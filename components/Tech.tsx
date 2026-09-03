import Reveal from "./Reveal";
import EyebrowType from "./EyebrowType";

const NODES = [
  {
    label: "Sen",
    sub: "Tek cümle Türkçe",
    mono: false,
  },
  {
    label: "finla ajanı",
    sub: "Claude · 13 uzman araç",
    mono: true,
  },
  {
    label: "Entegratör",
    sub: "GİB onaylı e-belge altyapısı",
    mono: false,
  },
  {
    label: "GİB",
    sub: "Resmî e-Fatura / e-Arşiv",
    mono: false,
  },
];

const STATS = [
  { value: "13", label: "uzman araç: fatura kesme, sorgu, gelen kutusu, Excel, kur…" },
  { value: "%100", label: "GİB veri sözleşmesi: belge, uçtan uca GİB şemasıyla taşınır" },
  { value: "<1 sn", label: "ilk yanıt: cevaplar gerçek zamanlı akışla gelir" },
  { value: "7/24", label: "hep açık: fatura kesmek mesai saati tanımaz" },
];

export default function Tech() {
  return (
    <section className="bg-ink py-20 text-white md:py-28" id="teknoloji">
      <div className="wrap">
        <Reveal>
          <EyebrowType dark className="mb-4">✓ altyapi_hazir</EyebrowType>
          <h2 className="h2-display max-w-2xl text-4xl sm:text-5xl">
            Bir sohbet balonu değil.
            <br />
            <span className="text-white/50">Uçtan uca bir fatura ajanı.</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/60">
            Her mesaj, araç kullanan bir yapay zekâ ajanına gider: niyetini çözer, doğru
            aracı seçer, vergileri hesaplar ve GİB onaylı entegratör üzerinden belgeyi
            resmîleştirir. Sen sadece sonucu görürsün.
          </p>
        </Reveal>

        {/* pipeline */}
        <Reveal delay={150}>
          <div className="mt-14 grid gap-3 md:mt-16 md:grid-cols-[1fr_auto_1.2fr_auto_1fr_auto_1fr] md:items-stretch">
            {NODES.map((n, i) => (
              <div key={n.label} className="contents">
                <div className="flex flex-col justify-center rounded-2xl border border-line-dark bg-white/[0.04] px-6 py-5 backdrop-blur">
                  <span className={`text-lg font-bold tracking-tight ${n.mono ? "" : ""}`}>
                    {n.label}
                  </span>
                  <span className="mt-1 text-[13px] text-white/50">{n.sub}</span>
                </div>
                {i < NODES.length - 1 && (
                  <div className="flex items-center justify-center py-1 md:px-1" aria-hidden>
                    <svg
                      width="40"
                      height="14"
                      viewBox="0 0 40 14"
                      fill="none"
                      className="rotate-90 md:rotate-0"
                    >
                      <path
                        d="M0 7h32"
                        stroke="rgba(255,255,255,0.35)"
                        strokeWidth="2"
                        strokeDasharray="4 8"
                        strokeLinecap="round"
                        className="animate-flow-dash"
                      />
                      <path
                        d="M31 2l6 5-6 5"
                        stroke="rgba(255,255,255,0.35)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* stats */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line-dark bg-line-dark sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.value} delay={i * 100} className="bg-ink p-7">
              <span className="block text-4xl font-bold tabular-nums tracking-tight sm:text-5xl">
                {s.value}
              </span>
              <span className="mt-3 block text-[13.5px] leading-relaxed text-white/50">
                {s.label}
              </span>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-10 text-[13px] text-white/50">
            Altyapı: gerçek zamanlı akış mimarisi, sunucusuz fonksiyonlar ve uçtan uca
            korunan GİB veri şeması.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
