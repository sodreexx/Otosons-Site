import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { SplashScreen } from "@/components/splash-screen";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { JsonLd } from "@/components/json-ld";
import { publicFileExists } from "@/lib/assets";
import { jsonLdNegocio } from "@/lib/seo";
import { seoPaginas, site } from "@/lib/site";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  /* 800 é usado só pelo logotipo do preloader */
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: seoPaginas.home.titulo,
    template: `%s | ${site.name}`,
  },
  description: seoPaginas.home.descricao,
  keywords: site.palavrasChave,
  applicationName: site.name,
  authors: [{ name: site.razaoSocial }],
  creator: site.razaoSocial,
  publisher: site.razaoSocial,
  alternates: { canonical: "/" },
  /* Diretiva explícita: sem isso o Next não emite <meta robots> e alguns
     buscadores limitam o tamanho do snippet e do preview de imagem. */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: seoPaginas.home.titulo,
    description: seoPaginas.home.descricao,
    url: site.url,
    siteName: site.name,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seoPaginas.home.titulo,
    description: seoPaginas.home.descricao,
  },
  category: "health",
  formatDetection: { telephone: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#1e40af",
};

/*
 * Usa o primeiro que existir em /public.
 *
 * `logo-otimizado.webp` vem primeiro por um motivo de peso: o `logo.svg`
 * original NÃO é vetor de verdade — tem duas <image> em base64 e um bloco de
 * metadata C2PA dentro, somando 240 KB, e o Next não otimiza SVG (passa
 * direto). O WebP rasterizado do mesmo arquivo, em 352×150 (3× o tamanho de
 * exibição, cobre retina), dá 10 KB. Os originais ficam como fonte.
 */
const LOGOS = ["/logo-otimizado.webp", "/logo.svg", "/logo.png"];

/*
 * Header, footer e o botão flutuante do WhatsApp são os mesmos em toda
 * página do site (institucional multi-página, não landing de seção única) —
 * moram aqui para não duplicar em cada página dentro de app/.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const logo = LOGOS.find(publicFileExists) ?? null;

  return (
    <html lang="pt-BR" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        {/* Ficha do negócio (MedicalBusiness): endereço, horário, geo e a
            nota real do Google. Fica no layout porque vale para o site
            inteiro, não só para a Home. */}
        <JsonLd dados={jsonLdNegocio()} />
      </head>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-800 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Pular para o conteúdo
        </a>
        <noscript>
          {/* sem JS o preloader nunca sai; esconde a cortina de saída */}
          <style>{`[data-splash]{display:none !important}`}</style>
        </noscript>
        <SplashScreen />
        <SiteHeader logo={logo} />
        {children}
        <SiteFooter />
        <WhatsappFab />
      </body>
    </html>
  );
}
