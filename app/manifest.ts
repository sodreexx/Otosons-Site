import type { MetadataRoute } from "next";
import { seoPaginas, site } from "@/lib/site";

/**
 * Web App Manifest.
 *
 * Não é para virar app instalável — é para o Android/Chrome ter nome, cor e
 * ícone certos quando alguém salva o site na tela inicial, e porque o
 * Lighthouse cobra o arquivo na auditoria de PWA/boas práticas.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.tagline}`,
    short_name: site.name,
    description: seoPaginas.home.descricao,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#1e40af",
    lang: "pt-BR",
    categories: ["health", "medical"],
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
