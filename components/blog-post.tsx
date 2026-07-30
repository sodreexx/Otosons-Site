import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock, Info } from "lucide-react";
import { blog, contato, type PostBlog } from "@/lib/site";
import { Foto } from "./midia";
import { Reveal } from "./reveal";

/**
 * Página de artigo.
 *
 * O corpo (`post.corpo`) é conteúdo educativo geral sobre saúde auditiva,
 * escrito nesta sessão — não veio do protótipo Figma nem do cliente. Por
 * isso o `blog.aviso` no rodapé do artigo: o texto informa, mas não
 * diagnostica, e isso precisa estar dito na página, não só no código.
 * Recomendado: Wagner ou Patrícia revisarem antes de publicar.
 */
export function BlogPost({ post }: { post: PostBlog }) {
  /* Relacionados: mesma categoria primeiro, completando com os demais até
     dois — assim o bloco nunca aparece vazio num blog de 3 posts. */
  const outros = blog.posts.filter((p) => p.slug !== post.slug);
  const relacionados = [
    ...outros.filter((p) => p.tag === post.tag),
    ...outros.filter((p) => p.tag !== post.tag),
  ].slice(0, 2);

  return (
    <>
      <article className="pb-20 pt-[calc(88px+2.5rem)] md:pt-[calc(104px+3rem)]">
        <div className="container-site max-w-3xl">
          <Reveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-brand-800"
            >
              <ArrowLeft size={15} />
              Voltar para o blog
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-md bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-800">
                {post.tag}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <Calendar size={13} />
                {post.data}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <Clock size={13} />
                {post.leitura}
              </span>
            </div>

            <h1 className="mt-4 text-3xl md:text-4xl">{post.titulo}</h1>

            <p className="mt-5 text-lg leading-relaxed text-gray-600">
              {post.resumo}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <figure className="relative mt-8 h-64 overflow-hidden rounded-2xl bg-gray-200 md:h-96">
              <Foto
                src={post.imagem}
                alt={post.titulo}
                sizes="(max-width: 768px) 100vw, 768px"
                rotulo="Imagem do artigo"
                prioridade
              />
            </figure>
          </Reveal>

          {/* Corpo do artigo. Não uso `prose` do Tailwind Typography (não está
              instalado) — os espaçamentos abaixo replicam o essencial dele. */}
          <Reveal delay={0.14}>
            <div className="mt-10">
              {post.corpo.map((bloco, i) => {
                if (bloco.tipo === "h2") {
                  return (
                    <h2
                      key={i}
                      className="mt-10 font-display text-xl font-semibold md:text-2xl"
                    >
                      {bloco.texto}
                    </h2>
                  );
                }

                if (bloco.tipo === "ul") {
                  return (
                    <ul key={i} className="mt-5 space-y-3">
                      {bloco.itens.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span
                            aria-hidden
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
                          />
                          <span className="text-[15px] leading-relaxed text-gray-600">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  );
                }

                return (
                  <p
                    key={i}
                    className="mt-5 text-[15px] leading-relaxed text-gray-600"
                  >
                    {bloco.texto}
                  </p>
                );
              })}
            </div>
          </Reveal>

          {/* Aviso de conteúdo informativo ------------------------------ */}
          <Reveal delay={0.16}>
            <aside className="mt-10 flex items-start gap-3 rounded-xl border border-brand-100 bg-brand-50/60 p-5">
              <Info size={18} className="mt-0.5 shrink-0 text-brand-600" />
              <p className="text-sm leading-relaxed text-gray-600">
                {blog.aviso}
              </p>
            </aside>
          </Reveal>

          {/* CTA -------------------------------------------------------- */}
          <Reveal delay={0.18}>
            <div className="mt-8 rounded-2xl bg-surface p-8 text-center">
              <h2 className="font-display text-lg font-semibold">
                Quer saber como está a sua audição?
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                Agende uma avaliação auditiva completa com nossos
                fonoaudiólogos em Icaraí, Niterói.
              </p>
              <a
                href={contato.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand-800 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-700"
              >
                Agendar avaliação
              </a>
            </div>
          </Reveal>
        </div>
      </article>

      {/* Leia também ---------------------------------------------------- */}
      {relacionados.length > 0 && (
        <section className="bg-surface py-16 md:py-20">
          <div className="container-site max-w-3xl">
            <h2 className="font-display text-lg font-semibold">Leia também</h2>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {relacionados.map((outro, i) => (
                <Reveal key={outro.slug} delay={i * 0.08}>
                  <Link
                    href={`/blog/${outro.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
                  >
                    <span className="self-start rounded-md bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-800">
                      {outro.tag}
                    </span>
                    <h3 className="mt-4 flex-1 font-display text-base leading-snug transition-colors group-hover:text-brand-600">
                      {outro.titulo}
                    </h3>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600">
                      Ler artigo
                      <ArrowRight
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
