"use client";

import { profile } from "@/data/profile";
import { useLanguage } from "@/contexts/LanguageContext";
import { skillIcons, skillColors } from "@/data/skillIcons";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillsMarquee from "@/components/ui/SkillsMarquee";

const accents = ["bg-cyan text-ink", "bg-pink text-white", "bg-yellow text-ink"];

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="competences" className="relative px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading caption={t.skills.caption} eyebrow={t.skills.eyebrow} title={t.skills.title} />

        <SkillsMarquee />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {profile.skills.map((group, index) => (
            <Reveal key={group.key} delay={index * 70}>
              <div className="panel h-full bg-paper p-5 text-ink dark:bg-ink dark:text-paper">
                <div className="flex items-center justify-between">
                  <h3 className={`${accents[index % accents.length]} inline-block rounded px-2 py-1 font-display text-sm tracking-wide`}>
                    {t.skills.categories[group.key]}
                  </h3>
                  <span className="font-mono text-xs opacity-40">{String(group.items.length).padStart(2, "0")}</span>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => {
                    const Icon = skillIcons[item];
                    return (
                      <li key={item} className="flex items-center gap-2 rounded-full border-2 border-current/15 bg-paper px-3 py-1 text-sm text-ink">
                        {Icon && <Icon size={15} style={{ color: skillColors[item] }} aria-hidden />}
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
