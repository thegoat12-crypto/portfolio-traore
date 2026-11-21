"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "@/components/ui/Reveal";
import Portrait from "@/components/ui/Portrait";
import SectionHeading from "@/components/ui/SectionHeading";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="profil" className="section-alt px-6 py-24">
      <div className="relative mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <Portrait alt={t.about.portraitAlt} className="mx-auto max-w-xs -rotate-2" />
        </Reveal>

        <Reveal delay={150}>
          <SectionHeading caption={t.about.caption} eyebrow={t.about.eyebrow} title={t.about.title} />

          <p className="mt-6 max-w-xl leading-relaxed opacity-80">{t.about.bio}</p>

          <dl className="mt-10 grid gap-4 sm:grid-cols-2">
            {t.about.stats.map((stat) => (
              <div key={stat.label} className="panel p-4">
                <dt className="font-mono text-xs uppercase tracking-wider opacity-60">{stat.label}</dt>
                <dd className="mt-1 font-display text-lg">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
