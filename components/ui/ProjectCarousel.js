"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { mockups } from "@/components/ui/ProjectMockups";
import { useReducedMotion } from "@/lib/clientStores";

const INTERVAL = 3200;

// Diaporama d'un projet : vraies captures (meta.images) ou, à défaut, illustrations dessinées.
// Défile seul quand il est à l'écran, s'arrête au survol, au focus clavier
// et quand l'utilisateur a demandé moins d'animations.
export default function ProjectCarousel({ meta, title, labels, bg }) {
  const hasImages = meta.images?.length > 0;
  const slides = hasImages ? meta.images : mockups[meta.kind] ?? [];
  const count = slides.length;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const reducedMotion = useReducedMotion();
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !inView || reducedMotion || count < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL);
    return () => clearInterval(id);
  }, [paused, inView, reducedMotion, count]);

  const go = (step) => setIndex((i) => (i + step + count) % count);

  return (
    <div
      ref={ref}
      className={`relative h-56 overflow-hidden border-b-[3px] border-current sm:h-64 ${bg}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={title}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="flex h-full transition-transform duration-500"
        style={{ transform: `translateX(-${index * 100}%)`, transitionTimingFunction: "steps(5)" }}
      >
        {slides.map((Slide, i) => (
          <div
            key={i}
            className="relative h-full w-full shrink-0"
            role="group"
            aria-roledescription="slide"
            aria-label={`${labels.slide} ${i + 1} / ${count}`}
            aria-hidden={i !== index}
          >
            {hasImages ? (
              <Image src={Slide} alt={`${title} — ${labels.slide} ${i + 1}`} fill sizes="(min-width: 1024px) 480px, 90vw" className={meta.fit === "contain" ? `${meta.dark ? "bg-[#1f1f1f]" : "bg-white"} object-contain p-2` : "object-cover object-top"} />
            ) : (
              <Slide />
            )}
          </div>
        ))}
      </div>

      {!hasImages && (
        <span className="absolute bottom-2 right-2 rounded-sm bg-ink/70 px-1.5 font-mono text-[9px] uppercase tracking-wider text-paper">
          {labels.illustration}
        </span>
      )}

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={labels.prev}
            className="absolute left-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border-2 border-ink bg-paper text-ink opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
          >
            <TbChevronLeft aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={labels.next}
            className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border-2 border-ink bg-paper text-ink opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
          >
            <TbChevronRight aria-hidden />
          </button>
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${labels.slide} ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className={`h-2.5 rounded-full border-2 border-ink transition-all ${i === index ? "w-6 bg-yellow" : "w-2.5 bg-paper"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
