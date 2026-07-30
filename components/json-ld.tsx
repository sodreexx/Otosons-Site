/**
 * Injeta um bloco de dados estruturados schema.org.
 *
 * O conteúdo vem sempre de `lib/seo.ts` (objetos que nós montamos), nunca de
 * entrada externa — por isso `dangerouslySetInnerHTML` aqui é seguro. Ainda
 * assim escapamos `<` para o caso de algum texto de `lib/site.ts` conter
 * markup e fechar a tag <script> antes da hora.
 */
export function JsonLd({ dados }: { dados: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(dados).replace(/</g, "\\u003c"),
      }}
    />
  );
}
