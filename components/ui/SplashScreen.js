"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { profile } from "@/data/profile";
import { playTvSound, soundPref, startMusic } from "@/lib/sound";

const AUTO_ON = 2600; // sans clic, la télé s'allume seule (en silence)
const AUTO_EXIT = 7000; // puis l'intro se ferme seule
const NOISE_MS = 900; // neige après l'allumage
const SHOW_MS = 1300; // le personnage à l'écran avant la plongée
const EXIT_MS = 650;

// Télé cathodique réaliste : boîtier plastique sombre, écran bombé en verre,
// boutons rotatifs, grille de haut-parleur, antennes métalliques.
function RealTV({ phase }) {
  const off = phase === "off";
  return (
    <div className={`tv relative w-[min(78vw,400px)] ${phase === "exit" ? "tv-zoom" : ""}`} aria-hidden>
      {/* antennes télescopiques */}
      <div className="absolute -top-[4.6rem] left-1/2 h-20 w-[3px] origin-bottom -translate-x-8 -rotate-[30deg] rounded-full bg-gradient-to-r from-[#8d8f96] via-[#e9eaee] to-[#6d6f76]" />
      <div className="absolute -top-[4.6rem] left-1/2 h-20 w-[3px] origin-bottom translate-x-8 rotate-[26deg] rounded-full bg-gradient-to-r from-[#8d8f96] via-[#e9eaee] to-[#6d6f76]" />
      <div className="absolute -top-3 left-1/2 h-4 w-14 -translate-x-1/2 rounded-t-full bg-gradient-to-b from-[#3a3b41] to-[#1b1c20]" />

      {/* boîtier */}
      <div className="tv-body relative aspect-[4/3.15] rounded-[22px] p-[5%]">
        <div className="flex h-full gap-[4%]">
          {/* écran : cadre intérieur + verre bombé */}
          <div className="tv-bezel relative flex-1 rounded-[18px] p-[5%]">
            <div className="tv-glass relative h-full w-full overflow-hidden">
              <div className={`tv-screen absolute inset-0 ${phase === "on" || phase === "exit" ? "tv-on" : ""}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-pink via-[#7a2bd6] to-cyan" />
                <div className="halftone absolute inset-0 text-ink !opacity-25" />
                {profile.avatar && <Image src={profile.avatar} alt="" fill priority sizes="300px" className="object-cover object-top" />}
              </div>
              <div className={`tv-noise absolute inset-0 ${phase === "noise" ? "opacity-100" : "opacity-0"}`} />
              <div className="tv-scanlines pointer-events-none absolute inset-0" />
              <div className="tv-reflection pointer-events-none absolute inset-0" />
              {off && <div className="tv-off-dot absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full" />}
            </div>
          </div>

          {/* panneau de commande */}
          <div className="flex w-[19%] flex-col items-center gap-[8%] py-[4%]">
            <span className="tv-knob aspect-square w-[86%] rounded-full" />
            <span className="tv-knob aspect-square w-[70%] rounded-full" />
            <div className="tv-grille mt-auto aspect-[3/4] w-full rounded-md" />
            <div className="flex w-full items-center justify-between px-[8%]">
              <span className={`h-2 w-2 rounded-full ${off ? "bg-[#ff3b30] shadow-[0_0_6px_#ff3b30]" : "bg-[#35e06b] shadow-[0_0_8px_#35e06b]"}`} />
              <span className="h-2 w-5 rounded-sm bg-[#111214] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]" />
            </div>
          </div>
        </div>
      </div>

      {/* pieds */}
      <div className="flex justify-between px-[14%]">
        <span className="h-4 w-10 rounded-b-md bg-gradient-to-b from-[#1b1c20] to-[#0b0b0d]" />
        <span className="h-4 w-10 rounded-b-md bg-gradient-to-b from-[#1b1c20] to-[#0b0b0d]" />
      </div>
    </div>
  );
}

export default function SplashScreen() {
  const { t } = useLanguage();
  const [phase, setPhase] = useState("off"); // off → noise → on → exit → gone
  const phaseRef = useRef("off");
  const timers = useRef([]);
  const done = useRef(false);

  const go = useCallback((p) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));

  const exit = useCallback(
    (withMusic) => {
      if (done.current) return;
      done.current = true;
      if (withMusic && soundPref()) startMusic();
      go("exit");
      later(() => go("gone"), EXIT_MS);
    },
    [go],
  );

  // allume la télé ; avec le son si c'est un clic (geste exigé par le navigateur)
  const turnOn = useCallback(
    (withSound) => {
      if (phaseRef.current !== "off") return false;
      if (withSound) playTvSound();
      go("noise");
      later(() => go("on"), NOISE_MS);
      return true;
    },
    [go],
  );

  const enter = useCallback(() => {
    if (done.current) return;
    if (turnOn(true)) {
      later(() => exit(true), NOISE_MS + SHOW_MS);
    } else {
      playTvSound();
      exit(true);
    }
  }, [turnOn, exit]);

  useEffect(() => {
    const list = timers.current;
    list.push(setTimeout(() => turnOn(false), AUTO_ON));
    list.push(setTimeout(() => exit(false), AUTO_EXIT));
    const onKey = (e) => {
      if (e.key === "Enter" || e.key === " ") enter();
      if (e.key === "Escape") exit(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      list.forEach(clearTimeout);
      window.removeEventListener("keydown", onKey);
    };
  }, [turnOn, exit, enter]);

  if (phase === "gone") return null;

  return (
    <div
      className={`splash fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-ink px-4 text-paper transition-opacity ${
        phase === "exit" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${EXIT_MS}ms` }}
      onClick={enter}
      role="presentation"
    >
      {/* fond Spider-Verse : anneaux sombres, trame de points, halos rose et cyan */}
      <div className="splash-rings absolute inset-0" aria-hidden />
      <div className="halftone absolute -left-20 top-10 h-80 w-80 rounded-full text-pink !opacity-30" aria-hidden />
      <div className="halftone absolute -right-16 bottom-6 h-80 w-80 rounded-full text-cyan !opacity-30" aria-hidden />
      <div className="film-grain pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative flex flex-col items-center text-center">
        <span className="caption-box">{t.splash.earth}</span>
        <p className="misprint mt-4 font-display text-6xl font-bold leading-none sm:text-8xl" aria-label={profile.name}>
          <span aria-hidden>{profile.familyName.toUpperCase()}</span>
        </p>
        <p className="misprint mt-2 font-display text-xl text-pink sm:text-3xl" aria-hidden>
          {profile.givenNames.toUpperCase()}
        </p>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.35em] text-paper/80 sm:text-sm">{t.splash.present}</p>

        <div className="mt-20">
          <RealTV phase={phase} />
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            enter();
          }}
          className="btn-pop panel-solid mt-7 rounded-full bg-yellow px-6 py-3 font-display text-base tracking-wide text-ink sm:text-lg"
        >
          ▶ {phase === "off" ? t.splash.turnOn : t.splash.enter}
        </button>
      </div>

      <span className="absolute bottom-4 left-5 font-mono text-[10px] uppercase tracking-widest opacity-60">{t.splash.edition}</span>
      <span className="absolute bottom-4 right-5 hidden font-mono text-[10px] uppercase tracking-widest opacity-60 sm:block">{t.splash.skip}</span>
    </div>
  );
}
