import type { Metadata } from "next";
import { Aparelhos } from "@/components/aparelhos";
import { JsonLd } from "@/components/json-ld";
import { jsonLdAparelhos, jsonLdBreadcrumb, metaDaPagina } from "@/lib/seo";

export const metadata: Metadata = metaDaPagina("aparelhos");

export default function AparelhosPage() {
  return (
    <main id="conteudo">
      <JsonLd dados={jsonLdBreadcrumb("Aparelhos", "/aparelhos")} />
      <JsonLd dados={jsonLdAparelhos()} />
      <Aparelhos />
    </main>
  );
}
