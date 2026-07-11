const ROW_A = [
  "Yılmaz İnşaat'a 10.000 TL + KDV fatura kes",
  "Bu ay kestiğim faturaları göster",
  "Gelen son faturayı kabul et",
  "Geçen ayın faturalarını Excel'e dök",
  "500 dolarlık danışmanlık faturası kes",
  "Ödenmemiş faturaları listele",
];

const ROW_B = [
  "Tevkifatlı fatura kes, kod 9/10",
  "Mart'tan bu yana toplam ciro ne kadar?",
  "Acme Ltd'ye kestiğim son faturayı göster",
  "Bugün gelen faturaları özetle",
  "KDV istisnalı ihracat faturası oluştur",
  "Bu faturanın önizlemesini aç",
];

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="mask-fade-x flex overflow-hidden">
      <div
        className={`flex w-max shrink-0 gap-3 pr-3 ${
          reverse ? "animate-marquee-rev" : "animate-marquee"
        }`}
      >
        {doubled.map((cmd, i) => (
          <span
            key={`${cmd}-${i}`}
            aria-hidden={i >= items.length}
            className="flex shrink-0 items-center gap-2.5 rounded-full border border-line bg-white px-5 py-3 text-sm font-medium text-ink/80"
          >
            <span aria-hidden className="font-mono text-faint">
              ›
            </span>
            {cmd}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Two counter-scrolling rows of real finla commands. */
export default function Marquee() {
  return (
    <section aria-label="Örnek finla komutları" className="border-y border-line bg-surface/60 py-10">
      <div className="space-y-3">
        <Row items={ROW_A} />
        <Row items={ROW_B} reverse />
      </div>
    </section>
  );
}
