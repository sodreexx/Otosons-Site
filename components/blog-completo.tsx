"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ImageIcon, Search } from "lucide-react";
import { blog, contato, type PostBlog } from "@/lib/site";
import { PageHero } from "./page-hero";
import { Reveal } from "./reveal";

/*
 * `temFoto` vem pronto do servidor (app/blog/page.tsx), não é checado aqui:
 * este é client component (precisa de useState para busca/filtro), e
 * publicFileExists usa node:fs — importar isso num client component quebra o
 * build inteiro do Next (webpack não sabe empacotar "node:fs" pro browser).
 */
type PostComFoto = PostBlog & { temFoto: boolean };

export function BlogCompleto({ posts }: { posts: PostComFoto[] }) {
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todos");

  const categorias = useMemo(
    () => ["Todos", ...new Set(blog.posts.map((p) => p.tag))],
    [],
  );

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return posts.filter((post) => {
      if (categoria !== "Todos" && post.tag !== categoria) return false;
      if (termo && !post.titulo.toLowerCase().includes(termo)) return false;
      return true;
    });
  }, [posts, busca, categoria]);

  return (
    <>
      <PageHero
        pagina="Blog"
        titulo="Blog Otosons"
        subtitulo="Conteúdo educativo sobre saúde auditiva, tecnologia e cuidados com o seu aparelho."
      />

      <section className="pb-20 pt-4 md:pb-28">
        <div className="container-site">
          <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative sm:max-w-xs">
              <Search
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar artigo..."
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition-colors focus:border-brand-400"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categorias.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoria(cat)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    categoria === cat
                      ? "bg-brand-800 text-white"
                      : "bg-surface text-gray-600 hover:bg-brand-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {filtrados.map((post, i) => {
              const { temFoto } = post;

              return (
                <Reveal key={post.slug} delay={i * 0.1}>
                  <article className="group h-full overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-800/5">
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="relative h-48 overflow-hidden bg-gray-200">
                        {temFoto ? (
                          <Image
                            src={post.imagem}
                            alt={post.titulo}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                            <ImageIcon size={26} />
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-md bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-800">
                            {post.tag}
                          </span>
                          <span className="text-xs text-gray-400">
                            {post.leitura}
                          </span>
                        </div>

                        <h2 className="mt-4 font-display text-base leading-snug transition-colors group-hover:text-brand-600">
                          {post.titulo}
                        </h2>

                        <p className="mt-3 text-sm text-gray-500">
                          {post.resumo}
                        </p>

                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-xs text-gray-400">
                            {post.data}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600">
                            Ler artigo
                            <ArrowRight
                              size={15}
                              className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                </Reveal>
              );
            })}
          </div>

          {filtrados.length === 0 && (
            <p className="mt-10 text-center text-sm text-gray-500">
              Nenhum artigo encontrado para “{busca.trim()}”.
            </p>
          )}

          <Reveal className="mt-14" delay={0.1}>
            <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-gradient-to-br from-brand-800 via-brand-700 to-brand-500 px-8 py-10 text-center sm:flex-row sm:text-left">
              <div>
                <h2 className="font-display text-xl font-semibold text-white">
                  {blog.cta.titulo}
                </h2>
                <p className="mt-2 max-w-lg text-sm text-blue-100">
                  {blog.cta.texto}
                </p>
              </div>

              <a
                href={contato.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-brand-800 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
              >
                Agendar avaliação
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
