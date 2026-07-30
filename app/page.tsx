import { Hero } from "@/components/hero";
import { Servicos } from "@/components/servicos";
import { Estatisticas } from "@/components/estatisticas";
import { Diferenciais } from "@/components/diferenciais";
import { Blog } from "@/components/blog";
import { CtaFinal } from "@/components/cta-final";

export default function Home() {
  return (
    <main id="conteudo">
      <Hero />
      <Servicos />
      <Estatisticas />
      <Diferenciais />
      <Blog />
      <CtaFinal />
    </main>
  );
}
