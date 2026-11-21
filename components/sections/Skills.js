"use client";

import { profile } from "@/data/profile";
import { useLanguage } from "@/contexts/LanguageContext";
import { skillIcons } from "@/data/skillIcons";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const accents = ["bg-cyan", "bg-pink text-white", "bg-yellow", "bg-cyan", "bg-pink text-white"];

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="competences" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading caption={t.skills.caption} eyebrow={t.skills.eyebrow} title={t.skills.title} />

        {/* grille « bento » : la catégorie la plus fournie prend plus de place */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {profile.skills.map((group, index) => (
            <Reveal key={group.key} delay={index * 80} className={index === 0 ? "lg:col-span-2" : ""}>
              <div className="panel h-full p-5">
                <div className="flex items-center justify-between">
                  <h3 className={`${accents[index % accents.length]} inline-block rounded px-2 py-1 font-display text-sm tracking-wide text-ink`}>
                    {t.skills.categories[group.key]}
                  </h3>
                  <span className="font-mono text-xs opacity-40">{String(group.items.length).padStart(2, "0")}</span>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => {
                    const Icon = skillIcons[item];
                    return (
                      <li key={item} className="flex items-center gap-2 rounded-full border-2 border-current/15 px-3 py-1 text-sm">
                        {Icon && <Icon className="text-cyan" size={14} aria-hidden />}
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
