"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import { useSplashConcluido } from "@/lib/splash";

type Linha = { escuro: string; claro: string };

/**
 * Título do hero animado palavra por palavra.
 *
 * Cada palavra sobe de dentro de uma máscara (`overflow-hidden`), o que dá a
 * impressão de o texto ser revelado em vez de simplesmente aparecer. O stagger
 * é curto (35ms) — mais que isso e a frase demora a ficar legível.
 *
 * As linhas são sempre `block` — as 3 quebras fixas do mockup valem em
 * qualquer largura, inclusive no mobile. O que muda por breakpoint é só o
 * tamanho da fonte (`--hero-fonte`, em globals.css), pequeno o bastante no
 * mobile para cada linha caber sem quebrar de novo.
 */
export function HeroTexto({
  linhas,
  subtitulo,
  cta,
  ctaHref,
  atraso = 0,
}: {
  linhas: readonly Linha[];
  subtitulo: string;
  cta: string;
  ctaHref: string;
  atraso?: number;
}) {
  const semMovimento = useReducedMotion();
  /* Só entra depois que a cortina do preloader começa a subir. */
  const liberado = useSplashConcluido();

  const duracao = semMovimento ? 0 : 0.7;
  const stagger = semMovimento ? 0 : 0.035;
  const inicio = semMovimento ? 0 : atraso;

  const porLinha = linhas.map((linha) => [
    ...(linha.escuro ? linha.escuro.split(" ").map((p) => ({ p, claro: false })) : []),
    ...(linha.claro ? linha.claro.split(" ").map((p) => ({ p, claro: true })) : []),
  ]);

  const totalPalavras = porLinha.reduce((n, l) => n + l.length, 0);
  let indice = 0;

  return (
    /*
     * `flex-1` faz este bloco ocupar toda a altura que sobra do hero, e o
     * `mt-auto` mais abaixo empurra subtítulo + CTA para a base da tela.
     *
     * A margem negativa puxa o título para cima do aparelho até a base do
     * estojo encostar na terceira linha ("Valer a Pena"). O valor acompanha o
     * line-height — se mudar um, recalibre o outro.
     */
    <div className="hero-texto relative z-10 mx-auto flex w-full max-w-[920px] flex-col text-center">
      {/* Inter 400, sem tracking: é o que o CSS exportado do mockup especifica.
          O resto do site segue Poppins bold — o hero é a exceção, como já
          acontece com a paleta. */}
      <h1 className="hero-titulo font-sans font-normal">
        {porLinha.map((palavras, li) => (
          <span key={li} className="block">
            {palavras.map(({ p, claro }) => {
              const i = indice++;
              return (
                <span
                  key={`${li}-${i}`}
                  className="inline-block overflow-hidden pb-[0.12em] align-bottom"
                >
                  <motion.span
                    className={`inline-block ${claro ? "text-hero-muted" : "text-hero-ink"}`}
                    initial={{
                      y: semMovimento ? 0 : "100%",
                      opacity: semMovimento ? 1 : 0,
                    }}
                    animate={
                      liberado
                        ? { y: 0, opacity: 1 }
                        : { y: semMovimento ? 0 : "100%", opacity: semMovimento ? 1 : 0 }
                    }
                    transition={{
                      duration: duracao,
                      delay: inicio + i * stagger,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {p}
                  </motion.span>
                  {/* espaço fora da máscara, alargado para dar mais respiro entre as palavras */}
                  <span className="inline-block w-[0.32em]">&nbsp;</span>
                </span>
              );
            })}
          </span>
        ))}
      </h1>

      {/* Sem mt-auto: a sobra de altura agora fica acima do aparelho (ver
          hero.tsx), não entre o título e o subtítulo. */}
      <motion.p
        /* text-[13px] no mobile: o título ali só cabe em 3 linhas (ver
           --hero-fonte em globals.css) encolhendo até ~13-14px nas telas mais
           estreitas — com o subtítulo nos 16px de antes ele ficava MAIOR que
           o título, invertendo a hierarquia. */
        className="mx-auto max-w-[460px] pt-4 text-[13px] leading-[1.55] text-hero-subtle md:pt-5 md:text-[19px]"
        initial={{ opacity: 0, y: semMovimento ? 0 : 16 }}
        animate={liberado ? { opacity: 1, y: 0 } : { opacity: 0, y: semMovimento ? 0 : 16 }}
        transition={{
          duration: duracao,
          delay: inicio + totalPalavras * stagger + 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {subtitulo}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: semMovimento ? 0 : 16 }}
        animate={liberado ? { opacity: 1, y: 0 } : { opacity: 0, y: semMovimento ? 0 : 16 }}
        transition={{
          duration: duracao,
          delay: inicio + totalPalavras * stagger + 0.22,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 inline-flex items-center gap-2.5 rounded-2xl bg-hero-cta px-8 py-4 text-[15px] font-medium text-white shadow-lg shadow-hero-cta/25 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-xl hover:shadow-hero-cta/35 md:mt-7 md:px-10 md:py-[18px] md:text-[17px]"
        >
          <CalendarCheck
            size={20}
            className="transition-transform duration-300 group-hover:-rotate-6"
          />
          {cta}
        </a>
      </motion.div>
    </div>
  );
}
