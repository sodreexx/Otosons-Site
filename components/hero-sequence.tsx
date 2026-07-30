"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useSplashConcluido } from "@/lib/splash";
import { concluirSequencia } from "@/lib/sequencia";

const FPS = 30;

/**
 * O aparelho é dimensionado pela ALTURA da viewport, não pela largura.
 *
 * Num hero de tela cheia a altura é o recurso escasso: com largura fixa, um
 * notebook de 768px de altura estouraria o layout e empurraria o CTA para
 * fora da tela. O clamp garante um mínimo legível, cresce com a tela e para
 * de crescer em monitores grandes.
 */
/*
 * `100svh - 400px` reserva altura fixa para header, título, subtítulo, CTA e
 * respiros; o que sobra vai para o aparelho. Sem essa reserva, em telas
 * baixas o estojo comia o espaço do CTA e o empurrava para fora da tela.
 */
const TAMANHO =
  "h-[clamp(140px,min(35svh,calc(100svh-480px)),300px)] w-auto max-w-full md:h-[clamp(240px,min(43svh,calc(100svh-430px)),540px)]";

/**
 * Reproduz a sequência de frames do aparelho uma única vez e congela no
 * último frame.
 *
 * Detalhes que importam:
 * - O download começa no `mount`, mas a reprodução só começa quando o
 *   preloader sai. Os ~3s de cortina são exatamente a janela necessária para
 *   baixar os 2,5 MB de frames — quando a splash sobe, a animação já está
 *   pronta e roda sem engasgo.
 * - Todos os frames são decodificados ANTES de começar. Sem isso, a troca de
 *   `src` no meio da animação causa piscada branca.
 * - O avanço é por tempo decorrido (`performance.now`), não "+1 frame por
 *   tick". A duração é a mesma em tela de 60Hz e de 144Hz, e um engasgo pula
 *   frames em vez de deixar a animação em câmera lenta.
 * - Quem tem prefers-reduced-motion vai direto para o último frame.
 */
export function HeroSequence({
  frames,
  poster,
  alt,
}: {
  frames: string[];
  poster: string | null;
  alt: string;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const semMovimento = useReducedMotion();
  const splashConcluido = useSplashConcluido();
  const [carregado, setCarregado] = useState(frames.length === 0);

  /* Download e decodificação — independem da splash. */
  useEffect(() => {
    if (frames.length === 0) return;
    let cancelado = false;

    void Promise.all(
      frames.slice(1).map(async (src) => {
        const img = new window.Image();
        /*
         * Prioridade BAIXA nos 120 frames seguintes.
         *
         * Eles disparam todos de uma vez no mount. Na prioridade padrão os 120
         * competem com CSS, JS, fontes e com o frame 0 — que é o candidato a
         * LCP da home. Rebaixar aqui não atrasa a animação (ela só começa
         * quando a cortina sobe, ~3s depois) e libera a banda para o caminho
         * crítico. O frame 0 continua alto: tem <link rel="preload"
         * fetchPriority="high"> em hero.tsx.
         *
         * Navegador sem suporte ignora a propriedade — não há regressão.
         */
        img.fetchPriority = "low";
        img.src = src;
        try {
          await img.decode();
        } catch {
          /* frame corrompido não pode derrubar a animação inteira */
        }
      }),
    ).then(() => {
      if (!cancelado) setCarregado(true);
    });

    return () => {
      cancelado = true;
    };
  }, [frames]);

  /* Reprodução — espera os frames E a cortina subir. */
  useEffect(() => {
    if (frames.length === 0 || !carregado || !splashConcluido) return;

    const el = imgRef.current;
    if (!el) return;

    const ultimo = frames[frames.length - 1];

    if (semMovimento) {
      el.src = ultimo;
      concluirSequencia();
      return;
    }

    let raf = 0;
    const inicio = performance.now();

    const passo = (agora: number) => {
      const i = Math.floor(((agora - inicio) / 1000) * FPS);
      if (i >= frames.length - 1) {
        el.src = ultimo;
        /* estojo aberto: é a deixa da onda sonora sair de trás dele */
        concluirSequencia();
        return;
      }
      el.src = frames[i];
      raf = requestAnimationFrame(passo);
    };

    raf = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(raf);
  }, [frames, carregado, splashConcluido, semMovimento]);

  /* Sem frames na pasta: cai no poster estático. */
  if (frames.length === 0) {
    if (!poster) {
      return (
        <div
          className={`mx-auto flex aspect-[700/781] items-center justify-center rounded-3xl bg-gradient-to-br from-brand-50 to-brand-100 text-center text-sm text-brand-800/50 ${TAMANHO}`}
          role="img"
          aria-label={alt}
        >
          <span className="px-8">
            Coloque os frames em <code>public/hero-frames/</code>
          </span>
        </div>
      );
    }

    return (
      <motion.img
        src={poster}
        alt={alt}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        /* multiply apaga o fundo branco de fotos de produto que não vieram
           recortadas; em PNG com transparência não muda nada */
        className={`mx-auto mix-blend-multiply ${TAMANHO}`}
      />
    );
  }

  return (
    <motion.img
      ref={imgRef}
      src={frames[0]}
      alt={alt}
      /* Sem mix-blend aqui: os frames já vêm com canal alfa. Aplicar multiply
         tingiria o estojo branco com o azul do brilho de fundo. */
      /* `relative z-10`: sem posicionamento a img fica em fluxo normal e o SVG
         absoluto da onda pintaria POR CIMA dela. */
      className={`relative z-10 mx-auto select-none ${TAMANHO}`}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      fetchPriority="high"
      draggable={false}
    />
  );
}
