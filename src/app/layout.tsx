import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import type { ReactNode } from "react";
import Script from "next/script";
import { ThemeProvider } from "@/lib/theme";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NeuralNetwork } from "@/components/NeuralNetwork";
import { OraculoTrigger } from "@/components/OraculoChat";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { JsonLd, organizationSchema, websiteSchema } from "@/components/JsonLd";
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

export const metadata: Metadata = {
  title: {
    default: "OráculoAI | IA aplicada para gerar resultados reais no seu negócio",
    template: "%s | OraculoAI",
  },
  description:
    "Implementamos agentes de IA, automações inteligentes e soluções corporativas para aumentar produtividade, reduzir custos e acelerar crescimento.",
  metadataBase: new URL("https://oraculoai.cloud"),
  openGraph: {
    title: "OráculoAI | IA aplicada para gerar resultados reais",
    description:
      "Implementamos agentes de IA, automações inteligentes e soluções corporativas para aumentar produtividade, reduzir custos e acelerar crescimento.",
    url: "https://oraculoai.cloud",
    siteName: "OráculoAI",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OráculoAI | IA aplicada para gerar resultados reais",
    description:
      "Implementamos agentes de IA, automações inteligentes e soluções corporativas.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
        {/* ── Google AdSense ── */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2572298012241654"
          crossOrigin="anonymous"
          strategy="afterInteractive"
          integrity="sha384-mlCgFDvtPKcWmC+YNwxGzLRhfBmPEYIN2s5r8frZcDCh5E1e6h3INuLUtRFe2Nx"
        />

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
          <OraculoTrigger />
          <WhatsAppButton />
          <Analytics />
          <ToolSearch />
          <div className="flex-1 pt-16">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
