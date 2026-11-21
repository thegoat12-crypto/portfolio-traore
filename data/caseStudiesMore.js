// Études de cas des autres projets et des expériences (FR / EN, même structure).
// Rédigées à partir du CV, des captures et du code fournis : aucun chiffre inventé.

const NB = " ";

const labels = {
  fr: { back: "Retour au portfolio", figureLabel: "Image", code: "Voir le code sur GitHub" },
  en: { back: "Back to portfolio", figureLabel: "Image", code: "View the code on GitHub" },
};

export const moreCaseStudies = {
  /* ------------------------------ PROJETS ------------------------------ */
  monster: {
    kind: "projets",
    back: "/#projets",
    figures: [
      { src: "/projets/monster-1.webp", w: 1040, h: 400 },
      { src: "/projets/monster-2.webp", w: 1040, h: 955 },
    ],
    fr: {
      ...labels.fr,
      caption: "ÉTUDE DE CAS · IA",
      event: "Projet personnel · 2026",
      title: "Monster — un assistant IA personnel qui tourne en local",
      subtitle: "Python · Ollama · Qwen3 4B · mémoire automatique · recherche web",
      keyFigure: `100${NB}%`,
      keyFigureLabel: "local : aucune donnée envoyée à un service d'IA en ligne",
      facts: [
        { label: "Rôle", value: "Conception et développement (projet individuel)" },
        { label: "Interface", value: "Ligne de commande (terminal)" },
        { label: "Technologies", value: "Python (bibliothèque standard), Ollama, modèle Qwen3 4B, JSON" },
      ],
      sections: [
        {
          title: "1. L'idée",
          body: [
            "Avoir un assistant conversationnel à soi, gratuit et privé : le modèle de langage tourne sur l'ordinateur grâce à Ollama, sans abonnement ni envoi des conversations à un service externe.",
            "Monster devait aussi dépasser les limites d'un modèle local : connaître l'actualité et se souvenir de l'utilisateur d'une session à l'autre.",
          ],
        },
        {
          title: "2. Comment il fonctionne",
          steps: [
            { k: "Dialogue", v: "chaque message est envoyé à l'API locale d'Ollama (localhost:11434) avec l'historique récent ; la réponse du modèle Qwen3 4B s'affiche dans le terminal." },
            { k: "Recherche Internet", v: "quand une question demande des informations récentes, Monster interroge le web, extrait le texte des pages (urllib, HTMLParser) et le donne au modèle pour répondre." },
            { k: "Mémoire automatique", v: "les informations utiles sur l'utilisateur sont enregistrées dans memoire.json et rechargées à chaque lancement." },
            { k: "Historique", v: "les conversations sont sauvegardées dans conversation.json ; des commandes comme /aide et /quitter pilotent l'assistant." },
          ],
        },
        {
          title: "3. Choix techniques",
          body: [
            "Python sans framework lourd : les requêtes HTTP, l'analyse HTML et la gestion des fichiers utilisent la bibliothèque standard, ce qui rend l'outil léger et facile à installer.",
            "Un modèle de 4 milliards de paramètres, compromis entre qualité des réponses et rapidité sur un ordinateur personnel.",
          ],
        },
      ],
      figureCaptions: [
        "Lancement de MONSTER v2 : modèle, mémoire automatique et recherche Internet activés.",
        "Le code (monster.py) et la conversation dans le terminal de VS Code.",
      ],
      conclusionTitle: "Prochaines étapes",
      conclusion: "Une interface web ou mobile, et un déploiement pour l'utiliser ailleurs que dans le terminal.",
      learnedTitle: "Ce que j'en retiens",
      learned: [
        "Faire fonctionner un LLM en local avec Ollama et piloter son API.",
        "Compléter un modèle par des outils (recherche web) et une mémoire persistante : le principe des agents IA.",
        "Penser confidentialité dès la conception.",
      ],
    },
    en: {
      ...labels.en,
      caption: "CASE STUDY · AI",
      event: "Personal project · 2026",
      title: "Monster — a personal AI assistant running locally",
      subtitle: "Python · Ollama · Qwen3 4B · automatic memory · web search",
      keyFigure: "100%",
      keyFigureLabel: "local: no data sent to an online AI service",
      facts: [
        { label: "Role", value: "Design and development (individual project)" },
        { label: "Interface", value: "Command line (terminal)" },
        { label: "Tech", value: "Python (standard library), Ollama, Qwen3 4B model, JSON" },
      ],
      sections: [
        {
          title: "1. The idea",
          body: [
            "A conversational assistant of my own, free and private: the language model runs on the computer through Ollama, with no subscription and no conversations sent to an external service.",
            "Monster also had to go beyond the limits of a local model: know about recent events and remember the user from one session to the next.",
          ],
        },
        {
          title: "2. How it works",
          steps: [
            { k: "Chat", v: "each message is sent to Ollama's local API (localhost:11434) with recent history; the Qwen3 4B answer is printed in the terminal." },
            { k: "Web search", v: "when a question needs recent information, Monster searches the web, extracts page text (urllib, HTMLParser) and feeds it to the model." },
            { k: "Automatic memory", v: "useful facts about the user are stored in memoire.json and reloaded at every launch." },
            { k: "History", v: "conversations are saved in conversation.json; commands such as /aide and /quitter control the assistant." },
          ],
        },
        {
          title: "3. Technical choices",
          body: [
            "Python without heavy frameworks: HTTP requests, HTML parsing and file handling rely on the standard library, keeping the tool light and easy to install.",
            "A 4-billion-parameter model, a trade-off between answer quality and speed on a personal computer.",
          ],
        },
      ],
      figureCaptions: [
        "MONSTER v2 starting: model, automatic memory and web search enabled.",
        "The code (monster.py) and the conversation in the VS Code terminal.",
      ],
      conclusionTitle: "Next steps",
      conclusion: "A web or mobile interface, and a deployment to use it outside the terminal.",
      learnedTitle: "What I took away",
      learned: [
        "Running an LLM locally with Ollama and driving its API.",
        "Extending a model with tools (web search) and persistent memory: the core idea of AI agents.",
        "Designing with privacy in mind from the start.",
      ],
    },
  },

  "manus-scents": {
    kind: "projets",
    back: "/#projets",
    github: "https://github.com/thegoat12-crypto/perfume-ecommerce",
    figures: [
      { src: "/projets/parfum-1.webp", w: 1400, h: 661 },
      { src: "/projets/parfum-2.webp", w: 1400, h: 686 },
      { src: "/projets/parfum-3.webp", w: 1400, h: 688 },
      { src: "/projets/parfum-4.webp", w: 1400, h: 574 },
    ],
    fr: {
      ...labels.fr,
      caption: "ÉTUDE DE CAS · WEB & MOBILE",
      event: "Projet personnel · 2026",
      title: "Manus Scents — une boutique en ligne de parfums de niche",
      subtitle: "Next.js · React · Django REST · JWT · application mobile Expo",
      keyFigure: "3",
      keyFigureLabel: "applications : API Django, site Next.js et application mobile",
      facts: [
        { label: "Rôle", value: "Développement fullstack (projet individuel)" },
        { label: "Front", value: "Next.js / React (site web) et React Native / Expo (mobile)" },
        { label: "Back", value: "Django, Django REST Framework, authentification JWT" },
      ],
      sections: [
        {
          title: "1. Le parcours client",
          steps: [
            { k: "Découvrir", v: "page d'accueil éditoriale, puis la collection avec image, nom et prix de chaque parfum." },
            { k: "Choisir", v: "fiche produit avec la maison, le prix, la pyramide olfactive (notes) et la description." },
            { k: "Se faire conseiller", v: "le « diagnostic olfactif », un quiz (univers préféré, occasion…) qui oriente vers un parfum." },
            { k: "Acheter", v: "panier, création de compte, connexion et commande." },
          ],
        },
        {
          title: "2. Architecture",
          body: [
            "Le back-end Django expose une API REST : catégories, produits et commandes. La connexion repose sur des jetons JWT, et l'inscription a son propre point d'accès. L'administration Django sert à gérer le catalogue.",
            "Le modèle de données relie marques, catégories, notes olfactives et produits (avec stock et image). Chaque commande garde le prix de chaque article au moment de l'achat, et suit un statut (en attente, etc.).",
            "Le même back-end alimente le site Next.js et l'application mobile Expo (accueil, exploration, panier, paiement, quiz).",
          ],
        },
      ],
      figureCaptions: [
        "Accueil : « Découvrez votre signature olfactive ».",
        "La collection : chaque parfum avec son image et son prix.",
        "Fiche produit : maison, prix, pyramide olfactive, ajout au panier et favoris.",
        "Connexion au compte client.",
      ],
      conclusionTitle: "Prochaines étapes",
      conclusion: "Paiement en ligne, mise en production (base PostgreSQL, hébergement) et recommandations du quiz affinées par les achats.",
      learnedTitle: "Ce que j'en retiens",
      learned: [
        "Concevoir une API REST réutilisée par deux clients (web et mobile).",
        "Sécuriser l'authentification avec des jetons JWT.",
        "Soigner une direction artistique « luxe » : typographie, espaces, sobriété.",
      ],
    },
    en: {
      ...labels.en,
      caption: "CASE STUDY · WEB & MOBILE",
      event: "Personal project · 2026",
      title: "Manus Scents — an online store for niche perfumes",
      subtitle: "Next.js · React · Django REST · JWT · Expo mobile app",
      keyFigure: "3",
      keyFigureLabel: "apps: Django API, Next.js website and mobile app",
      facts: [
        { label: "Role", value: "Fullstack development (individual project)" },
        { label: "Front", value: "Next.js / React (web) and React Native / Expo (mobile)" },
        { label: "Back", value: "Django, Django REST Framework, JWT authentication" },
      ],
      sections: [
        {
          title: "1. The customer journey",
          steps: [
            { k: "Discover", v: "editorial home page, then the collection with each perfume's image, name and price." },
            { k: "Choose", v: "product page with house, price, olfactory pyramid (notes) and description." },
            { k: "Get advice", v: "the \"olfactory diagnosis\", a quiz (favourite mood, occasion…) that points to a perfume." },
            { k: "Buy", v: "cart, account creation, login and order." },
          ],
        },
        {
          title: "2. Architecture",
          body: [
            "The Django back end exposes a REST API: categories, products and orders. Login uses JWT tokens and registration has its own endpoint. The Django admin manages the catalogue.",
            "The data model links brands, categories, olfactory notes and products (with stock and image). Each order keeps every item's price at purchase time and tracks a status (pending, etc.).",
            "The same back end powers the Next.js website and the Expo mobile app (home, explore, cart, checkout, quiz).",
          ],
        },
      ],
      figureCaptions: [
        "Home: \"Discover your olfactory signature\".",
        "The collection: each perfume with its image and price.",
        "Product page: house, price, olfactory pyramid, add to cart and wishlist.",
        "Customer login.",
      ],
      conclusionTitle: "Next steps",
      conclusion: "Online payment, production deployment (PostgreSQL, hosting) and quiz recommendations refined by purchases.",
      learnedTitle: "What I took away",
      learned: [
        "Designing a REST API shared by two clients (web and mobile).",
        "Securing authentication with JWT tokens.",
        "Crafting a \"luxury\" art direction: typography, white space, restraint.",
      ],
    },
  },

  oquartier: {
    kind: "projets",
    back: "/#projets",
    fr: {
      ...labels.fr,
      caption: "PROJET DE GROUPE · MOBILE",
      event: "Projet de groupe · 2024",
      title: "Oquartier — les services du quartier dans la poche",
      subtitle: "Flutter · Dart · application mobile",
      facts: [
        { label: "Cadre", value: "Projet de groupe" },
        { label: "Technologies", value: "Flutter, Dart" },
        { label: "Code", value: "Plus disponible ; pas de captures d'origine" },
      ],
      sections: [
        {
          title: "1. Le besoin",
          body: [
            "Dans un quartier, trouver vite un plombier, une coiffeuse, un électricien ou un couturier de confiance passe souvent par le bouche-à-oreille. Oquartier met en relation les résidents avec les prestataires de services de proximité.",
          ],
        },
        {
          title: "2. Les fonctionnalités prévues",
          steps: [
            { k: "Rechercher", v: "trouver un prestataire par type de service." },
            { k: "Localiser", v: "voir les prestataires proches sur une carte du quartier." },
            { k: "Comparer", v: "consulter le profil et les avis d'un prestataire." },
            { k: "Contacter", v: "échanger avec lui et réserver un créneau." },
          ],
        },
      ],
      conclusionTitle: "Note",
      conclusion: "Le code n'étant plus disponible, les images de la carte du projet sont des maquettes illustratives, et non des captures de l'application.",
      learnedTitle: "Ce que j'en retiens",
      learned: [
        "Développer une application mobile multiplateforme avec Flutter.",
        "Travailler en équipe sur un même produit : répartition des tâches et intégration.",
        "Partir d'un besoin concret et local.",
      ],
    },
    en: {
      ...labels.en,
      caption: "GROUP PROJECT · MOBILE",
      event: "Group project · 2024",
      title: "Oquartier — neighbourhood services in your pocket",
      subtitle: "Flutter · Dart · mobile app",
      facts: [
        { label: "Setting", value: "Group project" },
        { label: "Tech", value: "Flutter, Dart" },
        { label: "Code", value: "No longer available; no original screenshots" },
      ],
      sections: [
        {
          title: "1. The need",
          body: [
            "In a neighbourhood, quickly finding a trusted plumber, hairdresser, electrician or tailor often relies on word of mouth. Oquartier connects residents with nearby service providers.",
          ],
        },
        {
          title: "2. Planned features",
          steps: [
            { k: "Search", v: "find a provider by type of service." },
            { k: "Locate", v: "see nearby providers on a neighbourhood map." },
            { k: "Compare", v: "check a provider's profile and reviews." },
            { k: "Contact", v: "message them and book a slot." },
          ],
        },
      ],
      conclusionTitle: "Note",
      conclusion: "As the code is no longer available, the images on the project card are illustrative mock-ups, not screenshots of the app.",
      learnedTitle: "What I took away",
      learned: [
        "Building a cross-platform mobile app with Flutter.",
        "Working as a team on one product: splitting tasks and integrating.",
        "Starting from a concrete, local need.",
      ],
    },
  },

  /* ------------------------------ PARCOURS ------------------------------ */
  "blo-sarl": {
    kind: "parcours",
    back: "/#experience",
    fr: {
      ...labels.fr,
      caption: "STAGE · CONSEIL",
      event: "Déc. 2024 — Jan. 2026 · Blo SARL",
      title: "Stagiaire consultant junior — Blo SARL",
      subtitle: "Secteur bancaire · GRC · plateforme SoftExpert",
      keyFigure: `14${NB}mois`,
      keyFigureLabel: "de stage en environnement client",
      facts: [
        { label: "Entreprise", value: "Blo SARL, cabinet de conseil en management" },
        { label: "Clients", value: "Secteur bancaire" },
        { label: "Outil", value: "SoftExpert (gestion des processus métiers et GRC)" },
      ],
      sections: [
        {
          title: "1. Le contexte",
          body: [
            "La GRC (gouvernance, gestion des risques et conformité) aide les banques à suivre leurs risques, leurs contrôles et leurs obligations réglementaires. Blo SARL accompagne ses clients dans la mise en place de ces processus sur la solution SoftExpert.",
          ],
        },
        {
          title: "2. Mes missions",
          steps: [
            { k: "Formulaires", v: "configuration des formulaires de saisie utilisés par les équipes des clients." },
            { k: "Processus", v: "modélisation et automatisation de processus métiers (circuits de validation, étapes, responsables)." },
            { k: "Déploiement", v: "mise en place des configurations dans les environnements des clients." },
            { k: "Accès", v: "création des utilisateurs et gestion de leurs droits d'accès." },
          ],
        },
      ],
      learnedTitle: "Ce que j'en retiens",
      learned: [
        "Traduire un besoin métier en processus automatisé.",
        "Les exigences du secteur bancaire : traçabilité, contrôle des accès, conformité.",
        "Travailler en relation directe avec des clients et en environnement de production.",
      ],
    },
    en: {
      ...labels.en,
      caption: "INTERNSHIP · CONSULTING",
      event: "Dec 2024 — Jan 2026 · Blo SARL",
      title: "Junior Consultant Intern — Blo SARL",
      subtitle: "Banking sector · GRC · SoftExpert platform",
      keyFigure: "14 months",
      keyFigureLabel: "of internship in client environments",
      facts: [
        { label: "Company", value: "Blo SARL, management consulting firm" },
        { label: "Clients", value: "Banking sector" },
        { label: "Tool", value: "SoftExpert (business process management and GRC)" },
      ],
      sections: [
        {
          title: "1. Context",
          body: [
            "GRC (governance, risk and compliance) helps banks track their risks, controls and regulatory obligations. Blo SARL supports its clients in setting up these processes on the SoftExpert platform.",
          ],
        },
        {
          title: "2. My missions",
          steps: [
            { k: "Forms", v: "configuring the input forms used by client teams." },
            { k: "Processes", v: "modelling and automating business processes (approval flows, steps, owners)." },
            { k: "Deployment", v: "rolling out configurations to client environments." },
            { k: "Access", v: "creating users and managing their access rights." },
          ],
        },
      ],
      learnedTitle: "What I took away",
      learned: [
        "Turning a business need into an automated process.",
        "Banking-sector requirements: traceability, access control, compliance.",
        "Working directly with clients and in production environments.",
      ],
    },
  },

  "ivoire-culture-connect": {
    kind: "parcours",
    back: "/#experience",
    fr: {
      ...labels.fr,
      caption: "RÉALISATION · IoT",
      event: "2025 · Projet ESATIC",
      title: "Ivoire-Culture Connect — la borne interactive culturelle",
      subtitle: "IoT · bornes interactives intelligentes · 2ᵉ place",
      keyFigure: "2ᵉ",
      keyFigureLabel: "place du concours",
      facts: [
        { label: "Cadre", value: "Projet ESATIC" },
        { label: "Domaine", value: "Internet des objets (IoT)" },
        { label: "Objectif", value: "Promouvoir l'histoire et la culture de la Côte d'Ivoire" },
      ],
      sections: [
        {
          title: "1. Le projet",
          body: [
            "Concevoir et installer des bornes interactives intelligentes qui font découvrir l'histoire et la culture ivoiriennes au public, de façon ludique et accessible.",
          ],
        },
        {
          title: "2. Ce que fait une borne",
          steps: [
            { k: "Présenter", v: "des contenus sur l'histoire, les traditions et le patrimoine du pays." },
            { k: "Interagir", v: "le visiteur choisit ses contenus sur la borne." },
            { k: "Connecter", v: "des bornes reliées entre elles et à leurs contenus, propres à l'IoT." },
          ],
        },
      ],
      conclusionTitle: "Résultat",
      conclusion: "Le projet a obtenu la 2ᵉ place.",
      learnedTitle: "Ce que j'en retiens",
      learned: [
        "Associer matériel et logiciel dans un objet connecté.",
        "Concevoir pour le grand public : simplicité et clarté.",
        "Présenter et défendre un projet devant un jury.",
      ],
    },
    en: {
      ...labels.en,
      caption: "ACHIEVEMENT · IoT",
      event: "2025 · ESATIC project",
      title: "Ivoire-Culture Connect — the interactive cultural kiosk",
      subtitle: "IoT · smart interactive kiosks · 2nd place",
      keyFigure: "2nd",
      keyFigureLabel: "place in the competition",
      facts: [
        { label: "Setting", value: "ESATIC project" },
        { label: "Field", value: "Internet of Things (IoT)" },
        { label: "Goal", value: "Promote the history and culture of Côte d'Ivoire" },
      ],
      sections: [
        {
          title: "1. The project",
          body: [
            "Design and install smart interactive kiosks that introduce the public to Ivorian history and culture in a playful, accessible way.",
          ],
        },
        {
          title: "2. What a kiosk does",
          steps: [
            { k: "Present", v: "content about the country's history, traditions and heritage." },
            { k: "Interact", v: "visitors choose their content on the kiosk." },
            { k: "Connect", v: "kiosks linked to each other and to their content, as in any IoT system." },
          ],
        },
      ],
      conclusionTitle: "Result",
      conclusion: "The project won 2nd place.",
      learnedTitle: "What I took away",
      learned: [
        "Combining hardware and software in a connected object.",
        "Designing for the general public: simplicity and clarity.",
        "Presenting and defending a project in front of a jury.",
      ],
    },
  },

  ebenyx: {
    kind: "parcours",
    back: "/#experience",
    fr: {
      ...labels.fr,
      caption: "STAGE · DÉVELOPPEMENT",
      event: "2023 · 3 mois · Ebenyx Technologies",
      title: "Stagiaire développeur — Ebenyx Technologies",
      subtitle: "Java · Angular · JSF",
      keyFigure: `3${NB}mois`,
      keyFigureLabel: "premier stage en entreprise",
      facts: [
        { label: "Entreprise", value: "Ebenyx Technologies" },
        { label: "Technologies", value: "Java, Angular, JSF (JavaServer Faces)" },
      ],
      sections: [
        {
          title: "1. Mes missions",
          steps: [
            { k: "Développer", v: "participer au développement de projets en Java côté serveur." },
            { k: "Interfaces", v: "réaliser des écrans avec Angular et JSF." },
            { k: "S'intégrer", v: "suivre l'organisation et les outils d'une équipe de développement." },
          ],
        },
      ],
      learnedTitle: "Ce que j'en retiens",
      learned: [
        "Découvrir le développement en entreprise : délais, revues, travail d'équipe.",
        "Renforcer mes bases en Java et en développement web.",
        "M'adapter rapidement à un environnement dynamique.",
      ],
    },
    en: {
      ...labels.en,
      caption: "INTERNSHIP · DEVELOPMENT",
      event: "2023 · 3 months · Ebenyx Technologies",
      title: "Developer Intern — Ebenyx Technologies",
      subtitle: "Java · Angular · JSF",
      keyFigure: "3 months",
      keyFigureLabel: "first internship in a company",
      facts: [
        { label: "Company", value: "Ebenyx Technologies" },
        { label: "Tech", value: "Java, Angular, JSF (JavaServer Faces)" },
      ],
      sections: [
        {
          title: "1. My missions",
          steps: [
            { k: "Build", v: "take part in server-side Java development." },
            { k: "Interfaces", v: "build screens with Angular and JSF." },
            { k: "Fit in", v: "follow a development team's organisation and tools." },
          ],
        },
      ],
      learnedTitle: "What I took away",
      learned: [
        "Discovering professional development: deadlines, reviews, teamwork.",
        "Strengthening my Java and web development foundations.",
        "Adapting quickly to a dynamic environment.",
      ],
    },
  },
};
