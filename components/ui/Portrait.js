import Image from "next/image";
import { profile } from "@/data/profile";

// Portrait façon case de BD. Avec une photo (profile.photo) : image + trame de points
// et contour décalé. Sans photo : initiales géantes en trame, pas de cadre vide.
export default function Portrait({ alt, className = "" }) {
  return (
    <figure className={`panel relative aspect-[3/4] w-full overflow-hidden bg-pink text-ink ${className}`}>
      {profile.photo ? (
        <>
          <Image src={profile.photo} alt={alt} fill sizes="(min-width: 768px) 320px, 80vw" className="object-cover grayscale contrast-125" />
          <div className="absolute inset-0 bg-pink mix-blend-multiply opacity-60" aria-hidden />
          <div className="halftone absolute inset-0 text-ink !opacity-25" aria-hidden />
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center" role="img" aria-label={alt}>
          <div className="halftone-fade absolute inset-0 text-ink !opacity-40" aria-hidden />
          <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full text-ink/30" aria-hidden>
            <g stroke="currentColor" strokeWidth="1" fill="none">
              {[0, 30, 60, 90, 120, 150].map((deg) => (
                <line
                  key={deg}
                  x1={100 - 150 * Math.cos((deg * Math.PI) / 180)}
                  y1={100 - 150 * Math.sin((deg * Math.PI) / 180)}
                  x2={100 + 150 * Math.cos((deg * Math.PI) / 180)}
                  y2={100 + 150 * Math.sin((deg * Math.PI) / 180)}
                />
              ))}
              {[30, 55, 80].map((r) => (
                <circle key={r} cx="100" cy="100" r={r} />
              ))}
            </g>
          </svg>
          <span className="graffiti-badge relative -rotate-6 text-7xl text-paper sm:text-8xl" aria-hidden>
            {profile.initials}
          </span>
        </div>
      )}
      <figcaption className="caption-box absolute bottom-3 left-3">{profile.shortName}</figcaption>
    </figure>
  );
}
