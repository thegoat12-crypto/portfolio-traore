"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { TbArrowLeft, TbBrandGithub } from "react-icons/tb";
import { useLanguage } from "@/contexts/LanguageContext";
import { caseStudies } from "@/data/caseStudies";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageToggle from "@/components/ui/LanguageToggle";

// Page « étude de cas » d'un projet, dans la direction artistique du site.
export default function CaseStudy({ slug }) {
  const { lang } = useLanguage();
  const fr = lang === "fr";

  // ouvrir la page en haut (l'en-tête collant empêche Next de le faire seul)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);
  const cs = caseStudies[slug];
  const c = cs[lang];

  return (
    <>
      <header className="sticky top-0 z-50 border-b-4 border-ink bg-paper py-3 shadow-[0_6px_0_0_var(--color-pink)] dark:border-paper dark:bg-ink">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-6">
          <Link href={cs.back} className="btn-pop panel-solid flex items-center gap-1 bg-yellow px-3 py-1.5 font-display text-sm text-ink">
            <TbArrowLeft aria-hidden /> {c.back}
          </Link>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main id="contenu" className="overflow-x-clip px-6 pb-24">
        <article className="mx-auto max-w-4xl">
          {/* en-tête */}
          <div className="pt-14">
            <span className="caption-box">{c.caption}</span>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest opacity-70">{c.event}</p>
            <h1 className="misprint mt-3 font-display text-4xl font-bold leading-tight md:text-6xl">{c.title}</h1>
            <p className="mt-3 font-display text-lg text-pink md:text-xl">{c.subtitle}</p>
          </div>

          {/* chiffre clé + fiche */}
          <div className={`mt-10 grid gap-6 ${c.keyFigure ? "md:grid-cols-[1fr_1.4fr]" : ""}`}>
            {c.keyFigure && (
              <div className="panel-solid relative -rotate-1 bg-yellow p-6 text-ink">
                <div className="halftone absolute inset-0 text-pink !opacity-20" aria-hidden />
                <p className="misprint relative font-display text-5xl leading-none md:text-6xl">{c.keyFigure}</p>
                <p className="relative mt-2 font-display text-lg">{c.keyFigureLabel}</p>
              </div>
            )}
            <dl className="panel grid gap-3 p-6">
              {c.facts.map((f) => (
                <div key={f.label}>
                  <dt className="font-mono text-xs uppercase tracking-wider opacity-60">{f.label}</dt>
                  <dd className="mt-0.5 font-medium">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* contexte, données, méthode */}
          {c.sections.map((s) => (
            <section key={s.title} className="mt-16">
              <h2 className="misprint font-display text-3xl font-bold md:text-4xl">{s.title}</h2>
              {s.body?.map((p) => (
                <p key={p.slice(0, 20)} className="mt-4 max-w-3xl leading-relaxed opacity-85">
                  {p}
                </p>
              ))}
              {s.steps && (
                <ol className="mt-6 grid gap-4 sm:grid-cols-2">
                  {s.steps.map((st, i) => (
                    <li key={st.k} className="panel relative p-5">
                      <span className="absolute -left-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-ink bg-pink font-display text-white">
                        {i + 1}
                      </span>
                      <p className="font-display text-xl">{st.k}</p>
                      <p className="mt-1 text-sm leading-relaxed opacity-80">{st.v}</p>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          ))}

          {/* résultats avec les graphiques */}
          {cs.figures && (
          <section className="mt-16">
            <h2 className="misprint font-display text-3xl font-bold md:text-4xl">{c.resultsTitle ?? (fr ? "En images" : "In pictures")}</h2>
            <div className="mt-8 space-y-12">
              {cs.figures.map((f, i) => (
                <figure key={f.src} className={i % 2 ? "rotate-[0.4deg]" : "-rotate-[0.4deg]"}>
                  <div className="panel-solid overflow-hidden bg-white p-2">
                    <Image src={f.src} alt={c.figureCaptions[i]} width={f.w} height={f.h} sizes="(min-width: 900px) 860px, 95vw" className="h-auto w-full" />
                  </div>
                  <figcaption className="mt-4 flex gap-3 text-sm leading-relaxed md:text-base">
                    <span className="caption-box h-fit shrink-0">
                      {c.figureLabel} {i + 1}
                    </span>
                    <span className="opacity-85">{c.figureCaptions[i]}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
          )}

          {/* recommandations */}
          {c.recos && (
          <section className="mt-16">
            <h2 className="misprint font-display text-3xl font-bold md:text-4xl">{c.recoTitle}</h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {c.recos.map((r, i) => (
                <li key={r.k} className={`panel-solid p-5 text-ink ${["bg-cyan", "bg-yellow", "bg-paper"][i]}`}>
                  <p className="font-display text-xl">{r.k}</p>
                  <p className="mt-1 text-sm leading-relaxed">{r.v}</p>
                </li>
              ))}
            </ul>
          </section>
          )}

          {/* conclusion + apprentissages */}
          <section className={`mt-16 grid gap-6 ${c.conclusion ? "md:grid-cols-2" : ""}`}>
            {c.conclusion && (
              <div className="panel-solid bg-ink p-6 text-paper dark:bg-paper dark:text-ink">
                <h2 className="font-display text-2xl text-yellow dark:text-pink">{c.conclusionTitle}</h2>
                <p className="mt-3 leading-relaxed">{c.conclusion}</p>
              </div>
            )}
            <div className="panel p-6">
              <h2 className="font-display text-2xl">{c.learnedTitle}</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed opacity-85">
                {c.learned.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
          </section>

          <div className="mt-14 flex flex-wrap gap-4">
            {cs.github && (
              <a href={cs.github} target="_blank" rel="noopener noreferrer" className="btn-pop panel-solid flex items-center gap-2 bg-cyan px-6 py-3 font-display text-ink">
                <TbBrandGithub aria-hidden /> {c.code}
              </a>
            )}
            <Link href={cs.back} className="btn-pop panel-solid flex items-center gap-2 bg-paper px-6 py-3 font-display text-ink">
              <TbArrowLeft aria-hidden /> {c.back}
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
