import Reveal from "./Reveal";

const FAQS = [
  {
    q: "finla ile kestiğim faturalar resmî mi?",
    a: "Evet. Faturalar GİB onaylı bir e-belge entegratörü üzerinden, GİB'in e-Fatura ve e-Arşiv standartlarına birebir uygun kesilir. Herhangi bir muhasebe programından kesilen faturayla aynı hukuki geçerliliğe sahiptir.",
  },
  {
    q: "e-Fatura mı, e-Arşiv mi keseceğimi bilmem gerekiyor mu?",
    a: "Hayır. Alıcının e-Fatura mükellefi olup olmadığını finla kontrol eder ve doğru belge tipini kendisi seçer. Sen sadece kime, ne kadar keseceğini yaz.",
  },
  {
    q: "KDV, tevkifat, istisna gibi konuları bilmem gerekir mi?",
    a: "Gerekmez. finla KDV oranlarını, tevkifat ve istisna kodlarını GİB kod listeleriyle birebir bilir ve faturana otomatik uygular. Yine de göndermeden önce her kalemi onayına sunar.",
  },
  {
    q: "Dövizli fatura kesebilir miyim?",
    a: "Evet. “500 dolarlık fatura kes” dediğinde finla günün kurunu çeker, TL karşılığını hesaplar ve faturaya işler.",
  },
  {
    q: "Verilerim ve GİB şifrelerim güvende mi?",
    a: "Entegratör kimlik bilgilerin sunucu tarafında şifreli bir kasada saklanır ve uygulamana hiç inmez. Oturumun yalnızca cihazının güvenli deposunda tutulur; uygulama Face ID ile kilitlenir. Hassas alanlar sistem kayıtlarına dahi yazılmaz.",
  },
  {
    q: "Muhasebecimden vazgeçmem mi gerekiyor?",
    a: "Hayır — tam tersi. finla, muhasebecine giden günlük işleri (fatura kesme, takip, liste çıkarma) senin üzerinden alır; dönem sonunda tek komutla Excel çıktısını muhasebecinle paylaşırsın.",
  },
  {
    q: "Nasıl başlarım?",
    a: "Uygulamayı indir, telefon numaranı gir. SMS’le gelen kodu doğrula, ardından sonraki girişlerin için bir PIN oluştur. Mevcut e-fatura hesabını bağladıktan sonra ilk faturanı sohbetten kesebilirsin — hepsi birkaç dakika sürer.",
  },
];

export default function Faq() {
  return (
    <section className="bg-white py-20 md:py-28" id="sss">
      <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="eyebrow mb-4">SSS</p>
          <h2 className="h2-display text-4xl sm:text-5xl">
            Aklındaki soruların cevabı muhtemelen burada.
          </h2>
        </Reveal>

        <div>
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 60}>
              <details className="group border-b border-line py-2">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[17px] font-semibold tracking-tight">
                  {f.q}
                  <span
                    aria-hidden
                    className="faq-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-lg font-normal text-muted transition-transform duration-300"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-5 leading-relaxed text-muted">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
