import Image from "next/image";
import { profile } from "@/data/profile";

// Profil : le personnage BD en grand dans une case, et la vraie photo en Polaroid posé dessus.
// Sans personnage : la photo seule. Sans rien : initiales en trame.
export default function Portrait({ alt, className = "" }) {
  const main = profile.avatar || profile.photo;

  return (
    <div className={`relative ${className}`}>
      {/* cadres fantômes décalés (impression mal calée) */}
      <div className="absolute inset-0 -translate-x-3 translate-y-3 border-[3px] border-cyan" aria-hidden />
      <div className="absolute inset-0 translate-x-3 -translate-y-3 border-[3px] border-pink" aria-hidden />

      <figure className="panel relative aspect-[3/4] w-full overflow-hidden bg-pink text-ink">
        {profile.avatar && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-pink via-[#7a2bd6] to-cyan" aria-hidden />
            <div className="halftone absolute inset-0 text-ink !opacity-25" aria-hidden />
          </>
        )}
        {main ? (
          <Image
            src={main}
            alt={alt}
            fill
            sizes="(min-width: 768px) 320px, 80vw"
            className={profile.avatar ? "object-cover object-top" : "object-cover"}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" role="img" aria-label={alt}>
            <span className="graffiti-badge -rotate-6 text-7xl text-paper sm:text-8xl" aria-hidden>
              {profile.initials}
            </span>
          </div>
        )}
        <figcaption className="caption-box absolute bottom-3 right-3">{profile.familyName.toUpperCase()} Zié</figcaption>
      </figure>

      {/* vraie photo en Polaroid */}
      {profile.avatar && profile.photo && (
        <div className="absolute -bottom-8 -left-8 w-[42%] rotate-[-8deg] border-[3px] border-ink bg-white p-1.5 pb-6 shadow-[5px_5px_0_0_var(--color-ink)] transition-transform duration-300 hover:rotate-0 hover:scale-105">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image src={profile.photo} alt="" fill sizes="140px" className="object-cover" />
          </div>
        </div>
      )}

      <span className="panel-solid absolute -right-4 -top-5 rotate-6 bg-yellow px-2 py-1 font-display text-xs text-ink" aria-hidden>
        OPEN TO WORK
      </span>
    </div>
  );
}
