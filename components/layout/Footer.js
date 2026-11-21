"use client";

import { profile } from "@/data/profile";
import { useLanguage } from "@/contexts/LanguageContext";
import { TbArrowUp } from "react-icons/tb";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const words = t.footer.marquee;

  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="halftone absolute -top-24 right-0 h-72 w-72 rounded-full text-pink" aria-hidden />
      <div className="halftone absolute -bottom-24 -left-10 h-72 w-72 rounded-full text-cyan" aria-hidden />

      <div className="relative mx-auto max-w-5xl px-6 py-24 text-center">
        <span className="caption-box">{t.footer.caption}</span>
        <p className="misprint mt-5 font-display text-5xl font-bold md:text-7xl">{t.footer.title}</p>
        <p className="mx-auto mt-4 max-w-md opacity-75">{t.footer.subtitle}</p>

        <a
          href={`mailto:${profile.contact.email}`}
          className="mt-8 inline-block border-[3px] border-paper bg-pink px-8 py-4 font-display text-sm tracking-wide text-white shadow-[6px_6px_0_0_var(--color-paper)] transition-transform hover:-translate-y-0.5"
        >
          {t.footer.ctaButton} →
        </a>
      </div>

      <div className="relative overflow-hidden border-y-2 border-paper/15 bg-yellow py-3 text-ink" aria-hidden>
        <div className="marquee-track flex w-max">
          {[...words, ...words, ...words, ...words].map((word, i) => (
            <span key={i} className="mx-4 flex items-center gap-4 font-display text-sm">
              {word} <span className="text-pink">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs opacity-70 sm:flex-row">
        <span>
          © {year} {profile.shortName} — {t.footer.rights}
        </span>
        <a href="#top" className="flex items-center gap-1 hover:opacity-100">
          <TbArrowUp aria-hidden /> {t.footer.backToTop}
        </a>
        <span>{t.footer.madeWith}</span>
      </div>
    </footer>
  );
}
