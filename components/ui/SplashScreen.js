"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { profile } from "@/data/profile";
import { SiPython, SiReact, SiDjango } from "react-icons/si";

const MIN_DURATION = 1800;
const FADE_DURATION = 450;

// Le « O » de TRAORÉ : la vraie lettre (même taille que les autres), suspendue
// à un fil de toile et qui se balance comme un pendule.
function PortalO() {
  return (
    <span className="swing relative inline-block text-pink" aria-hidden>
      <span
        className="absolute left-1/2 w-[3px] -translate-x-1/2 bg-pink"
        style={{ bottom: "calc(100% - 0.12em)", height: "60vh" }}
      />
      O
    </span>
  );
}

function Sticker({ Icon, color, className, rotate }) {
  return (
    <div
      className={`wobble absolute panel-solid flex h-14 w-14 items-center justify-center rounded-full bg-paper ${className}`}
      style={{ "--r": rotate }}
      aria-hidden
    >
      <Icon className={color} size={22} />
    </div>
  );
}

export default function SplashScreen() {
  const { t } = useLanguage();
  const [state, setState] = useState("shown"); // shown → hiding → gone
  const done = useRef(false);

  const finish = useCallback((delay = 0) => {
    if (done.current) return;
    done.current = true;
    setTimeout(() => {
      setState("hiding");
      setTimeout(() => setState("gone"), FADE_DURATION);
    }, delay);
  }, []);

  useEffect(() => {
    // affichée à chaque ouverture du site ; un clic ou Échap la passe
    const start = performance.now();
    const onLoad = () => finish(Math.max(MIN_DURATION - (performance.now() - start), 0));
    const onKey = (e) => e.key === "Escape" && finish();

    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad);
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("load", onLoad);
      window.removeEventListener("keydown", onKey);
    };
  }, [finish]);

  if (state === "gone") return null;

  return (
    <div
      className={`splash fixed inset-0 z-[100] flex flex-col justify-center overflow-hidden bg-ink px-8 text-paper transition-opacity md:px-20 ${
        state === "hiding" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE_DURATION}ms` }}
      onClick={() => finish()}
      role="presentation"
    >
      <div className="halftone absolute -left-24 -top-24 h-72 w-72 rounded-full text-pink" />
      <div className="halftone absolute -bottom-24 -right-24 h-72 w-72 rounded-full text-cyan" />

      <div className="panel-solid absolute left-8 top-8 -rotate-6 bg-yellow px-3 py-1 font-display text-xs tracking-wide text-ink">
        {t.splash.earth}
      </div>

      <div className="absolute right-8 top-8 flex h-14 w-14 items-center justify-center rounded-full border-2 border-current/40 font-display text-[10px] opacity-70">
        2026
      </div>

      <Sticker Icon={SiReact} color="text-cyan" className="left-6 top-1/3 hidden sm:flex" rotate="-8deg" />
      <Sticker Icon={SiPython} color="text-yellow" className="right-16 top-1/4 hidden md:flex" rotate="10deg" />
      <Sticker Icon={SiDjango} color="text-pink" className="bottom-[16%] right-[22%] hidden lg:flex" rotate="6deg" />

      <div className="relative">
        {/* l'encadré passe au-dessus du fil : le texte n'est plus coupé */}
        <p className="caption-box relative z-10 mb-3">{t.splash.welcome}</p>

        <p className="misprint font-display font-bold" aria-label={profile.name}>
          <span className="block text-7xl leading-[0.95] sm:text-8xl md:text-9xl" aria-hidden>
            TRA
            <PortalO />
            RÉ
          </span>
          <span className="mt-2 block text-2xl leading-tight text-paper sm:text-3xl md:text-4xl" aria-hidden>
            ZIÉ MOHAMED ALLASSANE JUNIOR
          </span>
        </p>

        <p className="mt-3 font-display text-xl text-cyan sm:text-2xl">{t.hero.role}</p>

        <div className="panel-solid relative mt-6 inline-block max-w-xs -rotate-1 bg-yellow px-4 py-3 font-display text-sm text-ink">
          {t.splash.speech}
          <span className="absolute -bottom-[14px] left-8 h-0 w-0 border-x-[10px] border-t-[12px] border-x-transparent border-t-ink" aria-hidden />
        </div>

        <p className="mt-10 font-display text-xs uppercase tracking-widest opacity-60">{t.splash.edition}</p>
      </div>

      <div className="absolute bottom-8 right-8 hidden text-right text-xs opacity-60 sm:block">
        <p className="font-display">{profile.name}</p>
        <p>{profile.contact.githubLabel}</p>
      </div>

      <div className="absolute bottom-8 left-8 flex flex-col gap-2 text-xs">
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
