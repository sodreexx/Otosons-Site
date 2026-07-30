import type { Metadata } from "next";
import { Contato } from "@/components/contato";
import { JsonLd } from "@/components/json-ld";
import { jsonLdBreadcrumb, metaDaPagina } from "@/lib/seo";

export const metadata: Metadata = metaDaPagina("contato");

export default function ContatoPage() {
  return (
    <main id="conteudo">
      <JsonLd dados={jsonLdBreadcrumb("Contato", "/contato")} />
      <Contato />
    </main>
  );
}
