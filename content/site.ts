/** Landing ile senkron tutulacak makine-okunur site içeriği. */

export const SITE_URL = "https://www.heyfinla.com";

/** Erken erişim başvuru formu — mağaza linkleri lansmanla birlikte gelecek. */
export const EARLY_ACCESS_FORM_URL = "https://forms.gle/5Kb6FWxL7x1aBjx3A";

export const SITE = {
  name: "finla",
  tagline: "Türkiye'nin sohbetle çalışan ilk e-fatura asistanı",
  description:
    "Türkiye'deki serbest çalışanlar ve KOBİ'ler için yapay zekâ destekli e-fatura asistanı. Sohbet ederek e-Fatura ve e-Arşiv kes, gelen faturaları yanıtla, raporlarını Excel'e dök.",
  shortDescription:
    "Yapay zekâ destekli, sohbet tabanlı e-fatura ve muhasebe asistanı. Tek cümleyle GİB uyumlu fatura kes.",
  locale: "tr_TR",
  trust: [
    "GİB uyumlu e-Fatura & e-Arşiv",
    "GİB onaylı entegratör altyapısı",
    "KVKK uyumlu",
  ] as const,
} as const;

export const FAQS = [
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
    a: "finla şu anda erken erişimde. Erken erişim formunu doldurman yeterli — davetler kayıt sırasına göre gönderiliyor. Davetin geldiğinde uygulamayı indir, telefon numaranı SMS’le doğrula ve bir PIN oluştur. Mevcut e-fatura hesabını bağladıktan sonra ilk faturanı sohbetten kesebilirsin — hepsi birkaç dakika sürer.",
  },
] as const;
