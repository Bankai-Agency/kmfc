import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import WhatsAppButton from "@/components/widgets/WhatsAppButton";
import SocialProofToast from "@/components/widgets/SocialProofToast";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "KMFC — Кредиты под залог имущества в Алматы и Актобе",
  description: "Кредиты под залог недвижимости, авто, земли и спецтехники в Алматы и Актобе. Одобрение за 1 день, выгодные ставки, лицензия НБ РК.",
  robots: "noindex, nofollow",
  openGraph: {
    title: "KMFC — Кредиты под залог имущества",
    description: "Одобрение за 1 день. До 30 млн ₸ под залог недвижимости, авто, земли. Лицензия НБ РК.",
    type: "website",
    locale: "ru_KZ",
    siteName: "KMFC",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "KMFC — Казахстанская Микрофинансовая Компания",
  description: "Кредиты под залог имущества в Алматы и Актобе. Одобрение за 1 день.",
  telephone: "+7-727-355-55-65",
  address: [
    {
      "@type": "PostalAddress",
      addressLocality: "Алматы",
      addressCountry: "KZ",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Актобе",
      addressCountry: "KZ",
    },
  ],
  areaServed: [
    { "@type": "City", name: "Алматы" },
    { "@type": "City", name: "Актобе" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Кредиты под залог",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "LoanOrCredit", name: "Кредит под залог недвижимости", currency: "KZT" } },
      { "@type": "Offer", itemOffered: { "@type": "LoanOrCredit", name: "Кредит под залог автомобиля", currency: "KZT" } },
      { "@type": "Offer", itemOffered: { "@type": "LoanOrCredit", name: "Кредит под залог земельного участка", currency: "KZT" } },
      { "@type": "Offer", itemOffered: { "@type": "LoanOrCredit", name: "Кредит под залог спецтехники", currency: "KZT" } },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script src="https://dashboard.mooonai.com/cdn/moon-ai-chat-plugin/v1.1.0/moon-ai-site-chat.min.js" defer />
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: `initMoonAIChat({ "uuid": "9d9fb1d9-ae76-45b6-ab5f-6bade6bc4345" });`,
          }}
        />
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyMobileCTA />
        <WhatsAppButton />
        <SocialProofToast />
      </body>
    </html>
  );
}
