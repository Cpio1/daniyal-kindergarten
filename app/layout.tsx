import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import { LanguageProvider } from "@/components/LanguageProvider";
import { SITE } from "@/lib/site";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

const title = "«Даниял» балабақшасы — Қайназар ауылы | Детский сад «Даниял»";
const description =
  "«Даниял» жеке балабақшасы: 2–6 жастағы балалар, 4 топ, қазақ тілінде тәрбие, күніне 4 мезгіл тамақтану. Жұмыс уақыты 07:30–18:00. Алматы облысы, Жамбыл ауданы, Қайназар ауылы. Частный детский сад «Даниял» в селе Кайназар.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title,
  description,
  applicationName: "«Даниял» балабақшасы",
  keywords: [
    "Даниял балабақшасы",
    "балабақша Қайназар",
    "жеке балабақша Жамбыл ауданы",
    "детский сад Даниял",
    "детский сад Кайназар",
    "частный детский сад Жамбылский район",
    "балабақша Алматы облысы",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "kk_KZ",
    alternateLocale: ["ru_RU"],
    siteName: "«Даниял» балабақшасы",
    title,
    description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#77C9F4",
  colorScheme: "only light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ChildCare",
  name: "«Даниял» балабақшасы",
  alternateName: ["Детский сад «Даниял»", SITE.legalName],
  url: SITE.url,
  telephone: "+77000888315",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Орталық көшесі, 18",
    addressLocality: "Қайназар ауылы",
    addressRegion: "Алматы облысы, Жамбыл ауданы",
    addressCountry: "KZ",
  },
  sameAs: [SITE.instagram],
  inLanguage: ["kk", "ru"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="kk" className={`${nunito.variable} antialiased`} style={{ colorScheme: "only light" }}>
      <head>
        <meta name="supported-color-schemes" content="light" />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-screen bg-white text-ink">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
