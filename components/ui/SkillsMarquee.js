import { profile } from "@/data/profile";
import { skillIcons, skillColors } from "@/data/skillIcons";

const tilts = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2"];

function Sticker({ name, index }) {
  const Icon = skillIcons[name];
  return (
    <li
      className={`skill-sticker panel-solid flex w-32 shrink-0 flex-col items-center gap-2 bg-paper px-3 py-4 text-ink ${tilts[index % tilts.length]}`}
    >
      {Icon && <Icon size={44} style={{ color: skillColors[name] }} aria-hidden />}
      <span className="text-center font-display text-sm leading-tight">{name}</span>
    </li>
  );
}

// Deux rangées d'autocollants (logos des langages et outils) qui défilent en sens inverse.
// La liste est doublée pour une boucle sans couture ; la 2e copie est cachée aux lecteurs d'écran.
export default function SkillsMarquee() {
  const all = profile.skills.flatMap((g) => g.items);
  const half = Math.ceil(all.length / 2);
  const rows = [all.slice(0, half), all.slice(half)];

  return (
    <div className="marquee-mask relative -mx-6 mt-12 space-y-6 overflow-hidden py-4">
      {rows.map((row, r) => (
        <div key={r} className="marquee-row flex w-max">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className={`flex shrink-0 gap-6 pr-6 ${r === 1 ? "marquee-reverse" : "marquee-forward"}`}
              aria-hidden={copy === 1 ? true : undefined}
            >
              {row.map((name, i) => (
                <Sticker key={name} name={name} index={i + r} />
              ))}
            </ul>
          ))}
        </div>
      ))}
    </div>
  );
}
