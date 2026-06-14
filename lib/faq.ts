// Single source of truth for the FAQ — consumed by the visible FAQ section
// (components/FAQ.tsx) and the FAQPage JSON-LD (app/layout.tsx). Keeping both
// in sync satisfies the rule that structured data must match visible content.

export type FaqItem = {
  question: string;
  answer: string;
};

export const faq: FaqItem[] = [
  {
    question: "Wie lange dauert es, bis meine Website online ist?",
    answer:
      "In der Regel 2 bis 4 Wochen. Je nach Umfang und Absprache kann es schneller gehen oder etwas länger dauern — Flexibilität und Termintreue stehen an erster Stelle.",
  },
  {
    question: "Was kostet eine professionelle Website?",
    answer:
      "Die Pakete starten bei 1.500 € (Starter), 2.500 € (Standard) und 3.500 € (Premium). Der finale Preis hängt von Umfang, Aufwand und individuellen Wünschen ab — im kostenlosen Erstgespräch gibt es ein exaktes Angebot.",
  },
  {
    question: "Welche Zahlungsmöglichkeiten gibt es?",
    answer:
      "Du kannst flexibel zahlen: 30 % Anzahlung plus 6 monatliche Raten, den vollen Betrag sofort ohne Gebühren oder den Betrag in 2 monatlichen Raten. Unabhängig von der gewählten Zahlungsoption wird das Projekt erst nach Eingang einer Anzahlung gestartet.",
  },
  {
    question: "Für welche Regionen arbeitest du?",
    answer:
      "Ich bin Freelance Web Developer & Designer aus Münster und arbeite für Unternehmen in ganz Deutschland — remote sowie persönlich in Münster und Nordrhein-Westfalen.",
  },
  {
    question: "Sind die Websites DSGVO-konform?",
    answer:
      "Ja. Jede Website wird datenschutzkonform nach deutschem Recht umgesetzt — von Cookie-Banner bis Impressum. Deine Seite ist rechtssicher und DSGVO-konform.",
  },
  {
    question: "Werden meine Seiten für Google und KI-Suchmaschinen optimiert?",
    answer:
      "Ja. Basis-SEO ist bei jeder Website inklusive — saubere Meta-Tags, Sitemap und schnelle Ladezeiten, damit Google deine Seite versteht. Ab dem Standard-Paket kommt die volle SEO- & GEO-Optimierung dazu: gezielte Keywords, Content-Struktur und Optimierung für KI-Antwortmaschinen wie ChatGPT und Perplexity.",
  },
];
