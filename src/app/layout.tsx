import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { site } from "@/data/site";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BackToTop } from "@/components/ui/BackToTop";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://fluxustecnologia.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Fluxus Tecnologia — Sites, Sistemas, IA e Consultoria",
    template: "%s | Fluxus Tecnologia",
  },
  description:
    "Empresa de tecnologia em João Pessoa/PB. Desenvolvemos sites institucionais, sistemas web, soluções com inteligência artificial e consultoria para organizações que precisam de tecnologia sob medida.",
  keywords: [
    "tecnologia",
    "sites institucionais",
    "sistemas web",
    "inteligência artificial",
    "consultoria em tecnologia",
    "João Pessoa",
    "Paraíba",
    "desenvolvimento web",
    "SaaS",
    "automação",
  ],
  authors: [{ name: "Fluxus Tecnologia" }],
  creator: "Fluxus Tecnologia",
  publisher: "Fluxus Tecnologia",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Fluxus Tecnologia",
    title: "Fluxus Tecnologia — Sites, Sistemas, IA e Consultoria",
    description:
      "Empresa de tecnologia em João Pessoa/PB. Sites, sistemas, IA e consultoria sob medida.",
    images: [
      { url: "/og-image.png", width: 1200, height: 630, alt: "Fluxus Tecnologia" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fluxus Tecnologia",
    description: "Sites, sistemas, IA e consultoria em tecnologia sob medida.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  category: "technology",
};

/* Dados estruturados — Organization (§13.4). Somente dados confirmados. */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-fluxus-icone.png`,
  description:
    "Empresa de tecnologia em João Pessoa/PB. Sites, sistemas, IA e consultoria.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "João Pessoa",
    addressRegion: "PB",
    addressCountry: "BR",
  },
  sameAs: [site.instagram.url],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} dark h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {/* Sem JS, nenhum conteúdo fica escondido atrás do reveal (§16.3) */}
        <noscript>
          <style>{`.scroll-reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <a
          href="#conteudo"
          className="sr-only z-50 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-lg focus:bg-brand-500 focus:px-4 focus:py-2 focus:font-semibold focus:text-ink-950"
        >
          Pular para o conteúdo
        </a>
        <ScrollProgress />
        <Header />
        <main id="conteudo" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
        <BackToTop />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
