import type { Metadata } from "next";
import {
  aparelhos,
  blog,
  contato,
  faq,
  seoPaginas,
  servicos,
  site,
  type PostBlog,
} from "./site";

/**
 * Camada de SEO do site.
 *
 * Duas responsabilidades:
 *   1. `metaDaPagina` — monta o objeto Metadata do Next a partir de
 *      `seoPaginas`, garantindo que toda rota tenha description, canonical
 *      e Open Graph sem repetir 8 vezes o mesmo boilerplate.
 *   2. `jsonLd*` — gera os dados estruturados (schema.org). É o que faz o
 *      Google mostrar estrelas, endereço, horário e o acordeão de FAQ direto
 *      no resultado de busca. Para um negócio local, isso costuma valer mais
 *      que qualquer ajuste de texto.
 */

type ChavePagina = keyof typeof seoPaginas;

/** Caminho de cada rota, casado com a chave de `seoPaginas`. */
export const rotas: Record<ChavePagina, string> = {
  home: "/",
  sobre: "/sobre",
  servicos: "/servicos",
  aparelhos: "/aparelhos",
  depoimentos: "/depoimentos",
  blog: "/blog",
  faq: "/faq",
  contato: "/contato",
};

export function metaDaPagina(chave: ChavePagina): Metadata {
  const { titulo, descricao } = seoPaginas[chave];
  const caminho = rotas[chave];

  return {
    title: titulo,
    description: descricao,
    keywords: site.palavrasChave,
    alternates: { canonical: caminho },
    openGraph: {
      title: `${titulo} | ${site.name}`,
      description: descricao,
      url: caminho,
      siteName: site.name,
      locale: "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${titulo} | ${site.name}`,
      description: descricao,
    },
  };
}

const urlAbsoluta = (caminho: string) => new URL(caminho, site.url).toString();

/**
 * Ficha do negócio. `MedicalBusiness` (e não `LocalBusiness` puro) porque é
 * atendimento em saúde — o Google usa esse tipo para decidir quais campos
 * exibir no painel lateral.
 *
 * `aggregateRating` usa a nota e a contagem REAIS do perfil do Google. Isso
 * é obrigatório: marcar avaliação que não existe é violação de diretriz e
 * derruba todos os rich results do domínio, não só o trecho falso.
 */
export function jsonLdNegocio() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": urlAbsoluta("/#negocio"),
    name: site.name,
    legalName: site.razaoSocial,
    description: site.description,
    url: site.url,
    telephone: contato.telefone,
    email: contato.email,
    foundingDate: site.fundacao,
    taxID: site.cnpj,
    priceRange: "$$",
    medicalSpecialty: "Otolaryngologic",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Gavião Peixoto, 13 — Loja 103",
      addressLocality: contato.bairro,
      addressRegion: contato.estado,
      postalCode: contato.cep,
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: contato.lat,
      longitude: contato.lng,
    },
    /* Só os dias confirmados. Sábado está pendente em `horarioDetalhado` e
       por isso não entra aqui — horário errado no schema manda cliente para
       uma porta fechada. */
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: contato.notaGoogle,
      reviewCount: contato.avaliacoesGoogle,
      bestRating: 5,
    },
    areaServed: [
      { "@type": "City", name: "Niterói" },
      { "@type": "City", name: "São Gonçalo" },
      { "@type": "City", name: "Maricá" },
      { "@type": "City", name: "Rio de Janeiro" },
    ],
    sameAs: [
      "https://instagram.com/otosons",
      "https://facebook.com/otosons",
    ],
  };
}

/** Trilha de navegação — vira o caminho "otosons.com.br › Serviços" no Google. */
export function jsonLdBreadcrumb(pagina: string, caminho: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: urlAbsoluta("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pagina,
        item: urlAbsoluta(caminho),
      },
    ],
  };
}

/** Acordeão de perguntas direto no resultado de busca. */
export function jsonLdFaq() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.categorias.flatMap((categoria) =>
      categoria.itens.map((item) => ({
        "@type": "Question",
        name: item.pergunta,
        acceptedAnswer: { "@type": "Answer", text: item.resposta },
      })),
    ),
  };
}

/** Lista de serviços oferecidos, ligada à ficha do negócio. */
export function jsonLdServicos() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: servicos.map((servico, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: servico.titulo,
        description: servico.descricao,
        provider: { "@id": urlAbsoluta("/#negocio") },
        areaServed: { "@type": "City", name: "Niterói" },
      },
    })),
  };
}

/** Catálogo de aparelhos. Sem `offers` — não há preço público a declarar. */
export function jsonLdAparelhos() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: aparelhos.titulo,
    itemListElement: aparelhos.itens.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: `${item.marca} ${item.modelo}`,
        brand: { "@type": "Brand", name: item.marca },
        description: item.descricao,
        category: "Aparelho auditivo",
      },
    })),
  };
}

/**
 * Artigo do blog. `datePublished` sai da data em português de `lib/site.ts`
 * convertida para ISO — o schema exige ISO 8601, e "14 de janeiro de 2025"
 * é simplesmente ignorado pelo validador.
 */
const MESES = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];

export function dataParaIso(dataPtBr: string): string | undefined {
  const m = dataPtBr.match(/(\d{1,2}) de (\p{L}+) de (\d{4})/u);
  if (!m) return undefined;

  const mes = MESES.indexOf(m[2].toLowerCase());
  if (mes < 0) return undefined;

  return `${m[3]}-${String(mes + 1).padStart(2, "0")}-${m[1].padStart(2, "0")}`;
}

export function jsonLdArtigo(post: PostBlog) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.titulo,
    description: post.resumo,
    image: urlAbsoluta(post.imagem),
    datePublished: dataParaIso(post.data),
    articleSection: post.tag,
    inLanguage: "pt-BR",
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@id": urlAbsoluta("/#negocio") },
    mainEntityOfPage: urlAbsoluta(`/blog/${post.slug}`),
    isAccessibleForFree: true,
  };
}

/** Metadata de um post — título e descrição vêm do próprio post. */
export function metaDoPost(post: PostBlog): Metadata {
  const caminho = `/blog/${post.slug}`;

  return {
    title: post.titulo,
    description: post.resumo,
    alternates: { canonical: caminho },
    openGraph: {
      title: post.titulo,
      description: post.resumo,
      url: caminho,
      siteName: site.name,
      locale: "pt_BR",
      type: "article",
      publishedTime: dataParaIso(post.data),
      images: [{ url: post.imagem }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.titulo,
      description: post.resumo,
    },
  };
}

/** Lista todos os posts — usada no sitemap. */
export const slugsDeBlog = blog.posts.map((p) => p.slug);
