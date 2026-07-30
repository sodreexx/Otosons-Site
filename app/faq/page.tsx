import type { Metadata } from "next";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { jsonLdBreadcrumb, jsonLdFaq, metaDaPagina } from "@/lib/seo";

export const metadata: Metadata = metaDaPagina("faq");

export default function FaqPage() {
  return (
    <main id="conteudo">
      <JsonLd dados={jsonLdBreadcrumb("FAQ", "/faq")} />
      {/* FAQPage: é o schema que rende acordeão de perguntas direto na SERP —
          o de maior retorno visível para este site. */}
      <JsonLd dados={jsonLdFaq()} />
      <Faq />
    </main>
  );
}
