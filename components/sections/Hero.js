"use client";

import { profile, skillCount } from "@/data/profile";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import LocalClock from "@/components/ui/LocalClock";
import HeroScene from "@/components/ui/HeroScene";
import GlitchTitle from "@/components/ui/GlitchTitle";
import { TbArrowDown, TbDownload, TbMapPin } from "react-icons/tb";

function Counter({ target, isActive }) {
  const value = useCountUp(target, isActive);
  return <span className="misprint font-display text-4xl font-bold text-pink">{value}</span>;
}

function WebCorner() {
  return (
    <svg viewBox="0 0 400 400" className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 text-pink opacity-40 md:h-[28rem] md:w-[28rem]" fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth="1.5">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <line
            key={deg}
            className="web-line"
            x1="200"
            y1="200"
            x2={200 + 200 * Math.cos((deg * Math.PI) / 180)}
            y2={200 + 200 * Math.sin((deg * Math.PI) / 180)}
          />
        ))}
        {[60, 120, 180].map((r) => (
          <circle key={r} className="web-line" cx="200" cy="200" r={r} />
        ))}
      </g>
    </svg>
  );
}

export default function Hero() {
  const { t, lang } = useLanguage();
  const { ref, isVisible } = useScrollReveal();

  const internships = t.experience.items.filter((i) => i.type === "internship").length;
  const stats = [skillCount, t.projects.items.length, internships];

  return (
    <section id="top" ref={ref} className="relative overflow-hidden px-6 pb-64 pt-32 md:pb-80">
      <div className="halftone-fade absolute inset-0 text-cyan" aria-hidden />
      <HeroScene />
      <WebCorner />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest opacity-70">{t.hero.role}</p>

          <GlitchTitle className="misprint mt-8 font-display font-bold md:mt-10" label={profile.name}>
            <span className="glitch-auto block text-7xl leading-[0.9] sm:text-8xl md:text-9xl" data-text={profile.familyName.toUpperCase()} aria-hidden>
              {profile.familyName.toUpperCase()}
            </span>
            <span className="glitch-auto glitch-late mt-2 block text-3xl leading-[1.05] text-pink sm:text-4xl md:text-5xl" data-text={profile.givenNames} aria-hidden>
              {profile.givenNames}
            </span>
          </GlitchTitle>

          <p className="mt-5 text-2xl opacity-85 md:text-3xl">{t.hero.tagline}</p>

          <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-75">
            {t.hero.bioIntro}
            <strong className="font-display font-normal text-pink">{t.hero.bioDegree}</strong>
            {t.hero.bioOutro}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#contact" className="btn-pop panel-solid bg-pink px-6 py-3 font-display text-sm tracking-wide text-white">
              {t.hero.ctaContact}
            </a>
            <a href="#projets" className="btn-pop panel-solid flex items-center gap-2 bg-paper px-6 py-3 font-display text-sm tracking-wide text-ink">
              {t.hero.ctaProjects} <TbArrowDown aria-hidden />
            </a>
            {profile.cv && (
              <a href={profile.cv} download className="btn-pop panel-solid flex items-center gap-2 bg-cyan px-6 py-3 font-display text-sm tracking-wide text-ink">
                <TbDownload aria-hidden /> {t.hero.ctaResume}
              </a>
            )}
          </div>

          <dl className="mt-10 flex gap-10">
            {stats.map((value, i) => (
              <div key={t.hero.stats[i]} className="flex flex-col-reverse">
                <dt className="mt-1 text-xs uppercase tracking-wide opacity-60">{t.hero.stats[i]}</dt>
                <dd>
                  <Counter target={value} isActive={isVisible} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Fiche personnage : statut, heure locale, actu */}
        <aside className="panel-solid relative rotate-1 bg-paper p-6 text-ink">
          <span className="panel-solid absolute -right-4 -top-5 -rotate-6 bg-yellow px-3 py-1 font-display text-xs">
            {t.hero.badgeOpen}
          </span>

          <div className="flex items-center gap-2 font-display text-sm">
            <span className="pulse-dot inline-block h-3 w-3 rounded-full bg-[#1fbf5f]" aria-hidden />
            {t.hero.status} — {t.hero.statusText}
          </div>

          <dl className="mt-5 space-y-4 text-sm">
            <div className="flex items-start justify-between gap-4 border-b-2 border-dashed border-ink/20 pb-3">
              <dt className="flex items-center gap-1 opacity-60">
                <TbMapPin aria-hidden /> {t.hero.localTime}
              </dt>
              <dd>
                <LocalClock lang={lang} />
              </dd>
            </div>
            <div className="border-b-2 border-dashed border-ink/20 pb-3">
              <dt className="opacity-60">{t.hero.now}</dt>
              <dd className="mt-1 font-display text-base">{t.hero.nowText}</dd>
            </div>
            <div>
              <dt className="opacity-60">{t.hero.latest}</dt>
              <dd className="mt-1 font-display text-base">{t.hero.latestText}</dd>
            </div>
          </dl>

          <span className="panel-solid absolute -bottom-4 left-6 rotate-3 bg-cyan px-3 py-1 font-display text-xs">
            {t.hero.badgeData}
          </span>
        </aside>
      </div>
    </section>
  );
}
