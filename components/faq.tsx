"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  MessageCircle,
  Search,
} from "lucide-react";
import { contato, faq } from "@/lib/site";
import { PageHero } from "./page-hero";
import { Reveal } from "./reveal";

export function Faq() {
  const [busca, setBusca] = useState("");
  /* chave "categoria-índice" do item aberto — só um por vez. */
  const [aberto, setAberto] = useState<string | null>("0-0");

  const categoriasFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return faq.categorias;

    /* Busca também no corpo da resposta: quem digita "domiciliar" ou
       "garantia" quer achar a pergunta que TRATA do assunto, não só a que
       tem a palavra no título. */
    return faq.categorias
      .map((cat) => ({
        ...cat,
        itens: cat.itens.filter(
          (item) =>
            item.pergunta.toLowerCase().includes(termo) ||
            item.resposta.toLowerCase().includes(termo),
        ),
      }))
      .filter((cat) => cat.itens.length > 0);
  }, [busca]);

  return (
    <>
      <PageHero pagina="FAQ" titulo={faq.titulo} subtitulo={faq.subtitulo} />

      <section className="pb-20 pt-4 md:pb-28">
        <div className="container-site max-w-3xl">
          <Reveal>
            <div className="relative">
              <Search
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar dúvida..."
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition-colors focus:border-brand-400"
              />
            </div>
          </Reveal>

          <div className="mt-10 space-y-10">
            {categoriasFiltradas.map((categoria, ci) => (
              <div key={categoria.nome}>
                <Reveal>
                  <h2 className="font-display text-lg font-semibold text-brand-800">
                    {categoria.nome}
                  </h2>
                </Reveal>

                <div className="mt-4 space-y-3">
                  {categoria.itens.map((item, ii) => {
                    const chave = `${ci}-${ii}`;
                    const estaAberto = aberto === chave;

                    return (
                      <Reveal key={item.pergunta} delay={ii * 0.05}>
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                          <button
                            type="button"
                            onClick={() =>
                              setAberto(estaAberto ? null : chave)
                            }
                            aria-expanded={estaAberto}
                            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                          >
                            <span className="text-sm font-medium">
                              {item.pergunta}
                            </span>
                            <ChevronDown
                              size={18}
                              className={`shrink-0 text-brand-600 transition-transform duration-300 ${
                                estaAberto ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          <AnimatePresence initial={false}>
                            {estaAberto && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{
                                  duration: 0.26,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                                className="overflow-hidden"
                              >
                                <p className="px-5 pb-4 text-sm leading-relaxed text-gray-500">
                                  {item.resposta}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            ))}

            {categoriasFiltradas.length === 0 && (
              <p className="text-center text-sm text-gray-500">
                Nenhuma pergunta encontrada para “{busca.trim()}”.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Faixa azul de fechamento — vista no print real do protótipo. */}
      <section className="pb-20 md:pb-28">
        <div className="container-site">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-700 to-brand-500 px-8 py-14 text-center md:px-16">
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
                  {faq.cta.titulo}
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-blue-100">
                  {faq.cta.texto}
                </p>

                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    href={contato.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-brand-800 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
                  >
                    <MessageCircle size={17} />
                    Falar no WhatsApp
                  </a>

                  <Link
                    href="/contato"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white/10 sm:w-auto"
                  >
                    Ver localização
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
