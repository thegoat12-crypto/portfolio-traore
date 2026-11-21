"use client";

import { TbSun, TbMoon } from "react-icons/tb";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsDark, setDark } from "@/lib/clientStores";

export default function ThemeToggle() {
  const { t } = useLanguage();
  const isDark = useIsDark();

  return (
    <button
      type="button"
      onClick={() => setDark(!isDark)}
      aria-label={isDark ? t.meta.themeToLight : t.meta.themeToDark}
      className="btn-pop panel-solid flex items-center gap-1.5 rounded-full bg-yellow px-3 py-1.5 font-display text-xs text-ink"
    >
      {isDark ? <TbSun size={14} aria-hidden /> : <TbMoon size={14} aria-hidden />}
      {isDark ? t.meta.themeLight : t.meta.themeDark}
    </button>
  );
}
