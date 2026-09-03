import Reveal from "./Reveal";
import EyebrowType from "./EyebrowType";

const STEPS = [
  {
    n: "01",
    title: "Derdini yaz",
    desc: "“Yılmaz İnşaat'a 10.000 TL + KDV fatura kes”: günlük konuştuğun Türkçeyle, tek cümle.",
  },
  {
    n: "02",
    title: "finla anlar ve hazırlar",
    desc: "Yapay zekâ alıcıyı, tutarı ve vergileri çıkarır; KDV, tevkifat ve istisna kodlarını otomatik uygular, onayına sunar.",
  },
  {
    n: "03",
    title: "GİB'e iletilir",
    desc: "Onayladığın fatura, GİB onaylı entegratör üzerinden saniyeler içinde resmîleşir. Durumu sohbetten takip edersin.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-20 md:py-28" id="nasil-calisir">
      <div className="wrap">
        <Reveal>
          <EyebrowType className="mb-4">→ akisi_goster</EyebrowType>
          <h2 className="h2-display max-w-xl text-4xl sm:text-5xl">
            Üç adım. İkisini finla yapıyor.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 120} className="relative">
              {/* connector (desktop) */}
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -right-4 top-7 hidden h-px w-8 bg-line md:block"
                />
              )}
              <span className="font-mono text-sm font-semibold text-faint">{s.n}</span>
              <span aria-hidden className="mt-3 block h-px w-full bg-line" />
              <h3 className="mt-6 text-xl font-bold tracking-tight">{s.title}</h3>
              <p className="mt-2.5 leading-relaxed text-muted">{s.desc}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-14 flex flex-wrap items-center gap-3 text-[15px] text-muted md:mt-16">
            <span className="rounded-full bg-signal-soft px-3 py-1 text-[13px] font-semibold text-signal-dark">
              ~30 saniye
            </span>
            Bir cümleden resmî faturaya ortalama süre (telefonunu cebinden çıkarıp koyman dahil).
          </p>
        </Reveal>
      </div>
    </section>
  );
}
