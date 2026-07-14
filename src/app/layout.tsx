import type { Metadata } from "next";
import { Inter } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Fluxus Tecnologia",
  description:
    "Empresa de tecnologia: sites institucionais, sistemas web, soluções com IA, automações e consultoria.",
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
        <ScrollProgress />
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
