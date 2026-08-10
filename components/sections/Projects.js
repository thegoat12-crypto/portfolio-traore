"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "@/components/ui/Reveal";

const tilts = ["-rotate-1", "rotate-1", "-rotate-1"];

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projets" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm opacity-60">{t.projects.eyebrow}</p>
        <h2
          data-text={t.projects.title}
          className="glitch font-display font-bold text-4xl md:text-5xl mt-2"
        >
          {t.projects.title}
        </h2>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {t.projects.items.map((project, index) => (
            <Reveal key={project.title} delay={index * 100}>
              <div
                className={`panel p-6 bg-transparent ${tilts[index % tilts.length]} hover:rotate-0 transition-transform`}
              >
                <span className="inline-block bg-pink text-white text-xs font-bold px-2 py-1 rounded">
                  {project.year}
                </span>

                <h3 className="mt-4 font-display font-bold text-xl">
                  {project.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed opacity-70">
                  {project.text}
                </p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="text-xs border border-current/20 rounded-full px-2 py-1 opacity-60"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <a href={project.github} target="_blank" rel="noreferrer" className="mt-5 inline-block text-sm text-cyan border-b-2 border-cyan">
                  {t.projects.viewGithub} →
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}