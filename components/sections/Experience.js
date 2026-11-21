"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeading from "@/components/ui/SectionHeading";
import OrgLogo from "@/components/ui/OrgLogo";
import ComicBook from "@/components/ui/ComicBook";
import Link from "next/link";

const DETAILS = {
  worlddatalab: "/projets/hackathon-wdl-chomage",
  blo: "/parcours/blo-sarl",
  esatic: "/parcours/ivoire-culture-connect",
  ebenyx: "/parcours/ebenyx",
};

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

        {/* le parcours en livre de BD : une page par expérience, qui se tourne */}
        <ComicBook
          labels={t.experience.book}
          pages={items.map((item, index) => {
            const isInternship = item.type === "internship";
            return (
              <article key={item.title} className="relative flex h-full flex-col p-6 pl-10 pt-9 sm:p-10 sm:pl-14">
                {/* bande de couleur : jaune = réalisation, cyan = stage */}
                <span className={`absolute inset-x-0 top-0 h-3 ${isInternship ? "bg-cyan" : "bg-yellow"}`} aria-hidden />
                {!isInternship && <Burst label="POW!" />}

                <div className="flex flex-wrap items-center gap-3">
                  <span className="caption-box">{t.experience.chapter} {index + 1}</span>
                  <span className={`${isInternship ? "bg-cyan" : "bg-yellow"} rounded px-2 py-1 font-display text-xs tracking-wide text-ink`}>
                    {isInternship ? t.experience.tagInternship : t.experience.tagAchievement}
                  </span>
                  <span className="font-mono text-xs opacity-70">{item.date}</span>
                </div>

                <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <OrgLogo orgKey={item.orgKey} size={64} className="-rotate-6" />
                  <div>
                    <h3 className="misprint font-display text-3xl font-bold leading-tight sm:text-4xl">{item.title}</h3>
                    <p className="mt-1 text-sm font-medium text-pink">{item.org}</p>
                  </div>
                </div>

                {/* bulle de BD pour le récit */}
                <div className="comic-bubble relative mt-6 border-[3px] border-current bg-paper p-5 text-ink sm:ml-6">
                  <p className="text-sm leading-relaxed sm:text-base">{item.text}</p>
                </div>

                {DETAILS[item.orgKey] && (
                  <Link
                    href={DETAILS[item.orgKey]}
                    className="btn-pop panel-solid mt-6 mb-6 inline-flex w-fit items-center gap-1 bg-yellow px-4 py-2 font-display text-sm tracking-wide text-ink sm:ml-6"
                  >
                    {t.experience.more} →
                  </Link>
                )}
              </article>
            );
          })}
        />
      </div>
    </section>
  );
}
