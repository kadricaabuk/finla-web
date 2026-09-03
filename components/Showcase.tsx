import SuggestDemo from "./SuggestDemo";
import InboxFlowDemo from "./InboxFlowDemo";
import LoginDemo from "./LoginDemo";
import Reveal from "./Reveal";
import EyebrowType from "./EyebrowType";

const SCREENS = [
  {
    Demo: SuggestDemo,
    caption: "Boş sayfa korkusu yok: öneriler hazır",
  },
  {
    Demo: InboxFlowDemo,
    caption: "Giden'den gelen'e: menüden tek dokunuş",
  },
  {
    Demo: LoginDemo,
    caption: "Telefon + PIN: sonraki girişlerin bu kadar.",
  },
];

export default function Showcase() {
  return (
    <section className="overflow-hidden bg-white py-20 md:py-28">
      <div className="wrap">
        <Reveal className="text-center">
          <EyebrowType className="mb-4">→ uygulamayi_tara</EyebrowType>
          <h2 className="h2-display mx-auto max-w-2xl text-4xl sm:text-5xl">
            Sade görünür. Çünkü işi arkada finla yapar.
          </h2>
        </Reveal>

        <div className="mt-16 grid items-end gap-12 sm:grid-cols-3 sm:gap-6">
          {SCREENS.map(({ Demo, caption }, i) => (
            <Reveal key={caption} delay={i * 130} className={i === 1 ? "sm:-translate-y-8" : ""}>
              <figure>
                <Demo />
                <figcaption className="mt-6 text-center text-sm font-medium text-muted">
                  {caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
