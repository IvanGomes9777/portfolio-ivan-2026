import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { faq } from "@/lib/faq";

// Set NEXT_PUBLIC_GTM_ID (Format GTM-XXXXXXX) to load Google Tag Manager.
// When unset (local dev / previews without the var) GTM is skipped entirely.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  preload: false,
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  // Preloaded: this font renders the LCP headline, so preloading improves FCP/LCP.
  preload: true,
});

const BASE_URL = "https://portfolio-ivan-2026.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Ivan Gomes | Freelance Webdesign & Entwicklung aus Münster",
    template: "%s | Ivan Gomes · Webdesign & Entwicklung",
  },
  description:
    "Freelance Web Developer & Designer aus Münster. Moderne, performante Websites für lokale Unternehmen in Deutschland – mobil optimiert, SEO-ready, in 2–4 Wochen live.",
  keywords: [
    "web developer münster",
    "webdesign münster",
    "freelance web developer deutschland",
    "webdesign nordrhein westfalen",
    "webdesign nrw",
    "website erstellen münster",
    "webentwicklung nrw",
    "next.js developer deutschland",
    "freelancer webseite erstellen",
    "webdesigner münster",
    "react developer münster",
    "webseite für kleine unternehmen",
    "günstige webseite deutschland",
  ],
  authors: [{ name: "Ivan Vilar Gomes", url: BASE_URL }],
  creator: "Ivan Vilar Gomes",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: BASE_URL,
    siteName: "Ivan Gomes — Webdesign & Entwicklung",
    title: "Ivan Gomes | Freelance Webdesign & Entwicklung aus Münster",
    description:
      "Freelance Web Developer & Designer aus Münster. Maßgeschneiderte Websites für lokale Unternehmen – modern, schnell, SEO-optimiert.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Ivan Gomes — Freelance Web Developer & Designer aus Münster",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ivan Gomes | Freelance Webdesign & Entwicklung aus Münster",
    description:
      "Freelance Web Developer & Designer aus Münster. Maßgeschneiderte Websites für lokale Unternehmen.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const personSchema = {
  "@type": "Person",
  "@id": `${BASE_URL}/#person`,
  name: "Ivan Vilar Gomes",
  jobTitle: "Freelance Web Developer & Designer",
  url: BASE_URL,
  email: "ivanvilargomes@gmail.com",
  image: `${BASE_URL}/opengraph-image`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Dingbänger Weg 436",
    addressLocality: "Münster",
    addressRegion: "Nordrhein-Westfalen",
    postalCode: "48161",
    addressCountry: "DE",
  },
  knowsAbout: [
    "Web Development",
    "Web Design",
    "Next.js",
    "React",
    "Tailwind CSS",
    "SEO-Optimierung",
    "UI/UX Design",
    "Responsive Design",
  ],
};

const localBusinessSchema = {
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${BASE_URL}/#business`,
  name: "Ivan Gomes — Webdesign & Entwicklung",
  description:
    "Freelance Web Developer & Designer aus Münster. Maßgeschneiderte, performante Websites für lokale Unternehmen in Deutschland.",
  url: BASE_URL,
  email: "ivanvilargomes@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Dingbänger Weg 436",
    addressLocality: "Münster",
    addressRegion: "Nordrhein-Westfalen",
    postalCode: "48161",
    addressCountry: "DE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.9607,
    longitude: 7.6261,
  },
  areaServed: [
    { "@type": "Country", name: "Deutschland" },
    { "@type": "State", name: "Nordrhein-Westfalen" },
    { "@type": "City", name: "Münster" },
  ],
  serviceType: [
    "Webdesign",
    "Webentwicklung",
    "Next.js Entwicklung",
    "React Entwicklung",
    "SEO Optimierung",
    "Website Wartung",
    "Landingpage Erstellung",
  ],
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Überweisung, PayPal",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  founder: { "@id": `${BASE_URL}/#person` },
};

const websiteSchema = {
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  url: BASE_URL,
  name: "Ivan Gomes — Webdesign & Entwicklung",
  description:
    "Portfolio von Ivan Vilar Gomes, Freelance Web Developer & Designer aus Münster.",
  inLanguage: "de-DE",
  author: { "@id": `${BASE_URL}/#person` },
};

// Maps the three visible pricing packages so search & answer engines (GEO)
// can read the concrete offerings. Prices reflect the visible "ab"-Preise.
const serviceSchema = {
  "@type": "Service",
  "@id": `${BASE_URL}/#service`,
  name: "Webdesign & Webentwicklung",
  serviceType: "Webdesign & Webentwicklung",
  provider: { "@id": `${BASE_URL}/#business` },
  inLanguage: "de-DE",
  areaServed: [
    { "@type": "Country", name: "Deutschland" },
    { "@type": "State", name: "Nordrhein-Westfalen" },
    { "@type": "City", name: "Münster" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Website-Pakete",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Starter",
        description:
          "Simple Website – alle Infos auf einer Seite (One-Pager): Responsive Design, Kontaktformular, Google Business Integration, 4 Wochen Support.",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: "1500",
          priceCurrency: "EUR",
        },
        category: "Webdesign",
      },
      {
        "@type": "Offer",
        name: "Standard",
        description:
          "Premium Website – mehr Design & Features: Premium Design & Polishing, SEO & GEO optimiert, Google Maps Integration, Kontaktformular, 4 Wochen Support.",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: "2500",
          priceCurrency: "EUR",
        },
        category: "Webdesign",
      },
      {
        "@type": "Offer",
        name: "Premium",
        description:
          "Mehrseitige Website + Booking System: echte Unterseiten (Multi-Page), Admin Dashboard, E-Mail Automation, SEO & GEO optimiert, 8 Wochen Support.",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: "3500",
          priceCurrency: "EUR",
        },
        category: "Webentwicklung",
      },
    ],
  },
};

// FAQPage built from the same data as the visible FAQ section so structured
// data always matches on-page content. Strong GEO/AEO signal — AI answer
// engines (ChatGPT, Perplexity, AI Overviews) cite FAQ answers directly.
const faqSchema = {
  "@type": "FAQPage",
  "@id": `${BASE_URL}/#faq`,
  inLanguage: "de-DE",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    personSchema,
    localBusinessSchema,
    websiteSchema,
    serviceSchema,
    faqSchema,
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${body.variable} ${display.variable}`}>
      {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
