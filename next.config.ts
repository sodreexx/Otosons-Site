import type { NextConfig } from "next";

/*
 * Cabeçalhos de cache e de segurança.
 *
 * IMPORTANTE: `headers()` só vale em hospedagem que roda o servidor do Next
 * (Vercel, Node, Docker). Em `output: "export"` estático eles são ignorados —
 * nesse caso os mesmos valores precisam ser configurados no CDN/nginx.
 */
const UM_ANO = 60 * 60 * 24 * 365;
const TRINTA_DIAS = 60 * 60 * 24 * 30;

const seguranca = [
  /* Impede o navegador de "adivinhar" um tipo diferente do declarado — é o
     que transforma uma imagem malformada em execução de script. */
  { key: "X-Content-Type-Options", value: "nosniff" },
  /* Não vaza o caminho completo da página de origem para outros domínios. */
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  /* O site não deve ser embutido em iframe de terceiros (clickjacking). Não
     afeta o mapa em /contato: lá somos NÓS que embutimos o Google. */
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  /* Nenhuma dessas APIs é usada — negar reduz superfície e evita prompt. */
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

const nextConfig: NextConfig = {
  /* AVIF antes de WebP: ~20% menor no mesmo nível de qualidade. Codificar é
     mais lento, mas acontece uma vez e fica em cache. */
  images: {
    formats: ["image/avif", "image/webp"],
    /* Padrão do Next é 60s. Como as fotos do site raramente mudam, deixar o
       otimizador guardar por 30 dias evita reprocessar a mesma imagem. */
    minimumCacheTTL: TRINTA_DIAS,
  },

  /* Remove o `X-Powered-By: Next.js`. Não fecha porta nenhuma sozinho, mas
     não há motivo para anunciar stack e versão. */
  poweredByHeader: false,

  /* gzip/brotli na resposta. É o padrão, explicitado para não depender dele. */
  compress: true,

  /* Barra final consistente: evita que /servicos e /servicos/ virem duas URLs
     distintas aos olhos do Google — conteúdo duplicado por descuido. */
  trailingSlash: false,

  async headers() {
    return [
      {
        /* Os 121 frames do hero são derivados de arquivos-fonte que não mudam;
           podem ser tratados como imutáveis. É o que torna a segunda visita
           instantânea, porque são ~2,8 MB. */
        source: "/hero-frames/:arquivo*",
        headers: [
          { key: "Cache-Control", value: `public, max-age=${UM_ANO}, immutable` },
        ],
      },
      {
        /* Fotos NÃO são imutáveis: o cliente vai trocar fachada, interior e
           fotos de blog mantendo o mesmo nome de arquivo. 30 dias com
           revalidação em segundo plano dá cache bom sem prender uma foto velha
           por um ano. */
        source: "/images/:caminho*",
        headers: [
          {
            key: "Cache-Control",
            value: `public, max-age=${TRINTA_DIAS}, stale-while-revalidate=${UM_ANO}`,
          },
        ],
      },
      { source: "/:caminho*", headers: seguranca },
    ];
  },
};

export default nextConfig;
