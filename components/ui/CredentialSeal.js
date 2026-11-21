import { TbSchool } from "react-icons/tb";
import { profile } from "@/data/profile";

// Sceau rotatif (texte circulaire) : diplôme en cours + établissement.
export default function CredentialSeal({ degree, org }) {
  const label = `${degree} • ${org} • `;

  return (
    <div className="relative h-40 w-40 shrink-0 sm:h-48 sm:w-48" title={profile.name} aria-hidden>
      <svg viewBox="0 0 200 200" className="animate-spin-slow h-full w-full">
        <defs>
          <path id="seal-circle" d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" />
        </defs>
        <circle cx="100" cy="100" r="98" fill="var(--color-yellow)" stroke="currentColor" strokeWidth="3" />
        <circle cx="100" cy="100" r="64" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <text fontSize="11" fontFamily="var(--font-mono)" letterSpacing="2" fill="var(--color-ink)">
          <textPath href="#seal-circle" startOffset="0%" textLength="500">
            {label.repeat(2)}
          </textPath>
        </text>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center text-ink">
        <TbSchool className="text-pink" size={34} />
        <span className="font-display text-sm">{profile.initials}</span>
      </div>
    </div>
  );
}
