"use client";

import { useState, useEffect } from "react";
import { TbSun, TbMoon } from "react-icons/tb";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Changer de thème"
      className="panel-solid flex items-center gap-1.5 rounded-full bg-yellow px-3 py-1.5 font-display text-xs text-ink"
    >
      {isDark ? <TbSun size={14} /> : <TbMoon size={14} />}
      {isDark ? "CLAIR" : "SOMBRE"}
    </button>
  );
}