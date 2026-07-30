import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { ServicosCompleto } from "@/components/servicos-completo";
import { jsonLdBreadcrumb, jsonLdServicos, metaDaPagina } from "@/lib/seo";

export const metadata: Metadata = metaDaPagina("servicos");

export default function ServicosPage() {
  return (
    <main id="conteudo">
      <JsonLd dados={jsonLdBreadcrumb("Serviços", "/servicos")} />
      <JsonLd dados={jsonLdServicos()} />
      <ServicosCompleto />
    </main>
  );
}
