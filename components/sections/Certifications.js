"use client";

import Image from "next/image";
import { profile } from "@/data/profile";
import { useLanguage } from "@/contexts/LanguageContext";
import { TbRosetteDiscountCheck } from "react-icons/tb";

const COLORS = { pink: "bg-pink text-white", cyan: "bg-cyan text-ink", yellow: "bg-yellow text-ink" };

// Certifications en version discrète : un fin bandeau de badges qui défile sous la Formation.
// Chaque badge ouvre sa page de vérification ; le défilement s'arrête au survol.
export default function Certifications() {
  const { t } = useLanguage();
  const c = t.certifications;
  const list = profile.certifications;

  return (
    <section id="certifications" aria-label={c.title} className="section-alt overflow-x-clip px-6 pb-16">
      <div className="relative mx-auto max-w-5xl">
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest opacity-60">
          <TbRosetteDiscountCheck size={16} aria-hidden /> {c.eyebrow}
        </p>
        <div className="marquee-mask relative -mx-6 mt-4 overflow-hidden py-2">
          <div className="marquee-row flex w-max">
            {[0, 1].map((copy) => (
              <ul key={copy} className="marquee-forward flex shrink-0 gap-4 pr-4" aria-hidden={copy === 1 ? true : undefined}>
                {[...list, ...list].map((x, i) => (
                  <li key={`${x.id}-${i}`} className="shrink-0">
                    <a
                      href={x.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={copy === 1 || i >= list.length ? -1 : undefined}
                      title={`${x.issuer} — ${c.items[x.id]} (${x.kind === "badge" ? c.verify : c.view})`}
                      className="btn-pop panel-solid flex items-center gap-2 rounded-full bg-paper py-1 pl-1 pr-4 text-sm text-ink"
                    >
                      <span className={`grid h-8 w-8 place-items-center overflow-hidden rounded-full ${COLORS[x.color]}`}>
                        {x.kind === "badge" ? (
                          <Image src={x.image} alt="" width={32} height={32} className="h-8 w-8" />
                        ) : (
                          <TbRosetteDiscountCheck size={18} aria-hidden />
                        )}
                      </span>
                      <span className="font-display tracking-wide">{x.issuer}</span>
                      <span className="opacity-70">{c.items[x.id]}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
