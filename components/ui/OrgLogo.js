import Image from "next/image";
import { profile } from "@/data/profile";

const badgeColors = {
  pink: "bg-pink text-white",
  cyan: "bg-cyan text-ink",
  yellow: "bg-yellow text-ink",
};

// Logo d'une école ou d'une entreprise, façon autocollant de BD.
// Sans fichier de logo : badge rond avec les initiales.
export default function OrgLogo({ orgKey, size = 56, className = "" }) {
  const org = profile.orgs[orgKey];
  if (!org) return null;

  return (
    <div
      className={`panel-solid relative flex shrink-0 items-center justify-center overflow-hidden rounded-full ${
        org.logo ? "bg-white" : badgeColors[org.color]
      } ${className}`}
      style={{ width: size, height: size }}
      title={org.name}
    >
      {org.logo ? (
        <Image src={org.logo} alt={org.name} width={size} height={size} className="h-[78%] w-[78%] object-contain" />
      ) : (
        <>
          <span className="halftone-fade absolute inset-0 text-ink !opacity-30" aria-hidden />
          <span className="relative font-display leading-none" style={{ fontSize: size * (org.initials.length > 2 ? 0.3 : 0.38) }} role="img" aria-label={org.name}>
            {org.initials}
          </span>
        </>
      )}
    </div>
  );
}
