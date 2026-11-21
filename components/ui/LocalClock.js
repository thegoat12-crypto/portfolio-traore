"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

function now(lang) {
  return new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: profile.timeZone,
  }).format(new Date());
}

// Heure locale d'Abidjan, mise à jour chaque minute. Vide côté serveur pour éviter
// un écart d'hydratation.
export default function LocalClock({ lang }) {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const tick = () => setTime(now(lang));
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 30_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [lang]);

  return (
    <time className="font-mono tabular-nums" suppressHydrationWarning>
      {time ?? "--:--"} <span className="opacity-60">GMT</span>
    </time>
  );
}
