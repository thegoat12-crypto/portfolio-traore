// Faits qui ne changent pas d'une langue à l'autre.
// Tous les textes affichés (titres, descriptions, dates) sont dans data/translations.js.

export const profile = {
  // Nom complet, nom de famille en premier
  name: "Traoré Zié Mohamed Allassane Junior",
  familyName: "Traoré",
  givenNames: "Zié Mohamed Allassane Junior",
  initials: "TZM",
  timeZone: "Africa/Abidjan",
  siteUrl: "https://traoremhd.vercel.app",

  // CV téléchargeable (fichier dans /public). null = bouton masqué.
  cv: "/cv-traore-zie.pdf",

  // Photo (fichier dans /public, portrait 3:4). null = portrait illustré avec initiales.
  photo: "/photo-zie.jpg",

  // Personnage BD (PNG/WebP à fond transparent) : affiché dans la télé de l'intro et dans le Profil.
  avatar: "/avatar-tzm.webp",

  // Musique de fond (boucle lo-fi originale, composée pour le site). null = pas de bouton son.
  music: "/audio/lofi-tzm.mp3",

  // Formulaire de contact : clé publique Web3Forms (elle indique seulement où livrer les messages).
  web3formsKey: "4a500359-f62c-4976-860d-2840b3ffc70a",

  contact: {
    email: "ziemohamedallassanejuniortraor@gmail.com",
    phone: "+225 07 89 39 24 54",
    location: "Angré, Abidjan — Côte d'Ivoire",
    linkedin: "https://linkedin.com/in/traore-zie-mohamed-allassane-junior",
    linkedinLabel: "linkedin.com/in/traore-zie-mohamed-allassane-junior",
    github: "https://github.com/thegoat12-crypto",
    githubLabel: "github.com/thegoat12-crypto",
  },

  // Compétences, comme sur le CV. `key` renvoie au libellé traduit dans translations.skills.categories
  skills: [
    { key: "languages", items: ["Python", "JavaScript", "SQL", "R"] },
    { key: "data", items: ["Pandas", "NumPy", "Régression (OLS)"] },
    { key: "bi", items: ["Power BI", "Excel", "Matplotlib"] },
    { key: "frameworks", items: ["Django", "React", "Next.js", "Flutter"] },
    { key: "databases", items: ["PostgreSQL", "MySQL"] },
    { key: "tools", items: ["Git/GitHub", "Docker", "Vercel", "Ollama"] },
  ],

  // Écoles et entreprises (Parcours et Formation).
  // logo: déposez le fichier dans /public/logos/ puis indiquez son chemin,
  // ex. "/logos/esatic.png" (PNG ou SVG, fond transparent ou blanc, carré de préférence).
  // Tant que logo vaut null, un badge avec les initiales est affiché.
  orgs: {
    esatic: { name: "ESATIC", initials: "ES", color: "cyan", logo: "/logos/esatic.webp" },
    estia: { name: "ESTIA — École Supérieure des Technologies Industrielles Avancées", initials: "ESTIA", color: "pink", logo: "/logos/estia.webp" },
    iit: { name: "Institut Ivoirien de Technologie", initials: "IIT", color: "yellow", logo: "/logos/iit.webp" },
    blo: { name: "Blo SARL", initials: "BLO", color: "pink", logo: "/logos/blo.webp" },
    ebenyx: { name: "Ebenyx Technologies", initials: "EX", color: "cyan", logo: "/logos/ebenyx.webp" },
    worlddatalab: { name: "World Data Lab", initials: "WDL", color: "yellow", logo: "/logos/worlddatalab.webp" },
  },

  // Liens, technos et images des projets, dans le même ordre que translations.projects.items.
  // github: null → pas de bouton (dépôt privé ou inexistant).
  // kind: le type d'illustration affichée tant qu'il n'y a pas de captures (data, ai, web, mobile).
  // images: captures à déposer dans /public/projets/, ex. ["/projets/data-1.png", ...].
  projects: [
    { id: "data-chomage", stack: ["Python", "Pandas", "NumPy", "SciPy (OLS)", "Matplotlib", "Seaborn", "API Claude"], github: "https://github.com/thegoat12-crypto/hackathon-wdl-chomage", caseStudy: "/projets/hackathon-wdl-chomage", color: "cyan", kind: "data", images: ["/projets/data-1.webp", "/projets/data-2.webp", "/projets/data-3.webp", "/projets/data-4.webp", "/projets/data-5.webp"], fit: "contain" },
    { id: "monster", caseStudy: "/projets/monster", stack: ["Python", "Ollama", "Qwen3 4B (local)", "Recherche web"], github: null, color: "yellow", kind: "ai", images: ["/projets/monster-1.webp", "/projets/monster-2.webp"], fit: "contain", dark: true },
    { id: "parfumerie", caseStudy: "/projets/manus-scents", stack: ["Next.js", "React", "Django", "PostgreSQL"], github: "https://github.com/thegoat12-crypto/perfume-ecommerce", color: "pink", kind: "web", images: ["/projets/parfum-1.webp", "/projets/parfum-2.webp", "/projets/parfum-3.webp", "/projets/parfum-4.webp"] },
    { id: "oquartier", caseStudy: "/projets/oquartier", stack: ["Flutter", "Dart"], github: null, color: "cyan", kind: "mobile", images: [] },
  ],
};

export const skillCount = profile.skills.reduce((n, group) => n + group.items.length, 0);
