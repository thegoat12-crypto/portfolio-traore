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
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", botcheck: false });
  const [status, setStatus] = useState("idle"); // idle → sending → sent | error
  const [copied, setCopied] = useState(false);

  function handleChange(e) {
    const { name, type, checked, value } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  function openMailApp() {
    const subject = encodeURIComponent(form.subject || t.contact.defaultSubject);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name || t.contact.anonymous}${form.email ? ` (${form.email})` : ""}`);
    window.location.href = `mailto:${profile.contact.email}?subject=${subject}&body=${body}`;
  }

  // Envoi direct via Web3Forms (le message arrive dans la boîte mail du propriétaire).
  // Sans clé configurée ou en cas d'échec : repli sur la messagerie du visiteur.
  async function handleSubmit(e) {
    e.preventDefault();
    if (form.botcheck) return; // piège à robots (champ invisible)
    if (!profile.web3formsKey) return openMailApp();

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: profile.web3formsKey,
          subject: `[Portfolio] ${form.subject || t.contact.defaultSubject}`,
          from_name: form.name || t.contact.anonymous,
          name: form.name,
          email: form.email,
          replyto: form.email,
          message: form.message,
          botcheck: false,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.message || res.statusText);
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "", botcheck: false });
    } catch {
      setStatus("error");
    }
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
    <section id="contact" className="relative overflow-x-clip px-6 py-24">
      {/* décor : toile qui se dessine et trames qui dérivent */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="drift halftone absolute -left-24 top-10 h-80 w-80 rounded-full text-pink !opacity-[0.12]" />
        <div className="drift halftone absolute -right-20 bottom-0 h-96 w-96 rounded-full text-cyan !opacity-[0.12]" style={{ animationDelay: "-12s" }} />
        <svg viewBox="0 0 400 400" className="absolute -right-24 -top-24 h-[26rem] w-[26rem] text-pink opacity-25" fill="none">
          <g stroke="currentColor" strokeWidth="1.5">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => (
              <line key={d} className="web-line" x1="200" y1="200" x2={200 + 200 * Math.cos((d * Math.PI) / 180)} y2={200 + 200 * Math.sin((d * Math.PI) / 180)} />
            ))}
            {[60, 120, 180].map((r) => (
              <circle key={r} className="web-line" cx="200" cy="200" r={r} />
            ))}
          </g>
        </svg>
      </div>
      <div className="relative mx-auto max-w-5xl">
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

              <label htmlFor="email" className="block font-mono text-xs uppercase opacity-70">{t.contact.labelYourEmail}</label>
              <input id="email" name="email" type="email" autoComplete="email" required value={form.email} onChange={handleChange} placeholder={t.contact.placeholderEmail} className={inputClass} />

              <label htmlFor="subject" className="block font-mono text-xs uppercase opacity-70">{t.contact.labelSubject}</label>
              <input id="subject" name="subject" value={form.subject} onChange={handleChange} placeholder={t.contact.placeholderSubject} className={inputClass} />

              <label htmlFor="message" className="block font-mono text-xs uppercase opacity-70">{t.contact.labelMessage}</label>
              <textarea id="message" name="message" value={form.message} onChange={handleChange} rows={5} required placeholder={t.contact.placeholderMessage} className={inputClass} />

              {/* piège à robots : invisible pour les humains */}
              <input type="checkbox" name="botcheck" checked={form.botcheck} onChange={handleChange} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-pop panel-solid bg-pink px-6 py-3 font-display text-sm tracking-wide text-white disabled:cursor-wait disabled:opacity-70"
                >
                  {status === "sending" ? t.contact.sending : `${t.contact.send} →`}
                </button>
                <span className="text-xs opacity-60">{t.contact.sendHint}</span>
              </div>

              <div aria-live="polite" className="mt-4 empty:hidden">
                {status === "sent" && (
                  <p className="panel-solid inline-block -rotate-1 bg-cyan px-3 py-2 font-display text-sm text-ink">{t.contact.sent}</p>
                )}
                {status === "error" && (
                  <p className="text-sm">
                    <span className="font-display text-pink">{t.contact.error}</span>{" "}
                    <button type="button" onClick={openMailApp} className="underline underline-offset-2">
                      {t.contact.errorFallback}
                    </button>
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
