import { Award, HeartHandshake, ShieldCheck, Users } from "lucide-react";
import { diferenciaisServicos } from "@/lib/site";
import { CabecalhoSecao } from "./secao";
import { Reveal } from "./reveal";

const icones = {
  handshake: HeartHandshake,
  award: Award,
  shield: ShieldCheck,
  users: Users,
};

export function DiferenciaisServicos() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-site">
        <CabecalhoSecao
          kicker={diferenciaisServicos.kicker}
          titulo={diferenciaisServicos.titulo}
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {diferenciaisServicos.itens.map((item, i) => {
            const Icone = icones[item.icone];

            return (
              <Reveal key={item.titulo} delay={i * 0.1}>
                <article className="group h-full rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-800/5">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-500 text-white shadow-lg shadow-brand-800/20 transition-transform duration-300 group-hover:scale-110">
                    <Icone size={19} />
                  </span>
                  <h3 className="mt-5 font-display text-base font-semibold">
                    {item.titulo}
                  </h3>
                  <p className="mt-2.5 text-sm text-gray-500">
                    {item.descricao}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
