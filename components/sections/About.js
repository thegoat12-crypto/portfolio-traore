"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import SectionFX from "@/components/ui/SectionFX";
import Reveal from "@/components/ui/Reveal";
import Portrait from "@/components/ui/Portrait";
import SectionHeading from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";
import { TbFileCv } from "react-icons/tb";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="profil" className="section-alt relative overflow-x-clip px-6 py-24">
      <SectionFX side="left" />
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

          <div className="mt-8">
            <p className="font-mono text-xs uppercase tracking-wider opacity-60">{t.about.interestsLabel}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {t.about.interests.map((item, i) => (
                <li
                  key={item}
                  className={`panel-solid px-3 py-1 font-display text-sm text-ink ${["bg-cyan -rotate-2", "bg-yellow rotate-1", "bg-paper -rotate-1", "bg-pink text-white rotate-2"][i % 4]}`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {profile.cv && (
            <a
              href={profile.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pop panel-solid mt-8 inline-flex items-center gap-2 bg-pink px-5 py-3 font-display text-sm tracking-wide text-white"
            >
              <TbFileCv size={18} aria-hidden /> {t.about.cvCta}
              <span className="sr-only">{t.meta.newTab}</span>
            </a>
          )}
        </Reveal>
      </div>
    </section>
  );
}
