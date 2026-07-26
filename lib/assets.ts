import fs from "node:fs";
import path from "node:path";

const publicDir = path.join(process.cwd(), "public");

/**
 * Checa se um arquivo existe em /public. Usado para decidir entre a foto real
 * e um placeholder — assim o site roda bonito mesmo antes de as imagens
 * serem colocadas na pasta.
 *
 * @param relPath caminho como aparece na URL, ex. "/images/blog/foto.jpg"
 */
export function publicFileExists(relPath: string): boolean {
  const clean = relPath.replace(/^\//, "");
  // barreira contra path traversal caso o caminho venha de conteúdo externo
  const target = path.resolve(publicDir, clean);
  if (!target.startsWith(publicDir)) return false;
  return fs.existsSync(target);
}

/**
 * Lê /public/hero-frames e devolve os frames em ordem natural.
 *
 * A ordenação é numérica, então tanto "frame-1.png ... frame-10.png" quanto
 * "frame-001.png ... frame-010.png" ficam na sequência certa. Como a leitura
 * é feita no servidor, basta jogar os arquivos na pasta — não é preciso
 * declarar a quantidade em lugar nenhum.
 */
export function getHeroFrames(): string[] {
  const dir = path.join(publicDir, "hero-frames");
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(png|jpe?g|webp|avif)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, "pt-BR", { numeric: true }))
      .map((f) => `/hero-frames/${f}`);
  } catch {
    // pasta ainda não existe — o hero cai no poster estático
    return [];
  }
}
