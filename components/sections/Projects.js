"use client";

import { profile } from "@/data/profile";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCarousel from "@/components/ui/ProjectCarousel";
import { TbArrowUpRight, TbLock } from "react-icons/tb";

const covers = {
  pink: { bg: "bg-pink", sfx: "text-yellow", num: "text-pink" },
  cyan: { bg: "bg-cyan", sfx: "text-pink", num: "text-cyan" },
  yellow: { bg: "bg-yellow", sfx: "text-cyan", num: "text-yellow" },
};

const tilts = ["-rotate-1", "rotate-1", "-rotate-[0.5deg]"];

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projets" className="relative px-6 py-24">
      <div className="relative mx-auto max-w-5xl">
        <SectionHeading caption={t.projects.caption} eyebrow={t.projects.eyebrow} title={t.projects.title} />

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          {t.projects.items.map((project, index) => {
            const meta = profile.projects[index];
            const cover = covers[meta.color];

            return (
              <div key={meta.id} className={`h-full ${index % 2 ? "scroll-in" : "scroll-in-left"}`}>
                <article
                  className={`group panel relative flex h-full flex-col bg-paper text-ink dark:bg-ink dark:text-paper ${tilts[index % tilts.length]} transition-transform duration-200 hover:-translate-y-1 hover:rotate-0`}
                >
                  <ProjectCarousel meta={meta} title={project.title} labels={t.projects} bg={cover.bg} />

                  {/* surimpressions façon BD */}
                  <span className="caption-box pointer-events-none absolute left-3 top-3 z-10">{project.year}</span>
                  <span className={`sfx pointer-events-none absolute -right-3 -top-6 z-10 text-5xl ${cover.sfx}`} aria-hidden>
                    {project.sfx}
                  </span>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-baseline gap-3">
                      <span className={`misprint font-display text-3xl leading-none ${cover.num}`} aria-hidden>
                        #{String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-2xl font-bold">{project.title}</h3>
                    </div>
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
                          rel="noopener noreferrer"
                          className="btn-pop panel-solid inline-flex items-center gap-1 bg-cyan px-3 py-1.5 font-display text-sm tracking-wide text-ink"
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
