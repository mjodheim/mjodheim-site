import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import PageTransition from "@/components/PageTransition";
import { Analytics } from "@vercel/analytics/next";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mjödheim – Brasserie artisanale nordique",
    template: "%s – Mjödheim",
  },
  description:
    "Forgez votre légende, une gorgée à la fois. Brasserie artisanale nordique à Beaumont, Belgique. Hydromels et bières brassés à la main.",
  keywords: ["hydromel", "bière artisanale", "Belgique", "Beaumont", "nordique", "mead", "Mjödheim", "brasserie belge", "Ferosol", "Calarwen"],
  authors: [{ name: "Mjödheim" }],
  metadataBase: new URL("https://mjodheim.be"),
  openGraph: {
    type: "website",
    locale: "fr_BE",
    url: "https://mjodheim.be",
    siteName: "Mjödheim",
    title: "Mjödheim – Hydromel artisanal belge",
    description: "Forgez votre légende, une gorgée à la fois. Hydromel artisanal brassé à Beaumont, Belgique.",
    images: [
      {
        url: "/mjodheim-logo.jpg",
        width: 1024,
        height: 1024,
        alt: "Mjödheim – Hydromel artisanal belge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mjödheim – Hydromel artisanal belge",
    description: "Forgez votre légende, une gorgée à la fois.",
    images: ["/mjodheim-logo.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Mjödheim",
              description: "Brasserie artisanale nordique à Beaumont, Belgique. Hydromels et bières brassés à la main.",
              url: "https://mjodheim.be",
              telephone: "+32470404191",
              email: "contact@mjodheim.be",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Beaumont",
                addressCountry: "BE",
              },
              image: "https://mjodheim.be/mjodheim-logo.jpg",
              sameAs: [],
              priceRange: "€€",
            }),
          }}
        />
      </head>
      <body>
        <AgeGate />
        <Header />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
