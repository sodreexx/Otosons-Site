import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { SplashScreen } from "@/components/splash-screen";
import { site } from "@/lib/site";
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
    default: `${site.name} — ${site.tagline} em Maricá — RJ`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1e40af",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${inter.variable}`}>
      <body>
        <noscript>
          {/* sem JS o preloader nunca sai; esconde a cortina de saída */}
          <style>{`[data-splash]{display:none !important}`}</style>
        </noscript>
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}
