import type { MetadataRoute } from "next";
import { rotas, slugsDeBlog } from "@/lib/seo";
import { site } from "@/lib/site";

/**
 * Sitemap gerado a partir de `rotas` e dos slugs do blog — não é uma lista
 * digitada à mão, então criar uma página nova nunca deixa o sitemap
 * desatualizado.
 *
 * `priority` reflete intenção comercial, não importância subjetiva: Home e
 * Contato convertem, o blog atrai busca de topo de funil.
 */
const prioridade: Record<string, number> = {
  "/": 1,
  "/contato": 0.9,
  "/servicos": 0.9,
  "/aparelhos": 0.8,
  "/sobre": 0.7,
  "/depoimentos": 0.7,
  "/faq": 0.7,
  "/blog": 0.6,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();
  const url = (caminho: string) => new URL(caminho, site.url).toString();

  const paginas = Object.values(rotas).map((caminho) => ({
    url: url(caminho),
    lastModified: agora,
    changeFrequency: "monthly" as const,
    priority: prioridade[caminho] ?? 0.5,
  }));

  const posts = slugsDeBlog.map((slug) => ({
    url: url(`/blog/${slug}`),
    lastModified: agora,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...paginas, ...posts];
}
