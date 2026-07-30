"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  EarOff,
  Headphones,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { aparelhos, contato } from "@/lib/site";
import { PageHero } from "./page-hero";
import { Reveal } from "./reveal";

const iconePorTipo = {
  RIC: Headphones,
  BTE: Headphones,
  ITE: EarOff,
} as const;

export function Aparelhos() {
  const [busca, setBusca] = useState("");
  const [marca, setMarca] = useState<string>("Todas");
  const [tipo, setTipo] = useState<string>("Todos");

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return aparelhos.itens.filter((item) => {
      if (marca !== "Todas" && item.marca !== marca) return false;
      if (tipo !== "Todos" && item.tipo !== tipo) return false;
      if (
        termo &&
        !`${item.marca} ${item.modelo}`.toLowerCase().includes(termo)
      )
        return false;
      return true;
    });
  }, [busca, marca, tipo]);

  return (
    <>
      <PageHero
        pagina="Aparelhos"
        titulo={aparelhos.titulo}
        subtitulo={aparelhos.subtitulo}
      />

      <section id="catalogo" className="scroll-mt-32 pb-20 pt-4 md:pb-24">
        <div className="container-site">
          <Reveal>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
              <div className="flex items-center gap-2 text-brand-800">
                <SlidersHorizontal size={18} />
                <h2 className="font-display text-base font-semibold">
                  Filtros
                </h2>
              </div>

              <div className="relative mt-5">
                <Search
                  size={17}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Buscar por nome ou marca..."
                  className="w-full rounded-xl border border-gray-200 bg-surface py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition-colors focus:border-brand-400"
                />
              </div>

              <div className="mt-5">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Marca
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {["Todas", ...aparelhos.marcas].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMarca(m)}
                      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                        marca === m
                          ? "bg-brand-800 text-white"
                          : "bg-surface text-gray-600 hover:bg-brand-50"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Tipo
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setTipo("Todos")}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                      tipo === "Todos"
                        ? "bg-brand-800 text-white"
                        : "bg-surface text-gray-600 hover:bg-brand-50"
                    }`}
                  >
                    Todos
                  </button>
                  {aparelhos.tipos.map((t) => (
                    <button
                      key={t.valor}
                      type="button"
                      onClick={() => setTipo(t.valor)}
                      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                        tipo === t.valor
                          ? "bg-brand-800 text-white"
                          : "bg-surface text-gray-600 hover:bg-brand-50"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <p className="mt-8 text-sm text-gray-500">
            {filtrados.length}{" "}
            {filtrados.length === 1
              ? "aparelho encontrado"
              : "aparelhos encontrados"}
          </p>

          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtrados.map((item, i) => {
              const Icone = iconePorTipo[item.tipo];

              return (
                <Reveal key={`${item.marca}-${item.modelo}`} delay={i * 0.05}>
                  <article className="h-full rounded-2xl border border-gray-200 bg-white p-6">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-500 text-white">
                        <Icone size={19} />
                      </span>
                      <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">
                        {item.marca}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-base font-semibold">
                      {item.modelo}
                    </h3>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-400">
                      {aparelhos.tipos.find((t) => t.valor === item.tipo)
                        ?.label ?? item.tipo}
                    </p>
                    <p className="mt-3 text-sm text-gray-500">
                      {item.descricao}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>

          {filtrados.length === 0 && (
            <p className="mt-10 text-center text-sm text-gray-500">
              Nenhum aparelho encontrado com esses filtros.
            </p>
          )}

          <Reveal delay={0.1} className="mt-10">
            <div className="flex flex-col items-center justify-between gap-5 rounded-2xl bg-gradient-to-br from-brand-800 via-brand-700 to-brand-500 px-8 py-8 text-center sm:flex-row sm:text-left">
              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  {aparelhos.destaque.titulo}
                </h2>
                <p className="mt-1.5 max-w-lg text-sm text-blue-100">
                  {aparelhos.destaque.texto}
                </p>
              </div>
              <a
                href={contato.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-brand-800 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
              >
                Agendar teste domiciliar
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Guia de tipos — conteúdo de decisão, não de catálogo. Clicar num
          card aplica o filtro correspondente lá em cima, então a página
          responde ao guia em vez de só explicar. */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-site">
          <div className="text-center">
            <span className="inline-block rounded-full bg-brand-50 px-4 py-1.5">
              <span className="kicker">{aparelhos.guia.kicker}</span>
            </span>
            <h2 className="mx-auto mt-5 max-w-2xl text-3xl md:text-4xl">
              {aparelhos.guia.titulo}
            </h2>
            <span className="rule-underline" />
            <p className="mx-auto mt-8 max-w-2xl text-gray-500">
              {aparelhos.guia.subtitulo}
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {aparelhos.guia.tipos.map((item, i) => {
              const Icone = iconePorTipo[item.valor];

              return (
                <Reveal key={item.valor} delay={i * 0.1}>
                  <article className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-8">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-500 text-white shadow-lg shadow-brand-800/20">
                      <Icone size={22} />
                    </span>
                    <h3 className="mt-5 font-display text-base font-semibold">
                      {item.nome}
                    </h3>
                    <p className="mt-2.5 text-sm text-gray-500">
                      {item.resumo}
                    </p>

                    <p className="mt-4 rounded-lg bg-brand-50 px-3.5 py-2.5 text-xs text-brand-800">
                      <strong className="font-semibold">Indicado para:</strong>{" "}
                      {item.indicado}
                    </p>

                    <ul className="mt-5 flex-1 space-y-2.5">
                      {item.pontos.map((ponto) => (
                        <li key={ponto} className="flex items-start gap-2.5">
                          <Check
                            size={15}
                            className="mt-1 shrink-0 text-brand-600"
                          />
                          <span className="text-sm text-gray-600">{ponto}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() => {
                        setTipo(item.valor);
                        setMarca("Todas");
                        setBusca("");
                        document
                          .getElementById("catalogo")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="mt-7 inline-flex items-center justify-center gap-1.5 rounded-xl border border-brand-200 px-6 py-3 text-sm font-semibold text-brand-800 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-50"
                    >
                      Ver modelos
                      <ArrowRight size={15} />
                    </button>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Marcas --------------------------------------------------------- */}
      <section className="py-20 md:py-28">
        <div className="container-site">
          <div className="text-center">
            <span className="inline-block rounded-full bg-brand-50 px-4 py-1.5">
              <span className="kicker">Marcas</span>
            </span>
            <h2 className="mx-auto mt-5 max-w-2xl text-3xl md:text-4xl">
              Com quem trabalhamos
            </h2>
            <span className="rule-underline" />
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {aparelhos.marcasInfo.map((marcaInfo, i) => {
              /* Contagem derivada do catálogo, nunca digitada — se um modelo
                 for adicionado ou removido, o número acompanha sozinho. */
              const total = aparelhos.itens.filter(
                (item) => item.marca === marcaInfo.nome,
              ).length;

              return (
                <Reveal key={marcaInfo.nome} delay={i * 0.1}>
                  <article className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-8">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-lg font-semibold">
                        {marcaInfo.nome}
                      </h3>
                      <span className="shrink-0 text-xs text-gray-400">
                        {marcaInfo.origem}
                      </span>
                    </div>
                    <p className="mt-3 flex-1 text-sm text-gray-500">
                      {marcaInfo.texto}
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setMarca(marcaInfo.nome);
                        setTipo("Todos");
                        setBusca("");
                        document
                          .getElementById("catalogo")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-medium text-brand-600 transition-colors hover:text-brand-800"
                    >
                      {total} {total === 1 ? "modelo" : "modelos"}
                      <ArrowRight size={15} />
                    </button>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
