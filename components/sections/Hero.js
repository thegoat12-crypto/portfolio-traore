"use client";

import { profile } from "@/data/profile";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  { target: 17, suffix: "+" },
  { target: 3, suffix: "" },
  { target: 2, suffix: "" },
];

function Counter({ target, suffix, isActive }) {
  const value = useCountUp(target, isActive);
  return (
    <span className="font-display font-bold text-3xl text-pink">
      {value}{suffix}
    </span>
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="top" ref={ref} className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="halftone absolute -right-20 -top-20 h-72 w-72 rounded-full" />

      <svg viewBox="0 0 400 400" className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 md:h-96 md:w-96 opacity-40 text-pink" fill="none">
        <g stroke="currentColor" strokeWidth="1.5">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              className="web-line"
              x1="200" y1="200"
              x2={200 + 200 * Math.cos((deg * Math.PI) / 180)}
              y2={200 + 200 * Math.sin((deg * Math.PI) / 180)}
            />
          ))}
          {[60, 120, 180].map((r) => (
            <circle key={r} className="web-line" cx="200" cy="200" r={r} />
          ))}
        </g>
      </svg>

      <div className="relative mx-auto max-w-4xl">
        <p className="text-sm opacity-60 mb-2">{t.hero.role}</p>

        <h1 data-text={profile.shortName} className="glitch font-display font-bold text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
          {profile.shortName}
        </h1>

        <p className="mt-4 text-2xl md:text-3xl opacity-80">
          {t.hero.tagline}
        </p>

        <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-70">
          {t.hero.bioIntro}
          <span className="font-display text-pink">{t.hero.bioDegree}</span>
          {t.hero.bioOutro}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#contact" className="panel-solid bg-pink text-white px-6 py-3 text-sm font-medium">
            {t.hero.ctaContact}
          </a>
          <a href="#projets" className="rounded-full border border-current px-6 py-3 text-sm font-medium hover:opacity-70 transition-opacity">
            {t.hero.ctaProjects}
          </a>

          <a  href="/cv-zie-traore.pdf"
  download
  className="panel bg-transparent px-6 py-3 text-sm font-medium flex items-center gap-2"
>
  {t.hero.ctaResume}
          </a>
        </div>

        <div className="mt-10 flex gap-8">
          {stats.map((s, i) => (
            <div key={i}>
              <Counter target={s.target} suffix={s.suffix} isActive={isVisible} />
              <p className="text-xs uppercase tracking-wide opacity-60 mt-1">
                {t.stats.labels[i]}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="panel-solid absolute top-24 right-8 -rotate-6 bg-yellow text-ink px-3 py-1 font-display text-xs hidden lg:block">
        OPEN TO WORK
      </div>
      <div className="panel-solid absolute bottom-16 right-24 rotate-3 bg-cyan text-ink px-3 py-1 font-display text-xs hidden lg:block">
        DATA × IA
      </div>
    </section>
  );
}