import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPost } from "@/components/blog-post";
import { JsonLd } from "@/components/json-ld";
import { jsonLdArtigo, jsonLdBreadcrumb, metaDoPost } from "@/lib/seo";
import { blog } from "@/lib/site";

export function generateStaticParams() {
  return blog.posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blog.posts.find((p) => p.slug === slug);

  /* Post inexistente: `noindex` para o Google não guardar a URL de erro. */
  if (!post) {
    return { title: "Artigo não encontrado", robots: { index: false } };
  }

  return metaDoPost(post);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blog.posts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <main id="conteudo">
      <JsonLd dados={jsonLdBreadcrumb(post.titulo, `/blog/${post.slug}`)} />
      <JsonLd dados={jsonLdArtigo(post)} />
      <BlogPost post={post} />
    </main>
  );
}
