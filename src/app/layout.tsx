import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Entete } from "@/components/Entete";
import { PiedDePage } from "@/components/PiedDePage";
import { JsonLd, jsonLdAgence } from "@/lib/seo";
import { EST_DEMO, URL_SITE, site } from "@/lib/site";

// Polices hébergées localement (licence SIL Open Font) : aucune requête vers un tiers.
// Choix provisoire, à valider avec la direction artistique finale (brief §4).
const fraunces = localFont({
  src: [
    { path: "../fonts/fraunces-latin-full-normal.woff2", style: "normal", weight: "100 900" },
    { path: "../fonts/fraunces-latin-full-italic.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-fraunces",
  display: "swap",
});
const instrument = localFont({
  src: "../fonts/instrument-sans-latin-wght-normal.woff2",
  weight: "400 700",
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(URL_SITE),
  title: {
    default: "Agence immobilière à Biot, Valbonne et Sophia Antipolis | Green Side",
    template: "%s | Green Side",
  },
  description: site.description,
  applicationName: site.nom,
  openGraph: {
    siteName: site.nom,
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/partage.jpg", width: 1200, height: 630, alt: site.nom }],
  },
  twitter: { card: "summary_large_image" },
  robots: EST_DEMO ? { index: false, follow: false } : undefined,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f6f3ed",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${instrument.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <Entete />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <PiedDePage />
        <JsonLd data={jsonLdAgence()} />
      </body>
    </html>
  );
}
