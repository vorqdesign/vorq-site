import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import SiteFooter from "./components/SiteFooter";
import SiteNav from "./components/SiteNav";
import { services, site, team } from "@/lib/content";
import "./globals.css";

const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Vorq — Websites and MVPs for early-stage teams",
    template: "%s — Vorq",
  },
  description: site.description,
  applicationName: "Vorq",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Vorq",
    title: "Vorq — Websites and MVPs for early-stage teams",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Vorq — Websites and MVPs for early-stage teams",
    description: site.description,
  },
  robots: { index: true, follow: true },
  icons: { icon: "/logo.svg" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  email: site.email,
  description: site.description,
  founder: team.map((member) => ({
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
  })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Vorq services",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      name: service.name,
      description: `${service.tagline} ${service.price}.`,
      url: `${site.url}/book`,
      priceCurrency: "USD",
    })),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sans.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a className="skip" href="#content">
          Skip to content
        </a>
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
