import FaceLockDemo from "./FaceLockDemo";
import Reveal from "./Reveal";
import EyebrowType from "./EyebrowType";

const ITEMS = [
  {
    title: "Şifreli kimlik kasası",
    desc: "Entegratör kimlik bilgilerin, yalnızca sunucuda çözülebilen şifreli bir kasada saklanır. Uygulamaya hiç inmez.",
  },
  {
    title: "Face ID ile uygulama kilidi",
    desc: "Uygulama arka plana geçince kilitlenir; dönüşte Face ID veya biyometrik doğrulama ister.",
  },
  {
    title: "Telefon, SMS kodu, PIN",
    desc: "Şifre ezberi yok. Kaydolurken telefonuna SMS kodu gelir; doğruladıktan sonra bir PIN oluşturursun. Sonraki girişlerde telefonun ve PIN’in yeter.",
  },
  {
    title: "Oturum yalnızca cihazında",
    desc: "Oturum anahtarları cihazının güvenli deposunda tutulur; her istek kısa ömürlü imzalı anahtarlarla taşınır.",
  },
  {
    title: "Loglarda otomatik karartma",
    desc: "PIN, kod ve kimlik alanları sistem kayıtlarına yazılmadan önce otomatik olarak maskelenir.",
  },
  {
    title: "KVKK uyumlu",
    desc: "Verilerin yalnızca hizmeti sunmak için işlenir; üçüncü taraflarla paylaşılmaz.",
  },
];

export default function Security() {
  return (
    <section className="bg-paper py-20 md:py-28" id="guvenlik">
      <div className="wrap grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="order-2 mx-auto w-[280px] shrink-0 lg:order-1">
          <FaceLockDemo />
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <EyebrowType className="mb-4">✓ guvenlik_dogrulandi</EyebrowType>
            <h2 className="h2-display max-w-lg text-4xl sm:text-5xl">
              Fintech disipliniyle inşa edildi.
            </h2>
            <p className="mt-4 max-w-lg text-lg text-muted">
              Faturaların ticari sırrındır. finla, ilk satırından itibaren buna göre
              yazıldı.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {ITEMS.map((it, i) => (
              <Reveal key={it.title} delay={i * 70}>
                <div className="flex gap-3.5">
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-white"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-bold tracking-tight">{it.title}</h3>
                    <p className="mt-1 text-[14.5px] leading-relaxed text-muted">{it.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
