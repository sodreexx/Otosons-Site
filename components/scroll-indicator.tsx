"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useSplashConcluido } from "@/lib/splash";

/**
 * Seta indicando que há mais conteúdo abaixo do hero.
 *
 * Fica no fluxo normal (não `absolute`): o hero é `flex-1` de tela cheia com
 * o CTA já colado na base, então uma seta fixada por posição absoluta ficaria
 * sobreposta ao botão. Como item de flex comum, ela reserva sua própria
 * fatia de altura e o `flex-1` do bloco de texto encolhe para abrir espaço.
 */
export function ScrollIndicator({ href }: { href: string }) {
  const semMovimento = useReducedMotion();
  const liberado = useSplashConcluido();

  /* Some conforme a pessoa rola: já cumpriu o papel, e continuar visível só
     concorre com o conteúdo da seção seguinte. Numa camada separada da
     entrada, senão as duas animações disputariam a mesma `opacity`. */
  const { scrollY } = useScroll();
  const opacidadeScroll = useTransform(scrollY, [0, 220], [1, 0]);

  return (
    <motion.div
      className="relative z-10 mx-auto mt-4 shrink-0 md:mt-6"
      style={{ opacity: semMovimento ? 1 : opacidadeScroll }}
    >
      <motion.a
        href={href}
        aria-label="Rolar para ver mais conteúdo"
        className="flex justify-center text-hero-cta transition-opacity hover:opacity-70"
        initial={{ opacity: 0 }}
        animate={{ opacity: liberado ? 1 : 0 }}
        transition={{ duration: 0.7, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/*
          Dois chevrons sobrepostos com fases diferentes: o de trás sai na
          frente e some, o da frente segue. Dá o destaque que um chevron
          sozinho não tem, sem precisar de círculo ou moldura.
        */}
        <motion.span
          className="flex"
          animate={semMovimento ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={30} strokeWidth={2.25} />
        </motion.span>
        {!semMovimento && (
          <motion.span
            aria-hidden
            className="absolute inset-x-0 flex justify-center"
            animate={{ y: [0, 14], opacity: [0.55, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
          >
            <ChevronDown size={30} strokeWidth={2.25} />
          </motion.span>
        )}
      </motion.a>
    </motion.div>
  );
}
