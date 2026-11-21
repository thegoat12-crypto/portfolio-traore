"use client";

import { useLanguage } from "@/contexts/LanguageContext";

// Lien caché qui apparaît à la première tabulation : permet de sauter la navigation au clavier.
export default function SkipLink() {
  const { t } = useLanguage();
  return (
    <a
      href="#contenu"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:border-[3px] focus:border-ink focus:bg-yellow focus:px-4 focus:py-2 focus:font-display focus:text-sm focus:text-ink"
    >
      {t.meta.skip}
    </a>
  );
}
