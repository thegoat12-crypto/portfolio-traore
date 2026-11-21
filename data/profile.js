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

  // Liens et technos des projets, dans le même ordre que translations.projects.items.
  // github: null → pas de bouton (dépôt privé ou inexistant).
  projects: [
    { id: "parfumerie", stack: ["Next.js", "React", "Django", "PostgreSQL"], github: "https://github.com/thegoat12-crypto/perfume-ecommerce", color: "pink" },
    { id: "oquartier", stack: ["Flutter", "Dart"], github: null, color: "cyan" },
    { id: "flotte", stack: ["Django", "PostgreSQL"], github: null, color: "yellow" },
  ],
};

export const skillCount = profile.skills.reduce((n, group) => n + group.items.length, 0);
