"use client";

import { useRef, useState } from "react";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

// Livre de BD : une page par élément, qui se tourne en 3D comme une vraie page
// (charnière à gauche). Boutons, flèches du clavier et glissement du doigt.
// Les pages sont empilées dans la même cellule de grille : le livre prend
// la hauteur de la page la plus haute, sans hauteur fixe.
export default function ComicBook({ pages, labels }) {
  const [current, setCurrent] = useState(0);
  const count = pages.length;
  const touch = useRef(null);

  const go = (i) => setCurrent(Math.max(0, Math.min(count - 1, i)));

  function onKeyDown(e) {
    if (e.key === "ArrowRight") go(current + 1);
    if (e.key === "ArrowLeft") go(current - 1);
  }

  return (
    <div
      className="comic-book relative mx-auto mt-12 max-w-3xl"
      role="region"
      aria-roledescription={labels.book}
      aria-label={labels.title}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 40) go(current + (dx < 0 ? 1 : -1));
        touch.current = null;
      }}
    >
      <div className="relative">
      {/* tranche des pages restantes, sous le livre */}
      <div className="absolute inset-0 translate-x-3 translate-y-3 border-[3px] border-ink bg-paper dark:border-paper dark:bg-ink" aria-hidden />
      <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 border-[3px] border-ink bg-paper dark:border-paper dark:bg-ink" aria-hidden />

      <div className="comic-stage relative grid">
        {pages.map((page, i) => {
          const turned = i < current;
          return (
            <div
              key={i}
              className={`comic-page col-start-1 row-start-1 ${turned ? "is-turned" : ""}`}
              style={{ zIndex: turned ? i : count - i }}
              aria-hidden={i !== current}
              inert={i !== current ? true : undefined}
            >
              <div className="comic-front relative h-full border-[3px] border-ink bg-paper text-ink dark:border-paper dark:bg-ink dark:text-paper">
                <span className="comic-gutter pointer-events-none absolute inset-y-0 left-0 w-6" aria-hidden />
                {page}
                <span className="absolute bottom-3 right-4 font-mono text-xs opacity-50">
                  {labels.page} {i + 1} / {count}
                </span>
                {i < count - 1 && <span className="comic-curl pointer-events-none absolute bottom-0 right-0" aria-hidden />}
              </div>
              <div className="comic-back absolute inset-0 border-[3px] border-ink bg-paper dark:border-paper dark:bg-ink" aria-hidden>
                <div className="halftone absolute inset-0 text-pink !opacity-20" />
              </div>
            </div>
          );
        })}
      </div>
      </div>

      {/* commandes */}
      <div className="relative mt-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => go(current - 1)}
          disabled={current === 0}
          className="btn-pop panel-solid flex items-center gap-1 bg-paper px-4 py-2 font-display text-sm text-ink disabled:opacity-40"
        >
          <TbChevronLeft aria-hidden /> {labels.prev}
        </button>
        <div className="flex gap-2" role="tablist" aria-label={labels.title}>
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-label={`${labels.page} ${i + 1}`}
              onClick={() => go(i)}
              className={`h-3 rounded-full border-2 border-current transition-all ${i === current ? "w-8 bg-pink" : "w-3 bg-transparent"}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(current + 1)}
          disabled={current === count - 1}
          className="btn-pop panel-solid flex items-center gap-1 bg-yellow px-4 py-2 font-display text-sm text-ink disabled:opacity-40"
        >
          {labels.next} <TbChevronRight aria-hidden />
        </button>
      </div>
      <p className="mt-3 text-center font-mono text-xs opacity-60" aria-live="polite">
        {labels.hint}
      </p>
    </div>
  );
}
