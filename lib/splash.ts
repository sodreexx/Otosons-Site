"use client";

import { useEffect, useState } from "react";

/**
 * Coordenação entre o preloader e o resto do hero.
 *
 * Sem isso a sequência de 121 frames do aparelho começaria no `mount` e
 * rodaria inteira (≈4s) escondida atrás da splash, que dura 4,3s — o usuário
 * veria a cortina subir já com o estojo aberto e parado.
 *
 * Estado em módulo em vez de Context porque quem precisa saber
 * (`HeroSequence` e `HeroTexto`) está em ramos diferentes da árvore, e
 * envolver tudo num provider só para passar um booleano é ruído.
 */

let concluido = false;
const ouvintes = new Set<() => void>();

/** Chamado pela splash quando a cortina começa a subir. */
export function concluirSplash() {
  if (concluido) return;
  concluido = true;
  ouvintes.forEach((fn) => fn());
  ouvintes.clear();
}

function aoConcluir(fn: () => void): () => void {
  if (concluido) {
    fn();
    return () => {};
  }
  ouvintes.add(fn);
  return () => {
    ouvintes.delete(fn);
  };
}

/**
 * `false` enquanto a splash estiver na frente. Começa `false` no servidor e no
 * primeiro render do cliente, então não quebra a hidratação.
 */
export function useSplashConcluido(): boolean {
  const [pronto, setPronto] = useState(false);

  useEffect(() => aoConcluir(() => setPronto(true)), []);

  return pronto;
}
