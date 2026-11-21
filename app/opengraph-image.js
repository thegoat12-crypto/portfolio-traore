import { ImageResponse } from "next/og";

// Image d'aperçu affichée quand le lien est partagé (LinkedIn, WhatsApp, X…).
export const alt = "Traoré Zié Mohamed Allassane Junior — Data / IA & développeur fullstack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ink = "#0a0a12";
const paper = "#f5f3ec";
const pink = "#ff2e88";
const cyan = "#00c2d1";
const yellow = "#ffd400";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          background: ink,
          color: paper,
          backgroundImage: `radial-gradient(circle, rgba(255,46,136,0.35) 2px, transparent 2.5px)`,
          backgroundSize: "22px 22px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            background: yellow,
            color: ink,
            border: `4px solid ${ink}`,
            padding: "6px 16px",
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: 4,
            transform: "rotate(-3deg)",
          }}
        >
          PORTFOLIO 2026
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 30,
            fontSize: 130,
            fontWeight: 900,
            lineHeight: 1,
            textShadow: `-5px 3px 0 ${cyan}, 5px -3px 0 ${pink}`,
          }}
        >
          TRAORÉ
        </div>
        <div style={{ display: "flex", marginTop: 8, fontSize: 46, fontWeight: 800, color: pink }}>
          Zié Mohamed Allassane Junior
        </div>
        <div style={{ display: "flex", marginTop: 26, fontSize: 40, color: cyan, fontWeight: 700 }}>
          Master 2 Big Data & IA · Développeur fullstack
        </div>
        <div style={{ display: "flex", marginTop: 18, fontSize: 30, opacity: 0.75 }}>
          Abidjan — Disponible immédiatement : stage 6 mois Data / IA
        </div>
      </div>
    ),
    size,
  );
}
