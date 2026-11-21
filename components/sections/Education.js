"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import CredentialSeal from "@/components/ui/CredentialSeal";
import OrgLogo from "@/components/ui/OrgLogo";

export default function Education() {
  const { t } = useLanguage();

  return (
    <section id="formation" className="section-alt px-6 py-24">
      <div className="relative mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[1fr_auto]">
        <div>
          <SectionHeading caption={t.education.caption} eyebrow={t.education.eyebrow} title={t.education.title} />

          <ol className="mt-10 space-y-5">
            {t.education.items.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 80}>
                <div className="panel flex items-center gap-5 p-5">
                  <OrgLogo orgKey={item.orgKey} size={64} className={index % 2 ? "rotate-6" : "-rotate-6"} />
                  <div>
                    <span className="font-mono text-xs text-pink">{item.year}</span>
                    <h3 className="font-display text-xl">{item.title}</h3>
                    <p className="text-sm opacity-70">{item.org}</p>
                    {item.note && <p className="mt-1 text-sm italic text-pink">{item.note}</p>}
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={200} className="mx-auto">
          <CredentialSeal degree={t.education.sealDegree} org={t.education.sealOrg} />
        </Reveal>
      </div>
    </section>
  );
}
