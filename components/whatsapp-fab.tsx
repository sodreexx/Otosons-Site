"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { contato } from "@/lib/site";

/**
 * Botão flutuante de contato. Só aparece depois que a pessoa rola um pouco —
 * cobrir o hero com um botão logo de cara atrapalha a primeira impressão.
 */
export function WhatsappFab() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > 400);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <AnimatePresence>
      {visivel && (
        <motion.a
          href={contato.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar com a Otosons no WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-800 text-white shadow-xl shadow-brand-800/30"
        >
          {/* halo que pulsa devagar para chamar atenção sem irritar */}
          <span
            aria-hidden
            className="absolute inset-0 animate-ping rounded-full bg-brand-800 opacity-20 [animation-duration:2.5s]"
          />
          <MessageCircle size={24} className="relative" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
