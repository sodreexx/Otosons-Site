"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Direcao = "up" | "left" | "right" | "none";

const deslocamento: Record<Direcao, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  left: { x: -24, y: 0 },
  right: { x: 24, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Entrada padrão do site: o bloco sobe 24px e some/aparece uma única vez,
 * quando encosta na viewport.
 *
 * `once: true` é proposital — reanimar a cada scroll cansa numa página
 * institucional que a pessoa vai percorrer pra cima e pra baixo.
 */
export function Reveal({
  children,
  delay = 0,
  direcao = "up",
  className,
}: {
  children: ReactNode;
  delay?: number;
  direcao?: Direcao;
  className?: string;
}) {
  const semMovimento = useReducedMotion();
  const { x, y } = semMovimento ? deslocamento.none : deslocamento[direcao];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: semMovimento ? 0 : 0.6,
        delay: semMovimento ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
