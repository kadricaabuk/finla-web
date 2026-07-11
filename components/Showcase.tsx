import Image from "next/image";
import Reveal from "./Reveal";

const SCREENS = [
  {
    src: "/mockups/IMG_8103_black.png",
    alt: "finla sohbet ekranı: hazır komut önerileri ve mesaj alanı",
    caption: "Boş sayfa korkusu yok — öneriler hazır",
  },
  {
    src: "/mockups/gelen-faturalar.png",
    alt: "finla gelen faturalar ekranı: durum rozetleri, KDV ve matrah detayları",
    caption: "Gelen kutun, durum rozetleriyle",
  },
  {
    src: "/mockups/IMG_8106_black.png",
    alt: "finla giriş ekranı: telefon numarası ve 6 haneli PIN",
    caption: "Telefon + PIN — sonraki girişlerin bu kadar.",
  },
];

export default function Showcase() {
  return (
    <section className="overflow-hidden bg-white py-20 md:py-28">
      <div className="wrap">
        <Reveal className="text-center">
          <p className="eyebrow mb-4">Uygulama</p>
          <h2 className="h2-display mx-auto max-w-2xl text-4xl sm:text-5xl">
            Sade görünür. Çünkü işi arkada finla yapar.
          </h2>
        </Reveal>

        <div className="mt-16 grid items-end gap-10 sm:grid-cols-3 sm:gap-6">
          {SCREENS.map((s, i) => (
            <Reveal key={s.src} delay={i * 130} className={i === 1 ? "sm:-translate-y-8" : ""}>
              <figure>
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={512}
                  height={1032}
                  sizes="(max-width: 640px) 80vw, 30vw"
                  className="mx-auto h-auto w-[240px] drop-shadow-[0_35px_60px_rgba(10,10,10,0.28)] transition-transform duration-500 hover:-translate-y-2 sm:w-full sm:max-w-[300px]"
                />
                <figcaption className="mt-6 text-center text-sm font-medium text-muted">
                  {s.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
