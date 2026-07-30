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
| `components/onda-sonora.tsx` | a geometria da fita, o SVG e o laço de animação |
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
FIOS    = 48        // quantidade de fios
LARGURA = 1600      // viewBox
ALTURA  = 200       // viewBox
PONTOS  = 200       // resolução de cada path
```

**O modelo é uma FITA TORCIDA, não fios independentes.** A pedido do cliente
("tem que estar igual à imagem"), as duas primeiras tentativas — fios com fase
e amplitude próprias, e depois interpolação entre duas formas — foram
descartadas: as duas produziam cruzamentos caóticos. A referência é uma fita
coerente: todos os fios pertencem à mesma superfície.

**A grade `L(k) = k/9`.** `torcao()` dá 9 meias-voltas ao longo da largura,
então existem **10 pontos de abertura máxima**: `k/9`, para k de 0 a 9 —
incluindo as duas bordas. Todo lóbulo está amarrado a essa grade, e é isso que
garante que cada um caia onde a fita está aberta, nunca sobre um nó.

- **`centro(t)`** — a linha central da fita. Não é senoide: são os lóbulos da
  imagem de referência, um a um, como sinos gaussianos. Pico dominante `+0.9`
  em `L(4)`, vale fundo `−0.65` em `L(3)`, lóbulos menores decaindo para as
  pontas até `L(8)`.
- **`abertura(t)`** — a meia-largura da fita: larga nos lóbulos, estreita entre
  eles, zero exatamente nas pontas (é o `envelope`, **expoente 0.3**, que fecha
  os bicos). Tem lóbulo em **todos** os slots, de `L(0)` a `L(9)`.
- **`torcao(t)` = `π·9t`** — a fita gira ao longo do percurso. Onde
  `cos(torção)=0` ela fica de perfil e todos os fios se encontram (os nós
  escuros); onde `cos=±1` abre por inteiro (os leques de arcos aninhados).
  **Sem offset de fase**, para as aberturas caírem em `k/9` exato — ou seja,
  também nas duas bordas.
- **Fio** — `y = centro + u·abertura·cos(torção + u·0.35)`, com u ∈ [−1, 1].
  O `u·0.35` transforma cada cruzamento numa cintura apertada em vez de um
  ponto exato, como na imagem.
- **`/1.569`** — normalização (o máximo de |centro| + abertura ao longo de toda
  a largura, que fica em t=0.444) para nunca estourar o viewBox. **O sinal do y é negativo** (`MEIO − …`): o y do SVG cresce para
  baixo, e sem a inversão a onda renderiza de cabeça para baixo — aconteceu, e
  foi pego porque o pico media y=188 (fundo) em vez de y=11 (topo).
- `preserveAspectRatio="none"` + `vector-effect="non-scaling-stroke"` em cada
  path. O viewBox é bem esticado na vertical; sem o `vector-effect` o traço
  engrossaria junto e a onda viraria borrão.
- Largura em tela: **`w-screen`** — borda a borda da viewport, pedido do
  cliente. O envelope zera nas pontas, então a fita termina em bico exatamente
  na borda. O `overflow-hidden` da section do hero absorve a diferença entre
  100vw e a área visível quando há barra de rolagem.

**Cor:** azul único e sólido, `--color-onda` (`#00AEEF`), sem gradiente nenhum —
os `<defs>` foram removidos. A primeira versão tinha gradiente ciano→azul-da-
marca com fade nas pontas; a referência do cliente não tem nada disso, e o fade
perdeu a razão de existir quando a fita passou a terminar em bico na borda
(bico não precisa de fade).

**A saturação vem da densidade, não da cor.** Cada fio é traçado a
`stroke-opacity` 0.35 com `strokeWidth` 0.8. Nos nós e nos bicos das pontas,
onde os fios convergem, a sobreposição empilha e escurece sozinha — as "lanças"
e os nós escuros da referência; nos leques abertos a onda fica arejada.

**Posição do pico:** t=0.45, levemente à esquerda do centro como na imagem — mas
ainda dentro da faixa que o case cobre (t≈0.38–0.62 no desktop, mais larga no
mobile), então o crista segue escondida atrás do estojo e o som continua
"saindo de dentro" dele. As bordas do leque aparecem dos dois lados do case.

---

## 5. Timeline

t=0 é o instante em que o frame 120 congela.

| t (ms) | O quê | Como |
|---|---|---|
| 0–900 | linha dispara para os lados | `clip-path: inset(0 50% 0 50%)` → `inset(0 0 0 0)` |
| 260–1930 | fita abre do centro para fora | `scaleY(0.015)` → `scaleY(1)`, 1150ms cada |
| 0 → ∞ | a fita flui | laço de `rAF` reescrevendo o `d` (ver abaixo) |

Curva da entrada: **`cubic-bezier(0.4, 0, 0.2, 1)`** — diferente do resto do
site (`0.22, 1, 0.36, 1`) de propósito. Aquela curva dispara: o fio sai de
`scaleY` 0.015 para 1, uma multiplicação de 66×, e atingia ~60% do tamanho nos
primeiros 100ms. O olho lê isso como estalo, não como abertura.

**O escalonamento é RADIAL, por `|u|`, não por índice de fio.** Antes o atraso
crescia com i (0…47), ou seja com u de −1 a +1: a fita abria de uma borda à
outra, como persiana. Agora os fios de u≈0 — que *são* a linha central — saem
primeiro, e os pares simétricos abrem dela para cima e para baixo ao mesmo
tempo. A linha não é substituída pela onda: ela vira a onda.

`ENTRADA_BASE_MS` (260) é o atraso do fio central; `ENTRADA_ESPALHAMENTO_MS`
(520) é o quanto o fio da borda espera além disso. Mexer em `FIOS` **não**
afeta mais o ritmo — o escalonamento depende de `|u|`, não da contagem. Mexeu em `FIOS`, recalcule o stagger.

**O halo foi removido.** Era um clarão ciano desfocado (`bg-onda/15 blur-3xl`)
atrás do case, herdado da primeira versão. Quando a fita passou a ocupar a tela
inteira ele virou uma mancha azul lavando o fundo do hero — o cliente apontou na
captura de tela. Saíram o `<div>`, os keyframes `onda-halo` e as regras de
`prefers-reduced-motion` que o citavam.

### Movimento contínuo

Depois da entrada a fita **não congela**. Dois movimentos lentos, de períodos
primos entre si para o conjunto nunca voltar visivelmente ao mesmo quadro:

| Movimento | Período | O que faz |
|---|---|---|
| deriva da torção | 26s | os nós caminham para a esquerda |
| respiro de amplitude | 9s | ±3,5% na altura da fita |

**A silhueta não muda.** `centro(t)` e `abertura(t)` são estáticos, e só a *fase*
da torção avança — então o contorno externo do leque fica parado e o que se move
são os fios por dentro dele. Medido: o fio da borda (`u=±1`) percorre 78 unidades
de viewBox (~109px em 1280×720), mas sempre dentro do mesmo envelope. O efeito é
de luz correndo pela fita, não de onda balançando. O fio central (`u≈0`) se mexe
2px, porque ele *é* a linha `centro(t)`.

Como `torcao()` tem 9π ao longo da largura, 2π de fase desloca o padrão em 2/9 da
tela: um nó leva os 26s inteiros para percorrer a distância até onde estava o nó
vizinho.

**Custo.** `centro`, `abertura` e `torcao` são pré-calculados uma vez em arrays
(`C`, `A`, `T`), junto com os prefixos `M…/L…` que carregam o x — que nunca muda.
Por ponto sobra um `Math.cos`, meia dúzia de multiplicações e um arredondamento.
O laço roda a **30fps** (não 60: o desenho é enorme em área e a diferença não
aparece num movimento tão lento) e é pausado por `IntersectionObserver` quando o
hero sai da tela e por `document.hidden` quando a aba perde o foco.

`prefers-reduced-motion` não instala o laço: a fita fica no estado de repouso,
que é o mesmo renderizado pelo servidor.

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
| mais/menos fios | só `FIOS` — o escalonamento é por `|u|`, não depende da contagem |
| mover/redimensionar um lóbulo | o sino correspondente em `centro()` (altura) e o irmão em `abertura()`. A POSIÇÃO deve continuar em `L(k)` |
| onda mais alta/baixa | o `0.92` em `ESCALA` — e recalcule o `1.569` se mexer nos sinos |
| pontas mais/menos afiladas | o expoente `0.3` do `envelope()`. **Cuidado: acima de ~0.5 volta a linha chapada nas laterais** |
| mais/menos torções (nós) | o `9` em `torcao()` — nós ≈ esse número, **e `L(k)` tem que virar `k/novo-valor` junto** |
| ritmo da entrada | `ENTRADA_BASE_MS` / `ENTRADA_ESPALHAMENTO_MS` e as durações em `globals.css` |
| cinturas mais/menos apertadas | o `0.35` em `caminho()` (0 = nó vira ponto exato) |
| nós/bicos mais/menos escuros | `strokeOpacity` (0.35) — densidade, não cor |
| ritmo da abertura | durações/delays em `globals.css` (`onda-expandir`, `onda-abrir`) |
| fluxo mais rápido/lento | `DERIVA_MS` (26000) |
| respiro mais/menos forte | `RESPIRO_AMPLITUDE` (0.035) e `RESPIRO_MS` (9000) |
| parar o movimento contínuo | apagar o `useEffect` — o estado de repouso já é o do servidor |
| cor | `--color-onda` em `globals.css` |
| traço mais grosso | `strokeWidth` (0.8) nos paths |

---

## 7. O que não foi verificado

**Isto já aconteceu em duas sessões seguidas.** O painel de browser fica com
`visibilityState: hidden` — **0 ticks de `requestAnimationFrame` em 600ms** e
`IntersectionObserver` não dispara nenhuma vez. Um `javascript_exec` que espere
por `rAF` simplesmente nunca retorna, e `screenshot` falha com *"the Browser pane
is not displayed, so the page is not compositing frames"*.

Consequência: nessa janela a sequência de frames congela no frame 0 e a onda
nunca é acionada. **Não é bug do código** — a splash, que roda em `setTimeout`,
completou normal. Antes de investigar qualquer coisa como se fosse bug, cheque
`document.visibilityState`. A saída é abrir o painel do Browser no app.

### A linha que sobrava nas laterais (resolvido em 29/07/2026)

O cliente apontou que "sobrava uma linha depois que a onda abria". Medido: os 48
fios cabiam em **menos de 7px de altura nos 10% da esquerda e nos 15% da
direita** — na prática um traço horizontal saturado, porque ali `centro()≈0` e
`abertura()≈0` ao mesmo tempo e todos os fios caíam sobre a linha do meio.

Eram duas causas somadas:

1. `centro()` só preenchia 7 dos 9 slots de abertura. Do último lóbulo até a
   borda direita sobravam 15% de largura sem nada.
2. `torcao()` tinha offset `−0.05`, que deslocava a grade de aberturas para
   0.006…0.894. A última abertura caía a 11% da borda e depois dela só havia um
   **nó** — e nó é exatamente onde os fios convergem. A fita chegava na borda de
   perfil.

Correção: lóbulos amarrados a `L(k)=k/9`, slot 8 acrescentado em `centro()`,
lóbulos de borda em `abertura()`, offset removido de `torcao()` e envelope de
0.7 para 0.3. Resultado: **zona chapada de 0,4% em cada ponta** (era 10% e 15%),
com o bico pousando exatamente em y=100, a linha do meio.

Uma tentativa anterior mascarava as pontas com gradiente para a onda dissolver
antes da borda. **Foi descartada pelo cliente:** ele quer a onda chegando até a
extremidade lateral, não sumindo antes dela. Não repetir.

**Verificado de forma determinística** (sem depender de compositing):

- varrendo 60 fases × 48 fios × 201 pontos com o respiro no máximo, a fita fica
  entre y=4,8 e y=163,4 num viewBox de 0–200 — **nenhuma fase estoura**;
- medindo os paths **no HTML que o servidor entrega**: a 2% da borda a fita tem
  8,5 unidades de viewBox de altura (≈16,6px num case de 390px), contra 1,7 antes
  da correção; e os dois bicos terminam em y=100,0 exato;
- a troca de `d` redesenha de fato: com 90° de fase o fio da borda salta de
  y[77,7–118,7] para y[49,6–134];
- `elementFromPoint` no centro do case devolve a `IMG` — a onda **está** atrás;
- o SVG mede exatamente `innerWidth` — a fita vai de borda a borda;
- nenhum `.onda-halo` restou no DOM;
- `tsc --noEmit` limpo.

**Cuidado ao medir o balanço:** o fio de índice 24 (de 48) tem `u≈0,02`, ou seja,
é praticamente a linha central da fita — e ela por definição não se move. Medir
ali dá ~2px e passa a impressão errada de que a animação não funciona. Meça em
`u=±1`.

**Falta olhar em navegador de verdade:**

1. O *fluxo* — se 26s para a deriva e ±3,5% de respiro em 9s ficam sutis como o
   cliente pediu, ou se ainda chamam atenção demais / de menos.
2. O *ritmo da entrada* — 900ms de linha, 1150ms de abertura, escalonamento
   radial de 260+520ms. Números escolhidos para suavizar, não medidos no olho.
3. A *saturação por sobreposição* — `stroke-opacity` 0.35 com 48 fios foi
   calculado, não visto. Se os nós ficarem pesados ou apagados demais, o botão é
   esse, não a cor.
4. O *custo real* — 48 paths reescritos a 30fps foi dimensionado no papel. Vale
   um olhar no perfil em máquina modesta, dado o público do site.

---

## 8. Armadilha do ambiente

**Nunca rodar `npm run build` com o dev server aberto.** O build de produção
sobrescreve o `.next` que o dev usa e a página passa a dar 500. Se acontecer:
parar o dev, `Remove-Item .next -Recurse -Force`, subir de novo.

Dev server: `npm run dev -- -p 3210` (há um `.claude/launch.json` apontando
para isso).
