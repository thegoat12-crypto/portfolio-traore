"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeading from "@/components/ui/SectionHeading";
import OrgLogo from "@/components/ui/OrgLogo";

// Étoile « POW! » des réalisations (polygone en éclat, façon BD)
function Burst({ label }) {
  return (
    <span
      className="scroll-pop absolute -right-5 -top-7 z-10 flex h-20 w-20 items-center justify-center bg-yellow font-display text-sm text-ink"
      style={{
        clipPath:
          "polygon(50% 0, 61% 30%, 95% 18%, 72% 45%, 100% 62%, 66% 66%, 72% 100%, 50% 76%, 26% 98%, 30% 66%, 0 60%, 28% 44%, 6% 16%, 39% 30%)",
      }}
      aria-hidden
    >
      <span className="-rotate-12 drop-shadow-[2px_2px_0_var(--color-pink)]">{label}</span>
    </span>
  );
}

export default function Experience() {
  const { t } = useLanguage();
  const items = t.experience.items;

  return (
    <section id="experience" className="section-alt overflow-x-clip px-6 py-24">
      <div className="relative mx-auto max-w-5xl">
        <SectionHeading caption={t.experience.caption} eyebrow={t.experience.eyebrow} title={t.experience.title} />

        {/* frise : rail en pointillés + fil rose qui se dessine au fil du défilement */}
        <ol className="relative mt-14 space-y-14 border-l-[3px] border-dashed border-current/20 pl-8 md:space-y-4 md:border-l-0 md:pl-0">
          <span className="absolute left-1/2 top-0 hidden h-full w-0 -translate-x-1/2 border-l-[3px] border-dashed border-current/20 md:block" aria-hidden />
          <span className="scroll-line absolute -left-[3px] top-0 h-full w-[3px] bg-pink md:left-1/2 md:-translate-x-1/2" aria-hidden />

          {items.map((item, index) => {
            const isInternship = item.type === "internship";
            return (
              <li key={item.title} className={`relative md:w-[calc(50%-2.5rem)] ${index % 2 ? "md:ml-auto" : ""}`}>
                <span
                  className={`scroll-pop absolute -left-[46px] top-6 h-6 w-6 rounded-full border-[3px] border-current ${index % 2 ? "md:-left-[52px]" : "md:left-auto md:-right-[52px]"} ${
                    isInternship ? "bg-cyan" : "bg-yellow"
                  }`}
                  aria-hidden
                />
                <article
                  className={`${index % 2 ? "scroll-in" : "scroll-in-left"} panel relative overflow-visible bg-paper p-6 pt-8 text-ink dark:bg-ink dark:text-paper`}
                >
                  {/* bande de couleur : jaune = réalisation, cyan = stage */}
                  <span className={`absolute inset-x-0 top-0 h-2.5 ${isInternship ? "bg-cyan" : "bg-yellow"}`} aria-hidden />
                  {!isInternship && <Burst label="POW!" />}

                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`${isInternship ? "bg-cyan" : "bg-yellow"} rounded px-2 py-1 font-display text-xs tracking-wide text-ink`}>
                      {isInternship ? t.experience.tagInternship : t.experience.tagAchievement}
                    </span>
                    <span className="font-mono text-xs opacity-70">{item.date}</span>
                    <span className="ml-auto mr-12 font-mono text-xs opacity-40 sm:mr-14">#{String(items.length - index).padStart(2, "0")}</span>
                  </div>

                  <div className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
                    <OrgLogo orgKey={item.orgKey} size={56} className="-rotate-6" />
                    <div>
                      <h3 className="font-display text-2xl font-bold">{item.title}</h3>
                      <p className="mt-1 text-sm font-medium text-pink">{item.org}</p>
                    </div>
                  </div>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed opacity-80">{item.text}</p>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
