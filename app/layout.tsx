import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

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
  preload: false,
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [personSchema, localBusinessSchema, websiteSchema],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${body.variable} ${display.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
