import type { Metadata } from "next";
import { Depoimentos } from "@/components/depoimentos";
import { JsonLd } from "@/components/json-ld";
import { jsonLdBreadcrumb, metaDaPagina } from "@/lib/seo";

export const metadata: Metadata = metaDaPagina("depoimentos");

export default function DepoimentosPage() {
  return (
    <main id="conteudo">
      <JsonLd dados={jsonLdBreadcrumb("Depoimentos", "/depoimentos")} />
      <Depoimentos />
    </main>
  );
}
