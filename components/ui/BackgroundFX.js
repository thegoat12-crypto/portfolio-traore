// Décor animé fixe derrière tout le site (illustrations originales, aucun élément
// sous licence) : bulles de trame qui dérivent avec un effet de profondeur au scroll,
// fils de toile avec de petites araignées qui se balancent, éclats de « dimensions ».
// 100 % CSS : aucune boucle JavaScript, coupé si l'animation est réduite.

const blobs = [
  { cls: "text-pink", style: { left: "-6%", top: "8%", width: "26rem", height: "26rem" }, depth: "parallax-slow", dur: "22s" },
  { cls: "text-cyan", style: { right: "-8%", top: "38%", width: "30rem", height: "30rem" }, depth: "parallax-fast", dur: "26s" },
  { cls: "text-yellow", style: { left: "30%", top: "70%", width: "18rem", height: "18rem" }, depth: "parallax-mid", dur: "18s" },
  { cls: "text-pink", style: { right: "18%", top: "-6%", width: "14rem", height: "14rem" }, depth: "parallax-mid", dur: "20s" },
];

const threads = [
  { left: "7%", length: "22vh", delay: "0s", dur: "5s" },
  { left: "63%", length: "12vh", delay: "-1.6s", dur: "6.5s" },
  { left: "91%", length: "30vh", delay: "-3s", dur: "5.8s" },
];

const shards = [
  { style: { left: "12%", top: "46%" }, color: "border-cyan", size: "w-24 h-10", dur: "17s", rot: "-18deg" },
  { style: { right: "9%", top: "18%" }, color: "border-pink", size: "w-16 h-16", dur: "21s", rot: "24deg" },
  { style: { left: "46%", top: "24%" }, color: "border-yellow", size: "w-20 h-8", dur: "15s", rot: "8deg" },
  { style: { right: "30%", top: "82%" }, color: "border-cyan", size: "w-14 h-20", dur: "19s", rot: "-30deg" },
  { style: { left: "4%", top: "84%" }, color: "border-pink", size: "w-28 h-6", dur: "23s", rot: "14deg" },
];

function TinySpider() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink dark:text-paper" aria-hidden>
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none">
        <path d="M12 12 L4 6 M12 12 L3 12 M12 12 L4 18 M12 12 L20 6 M12 12 L21 12 M12 12 L20 18" />
      </g>
      <ellipse cx="12" cy="13" rx="3.4" ry="4.2" fill="currentColor" />
      <circle cx="12" cy="8.2" r="2.2" fill="currentColor" />
      <circle cx="11.2" cy="8" r="0.6" fill="#ff2e88" />
      <circle cx="12.8" cy="8" r="0.6" fill="#ff2e88" />
    </svg>
  );
}

export default function BackgroundFX() {
  return (
    <div className="bg-fx pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* bulles de trame (points Ben-Day) */}
      {blobs.map((b, i) => (
        <div key={i} className={`absolute ${b.depth}`} style={b.style}>
          <div className={`drift halftone h-full w-full rounded-full ${b.cls} !opacity-[0.16]`} style={{ animationDuration: b.dur }} />
        </div>
      ))}

      {/* éclats de dimensions : contours décalés qui dérivent */}
      {shards.map((s, i) => (
        <div key={i} className="absolute hidden md:block parallax-mid" style={s.style}>
          <div
            className={`shard ${s.size} border-[3px] ${s.color} opacity-30`}
            style={{ "--rot": s.rot, animationDuration: s.dur, clipPath: "polygon(12% 0, 100% 0, 88% 100%, 0 100%)" }}
          />
        </div>
      ))}

      {/* fils de toile + araignées */}
      {threads.map((th, i) => (
        <div key={i} className="thread absolute top-0" style={{ left: th.left, animationDelay: th.delay, animationDuration: th.dur }}>
          <div className="mx-auto w-px bg-current opacity-40" style={{ height: th.length }} />
          <div className="-mt-1 flex justify-center">
            <TinySpider />
          </div>
        </div>
      ))}
    </div>
  );
}
