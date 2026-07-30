import Image from "next/image";
import { Film, ImageIcon } from "lucide-react";
import { publicFileExists } from "@/lib/assets";

/**
 * Foto e Vídeo com espaço reservado.
 *
 * O site inteiro é montado com os slots de mídia já no lugar, mesmo antes de
 * os arquivos existirem: `publicFileExists` decide, no servidor, entre a
 * mídia real e um placeholder do mesmo tamanho. Assim o layout nunca "pula"
 * quando o arquivo for adicionado — basta jogar o arquivo em /public no
 * caminho indicado e recarregar.
 *
 * SÃO SERVER COMPONENTS (usam node:fs via publicFileExists). Nunca importar
 * dentro de um arquivo "use client" — isso quebra o build inteiro, não só a
 * rota (ver CONTEXTO.md §11). Em client component, calcule no servidor e
 * passe como prop.
 */

/* Em dev o placeholder mostra o caminho esperado, pra saber onde soltar o
   arquivo. Em produção fica só o gradiente limpo, sem texto de debug. */
const EM_DEV = process.env.NODE_ENV === "development";

function Placeholder({
  caminho,
  rotulo,
  icone: Icone,
}: {
  caminho: string;
  rotulo?: string;
  icone: typeof ImageIcon;
}) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-brand-50 via-surface to-brand-100 p-4 text-center">
      <Icone size={26} className="text-brand-300" aria-hidden />
      {rotulo ? (
        <span className="text-xs font-medium text-brand-400">{rotulo}</span>
      ) : null}
      {EM_DEV ? (
        <code className="max-w-full truncate text-[10px] text-brand-300/80">
          {caminho}
        </code>
      ) : null}
    </div>
  );
}

export function Foto({
  src,
  alt,
  sizes = "100vw",
  className = "object-cover",
  rotulo,
  prioridade = false,
}: {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  /** Texto curto mostrado no placeholder, ex. "Fachada da loja". */
  rotulo?: string;
  prioridade?: boolean;
}) {
  if (!publicFileExists(src)) {
    return <Placeholder caminho={src} rotulo={rotulo} icone={ImageIcon} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={prioridade}
      className={className}
    />
  );
}

export function Video({
  src,
  poster,
  rotulo,
  titulo,
}: {
  src: string;
  poster?: string;
  rotulo?: string;
  /** Vai para o aria-label — vídeo sem legenda precisa de descrição textual. */
  titulo: string;
}) {
  if (!publicFileExists(src)) {
    return <Placeholder caminho={src} rotulo={rotulo} icone={Film} />;
  }

  return (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      controls
      preload="metadata"
      aria-label={titulo}
      poster={poster && publicFileExists(poster) ? poster : undefined}
    >
      <source src={src} type="video/mp4" />
      Seu navegador não suporta a reprodução deste vídeo.
    </video>
  );
}
