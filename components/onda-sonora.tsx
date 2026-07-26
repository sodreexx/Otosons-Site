"use client";

import { useSequenciaConcluida } from "@/lib/sequencia";

/*
 * Onda sonora que sai de trás do case quando o estojo termina de abrir.
 *
 * Como funciona: todos os fios nascem achatados sobre a linha do meio
 * (`scaleY` quase zero) e o SVG inteiro nasce recortado no centro. Primeiro o
 * recorte abre para os lados — é a "linha" disparando —, depois os fios se
 * expandem em cascata, revelando as nuances.
 *
 * A amplitude é modulada por um envelope que vale ~0 nas pontas e 1 no centro.
 * Como o case ocupa justamente o centro, o pico da onda fica escondido atrás
 * dele: a onda parece emanar de dentro do estojo em vez de passar por trás.
 */

const FIOS = 20;
const LARGURA = 1600;
const ALTURA = 200;
const MEIO = ALTURA / 2;
const PONTOS = 96;

/** ~0 nas extremidades, 1 no centro. É isso que afina as pontas. */
function envelope(t: number) {
  return Math.pow(Math.sin(Math.PI * t), 1.5);
}

/*
 * Soma de três senoides com frequências não múltiplas entre si: o padrão nunca
 * se repete dentro do quadro, que é o que dá o aspecto de forma de onda real em
 * vez de ondulação decorativa.
 */
function amostra(t: number, fase: number) {
  return (
    Math.sin(t * Math.PI * 6 + fase) * 0.55 +
    Math.sin(t * Math.PI * 10.5 + fase * 1.7) * 0.28 +
    Math.sin(t * Math.PI * 17 + fase * 2.3) * 0.17
  );
}

function caminho(fase: number) {
  let d = "";
  for (let i = 0; i <= PONTOS; i++) {
    const t = i / PONTOS;
    const y = MEIO + amostra(t, fase) * envelope(t) * MEIO * 0.92;
    d += `${i === 0 ? "M" : "L"}${(t * LARGURA).toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

/* Determinístico: mesmo resultado no servidor e no cliente, sem risco de
   divergência de hidratação. */
const CAMINHOS = Array.from({ length: FIOS }, (_, i) => caminho(i * 0.42));

export function OndaSonora() {
  const ativa = useSequenciaConcluida();

  return (
    <div
      aria-hidden
      data-onda={ativa ? "ativa" : undefined}
      /* inset-y-0 + h-full: a altura é a do wrapper do case, que por sua vez é
         a da própria imagem. A onda não tem como ultrapassar o estojo
         verticalmente — a restrição é estrutural, não um número calibrado. */
      className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-[min(1600px,190vw)] -translate-x-1/2"
    >
      {/* halo que acende junto com a onda: reforça o "som saindo" sem
          acrescentar nenhum elemento que a pessoa perceba como objeto */}
      <div className="onda-halo absolute left-1/2 top-1/2 h-[130%] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-onda/15 blur-3xl" />

      <svg
        viewBox={`0 0 ${LARGURA} ${ALTURA}`}
        preserveAspectRatio="none"
        className="onda-clip h-full w-full"
      >
        <defs>
          <linearGradient id="onda-gradiente" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--color-hero-cta)" stopOpacity="0" />
            <stop
              offset="0.18"
              stopColor="var(--color-hero-cta)"
              stopOpacity="0.5"
            />
            <stop offset="0.5" stopColor="var(--color-onda)" stopOpacity="0.9" />
            <stop
              offset="0.82"
              stopColor="var(--color-hero-cta)"
              stopOpacity="0.5"
            />
            <stop offset="1" stopColor="var(--color-hero-cta)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {CAMINHOS.map((d, i) => (
          <path
            key={i}
            d={d}
            className="onda-fio"
            fill="none"
            stroke="url(#onda-gradiente)"
            strokeWidth={1.15}
            /* o viewBox é esticado na vertical; sem isso o traço engrossaria
               junto e a onda viraria um borrão */
            vectorEffect="non-scaling-stroke"
            style={{ animationDelay: `${400 + i * 30}ms` }}
          />
        ))}
      </svg>
    </div>
  );
}
