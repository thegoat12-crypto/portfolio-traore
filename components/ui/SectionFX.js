// Décor de fond animé et transparent pour une section (trames qui dérivent,
// toile qui se dessine, éclats). Transform/opacity uniquement : léger et fluide.
const LAYOUTS = {
  left: { blobA: "-left-24 top-16", blobB: "-right-20 bottom-10", web: "-left-28 -bottom-28", shard: "right-[8%] top-[18%]" },
  right: { blobA: "-right-24 top-10", blobB: "-left-16 bottom-0", web: "-right-28 -top-24", shard: "left-[6%] top-[30%]" },
};

export default function SectionFX({ side = "right", a = "text-pink", b = "text-cyan" }) {
  const l = LAYOUTS[side];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className={`drift halftone absolute h-80 w-80 rounded-full ${a} !opacity-[0.12] ${l.blobA}`} />
      <div className={`drift halftone absolute h-96 w-96 rounded-full ${b} !opacity-[0.1] ${l.blobB}`} style={{ animationDelay: "-14s" }} />
      <svg viewBox="0 0 400 400" className={`absolute h-[24rem] w-[24rem] ${a} opacity-20 ${l.web}`} fill="none">
        <g stroke="currentColor" strokeWidth="1.5">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => (
            <line key={d} className="web-line" x1="200" y1="200" x2={200 + 200 * Math.cos((d * Math.PI) / 180)} y2={200 + 200 * Math.sin((d * Math.PI) / 180)} />
          ))}
          {[60, 120, 180].map((r) => (
            <circle key={r} className="web-line" cx="200" cy="200" r={r} />
          ))}
        </g>
      </svg>
      <div className={`shard absolute hidden h-12 w-24 border-[3px] border-current opacity-20 md:block ${b} ${l.shard}`} style={{ "--rot": "-14deg", clipPath: "polygon(12% 0, 100% 0, 88% 100%, 0 100%)" }} />
    </div>
  );
}
