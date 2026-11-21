"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { profile } from "@/data/profile";

const NOISE_DURATION = 700; // neige avant que l'image apparaisse
const MIN_DURATION = 2600; // durée minimale de l'intro
const EXIT_DURATION = 650; // plongée dans l'écran

// Le « O » de TRAORÉ : la vraie lettre, suspendue à un fil de toile, qui se balance.
function PortalO() {
  return (
    <span className="swing relative inline-block text-pink" aria-hidden>
      <span className="absolute left-1/2 w-[3px] -translate-x-1/2 bg-pink" style={{ bottom: "calc(100% - 0.12em)", height: "60vh" }} />
      O
    </span>
  );
}

// Télé cathodique rétro dessinée en CSS (aucune image sauf le personnage)
function RetroTV({ phase }) {
  return (
    <div className={`tv relative w-[min(72vw,360px)] ${phase === "exit" ? "tv-zoom" : ""}`} aria-hidden>
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

export default function SplashScreen() {
  const { t } = useLanguage();
  const [phase, setPhase] = useState("noise"); // noise → on → exit → gone
  const done = useRef(false);

  const finish = useCallback((delay = 0) => {
    if (done.current) return;
    done.current = true;
    setTimeout(() => {
      setPhase("exit");
      setTimeout(() => setPhase("gone"), EXIT_DURATION);
    }, delay);
  }, []);

  useEffect(() => {
    // affichée à chaque ouverture du site ; un clic ou Échap la passe
    const start = performance.now();
    const turnOn = setTimeout(() => setPhase((p) => (p === "noise" ? "on" : p)), NOISE_DURATION);
    const onLoad = () => finish(Math.max(MIN_DURATION - (performance.now() - start), 0));
    const onKey = (e) => e.key === "Escape" && finish();

    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad);
    window.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(turnOn);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("keydown", onKey);
    };
  }, [finish]);

  if (phase === "gone") return null;

  return (
    <div
      className={`splash fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-ink px-6 text-paper transition-opacity ${
        phase === "exit" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${EXIT_DURATION}ms` }}
      onClick={() => finish()}
      role="presentation"
    >
      <div className="halftone absolute -left-24 -top-24 h-72 w-72 rounded-full text-pink" />
      <div className="halftone absolute -bottom-24 -right-24 h-72 w-72 rounded-full text-cyan" />
      <div className="panel-solid absolute left-6 top-6 -rotate-6 bg-yellow px-3 py-1 font-display text-xs tracking-wide text-ink">
        {t.splash.earth}
      </div>

      <div className="relative flex w-full max-w-5xl flex-col items-center gap-10 md:flex-row md:justify-between md:gap-12">
        <RetroTV phase={phase} />

        <div className="relative text-center md:text-left">
          <p className="caption-box relative z-10 mb-3">{t.splash.welcome}</p>
          <p className="misprint font-display font-bold" aria-label={profile.name}>
            <span className="block text-6xl leading-[0.95] sm:text-7xl lg:text-8xl" aria-hidden>
              TRA
              <PortalO />
              RÉ
            </span>
            <span className="mt-2 block text-xl leading-tight sm:text-2xl lg:text-3xl" aria-hidden>
              ZIÉ MOHAMED ALLASSANE JUNIOR
            </span>
          </p>
          <p className="mt-3 font-display text-lg text-cyan sm:text-xl">{t.hero.role}</p>
          <div className="panel-solid relative mt-5 inline-block -rotate-1 bg-yellow px-4 py-2 font-display text-sm text-ink">
            {t.splash.speech}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 flex flex-col gap-2 text-xs">
        <div className="flex items-center gap-3 opacity-60">
          <div className="h-[4px] w-24 overflow-hidden border border-current/30">
            <div className="animate-loading-bar h-full bg-pink" />
          </div>
          {t.splash.loading}
        </div>
        <span className="opacity-40">{t.splash.skip}</span>
      </div>
    </div>
  );
}
