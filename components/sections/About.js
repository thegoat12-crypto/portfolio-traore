"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "@/components/ui/Reveal";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="profil" className="section-alt py-24 px-6">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <div className="panel mx-auto flex aspect-[3/4] w-full max-w-xs items-center justify-center bg-transparent">
            <span className="text-center text-sm opacity-50">
              {t.about.photoPlaceholder}
            </span>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div>
            <p className="text-sm opacity-60">{t.about.eyebrow}</p>
            <h2
              data-text={t.about.title}
              className="glitch font-display font-bold text-4xl md:text-5xl mt-2"
            >
              {t.about.title}
            </h2>

            <p className="mt-6 max-w-xl leading-relaxed opacity-70">
              {t.hero.bio}
            </p>

            <dl className="mt-10 grid gap-4 sm:grid-cols-2">
              {t.about.stats.map((stat) => (
                <div key={stat.label} className="panel p-4">
                  <dt className="text-xs opacity-60">{stat.label}</dt>
                  <dd className="mt-1 font-display font-bold">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}