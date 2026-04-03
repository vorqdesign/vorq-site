import type { Metadata } from "next";
import { Syne, Playfair_Display } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vorq.agency"),
  title: "VORQ — Web Design That Converts",
  description:
    "Premium web design, redesigns & MVP builds — at prices that respect early-stage budgets. No bloat, no templates, no BS.",
  openGraph: {
    type: "website",
    url: "/",
    title: "VORQ — Web Design That Converts",
    description:
      "Premium web design, redesigns & MVP builds — at prices that respect early-stage budgets.",
    images: ["/banner.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "VORQ — Web Design That Converts",
    description:
      "Premium web design, redesigns & MVP builds — at prices that respect early-stage budgets.",
    images: ["/banner.png"],
  },
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
