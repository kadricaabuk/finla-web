import Reveal from "./Reveal";
import EyebrowType from "./EyebrowType";

const PERSONAS = [
  {
    title: "Serbest çalışanlar",
    desc: "Ay sonunda tek kalemlik fatura için muhasebe programı açmak istemeyen freelancer'lar. Yaz, kes, işine dön.",
    example: "“Müşterime 15.000 TL yazılım danışmanlığı faturası kes”",
  },
  {
    title: "KOBİ sahipleri",
    desc: "Muhasebecisiyle arasında hızlı, self-servis bir katman isteyen işletmeler. Raporu finla'dan al, Excel'i muhasebeciye gönder.",
    example: "“Bu çeyrekte kime ne kadar fatura kesmişim?”",
  },
  {
    title: "E-ticaret esnafı",
    desc: "Gün içinde tekrarlayan, yüksek hacimli fatura kesen satıcılar. Sipariş bilgisini yapıştır, gerisi otomatik.",
    example: "“Dünkü 8 siparişin faturalarını kes”",
  },
];

export default function Audience() {
  return (
    <section className="border-y border-line bg-surface/60 py-20 md:py-28" id="kimler-icin">
      <div className="wrap">
        <Reveal>
          <EyebrowType className="mb-4">→ kimin_icin</EyebrowType>
          <h2 className="h2-display max-w-2xl text-4xl sm:text-5xl">
            Muhasebeci değil.
            <br />
            Muhasebecine giden işi azaltan katman.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {PERSONAS.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 110}
              className="flex flex-col rounded-3xl border border-line bg-white p-7"
            >
              <h3 className="text-lg font-bold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.desc}</p>
              <p className="mt-6 border-t border-line pt-4 text-[13.5px] font-medium italic text-faint">
                {p.example}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
