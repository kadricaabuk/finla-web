import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { SITE, SITE_URL } from "@/content/site";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE.name} - ${SITE.tagline}`,
  description: SITE.description,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${SITE.name} - ${SITE.tagline}`,
    description: SITE.shortDescription,
    url: SITE_URL,
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} - ${SITE.tagline}`,
    description: SITE.shortDescription,
  },
  other: {
    "llms-txt": `${SITE_URL}/llms.txt`,
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
        <link rel="author" href="/llms.txt" type="text/plain" />
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <JsonLd />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
