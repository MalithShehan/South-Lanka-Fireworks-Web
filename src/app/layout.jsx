import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const poppins = Geist({
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://southlankafireworks.com"),
  title: {
    default: "South Lanka Fireworks | Best Fireworks & Pyrotechnics in Sri Lanka",
    template: "%s | South Lanka Fireworks",
  },
  description:
    "South Lanka Fireworks – Sri Lanka's premier pyrotechnics company. Custom fireworks shows for weddings, festivals, corporate events & national celebrations. Licensed & certified. Serving all districts since 2005.",
  keywords: [
    "fireworks Sri Lanka",
    "pyrotechnics Sri Lanka",
    "wedding fireworks",
    "fireworks display",
    "South Lanka Fireworks",
    "fireworks Galle",
    "fireworks show",
    "aerial shells",
    "custom fireworks",
    "fireworks company",
    "licensed fireworks",
  ],
  authors: [{ name: "South Lanka Fireworks" }],
  creator: "South Lanka Fireworks",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://southlankafireworks.com",
    siteName: "South Lanka Fireworks",
    title: "South Lanka Fireworks | Best Fireworks & Pyrotechnics in Sri Lanka",
    description:
      "Custom fireworks displays for weddings, festivals & corporate events across Sri Lanka. Licensed & certified with 1000+ shows delivered since 2005.",
    images: [
      {
        url: "/assets/SouthLankaFireworks.webp",
        width: 1200,
        height: 630,
        alt: "South Lanka Fireworks – Sri Lanka's Premier Pyrotechnics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "South Lanka Fireworks | Best Fireworks & Pyrotechnics in Sri Lanka",
    description:
      "Custom fireworks for weddings, festivals & events. Licensed & certified pyrotechnicians. Serving all of Sri Lanka since 2005.",
    images: ["/assets/SouthLankaFireworks.webp"],
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
  verification: {
    google: "1NoYka2cUzfunfpmVKFEMh1Wrv16HjNQwh2Ks_YAAms",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://southlankafireworks.com/#business",
    name: "South Lanka Fireworks",
    description:
      "Sri Lanka's premier fireworks and pyrotechnics company, delivering custom aerial shells, special effects, and full-scale shows for weddings, festivals, and corporate events since 2005.",
    url: "https://southlankafireworks.com",
    telephone: ["+94777135516", "+94912246572"],
    email: "southlankafireworks@gmail.com",
    foundingDate: "2005",
    priceRange: "Rs. 35,000 – Rs. 500,000+",
    currenciesAccepted: "LKR",
    paymentAccepted: "Cash, Bank Transfer",
    image: "https://southlankafireworks.com/assets/SouthLankaFireworks.webp",
    logo: "https://southlankafireworks.com/assets/SouthLankaFireworks.webp",
    address: {
      "@type": "PostalAddress",
      streetAddress: "No 07, Dadalle Cross Road, Dadalle",
      addressLocality: "Galle",
      addressCountry: "LK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 6.050844,
      longitude: 80.186904,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: [
      "https://www.facebook.com/share/1CEsjdTcV4/?mibextid=wwXIfr",
      "https://www.instagram.com/southlankafireworks",
      "https://www.tiktok.com/@southlankafireworks",
    ],
    areaServed: { "@type": "Country", name: "Sri Lanka" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Fireworks Services & Products",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How far in advance should I book a fireworks show?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We recommend booking at least 2–4 weeks in advance. Contact us via WhatsApp for last-minute requests.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide fireworks for weddings in Sri Lanka?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! We specialize in wedding fireworks including sparkler exits, waterfall backdrops, and full aerial displays choreographed to music.",
        },
      },
      {
        "@type": "Question",
        name: "What areas in Sri Lanka do you cover?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We provide nationwide coverage across all districts in Sri Lanka, from Colombo and Galle to Kandy, Jaffna, and everywhere in between.",
        },
      },
      {
        "@type": "Question",
        name: "Is it safe? Do you have proper licensing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Safety is our #1 priority. We hold all required pyrotechnic licenses (Reg. No: SG/5276) and maintain a 100% safety record across 1000+ events.",
        },
      },
    ],
  },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kaushan+Script&family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0a0612" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, interactive-widget=resizes-content" />
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className={poppins.variable}>
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-QMR2FHNGJE`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QMR2FHNGJE');
          `}
        </Script>
      </body>
    </html>
  );
}
