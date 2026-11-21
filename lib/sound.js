"use client";

import { profile } from "@/data/profile";

// Son du site : musique de fond (activée par défaut, le visiteur peut la couper)
// et bruit de télé de l'intro (synthétisé, aucun fichier).
// Les navigateurs interdisent le son avant un premier clic/toucher : tout démarre
// donc au premier geste du visiteur (le bouton « Entrer » de l'intro).

const VOLUME = 0.3;
const listeners = new Set();
let audio = null;
let playing = false;
let fade = null;

export function soundPref() {
  try {
    return localStorage.getItem("sound") !== "off"; // activé par défaut
  } catch {
    return true;
  }
}

function setPref(on) {
  try {
    localStorage.setItem("sound", on ? "on" : "off");
  } catch {}
}

function emit() {
  listeners.forEach((cb) => cb(playing));
}

export function onSoundChange(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export const isPlaying = () => playing;

function fadeTo(target, then) {
  clearInterval(fade);
  const start = audio.volume;
  const t0 = performance.now();
  fade = setInterval(() => {
    const k = Math.min((performance.now() - t0) / 1200, 1);
    audio.volume = start + (target - start) * k;
    if (k === 1) {
      clearInterval(fade);
      then?.();
    }
  }, 40);
}

export function startMusic() {
  if (!profile.music || playing) return;
  if (!audio) {
    audio = new Audio(profile.music);
    audio.loop = true;
    audio.volume = 0;
    document.addEventListener("visibilitychange", () => {
      if (!playing) return;
      if (document.hidden) audio.pause();
      else audio.play().catch(() => {});
    });
  }
  audio
    .play()
    .then(() => {
      playing = true;
      emit();
      fadeTo(VOLUME);
    })
    .catch(() => {});
}

export function stopMusic() {
  if (!audio || !playing) return;
  playing = false;
  emit();
  fadeTo(0, () => audio.pause());
}

export function toggleMusic() {
  if (playing) {
    stopMusic();
    setPref(false);
  } else {
    setPref(true);
    startMusic();
  }
}

// Bruit de télé cathodique qui s'allume (Web Audio, ~1,3 s) :
// déclic du relais + « boum » grave de mise sous tension + neige qui retombe.
export function playTvSound() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    ctx.resume?.(); // iOS/Safari démarrent parfois le contexte en pause
    const sr = ctx.sampleRate;
    const len = Math.floor(sr * 1.3);
    const buf = ctx.createBuffer(1, len, sr);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      const t = i / sr;
      const relay = t < 0.02 ? (Math.random() * 2 - 1) * (1 - t / 0.02) : 0; // clac
      const thump = Math.sin(2 * Math.PI * 55 * t) * Math.exp(-t * 9) * (t > 0.03 ? 1 : 0); // boum
      const noise = t > 0.05 ? (Math.random() * 2 - 1) * (t < 0.15 ? (t - 0.05) / 0.1 : Math.exp(-(t - 0.15) * 2.6)) : 0;
      d[i] = relay * 0.9 + thump * 0.8 + noise * 0.55;
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const tone = ctx.createBiquadFilter(); // garde le grave du boum, adoucit les aigus
    tone.type = "lowpass";
    tone.frequency.value = 6500;
    const gain = ctx.createGain();
    gain.gain.value = 0.7;
    src.connect(tone).connect(gain).connect(ctx.destination);
    src.start();
    src.onended = () => ctx.close();
  } catch {}
}
