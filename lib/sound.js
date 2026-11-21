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

// Bruit de télé qui s'allume : déclic + grésillement qui retombe (Web Audio, ~0,7 s)
export function playTvSound() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const len = Math.floor(ctx.sampleRate * 0.7);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      const t = i / ctx.sampleRate;
      const click = t < 0.012 ? Math.sin(t * 2 * Math.PI * 90) * (1 - t / 0.012) : 0;
      data[i] = click * 0.9 + (Math.random() * 2 - 1) * 0.35 * Math.exp(-t * 5);
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 3200;
    filter.Q.value = 0.6;
    const gain = ctx.createGain();
    gain.gain.value = 0.25;
    src.connect(filter).connect(gain).connect(ctx.destination);
    src.start();
    src.onended = () => ctx.close();
  } catch {}
}
