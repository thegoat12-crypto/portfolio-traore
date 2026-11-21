// Illustrations dessinées (pas des captures) des projets, style comics.
// Chaque projet a 3 scènes. Elles sont remplacées par de vraies captures dès que
// profile.projects[i].images contient des fichiers.

const INK = "#0a0a12";
const PAPER = "#f5f3ec";
const PINK = "#ff2e88";
const CYAN = "#00c2d1";
const YELLOW = "#ffd400";

/* ---------- Cadres ---------- */

function Browser({ children, url }) {
  return (
    <div className="absolute inset-3 flex flex-col overflow-hidden rounded-md border-[3px] border-ink bg-paper shadow-[4px_4px_0_0_#0a0a12]">
      <div className="flex items-center gap-1.5 border-b-[3px] border-ink bg-ink px-2 py-1.5">
        <span className="h-2 w-2 rounded-full bg-pink" />
        <span className="h-2 w-2 rounded-full bg-yellow" />
        <span className="h-2 w-2 rounded-full bg-cyan" />
        <span className="ml-2 h-3 flex-1 truncate rounded-sm bg-paper/15 px-1.5 font-mono text-[7px] leading-3 text-paper/70">{url}</span>
      </div>
      <div className="relative flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

function Phone({ children, tilt = "-rotate-6" }) {
  return (
    <div className={`absolute left-1/2 top-1/2 h-[118%] w-[38%] -translate-x-1/2 -translate-y-[44%] ${tilt}`}>
      <div className="relative h-full w-full overflow-hidden rounded-[18px] border-[4px] border-ink bg-paper shadow-[5px_5px_0_0_#0a0a12]">
        <div className="absolute left-1/2 top-1 z-10 h-1.5 w-8 -translate-x-1/2 rounded-full bg-ink" />
        <div className="absolute inset-0 pt-4">{children}</div>
      </div>
    </div>
  );
}

function Bottle({ color = PINK, cap = INK, className = "", style }) {
  return (
    <svg viewBox="0 0 40 64" className={className} style={style} aria-hidden>
      <rect x="15" y="2" width="10" height="10" rx="1.5" fill={cap} stroke={INK} strokeWidth="2.5" />
      <rect x="17" y="12" width="6" height="5" fill={PAPER} stroke={INK} strokeWidth="2.5" />
      <path d="M6 22 Q6 17 12 17 H28 Q34 17 34 22 V56 Q34 62 28 62 H12 Q6 62 6 56 Z" fill={color} stroke={INK} strokeWidth="2.5" />
      <path d="M11 24 V54" stroke={PAPER} strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      <rect x="12" y="36" width="16" height="10" fill={PAPER} stroke={INK} strokeWidth="2" />
    </svg>
  );
}

const Line = ({ w = "60%", className = "" }) => <span className={`block h-1.5 rounded-full bg-ink/25 ${className}`} style={{ width: w }} />;

/* ---------- Parfumerie (web) ---------- */

function PerfumeHome() {
  return (
    <Browser url="parfumerie / accueil">
      <div className="absolute inset-0 bg-ink" />
      <div className="halftone-fade absolute inset-0 text-pink !opacity-40" />
      <div className="absolute left-4 top-4 max-w-[55%]">
        <p className="font-display text-[22px] leading-none text-paper">L’ESSENCE</p>
        <p className="font-display text-[22px] leading-none text-pink">DU LUXE</p>
        <div className="mt-2 space-y-1">
          <Line w="90%" className="!bg-paper/30" />
          <Line w="70%" className="!bg-paper/30" />
        </div>
        <span className="mt-3 inline-block border-2 border-paper bg-pink px-2 py-0.5 font-display text-[9px] text-white">DÉCOUVRIR →</span>
      </div>
      <Bottle color={PINK} cap={YELLOW} className="absolute bottom-2 right-[22%] h-[78%] -rotate-6" />
      <Bottle color={CYAN} cap={INK} className="absolute bottom-3 right-3 h-[58%] rotate-6" />
    </Browser>
  );
}

function PerfumeGrid() {
  const items = [
    [PINK, YELLOW],
    [CYAN, INK],
    [YELLOW, PINK],
    [PAPER, CYAN],
  ];
  return (
    <Browser url="parfumerie / collection">
      <div className="flex h-full flex-col p-3">
        <div className="flex items-center justify-between">
          <span className="font-display text-xs">COLLECTION NICHE</span>
          <span className="flex gap-1">
            {["TOUS", "BOISÉ", "FLORAL"].map((f, i) => (
              <span key={f} className={`rounded-full border-2 border-ink px-1.5 font-display text-[7px] ${i === 0 ? "bg-ink text-paper" : ""}`}>{f}</span>
            ))}
          </span>
        </div>
        <div className="mt-2 grid flex-1 grid-cols-4 gap-2">
          {items.map(([c, cap], i) => (
            <div key={i} className="flex flex-col items-center justify-end rounded border-2 border-ink bg-paper-alt p-1">
              <Bottle color={c} cap={cap} className="h-[62%]" />
              <Line w="80%" className="mt-1" />
              <span className="mt-1 font-display text-[8px] text-pink">{45 + i * 15} 000 F</span>
            </div>
          ))}
        </div>
      </div>
    </Browser>
  );
}

function PerfumeCart() {
  return (
    <Browser url="parfumerie / panier">
      <div className="flex h-full gap-3 p-3">
        <div className="flex-1 space-y-2">
          <span className="font-display text-xs">MON PANIER</span>
          {[PINK, CYAN].map((c, i) => (
            <div key={i} className="flex items-center gap-2 rounded border-2 border-ink p-1.5">
              <Bottle color={c} className="h-8" />
              <div className="flex-1 space-y-1">
                <Line w="70%" />
                <Line w="40%" />
              </div>
              <span className="font-display text-[9px]">×{i + 1}</span>
            </div>
          ))}
        </div>
        <div className="flex w-[38%] flex-col rounded border-[3px] border-ink bg-yellow p-2">
          <span className="font-display text-[10px]">TOTAL</span>
          <span className="font-display text-lg leading-none">135 000 F</span>
          <div className="mt-2 space-y-1">
            <Line w="100%" />
            <Line w="80%" />
          </div>
          <span className="mt-auto block border-2 border-ink bg-pink py-0.5 text-center font-display text-[9px] text-white">PAYER</span>
        </div>
      </div>
    </Browser>
  );
}

/* ---------- Oquartier (mobile) ---------- */

function QuartierMap() {
  return (
    <div className="absolute inset-0 bg-cyan">
      <div className="halftone absolute inset-0 text-ink !opacity-20" />
      <svg viewBox="0 0 200 140" className="absolute inset-0 h-full w-full opacity-40" aria-hidden>
        <path d="M0 40 H200 M0 95 H200 M60 0 V140 M140 0 V140" stroke={INK} strokeWidth="6" />
      </svg>
      <Phone>
        <div className="relative h-full bg-[#dff6f8]">
          <svg viewBox="0 0 100 180" className="absolute inset-0 h-full w-full" aria-hidden>
            <path d="M0 60 H100 M0 120 H100 M35 0 V180 M70 0 V180" stroke={PAPER} strokeWidth="8" />
            <path d="M0 60 H100 M0 120 H100 M35 0 V180 M70 0 V180" stroke={INK} strokeWidth="0.8" strokeDasharray="3 3" />
          </svg>
          {[
            [22, 40, PINK],
            [58, 90, YELLOW],
            [80, 140, PINK],
          ].map(([x, y, c], i) => (
            <svg key={i} viewBox="0 0 20 26" className="absolute h-6 w-5" style={{ left: `${x}%`, top: `${(y / 180) * 100}%` }} aria-hidden>
              <path d="M10 25 C4 16 2 13 2 9 A8 8 0 0 1 18 9 C18 13 16 16 10 25 Z" fill={c} stroke={INK} strokeWidth="2" />
              <circle cx="10" cy="9" r="3" fill={PAPER} stroke={INK} strokeWidth="1.5" />
            </svg>
          ))}
          <div className="absolute bottom-2 left-2 right-2 rounded-md border-2 border-ink bg-paper p-1.5">
            <span className="block font-display text-[8px]">3 PRESTATAIRES PRÈS DE VOUS</span>
            <Line w="70%" className="mt-1" />
          </div>
        </div>
      </Phone>
    </div>
  );
}

function QuartierList() {
  const pros = [
    ["PLOMBIER", PINK, "4.9"],
    ["COIFFEUSE", YELLOW, "4.8"],
    ["ÉLECTRICIEN", CYAN, "4.7"],
    ["COUTURIER", PINK, "4.9"],
  ];
  return (
    <div className="absolute inset-0 bg-yellow">
      <div className="halftone-fade absolute inset-0 text-pink !opacity-50" />
      <Phone tilt="rotate-3">
        <div className="space-y-1.5 px-2">
          <span className="block font-display text-[10px]">OQUARTIER</span>
          <span className="block rounded-full border-2 border-ink px-2 py-0.5 font-mono text-[7px] opacity-60">Rechercher un service…</span>
          {pros.map(([name, c, note]) => (
            <div key={name} className="flex items-center gap-1.5 rounded border-2 border-ink p-1">
              <span className="h-5 w-5 shrink-0 rounded-full border-2 border-ink" style={{ background: c }} />
              <div className="min-w-0 flex-1">
                <span className="block truncate font-display text-[7px]">{name}</span>
                <Line w="70%" className="mt-0.5 !h-1" />
              </div>
              <span className="font-display text-[7px]">★{note}</span>
            </div>
          ))}
        </div>
      </Phone>
    </div>
  );
}

function QuartierChat() {
  return (
    <div className="absolute inset-0 bg-pink">
      <div className="halftone absolute inset-0 text-ink !opacity-20" />
      <Phone tilt="-rotate-3">
        <div className="flex h-full flex-col gap-1.5 px-2 pb-2">
          <span className="block border-b-2 border-ink pb-1 font-display text-[9px]">AWA — COIFFEUSE</span>
          <span className="max-w-[80%] self-start rounded-md border-2 border-ink bg-paper-alt px-1.5 py-1 font-mono text-[6.5px]">Bonjour ! Dispo samedi 10 h ?</span>
          <span className="max-w-[80%] self-end rounded-md border-2 border-ink bg-cyan px-1.5 py-1 font-mono text-[6.5px]">Parfait, je réserve.</span>
          <span className="max-w-[80%] self-start rounded-md border-2 border-ink bg-paper-alt px-1.5 py-1 font-mono text-[6.5px]">C’est noté ✓</span>
          <span className="mt-auto block border-2 border-ink bg-yellow py-1 text-center font-display text-[8px]">RÉSERVATION CONFIRMÉE</span>
        </div>
      </Phone>
    </div>
  );
}

/* ---------- Projet Data : chômage des jeunes femmes ---------- */

function Notebook({ children, title }) {
  return (
    <div className="absolute inset-3 flex flex-col overflow-hidden rounded-md border-[3px] border-ink bg-paper shadow-[4px_4px_0_0_#0a0a12]">
      <div className="flex items-center gap-2 border-b-[3px] border-ink bg-yellow px-2 py-1">
        <span className="font-mono text-[8px] font-bold">In [42]:</span>
        <span className="truncate font-mono text-[8px]">{title}</span>
      </div>
      <div className="relative flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

function DataForecast() {
  // historique (plein) puis prévision (pointillés) avec bande de confiance à 95 %
  const hist = "M20 104 L50 98 L80 101 L110 90 L140 86";
  const fut = "M140 86 L170 80 L200 73 L230 68 L260 61";
  const band = "M140 86 L170 70 L200 58 L230 49 L260 38 L260 84 L230 87 L200 88 L170 90 L140 86 Z";
  return (
    <Notebook title="prevision_2025_2035.ipynb">
      <svg viewBox="0 0 280 130" className="absolute inset-0 h-full w-full" aria-hidden>
        {[30, 60, 90].map((y) => (
          <line key={y} x1="20" x2="270" y1={y} y2={y} stroke={INK} strokeOpacity="0.12" strokeWidth="1" />
        ))}
        <line x1="20" y1="112" x2="270" y2="112" stroke={INK} strokeWidth="2" />
        <line x1="20" y1="14" x2="20" y2="112" stroke={INK} strokeWidth="2" />
        <path d={band} fill={CYAN} opacity="0.35" />
        <path d={hist} fill="none" stroke={INK} strokeWidth="3" />
        <path d={fut} fill="none" stroke={PINK} strokeWidth="3" strokeDasharray="6 4" />
        {[[20, 104], [50, 98], [80, 101], [110, 90], [140, 86]].map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="3" fill={YELLOW} stroke={INK} strokeWidth="1.5" />
        ))}
        <line x1="140" y1="14" x2="140" y2="112" stroke={INK} strokeWidth="1" strokeDasharray="3 3" />
        <text x="146" y="22" fontSize="8" fontFamily="monospace" fill={INK}>prévision →</text>
        <text x="22" y="124" fontSize="7" fontFamily="monospace" fill={INK}>2015</text>
        <text x="130" y="124" fontSize="7" fontFamily="monospace" fill={INK}>2025</text>
        <text x="246" y="124" fontSize="7" fontFamily="monospace" fill={INK}>2035</text>
      </svg>
      <span className="absolute right-2 top-2 rounded-sm border-2 border-ink bg-cyan px-1 font-mono text-[7px]">IC 95 %</span>
    </Notebook>
  );
}

function DataGender() {
  const groups = [
    ["15-19", 58, 41],
    ["20-24", 72, 49],
    ["25-29", 64, 44],
    ["30-35", 50, 37],
  ];
  return (
    <Notebook title="disparites_genre.py">
      <div className="flex h-full flex-col p-3">
        <div className="flex items-center gap-3 font-display text-[8px]">
          <span className="flex items-center gap-1"><span className="h-2 w-2 border border-ink bg-pink" />FEMMES</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 border border-ink bg-cyan" />HOMMES</span>
          <span className="ml-auto font-mono opacity-60">exemple illustratif</span>
        </div>
        <div className="mt-2 flex flex-1 items-end gap-3 border-b-2 border-l-2 border-ink px-2">
          {groups.map(([label, f, h]) => (
            <div key={label} className="flex h-full flex-1 flex-col justify-end">
              <div className="flex h-full items-end gap-0.5">
                <span className="flex-1 border-2 border-ink bg-pink" style={{ height: `${f}%` }} />
                <span className="flex-1 border-2 border-ink bg-cyan" style={{ height: `${h}%` }} />
              </div>
              <span className="mt-1 text-center font-mono text-[7px]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </Notebook>
  );
}

function DataPolicy() {
  const recos = ["Formation numérique ciblée", "Accès au crédit pour entreprendre", "Suivi annuel des indicateurs"];
  return (
    <div className="absolute inset-0 bg-cyan">
      <div className="halftone-fade absolute inset-0 text-ink !opacity-30" />
      <div className="absolute inset-4 flex gap-3">
        <div className="flex w-[42%] flex-col justify-center rounded border-[3px] border-ink bg-yellow p-2 shadow-[4px_4px_0_0_#0a0a12]">
          <span className="font-display text-[9px]">MODÈLE</span>
          <span className="font-display text-xl leading-none">OLS</span>
          <span className="mt-1 font-mono text-[8px]">régression linéaire</span>
          <span className="mt-2 font-mono text-[8px]">horizon 2035</span>
        </div>
        <div className="flex flex-1 flex-col gap-1.5 rounded border-[3px] border-ink bg-paper p-2 shadow-[4px_4px_0_0_#0a0a12]">
          <span className="font-display text-[9px]">RECOMMANDATIONS</span>
          {recos.map((r, i) => (
            <span key={r} className="flex items-start gap-1 font-mono text-[7.5px] leading-tight">
              <span className="font-display text-pink">{i + 1}.</span> {r}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Monster : assistant IA local ---------- */

function Terminal({ children, title }) {
  return (
    <div className="absolute inset-3 flex flex-col overflow-hidden rounded-md border-[3px] border-ink bg-ink shadow-[4px_4px_0_0_#0a0a12]">
      <div className="flex items-center gap-1.5 border-b-2 border-paper/20 px-2 py-1">
        <span className="h-2 w-2 rounded-full bg-pink" />
        <span className="h-2 w-2 rounded-full bg-yellow" />
        <span className="h-2 w-2 rounded-full bg-cyan" />
        <span className="ml-2 font-mono text-[7px] text-paper/60">{title}</span>
      </div>
      <div className="relative flex-1 space-y-1.5 overflow-hidden p-2 font-mono text-[8px] leading-snug text-paper">{children}</div>
    </div>
  );
}

function MonsterFace({ className = "" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <rect x="4" y="8" width="32" height="26" rx="6" fill={YELLOW} stroke={INK} strokeWidth="3" />
      <line x1="20" y1="8" x2="20" y2="2" stroke={INK} strokeWidth="3" />
      <circle cx="20" cy="2.5" r="2.5" fill={PINK} stroke={INK} strokeWidth="1.5" />
      <circle cx="14" cy="19" r="4" fill={PAPER} stroke={INK} strokeWidth="2" />
      <circle cx="26" cy="19" r="4" fill={PAPER} stroke={INK} strokeWidth="2" />
      <circle cx="14" cy="19" r="1.6" fill={INK} />
      <circle cx="26" cy="19" r="1.6" fill={INK} />
      <path d="M13 27 L16 29 L19 27 L22 29 L25 27 L28 29" fill="none" stroke={INK} strokeWidth="2" />
    </svg>
  );
}

function MonsterChat() {
  return (
    <Terminal title="monster — ollama (local)">
      <p><span className="text-cyan">vous ›</span> Salut Monster, résume mes notes de cours.</p>
      <p className="flex items-start gap-1.5">
        <MonsterFace className="h-5 w-5 shrink-0" />
        <span><span className="text-yellow">monster ›</span> Voilà les 3 idées clés de ta séance sur la régression…</span>
      </p>
      <p><span className="text-cyan">vous ›</span> Merci ! Ajoute-les à ma fiche.</p>
      <p className="text-pink">▍</p>
    </Terminal>
  );
}

function MonsterSearch() {
  return (
    <Terminal title="monster — recherche web">
      <p><span className="text-cyan">vous ›</span> Quoi de neuf sur les LLM open source ?</p>
      <p className="text-paper/60">⟳ recherche en cours…</p>
      {["source 1 — article", "source 2 — documentation", "source 3 — blog technique"].map((s) => (
        <p key={s} className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 border border-paper bg-cyan" /> {s}
        </p>
      ))}
      <p><span className="text-yellow">monster ›</span> Synthèse prête, avec les liens.</p>
    </Terminal>
  );
}

function MonsterMemory() {
  return (
    <div className="absolute inset-0 bg-yellow">
      <div className="halftone absolute inset-0 text-pink !opacity-30" />
      <MonsterFace className="absolute left-5 top-1/2 h-24 w-24 -translate-y-1/2 -rotate-6" />
      <div className="absolute right-4 top-4 bottom-4 flex w-[52%] flex-col gap-1.5 rounded border-[3px] border-ink bg-paper p-2 shadow-[4px_4px_0_0_#0a0a12]">
        <span className="font-display text-[9px]">MÉMOIRE</span>
        {["Préfère les réponses courtes", "Projet : portfolio Next.js", "Examen BIHAR vendredi"].map((m) => (
          <span key={m} className="rounded-sm border-2 border-ink bg-cyan/40 px-1 font-mono text-[7px]">{m}</span>
        ))}
        <span className="mt-auto font-mono text-[7px] opacity-60">100 % en local · Ollama</span>
      </div>
    </div>
  );
}

export const mockups = {
  data: [DataForecast, DataGender, DataPolicy],
  ai: [MonsterChat, MonsterSearch, MonsterMemory],
  web: [PerfumeHome, PerfumeGrid, PerfumeCart],
  mobile: [QuartierMap, QuartierList, QuartierChat],
};
