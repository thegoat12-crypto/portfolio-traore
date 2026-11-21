"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { profile } from "@/data/profile";
import { useLanguage } from "@/contexts/LanguageContext";

const links = [
  { href: "#profil", key: "profil" },
  { href: "#competences", key: "competences" },
  { href: "#experience", key: "experience" },
  { href: "#projets", key: "projets" },
  { href: "#formation", key: "formation" },
  { href: "#contact", key: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });

    // surligne le lien de la section visible
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) observer.observe(el);
    });

    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b-4 transition-all duration-300 ${
        scrolled || open
          ? "border-ink bg-paper/95 py-2 shadow-[0_6px_0_0_var(--color-pink)] backdrop-blur-md dark:border-paper dark:bg-ink/95"
          : "border-transparent bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6" aria-label="Navigation">
        <a href="#top" className="group flex items-center gap-3">
          <span className="graffiti-badge -rotate-3 text-2xl text-pink transition-transform group-hover:rotate-0">
            {profile.initials}
          </span>
          <span className="hidden font-display text-lg font-bold leading-none sm:block">{profile.shortName}</span>
        </a>

        <ul className="hidden gap-1 font-display text-sm lg:flex">
          {links.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`block rounded-full px-4 py-2 tracking-wide transition-colors hover:bg-yellow hover:text-ink ${
                    isActive ? "bg-ink text-paper dark:bg-paper dark:text-ink" : ""
                  }`}
                >
                  {t.nav[l.key]}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <button
          type="button"
          className="panel-solid bg-pink px-3 py-1.5 font-display text-sm text-white lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? t.meta.menuClose : t.meta.menuOpen}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <ul id="mobile-menu" className="flex flex-col gap-2 px-6 pb-6 pt-4 font-display lg:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="panel block bg-transparent px-4 py-2">
                {t.nav[l.key]}
              </a>
            </li>
          ))}
          <li className="mt-2 flex gap-3">
            <LanguageToggle />
            <ThemeToggle />
          </li>
        </ul>
      )}
    </header>
  );
}
