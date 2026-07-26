import { publicFileExists } from "@/lib/assets";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Servicos } from "@/components/servicos";
import { Estatisticas } from "@/components/estatisticas";
import { Diferenciais } from "@/components/diferenciais";
import { Blog } from "@/components/blog";
import { CtaFinal } from "@/components/cta-final";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFab } from "@/components/whatsapp-fab";

/* Aceita .svg ou .png — usa o primeiro que existir em /public. */
const LOGOS = ["/logo.svg", "/logo.png"];

export default function Home() {
  const logo = LOGOS.find(publicFileExists) ?? null;

  return (
    <>
      <SiteHeader logo={logo} />
      <main>
        <Hero />
        <Servicos />
        <Estatisticas />
        <Diferenciais />
        <Blog />
        <CtaFinal />
      </main>
      <SiteFooter />
      <WhatsappFab />
    </>
  );
}
