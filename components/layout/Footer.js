"use client";

import { profile } from "@/data/profile";
import { useLanguage } from "@/contexts/LanguageContext";
import { TbMail, TbPhone, TbArrowUp } from "react-icons/tb";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";

const socials = [
  { key: "email", icon: TbMail, href: `mailto:${profile.contact.email}`, label: profile.contact.email, external: false },
  { key: "phone", icon: TbPhone, href: `tel:${profile.contact.phone.replace(/\s/g, "")}`, label: profile.contact.phone, external: false },
  { key: "linkedin", icon: FaLinkedin, href: profile.contact.linkedin, label: "LinkedIn", external: true },
  { key: "github", icon: SiGithub, href: profile.contact.github, label: "GitHub", external: true },
];

const marqueeWords = ["OPEN TO WORK", "DATA", "IA", "FULLSTACK", "ABIDJAN"];

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="relative overflow-hidden border-t-4 border-current/10 bg-paper text-ink dark:bg-ink dark:text-paper">
      <div className="halftone text-pink absolute -top-24 right-0 h-72 w-72 rounded-full" />

      <div className="relative mx-auto max-w-5xl px-6 py-24 text-center">
        <p className="text-sm opacity-60">{t.footer.eyebrow}</p>
        <h2 data-text={t.footer.title} className="glitch font-display font-bold text-4xl md:text-6xl mt-2">
          {t.footer.title}
        </h2>
        <p className="mt-4 max-w-md mx-auto opacity-70">{t.footer.subtitle}</p>

        <a href={`mailto:${profile.contact.email}`} className="panel-solid inline-block mt-8 bg-pink text-white px-8 py-4 font-display text-sm tracking-wide hover:-translate-y-0.5 transition-transform">
  {t.footer.ctaButton} →
</a>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <a key={s.key} href={s.href} target={s.external ? "_blank" : undefined} rel="noreferrer" className="panel flex items-center gap-3 p-4 bg-transparent hover:-translate-y-1 transition-transform">
                <Icon className="text-cyan shrink-0" size={20} />
                <span className="text-sm break-all">{s.label}</span>
              </a>
            );
          })}
        </div>
      </div>

      <div className="relative border-y-2 border-current/10 py-3 overflow-hidden">
        <div className="marquee-track flex w-max">
          {[...marqueeWords, ...marqueeWords].map((word, i) => (
            <span key={i} className="mx-4 font-display text-sm opacity-40 flex items-center gap-4">
              {word} <span className="text-pink">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-5xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-50">
        <span>© {year} {profile.shortName} — {t.footer.rights}</span>
        <button onClick={scrollToTop} className="flex items-center gap-1 hover:opacity-100 opacity-70 transition-opacity">
          <TbArrowUp /> {t.footer.backToTop}
        </button>
        <span>{t.footer.madeWith}</span>
      </div>
    </footer>
  );
}