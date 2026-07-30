# Mídia pendente — o que falta e como gerar

Todos os espaços abaixo **já estão montados no site**. O componente
`components/midia.tsx` checa se o arquivo existe em `/public`: se existir,
entra a mídia; se não, entra um placeholder do mesmo tamanho. Ou seja, é só
salvar o arquivo no caminho indicado e recarregar — nenhum código precisa
mudar, e o layout não vai "pular".

Em ambiente de desenvolvimento o placeholder mostra o caminho esperado na
tela, então dá para conferir visualmente onde cada arquivo vai.

---

## ⚠️ Leia antes: nem tudo aqui deve ser gerado por IA

Os slots estão divididos em dois grupos, e a diferença importa:

| Grupo | O que fazer |
|---|---|
| **A — Foto real obrigatória** | Fachada, interior da loja, cabine de audiometria e o vídeo de depoimento. Gerar por IA uma "fachada da Otosons" que não é a fachada real, ou um "paciente" que não existe, é passar informação falsa sobre o negócio para o cliente final. Uma foto de celular bem tirada resolve melhor e é honesta. |
| **B — Pode gerar no Higgsfield** | Cenas genéricas e ilustrativas (zumbido, CPAP, imagens de apoio dos artigos do blog). Não retratam a loja nem pessoas específicas. |

O grupo A está listado no fim, com orientação de como fotografar.

---

## Grupo B — Prompts para o Higgsfield

**Lembrete de custo (CONTEXTO §14):** o MCP do Higgsfield **sempre gasta
crédito**, mesmo com promoção Unlimited ativa. Para usar o Unlimited de
verdade é preciso gerar direto em `higgsfield.ai`, com o toggle "Unlimited"
ao lado do seletor de modelo, e baixar o resultado.

**Formato de saída:** todas em **16:9**. O site recorta com `object-cover`,
então o assunto principal precisa estar no centro — nada importante nas
bordas.

---

### 1. Tratamento de Zumbido
**Salvar em:** `public/images/servicos/zumbido.webp`

```
Cinematic photograph of a calm middle-aged woman sitting in a bright modern
audiology clinic, eyes gently closed, hand resting near her ear, expression
of relief and concentration. Soft natural window light from the left, shallow
depth of field, clean white and light blue interior, medical but warm
atmosphere. Photorealistic, 16:9, no text, no logos, no visible brand names.
```

Ideia da cena: transmitir alívio e escuta interior, sem parecer dor.
Evitar imagens de pessoa com expressão de sofrimento — o assunto é
tratamento, não sintoma.

---

### 2. CPAP — Apneia do Sono
**Salvar em:** `public/images/servicos/cpap.webp`

```
Cinematic photograph of a man in his 50s sleeping peacefully on his side in a
comfortable modern bedroom, wearing a slim modern nasal CPAP mask with a soft
transparent hose resting naturally over the pillow. Relaxed facial expression,
deep restful sleep, white bedding, warm bedside lamp glow mixed with soft blue
pre-dawn light through sheer curtains. The CPAP machine sits quietly on the
nightstand. Calm, safe and restorative mood. Photorealistic, shallow depth of
field, soft natural skin tones, 16:9, no text, no logos, no brand names.
```

**O que faz essa imagem funcionar:**

- **Máscara nasal, não facial completa** — cobre só o nariz. A full-face
  ocupa metade do rosto e o resultado parece UTI, não quarto.
- **Expressão relaxada e de lado** — comunica descanso. Se a pessoa aparecer
  de costas, rígida e de barriga para cima, a leitura vira "paciente".
- **Luz quente do abajur + azul do amanhecer** — é o contraste que dá
  sensação de noite bem dormida terminando, em vez de ambiente hospitalar.

**Se vier estranho** (a IA erra bastante em máscara no rosto — costuma
deformar a alça ou duplicar o tubo), tente nesta ordem:

1. Trocar `man in his 50s` por `woman in her 60s` — muda bastante o resultado.
2. Acrescentar no fim: `mask fitted correctly over the nose only, single
   clean hose, no distortion, anatomically correct face`.
3. Se ainda assim não fechar, mude o ângulo: `viewed from the side, face in
   three-quarter profile` costuma dar menos erro que rosto de frente.

---

### 3. Blog — "Tipos de Aparelhos Auditivos"
**Salvar em:** `public/images/blog/tipos-aparelhos.webp`

```
Clean product-style photograph of three different modern hearing aids
arranged side by side on a smooth white surface: one behind-the-ear model,
one receiver-in-canal with thin wire, one small in-the-ear model. Soft even
studio lighting, subtle shadows, light blue background gradient, crisp
detail. Photorealistic, 16:9, no text, no logos, no brand names.
```

---

### 4. Blog — "Manutenção de Aparelhos Auditivos"
**Salvar em:** `public/images/blog/manutencao.webp`

```
Close-up photograph of hands carefully cleaning a modern hearing aid with a
small soft brush on a clean white desk, next to a drying case and cleaning
tools neatly arranged. Bright even lighting, clinical and organized mood,
shallow depth of field. Photorealistic, 16:9, no text, no logos, no brand
names.
```

---

### 5. Capa do vídeo de depoimento *(opcional)*
**Salvar em:** `public/images/depoimentos/video-capa.webp`

Só é usada como poster enquanto o vídeo real não existe. Se você já tiver o
vídeo, pule — dá para extrair um frame dele.

```
Warm cinematic still of a comfortable interview setting in a modern hearing
clinic: an empty upholstered armchair in soft focus, warm lamp light, blurred
light blue clinical background, inviting and calm atmosphere, no people.
Photorealistic, 16:9, no text, no logos.
```

---

## Comprimindo o resultado

As imagens do Higgsfield saem em PNG grande (podem vir em 4K, ~12 MB). Antes
de colocar em `/public`, converta:

```bash
node -e "const s=require('sharp');s('ENTRADA.png').resize({width:1600}).webp({quality:82}).toFile('SAIDA.webp').then(r=>console.log(r))"
```

**Cuidado (CONTEXTO §14):** use `.webp()`, **não** `.png({quality:N})` —
esse último ativa paleta indexada de 256 cores implicitamente e causa
faixas visíveis (banding) em foto real. Com WebP em qualidade 82 o arquivo
cai para ~50–60 KB sem perda perceptível.

---

## Grupo A — Precisam de material real

Estes quatro não devem ser gerados por IA. Todos aparecem em contexto que
afirma "esta é a Otosons" — uma imagem inventada aqui seria informação falsa
sobre o negócio, e o cliente final percebe quando chega na loja.

| Arquivo | Onde aparece | Como conseguir |
|---|---|---|
| `public/images/sobre/fachada.webp` | `/sobre` e `/contato` | Foto da frente da loja na Rua Gavião Peixoto. De dia, sem contraluz, com a placa legível. Enquadrar na horizontal. |
| `public/images/sobre/interior-loja.webp` | `/sobre` | Recepção ou sala de espera, luz acesa, ambiente arrumado e sem pessoas identificáveis (ou com autorização). Horizontal. |
| `public/images/sobre/cabine-audiometria.webp` | `/sobre` | A cabine acústica com o equipamento. É a foto que mais transmite estrutura profissional — vale caprichar. |
| `public/videos/depoimento-paciente.mp4` | `/depoimentos` | Depoimento gravado com paciente real **que assine autorização de uso de imagem**. Celular na horizontal, apoiado, ambiente silencioso, 30–60 s. |

Dicas rápidas para as fotos de celular:

- **Horizontal sempre** (os três slots são largos)
- Limpe a lente antes — é o erro mais comum
- Luz natural, de dia, sem flash
- Não use zoom digital; chegue mais perto
- Tire 4 ou 5 de cada e escolha depois

Depois, comprima igual às geradas: `resize({width:1600})` + `webp({quality:82})`.

---

## Situação atual

| Arquivo | Status |
|---|---|
| `images/servicos/testes-auditivos.png` | ✅ existe |
| `images/servicos/atendimento.png` | ✅ existe |
| `images/servicos/adaptacao.webp` | ✅ existe |
| `images/servicos/manutencao.webp` | ✅ existe |
| `images/blog/perda-auditiva.webp` | ✅ existe |
| `images/servicos/zumbido.webp` | ✅ gerado em 29/07/2026 (Recraft V4.1) |
| `images/servicos/cpap.webp` | ✅ gerado em 29/07/2026 (Recraft V4.1, prompt com pessoa dormindo) |
| `images/blog/tipos-aparelhos.webp` | ✅ gerado em 29/07/2026 (Recraft V4.1) |
| `images/blog/manutencao.webp` | ✅ gerado em 29/07/2026 (Recraft V4.1) |
| `images/depoimentos/video-capa.webp` | ⬜ gerar (prompt 5, opcional) |
| `images/sobre/fachada.webp` | 📷 foto real |
| `images/sobre/interior-loja.webp` | 📷 foto real |
| `images/sobre/cabine-audiometria.webp` | 📷 foto real |
| `videos/depoimento-paciente.mp4` | 🎥 gravar |

As 4 imagens acima foram geradas direto pelo MCP do Higgsfield (modelo
`recraft_v4_1`, 2k, 16:9), 8 créditos cada — 32 no total. Baixadas,
comprimidas com `sharp` (`resize 1600px` + `webp quality 82`) e já estão
em `/public`. Nenhuma mudança de código foi necessária: o componente
`<Foto>` detectou o arquivo sozinho.
