"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { profile } from "@/data/profile";
import { TbRosetteDiscountCheck } from "react-icons/tb";

// Badges de certification qui descendent doucement, comme des flocons, derrière la Formation.
// Positions fixes (même rendu serveur/client) ; animation en pause quand la section est hors écran.
const FLAKES = [
  { left: "4%", size: 34, dur: 16, delay: -2, sway: "50px", spin: "260deg", o: 0.5 },
  { left: "14%", size: 24, dur: 22, delay: -11, sway: "-30px", spin: "-200deg", o: 0.35 },
  { left: "27%", size: 30, dur: 19, delay: -6, sway: "40px", spin: "320deg", o: 0.4 },
  { left: "41%", size: 22, dur: 25, delay: -15, sway: "-45px", spin: "-280deg", o: 0.3 },
  { left: "56%", size: 36, dur: 18, delay: -9, sway: "35px", spin: "240deg", o: 0.45 },
  { left: "68%", size: 26, dur: 21, delay: -3, sway: "-40px", spin: "-320deg", o: 0.35 },
  { left: "81%", size: 32, dur: 17, delay: -13, sway: "45px", spin: "300deg", o: 0.45 },
  { left: "92%", size: 24, dur: 24, delay: -7, sway: "-35px", spin: "-240deg", o: 0.3 },
];

export default function BadgeSnow() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const list = profile.certifications || [];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!list.length) return null;
  return (
    <div ref={ref} className={`badge-snow pointer-events-none absolute inset-0 ${visible ? "" : "badge-snow-paused"}`} aria-hidden>
      {FLAKES.map((f, i) => {
        const c = list[i % list.length];
        return (
          <span
            key={i}
            className="badge-flake"
            style={{ left: f.left, width: f.size, height: f.size, opacity: f.o, animationDuration: `${f.dur}s`, animationDelay: `${f.delay}s`, "--sway": f.sway, "--spin": f.spin }}
          >
            {c.kind === "badge" ? (
              <Image src={c.image} alt="" width={f.size} height={f.size} className="h-full w-full rounded-full" />
            ) : (
              <span className="grid h-full w-full place-items-center rounded-full bg-cyan text-ink">
                <TbRosetteDiscountCheck size={f.size * 0.6} />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
