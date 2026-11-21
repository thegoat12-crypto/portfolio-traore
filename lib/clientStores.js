"use client";

import { useSyncExternalStore } from "react";

// Petits magasins d'état branchés sur le navigateur (localStorage, classes du <html>,
// media queries). useSyncExternalStore évite les setState dans des useEffect et
// renvoie une valeur stable côté serveur pour l'hydratation.

function safeGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // stockage indisponible (navigation privée) : on garde juste l'état en mémoire
  }
}

/* ---------- Langue ---------- */

const langListeners = new Set();
let langOverride = null;

function readLang() {
  if (langOverride) return langOverride;
  const saved = safeGet("lang");
  if (saved === "fr" || saved === "en") return saved;
  return navigator.language?.toLowerCase().startsWith("fr") ? "fr" : "en";
}

export function useLangValue() {
  return useSyncExternalStore(
    (cb) => {
      langListeners.add(cb);
      return () => langListeners.delete(cb);
    },
    readLang,
    () => "fr",
  );
}

export function setLang(next) {
  langOverride = next;
  safeSet("lang", next);
  document.documentElement.lang = next;
  langListeners.forEach((cb) => cb());
}

/* ---------- Thème ---------- */

function subscribeTheme(cb) {
  const observer = new MutationObserver(cb);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

export function useIsDark() {
  return useSyncExternalStore(
    subscribeTheme,
    () => document.documentElement.classList.contains("dark"),
    () => false,
  );
}

export function setDark(next) {
  document.documentElement.classList.toggle("dark", next);
  safeSet("theme", next ? "dark" : "light");
}

/* ---------- Media queries ---------- */

export function useMediaQuery(query, serverValue = false) {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

export const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");
export const useFinePointer = () => useMediaQuery("(pointer: fine)");
