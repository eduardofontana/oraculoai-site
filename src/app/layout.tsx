import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/lib/theme";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const nunito = Nunito_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "OraculoAI | Presença digital premium",
  description:
    "Desenvolvimento web, cybersecurity e infraestrutura com atendimento direto no WhatsApp.",
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
    >
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <Header />
          <WhatsAppButton />
          <Analytics />
          <div className="flex-1 pt-16">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
