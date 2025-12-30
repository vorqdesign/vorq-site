import type { Metadata } from "next";
import { Geist, Geist_Mono, Archivo } from "next/font/google";
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

export const metadata: Metadata = {
  title: "VORQ | Premium SaaS Design & Development Agency",
  description: "We build pixel-perfect SaaS landing pages, marketing sites, and dashboards that convert. Expert Next.js, Framer Motion, and Webflow development.",
  keywords: ["SaaS design", "Web development agency", "Next.js developers", "Framer Motion animations", "SaaS landing pages", "Webflow agency", "Premium web design"],
  authors: [{ name: "VORQ Agency" }],
  openGraph: {
    title: "VORQ | Premium SaaS Design & Development Agency",
    description: "We design & build digital products that actually convert. From rapid launches to custom applications.",
    url: "https://vorq.agency", // Placeholder URL
    siteName: "VORQ",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VORQ | Premium SaaS Design & Development Agency",
    description: "We design & build digital products that actually convert.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} antialiased`}>{children}</body>
    </html>
  );
}
