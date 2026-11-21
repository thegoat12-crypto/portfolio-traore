"use client";

import { useEffect, useRef, useState } from "react";
import { GiSpiderAlt } from "react-icons/gi";
import { useFinePointer, useReducedMotion } from "@/lib/clientStores";

// Curseur araignée + petite toile au clic. Seulement avec une souris, et jamais
// si l'utilisateur a demandé moins d'animations. La position est écrite directement
// dans le style (pas de re-rendu React à chaque mouvement).
export default function CustomCursor() {
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();
  const enabled = finePointer && !reducedMotion;

  const cursorRef = useRef(null);
  const iconRef = useRef(null);
  const [webs, setWebs] = useState([]);
  const nextId = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("custom-cursor-active");

    function handleMove(e) {
      const el = cursorRef.current;
      if (!el) return;
      const onTarget = Boolean(e.target.closest?.("a, button, [role='button']"));
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%) scale(${onTarget ? 1.5 : 1})`;
      el.style.opacity = "1";
      iconRef.current?.classList.toggle("text-pink", onTarget);
      iconRef.current?.classList.toggle("text-cyan", !onTarget);
    }

    function handleLeave() {
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
    }

    function handleClick(e) {
      const id = nextId.current++;
      setWebs((current) => [...current, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setWebs((current) => current.filter((w) => w.id !== id)), 500);
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("pointerleave", handleLeave);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerleave", handleLeave);
      window.removeEventListener("click", handleClick);
      root.classList.remove("custom-cursor-active");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden>
      {webs.map((web) => (
        <svg
          key={web.id}
          viewBox="0 0 60 60"
          className="animate-web-burst pointer-events-none fixed z-[200] text-cyan"
          style={{ left: web.x - 30, top: web.y - 30, width: 60, height: 60 }}
        >
          <g stroke="currentColor" strokeWidth="1.5" fill="none">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <line
                key={deg}
                x1="30"
                y1="30"
                x2={30 + 26 * Math.cos((deg * Math.PI) / 180)}
                y2={30 + 26 * Math.sin((deg * Math.PI) / 180)}
              />
            ))}
            <circle cx="30" cy="30" r="10" />
            <circle cx="30" cy="30" r="20" />
          </g>
        </svg>
      ))}

      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[200] opacity-0 transition-[opacity] duration-150"
        style={{ transform: "translate(-100px, -100px)" }}
      >
        <span ref={iconRef} className="text-cyan block">
          <GiSpiderAlt size={22} />
        </span>
      </div>
    </div>
  );
}
