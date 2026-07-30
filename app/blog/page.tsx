import type { Metadata } from "next";
import { BlogCompleto } from "@/components/blog-completo";
import { JsonLd } from "@/components/json-ld";
import { publicFileExists } from "@/lib/assets";
import { jsonLdBreadcrumb, metaDaPagina } from "@/lib/seo";
import { blog } from "@/lib/site";

export const metadata: Metadata = metaDaPagina("blog");

export default function BlogPage() {
  /* publicFileExists usa node:fs — só pode rodar aqui (Server Component),
     nunca dentro de BlogCompleto (client component, precisa de useState
     pra busca/filtro). */
  const posts = blog.posts.map((post) => ({
    ...post,
    temFoto: publicFileExists(post.imagem),
  }));

  return (
    <main id="conteudo">
      <JsonLd dados={jsonLdBreadcrumb("Blog", "/blog")} />
      <BlogCompleto posts={posts} />
    </main>
  );
}
