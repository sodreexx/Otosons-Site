import { equipe } from "@/lib/site";
import { CabecalhoSecao } from "./secao";
import { Reveal } from "./reveal";

export function Equipe() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="container-site">
        <CabecalhoSecao
          kicker={equipe.kicker}
          titulo={equipe.titulo}
          subtitulo={equipe.subtitulo}
        />

        <div className="mx-auto mt-14 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
          {equipe.itens.map((pessoa, i) => (
            <Reveal key={pessoa.nome} delay={i * 0.12}>
              <article className="flex h-full flex-col items-center rounded-2xl border border-gray-200 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-800/5">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-700 to-brand-500 font-display text-xl font-semibold text-white shadow-lg shadow-brand-800/20">
                  {pessoa.nome.charAt(0)}
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">
                  {pessoa.nome}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{pessoa.cargo}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
