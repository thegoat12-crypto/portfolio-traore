"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
  const { lang, toggleLang, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t.meta.switchLang}
      lang={lang === "fr" ? "en" : "fr"}
      className="btn-pop panel-solid rounded-full bg-cyan px-3 py-1.5 font-display text-xs text-ink"
    >
      {lang === "fr" ? "EN" : "FR"}
    </button>
  );
}
