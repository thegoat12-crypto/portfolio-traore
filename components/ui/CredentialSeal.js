"use client";

import { TbSchool } from "react-icons/tb";
import { profile } from "@/data/profile";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CredentialSeal() {
  const { t } = useLanguage();
  const label = `${t.hero.credentialDegree} • ${t.hero.credentialOrg} • `;

  return (
    <div
      className="relative h-32 w-32 sm:h-40 sm:w-40 shrink-0"
      title={profile.legalName}
    >
      <svg viewBox="0 0 200 200" className="animate-spin-slow h-full w-full text-ink dark:text-paper">
        <defs>
          <path id="seal-circle" d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" />
        </defs>
        <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <text fontSize="9" fontFamily="var(--font-mono)" letterSpacing="2" fill="currentColor">
          <textPath href="#seal-circle" startOffset="0%">
            {label.repeat(2)}
          </textPath>
        </text>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center">
        <TbSchool className="text-pink" size={28} />
        <span className="font-display text-[10px] leading-tight px-2">
          {profile.initials}
        </span>
      </div>
    </div>
  );
}