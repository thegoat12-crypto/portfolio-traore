"use client";

import { createContext, useContext, useEffect } from "react";
import { translations } from "@/data/translations";
import { useLangValue, setLang } from "@/lib/clientStores";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const lang = useLangValue();

  // garde l'attribut lang du <html> aligné (lecteurs d'écran, traduction auto)
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function toggleLang() {
    setLang(lang === "fr" ? "en" : "fr");
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
