"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/clientStores";

const EVERY = 7000;
const BURST = 500;

// Titre h1 qui « glitche » par courtes salves. La classe .glitching n'est posée que
// 0,5 s toutes les 7 s, et jamais si l'onglet est caché ou si l'utilisateur a réduit
// les animations : entre deux salves, le navigateur n'a rien à calculer.
export default function GlitchTitle({ children, className, label }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    let off;
    const fire = () => {
      const el = ref.current;
      if (!el || document.hidden) return;
      el.classList.add("glitching");
      off = setTimeout(() => el.classList.remove("glitching"), BURST);
    };
    const first = setTimeout(fire, 1200);
    const id = setInterval(fire, EVERY);
    return () => {
      clearTimeout(first);
      clearTimeout(off);
      clearInterval(id);
    };
  }, [reducedMotion]);

  return (
    <h1 ref={ref} className={className} aria-label={label}>
      {children}
    </h1>
  );
}
