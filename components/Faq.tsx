import { CONTACT_EMAIL, FAQS } from "@/content/site";
import Reveal from "./Reveal";

export default function Faq() {
  return (
    <section className="bg-white py-20 md:py-28" id="sss">
      <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="eyebrow mb-4">SSS</p>
          <h2 className="h2-display text-4xl sm:text-5xl">
            Aklındaki soruların cevabı muhtemelen burada.
          </h2>
          <p className="mt-6 text-muted">
            Cevabını bulamadın mı?{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            adresine yaz, dönelim.
          </p>
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
