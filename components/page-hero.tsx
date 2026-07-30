import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "./reveal";

/**
 * Cabeçalho de página interna — breadcrumb + título + subtítulo sobre uma
 * faixa com gradiente azul claro. Mesmo padrão nas 6 páginas do protótipo
 * Figma que consegui capturar (Sobre, Serviços, Aparelhos, Depoimentos, Blog,
 * FAQ); a Contato não pôde ser vista (a sessão travou 2x), então segue o
 * mesmo padrão por consistência, não por confirmação visual.
 */
export function PageHero({
  pagina,
  titulo,
  subtitulo,
}: {
  pagina: string;
  titulo: string;
  subtitulo: string;
}) {
  return (
    <section className="bg-gradient-to-b from-brand-50 to-white pb-14 pt-[calc(88px+2.5rem)] md:pb-16 md:pt-[calc(104px+3rem)]">
      <div className="container-site">
        <Reveal>
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
            <Link
              href="/"
              className="text-gray-500 transition-colors hover:text-brand-800"
            >
              Início
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-brand-800">{pagina}</span>
          </nav>

          <h1 className="mt-4 max-w-2xl text-3xl md:text-4xl">{titulo}</h1>
          <p className="mt-3 max-w-2xl text-gray-500">{subtitulo}</p>
        </Reveal>
      </div>
    </section>
  );
}
