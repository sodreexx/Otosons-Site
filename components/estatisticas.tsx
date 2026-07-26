import { estatisticas } from "@/lib/site";
import { CountUp } from "./count-up";
import { Reveal } from "./reveal";

export function Estatisticas() {
  return (
    <section className="border-b border-gray-100 py-14">
      <div className="container-site">
        <dl className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
          {estatisticas.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.1} className="text-center">
              <dt className="font-display text-3xl font-bold text-brand-800 md:text-4xl">
                <CountUp valor={item.valor} separador={item.separador} />
                {item.sufixo}
              </dt>
              <dd className="mt-2 text-sm text-gray-500">{item.label}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
