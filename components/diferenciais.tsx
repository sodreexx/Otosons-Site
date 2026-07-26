import { Cpu, HeartHandshake, ShieldCheck } from "lucide-react";
import { diferenciais } from "@/lib/site";
import { Reveal } from "./reveal";

const icones = {
  cpu: Cpu,
  handshake: HeartHandshake,
  shield: ShieldCheck,
};

export function Diferenciais() {
  return (
    <section id="sobre" className="py-20 md:py-28">
      <div className="container-site">
        <Reveal className="text-center">
          <span className="inline-block rounded-full bg-brand-50 px-4 py-1.5">
            <span className="kicker">{diferenciais.kicker}</span>
          </span>
          <h2 className="mx-auto mt-5 max-w-xl text-3xl md:text-4xl">
            {diferenciais.titulo}
          </h2>
          <span className="rule-underline" />
          <p className="mx-auto mt-8 max-w-2xl text-gray-500">
            {diferenciais.subtitulo}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {diferenciais.itens.map((item, i) => {
            const Icone = icones[item.icone];

            return (
              <Reveal key={item.titulo} delay={i * 0.12}>
                <article className="group h-full rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-800/5">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-500 text-white shadow-lg shadow-brand-800/20 transition-transform duration-300 group-hover:scale-110">
                    <Icone size={22} />
                  </span>
                  <h3 className="mt-6 font-display text-lg font-semibold">
                    {item.titulo}
                  </h3>
                  <p className="mt-3 text-sm text-gray-500">{item.descricao}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
