import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { Sobre } from "@/components/sobre";
import { jsonLdBreadcrumb, metaDaPagina } from "@/lib/seo";

export const metadata: Metadata = metaDaPagina("sobre");

export default function SobrePage() {
  return (
    <main id="conteudo">
      <JsonLd dados={jsonLdBreadcrumb("Sobre", "/sobre")} />
      <Sobre />
    </main>
  );
}
