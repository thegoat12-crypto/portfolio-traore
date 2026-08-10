"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      aria-label="Changer de langue"
      className="panel-solid rounded-full bg-cyan px-3 py-1.5 font-display text-xs text-ink"
    >
      {lang === "fr" ? "EN" : "FR"}
    </button>
  );
}