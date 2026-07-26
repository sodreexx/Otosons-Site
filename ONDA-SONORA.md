# Onda sonora do hero — handoff

Documento de passagem. Um chat novo pode ler só este arquivo em vez de receber
tudo colado.

**Status: implementado e buildando limpo.** Falta validar o *ritmo* da animação
em navegador de verdade (ver "O que não foi verificado", no fim).

---

## 1. O que é

Uma onda sonora que sai de trás do estojo quando a animação de abertura do case
termina (frame 120 de 121).

Comportamento pedido pelo cliente, na ordem:

1. Nasce **atrás do case**, como uma linha horizontal fina.
2. A linha cresce para os dois lados até as extremidades laterais.
3. Ao chegar nas pontas, **abre** e revela as nuances — vários fios sobrepostos.
4. Fios **finos nas extremidades, largos no centro**.
5. **Nunca ultrapassa a altura do case.**

O pico da onda fica escondido atrás do estojo. É proposital: dá a impressão de
que o som emana de dentro do aparelho, em vez de a onda apenas passar por trás.

Referência visual: imagem de onda em azul/ciano com dezenas de fios formando um
padrão tipo moiré, fornecida pelo cliente.

---

## 2. Arquivos

| Arquivo | Papel |
|---|---|
| `lib/sequencia.ts` | pub/sub: avisa quando o frame 120 congela |
| `components/onda-sonora.tsx` | o SVG e o halo |
| `app/globals.css` | keyframes `onda-*`, token `--color-onda` |
| `components/hero-sequence.tsx` | chama `concluirSequencia()`; `relative z-10` na img |
| `components/hero.tsx` | monta `<OndaSonora />` dentro do wrapper do case |

---

## 3. As três decisões que não são óbvias

### 3.1 Por que pub/sub e não uma prop

`components/hero.tsx` é **Server Component**. Não pode ter estado nem passar
callback para client component — então `HeroSequence` não tem como avisar
`OndaSonora` por prop.

`lib/sequencia.ts` resolve com estado em escopo de módulo. Não inventei o
padrão: `lib/splash.ts` já fazia exatamente isso, pelo mesmo motivo (emissor e
ouvinte em ramos diferentes da árvore). Os dois arquivos são gêmeos.

```
concluirSequencia()      // HeroSequence chama ao congelar no frame 120
useSequenciaConcluida()  // OndaSonora escuta
```

### 3.2 A img precisa de `relative z-10`

A `<img>` do case estava em **fluxo normal** (não posicionada). Um SVG
`absolute` no mesmo container pinta **por cima** de conteúdo em fluxo, não
atrás — mesmo com `z-0`.

Sem `relative z-10` na img, a onda cobre o estojo. Foi o principal tropeço.

### 3.3 A altura é estrutural, não calibrada

O container da onda é `absolute inset-y-0` dentro do wrapper do case
(`<div className="relative z-0 mt-auto shrink-0">`). Como a `<img>` é o único
filho em fluxo, a altura do wrapper **é** a altura do case.

Ou seja: "não ultrapassar o case verticalmente" não é um número mágico que
precisa ser refeito a cada breakpoint — é consequência da estrutura. Medido:
387px em 1440×900 e 187px em 375×667, idêntico ao case nos dois.

---

## 4. Geometria

```
FIOS    = 20        // quantidade de fios
LARGURA = 1600      // viewBox
ALTURA  = 200       // viewBox
PONTOS  = 96        // resolução de cada path
```

- **Envelope** `sin(π·t)^1.5` — vale ~0 nas pontas e 1 no centro. É o que afina
  as extremidades.
- **Forma** — soma de 3 senoides de frequências não múltiplas
  (6, 10.5, 17 × π) com pesos 0.55 / 0.28 / 0.17. Não múltiplas de propósito:
  o padrão não se repete dentro do quadro, o que evita cara de ondulação
  decorativa.
- **Fase por fio** — `i * 0.42`. É o que gera o moiré da referência.
- `preserveAspectRatio="none"` + `vector-effect="non-scaling-stroke"` em cada
  path. O viewBox é bem esticado na vertical; sem o `vector-effect` o traço
  engrossaria junto e a onda viraria borrão.
- Largura em tela: `min(1600px, 190vw)`, centrada. Sangra um pouco além da
  viewport de propósito — evita corte seco nas pontas.

**Cor:** gradiente horizontal com `stop-opacity`, decidido com o cliente —
ciano no núcleo, azul da marca morrendo nas bordas.

| offset | cor | opacidade |
|---|---|---|
| 0 | `--color-hero-cta` | 0 |
| 0.18 | `--color-hero-cta` | 0.5 |
| 0.5 | `--color-onda` (`#00AEEF`) | 0.9 |
| 0.82 | `--color-hero-cta` | 0.5 |
| 1 | `--color-hero-cta` | 0 |

---

## 5. Timeline

t=0 é o instante em que o frame 120 congela.

| t (ms) | O quê | Como |
|---|---|---|
| 0–550 | linha dispara para os lados | `clip-path: inset(0 50% 0 50%)` → `inset(0 0 0 0)` |
| 400–1300 | fios abrem em cascata | `scaleY(0.015)` → `scaleY(1)`, stagger 30ms, 700ms cada |
| 300–1700 | halo acende | opacidade 0→1, `scaleX(0.4)`→`scaleX(1)` |

Curva: `cubic-bezier(0.22, 1, 0.36, 1)` — a mesma do site inteiro. Depois de
1300ms congela; não há loop.

**Animação em CSS, não Framer Motion.** O `animationDelay` de cada fio vem
inline do componente — mesmo padrão que `components/splash-screen.tsx` já usa
nas barras do equalizador. Mais barato que 20 elementos `motion` e o gatilho é
só um booleano (`data-onda="ativa"` no container).

**Estado de repouso = estado inicial da animação.** Se o JS nunca disparar, o
que fica na tela é uma linha discreta atrás do case — não um borrão.

`prefers-reduced-motion`: a onda nasce aberta, sem animar nada.

---

## 6. Onde mexer para ajustar

| Quero… | Mexer em |
|---|---|
| mais/menos fios | `FIOS` em `onda-sonora.tsx` |
| onda mais alta/baixa | o `0.92` em `caminho()` (fração da meia-altura) |
| pontas mais/menos afiladas | o expoente `1.5` do `envelope()` |
| moiré mais/menos denso | o `0.42` da fase em `CAMINHOS` |
| onda mais/menos larga | `w-[min(1600px,190vw)]` em `onda-sonora.tsx` |
| ritmo da abertura | durações/delays em `globals.css` (`onda-expandir`, `onda-abrir`) |
| cor do núcleo | `--color-onda` em `globals.css` |
| traço mais grosso | `strokeWidth` nos paths |

---

## 7. O que não foi verificado

O painel de browser da sessão em que isso foi feito estava com
`visibilityState: hidden` — **0 ticks de `requestAnimationFrame` em 600ms** e
`IntersectionObserver` não disparando nenhuma vez.

Consequência: nessa janela a sequência de frames congela no frame 0 e a onda
nunca é acionada. **Não é bug do código** — a splash, que roda em `setTimeout`,
completou normal.

**Verificado de forma determinística** (forçando o estado final pela Web
Animations API):

- clip final em `inset(0 0%)`, todos os 20 fios em `scaleY(1)`;
- `elementFromPoint` no centro do case devolve a `IMG`, ao lado devolve o
  container da onda — ou seja, a onda **está** atrás;
- altura da onda idêntica à do case em 1440×900 e 375×667; o desenho real fica
  54px dentro do topo e 60px dentro da base;
- `tsc --noEmit` limpo e `npm run build` passando (57,3 kB da rota).

**Falta olhar em navegador de verdade:** o *ritmo*. Se 550ms de linha e 700ms
de abertura ficam bons, se o stagger de 30ms está muito rápido ou muito lento,
e se o halo aparece de mais ou de menos.

---

## 8. Armadilha do ambiente

**Nunca rodar `npm run build` com o dev server aberto.** O build de produção
sobrescreve o `.next` que o dev usa e a página passa a dar 500. Se acontecer:
parar o dev, `Remove-Item .next -Recurse -Force`, subir de novo.

Dev server: `npm run dev -- -p 3210` (há um `.claude/launch.json` apontando
para isso).
