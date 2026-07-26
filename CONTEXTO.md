# Otosons — contexto do projeto

Resumo de handoff. Um novo chat pode ler este arquivo em vez de receber tudo colado.

---

## 1. Objetivo

Site institucional da **Otosons Aparelhos Auditivos** (Av. Roberto Silveira, 100 —
Centro, Maricá — RJ), construído a partir de screenshots de mockup fornecidos
pelo cliente, mais um preloader vindo de um arquivo Figma Make.

---

## 2. Ambiente (crítico)

| Item | Valor |
|---|---|
| Projeto | `E:\dev\otosons` — **fora do OneDrive** |
| Repositório | https://github.com/sodreexx/Otosons-Site (público, branch `main`) |
| Assets originais | `C:\Users\andre\OneDrive\Área de Trabalho\Lucas Trabalho\Otosons` |
| Cache npm | `E:\npm-cache` (redirecionado) |
| Dev server | `npm run dev` → porta 3000 (nas sessões usei 3210 via `.claude/launch.json`) |

**O drive C: vive lotado** (465 GB, já chegou a 0 byte). Quando zera, o shell
inteiro trava — o harness grava log de cada comando em
`C:\Users\andre\AppData\Local\Temp\claude\`. Conferir `Get-PSDrive C` antes de
instalar qualquer coisa.

**Nunca rodar `npm run build` com o dev server aberto.** O build de produção
sobrescreve o `.next` que o dev usa e a página passa a dar erro 500. Se
acontecer: parar o dev, `Remove-Item .next -Recurse -Force`, subir de novo.

---

## 3. Stack

Next.js 15 (App Router) · React 19 · Tailwind v4 · Framer Motion · TypeScript ·
sharp (devDependency, só para o script de frames).

---

## 4. Decisões fechadas com o cliente

- **Serviços**: grid bento com fotos de fundo e título sobreposto (7/5, 5/7) —
  não cards com ícone.
- **Animação do hero**: toca **uma vez** ao carregar e congela no último frame.
  Não é scroll-scrub nem loop.
- **Navbar**: nomes reais (Início, Sobre, Serviços, Aparelhos, Depoimentos,
  Blog, FAQ, Contato). O mockup tinha "Home" 9× — era placeholder.
- **CTA do hero**: "Agende sua avaliação gratuita".
- **Título do hero em negrito**, embora o mockup esteja em peso normal — todas
  as seções finalizadas do mockup usam títulos em negrito. Decisão consciente,
  pendente de confirmação.
- **Hero em tela cheia** (`min-h-svh`), elementos grandes, CTA colado na base.
- **Aparelho atrás do texto**, com a base encostando na palavra "Pena".

---

## 5. Paleta (amostrada pixel a pixel do mockup)

Site em geral — é a paleta padrão do Tailwind:

| Uso | Cor | Token |
|---|---|---|
| Títulos, links, números | `#1E40AF` | `brand-800` |
| Texto de corpo | `#6B7280` | `body` |
| Fundo de seção | `#F3F4F6` | `surface` |

O **hero e a navbar têm paleta própria**, diferente do resto:

| Uso | Cor | Token |
|---|---|---|
| Título (parte escura) | `#000000` | `hero-ink` |
| Título (parte clara) | `#7F7F7F` | `hero-muted` |
| Subtítulo | `#A0A0A0` | `hero-subtle` |
| Botões do topo e do hero | `#2749C4` | `hero-cta` |
| Links da nav | `#7A7A83` | `nav-link` |

O `#2749C4` dos botões do topo é um azul diferente do `#1E40AF` do resto do
site. Isso é assim no mockup original — inconsistência do desenho, mantida de
propósito. Unificar é trocar um token.

Fontes: **Poppins** (display, pesos 500/600/700/800) e **Inter** (corpo).

---

## 6. Pipeline dos frames do hero

Origem: **121 GIFs de 1920×1080 (24,7 MB)** na pasta `frames da hero` do
OneDrive. Mostram o estojo abrindo e revelando os aparelhos.

```bash
node scripts/build-frames.mjs "C:\...\Otosons\frames da hero"
```

O script recorta pela **união dos bounding boxes** de todos os frames (não pelo
de cada um — isso faria o aparelho pular de posição a cada troca), reduz para
700px e grava WebP.

Resultado: **24,7 MB → 2,51 MB**, 21 KB por frame, 1920×1080 → 883×985.
Saída em `public/hero-frames/frame-000.webp … frame-120.webp`. 30fps ≈ 4s.

Rodar de novo sempre que os frames de origem mudarem.

---

## 7. Calibrações já medidas — não refazer

- **Logo SVG**: o arquivo original é 1500×1500 com a arte ocupando só 44% do
  meio, o que fazia o logo renderizar 44×44px. `viewBox` recortado para
  `413 605 678 289` em `public/logo.svg`.
- **Quebras do título** fixas em `lib/site.ts` (3 linhas). São explícitas
  porque o mockup usa fonte mais estreita que a Poppins — quebra automática
  nunca cairia nos mesmos pontos. No mobile as quebras desligam.
- **Larguras alvo das linhas** (mockup): 541 / 468 / 180 px.
- **Base do aparelho em "Pena"**: `margin-top: calc(-2.6 * var(--hero-fonte) - 8px)`.
  O 2,6 = line-height (1,18) + padding da máscara (0,12), vezes as 2 linhas
  acima da última. Os 8px compensam a borda transparente do frame.
- **Frame-120**: o desenho vai até **98,5% da altura** mesmo com alfa opaco. O
  que engana é o corpo do estojo ser branco sobre fundo branco — a base existe,
  só não tem contraste.
- **Header**: 104px de altura, padding lateral `5.5%`, logo 80×32.
- **Tipografia do hero atrelada a `svh`**, não a breakpoints de largura: num
  hero de tela cheia a altura é o recurso escasso.

---

## 8. Estrutura

```
E:\dev\otosons\
├─ app\
│  ├─ layout.tsx        Poppins+Inter, monta <SplashScreen/>, noscript
│  ├─ page.tsx          monta as seções em ordem
│  └─ globals.css       tokens, .container-site, .hero-texto, .splash-wave-bar
├─ components\
│  ├─ splash-screen.tsx    preloader (Figma Make)
│  ├─ site-header.tsx      navbar + menu mobile
│  ├─ hero.tsx             coluna flex de tela cheia
│  ├─ hero-sequence.tsx    121 frames, espera a splash
│  ├─ hero-texto.tsx       título palavra a palavra, subtítulo, CTA
│  ├─ servicos.tsx         bento 7/5, 5/7
│  ├─ estatisticas.tsx     contadores
│  ├─ diferenciais.tsx     3 cards
│  ├─ blog.tsx             3 cards
│  ├─ cta-final.tsx        faixa azul
│  ├─ site-footer.tsx      4 colunas
│  ├─ whatsapp-fab.tsx     botão flutuante
│  ├─ reveal.tsx           entrada on-scroll
│  └─ count-up.tsx         contador animado
├─ lib\
│  ├─ site.ts           TODO o conteúdo editável do site
│  ├─ assets.ts         lê public/hero-frames, checa existência
│  └─ splash.ts         coordena preloader ↔ hero
├─ scripts\build-frames.mjs
├─ public\   logo.svg, logo.png, images\aparelho.png, hero-frames\, LEIA-ME.md
├─ _referencia\   screenshots do mockup
└─ README.md   plano de animações
```

**Todo o texto do site está em `lib/site.ts`.** Nenhum componente tem conteúdo
fixo dentro dele.

---

## 9. Preloader (vindo do Figma Make)

Timeline original preservada:

| ms | Evento |
|---|---|
| 0–1200 | onda sonora (7 barras, ciclo 1,2s, fases defasadas) |
| 1200 | onda some (fade 0,5s) |
| 1600 | logotipo "Otosons." entra (0,8s) |
| 3100 | cortina sobe (1,2s) — **e o hero é liberado aqui** |
| 4300 | removido do DOM |

`lib/splash.ts` sincroniza: sem isso a animação de 4s do estojo rodaria inteira
escondida atrás da cortina de 4,3s. Efeito colateral bom — os ~3s de cortina são
a janela exata para baixar os 2,5 MB de frames.

`prefers-reduced-motion` pula a splash inteira.

**Dois pontos de atenção:**

1. Os `@keyframes` da classe `.splash-wave-bar` **não vieram** do Figma (moram no
   `globals.css` de lá). Foram **reconstruídos** a partir dos delays
   (−1,2s a −0,6s em passos de 0,1s ⇒ ciclo de 1,2s).
2. **Bug do design original**: a 4ª barra — a mais alta (60px), central — tem cor
   `#F3F4F6` sobre fundo branco, ou seja, **invisível**. Fica um vão no meio do
   equalizador. Mantido fiel ao design. Corrigir = trocar por `#3B82F6` em
   `components/splash-screen.tsx`.

---

## 10. Bugs encontrados e corrigidos

- Header limpava `body.style.overflow` na montagem, matando a trava de scroll da
  splash (dava para rolar por trás da cortina).
- Botão flutuante do WhatsApp cobria o link "Termos de Uso" no rodapé.
- Logo renderizava 44×44px por causa do `viewBox` do SVG.
- CTA do hero ficava 26px abaixo da dobra em 1366×700 e a seção transbordava.
- Foto do aparelho com caixa branca visível (resolvido com `mix-blend-multiply`
  no fallback estático; nos frames com alfa está desligado de propósito).

---

## 11. Verificado

`npx tsc --noEmit` e `npm run build` passam limpos. Layout conferido em
1440×900, 1090×1018, 1366×700, 375×812 e 375×667 — sem transbordo e com o CTA
sempre acima da dobra.

---

## 12. Pendências

1. **Fotos de serviços e blog** — hoje são placeholders. Caminhos esperados em
   `public/LEIA-ME.md`. O site roda normalmente sem elas.
2. **Seções não construídas**: Aparelhos, Depoimentos, FAQ, Sobre. Estão na
   navegação mas as âncoras não levam a lugar nenhum ainda.
3. **Preloader toca a cada carregamento** — não há guarda de `sessionStorage`.
   O `App.tsx` do Figma Make nunca foi recebido, então não se sabe se lá existia.
   Se quiser só na primeira visita da sessão, é um `if` de três linhas.
4. **`@keyframes` reais da onda** — colar o bloco do `globals.css` do Make se
   quiser exatidão em vez da reconstrução.
5. **Barra invisível do equalizador** — decidir se corrige.
6. **Título do hero**: negrito (atual) vs peso normal (mockup). Se mudar,
   recalibrar o corpo da fonte junto — sem negrito o texto fica mais estreito.
7. **Frames originais só no OneDrive** — os 121 GIFs de 1920×1080 que alimentam
   `scripts/build-frames.mjs` não estão versionados; só os WebP derivados, em
   `public/hero-frames/`, estão. Se o OneDrive sumir, não dá para regerar.

---

## 13. Sobre o MCP do Figma

Funciona e lista o arquivo Make inteiro, mas para arquivos `/make/` devolve
apenas **resource links** (`file://figma/make/source/...`). Esta sessão não tinha
ferramenta capaz de ler esse esquema de URI — as duas que leem recurso do Figma
(`get_figma_skill` / `read_skill_uri`) aceitam exclusivamente `skill://`. Por isso
o código do SplashScreen precisou ser colado manualmente. A extensão do Chrome
também não estava conectada (`list_connected_browsers` retornou vazio).
