"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { profile } from "@/data/profile";
import { playTvSound, soundPref, startMusic } from "@/lib/sound";

const NOISE_DURATION = 700; // neige avant que l'image apparaisse
const AUTO_EXIT = 6500; // sans clic, l'intro se ferme seule
const EXIT_DURATION = 650; // plongée dans l'écran

// Télé cathodique rétro dessinée en CSS (aucune image sauf le personnage)
function RetroTV({ phase }) {
  return (
    <div className={`tv relative w-[min(70vw,340px)] ${phase === "exit" ? "tv-zoom" : ""}`} aria-hidden>
      {/* antennes */}
      <div className="absolute -top-14 left-1/2 h-16 w-1 origin-bottom -translate-x-6 -rotate-[28deg] rounded-full bg-paper" />
      <div className="absolute -top-14 left-1/2 h-16 w-1 origin-bottom translate-x-6 rotate-[28deg] rounded-full bg-paper" />
      <div className="absolute -top-16 left-1/2 h-3 w-3 -translate-x-[2.15rem] rounded-full bg-pink" />
      <div className="absolute -top-16 left-1/2 h-3 w-3 translate-x-[1.65rem] rounded-full bg-cyan" />

      {/* caisse */}
      <div className="relative aspect-[4/3.3] rounded-[28px] border-[5px] border-ink bg-yellow shadow-[8px_8px_0_0_var(--color-pink)]">
        <div className="halftone absolute inset-0 rounded-[22px] text-ink !opacity-15" />

        {/* écran */}
        <div className="absolute bottom-[11%] left-[6%] right-[26%] top-[9%] overflow-hidden rounded-[26px] border-[5px] border-ink bg-ink">
          <div className={`tv-screen absolute inset-0 ${phase === "noise" ? "" : "tv-on"}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-pink via-[#7a2bd6] to-cyan" />
            <div className="halftone absolute inset-0 text-ink !opacity-30" />
            {profile.avatar && (
              <Image src={profile.avatar} alt="" fill priority sizes="260px" className="object-cover object-top" />
            )}
          </div>
          {/* neige */}
          <div className={`tv-noise absolute inset-0 ${phase === "noise" ? "opacity-100" : "opacity-0"}`} />
          {/* lignes de balayage + reflet bombé */}
          <div className="tv-scanlines pointer-events-none absolute inset-0" />
          <div className="pointer-events-none absolute inset-0 rounded-[20px] bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.28),transparent_45%),radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55))]" />
        </div>

        {/* panneau de commande */}
        <div className="absolute bottom-[11%] right-[5%] top-[9%] flex w-[15%] flex-col items-center gap-3 pt-1">
          <span className="aspect-square w-full rounded-full border-[4px] border-ink bg-pink" />
          <span className="aspect-square w-[80%] rounded-full border-[4px] border-ink bg-cyan" />
          <div className="mt-auto flex w-full flex-col gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-1 w-full rounded-full bg-ink" />
            ))}
          </div>
        </div>
      </div>

      {/* pieds */}
      <div className="flex justify-between px-[18%]">
        <span className="h-5 w-4 -skew-x-12 border-x-[4px] border-b-[4px] border-ink bg-yellow" />
        <span className="h-5 w-4 skew-x-12 border-x-[4px] border-b-[4px] border-ink bg-yellow" />
      </div>
    </div>
  );
}

const SPARKS = [
  ["8%", "18%", 18, "0s"], ["88%", "26%", 14, "-1s"], ["14%", "72%", 22, "-0.6s"],
  ["80%", "70%", 26, "-1.6s"], ["30%", "40%", 10, "-0.3s"], ["70%", "42%", 12, "-1.2s"],
];

function Sparkle({ x, y, size, delay }) {
  return (
    <svg viewBox="0 0 24 24" className="sparkle absolute text-yellow" style={{ left: x, top: y, width: size, height: size, animationDelay: delay }} aria-hidden>
      <path d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0Z" fill="currentColor" />
    </svg>
  );
}

export default function SplashScreen() {
  const { t } = useLanguage();
  const [phase, setPhase] = useState("noise"); // noise → on → exit → gone
  const done = useRef(false);

  const finish = useCallback((withSound = false) => {
    if (done.current) return;
    done.current = true;
    if (withSound) {
      playTvSound();
      if (soundPref()) setTimeout(startMusic, 350);
    }
    setPhase("exit");
    setTimeout(() => setPhase("gone"), EXIT_DURATION);
  }, []);

  useEffect(() => {
    const turnOn = setTimeout(() => setPhase((p) => (p === "noise" ? "on" : p)), NOISE_DURATION);
    const auto = setTimeout(() => finish(false), AUTO_EXIT);
    const onKey = (e) => (e.key === "Escape" || e.key === "Enter") && finish(true);
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(turnOn);
      clearTimeout(auto);
      window.removeEventListener("keydown", onKey);
    };
  }, [finish]);

  if (phase === "gone") return null;

  return (
    <div
      className={`splash fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 text-paper transition-opacity ${
        phase === "exit" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${EXIT_DURATION}ms` }}
      onClick={() => finish(true)}
      role="presentation"
    >
      {/* anneaux concentriques façon générique de dessin animé (couleurs du site) */}
      <div className="splash-rings absolute inset-0" aria-hidden />
      <div className="film-grain pointer-events-none absolute inset-0" aria-hidden />
      {SPARKS.map(([x, y, size, delay]) => (
        <Sparkle key={x + y} x={x} y={y} size={size} delay={delay} />
      ))}

      <div className="relative flex flex-col items-center">
        {/* nom en arc */}
        <svg viewBox="0 0 1000 300" className="w-[min(94vw,700px)] overflow-visible" aria-label={profile.name}>
          <defs>
            <path id="arc" d="M 60 270 Q 500 20 940 270" />
          </defs>
          <text className="splash-title" textAnchor="middle">
            <textPath href="#arc" startOffset="50%">
              {profile.familyName.toUpperCase()}
            </textPath>
          </text>
        </svg>
        <p className="-mt-4 font-accent text-2xl text-yellow drop-shadow-[3px_3px_0_var(--color-ink)] sm:-mt-8 sm:text-4xl" aria-hidden>
          Zié Mohamed Allassane Junior
        </p>
        <p className="mt-1 font-accent text-xl italic tracking-wide text-paper drop-shadow-[2px_2px_0_var(--color-ink)] sm:text-2xl">
          {t.splash.present}
        </p>

        <div className="mt-16">
          <RetroTV phase={phase} />
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            finish(true);
          }}
          className="btn-pop panel-solid pulse-soft mt-6 rounded-full bg-yellow px-6 py-3 font-display text-base tracking-wide text-ink sm:text-lg"
        >
          ▶ {t.splash.enter}
        </button>
      </div>

      <span className="absolute bottom-4 left-5 font-display text-xs opacity-70">{t.splash.edition}</span>
      <span className="absolute bottom-4 right-5 font-display text-xs opacity-70">{t.splash.earth}</span>
    </div>
  );
}
