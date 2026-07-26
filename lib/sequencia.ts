"use client";

import { useEffect, useState } from "react";

/**
 * Avisa quando a sequência de frames do case chega ao último frame.
 *
 * Mesmo desenho de `lib/splash.ts`, e pelo mesmo motivo: `components/hero.tsx`
 * é Server Component, então não pode segurar estado nem passar callback para um
 * client component. Quem emite (`HeroSequence`) e quem escuta (`OndaSonora`)
 * estão em ramos diferentes da árvore — estado em escopo de módulo resolve sem
 * envolver a página inteira num provider só para carregar um booleano.
 */

let concluida = false;
const ouvintes = new Set<() => void>();

/** Chamado pelo HeroSequence quando o frame 120 congela. */
export function concluirSequencia() {
  if (concluida) return;
  concluida = true;
  ouvintes.forEach((fn) => fn());
  ouvintes.clear();
}

/**
 * `false` até o case terminar de abrir. Começa `false` no servidor e no
 * primeiro render do cliente, então não quebra a hidratação.
 */
export function useSequenciaConcluida(): boolean {
  const [pronta, setPronta] = useState(false);

  useEffect(() => {
    if (concluida) {
      setPronta(true);
      return;
    }
    const fn = () => setPronta(true);
    ouvintes.add(fn);
    return () => {
      ouvintes.delete(fn);
    };
  }, []);

  return pronta;
}
