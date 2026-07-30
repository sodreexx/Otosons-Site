import { ExternalLink, Quote, Star } from "lucide-react";
import { contato, depoimentos } from "@/lib/site";
import { CtaFinal } from "./cta-final";
import { Estatisticas } from "./estatisticas";
import { Video } from "./midia";
import { PageHero } from "./page-hero";
import { CabecalhoSecao } from "./secao";
import { Reveal } from "./reveal";

function Estrelas({ tamanho = 14 }: { tamanho?: number }) {
  return (
    <span className="flex items-center gap-0.5 text-brand-600" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={tamanho} className="fill-current" />
      ))}
    </span>
  );
}

export function Depoimentos() {
  return (
    <>
      <PageHero
        pagina="Depoimentos"
        titulo={depoimentos.titulo}
        subtitulo={depoimentos.subtitulo}
      />

      <Estatisticas />

      <section className="py-16 md:py-20">
        <div className="container-site">
          <CabecalhoSecao
            kicker={depoimentos.kicker}
            titulo="O que dizem nossos clientes"
          />

          <Reveal className="mt-6 text-center">
            <a
              href={contato.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 transition-colors hover:border-brand-200 hover:text-brand-800"
            >
              <Estrelas />
              <span className="font-medium">
                {contato.notaGoogle.toLocaleString("pt-BR")}
              </span>
              <span className="text-gray-400">·</span>
              <span>{contato.avaliacoesGoogle} avaliações no Google</span>
            </a>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {depoimentos.itens.map((item, i) => (
              <Reveal key={item.nome} delay={i * 0.12}>
                <figure className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-8">
                  <div className="flex items-center justify-between">
                    <Estrelas />
                    <Quote size={22} className="shrink-0 text-brand-200" />
                  </div>

                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-gray-600">
                    {item.texto}
                  </blockquote>

                  <figcaption className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-5">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 font-display text-sm font-semibold text-brand-800">
                      {item.nome.charAt(0)}
                    </span>
                    <span>
                      <span className="block font-display text-sm font-semibold">
                        {item.nome}
                      </span>
                      <span className="block text-xs text-gray-400">
                        Avaliação no Google
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimento em vídeo. O espaço já está montado; enquanto o arquivo
          não existir em /public/videos, entra o placeholder. */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-site">
          <CabecalhoSecao
            kicker={depoimentos.video.kicker}
            titulo={depoimentos.video.titulo}
            subtitulo={depoimentos.video.texto}
          />

          <Reveal className="mt-14">
            <div className="relative mx-auto aspect-video max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-gray-900">
              <Video
                src={depoimentos.video.arquivo}
                poster={depoimentos.video.poster}
                titulo="Depoimento de paciente da Otosons"
                rotulo="Depoimento em vídeo"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Convite para avaliar ------------------------------------------ */}
      <section className="py-20 md:py-24">
        <div className="container-site">
          <Reveal>
            <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-gray-200 bg-white px-8 py-10 text-center sm:flex-row sm:text-left">
              <div>
                <h2 className="font-display text-xl font-semibold">
                  {depoimentos.convite.titulo}
                </h2>
                <p className="mt-2 max-w-lg text-sm text-gray-500">
                  {depoimentos.convite.texto}
                </p>
              </div>

              <a
                href={contato.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-800 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-700"
              >
                {depoimentos.convite.acao}
                <ExternalLink size={15} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaFinal />
    </>
  );
}
