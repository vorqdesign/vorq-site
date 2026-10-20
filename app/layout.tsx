import type { Metadata } from "next";
import { Archivo, Caveat, Geist_Mono, Henny_Penny, Sekuya } from "next/font/google";
import "./globals.css";
import Preloader from "./components/Preloader";
import { MotionProvider } from "./components/Motion";
import { site } from "./content";
import { description, JsonLd, siteGraph } from "./seo";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"], weight: ["600"] });
const hennypenny = Henny_Penny({ variable: "--font-hennypenny", subsets: ["latin"], weight: ["400"] });
const sekuya = Sekuya({ variable: "--font-sekuya", subsets: ["latin"], weight: ["400"], adjustFontFallback: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "VORQ | Design engineering studio", template: "%s | VORQ" },
  description,
  applicationName: site.name,
  openGraph: { type: "website", url: "/", siteName: site.name, locale: "en_US", title: "VORQ | Design engineering studio", description },
  twitter: { card: "summary_large_image", title: "VORQ | Design engineering studio", description },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
  icons: { icon: "/logo.svg", apple: "/apple-icon" },
};

// Runs before paint so a repeat visit in the same tab never flashes the preloader.
const seenScript = `try{if(sessionStorage.getItem("vorq-seen")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.seen="1"}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: seenScript }} />
      </head>
      <body
        className={`${archivo.variable} ${geistMono.variable} ${caveat.variable} ${hennypenny.variable} ${sekuya.variable} antialiased`}
      >
        <JsonLd data={siteGraph} />
        <MotionProvider>
          <Preloader />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
