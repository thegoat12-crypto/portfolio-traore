"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Experience() {
  const { t } = useLanguage();
  const items = t.experience.items;

  return (
    <section id="experience" className="section-alt px-6 py-24">
      <div className="relative mx-auto max-w-4xl">
        <SectionHeading caption={t.experience.caption} eyebrow={t.experience.eyebrow} title={t.experience.title} />

        {/* frise : un fil de toile vertical relie les cases */}
        <ol className="relative mt-14 space-y-10 border-l-[3px] border-dashed border-pink pl-8 md:pl-12">
          {items.map((item, index) => {
            const isInternship = item.type === "internship";
            return (
              <li key={item.title} className="relative">
                <span
                  className={`absolute -left-[46px] top-6 h-6 w-6 rounded-full border-[3px] border-current md:-left-[62px] ${
                    isInternship ? "bg-cyan" : "bg-yellow"
                  }`}
                  aria-hidden
                />
                <Reveal delay={index * 80}>
                  <article className="panel bg-transparent p-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`${isInternship ? "bg-cyan" : "bg-yellow"} rounded px-2 py-1 font-display text-xs tracking-wide text-ink`}>
                        {isInternship ? t.experience.tagInternship : t.experience.tagAchievement}
                      </span>
                      <span className="font-mono text-xs opacity-60">{item.date}</span>
                      <span className="ml-auto font-mono text-xs opacity-30">#{String(items.length - index).padStart(2, "0")}</span>
                    </div>

                    <h3 className="mt-3 font-display text-2xl font-bold">{item.title}</h3>
                    <p className="mt-1 text-sm font-medium text-pink">{item.org}</p>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed opacity-75">{item.text}</p>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
