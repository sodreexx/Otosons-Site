import { ArrowRight, CalendarCheck } from "lucide-react";
import { contato, ctaFinal } from "@/lib/site";
import { Reveal } from "./reveal";

export function CtaFinal() {
  return (
    <section id="contato" className="py-20 md:py-28">
      <div className="container-site">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-700 to-brand-500 px-8 py-16 text-center md:px-16">
            {/* círculos decorativos dos cantos, como no mockup */}
            <div
              aria-hidden
              className="cta-orbe-a pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-white/10"
            />
            <div
              aria-hidden
              className="cta-orbe-b pointer-events-none absolute -right-10 -top-24 h-64 w-64 rounded-full bg-white/10"
            />

            <div className="relative">
              <h2 className="text-3xl text-white md:text-4xl">
                {ctaFinal.titulo}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-blue-100">
                {ctaFinal.texto}
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={contato.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-brand-800 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
                >
                  <CalendarCheck
                    size={17}
                    className="transition-transform duration-300 group-hover:-rotate-6"
                  />
                  {ctaFinal.primario}
                </a>

                <a
                  href="/aparelhos"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white/10 sm:w-auto"
                >
                  {ctaFinal.secundario}
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
