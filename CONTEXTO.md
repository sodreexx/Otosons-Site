# Otosons — contexto do projeto

Resumo de handoff. Um novo chat pode ler este arquivo em vez de receber tudo colado.

---

## 1. Objetivo

Site institucional da **Otosons Aparelhos Auditivos** (Rua Gavião Peixoto, 13 —
Loja 103, Icaraí — Niterói, RJ), construído a partir de screenshots de mockup
fornecidos pelo cliente, mais um preloader vindo de um arquivo Figma Make.

O endereço de Maricá do mockup original **estava errado** — corrigido em
28/07/2026 a partir do perfil real da empresa no Google Maps (4,6 · 85
avaliações). Ver §9.

**Desde 28/07/2026 o site é multi-página**, não uma landing de seção única —
decisão explícita do cliente: "não é uma landing page é um site institucional".
Ver §8.

**Em 29/07/2026 o site inteiro foi expandido e ganhou camada de SEO.** As 7
páginas internas eram curtas demais; ganharam seções novas, corpo de artigo
no blog, dados estruturados schema.org, sitemap e robots. A Home **não foi
tocada** (pedido explícito: "a página home está pronta"). Ver §17.

---

## 2. Ambiente (crítico)

| Item | Valor |
|---|---|
| Projeto | `E:\dev\otosons` — **fora do OneDrive** |
| Repositório | https://github.com/sodreexx/Otosons-Site (público, branch `main`) |
| Assets originais | `C:\Users\andre\OneDrive\Área de Trabalho\Lucas Trabalho\Otosons` |
| Cópia estática (backup, sem `node_modules`) | `C:\...\Otosons\arquivos dev` |
| Cache npm | `E:\npm-cache` (redirecionado) |
| Dev server | `npm run dev -- -p 3210` (`.claude/launch.json` já aponta pra isso) |

**O drive C: vive lotado** (465 GB, já chegou a 0 byte). Quando zera, o shell
inteiro trava — o harness grava log de cada comando em
`C:\Users\andre\AppData\Local\Temp\claude\`. Conferir `Get-PSDrive C` antes de
instalar qualquer coisa.

**Nunca rodar `npm run build` com o dev server aberto.** O build de produção
sobrescreve o `.next` que o dev usa e a página passa a dar erro 500. Se
acontecer: parar o dev, `Remove-Item .next -Recurse -Force`, subir de novo.

**Regra de commit (o cliente já corrigiu isso uma vez):** não commitar nada —
nem animação, nem reestruturação de páginas — sem pedido explícito. O
repositório está **2 commits atrás do estado local** desde 28/07/2026; tudo
desta sessão (site multi-página, onda sonora nova, fotos) está só no disco.
Rodar `git status` antes de qualquer coisa pra ver o tamanho real da distância.

---

## 3. Stack

Next.js 15 (App Router) · React 19 · Tailwind v4 · Framer Motion · TypeScript ·
sharp (devDependency, usada no script de frames e para comprimir fotos geradas).

---

## 4. Decisões fechadas com o cliente

- **Site institucional multi-página**, não landing de seção única. A navbar
  leva para rotas de verdade (`/sobre`, `/servicos`, etc.), não âncoras. A
  Home continua sendo uma página só, com suas próprias seções resumidas.
- **Serviços** (bento no teaser da Home): grid com fotos de fundo e título
  sobreposto (7/5, 5/7) — não cards com ícone. A página `/servicos` completa
  usa um padrão diferente: card grande (ícone+título+descrição+duração+CTA)
  pareado com checklist "Como funciona" — copiado do protótipo Figma.
- **Animação do hero**: toca **uma vez** ao carregar e congela no último frame.
  Não é scroll-scrub nem loop.
- **Onda sonora do hero**: reescrita em 28/07/2026 como fita torcida com
  movimento contínuo sutil. Handoff completo e específico em
  [`ONDA-SONORA.md`](ONDA-SONORA.md) — não duplicar aqui.
- **Navbar**: nomes reais (Início, Sobre, Serviços, Aparelhos, Depoimentos,
  Blog, FAQ, Contato), agora apontando para rotas reais.
- **CTA do hero**: "Agende sua avaliação gratuita".
- **Título do hero em negrito**, embora o mockup esteja em peso normal — todas
  as seções finalizadas do mockup usam títulos em negrito. Decisão consciente,
  pendente de confirmação.
- **Hero em tela cheia** (`min-h-svh`), elementos grandes, CTA colado na base.
- **Aparelho atrás do texto**, com a base encostando na palavra "Pena".
- **Anos de experiência: 20**, não os "18 anos" que o site antigo divulga —
  calculado da fundação real no CNPJ (07.970.236/0001-08, 17/04/2006). Decisão
  do cliente: usar a data objetiva, não o número de marketing do concorrente
  (antigo site próprio).
- **Depoimentos: os 3 reais do Google**, não os fictícios que o protótipo
  Figma mostrava (Maria Aparecida, José Carlos, Terezinha Souza — inventados).
- **Aparelhos: catálogo com marcas reais** — Oticon, Interton, Argosy (o
  cliente mandou os links oficiais). Não as 8 marcas fictícias do protótipo
  Figma (Phonak, Signia, Widex...).

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
- **Header**: 104px de altura (88px mobile), padding lateral `5.5%`, logo
  80×32. Toda página interna precisa desse espaço no topo — ver
  `components/page-hero.tsx` (`pt-[calc(88px+2.5rem)] md:pt-[calc(104px+3rem)]`).
- **Tipografia do hero atrelada a `svh`**, não a breakpoints de largura: num
  hero de tela cheia a altura é o recurso escasso.

---

## 8. Estrutura (multi-página, atualizada 28/07/2026)

```
E:\dev\otosons\
├─ app\
│  ├─ layout.tsx            Poppins+Inter, <SplashScreen/>, <SiteHeader/>,
│  │                        {children}, <SiteFooter/>, <WhatsappFab/>.
│  │                        Header/footer/fab moraram aqui pra não duplicar
│  │                        em cada página.
│  ├─ page.tsx               Home: Hero, Servicos(teaser), Estatisticas,
│  │                        Diferenciais, Blog(teaser), CtaFinal — EXATAMENTE
│  │                        como antes da reestruturação (pedido do cliente).
│  ├─ sobre\page.tsx         → components/sobre.tsx
│  ├─ servicos\page.tsx      → components/servicos-completo.tsx (página cheia,
│  │                        diferente do teaser do Home)
│  ├─ aparelhos\page.tsx     → components/aparelhos.tsx (catálogo filtrável)
│  ├─ depoimentos\page.tsx   → components/depoimentos.tsx
│  ├─ blog\page.tsx          → components/blog-completo.tsx (lista + busca +
│  │                        filtro de categoria)
│  ├─ blog\[slug]\page.tsx   → components/blog-post.tsx (post individual)
│  ├─ faq\page.tsx           → components/faq.tsx (agrupado por categoria +
│  │                        busca)
│  ├─ contato\page.tsx       → components/contato.tsx
│  └─ globals.css            tokens, .container-site, .hero-texto,
│                             .splash-wave-bar, keyframes da onda sonora
├─ components\
│  ├─ page-hero.tsx          NOVO — cabeçalho compartilhado de página interna:
│  │                        breadcrumb + H1 + subtítulo sobre faixa azul clara.
│  │                        Usado pelas 7 páginas internas.
│  ├─ splash-screen.tsx      preloader (Figma Make)
│  ├─ site-header.tsx        navbar — agora usa next/link + usePathname()
│  │                        pra estado ativo, não mais IntersectionObserver
│  │                        de âncora (fazia sentido só numa página só)
│  ├─ hero.tsx                coluna flex de tela cheia
│  ├─ hero-sequence.tsx       121 frames, espera a splash
│  ├─ hero-texto.tsx          título palavra a palavra, subtítulo, CTA
│  ├─ onda-sonora.tsx         fita torcida com movimento contínuo — ver
│  │                        ONDA-SONORA.md
│  ├─ servicos.tsx            bento 7/5, 5/7 — SÓ o teaser do Home
│  ├─ servicos-completo.tsx   NOVO — página /servicos cheia (card+checklist)
│  ├─ estatisticas.tsx        contadores — reusado em /depoimentos também
│  ├─ diferenciais.tsx        3 cards
│  ├─ sobre.tsx               NOVO — reescrito pra bater com o Figma (foto +
│  │                        Missão/Visão) + história/valores do site antigo
│  ├─ aparelhos.tsx           NOVO — catálogo filtrável (marca/tipo/busca),
│  │                        client component
│  ├─ depoimentos.tsx         NOVO — PageHero + Estatisticas + grid de 3
│  │                        avaliações reais do Google
│  ├─ blog.tsx                 3 cards — SÓ o teaser do Home
│  ├─ blog-completo.tsx       NOVO — página /blog cheia, busca+filtro,
│  │                        client component (CUIDADO: não pode importar
│  │                        lib/assets diretamente, ver §12.1)
│  ├─ blog-post.tsx            NOVO — página de post individual, server
│  │                        component
│  ├─ faq.tsx                  REESCRITO — agrupado por categoria + busca,
│  │                        client component (era acordeão simples antes)
│  ├─ contato.tsx              REESCRITO — PageHero + endereço real + mapa
│  │                        embed (coordenadas exatas do Google Maps)
│  ├─ cta-final.tsx            faixa azul, só no Home
│  ├─ site-footer.tsx          4 colunas
│  ├─ whatsapp-fab.tsx         botão flutuante
│  ├─ reveal.tsx               entrada on-scroll
│  └─ count-up.tsx             contador animado
├─ lib\
│  ├─ site.ts               TODO o conteúdo editável do site (bem maior agora
│  │                        — tem sobre/aparelhos/depoimentos/faq com dados
│  │                        reais, ver §9)
│  ├─ assets.ts              usa node:fs/node:path — SÓ pode ser importado em
│  │                        Server Component, nunca em "use client" (ver §12.1)
│  ├─ sequencia.ts            pub/sub pra onda sonora saber quando o hero
│  │                        termina de abrir
│  └─ splash.ts               coordena preloader ↔ hero
├─ scripts\build-frames.mjs
├─ public\
│  ├─ logo.svg, logo.png, hero-frames\, LEIA-ME.md
│  └─ images\
│     ├─ servicos\           4 fotos reais (Higgsfield) — 2 em .png, 2 em
│     │                     .webp (as geradas no modo Unlimited, comprimidas)
│     └─ blog\               só o post 1 tem foto real; 2 e 3 são placeholder
├─ _referencia\   screenshots do mockup original
├─ ONDA-SONORA.md   handoff específico e detalhado da onda sonora
└─ README.md   plano de animações
```

**Todo o texto do site está em `lib/site.ts`.** Nenhum componente tem conteúdo
fixo dentro dele.

---

## 9. Onde os dados reais vieram de cada página

Nenhum texto de página nova foi inventado sem fonte — mas as fontes são
misturadas, e vale saber qual é qual antes de confiar demais em algo:

| Página | Fonte | Confiança |
|---|---|---|
| Sobre | Missão/visão/valores/diferenciais: `otosons.com.br` (site antigo, via WebFetch). Título/foto: protótipo Figma (visto por screenshot real). | Alta |
| Serviços | 1º item (Testes Auditivos: duração, 4 passos) veio de screenshot real do Figma. Os outros 3 são extrapolações minhas coerentes com o padrão — **não confirmadas**. | Mista |
| Aparelhos | Oticon, Interton, Argosy: sites oficiais dos fabricantes (links que o cliente mandou), via WebFetch. Estrutura de filtro (marca/tipo/busca): protótipo Figma. | Alta |
| Depoimentos | As 3 avaliações: perfil real da Otosons no Google Maps, navegado ao vivo (não WebFetch — Maps precisa de JS). Estatísticas (500+, 20 anos, 10.000+, 98%): mistura de real (20 anos) e não confirmado (os outros 3 números vêm do mockup original, nunca verificados). | Mista |
| Blog | Os 3 posts (tag/título/resumo/data): batem exatamente com o protótipo Figma, confirmado por screenshot. Corpo do artigo: **não existe** — só resumo + CTA (ver §12.3). | Alta (lista) / nenhuma (corpo) |
| FAQ | Títulos das 2 primeiras categorias e 5 perguntas: vistos por screenshot real do Figma. **Respostas**: escritas por mim, coerentes com o negócio, não confirmadas com o protótipo (nunca consegui expandir uma pergunta lá). 3ª categoria ("Sobre atendimento"): inteiramente minha. | Mista |
| Contato | Endereço/telefone/coordenadas: perfil real do Google Maps. **Layout**: nunca visto no Figma (a página travou a sessão 2 vezes) — segue o padrão `PageHero` por consistência, não por confirmação visual. | Alta (dados) / nenhuma (layout) |

CNPJ da empresa: **07.970.236/0001-08**, razão social "Centro Auditivo Otosons
LTDA", fundada 17/04/2006 (fonte: cnpj.biz).

---

## 10. Preloader (vindo do Figma Make)

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

## 11. Bugs encontrados e corrigidos

- Header limpava `body.style.overflow` na montagem, matando a trava de scroll da
  splash (dava para rolar por trás da cortina).
- Botão flutuante do WhatsApp cobria o link "Termos de Uso" no rodapé.
- Logo renderizava 44×44px por causa do `viewBox` do SVG.
- CTA do hero ficava 26px abaixo da dobra em 1366×700 e a seção transbordava.
- Foto do aparelho com caixa branca visível (resolvido com `mix-blend-multiply`
  no fallback estático; nos frames com alfa está desligado de propósito).
- **28/07/2026 — build inteiro quebrado**: `components/blog-completo.tsx` é
  `"use client"` mas importava `publicFileExists` de `lib/assets.ts`, que usa
  `node:fs`/`node:path`. Webpack não sabe empacotar módulo Node pro browser —
  TODAS as rotas caíam pra 500, não só `/blog`. Corrigido calculando
  `temFoto` no Server Component (`app/blog/page.tsx`) e passando como prop.
  **Se criar outro client component que precise saber se uma imagem existe,
  NUNCA chamar `publicFileExists` direto nele — sempre calcular no servidor e
  passar como prop.**
- Um comentário em `app/layout.tsx` continha `app/*/page.tsx` — o `*/` dentro
  do texto fechou o bloco de comentário `/* ... */` mais cedo, causando erro
  de sintaxe. Cuidado com `*/` literal dentro de comentários de bloco.

---

## 12. Pendências

1. **Mídia pendente** — 9 arquivos, todos com o espaço já montado no site
   (§18). Lista, status e prompts em [`PROMPTS-MIDIA.md`](PROMPTS-MIDIA.md).
   Quatro deles precisam de foto/vídeo REAL, não de geração por IA.
2. ~~Corpo dos artigos do blog não existe~~ — **escrito em 29/07/2026**, sob
   autorização do cliente ("ajuste tudo e me entregue pronto"). Os 3 posts
   têm corpo completo em `blog.posts[].corpo`, com heading, parágrafo e
   lista. É conteúdo educativo geral e verdadeiro, mas **escrito por mim, não
   pela Otosons** — todo artigo exibe `blog.aviso` no rodapé dizendo que não
   substitui avaliação profissional. **Pedir para Wagner ou Patrícia
   revisarem antes de publicar** é o passo que falta.
3. **Layout do `/contato` nunca foi visto no protótipo Figma** — a sessão
   travou 2 vezes tentando abrir essa página específica (em duas abas
   diferentes, mesmo resultado, então não parece ter sido sessão corrompida).
   O que existe hoje segue o padrão visual das outras 6 páginas por
   consistência, não por cópia confirmada. Em 29/07 a página foi bastante
   expandida (canais, horário dia a dia, como chegar) — continua sendo
   estrutura minha.
4. **Respostas do FAQ ainda não confirmadas** — em 29/07 os prints reais
   confirmaram as **4 categorias e as 12 perguntas** (a estrutura agora é a
   do protótipo, ver §17). As **respostas** continuam sendo minhas: o
   acordeão do Figma nunca abriu. Duas fogem do padrão de propósito —
   "Quanto custa" não cita valor, e "horário de funcionamento" não afirma
   sábado, porque isso ainda é pendência (item 5).
5. **Horário de funcionamento é aproximação** — `contato.horario` em
   `lib/site.ts` está como "Seg a Sex: 9h às 18h", sem sábado. O Google Maps
   não deixou expandir "Outros horários" (o popover não renderizava com o
   painel de browser oculto) e o Waze só devolveu dois dias, com valores
   inconsistentes entre si (seg. até 18h, ter. até 17h). Conferir o horário
   real — inclusive se a loja abre sábado.
   **Como está tratado hoje:** `contato.horarioDetalhado` tem sábado como
   `null`, e a UI de `/contato` mostra "consultar" em vez de um horário
   chutado; o `openingHoursSpecification` do JSON-LD lista **só** seg–sex.
   Preencher o sábado destrava os dois lugares de uma vez.
6. **Preloader toca a cada carregamento** — não há guarda de `sessionStorage`.
   Se quiser só na primeira visita da sessão, é um `if` de três linhas.
7. **`@keyframes` reais da onda do preloader** — colar o bloco do
   `globals.css` do Make se quiser exatidão em vez da reconstrução (isso é
   sobre o EQUALIZADOR do preloader, não confundir com a onda sonora do hero,
   que já foi totalmente reescrita — ver ONDA-SONORA.md).
8. **Barra invisível do equalizador do preloader** — decidir se corrige.
9. **Título do hero**: negrito (atual) vs peso normal (mockup). Se mudar,
   recalibrar o corpo da fonte junto — sem negrito o texto fica mais estreito.
10. **Frames originais só no OneDrive** — os 121 GIFs de 1920×1080 que
    alimentam `scripts/build-frames.mjs` não estão versionados; só os WebP
    derivados, em `public/hero-frames/`, estão. Se o OneDrive sumir, não dá
    para regerar.
11. **Depoimentos citam nome completo real** do Google (Ana Cristina Machado,
    Barbara Nagime, Giseuda Leal) — sem permissão explícita adicional dessas
    pessoas além do fato de terem publicado a avaliação publicamente. Se o
    cliente preferir menos identificação, trocar para primeiro nome + inicial
    (estilo que o site antigo já usa: "Sr. Edir M. Gomes").
12. ~~CPAP e zumbido só aparecem no FAQ~~ — **resolvido em 29/07/2026**:
    viraram a seção `servicosComplementares`, com card próprio em
    `/servicos`. O bento da Home continua com os 4 itens originais, porque a
    Home não podia ser tocada.
13. **Estatísticas de Depoimentos/Home** (500+ clientes, 10.000+ aparelhos,
    98% recomendariam) — só o "20 anos" foi verificado contra o CNPJ. Os
    outros 3 números vêm do mockup original e nunca foram confirmados com o
    cliente ou com alguma fonte real. **Agora com mais alcance:** aparecem em
    `/sobre` e `/depoimentos` além da Home. Se forem inventados, convém tirar
    — número de vitrine não confirmado é o tipo de coisa que o cliente não
    quer descobrir depois.
14. **`site.url` é `https://otosons.com.br`** — o domínio do site ANTIGO.
    Desde 29/07 vem de `NEXT_PUBLIC_SITE_URL` (ver `.env.example`), mas o
    **padrão continua sendo o domínio antigo**: se o site novo for para outro
    endereço e a variável não for definida **no build**, o Google indexa as
    URLs erradas. Ver §19 e `DEPLOY.md`.
15. **Redes sociais em `social[]` não foram verificadas** —
    `instagram.com/otosons`, `facebook.com/otosons` etc. são palpites de
    handle. Aparecem no rodapé e no `sameAs` do JSON-LD. Conferir os perfis
    reais ou remover.
16. **Nada foi commitado desde 28/07/2026** — ver §2. `git status` mostra a
    reestruturação inteira (8 rotas novas, onda sonora reescrita, fotos,
    expansão + SEO de 29/07) como working tree suja.

---

## 13. Verificado

`npx tsc --noEmit` limpo. Todas as 9 rotas (`/`, `/sobre`, `/servicos`,
`/aparelhos`, `/depoimentos`, `/blog`, `/blog/[slug]`, `/faq`, `/contato`)
testadas retornando `200`; rota de post inexistente retorna `404` corretamente.
Filtro de marca em `/aparelhos` e busca do `/faq` testados com clique/digitação
real via DOM, não só lidos visualmente. Home confirmada idêntica ao estado
anterior à reestruturação (mesmas 6 seções, mesmos ids).

Layout do hero conferido em 1440×900, 1090×1018, 1366×700, 375×812 e 375×667 —
sem transbordo e com o CTA sempre acima da dobra (essa verificação é anterior à
reestruturação multi-página e não foi refeita nas páginas novas).

**Uma limitação recorrente do ambiente**: o painel de browser embutido usado
nas sessões frequentemente fica com `document.visibilityState === "hidden"`,
o que zera `requestAnimationFrame` — animações (contador de estatísticas, onda
sonora) ficam paradas em `0` ou no estado inicial mesmo com o código correto.
Não é bug do site. Confirmar animação de verdade exige ou abrir o painel
visualmente, ou usar a extensão Claude in Chrome com um navegador real (ver
§15).

---

## 14. Sobre o Higgsfield MCP e o modo "Unlimited"

O MCP do Higgsfield **sempre gasta crédito normal**, mesmo quando a conta tem
uma promoção de gerações ilimitadas ativa. Confirmado gastando crédito em dois
modelos diferentes (Recraft V4.1 e Seedream 5.0 Lite) — `987 → 985.75 → 984.75`.

O motivo está documentado no próprio site do Higgsfield, no rodapé da página
de preços: *"Unlimited models and Free Generations are accessible only via
higgsfield.ai and are not accessible on MCP/CLI, Canvas or Supercomputer."* —
ou seja, é uma limitação da própria Higgsfield, não algo que o MCP esconda ou
que dê pra contornar com outro modelo ou parâmetro.

**Para aproveitar o Unlimited de verdade**: o cliente precisa gerar direto em
higgsfield.ai (o toggle "Unlimited" fica ao lado do seletor de modelo, na tela
de geração), baixar o resultado e mandar o link/arquivo. Foi assim que as
fotos de Adaptação e Manutenção de Aparelhos em `public/images/servicos/`
foram feitas — vieram em 4K (5120×2880), então precisaram de compressão (ver
abaixo).

**Comprimindo fotos do Higgsfield**: elas saem em PNG de ~12MB. Usar `sharp`
pra redimensionar (`width: 1600`) e converter pra WebP (`quality: 82`) — reduz
pra ~50-60KB sem banding visível. **Cuidado**: `sharp().png({ quality: N })`
ativa paleta indexada (256 cores) implicitamente, o que causa banding em fotos
reais — usar `.webp({ quality: N })` em vez disso pra manter tom contínuo.

---

## 15. Sobre o MCP do Figma (Make files) — e como contornar

Funciona e lista o arquivo Make inteiro, mas para arquivos `/make/` devolve
apenas **resource links** (`file://figma/make/source/...`). Nenhuma ferramenta
disponível lê esse esquema de URI — `get_figma_skill`/`read_skill_uri` aceitam
só `skill://`. `get_design_context` com `nodeId=0:1` (valor que a própria
descrição da ferramenta manda usar pra Make files) devolve só a lista de
arquivos, nunca o conteúdo. `get_screenshot` e `get_metadata` recusam Make
files explicitamente ("not supported"). **Confirmado em pelo menos 3 sessões
diferentes com 2 arquivos Make diferentes — não vale a pena tentar de novo
esperando resultado diferente.**

Abrir o link do Make direto no navegador (mesmo com permissão "Qualquer pessoa
pode visualizar" habilitada no compartilhamento) também não funciona sem
login — cai numa tela pedindo conta.

**O que funciona: a extensão Claude in Chrome, com o navegador real do
usuário já logado no Figma.** Conectado via `list_connected_browsers`, dá pra
navegar pelo Make de verdade e capturar cada página por **screenshot**
(`mcp__claude-in-chrome__computer` com `action: screenshot`) — a leitura de
texto (`get_page_text`) não funciona porque o preview do Make roda dentro de
um `<iframe>` de outra origem (`*.figma.site`), e a extensão não injeta script
nesse domínio.

**Armadilhas dessa técnica:**
- Cada clique de navegação muda a URL para `preview-route=%2Fnomeadapagina`
  (roteamento client-side de verdade dentro do iframe).
- **`scroll` (roda do mouse, `Page_Down`, `End`) trava o `screenshot` seguinte
  de forma consistente** — reproduzido várias vezes. Não é falha pontual.
  Estratégia que funcionou: nunca rolar; navegar (clique ou URL) pra cada
  seção/página e capturar só o que aparece no viewport inicial. Perde conteúdo
  abaixo da dobra, mas não trava a sessão.
- De vez em quando aparece um modal "Recarregue para continuar" (versão
  desatualizada do Make) que também trava o screenshot até ser fechado —
  clicar em "Salvar e recarregar" resolve.
- Timeouts de 30s a 300s no `screenshot` acontecem soltos, sem padrão óbvio.
  Retry simples (chamar de novo) resolve na maioria das vezes.
- Se uma aba trava de vez (retry não resolve mais), abrir uma aba nova
  (`tabs_create_mcp`) costuma destravar sem precisar desconectar a extensão.

Nessa técnica, consegui capturar **6 das 7 páginas internas** (Sobre,
Serviços, Aparelhos, Depoimentos, Blog, FAQ) antes da sessão travar de vez
tentando abrir Contato — travou em duas abas diferentes, sugerindo que é
específico daquela página, não da sessão em si.

---

---

## 16. Onda sonora do hero

Handoff completo e detalhado em [`ONDA-SONORA.md`](ONDA-SONORA.md) — geometria
matemática (fita torcida, não fios soltos), timeline de entrada, movimento
contínuo (deriva + respiro), o que foi verificado de forma determinística e o
que ainda falta ver rodando de verdade. Não duplicado aqui de propósito, pra
não ter duas fontes da verdade sobre o mesmo assunto.

---

## 17. Expansão + SEO (29/07/2026)

Origem: o cliente mandou prints reais do protótipo Figma (pasta
`fotos da pagina` no OneDrive, capturas FireShot 035–040) e pediu "ajuste o
site inteiro, do SEO até o design; as páginas estão muito curtas".

**O que os prints resolveram** (antes eram extrapolação não confirmada):

- `servicos[1..3]`: duração e os 4 passos de "Como funciona" de Atendimento
  Fonoaudiológico, Adaptação e Manutenção — agora batem com o protótipo.
- FAQ: são **4 categorias e 12 perguntas**, não 3 e 9. A categoria "Sobre
  produtos e preços" existia e faltava; a "Sobre atendimento" que eu havia
  inventado não existe e foi removida (as perguntas úteis migraram para
  "Sobre serviços", que é a categoria real).
- A faixa azul de CTA aparece no fim de **todas** as páginas internas do
  protótipo, não só na Home.

**Arquivos novos:**

```
lib/seo.ts                     metaDaPagina() + geradores de JSON-LD
components/json-ld.tsx         injeta <script type="application/ld+json">
components/midia.tsx           <Foto> e <Video> com placeholder — ver §18
components/secao.tsx           CabecalhoSecao (kicker+H2+régua+subtítulo)
components/equipe.tsx          Wagner e Patrícia
components/diferenciais-servicos.tsx
app/sitemap.ts, app/robots.ts
PROMPTS-MIDIA.md               prompts do Higgsfield + o que precisa foto real
```

**SEO implementado:**

| Item | Onde |
|---|---|
| Description/canonical/OG/Twitter por rota | `seoPaginas` em `lib/site.ts` → `metaDaPagina()` |
| `MedicalBusiness` (endereço, geo, horário, nota 4,6 real) | `app/layout.tsx`, vale para o site todo |
| `BreadcrumbList` | todas as 7 internas + posts |
| `FAQPage` | `/faq` — é o que rende acordeão na SERP |
| `ItemList`+`Service` / `ItemList`+`Product` | `/servicos` / `/aparelhos` |
| `BlogPosting` | `/blog/[slug]`, com data convertida pt-BR → ISO |
| sitemap.xml e robots.txt | gerados de `rotas`, não digitados |
| skip-link "Pular para o conteúdo" | `app/layout.tsx` |

`aggregateRating` usa a nota e a contagem **reais** do Google. Marcar
avaliação inexistente derruba os rich results do domínio inteiro, não só o
trecho falso — não trocar por número de marketing.

**Seções adicionadas por página:**

- `/sobre` — Estatísticas, linha do tempo (`sobre.marcos`), estrutura com 3
  fotos, "Como chegar", CTA final.
- `/servicos` — jornada do paciente em 5 etapas (`processo`), Zumbido e CPAP
  (`servicosComplementares` — resolve a pendência §12.12), Equipe,
  Diferenciais, CTA final.
- `/aparelhos` — guia de tipos RIC/BTE/ITE (clicar aplica o filtro e rola
  até o catálogo), cards de marca com contagem **derivada** de `itens`.
- `/depoimentos` — slot de vídeo, convite para avaliar no Google, CTA final.
- `/blog` — corpo real dos 3 artigos, "Leia também", aviso de conteúdo
  informativo, CTA.
- `/faq` — 4ª categoria, busca agora varre também a resposta, CTA final.
- `/contato` — 3 cards de canal, horário dia a dia, "Como chegar", fachada.

**Páginas não foram fundidas.** O cliente autorizou juntar, mas 8 rotas
indexáveis com conteúdo próprio valem mais em busca local do que 4 páginas
longas — e nenhuma ficou curta depois da expansão.

**Bug corrigido nesta sessão:** na linha do tempo de `/sobre`, a bolinha
numerada caía em cima do título. Causa: o `<span absolute left-0>` estava
dentro do `<Reveal>`, que é um `motion.div` com `transform` — e elemento
transformado vira bloco de contenção de descendente absoluto, então `left-0`
passou a ser a borda do texto em vez da borda do `<li>`. **Regra geral: nunca
colocar filho `absolute` dentro de `Reveal` esperando posicionar pelo
ancestral.**

Verificado: `tsc --noEmit` limpo, `npm run build` gerando 16 páginas
estáticas, as 13 rotas retornando 200, `/blog/nao-existe` em 404, e todos os
blocos JSON-LD validados como JSON parseável (script de checagem em
`/tmp/valida.mjs` — descartável, é só um `fetch` + `JSON.parse` por rota).

---

## 18. Slots de mídia e o componente `<Foto>` / `<Video>`

`components/midia.tsx` checa `publicFileExists` no servidor: existindo o
arquivo, entra a mídia; não existindo, entra um placeholder do mesmo
tamanho, com gradiente da marca, rótulo e — só em dev — o caminho esperado
escrito na tela. Colocar o arquivo em `/public` é a única ação necessária.

**São Server Components** (usam `node:fs`). Nunca importar em arquivo
`"use client"` — é o bug de §11, que derruba TODAS as rotas, não só uma.

Mídia pendente e prompts prontos para o Higgsfield: **[`PROMPTS-MIDIA.md`](PROMPTS-MIDIA.md)**.
Quatro itens de lá **não devem ser gerados por IA** (fachada, interior,
cabine de audiometria e o vídeo de depoimento): todos aparecem em contexto
que afirma "esta é a Otosons", e imagem inventada aí é informação falsa
sobre o negócio.

**As 4 imagens de IA já foram geradas** (29/07/2026, MCP do Higgsfield,
`recraft_v4_1`, 2k, 8 créditos cada): `servicos/zumbido.webp`,
`servicos/cpap.webp`, `blog/tipos-aparelhos.webp`, `blog/manutencao.webp`.
O prompt do CPAP foi ajustado a pedido do cliente para mostrar uma pessoa
dormindo (a primeira versão do documento não tinha pessoa em quadro).
Baixadas, comprimidas com `sharp` e verificadas renderizando no lugar do
placeholder em `/servicos` e `/blog`. Restam só os 4 itens de foto/vídeo
real da tabela acima — esses continuam pendentes de propósito.

---

## 19. SEO técnico e performance (29/07/2026)

Auditoria e correção pedidas com o site já pronto de conteúdo. Guia de
publicação em [`DEPLOY.md`](DEPLOY.md).

### O que estava pesando

| Achado | Antes | Depois |
|---|---|---|
| `atendimento.png` — 2848×1600 num card de ~700px | 3,3 MB | 52 KB webp |
| `testes-auditivos.png` | 1,5 MB | 53 KB webp |
| `logo.svg` — **não é vetor**: 2 `<image>` base64 + metadata C2PA, e o Next não otimiza SVG | 240 KB | 10 KB (`logo-otimizado.webp`, 352×150) |
| `x` dos paths da onda com `.0` forçado (201 pontos × 48 fios) | 8 KB de HTML | 0 |
| **`/public` total** | **8,2 MB** | **3,8 MB** |

Os originais `logo.svg` e `logo.png` ficaram em `/public` como fonte. Não são
servidos (a lista `LOGOS` em `app/layout.tsx` acha o webp primeiro), mas
**cuidado ao referenciá-los de novo** — são a versão pesada.

### O que faltava de SEO

Não existia **nenhum** ícone nem imagem de compartilhamento. Gerados por
`sharp`, a partir do motivo do equalizador (o mesmo do preloader e da onda):

- `app/icon.png` 512×512 — favicon. Marca-palavra "Otosons" é ilegível em
  16px; o símbolo de barras funciona. Conferido renderizando em 16 e 32px.
- `app/apple-icon.png` 180×180
- `app/opengraph-image.png` + `twitter-image.png` 1200×630 — logo centralizado
  sobre **fundo branco de propósito**: o `logo.svg` tem raster embutido com
  fundo branco, então qualquer gradiente atrás revelaria a caixa.
- `app/manifest.ts`

### Cabeçalhos (`next.config.ts`)

`Cache-Control` imutável de 1 ano em `/hero-frames` (derivados de fonte que não
muda; são 2,5 MB, então a 2ª visita fica instantânea) e 30 dias +
`stale-while-revalidate` em `/images` — fotos **não** são imutáveis, o cliente
vai trocar mantendo o mesmo nome. Mais `nosniff`, `Referrer-Policy`,
`X-Frame-Options`, `Permissions-Policy` e `poweredByHeader: false`.

**`headers()` só vale em hospedagem que roda o servidor do Next.** Em
`output: "export"` é ignorado — ver o nginx equivalente em `DEPLOY.md`.

### `NEXT_PUBLIC_SITE_URL`

`site.url` agora vem de env (`.env.example`), porque o padrão é o domínio do
site **antigo**. Tem que estar definida no **build** — `NEXT_PUBLIC_*` é
embutida no bundle. Resolve a pendência §12.14.

### Prioridade de rede do hero

Os 121 frames disparavam de uma vez na prioridade padrão, competindo com CSS,
JS, fontes e com o frame 0 — que é o candidato a LCP da home. Agora:
`<link rel="preload" fetchPriority="high">` no frame 0 (em `hero.tsx`) e
`img.fetchPriority = "low"` nos outros 120 (em `hero-sequence.tsx`).

**Recomprimir os frames não vale**: testado a q80/q72/q65, rende 1%/6%/8% e é
lossy sobre lossy. Os 2,5 MB são inerentes a uma animação de 121 quadros.

### Medido em produção (`next start`, não dev)

| | |
|---|---|
| Home: HTML | 213,9 KB → **47,8 KB** comprimido (78%) |
| Outras rotas: HTML | 13–19 KB comprimidos |
| Home: HTML+JS+CSS | **266,7 KB** comprimidos |
| Frames do hero | 2,53 MB — **só na home**, e imutáveis em cache |
| Build | 16 páginas, todas estáticas |

Varredura das 9 rotas: **1 `<h1>` cada**, description de 96–158 chars, title
≤65, JSON-LD presente, **zero `<img>` sem `alt`**, 15 links internos todos 200.
Nenhum problema.

### Os dois itens que sobraram, e por que não mexi

1. **Framer Motion são ~219 KB de JS comprimido** na home. Dá para trocar o
   `Reveal` (usado em toda seção) por IntersectionObserver + CSS e cortar boa
   parte disso, mas é refatoração da linguagem de animação do site inteiro —
   não é ajuste de performance, é redesenho. Fica como proposta.
2. **O preloader cobre a tela por 3,1s**, o que domina o LCP percebido. É
   decisão de design aprovada pelo cliente (§4, §10). A pendência §12.6 (guarda
   de `sessionStorage` para tocar só na 1ª visita da sessão) resolveria metade
   disso com três linhas — mas muda comportamento de marca, então é chamada
   dele, não minha.
