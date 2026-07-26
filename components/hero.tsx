import { getHeroFrames, publicFileExists } from "@/lib/assets";
import { contato, hero } from "@/lib/site";
import { HeroSequence } from "./hero-sequence";
import { HeroTexto } from "./hero-texto";
import { OndaSonora } from "./onda-sonora";
import { ScrollIndicator } from "./scroll-indicator";

const POSTER = "/images/aparelho.png";

/**
 * Hero de tela cheia.
 *
 * A coluna é um flex vertical que ocupa toda a altura: o aparelho e o título
 * ficam no topo (sobrepostos), e o subtítulo + CTA são empurrados para a base
 * por um `mt-auto` dentro do HeroTexto. Assim o bloco preenche a tela em
 * qualquer altura de viewport, em vez de ficar um caroço centralizado com
 * sobra em cima e embaixo.
 *
 * O aparelho fica na camada de baixo (z-0) e o texto é puxado para cima por
 * margem negativa, de forma que a sequência termine ATRÁS do título, com a
 * base do estojo encostando na última linha ("Valer a Pena").
 */
export function Hero() {
  /* Lido no servidor: basta jogar os arquivos na pasta que eles aparecem. */
  const frames = getHeroFrames();
  const poster = publicFileExists(POSTER) ? POSTER : null;

  return (
    <section
      id="inicio"
      className="relative flex min-h-svh flex-col overflow-hidden pt-[88px] md:pt-[104px]"
    >
      {/* brilho bem sutil atrás do aparelho — só tira o branco chapado */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[980px] max-w-[115vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-100/30 blur-3xl"
      />

      <div className="container-site relative flex w-full flex-1 flex-col pb-8 md:pb-10">
        {/* mt-auto aqui + mt-auto no subtítulo: a sobra de altura se divide em
            duas, em vez de cair inteira entre título e subtítulo. É isso que
            centraliza o aparelho na tela e aproxima os dois textos. */}
        <div className="relative z-0 mt-auto shrink-0">
          <OndaSonora />
          <HeroSequence
            frames={frames}
            poster={poster}
            alt="Aparelhos auditivos Otosons no estojo carregador"
          />
        </div>

        <HeroTexto
          linhas={hero.linhas}
          subtitulo={hero.subtitulo}
          cta={hero.cta}
          ctaHref={contato.whatsapp}
          /* dá tempo da sequência de frames rodar antes do texto entrar */
          atraso={frames.length > 0 ? 0.5 : 0.15}
        />

        <ScrollIndicator href="#servicos" />
      </div>
    </section>
  );
}
