"use client";

import { profile } from "@/data/profile";
import { useLanguage } from "@/contexts/LanguageContext";
import { skillIcons } from "@/data/skillIcons";
import Reveal from "@/components/ui/Reveal";

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="competences" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm opacity-60">{t.skills.eyebrow}</p>
        <h2
          data-text={t.skills.title}
          className="glitch font-display font-bold text-4xl md:text-5xl mt-2"
        >
          {t.skills.title}
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {profile.skills.map((group, index) => (
    <Reveal key={group.category} delay={index * 80}>
      <div className="panel p-5">
        <span className="inline-block bg-cyan text-ink text-xs font-bold px-2 py-1 rounded">
          {group.category}
        </span>
        <ul className="mt-4 flex flex-wrap gap-2">
          {group.items.map((item) => {
            const Icon = skillIcons[item];
            return (
              <li key={item} className="flex items-center gap-2 text-sm border border-current/20 rounded-full px-3 py-1">
                {Icon && <Icon className="text-cyan" size={14} />}
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