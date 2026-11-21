// Décor de l'accueil : skyline de ville (originale) avec fenêtres qui clignotent,
// lignes de vitesse façon BD et autocollants tech qui flottent.

// Immeubles : [x, largeur, hauteur, antenne?]
const buildings = [
  [0, 70, 120], [66, 46, 190, true], [108, 80, 140], [184, 40, 230, true], [220, 90, 160],
  [306, 54, 260, true], [356, 76, 180], [428, 44, 210], [468, 96, 130], [560, 58, 300, true],
  [614, 84, 200], [694, 50, 150], [740, 72, 240, true], [808, 92, 170], [896, 48, 280, true],
  [940, 80, 150], [1016, 60, 220], [1072, 88, 140], [1156, 52, 250, true], [1204, 76, 180],
  [1276, 64, 130], [1336, 70, 210, true], [1402, 98, 160],
];

const H = 320;

// pseudo-aléatoire déterministe (même rendu serveur et client)
function rand(seed) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

function Windows({ x, w, h, seed }) {
  const cols = Math.max(2, Math.floor((w - 12) / 14));
  const rows = Math.floor((h - 24) / 18);
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const n = rand(seed * 100 + r * cols + c);
      if (n < 0.45) continue;
      const lit = n > 0.82;
      cells.push(
        <rect
          key={`${r}-${c}`}
          x={x + 8 + c * 14}
          y={H - h + 14 + r * 18}
          width="7"
          height="9"
          fill={lit ? (n > 0.92 ? "var(--color-pink)" : "var(--color-yellow)") : "var(--color-cyan)"}
          opacity={lit ? 1 : 0.18}
        />,
      );
    }
  }
  return cells;
}

function Skyline() {
  return (
    <svg viewBox={`0 0 1500 ${H}`} preserveAspectRatio="xMidYMax slice" className="absolute inset-x-0 bottom-0 h-56 w-full md:h-72" aria-hidden>
      {/* ville du fond, plus pâle */}
      <g className="text-ink/10 dark:text-paper/10" fill="currentColor">
        {buildings.map(([x, w, h], i) => (
          <rect key={i} x={x + 30} y={H - h * 0.75 - 20} width={w * 0.9} height={h * 0.75 + 20} />
        ))}
      </g>
      {/* ville du premier plan */}
      {buildings.map(([x, w, h, antenna], i) => (
        <g key={i}>
          <rect x={x} y={H - h} width={w} height={h} className="fill-ink dark:fill-[#05050a]" />
          <rect x={x} y={H - h} width={w} height="4" fill={i % 3 === 0 ? "var(--color-pink)" : i % 3 === 1 ? "var(--color-cyan)" : "var(--color-yellow)"} />
          {antenna && <line x1={x + w / 2} y1={H - h} x2={x + w / 2} y2={H - h - 26} className="stroke-ink dark:stroke-[#05050a]" strokeWidth="3" />}
          <Windows x={x} w={w} h={h} seed={i + 1} />
        </g>
      ))}
      {/* feux des antennes : un seul groupe animé */}
      <g className="blink" fill="var(--color-pink)">
        {buildings.filter((b) => b[3]).map(([x, w, h]) => (
          <circle key={x} cx={x + w / 2} cy={H - h - 28} r="4" />
        ))}
      </g>
    </svg>
  );
}

const stickers = [
  { label: "</>", cls: "bg-cyan text-ink", pos: "right-[41%] top-[46%]", r: "-12deg" },
  { label: "AI", cls: "bg-yellow text-ink", pos: "right-[38%] top-[12%]", r: "10deg" },
  { label: "{ }", cls: "bg-pink text-white", pos: "left-[42%] bottom-[34%]", r: "-8deg" },
  { label: "SQL", cls: "bg-paper text-ink", pos: "right-[6%] bottom-[38%]", r: "14deg" },
  { label: "ZAP!", cls: "bg-yellow text-pink", pos: "left-[46%] top-[20%]", r: "6deg" },
];

export default function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {/* lignes de vitesse qui rayonnent depuis le nom */}
      <div className="speed-lines absolute inset-0" />
      {stickers.map((s) => (
        <span
          key={s.label}
          className={`wobble panel-solid absolute hidden px-2 py-0.5 font-display text-sm md:block ${s.cls} ${s.pos}`}
          style={{ "--r": s.r }}
        >
          {s.label}
        </span>
      ))}
      <Skyline />
    </div>
  );
}
