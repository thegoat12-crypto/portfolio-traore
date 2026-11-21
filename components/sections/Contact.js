"use client";

import { useState } from "react";
import { profile } from "@/data/profile";
import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { TbCopy, TbCheck, TbMail, TbPhone, TbArrowUpRight, TbFileCv } from "react-icons/tb";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";

const inputClass =
  "mt-1 mb-4 w-full rounded border-2 border-current/25 bg-transparent px-3 py-2 transition-colors focus:border-pink focus:outline-none";

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", subject: "", message: "" });
  const [copied, setCopied] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(form.subject || t.contact.defaultSubject);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name || t.contact.anonymous}`);
    window.location.href = `mailto:${profile.contact.email}?subject=${subject}&body=${body}`;
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.contact.email}`;
    }
  }

  const links = [
    { label: t.contact.labelPhone, value: profile.contact.phone, href: `tel:${profile.contact.phone.replace(/\s/g, "")}`, Icon: TbPhone },
    { label: "LinkedIn", value: profile.contact.linkedinLabel, href: profile.contact.linkedin, Icon: FaLinkedin, external: true },
    { label: "GitHub", value: profile.contact.githubLabel, href: profile.contact.github, Icon: SiGithub, external: true },
    ...(profile.cv ? [{ label: t.contact.cv, value: t.contact.cvValue, href: profile.cv, Icon: TbFileCv, external: true }] : []),
  ];

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading caption={t.contact.caption} eyebrow={t.contact.eyebrow} title={t.contact.title} />
        <p className="mt-4 max-w-lg opacity-75">{t.contact.subtitle}</p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <ul className="space-y-4">
              <li className="panel flex items-center gap-3 bg-transparent p-4">
                <TbMail className="shrink-0 text-cyan" size={20} aria-hidden />
                <div className="min-w-0 flex-1">
                  <span className="font-mono text-xs uppercase opacity-60">{t.contact.labelEmail}</span>
                  <a href={`mailto:${profile.contact.email}`} className="mt-0.5 block break-all font-display">
                    {profile.contact.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="btn-pop panel-solid flex shrink-0 items-center gap-1 bg-yellow px-2 py-1 font-display text-xs text-ink"
                >
                  {copied ? <TbCheck aria-hidden /> : <TbCopy aria-hidden />}
                  <span aria-live="polite">{copied ? t.contact.copied : t.contact.copy}</span>
                </button>
              </li>

              {links.map(({ label, value, href, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    className="group panel flex items-center gap-3 bg-transparent p-4 transition-transform hover:-translate-y-1"
                  >
                    <Icon className="shrink-0 text-cyan" size={20} aria-hidden />
                    <div className="min-w-0 flex-1">
                      <span className="font-mono text-xs uppercase opacity-60">{label}</span>
                      <span className="mt-0.5 block break-all font-display">{value}</span>
                    </div>
                    {external && (
                      <>
                        <TbArrowUpRight className="shrink-0 opacity-50 group-hover:opacity-100" aria-hidden />
                        <span className="sr-only">{t.meta.newTab}</span>
                      </>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={150}>
            <form onSubmit={handleSubmit} className="panel bg-transparent p-6">
              <label htmlFor="name" className="block font-mono text-xs uppercase opacity-70">{t.contact.labelName}</label>
              <input id="name" name="name" autoComplete="name" value={form.name} onChange={handleChange} placeholder={t.contact.placeholderName} className={inputClass} />

              <label htmlFor="subject" className="block font-mono text-xs uppercase opacity-70">{t.contact.labelSubject}</label>
              <input id="subject" name="subject" value={form.subject} onChange={handleChange} placeholder={t.contact.placeholderSubject} className={inputClass} />

              <label htmlFor="message" className="block font-mono text-xs uppercase opacity-70">{t.contact.labelMessage}</label>
              <textarea id="message" name="message" value={form.message} onChange={handleChange} rows={5} required placeholder={t.contact.placeholderMessage} className={inputClass} />

              <div className="flex flex-wrap items-center gap-4">
                <button type="submit" className="btn-pop panel-solid bg-pink px-6 py-3 font-display text-sm tracking-wide text-white">
                  {t.contact.send} →
                </button>
                <span className="text-xs opacity-60">{t.contact.sendHint}</span>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
