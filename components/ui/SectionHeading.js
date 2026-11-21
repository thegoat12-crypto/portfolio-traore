// En-tête de section façon BD : encadré narratif jaune + grand titre à impression décalée.
export default function SectionHeading({ caption, eyebrow, title, align = "left", as: Tag = "h2" }) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <div className={`flex flex-wrap items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
        {caption && <span className="caption-box">{caption}</span>}
        {eyebrow && <span className="font-mono text-xs uppercase tracking-widest opacity-60">{eyebrow}</span>}
      </div>
      <Tag className="misprint mt-4 font-display text-4xl font-bold md:text-6xl">{title}</Tag>
    </div>
  );
}
