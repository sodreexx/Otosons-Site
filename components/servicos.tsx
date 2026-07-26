import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { publicFileExists } from "@/lib/assets";
import { servicos } from "@/lib/site";
import { Reveal } from "./reveal";

/* Mapa explícito: o Tailwind não enxerga classes montadas por concatenação,
   então os spans precisam existir como string literal no arquivo. */
const colSpan: Record<number, string> = {
  5: "md:col-span-5",
  7: "md:col-span-7",
};

export function Servicos() {
  return (
    <section id="servicos" className="bg-surface py-20 md:py-28">
      <div className="container-site">
        <Reveal>
          <h2 className="text-center text-3xl md:text-4xl">Serviços</h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-12">
          {servicos.map((servico, i) => {
            const temFoto = publicFileExists(servico.imagem);

            return (
              <Reveal
                key={servico.titulo}
                delay={i * 0.08}
                className={`${colSpan[servico.span]} col-span-1`}
              >
                <article className="group relative h-64 overflow-hidden rounded-2xl bg-gray-700 md:h-72">
                  {temFoto ? (
                    <Image
                      src={servico.imagem}
                      alt={servico.titulo}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-700 text-gray-500">
                      <ImageIcon size={28} />
                    </div>
                  )}

                  {/* gradiente que garante contraste do texto sobre a foto */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/85 via-gray-900/35 to-transparent transition-opacity duration-500 group-hover:from-gray-900/90" />

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-display text-lg font-semibold text-white">
                      {servico.titulo}
                    </h3>
                    {/* A descrição desliza para cima e aparece no hover. Em
                        aparelho sem hover ela nasce visível — senão o texto
                        simplesmente não existiria no celular. */}
                    <p className="mt-1 max-w-sm text-sm text-white/0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-white/85 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:text-white/85 md:translate-y-1 md:group-hover:translate-y-0">
                      {servico.descricao}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
