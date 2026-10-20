import type { Metadata } from "next";
import { Geist, Geist_Mono, Archivo, Henny_Penny, Sekuya } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const hennypenny = Henny_Penny({
  variable: "--font-hennypenny",
  subsets: ["latin"],
  weight: ["400"],
});

const sekuya = Sekuya({
  variable: "--font-sekuya",
  subsets: ["latin"],
  weight: ["400"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vorq.agency"),
  title: "VORQ | Premium SaaS Design & Development Agency",
  description: "We build pixel-perfect SaaS landing pages, marketing sites, and dashboards that convert. Expert Next.js, Framer Motion, and Webflow development.",
  openGraph: {
    type: "website",
    url: "/",
    title: "VORQ | Premium SaaS Design & Development Agency",
    description: "We build pixel-perfect SaaS landing pages, marketing sites, and dashboards that convert. Expert Next.js, Framer Motion, and Webflow development.",
    images: ["/banner.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "VORQ | Premium SaaS Design & Development Agency",
    description: "We build pixel-perfect SaaS landing pages, marketing sites, and dashboards that convert. Expert Next.js, Framer Motion, and Webflow development.",
    images: ["/banner.png"],
  },
  icons: {
    icon: "/logo.svg",
  },
};

import Preloader from "./components/Preloader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} ${hennypenny.variable} ${sekuya.variable} antialiased`}>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
