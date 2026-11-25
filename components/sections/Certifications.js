"use client";

import Image from "next/image";
import { profile } from "@/data/profile";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeading from "@/components/ui/SectionHeading";
import { TbArrowUpRight, TbRosetteDiscountCheck } from "react-icons/tb";

const COLORS = { pink: "bg-pink text-white", cyan: "bg-cyan text-ink", yellow: "bg-yellow text-ink" };
const tilts = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

export default function Certifications() {
  const { t, lang } = useLanguage();
  const c = t.certifications;
  const list = profile.certifications;
  const date = (d) => new Date(`${d}T00:00`).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <section id="certifications" className="overflow-x-clip px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading caption={c.caption} eyebrow={c.eyebrow} title={c.title} />

        {/* bandeau de badges qui défile (comme les compétences) */}
        <div className="marquee-mask relative -mx-6 mt-10 overflow-hidden py-3">
          <div className="marquee-row flex w-max">
            {[0, 1].map((copy) => (
              <ul key={copy} className="marquee-forward flex shrink-0 gap-5 pr-5" aria-hidden={copy === 1 ? true : undefined}>
                {[...list, ...list].map((x, i) => (
                  <li key={`${x.id}-${i}`} className={`panel-solid flex shrink-0 items-center gap-3 rounded-full px-4 py-2 font-display text-sm ${COLORS[x.color]}`}>
                    <TbRosetteDiscountCheck size={20} aria-hidden />
                    {x.issuer} · {c.items[x.id]}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* les cartes, comme des cartes à collectionner */}
        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((x, i) => (
            <li key={x.id} className={i % 2 ? "scroll-in" : "scroll-in-left"}>
              <article className={`cert-card panel group relative flex h-full flex-col overflow-hidden bg-paper text-ink dark:bg-ink dark:text-paper ${tilts[i % tilts.length]}`}>
                <div className={`relative flex h-44 items-center justify-center overflow-hidden border-b-[3px] border-current ${x.kind === "badge" ? COLORS[x.color] : "bg-white"}`}>
                  {x.kind === "badge" && <div className="halftone absolute inset-0 text-ink !opacity-20" aria-hidden />}
                  <Image
                    src={x.image}
                    alt={`${x.issuer} — ${c.items[x.id]}`}
                    width={x.kind === "badge" ? 120 : 600}
                    height={x.kind === "badge" ? 120 : 370}
                    className={x.kind === "badge" ? "relative h-28 w-28 rounded-full drop-shadow-[4px_4px_0_var(--color-ink)]" : "h-full w-full object-cover object-left-top"}
                  />
                  <span className="cert-shine pointer-events-none absolute inset-0" aria-hidden />
                  <span className="cert-stamp absolute right-3 top-3 rounded-md border-[3px] border-pink bg-paper/90 px-2 py-0.5 font-display text-sm tracking-widest text-pink" aria-hidden>
                    {c.verified}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className={`w-fit rounded px-2 py-0.5 font-display text-xs tracking-wide ${COLORS[x.color]}`}>
                    {x.issuer} · {x.kind === "badge" ? c.badge : c.certificate}
                  </span>
                  <h3 className="mt-3 font-display text-xl leading-tight">{c.items[x.id]}</h3>
                  <p className="mt-1 font-mono text-xs opacity-60">{date(x.date)}</p>
                  <a
                    href={x.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pop panel-solid mt-auto inline-flex w-fit items-center gap-1 bg-yellow px-3 py-1.5 font-display text-sm text-ink"
                    style={{ marginTop: "1.25rem" }}
                  >
                    {x.kind === "badge" ? c.verify : c.view} <TbArrowUpRight aria-hidden />
                    <span className="sr-only">{t.meta.newTab}</span>
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
