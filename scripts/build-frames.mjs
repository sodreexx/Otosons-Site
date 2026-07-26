/**
 * Converte os frames brutos da animação do hero para WebP otimizado.
 *
 *   node scripts/build-frames.mjs "<pasta-de-origem>"
 *
 * O que ele faz:
 *  1. Calcula o bounding box da UNIÃO de todos os frames. Recortar cada frame
 *     no seu próprio bounding box faria o aparelho "pular" de posição; usar a
 *     união mantém o enquadramento fixo e ainda joga fora a área transparente
 *     que nunca é usada.
 *  2. Recorta todos os frames nesse mesmo box, reduz para LARGURA_ALVO e salva
 *     como WebP com transparência.
 *
 * Origem: 121 GIFs de 1920x1080 (~49 MB). Saída: ~2 MB.
 */

import { readdir, mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const origem = process.argv[2];
if (!origem) {
  console.error('Uso: node scripts/build-frames.mjs "<pasta-de-origem>"');
  process.exit(1);
}

const destino = path.join(process.cwd(), "public", "hero-frames");
const LARGURA_ALVO = 700; // ~2x do tamanho de exibição (310px)
const QUALIDADE = 78;

/* Só arquivos cujo nome termina em número — descarta o GIF animado de origem,
   que fica na mesma pasta e não é um frame. */
const arquivos = (await readdir(origem))
  .filter((f) => /\d{3}\.(gif|png|jpe?g|webp)$/i.test(f))
  .sort((a, b) => a.localeCompare(b, "pt-BR", { numeric: true }))
  .map((f) => path.join(origem, f));

if (arquivos.length === 0) {
  console.error("Nenhum frame encontrado em:", origem);
  process.exit(1);
}

console.log(`${arquivos.length} frames encontrados.`);

/* ---- Passo 1: bounding box da união -------------------------------------- */

let left = Infinity;
let top = Infinity;
let right = -Infinity;
let bottom = -Infinity;

for (const arquivo of arquivos) {
  try {
    const { info } = await sharp(arquivo)
      .ensureAlpha()
      .trim({ threshold: 1 })
      .toBuffer({ resolveWithObject: true });

    const l = -(info.trimOffsetLeft ?? 0);
    const t = -(info.trimOffsetTop ?? 0);
    left = Math.min(left, l);
    top = Math.min(top, t);
    right = Math.max(right, l + info.width);
    bottom = Math.max(bottom, t + info.height);
  } catch {
    /* frame totalmente transparente não contribui para o box */
  }
}

const { width: origW, height: origH } = await sharp(arquivos[0]).metadata();

/* margem de respiro para o recorte não encostar na silhueta */
const margem = 12;
left = Math.max(0, Math.floor(left) - margem);
top = Math.max(0, Math.floor(top) - margem);
right = Math.min(origW, Math.ceil(right) + margem);
bottom = Math.min(origH, Math.ceil(bottom) + margem);

const box = { left, top, width: right - left, height: bottom - top };
console.log(
  `Canvas original ${origW}x${origH} -> recorte ${box.width}x${box.height} em (${box.left},${box.top})`,
);

/* ---- Passo 2: recorta, redimensiona e grava ------------------------------ */

await mkdir(destino, { recursive: true });

const largura = Math.min(LARGURA_ALVO, box.width);
let total = 0;

for (const [i, arquivo] of arquivos.entries()) {
  const buf = await sharp(arquivo)
    .ensureAlpha()
    .extract(box)
    .resize({ width: largura })
    .webp({ quality: QUALIDADE, effort: 6 })
    .toBuffer();

  const nome = `frame-${String(i).padStart(3, "0")}.webp`;
  await writeFile(path.join(destino, nome), buf);
  total += buf.length;

  if (i % 20 === 0) process.stdout.write(`  ${i}/${arquivos.length}\r`);
}

const origemBytes = (
  await Promise.all(arquivos.map(async (f) => (await stat(f)).size))
).reduce((a, b) => a + b, 0);

console.log(
  `\nPronto: ${arquivos.length} frames, ${(origemBytes / 1024 / 1024).toFixed(1)} MB -> ${(
    total /
    1024 /
    1024
  ).toFixed(2)} MB (${(total / arquivos.length / 1024).toFixed(0)} KB por frame)`,
);
