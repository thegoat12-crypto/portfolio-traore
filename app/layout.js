import { LanguageProvider } from "@/contexts/LanguageContext";
import SplashScreen from "@/components/ui/SplashScreen";
import CustomCursor from "@/components/ui/CustomCursor";
import "./globals.css";

export const metadata = {
  title: "Zié Traoré — Développeur Big Data & IA",
  description: "Portfolio de Zié Traoré, développeur fullstack et étudiant en Master Big Data & IA.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Bangers&family=Inter:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const saved = localStorage.getItem("theme");
                const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                const theme = saved || (prefersDark ? "dark" : "light");
                if (theme === "dark") document.documentElement.classList.add("dark");
              })();
            `,
          }}
        />
      </head>
      <body>
        <LanguageProvider>
          <SplashScreen />
          <CustomCursor />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}