import { CheckCircle2, Compass, Target } from "lucide-react";
import { comoChegar, sobre } from "@/lib/site";
import { CtaFinal } from "./cta-final";
import { Estatisticas } from "./estatisticas";
import { Foto } from "./midia";
import { PageHero } from "./page-hero";
import { CabecalhoSecao } from "./secao";
import { Reveal } from "./reveal";

/* Reaproveita a foto já gerada para "Testes Auditivos" em Serviços — mesma
   cena (fonoaudióloga atendendo paciente) funciona bem aqui também, e assim
   não duplica geração de imagem para o mesmo tipo de cena. */
const FOTO_ATENDIMENTO = "/images/servicos/testes-auditivos.webp";

/* Slots reservados: assim que o arquivo existir em /public, a foto entra
   sozinha no lugar do placeholder. Ver PROMPTS-MIDIA.md. */
const FOTO_FACHADA = "/images/sobre/fachada.webp";
const FOTO_INTERIOR = "/images/sobre/interior-loja.webp";
const FOTO_CABINE = "/images/sobre/cabine-audiometria.webp";

export function Sobre() {
  return (
    <>
      <PageHero
        pagina="Sobre"
        titulo={sobre.titulo}
        subtitulo={sobre.subtitulo}
      />

      <section className="py-16 md:py-20">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Reveal direcao="right">
              <div className="relative h-72 overflow-hidden rounded-2xl bg-gray-700 md:h-full md:min-h-[420px]">
                <Foto
                  src={FOTO_ATENDIMENTO}
                  alt="Fonoaudióloga da Otosons realizando atendimento auditivo em paciente"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  rotulo="Atendimento"
                />
              </div>
            </Reveal>

            <div className="flex flex-col gap-6">
              <Reveal delay={0.08}>
                <div className="rounded-2xl border border-gray-200 bg-white p-7">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-500 text-white">
                    <Target size={19} />
                  </span>
                  <h2 className="mt-4 font-display text-lg font-semibold">
                    Nossa Missão
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">{sobre.missao}</p>
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="rounded-2xl border border-gray-200 bg-white p-7">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-500 text-white">
                    <Compass size={19} />
                  </span>
                  <h2 className="mt-4 font-display text-lg font-semibold">
                    Nossa Visão
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">{sobre.visao}</p>
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.2} className="mt-10">
            <div className="rounded-2xl bg-surface p-8 md:p-10">
              <p className="max-w-3xl text-base leading-relaxed text-gray-600">
                {sobre.historia}
              </p>

              <ul className="mt-7 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                {sobre.valores.map((valor) => (
                  <li key={valor} className="flex items-start gap-3 text-sm">
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-brand-600"
                    />
                    <span className="text-gray-700">{valor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <Estatisticas />

      {/* Linha do tempo ------------------------------------------------ */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-site">
          <CabecalhoSecao
            kicker="Nossa história"
            titulo="Duas décadas cuidando da audição de Niterói"
          />

          <ol className="relative mx-auto mt-14 max-w-3xl">
            {/* Fio vertical que liga os marcos. Só do 1º ao último ponto —
                por isso o inset vertical, e não `inset-y-0`. */}
            <span
              aria-hidden
              className="absolute bottom-6 left-[15px] top-6 w-px bg-brand-200 md:left-[19px]"
            />

            {sobre.marcos.map((marco, i) => (
              <li key={marco.titulo} className="relative pl-12 pb-10 last:pb-0 md:pl-16">
                {/* Fora do <Reveal> de propósito: o Reveal é um motion.div com
                    `transform`, e elemento transformado vira bloco de contenção
                    de descendente absoluto — dentro dele, `left-0` passaria a
                    ser a borda do texto, e a bolinha cairia em cima do título. */}
                <span className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand-800 text-[11px] font-semibold text-white ring-4 ring-surface md:h-10 md:w-10 md:text-xs">
                  {i + 1}
                </span>

                <Reveal delay={i * 0.08}>
                  {marco.ano ? (
                    <span className="font-display text-sm font-semibold text-brand-600">
                      {marco.ano}
                    </span>
                  ) : null}
                  <h3 className="mt-0.5 font-display text-lg font-semibold">
                    {marco.titulo}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm text-gray-500">
                    {marco.texto}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Estrutura ------------------------------------------------------ */}
      <section className="py-20 md:py-28">
        <div className="container-site">
          <CabecalhoSecao
            kicker="Nossa estrutura"
            titulo="Um espaço pensado para o seu conforto"
            subtitulo="Sala de espera acolhedora, cabine acústica para audiometria e bancada de manutenção — tudo no mesmo lugar, em Icaraí."
          />

          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <figure className="relative h-64 overflow-hidden rounded-2xl bg-gray-200 md:h-80">
                <Foto
                  src={FOTO_INTERIOR}
                  alt="Área de atendimento da loja Otosons em Icaraí, Niterói"
                  sizes="(max-width: 768px) 100vw, 58vw"
                  rotulo="Interior da loja"
                />
              </figure>
            </Reveal>

            <Reveal className="md:col-span-5" delay={0.08}>
              <figure className="relative h-64 overflow-hidden rounded-2xl bg-gray-200 md:h-80">
                <Foto
                  src={FOTO_CABINE}
                  alt="Cabine acústica usada nos exames de audiometria da Otosons"
                  sizes="(max-width: 768px) 100vw, 42vw"
                  rotulo="Cabine de audiometria"
                />
              </figure>
            </Reveal>

            <Reveal className="md:col-span-12" delay={0.16}>
              <figure className="relative h-56 overflow-hidden rounded-2xl bg-gray-200 md:h-72">
                <Foto
                  src={FOTO_FACHADA}
                  alt="Fachada da Otosons na Rua Gavião Peixoto, Icaraí, Niterói"
                  sizes="100vw"
                  rotulo="Fachada"
                />
              </figure>
            </Reveal>
          </div>

          {/* Como chegar — conteúdo local, ajuda tanto o visitante quanto a
              busca por "aparelho auditivo perto de mim". */}
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {comoChegar.map((item, i) => (
              <Reveal key={item.titulo} delay={i * 0.08}>
                <article className="h-full rounded-2xl border border-gray-200 bg-white p-6">
                  <h3 className="font-display text-base font-semibold">
                    {item.titulo}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">{item.texto}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaFinal />
    </>
  );
}
