"use client";

import { useEffect, useState } from "react";

export function useCountUp(target, isActive, duration = 1500) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    let start = null;

    function step(timestamp) {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // "easeOutQuad" : démarre vite, ralentit en approchant de la cible
      const eased = 1 - (1 - progress) * (1 - progress);
      setValue(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }, [isActive, target, duration]);

  return value;
}