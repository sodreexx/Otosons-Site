import Image from "next/image";
import { ArrowRight, ImageIcon } from "lucide-react";
import { publicFileExists } from "@/lib/assets";
import { blog } from "@/lib/site";
import { Reveal } from "./reveal";

export function Blog() {
  return (
    <section id="blog" className="bg-surface py-20 md:py-28">
      <div className="container-site">
        <Reveal className="text-center">
          <span className="kicker">{blog.kicker}</span>
          <h2 className="mt-3 text-3xl md:text-4xl">{blog.titulo}</h2>
          <span className="rule-underline" />
          <p className="mt-8 text-gray-500">{blog.subtitulo}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {blog.posts.map((post, i) => {
            const temFoto = publicFileExists(post.imagem);

            return (
              <Reveal key={post.titulo} delay={i * 0.12}>
                <article className="group h-full overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-800/5">
                  <a href={post.href} className="block">
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

                      <h3 className="mt-4 font-display text-base leading-snug transition-colors group-hover:text-brand-600">
                        {post.titulo}
                      </h3>

                      <p className="mt-3 text-sm text-gray-500">{post.resumo}</p>

                      {/* visível por padrão onde não há hover (touch) */}
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [@media(hover:none)]:opacity-100">
                        Ler artigo
                        <ArrowRight
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
