"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { AudioLines, CalendarCheck, Menu, X } from "lucide-react";
import { contato, navegacao, site } from "@/lib/site";

/** `logo` vem do servidor: é null enquanto o arquivo não estiver em /public. */
export function SiteHeader({ logo }: { logo: string | null }) {
  const [rolou, setRolou] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const pathname = usePathname();

  /* Fundo sólido + sombra só depois que a página sai do topo. */
  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 12);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  /*
   * Trava o scroll do fundo enquanto o menu mobile está aberto.
   *
   * O early-return quando fechado é essencial: sem ele, este efeito rodava na
   * montagem e limpava o `overflow: hidden` que o preloader tinha acabado de
   * aplicar, liberando o scroll por trás da cortina.
   */
  useEffect(() => {
    if (!menuAberto) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuAberto]);

  /* Fecha o menu mobile sozinho quando a rota muda (navegação por Link). */
  useEffect(() => {
    setMenuAberto(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        rolou
          ? "border-b border-gray-100 bg-white/85 backdrop-blur-md"
          : "border-b border-transparent bg-white"
      }`}
    >
      {/*
        Container próprio, bem mais largo que o `container-site` das seções:
        no mockup o logo fica a ~5% da borda esquerda e o botão a ~5% da
        direita. Com o max-w-6xl das seções, numa tela de 1920px o logo
        cairia a 384px da borda — muito para dentro.
        104px de altura deixa o logo centrado em y=52, como no mockup.
      */}
      <div className="mx-auto flex h-[88px] w-full max-w-[2200px] items-center justify-between gap-6 px-6 md:h-[104px] md:px-[5.5%]">
        <Link
          href="/"
          className="shrink-0"
          aria-label={`${site.name} — página inicial`}
        >
          {logo ? (
            <Image
              src={logo}
              alt={`${site.name} ${site.tagline}`}
              width={678}
              height={289}
              priority
              className="h-10 w-auto md:h-12"
            />
          ) : (
            /* fallback enquanto o arquivo do logo não é copiado */
            <span className="flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-800 text-white">
                <AudioLines size={18} />
              </span>
              <span>
                <span className="block font-display text-base font-semibold leading-none text-brand-800">
                  {site.name}
                </span>
                <span className="block text-[10px] leading-tight text-gray-500">
                  {site.tagline}
                </span>
              </span>
            </span>
          )}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navegacao.map((item) => {
            /* "/" só fica ativo na home exata; as demais rotas ativam também
               em sub-páginas (ex. /blog/algum-post continua com "Blog" aceso). */
            const estaAtivo =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={estaAtivo ? "page" : undefined}
                /*
                 * Pílula em vez de sublinhado.
                 *
                 * A borda no item inativo é `transparent`, não ausente: sem
                 * ela o item ganharia 2px de largura ao ficar ativo e a nav
                 * inteira dançaria a cada navegação.
                 */
                className={`rounded-full border px-3.5 py-2 text-sm transition-all duration-200 ${
                  estaAtivo
                    ? "border-brand-200 bg-brand-50 font-medium text-brand-800"
                    : "border-transparent text-nav-link hover:bg-brand-50/60 hover:text-brand-800"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={contato.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden h-11 items-center gap-2 rounded-xl bg-hero-cta px-5 text-[14px] font-medium text-white shadow-md shadow-hero-cta/25 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg hover:shadow-hero-cta/35 sm:inline-flex md:h-12 md:px-7 md:text-[15px]"
          >
            <CalendarCheck
              size={18}
              className="transition-transform duration-300 group-hover:-rotate-6"
            />
            marcar consulta
          </a>

          <button
            type="button"
            onClick={() => setMenuAberto((v) => !v)}
            className="-mr-2 p-2 text-brand-800 lg:hidden"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuAberto}
          >
            {menuAberto ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuAberto && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-gray-100 bg-white lg:hidden"
          >
            <div className="mx-auto flex w-full max-w-[2200px] flex-col gap-1 px-6 py-4 md:px-[5.5%]">
              {navegacao.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-lg px-2 py-3 text-sm text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-800"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={contato.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 rounded-lg bg-brand-800 px-5 py-3 text-center text-sm font-medium text-white sm:hidden"
              >
                marcar consulta
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
