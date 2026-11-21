"use client";

import { profile } from "@/data/profile";
import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { TbArrowUpRight, TbLock } from "react-icons/tb";

const covers = {
  pink: { bg: "bg-pink", dots: "text-ink", sfx: "text-yellow" },
  cyan: { bg: "bg-cyan", dots: "text-ink", sfx: "text-pink" },
  yellow: { bg: "bg-yellow", dots: "text-pink", sfx: "text-cyan" },
};

const tilts = ["-rotate-1", "rotate-1", "-rotate-[0.5deg]"];

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projets" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading caption={t.projects.caption} eyebrow={t.projects.eyebrow} title={t.projects.title} />

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {t.projects.items.map((project, index) => {
            const meta = profile.projects[index];
            const cover = covers[meta.color];

            return (
              <Reveal key={meta.id} delay={index * 100} className="h-full">
                <article className={`group panel flex h-full flex-col bg-transparent ${tilts[index % tilts.length]} transition-transform duration-200 hover:rotate-0`}>
                  {/* case illustrée : numéro d'épisode + onomatopée au survol */}
                  <div className={`relative h-40 overflow-hidden border-b-[3px] border-current ${cover.bg}`}>
                    <div className={`halftone-fade absolute inset-0 ${cover.dots} !opacity-50`} aria-hidden />
                    <span className="absolute bottom-2 left-4 font-display text-7xl leading-none text-ink/85" aria-hidden>
                      #{String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={`sfx absolute right-4 top-6 text-4xl ${cover.sfx}`} aria-hidden>
                      {project.sfx}
                    </span>
                    <span className="caption-box absolute left-3 top-3">{project.year}</span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-2xl font-bold">{project.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed opacity-75">{project.text}</p>

                    <ul className="mt-4 flex flex-wrap gap-2">
                      {meta.stack.map((tech) => (
                        <li key={tech} className="rounded-full border-2 border-current/15 px-2 py-0.5 font-mono text-xs">
                          {tech}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-6">
                      {meta.github ? (
                        <a
                          href={meta.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 border-b-2 border-cyan font-display text-sm tracking-wide text-cyan"
                        >
                          {t.projects.viewGithub} <TbArrowUpRight aria-hidden />
                          <span className="sr-only">{t.meta.newTab}</span>
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-mono text-xs opacity-50">
                          <TbLock aria-hidden /> {t.projects.noRepo}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
