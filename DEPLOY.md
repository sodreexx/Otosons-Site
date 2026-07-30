# Publicar o site

## Antes de qualquer coisa: definir o domínio

**Este é o passo que, se esquecido, estraga o SEO inteiro.**

Todo o SEO — canonical, sitemap, Open Graph e JSON-LD — é montado a partir de
uma única variável. O padrão no código é `https://otosons.com.br`, que é o
domínio do **site antigo**.

```bash
NEXT_PUBLIC_SITE_URL=https://dominio-real-do-site.com.br
```

Tem que estar definida **no ambiente de build**, não em tempo de execução:
`NEXT_PUBLIC_*` é embutida no bundle durante o `next build`. Definir depois não
tem efeito nenhum.

Como conferir se pegou, depois de publicar:

```bash
curl -s https://SEU-DOMINIO/ | grep canonical
```

Se aparecer `otosons.com.br` e esse não for o domínio novo, o build saiu sem a
variável. Rebuildar.

---

## Onde hospedar

O site é **100% estático** (16 páginas pré-renderizadas, nenhuma rota dinâmica,
nenhum banco, nenhuma API). Isso abre três caminhos:

### Vercel — recomendado

É a casa do Next: `next/image`, `headers()`, cache e compressão funcionam sem
configuração.

```bash
npx vercel --prod
```

Definir `NEXT_PUBLIC_SITE_URL` em Settings → Environment Variables **antes** do
primeiro build.

### Node em servidor próprio / Docker

```bash
npm ci
NEXT_PUBLIC_SITE_URL=https://seu-dominio npm run build
npm start          # sobe na 3000
```

Atrás de nginx/Apache como proxy reverso. `headers()` do `next.config.ts`
funciona normalmente.

### Hospedagem estática (Netlify, S3+CloudFront, hospedagem compartilhada)

Requer `output: "export"` no `next.config.ts` — e aí **duas coisas param de
funcionar**:

1. **`headers()` é ignorado.** Os cabeçalhos de cache e segurança precisam ser
   recriados no CDN/nginx. Ver a seção abaixo.
2. **`next/image` perde o otimizador.** Precisa de
   `images: { unoptimized: true }`, e as imagens passam a ser servidas no
   tamanho original. Como todas já estão comprimidas (a maior tem 68 KB), o
   impacto é pequeno — mas o AVIF automático e o `srcset` responsivo somem.

---

## Cabeçalhos, se for hospedagem estática

Equivalente nginx do que o `next.config.ts` já faz:

```nginx
# Frames do hero — derivados de fonte que não muda, podem ser imutáveis
location /hero-frames/ {
  add_header Cache-Control "public, max-age=31536000, immutable";
}

# Fotos — o cliente vai trocar mantendo o mesmo nome de arquivo
location /images/ {
  add_header Cache-Control "public, max-age=2592000, stale-while-revalidate=31536000";
}

# Assets com hash no nome
location /_next/static/ {
  add_header Cache-Control "public, max-age=31536000, immutable";
}

# Segurança, em todas as respostas
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()" always;

gzip on;
gzip_types text/html text/css application/javascript application/json image/svg+xml;
```

---

## Depois de publicar

1. **Google Search Console** — adicionar a propriedade e enviar
   `https://SEU-DOMINIO/sitemap.xml` (11 URLs).
2. **Rich Results Test** — https://search.google.com/test/rich-results
   Testar a home (espera `MedicalBusiness`) e `/faq` (espera `FAQPage`, que é o
   que rende o acordeão de perguntas direto no resultado de busca).
3. **Google Business Profile** — o perfil real (nota 4,6 · 85 avaliações) já
   existe. Colocar o site novo lá. Para clínica de bairro isso costuma valer
   mais que qualquer ajuste on-page.
4. **PageSpeed Insights** — rodar contra a URL pública, não contra
   `localhost`. O `localhost` não mede latência de rede nem compressão do CDN.
5. **Redirecionar o domínio antigo**, se o novo for diferente — 301, não 302, e
   página a página onde houver equivalente.

---

## Se o build quebrar

**`npm run build` com o dev server aberto dá 500 nas páginas.** O build de
produção sobrescreve o `.next` que o dev está usando. Solução: parar o dev,
`rm -rf .next`, subir de novo. Nunca rodar os dois juntos.

**Disco C: cheio** trava o shell inteiro no Windows — o harness grava log de
cada comando em `C:\Users\...\AppData\Local\Temp\`. Conferir espaço antes de
builds longos.

---

## O que NÃO está pronto

Nada disso impede publicar, mas convém resolver antes de divulgar:

| Item | Onde |
|---|---|
| 4 fotos/vídeo reais faltando (fachada, interior, cabine, depoimento) | [`PROMPTS-MIDIA.md`](PROMPTS-MIDIA.md) |
| Horário de sábado não confirmado — a UI mostra "consultar" | `contato.horarioDetalhado` |
| Handles de rede social são palpite, nunca verificados | `social[]` em `lib/site.ts` |
| 3 das 4 estatísticas (500+, 10.000+, 98%) nunca foram confirmadas | `estatisticas` em `lib/site.ts` |
| Artigos do blog escritos por mim, sem revisão profissional | `blog.posts[].corpo` |

Detalhe de cada um em [`CONTEXTO.md`](CONTEXTO.md) §12.
