import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import type { ReactNode } from "react";
import Script from "next/script";
import { ThemeProvider } from "@/lib/theme";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NeuralNetwork } from "@/components/NeuralNetwork";
import { OraculoTrigger } from "@/components/OraculoChat";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { ToolSearch } from "@/components/ToolSearch";

const nunito = Nunito_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "OraculoAI | Presença digital profissional",
  description:
    "Desenvolvimento web, cibersegurança e infraestrutura com atendimento direto no WhatsApp.",
  other: {
    "google-adsense-account": "ca-pub-2572298012241654",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${nunito.variable} antialiased dark`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen flex flex-col">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2572298012241654"
          crossOrigin="anonymous"
          strategy="afterInteractive"
          integrity="sha384-mlCgFDvtPKcWmC+YNwxGzLRhfBmPEYIN2s5r8frZcDCh5E1e6h3INuLUtRFe2Nx"
        />
        {/* ── Background layers (todas as páginas) ── */}
        <div className="pointer-events-none fixed inset-0 z-[-3] page-glow" />
        <NeuralNetwork />
        <ThemeProvider>
          <Header />
          <OraculoTrigger />
          <Analytics />
          <ToolSearch />
          <div className="flex-1 pt-16">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
