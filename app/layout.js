import { Anton, Bangers, Inter, Space_Mono } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext";
import SplashScreen from "@/components/ui/SplashScreen";
import CustomCursor from "@/components/ui/CustomCursor";
import SkipLink from "@/components/ui/SkipLink";
import BackgroundFX from "@/components/ui/BackgroundFX";
import SoundToggle from "@/components/ui/SoundToggle";
import { Analytics } from "@vercel/analytics/next";
import { profile } from "@/data/profile";
import "./globals.css";

// Polices auto-hébergées par next/font : pas de requête vers Google, pas de saut de texte.
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const bangers = Bangers({ weight: "400", subsets: ["latin"], variable: "--font-bangers", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-space-mono", display: "swap" });

const title = "Traoré Zié Mohamed Allassane Junior — Data / IA & développeur fullstack";
const description =
  "Portfolio de Traoré Zié Mohamed Allassane Junior, étudiant en Master 2 Big Data & IA (ESATIC / ESTIA) et développeur fullstack à Abidjan. Disponible immédiatement pour un stage de six mois en Data / IA.";

export const metadata = {
  // URL publique du site (aperçus de partage). NEXT_PUBLIC_SITE_URL la remplace si besoin.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || profile.siteUrl),
  title,
  description,
  authors: [{ name: profile.name }],
  keywords: ["Traoré Zié Mohamed Allassane Junior", "Zié Traoré", "stage data", "stage IA", "Power BI", "développeur fullstack", "Big Data", "IA", "data science", "Abidjan", "Côte d'Ivoire", "portfolio"],
  openGraph: {
    title,
    description,
    type: "profile",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    siteName: profile.name,
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f3ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a12" },
  ],
};

// Exécuté avant l'affichage : applique le thème et la langue enregistrés (pas de flash).
const bootScript = `(function(){try{
var d=document.documentElement;
var t=localStorage.getItem("theme");
if(t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches)d.classList.add("dark");
var l=localStorage.getItem("lang");
if(l==="fr"||l==="en")d.lang=l;
}catch(e){}})();`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  givenName: profile.givenNames,
  familyName: profile.familyName,
  jobTitle: "Étudiant en Master 2 Big Data & IA — Développeur fullstack",
  url: profile.siteUrl,
  email: `mailto:${profile.contact.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Abidjan", addressCountry: "CI" },
  alumniOf: ["Institut Ivoirien de Technologie", "ESATIC", "ESTIA"],
  knowsLanguage: ["fr", "en"],
  sameAs: [profile.contact.linkedin, profile.contact.github],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${anton.variable} ${bangers.variable} ${inter.variable} ${spaceMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        {/* "<" échappé : un texte contenant "</script>" ne pourra jamais casser la balise */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }} />
      </head>
      <body>
        <LanguageProvider>
          <SkipLink />
          <div className="scroll-progress" aria-hidden />
          <BackgroundFX />
          <SplashScreen />
          <CustomCursor />
          {children}
          <SoundToggle />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
