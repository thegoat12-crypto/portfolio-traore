// Faits qui ne changent pas d'une langue à l'autre.
// Tous les textes affichés (titres, descriptions, dates) sont dans data/translations.js.

export const profile = {
  name: "Zié Mohamed Allassane Junior Traoré",
  legalName: "TRAORÉ Zié Mohamed Allassane Junior",
  shortName: "Zié Traoré Mhd .jr",
  initials: "TZM",
  timeZone: "Africa/Abidjan",

  // Déposez le PDF dans /public puis indiquez son chemin, ex. "/cv-zie-traore.pdf".
  // Tant que la valeur est null, le bouton « Télécharger mon CV » est masqué.
  cv: null,

  // Déposez la photo dans /public puis indiquez son chemin, ex. "/photo-zie.jpg".
  // Tant que la valeur est null, un portrait illustré (initiales en trame) est affiché.
  photo: null,

  contact: {
    email: "ziemohamedallassanejuniortraor@gmail.com",
    phone: "+225 07 89 39 24 54",
    location: "Abidjan, Côte d'Ivoire",
    linkedin: "https://linkedin.com/in/traore-zie-mohamed-allassane-junior",
    linkedinLabel: "linkedin.com/in/traore-zie-mohamed-allassane-junior",
    github: "https://github.com/thegoat12-crypto",
    githubLabel: "github.com/thegoat12-crypto",
  },

  // `key` renvoie au libellé traduit dans translations.skills.categories
  skills: [
    { key: "languages", items: ["Python", "JavaScript", "Dart", "SQL", "HTML", "CSS", "R"] },
    { key: "frameworks", items: ["Django", "Laravel", "React", "Next.js", "Flutter"] },
    { key: "databases", items: ["PostgreSQL", "MySQL"] },
    { key: "data", items: ["Pandas", "NumPy", "Matplotlib", "Régression linéaire"] },
    { key: "tools", items: ["Git/GitHub", "Docker", "Vercel"] },
  ],

  // Écoles et entreprises (utilisées par le Parcours et la Formation).
  // logo: déposez le fichier dans /public/logos/ puis indiquez son chemin,
  // ex. "/logos/esatic.png" (PNG ou SVG, fond transparent ou blanc, carré de préférence).
  // Tant que logo vaut null, un badge avec les initiales est affiché.
  orgs: {
    esatic: { name: "ESATIC", initials: "ES", color: "cyan", logo: null },
    iit: { name: "Institut Ivoirien de Technologie", initials: "IIT", color: "yellow", logo: null },
    blo: { name: "Blo", initials: "BLO", color: "pink", logo: null },
    ebenyx: { name: "Ebenyx Technologies", initials: "EX", color: "cyan", logo: null },
    worlddatalab: { name: "World Data Lab", initials: "WDL", color: "yellow", logo: null },
  },

  // Liens, technos et images des projets, dans le même ordre que translations.projects.items.
  // github: null → pas de bouton (dépôt privé ou inexistant).
  // images: captures d'écran à déposer dans /public/projets/, ex. ["/projets/parfumerie-1.png", ...].
  //   Tant que la liste est vide, des illustrations dessinées défilent à la place.
  projects: [
    { id: "parfumerie", stack: ["Next.js", "React", "Django", "PostgreSQL"], github: "https://github.com/thegoat12-crypto/perfume-ecommerce", color: "pink", kind: "web", images: [] },
    { id: "oquartier", stack: ["Flutter", "Dart"], github: null, color: "cyan", kind: "mobile", images: [] },
    { id: "flotte", stack: ["Django", "PostgreSQL"], github: null, color: "yellow", kind: "dashboard", images: [] },
  ],
};

export const skillCount = profile.skills.reduce((n, group) => n + group.items.length, 0);
