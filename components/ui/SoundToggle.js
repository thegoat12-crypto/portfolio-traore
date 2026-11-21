"use client";

import { useEffect, useState } from "react";
import { TbVolume, TbVolumeOff } from "react-icons/tb";
import { profile } from "@/data/profile";
import { useLanguage } from "@/contexts/LanguageContext";
import { isPlaying, onSoundChange, soundPref, startMusic, toggleMusic } from "@/lib/sound";

// Bouton son (bas droite). La musique est activée par défaut et démarre au premier
// geste du visiteur (le navigateur l'exige) ; un clic ici la coupe ou la relance.
export default function SoundToggle() {
  const { t } = useLanguage();
  const [on, setOn] = useState(false);

  useEffect(() => {
    const off = onSoundChange(setOn);
    setTimeout(() => setOn(isPlaying()), 0);
    // si l'intro a été passée sans clic : démarrer au premier geste sur la page
    const first = (e) => {
      if (e.target.closest?.("[data-sound-toggle]")) return;
      if (soundPref()) startMusic();
      window.removeEventListener("pointerdown", first);
      window.removeEventListener("keydown", first);
    };
    window.addEventListener("pointerdown", first);
    window.addEventListener("keydown", first);
    return () => {
      off();
      window.removeEventListener("pointerdown", first);
      window.removeEventListener("keydown", first);
    };
  }, []);

  if (!profile.music) return null;

  return (
    <button
      type="button"
      data-sound-toggle
      onClick={toggleMusic}
      aria-pressed={on}
      aria-label={on ? t.meta.soundOff : t.meta.soundOn}
      title={on ? t.meta.soundOff : t.meta.soundOn}
      className="btn-pop panel-solid fixed bottom-5 right-5 z-[90] flex items-center gap-2 rounded-full bg-yellow px-3 py-2 font-display text-xs text-ink"
    >
      {on ? <TbVolume size={18} aria-hidden /> : <TbVolumeOff size={18} aria-hidden />}
      <span className="flex h-4 items-end gap-[3px]" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`eq-bar w-[3px] rounded-full bg-ink ${on ? "eq-on" : ""}`} style={{ animationDelay: `${i * -0.22}s` }} />
        ))}
      </span>
      <span className="hidden sm:inline">{on ? t.meta.soundLabelOn : t.meta.soundLabelOff}</span>
    </button>
  );
}
