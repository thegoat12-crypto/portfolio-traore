"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

// Fait apparaître son contenu quand il entre à l'écran (en 4 images, style « on twos »).
export default function Reveal({ children, className = "", delay = 0, as: Tag = "div" }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} ${className}`}
    >
      {children}
    </Tag>
  );
}
