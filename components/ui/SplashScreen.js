"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { profile } from "@/data/profile";
import { SiPython, SiReact, SiDjango } from "react-icons/si";

function PortalO({ color = "bg-pink" }) {
  return (
    <span className="relative inline-block align-middle" style={{ width: "0.62em", height: "0.62em" }}>
      <span className={`absolute left-1/2 -translate-x-1/2 bottom-full w-[3px] ${color}`} style={{ height: "45vh" }} />
      <span className={`absolute left-1/2 -translate-x-1/2 top-full w-[3px] ${color}`} style={{ height: "45vh" }} />
      <span className="absolute inset-0 rounded-full border-[5px] border-current" />
    </span>
  );
}

// petit autocollant rond, incliné, avec une icône dedans
function Sticker({ Icon, color, className }) {
  return (
    <div className={`absolute panel-solid flex h-14 w-14 items-center justify-center rounded-full bg-paper dark:bg-ink ${className}`}>
      <Icon className={color} size={22} />
    </div>
  );
}

export default function SplashScreen() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(true);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const minDuration = 2600;

    function finish() {
      const elapsed = Date.now() - start;
      const wait = Math.max(minDuration - elapsed, 0);
      setTimeout(() => {
        setHiding(true);
        setTimeout(() => setVisible(false), 600);
      }, wait);
    }

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish);
      return () => window.removeEventListener("load", finish);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col justify-center bg-ink text-paper px-8 md:px-20 transition-opacity duration-600 overflow-hidden ${
        hiding ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="halftone text-pink absolute -top-24 -left-24 h-72 w-72 rounded-full" />
      <div className="halftone text-cyan absolute -bottom-24 -right-24 h-72 w-72 rounded-full" />

      {/* badge "univers", en haut à gauche, incliné comme un tampon */}
      <div className="panel-solid absolute top-8 left-8 -rotate-6 bg-yellow text-ink px-3 py-1 font-display text-xs tracking-wide">
        {t.splash.earth}
      </div>

      {/* badge rond en haut à droite */}
      <div className="absolute top-8 right-8 h-14 w-14 rounded-full border-2 border-current/40 flex items-center justify-center text-[10px] font-display leading-tight text-center opacity-70">
        2026
      </div>

      {/* stickers technos éparpillés */}
      <Sticker Icon={SiReact} color="text-cyan" className="top-1/3 left-6 rotate-[-8deg] hidden sm:flex" />
      <Sticker Icon={SiPython} color="text-yellow" className="top-1/4 right-16 rotate-[10deg] hidden md:flex" />
      <Sticker Icon={SiDjango} color="text-pink" className="bottom-1/4 left-16 rotate-[6deg] hidden lg:flex" />

      <p className="italic text-pink text-sm mb-1">{t.splash.welcome}</p>

      <h1 className="font-display font-bold leading-[0.85] text-6xl sm:text-7xl md:text-8xl">
        ZIÉ TRA
        <PortalO color="bg-pink" />
        RÉ
      </h1>

      <p className="mt-3 text-cyan font-display text-xl sm:text-2xl">
        {t.hero.role}
      </p>

      {/* bulle de dialogue façon BD */}
      <div className="panel-solid relative inline-block mt-6 max-w-xs bg-yellow text-ink px-4 py-3 font-display text-sm rotate-[-1deg]">
        {t.splash.speech}
      </div>

      <p className="mt-10 font-display text-xs tracking-widest opacity-60 uppercase">
        {t.splash.edition}
      </p>

      <div className="absolute bottom-8 right-8 text-right text-xs opacity-60">
        <p className="font-display">{profile.shortName}</p>
        <p>github.com/thegoat12-crypto</p>
      </div>

      <div className="absolute bottom-8 left-8 flex items-center gap-3 text-xs opacity-50">
        <div className="w-24 h-[3px] border border-current/30 overflow-hidden">
          <div className="h-full bg-pink animate-loading-bar" />
        </div>
        {t.loading}
      </div>
    </div>
  );
}