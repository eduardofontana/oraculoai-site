import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import type { ReactNode } from "react";
import Script from "next/script";
import { ThemeProvider } from "@/lib/theme";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NeuralNetwork } from "@/components/NeuralNetwork";
import { OraculoTrigger } from "@/components/OraculoChat";
import { JsonLd, organizationSchema, websiteSchema } from "@/components/JsonLd";
import { AiBrandsTicker } from "@/components/AiBrandsTicker";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { ToolSearch } from "@/components/ToolSearch";

const nunito = Nunito_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

export const metadata: Metadata = {
  title: {
    default: "OráculoAI | Transformação digital impulsionada por Inteligência Artificial",
    template: "%s | OraculoAI",
  },
  description:
    "Criamos agentes de IA, automatizamos processos e construímos soluções digitais que funcionam de verdade pra sua empresa. Simples, direto e sem enrolação.",
  metadataBase: new URL("https://oraculoai.cloud"),
  openGraph: {
    title: "OráculoAI | Transformação digital impulsionada por Inteligência Artificial",
    description:
      "Criamos agentes de IA, automatizamos processos e construímos soluções digitais que funcionam pra sua empresa.",
    url: "https://oraculoai.cloud",
    siteName: "OráculoAI",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://oraculoai.cloud/og-default.svg",
        width: 1200,
        height: 630,
        alt: "OráculoAI - Transformação digital impulsionada por IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OráculoAI | Transformação digital impulsionada por Inteligência Artificial",
    description:
      "Criamos agentes de IA, automatizamos processos e construímos soluções digitais que funcionam.",
    images: ["https://oraculoai.cloud/og-default.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ?? "",
  },
  other: {
    ...(adsenseId ? { "google-adsense-account": adsenseId } : {}),
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
        {/* ── Skip to content (accessibility) ── */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
        >
          Pular para o conteúdo
        </a>

        {/* ── Google AdSense ── */}
        {adsenseId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
            strategy="beforeInteractive"
            onError={() => console.info("[AdSense] Script bloqueado ou indisponível.")}
          />
        )}

        {/* ── Google Analytics 4 ── */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}

        {/* ── Google Tag Manager ── */}
        {gtmId && (
          <Script id="gtm-init" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}
          </Script>
        )}

        {/* ── GTM noscript fallback ── */}
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        {/* ── JSON-LD Schema ── */}
        <JsonLd schema={organizationSchema()} />
        <JsonLd schema={websiteSchema()} />

        {/* ── Background layers (todas as páginas) ── */}
        <div className="pointer-events-none fixed inset-0 z-[-3] page-glow" />
        <NeuralNetwork />
        <ThemeProvider>
          <Header />
          <AiBrandsTicker />
          <OraculoTrigger />
          <Analytics />
          <ToolSearch />
          <div className="flex-1 pt-[104px]">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
