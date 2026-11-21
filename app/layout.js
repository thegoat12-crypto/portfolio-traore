import { Anton, Bangers, Inter, Space_Mono } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext";
import SplashScreen from "@/components/ui/SplashScreen";
import CustomCursor from "@/components/ui/CustomCursor";
import SkipLink from "@/components/ui/SkipLink";
import { profile } from "@/data/profile";
import "./globals.css";

// Polices auto-hébergées par next/font : pas de requête vers Google, pas de saut de texte.
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const bangers = Bangers({ weight: "400", subsets: ["latin"], variable: "--font-bangers", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-space-mono", display: "swap" });

const title = "Zié Traoré — Développeur fullstack, Big Data & IA";
const description =
  "Portfolio de Zié Traoré, développeur fullstack à Abidjan et étudiant en Master Big Data & IA (ESATIC). Projets, parcours et contact.";

export const metadata = {
  // Sur Vercel, l'URL de production est détectée automatiquement.
  // Ailleurs, définir NEXT_PUBLIC_SITE_URL (ex. https://zie-traore.dev) pour les aperçus de partage.
  ...(process.env.NEXT_PUBLIC_SITE_URL && { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL) }),
  title,
  description,
  authors: [{ name: profile.name }],
  keywords: ["Zié Traoré", "développeur fullstack", "Big Data", "IA", "data science", "Abidjan", "Côte d'Ivoire", "portfolio"],
  openGraph: {
    title,
    description,
    type: "profile",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    siteName: profile.shortName,
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f3ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a12" },
  ],
};

// Exécuté avant l'affichage : applique le thème, la langue enregistrée et
// saute l'intro si elle a déjà été vue pendant la session (ou si l'animation est réduite).
const bootScript = `(function(){try{
var d=document.documentElement;
var t=localStorage.getItem("theme");
if(t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches)d.classList.add("dark");
var l=localStorage.getItem("lang");
if(l==="fr"||l==="en")d.lang=l;
if(sessionStorage.getItem("splash-seen")||matchMedia("(prefers-reduced-motion: reduce)").matches)d.dataset.splash="off";
}catch(e){}})();`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Développeur fullstack — Big Data & IA",
  email: `mailto:${profile.contact.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Abidjan", addressCountry: "CI" },
  alumniOf: ["Institut Ivoirien de Technologie", "ESATIC"],
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body>
        <LanguageProvider>
          <SkipLink />
          <div className="scroll-progress" aria-hidden />
          <SplashScreen />
          <CustomCursor />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
