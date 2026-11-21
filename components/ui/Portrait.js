import Image from "next/image";
import { profile } from "@/data/profile";

// Portrait façon case de BD. Avec une photo (profile.photo) : photo en couleur,
// trame de points légère et fantômes cyan/rose décalés derrière le cadre.
// Sans photo : initiales géantes en trame.
export default function Portrait({ alt, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      {/* cadres fantômes décalés (impression mal calée) */}
      <div className="absolute inset-0 -translate-x-3 translate-y-3 border-[3px] border-cyan" aria-hidden />
      <div className="absolute inset-0 translate-x-3 -translate-y-3 border-[3px] border-pink" aria-hidden />

      <figure className="panel relative aspect-[3/4] w-full overflow-hidden bg-pink text-ink">
        {profile.photo ? (
          <>
            <Image src={profile.photo} alt={alt} fill priority sizes="(min-width: 768px) 320px, 80vw" className="object-cover" />
            <div className="halftone absolute inset-0 text-ink mix-blend-multiply !opacity-[0.12]" aria-hidden />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-pink/50 to-transparent mix-blend-multiply" aria-hidden />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" role="img" aria-label={alt}>
            <div className="halftone-fade absolute inset-0 text-ink !opacity-40" aria-hidden />
            <span className="graffiti-badge relative -rotate-6 text-7xl text-paper sm:text-8xl" aria-hidden>
              {profile.initials}
            </span>
          </div>
        )}
        <figcaption className="caption-box absolute bottom-3 left-3">{profile.familyName.toUpperCase()} Zié</figcaption>
      </figure>

      <span className="panel-solid absolute -right-4 -top-5 rotate-6 bg-yellow px-2 py-1 font-display text-xs text-ink" aria-hidden>
        OPEN TO WORK
      </span>
    </div>
  );
}
