"use client";

import { useState } from "react";
import { profile } from "@/data/profile";
import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "@/components/ui/Reveal";

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", subject: "", message: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(form.subject || "Contact — Portfolio");
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name || "Un visiteur"}`);
    window.location.href = `mailto:${profile.contact.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="section-alt py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm opacity-60">{t.contact.eyebrow}</p>
        <h2
          data-text={t.contact.title}
          className="glitch font-display font-bold text-4xl md:text-5xl mt-2"
        >
          {t.contact.title}
        </h2>
        <p className="mt-4 max-w-lg opacity-70">{t.contact.subtitle}</p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <ul className="space-y-4">
              <li className="panel p-4 bg-transparent">
                <span className="text-xs opacity-60">{t.contact.labelEmail}</span>
                <a href={`mailto:${profile.contact.email}`} className="block mt-1 font-display break-all">
                  {profile.contact.email}
                </a>
              </li>
              <li className="panel p-4 bg-transparent">
                <span className="text-xs opacity-60">{t.contact.labelPhone}</span>
                <a href={`tel:${profile.contact.phone.replace(/\s/g, "")}`} className="block mt-1 font-display">
                  {profile.contact.phone}
                </a>
              </li>
              <li className="panel p-4 bg-transparent">
                <span className="text-xs opacity-60">LinkedIn</span>
                <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" className="block mt-1 font-display break-all">
                  linkedin.com/in/traore-zie-mohamed-allassane-junior
                </a>
              </li>
              <li className="panel p-4 bg-transparent">
                <span className="text-xs opacity-60">GitHub</span>
                <a href={profile.contact.github} target="_blank" rel="noreferrer" className="block mt-1 font-display break-all">
                  github.com/thegoat12-crypto
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={150}>
            <form onSubmit={handleSubmit} className="panel p-6 bg-transparent">
              <label htmlFor="name" className="text-xs opacity-60 block">{t.contact.labelName}</label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={t.contact.placeholderName}
                className="w-full mt-1 mb-4 px-3 py-2 bg-transparent border-2 border-current/20 rounded"
              />

              <label htmlFor="subject" className="text-xs opacity-60 block">{t.contact.labelSubject}</label>
              <input
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder={t.contact.placeholderSubject}
                className="w-full mt-1 mb-4 px-3 py-2 bg-transparent border-2 border-current/20 rounded"
              />

              <label htmlFor="message" className="text-xs opacity-60 block">{t.contact.labelMessage}</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                required
                placeholder={t.contact.placeholderMessage}
                className="w-full mt-1 mb-5 px-3 py-2 bg-transparent border-2 border-current/20 rounded"
              />

              <button type="submit" className="panel-solid bg-pink text-white px-6 py-3 text-sm font-medium">
                {t.contact.send} →
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}