import type { Metadata } from "next";
import { Archivo, Caveat, Geist_Mono, Henny_Penny, Sekuya } from "next/font/google";
import "./globals.css";
import Preloader from "./components/Preloader";
import { MotionProvider } from "./components/Motion";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"], weight: ["600"] });
const hennypenny = Henny_Penny({ variable: "--font-hennypenny", subsets: ["latin"], weight: ["400"] });
const sekuya = Sekuya({ variable: "--font-sekuya", subsets: ["latin"], weight: ["400"], adjustFontFallback: false });

const title = "VORQ | Design engineering studio";
const description =
  "VORQ designs and builds landing pages, web apps, dashboards and mobile apps. Fixed prices, custom-built, and you own the code.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vorq.agency"),
  title,
  description,
  openGraph: { type: "website", url: "/", title, description, images: ["/banner.png"] },
  twitter: { card: "summary_large_image", title, description, images: ["/banner.png"] },
  icons: { icon: "/logo.svg" },
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
        <MotionProvider>
          <Preloader />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
