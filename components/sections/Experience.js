"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "@/components/ui/Reveal";

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="section-alt py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm opacity-60">{t.experience.eyebrow}</p>
        <h2
          data-text={t.experience.title}
          className="glitch font-display font-bold text-3xl md:text-5xl mt-2"
        >
          {t.experience.title}
        </h2>

        <div className="mt-14 space-y-8">
          {t.experience.items.map((item, index) => {
            const tag =
              item.type === "internship"
                ? t.experience.tagInternship
                : t.experience.tagAchievement;
            const tagColor =
              item.type === "internship" ? "bg-cyan" : "bg-yellow";

            return (
              <Reveal key={item.title} delay={index * 100}>
                <div className="panel p-6 bg-transparent">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`${tagColor} text-ink text-xs font-bold px-2 py-1 rounded`}>
                      {tag}
                    </span>
                    <span className="text-xs opacity-50">{item.date}</span>
                    <span className="text-xs opacity-30">#{String(index + 1).padStart(2, "0")}</span>
                  </div>

                  <h3 className="mt-3 font-display font-bold text-xl">
                    {item.title}
                  </h3>
                  <p className="text-sm text-pink mt-1">{item.org}</p>
                  <p className="mt-3 text-sm leading-relaxed opacity-70 max-w-2xl">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}