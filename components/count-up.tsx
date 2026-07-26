"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Contador que anima de 0 até `valor` quando entra na tela, uma vez só.
 *
 * Usa easing "out" (rápido no começo, freando no fim) porque a desaceleração
 * é o que dá a sensação de o número "assentar" no lugar.
 */
export function CountUp({
  valor,
  duracao = 1.6,
  separador = false,
}: {
  valor: number;
  duracao?: number;
  separador?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const visivel = useInView(ref, { once: true, margin: "-60px" });
  const semMovimento = useReducedMotion();
  const [atual, setAtual] = useState(0);

  useEffect(() => {
    if (!visivel) return;

    if (semMovimento) {
      setAtual(valor);
      return;
    }

    let raf = 0;
    const inicio = performance.now();

    const passo = (agora: number) => {
      const t = Math.min(1, (agora - inicio) / (duracao * 1000));
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setAtual(Math.round(valor * eased));
      if (t < 1) raf = requestAnimationFrame(passo);
    };

    raf = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(raf);
  }, [visivel, valor, duracao, semMovimento]);

  return (
    <span ref={ref}>
      {separador ? atual.toLocaleString("pt-BR") : atual}
    </span>
  );
}
