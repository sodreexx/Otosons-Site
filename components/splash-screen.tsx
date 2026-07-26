"use client";

import { useEffect, useState } from "react";
import { concluirSplash } from "@/lib/splash";
import { site } from "@/lib/site";

/**
 * Barras da onda sonora — alturas, cores e delays vindos do design do Figma
 * Make. Os delays negativos deslocam a fase de cada barra dentro do mesmo
 * ciclo de 1,2s, criando o efeito de onda percorrendo o equalizador.
 */
const BARRAS = [
  { altura: 20, cor: "#1E40AF", delay: "-1.2s" },
  { altura: 35, cor: "#3B82F6", delay: "-1.1s" },
  { altura: 50, cor: "#1E40AF", delay: "-1.0s" },
  { altura: 60, cor: "#F3F4F6", delay: "-0.9s" },
  { altura: 50, cor: "#1E40AF", delay: "-0.8s" },
  { altura: 35, cor: "#3B82F6", delay: "-0.7s" },
  { altura: 20, cor: "#1E40AF", delay: "-0.6s" },
];

/* Marcos da timeline original, em ms. */
const ONDA_SAI = 1200;
const LOGO_ENTRA = 1600;
const CORTINA_SOBE = 3100;
const REMOVE = 4300;

export function SplashScreen() {
  const [ondaSaindo, setOndaSaindo] = useState(false);
  const [logoVisivel, setLogoVisivel] = useState(false);
  const [subindo, setSubindo] = useState(false);
  const [removido, setRemovido] = useState(false);

  useEffect(() => {
    /* Quem pediu menos movimento no SO não deve levar 4,3s de cortina antes
       de ver o conteúdo — ainda mais num site cujo público é majoritariamente
       idoso. Vai direto para a página. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRemovido(true);
      concluirSplash();
      return;
    }

    /* Trava o scroll enquanto a cortina está na frente: sem isso dá para
       rolar por trás e a página aparece já deslocada quando ela sobe. */
    document.body.style.overflow = "hidden";

    const t = [
      setTimeout(() => setOndaSaindo(true), ONDA_SAI),
      setTimeout(() => setLogoVisivel(true), LOGO_ENTRA),
      setTimeout(() => {
        setSubindo(true);
        /* Libera o hero junto com o início da subida, não no fim: o conteúdo
           entrando enquanto a cortina sobe é o que dá a sensação de
           continuidade. */
        concluirSplash();
      }, CORTINA_SOBE),
      setTimeout(() => {
        setRemovido(true);
        document.body.style.overflow = "";
      }, REMOVE),
    ];

    return () => {
      t.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  if (removido) return null;

  return (
    <div
      /* aria-hidden + role de apresentação: é decoração, não deve ser lido
         por leitor de tela nem receber foco */
      aria-hidden
      data-splash
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
      style={{
        transform: subindo ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 1.2s cubic-bezier(0.77, 0, 0.175, 1)",
      }}
    >
      <div className="relative flex h-[120px] flex-col items-center justify-center text-center">
        <div
          className="absolute flex items-center gap-1.5"
          style={{
            opacity: ondaSaindo ? 0 : 1,
            transition: "opacity 0.5s ease",
          }}
        >
          {BARRAS.map((barra, i) => (
            <span
              key={i}
              className="splash-wave-bar"
              style={{
                height: `${barra.altura}px`,
                backgroundColor: barra.cor,
                animationDelay: barra.delay,
              }}
            />
          ))}
        </div>

        <p
          className="absolute font-display text-[2.25rem] font-extrabold text-brand-800 sm:text-[3.5rem]"
          style={{
            opacity: logoVisivel ? 1 : 0,
            transform: logoVisivel
              ? "translateY(0) scale(1)"
              : "translateY(20px) scale(0.95)",
            transition: "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        >
          {site.name}
          <span className="text-body">.</span>
        </p>
      </div>
    </div>
  );
}
