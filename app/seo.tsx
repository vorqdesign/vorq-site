import type { Metadata } from "next";
import { faqs, services, site } from "./content";

export const description =
  "VORQ is a design engineering studio that designs and builds landing pages, web apps, dashboards and mobile apps. Fixed prices, custom-built in Next.js and React Native, and you own the code.";

/**
 * Title, description, canonical URL and share text for one page.
 * Share images come from each route's opengraph-image file.
 */
export function pageMeta({
  title,
  description,
  path,
  article,
}: {
  title: string;
  description: string;
  path: string;
  article?: { publishedTime: string };
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      locale: "en_US",
      ...(article ? { type: "article", publishedTime: article.publishedTime, authors: [site.name] } : { type: "website" }),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** Structured data for search engines and AI answers. `<` is escaped so content can't close the tag. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...data }).replace(/</g, "\\u003c") }}
    />
  );
}

export const orgId = `${site.url}/#org`;

/** The studio and the site, on every page. */
export const siteGraph = {
  "@graph": [
    {
      "@type": "Organization",
      "@id": orgId,
      name: site.name,
      url: site.url,
      logo: `${site.url}/logo.svg`,
      email: site.email,
      description,
      slogan: "Design engineering studio",
      address: { "@type": "PostalAddress", addressCountry: "IN" },
      areaServed: "Worldwide",
      knowsAbout: ["Web design", "Web development", "Next.js", "React", "React Native", "Design engineering", "WebGL", "SaaS"],
      contactPoint: { "@type": "ContactPoint", contactType: "sales", email: site.email, url: `${site.url}/book` },
    },
    { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.name, description, publisher: { "@id": orgId } },
  ],
};

/** The rate card and the FAQ, for the home page. */
export const homeGraph = {
  "@graph": [
    {
      "@type": "OfferCatalog",
      name: "VORQ builds",
      provider: { "@id": orgId },
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, description: s.tagline, provider: { "@id": orgId } },
        priceSpecification: { "@type": "PriceSpecification", minPrice: s.price, priceCurrency: "USD" },
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};
