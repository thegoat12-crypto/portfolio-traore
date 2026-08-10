"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { profile } from "@/data/profile";
import { useLanguage } from "@/contexts/LanguageContext";

const links = [
  { href: "#profil", key: "profil" },
  { href: "#competences", key: "competences" },
  { href: "#experience", key: "experience" },
  { href: "#projets", key: "projets" },
  { href: "#contact", key: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b-4 transition-all duration-300 ${
        scrolled
          ? "border-ink dark:border-paper bg-paper/95 dark:bg-ink/95 backdrop-blur-md py-2 shadow-[0_6px_0_0_var(--color-pink)]"
          : "border-transparent bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-3 group">
  <span className="graffiti-badge -rotate-3 text-2xl text-pink transition-transform group-hover:rotate-0">
    {profile.initials}
  </span>
  <span className="hidden sm:block font-display font-bold text-lg leading-none">
    {profile.shortName}
  </span>
</a>

        <ul className="hidden md:flex gap-2 text-sm font-display">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="block rounded-full px-4 py-2 tracking-wide transition-all hover:panel hover:bg-yellow hover:text-ink">
                {t.nav[l.key]}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <button
          className="md:hidden panel-solid bg-pink text-white px-3 py-1.5 font-display text-sm"
          onClick={() => setOpen(!open)}
          aria-label="Ouvrir le menu"
          aria-expanded={open}
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <ul className="md:hidden flex flex-col gap-2 px-6 pb-6 font-display">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block panel bg-transparent px-4 py-2">
                {t.nav[l.key]}
              </a>
            </li>
          ))}
          <li className="flex gap-3 mt-2">
            <LanguageToggle />
            <ThemeToggle />
          </li>
        </ul>
      )}
    </header>
  );
}