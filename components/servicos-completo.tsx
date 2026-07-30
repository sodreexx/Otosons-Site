import { Check, Clock, Ear, Settings2, Stethoscope, Wrench } from "lucide-react";
import {
  contato,
  processo,
  servicos,
  servicosComplementares,
} from "@/lib/site";
import { CtaFinal } from "./cta-final";
import { DiferenciaisServicos } from "./diferenciais-servicos";
import { Equipe } from "./equipe";
import { Foto } from "./midia";
import { PageHero } from "./page-hero";
import { CabecalhoSecao } from "./secao";
import { Reveal } from "./reveal";

const icones = [Ear, Stethoscope, Settings2, Wrench];

export function ServicosCompleto() {
  return (
    <>
      <PageHero
        pagina="Serviços"
        titulo="Serviços e Atendimento"
        subtitulo="Acompanhamento completo em cada etapa da sua jornada auditiva — do primeiro teste ao suporte contínuo."
      />

      {/* Os 4 serviços principais — card + checklist "Como funciona".
          Layout e textos confirmados por print do protótipo Figma. */}
      <section className="pb-20 pt-4 md:pb-24">
        <div className="container-site space-y-6">
          {servicos.map((servico, i) => {
            const Icone = icones[i % icones.length];

            return (
              <Reveal key={servico.titulo} delay={i * 0.08}>
                <article
                  id={`servico-${i + 1}`}
                  className="grid grid-cols-1 gap-0 overflow-hidden rounded-2xl border border-gray-200 bg-white md:grid-cols-2"
                >
                  <div className="p-8 md:p-10">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-500 text-white shadow-lg shadow-brand-800/20">
                      <Icone size={22} />
                    </span>
                    <h2 className="mt-5 font-display text-xl font-semibold">
                      {servico.titulo}
                    </h2>
                    <p className="mt-2.5 text-sm text-gray-500">
                      {servico.descricao}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-medium text-brand-800">
                      <Clock size={14} />
                      {servico.duracao}
                    </span>

                    <a
                      href={contato.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-800 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-700"
                    >
                      Agendar {servico.titulo.toLowerCase()}
                    </a>
                  </div>

                  <div className="border-t border-gray-100 bg-surface p-8 md:border-l md:border-t-0 md:p-10">
                    <h3 className="font-display text-sm font-semibold text-gray-700">
                      Como funciona
                    </h3>
                    <ol className="mt-5 space-y-4">
                      {servico.comoFunciona.map((passo, idx) => (
                        <li key={passo} className="flex items-center gap-3">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-800 text-xs font-semibold text-white">
                            {idx + 1}
                          </span>
                          <span className="flex-1 text-sm text-gray-600">
                            {passo}
                          </span>
                          <Check size={16} className="shrink-0 text-brand-600" />
                        </li>
                      ))}
                    </ol>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Jornada do paciente ------------------------------------------- */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-site">
          <CabecalhoSecao
            kicker={processo.kicker}
            titulo={processo.titulo}
            subtitulo={processo.subtitulo}
          />

          <ol className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {processo.etapas.map((etapa, i) => (
              <Reveal key={etapa.titulo} delay={i * 0.08}>
                <li className="h-full rounded-2xl border border-gray-200 bg-white p-6">
                  <span className="font-display text-3xl font-bold text-brand-100">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-base font-semibold">
                    {etapa.titulo}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">{etapa.texto}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Zumbido e CPAP ------------------------------------------------ */}
      <section className="py-20 md:py-28">
        <div className="container-site">
          <CabecalhoSecao
            kicker={servicosComplementares.kicker}
            titulo={servicosComplementares.titulo}
            subtitulo={servicosComplementares.subtitulo}
          />

          <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {servicosComplementares.itens.map((item, i) => (
              <Reveal key={item.titulo} delay={i * 0.1}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white">
                  <div className="relative h-52 bg-gray-200">
                    <Foto
                      src={item.imagem}
                      alt={item.titulo}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      rotulo={item.titulo}
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-8">
                    <h3 className="font-display text-lg font-semibold">
                      {item.titulo}
                    </h3>
                    <p className="mt-2.5 text-sm text-gray-500">
                      {item.descricao}
                    </p>

                    <ul className="mt-5 flex-1 space-y-2.5">
                      {item.topicos.map((topico) => (
                        <li key={topico} className="flex items-start gap-2.5">
                          <Check
                            size={16}
                            className="mt-0.5 shrink-0 text-brand-600"
                          />
                          <span className="text-sm text-gray-600">{topico}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={contato.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-7 inline-flex items-center justify-center rounded-xl border border-brand-200 px-6 py-3 text-sm font-semibold text-brand-800 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-50"
                    >
                      Saber mais
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Equipe />
      <DiferenciaisServicos />
      <CtaFinal />
    </>
  );
}
