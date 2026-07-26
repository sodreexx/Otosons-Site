# Otosons — site institucional

Next.js 15 (App Router) · React 19 · Tailwind v4 · Framer Motion · TypeScript

```bash
npm run dev     # http://localhost:3000
npm run build   # build de produção
```

Todo o texto do site está em [`lib/site.ts`](lib/site.ts). Nenhum componente
tem conteúdo fixo dentro dele — para trocar telefone, endereço, serviços ou
posts do blog, mexa só nesse arquivo.

Onde colocar imagens: [`public/LEIA-ME.md`](public/LEIA-ME.md).

---

## Paleta

Extraída pixel a pixel do mockup. É a paleta padrão do Tailwind:

| Uso                                  | Cor       | Token          |
| ------------------------------------ | --------- | -------------- |
| Títulos, links, números, kickers     | `#1E40AF` | `brand-800`    |
| Texto de corpo                       | `#6B7280` | `gray-500`     |
| Fundo de seção (Serviços/Blog/Rodapé)| `#F3F4F6` | `surface`      |
| Gradiente do CTA e dos ícones        | `#1E40AF` → `#3B82F6` | `brand-800`/`brand-500` |

Fontes: **Poppins** (títulos) e **Inter** (corpo), via `next/font`.

---

## Animação do hero

121 frames do estojo abrindo. Roda **uma vez ao carregar** e congela no último
frame — que é exatamente a pose do mockup.

### Pipeline dos frames

Os frames originais são 121 GIFs de 1920×1080 (**24,7 MB**). Servir isso num
hero seria inviável, então há um script de conversão:

```bash
node scripts/build-frames.mjs "C:\caminho\para\frames da hero"
```

Ele faz duas coisas que importam:

1. **Recorta pela união dos bounding boxes**, não pelo de cada frame. Recortar
   frame a frame faria o aparelho pular de posição a cada troca; a união mantém
   o enquadramento fixo e ainda descarta a área transparente que nunca é usada.
   No caso: 1920×1080 → **883×985**.
2. Reduz para 700px de largura (2× do tamanho de exibição) e grava em WebP.

Resultado: **24,7 MB → 2,51 MB**, 21 KB por frame.

Rode o script de novo sempre que os frames de origem mudarem.

### Como a reprodução funciona

- O frame 0 aparece no primeiro paint. O hero **nunca** fica vazio esperando
  download.
- Os outros 120 são baixados e decodificados em segundo plano. A troca de
  `src` só começa depois — sem isso, cada troca causaria uma piscada branca.
- O avanço é por **tempo decorrido** (`performance.now`), não "+1 frame por
  tick". A duração é a mesma em tela de 60Hz e de 144Hz, e um engasgo pula
  frames em vez de deixar a animação em câmera lenta.
- 121 frames a 30fps ≈ **4s**. Para acelerar, mude `FPS` em
  [`components/hero-sequence.tsx`](components/hero-sequence.tsx).
- Se a pasta `public/hero-frames/` estiver vazia, cai para
  `public/images/aparelho.png`. Se essa também faltar, mostra um placeholder
  com instruções — o site nunca quebra por falta de asset.

---

## Animações implementadas

| Onde | O quê | Detalhe |
| --- | --- | --- |
| **Hero — aparelho** | Sequência de 121 frames | Uma vez, congela no fim |
| **Hero — título** | Revelação palavra a palavra | Cada palavra sobe de dentro de uma máscara; stagger de 35ms |
| **Hero — subtítulo e botão** | Fade + subida | Encadeados após a última palavra |
| **Header** | Fundo sólido + blur | A partir de 12px de scroll |
| **Header — nav** | Sublinhado cresce do centro | Hover |
| **Seções** | Fade + subida de 24px | Dispara 80px antes de entrar na viewport, uma vez só |
| **Cards** | Stagger de 80–120ms | Entram em cascata, não em bloco |
| **Estatísticas** | Contador de 0 até o valor | 1,6s, ease-out cúbico, dispara ao entrar na tela |
| **Cards de serviço** | Zoom na foto + descrição sobe | Hover |
| **Cards de diferencial** | Card sobe, borda azula, ícone cresce | Hover |
| **Cards do blog** | Card sobe, foto amplia, "Ler artigo" aparece | Hover |
| **Botões** | Sobem 2px + sombra cresce | Ícone se move junto |
| **Botão flutuante** | Entra em escala + halo pulsante | Só após 400px de scroll |
| **Menu mobile** | Expande em altura | `AnimatePresence` |

### Princípios usados

- **Uma curva só:** `cubic-bezier(0.22, 1, 0.36, 1)` em tudo. Misturar easings
  diferentes faz o site parecer montado por pessoas diferentes.
- **`once: true` nas entradas.** Reanimar a cada scroll cansa numa página que a
  pessoa vai percorrer pra cima e pra baixo procurando o telefone.
- **Stagger curto.** 35ms entre palavras, 80–120ms entre cards. Acima disso a
  animação começa a atrasar a leitura em vez de guiá-la.
- **`prefers-reduced-motion` respeitado em toda parte** — no CSS e também no
  JS (`useReducedMotion`). Num site cujo público é majoritariamente idoso,
  isso não é detalhe: quem tem vertigem ou sensibilidade vestibular recebe o
  layout final, estático, sem nenhum movimento.

---

## Próximos passos sugeridos

Seções que existem na navegação mas ainda não foram construídas:

- **Aparelhos** — boa candidata para uma segunda sequência de frames, essa sim
  em *scroll-scrub* (frames amarrados à posição do scroll, estilo Apple),
  criando contraste com o hero que roda sozinho.
- **Depoimentos** — carrossel com arraste; `AnimatePresence` para a troca.
- **FAQ** — acordeão com altura animada, mesmo padrão do menu mobile.
- **Sobre** — timeline dos 15 anos, com a linha se desenhando conforme o scroll.

Duas ideias que combinam com a marca:

- **Onda sonora reagindo ao scroll** no divisor entre seções — o logo já tem
  esse vocabulário visual (as listras dentro das letras).
- **Simulador de perda auditiva**: dois botões, "como você ouve hoje" e "com o
  aparelho", tocando o mesmo áudio filtrado. É o tipo de coisa que converte,
  porque a pessoa sente a diferença em vez de ler sobre ela.
