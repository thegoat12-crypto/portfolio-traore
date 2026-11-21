"use client";

import { useEffect, useRef, useState } from "react";
import { TbVolume, TbVolumeOff } from "react-icons/tb";
import { profile } from "@/data/profile";
import { useLanguage } from "@/contexts/LanguageContext";

const VOLUME = 0.32; // musique de fond : douce
const FADE_MS = 1200;

function readPref() {
  try {
    return localStorage.getItem("sound") === "on";
  } catch {
    return false;
  }
}

function savePref(on) {
  try {
    localStorage.setItem("sound", on ? "on" : "off");
  } catch {}
}

// Bouton son (bas droite). Coupé par défaut ; le fichier n'est chargé qu'à l'activation.
// Si le visiteur l'avait activé, la musique reprend à sa première interaction
// (les navigateurs interdisent la lecture automatique avec son).
export default function SoundToggle() {
  const { t } = useLanguage();
  const [on, setOn] = useState(false);
  const audioRef = useRef(null);
  const fadeRef = useRef(null);

  function getAudio() {
    if (!audioRef.current) {
      const a = new Audio(profile.music);
      a.loop = true;
      a.volume = 0;
      a.preload = "auto";
      audioRef.current = a;
    }
    return audioRef.current;
  }

  function fadeTo(target, then) {
    const a = getAudio();
    clearInterval(fadeRef.current);
    const start = a.volume;
    const t0 = performance.now();
    fadeRef.current = setInterval(() => {
      const k = Math.min((performance.now() - t0) / FADE_MS, 1);
      a.volume = start + (target - start) * k;
      if (k === 1) {
        clearInterval(fadeRef.current);
        then?.();
      }
    }, 40);
  }

  function play() {
    const a = getAudio();
    a.play()
      .then(() => {
        setOn(true);
        fadeTo(VOLUME);
      })
      .catch(() => setOn(false));
  }

  function stop() {
    setOn(false);
    fadeTo(0, () => audioRef.current?.pause());
  }

  function toggle() {
    if (on) {
      stop();
      savePref(false);
    } else {
      play();
      savePref(true);
    }
  }

  // préférence mémorisée : reprendre à la première interaction
  useEffect(() => {
    if (!profile.music || !readPref()) return;
    const resume = (e) => {
      if (e.target.closest?.("[data-sound-toggle]")) return; // le bouton gère lui-même
      play();
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
    };
    window.addEventListener("pointerdown", resume);
    window.addEventListener("keydown", resume);
    return () => {
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
    };
    // play est stable pour cet usage (lecture du même élément audio)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // couper le son quand l'onglet est caché, reprendre au retour
  useEffect(() => {
    const onVis = () => {
      const a = audioRef.current;
      if (!a || !on) return;
      if (document.hidden) a.pause();
      else a.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [on]);

  useEffect(() => () => {
    clearInterval(fadeRef.current);
    audioRef.current?.pause();
  }, []);

  if (!profile.music) return null;

  return (
    <button
      type="button"
      data-sound-toggle
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? t.meta.soundOff : t.meta.soundOn}
      title={on ? t.meta.soundOff : t.meta.soundOn}
      className="btn-pop panel-solid fixed bottom-5 right-5 z-[90] flex items-center gap-2 rounded-full bg-yellow px-3 py-2 font-display text-xs text-ink"
    >
      {on ? <TbVolume size={18} aria-hidden /> : <TbVolumeOff size={18} aria-hidden />}
      <span className="flex h-4 items-end gap-[3px]" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`eq-bar w-[3px] rounded-full bg-ink ${on ? "eq-on" : ""}`}
            style={{ animationDelay: `${i * -0.22}s` }}
          />
        ))}
      </span>
      <span className="hidden sm:inline">{on ? t.meta.soundLabelOn : t.meta.soundLabelOff}</span>
    </button>
  );
}
