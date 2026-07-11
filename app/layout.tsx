import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.heyfinla.com"),
  title: "finla - Türkiye'nin sohbetle çalışan ilk e-fatura asistanı",
  description:
    "Türkiye'deki serbest çalışanlar ve KOBİ'ler için yapay zekâ destekli e-fatura asistanı. Sohbet ederek e-Fatura ve e-Arşiv kes, gelen faturaları yanıtla, raporlarını Excel'e dök.",
  openGraph: {
    title: "finla - Türkiye'nin sohbetle çalışan ilk e-fatura asistanı",
    description:
      "Yapay zekâ destekli, sohbet tabanlı e-fatura ve muhasebe asistanı. Tek cümleyle GİB uyumlu fatura kes.",
    url: "https://www.heyfinla.com",
    siteName: "finla",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "finla - Türkiye'nin sohbetle çalışan ilk e-fatura asistanı",
    description:
      "Yapay zekâ destekli, sohbet tabanlı e-fatura ve muhasebe asistanı.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
