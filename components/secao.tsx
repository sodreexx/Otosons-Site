import { Reveal } from "./reveal";

/**
 * Cabeçalho de seção: kicker em pílula + H2 + régua + subtítulo opcional.
 *
 * Esse bloco estava copiado literalmente em diferenciais, depoimentos,
 * equipe e blog. Centralizar aqui não é só menos linha — é garantir que o
 * espaçamento entre kicker, título e régua seja idêntico em toda página,
 * que é o tipo de inconsistência que aparece quando se compara duas seções
 * lado a lado.
 */
export function CabecalhoSecao({
  kicker,
  titulo,
  subtitulo,
  /** `h1` só na página que ainda não tem um — hoje nenhuma, mas evita
      travar o componente num nível de heading fixo. */
  nivel: Tag = "h2",
  className = "",
}: {
  kicker?: string;
  titulo: string;
  subtitulo?: string;
  nivel?: "h1" | "h2";
  className?: string;
}) {
  return (
    <Reveal className={`text-center ${className}`}>
      {kicker ? (
        <span className="inline-block rounded-full bg-brand-50 px-4 py-1.5">
          <span className="kicker">{kicker}</span>
        </span>
      ) : null}

      <Tag className={`mx-auto max-w-2xl text-3xl md:text-4xl ${kicker ? "mt-5" : ""}`}>
        {titulo}
      </Tag>
      <span className="rule-underline" />

      {subtitulo ? (
        <p className="mx-auto mt-8 max-w-2xl text-gray-500">{subtitulo}</p>
      ) : null}
    </Reveal>
  );
}
