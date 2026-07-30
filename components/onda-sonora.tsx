"use client";

import { useEffect, useRef } from "react";

import { useSequenciaConcluida } from "@/lib/sequencia";

/*
 * Onda sonora que sai de trás do case quando o estojo termina de abrir.
 *
 * O modelo é uma FITA TORCIDA, não um feixe de fios independentes: cada path é
 * uma seção transversal da mesma superfície. Onde a fita fica de perfil todos os
 * fios se encontram (os nós escuros); entre nós ela abre em leques de arcos
 * aninhados. É isso que mantém o desenho organizado — fios nunca se cruzam fora
 * dos nós.
 *
 * Entrada: os fios nascem achatados sobre a linha do meio (`scaleY` quase zero)
 * e o SVG inteiro nasce recortado no centro. O recorte abre para os lados — a
 * "linha" disparando — e então os fios se expandem em cascata.
 *
 * Depois da entrada a fita não congela: a torção deriva devagar (os nós
 * caminham) e a amplitude respira. Ver ANIMAÇÃO, no fim do arquivo.
 */

const FIOS = 48;
const LARGURA = 1600;
const ALTURA = 200;
const MEIO = ALTURA / 2;
const PONTOS = 200;

/** Sino gaussiano: vale 1 em `c` e cai a ~0 com meia-largura `s`. */
function sino(t: number, c: number, s: number) {
  return Math.exp(-(((t - c) / s) ** 2));
}

/*
 * ~0 nas extremidades — é o que fecha a fita em bico exatamente na borda.
 *
 * Expoente 0.3, não 0.7. Com 0.7 o envelope começava a fechar cedo demais e a
 * fita chegava achatada na borda: media menos de 7px de altura nos 10% da
 * esquerda e nos 15% da direita, ou seja, os 48 fios empilhados num traço
 * horizontal. Era a "linha que sobrava depois que a onda abria".
 *
 * Com 0.3 a amplitude se sustenta quase até o fim e o fechamento acontece nos
 * últimos 0,4% — aí sim um bico, não uma linha.
 */
function envelope(t: number) {
  return Math.pow(Math.sin(Math.PI * t), 0.3);
}

/*
 * Posição do k-ésimo lóbulo.
 *
 * torcao() dá 9 meias-voltas ao longo da largura, então existem 10 pontos de
 * abertura máxima: k/9, para k de 0 a 9 — INCLUINDO as duas bordas. Amarrar os
 * lóbulos a essa grade é o que garante que cada um caia onde a fita está
 * aberta, e não sobre um nó.
 */
const L = (k: number) => k / 9;

/*
 * A LINHA CENTRAL da fita. Não é senoide: são os lóbulos da imagem de
 * referência do cliente, um a um, com posição e altura lidas da imagem —
 * pico dominante em t=0.45 (a faixa coberta pelo case, para o som "sair" de
 * dentro dele), vale fundo logo à esquerda, ondulações menores morrendo em
 * direção às pontas.
 */
function centro(t: number) {
  return (
    0.1 * sino(t, L(1), 0.05) +
    0.32 * sino(t, L(2), 0.05) -
    0.65 * sino(t, L(3), 0.045) +
    0.9 * sino(t, L(4), 0.05) -
    0.38 * sino(t, L(5), 0.06) +
    0.22 * sino(t, L(6), 0.06) -
    0.1 * sino(t, L(7), 0.05) +
    /* Slot 8 é novo: antes o último lóbulo era o 7, e daí até a borda direita
       sobravam 15% de largura sem nada — a fita ia embora chapada. */
    0.05 * sino(t, L(8), 0.05)
  );
}

/** MEIA-LARGURA da fita: larga nos lóbulos, estreita entre eles. */
function abertura(t: number) {
  return (
    envelope(t) *
    (0.12 +
      0.55 * sino(t, L(4), 0.07) +
      0.25 * sino(t, L(3), 0.05) +
      0.2 * sino(t, L(2), 0.06) +
      0.18 * sino(t, L(5), 0.07) +
      0.12 * sino(t, L(6), 0.06) +
      /* Os cinco de baixo são novos. Sem eles a fita só tinha largura entre
         os lóbulos 2 e 6 e morria muito antes das bordas — que é o que o
         cliente viu como linha sobrando nas laterais. */
      0.1 * sino(t, L(1), 0.06) +
      0.1 * sino(t, L(7), 0.06) +
      0.09 * sino(t, L(0), 0.06) +
      0.09 * sino(t, L(8), 0.06) +
      0.09 * sino(t, L(9), 0.06))
  );
}

/*
 * TORÇÃO: a fita gira ao longo do percurso. Onde cos(torção) = 0 ela fica de
 * perfil e todos os fios se encontram — são os nós escuros da referência;
 * onde cos = ±1 ela abre por inteiro — os leques de arcos aninhados.
 *
 * O offset de −0.05 que existia aqui foi REMOVIDO. Ele deslocava a grade de
 * aberturas para 0.006…0.894, então a última abertura ficava a 11% da borda
 * direita e depois dela só havia um nó — e nó é justamente onde os fios
 * convergem. Resultado: a fita chegava na borda de perfil, como um traço.
 * Sem o offset a grade é k/9 exato e as bordas caem em abertura máxima, com o
 * envelope fechando o bico por cima disso.
 */
function torcao(t: number) {
  return Math.PI * 9 * t;
}

/*
 * `centro`, `abertura` e `torcao` só dependem de t — o tempo entra apenas como
 * fase somada à torção. Então tudo isso é calculado UMA vez e o laço de
 * animação só refaz o cosseno. Os prefixos já carregam o x, que nunca muda:
 * por ponto sobra um cos, meia dúzia de multiplicações e um arredondamento.
 */
const PREFIXOS: string[] = [];
const C: number[] = [];
const A: number[] = [];
const T: number[] = [];

for (let i = 0; i <= PONTOS; i++) {
  const t = i / PONTOS;
  /* Sem toFixed: com LARGURA=1600 e PONTOS=200, x = i*8 é sempre inteiro, e o
     `.0` forçado custava 8 KB de HTML na home (201 pontos × 48 fios) sem mudar
     um pixel. O y continua com 1 decimal — ali a precisão importa, porque 1
     unidade de viewBox vale ~1,4px em tela. */
  PREFIXOS.push(`${i === 0 ? "M" : "L"}${t * LARGURA} `);
  C.push(centro(t));
  A.push(abertura(t));
  T.push(torcao(t));
}

/* 1.569 = máx de |centro| + abertura ao longo de toda a largura (fica em
   t=0.444, o lóbulo dominante). Normaliza para a fita nunca estourar o
   viewBox. Verificado varrendo 60 fases da deriva com o respiro no máximo: a
   fita fica entre y=4.8 e y=163.4 num viewBox de 0..200. */
const ESCALA = (MEIO * 0.92) / 1.569;

/**
 * Um fio da fita.
 *
 * @param u    posição na seção transversal, em [−1, 1]
 * @param fase deriva da torção (0 = estado inicial, servido pelo servidor)
 * @param respiro multiplicador de amplitude (1 = repouso)
 */
function caminho(u: number, fase: number, respiro: number) {
  let d = "";
  for (let i = 0; i <= PONTOS; i++) {
    /* O u·0.35 defasa a torção de fio para fio: o cruzamento vira uma cintura
       apertada em vez de um ponto exato — como na imagem. */
    const secao = C[i] + u * A[i] * Math.cos(T[i] + u * 0.35 + fase);
    /* Sinal negativo porque o y do SVG cresce para BAIXO — sem ele a onda
       renderiza de cabeça para baixo, com o pico dominante virando vale. */
    const y = MEIO - secao * respiro * ESCALA;
    d += PREFIXOS[i] + Math.round(y * 10) / 10;
  }
  return d;
}

const US = Array.from({ length: FIOS }, (_, i) => (i / (FIOS - 1)) * 2 - 1);

/* Estado de repouso, renderizado no servidor. Determinístico: mesmo resultado
   nos dois lados, sem risco de divergência de hidratação. */
const CAMINHOS = US.map((u) => caminho(u, 0, 1));

/*
 * ANIMAÇÃO — dois movimentos lentos, de períodos primos entre si para o
 * conjunto nunca voltar visivelmente ao mesmo quadro.
 *
 * DERIVA: a fase da torção avança, o que faz os nós caminharem para a esquerda.
 * Como torcao() tem 9π ao longo da largura, 2π de fase move o padrão em 2/9 da
 * tela — em 26s isso dá ~22% da largura, devagar o bastante para ser percebido
 * como fluxo e não como animação.
 *
 * RESPIRO: ±3,5% de amplitude em 9s. É o que impede a fita de parecer um PNG
 * quando a deriva passa por um trecho de poucos nós.
 */
const DERIVA_MS = 26000;
const RESPIRO_MS = 9000;
const RESPIRO_AMPLITUDE = 0.035;
/* 30fps: o desenho é gigante em área e a diferença para 60fps não aparece num
   movimento desta lentidão — mas o consumo, sim. */
const QUADRO_MS = 1000 / 30;

/*
 * ENTRADA — escalonamento RADIAL, não por índice de fio.
 *
 * Antes o atraso crescia com i (0…47), ou seja, com u indo de −1 a +1: a fita
 * abria de uma borda à outra, como persiana. Agora cresce com |u|: os fios de
 * u≈0, que SÃO a linha central, abrem primeiro, e os pares simétricos saem
 * dela para cima e para baixo ao mesmo tempo.
 *
 * A linha não é substituída pela onda — ela vira a onda, abrindo dos dois
 * lados. É o que faltava para a transição não parecer um corte.
 */
const ENTRADA_BASE_MS = 260;
const ENTRADA_ESPALHAMENTO_MS = 520;


export function OndaSonora() {
  const ativa = useSequenciaConcluida();
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ativa) return;

    const svg = svgRef.current;
    if (!svg) return;

    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (semMovimento.matches) return;

    const fios = Array.from(svg.querySelectorAll<SVGPathElement>(".onda-fio"));
    if (fios.length === 0) return;

    /* Sem isso o laço continua rodando com a página fora da tela: o hero fica
       no topo, e quem desce para os Serviços não vê nada além de bateria
       gasta. */
    let visivel = true;
    const observador = new IntersectionObserver(
      ([entrada]) => {
        visivel = entrada.isIntersecting;
      },
      { rootMargin: "80px" },
    );
    observador.observe(svg);

    let pedido = 0;
    let ultimo = 0;

    const passo = (agora: number) => {
      pedido = requestAnimationFrame(passo);

      if (!visivel || document.hidden) return;
      if (agora - ultimo < QUADRO_MS) return;
      ultimo = agora;

      const fase = (agora / DERIVA_MS) * Math.PI * 2;
      const respiro =
        1 + RESPIRO_AMPLITUDE * Math.sin((agora / RESPIRO_MS) * Math.PI * 2);

      for (let i = 0; i < fios.length; i++) {
        fios[i].setAttribute("d", caminho(US[i], fase, respiro));
      }
    };

    pedido = requestAnimationFrame(passo);

    return () => {
      cancelAnimationFrame(pedido);
      observador.disconnect();
    };
  }, [ativa]);

  return (
    <div
      aria-hidden
      data-onda={ativa ? "ativa" : undefined}
      /* inset-y-0 + h-full: a altura é a do wrapper do case, que por sua vez é
         a da própria imagem. A onda não tem como ultrapassar o estojo
         verticalmente — a restrição é estrutural, não um número calibrado.

         w-screen: a onda vai de borda a borda da viewport, pedido do cliente.
         O envelope zera nas pontas, então ela termina em bico exatamente na
         borda — sem corte seco. O overflow-hidden da section do hero absorve
         o excesso de 100vw quando há barra de rolagem vertical.

         hidden até md: no mobile o case ocupa quase toda a largura da tela,
         então a onda não tem onde "sair de trás dele" — sobra só um traço
         fino nas pontas. Removida a pedido do cliente nesse tamanho de tela. */
      className="pointer-events-none absolute inset-y-0 left-1/2 z-0 hidden w-screen -translate-x-1/2 md:block"
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${LARGURA} ${ALTURA}`}
        preserveAspectRatio="none"
        className="onda-clip h-full w-full"
      >
        {CAMINHOS.map((d, i) => (
          <path
            key={i}
            d={d}
            className="onda-fio"
            fill="none"
            /* Azul único e sólido de ponta a ponta, como na referência. */
            stroke="var(--color-onda)"
            strokeWidth={0.8}
            /* Cada fio é translúcido de propósito: nos nós e nas pontas, onde
               os fios convergem, a sobreposição empilha e satura sozinha —
               são as "lanças" e os nós escuros da referência. Saturação por
               densidade, não por cor. */
            strokeOpacity={0.35}
            /* o viewBox é esticado na vertical; sem isso o traço engrossaria
               junto e a onda viraria um borrão */
            vectorEffect="non-scaling-stroke"
            /* Radial: |u|, não i. Ver ENTRADA. */
            style={{
              animationDelay: `${
                ENTRADA_BASE_MS + Math.abs(US[i]) * ENTRADA_ESPALHAMENTO_MS
              }ms`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
