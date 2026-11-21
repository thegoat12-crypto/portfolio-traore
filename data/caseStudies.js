// Études de cas détaillées des projets (FR / EN, même structure).
// Source : présentation et notebook du hackathon (dépôt public hackathon-wdl-chomage).

const NB = " ";

export const caseStudies = {
  "hackathon-wdl-chomage": {
    github: "https://github.com/thegoat12-crypto/hackathon-wdl-chomage",
    figures: [
      { src: "/projets/data-2.webp", w: 1400, h: 518 },
      { src: "/projets/data-3.webp", w: 1400, h: 629 },
      { src: "/projets/data-4.webp", w: 1335, h: 735 },
      { src: "/projets/data-5.webp", w: 1400, h: 693 },
      { src: "/projets/data-1.webp", w: 1400, h: 694 },
    ],
    fr: {
      back: "Retour au portfolio",
      caption: "ÉTUDE DE CAS",
      event: "Hackathon Data for Development — World Data Lab · Mai 2026",
      title: "Chômage des jeunes femmes en Côte d'Ivoire : prévisions 2025–2035",
      subtitle: "Axe B — Prévision · Axe C — Disparités de genre",
      keyFigureLabel: "jeunes femmes hors du marché du travail",
      keyFigure: `1${NB}205${NB}974`,
      facts: [
        { label: "Rôle", value: "Analyse, modélisation et présentation (projet individuel)" },
        { label: "Données", value: "Africa Youth Employment Clock (World Data Lab), filtrées sur la Côte d'Ivoire (CIV)" },
        { label: "Outils", value: "Python, Pandas, NumPy, SciPy, Matplotlib, Seaborn, API Claude" },
      ],
      sections: [
        {
          title: "1. Contexte et question",
          body: [
            "En Côte d'Ivoire, malgré la croissance économique, le chômage touche les jeunes de façon inégale, avec une forte pénalité pour les femmes. L'enjeu : mesurer l'ampleur de cette disparité, en comprendre les causes et estimer le coût de l'inaction.",
            `Question centrale${NB}: comment évoluerait le taux de chômage des jeunes femmes d'ici 2035, et que pourrait changer une politique d'inclusion active${NB}?`,
          ],
        },
        {
          title: "2. Données et préparation",
          body: [
            "Extraction des 7 bases de l'Africa Youth Employment Clock, filtrées pour isoler la Côte d'Ivoire. Fichiers finaux allégés : chômage par niveau d'éducation, jeunes sans emploi ni études (NEET), emploi rural et urbain, emploi formel et informel par secteur.",
            "Agrégation par genre et par année, calcul des écarts femmes/hommes et conversion en pourcentages.",
          ],
        },
        {
          title: "3. Méthode en quatre temps",
          steps: [
            { k: "Regarder", v: "analyse exploratoire des tendances par genre, zone géographique et niveau d'éducation." },
            { k: "Comprendre", v: "identifier les facteurs bloquants, comme le poids du secteur informel." },
            { k: "Prévoir", v: "régression linéaire (OLS) avec intervalle de confiance à 95 %, projection 2026–2035 selon deux scénarios." },
            { k: "Agir", v: "traduire les résultats en recommandations de politiques publiques avec l'IA générative (API Claude)." },
          ],
        },
      ],
      resultsTitle: "4. Ce que montrent les données",
      figureCaptions: [
        "L'écart de chômage entre femmes et hommes ne se réduit plus depuis 2019, et le taux NEET féminin est environ le double de celui des hommes.",
        "Le diplôme ne gomme pas l'inégalité : à niveau d'études égal, les femmes restent plus touchées par le chômage que les hommes.",
        "Dans presque tous les secteurs, moins de 20 % des femmes ont un emploi officiel (formel).",
        "Paradoxe géographique : le chômage féminin est plus élevé en ville qu'au village, faute d'accès à l'emploi formel urbain.",
        `Deux scénarios pour 2035${NB}: 14,4${NB}% de chômage sans changement (statu quo), 11,4${NB}% avec une politique d'inclusion active, soit 3 points de moins. La zone ombrée représente l'intervalle de confiance à 95${NB}%.`,
      ],
      recoTitle: "5. Recommandations",
      recos: [
        { k: "Éducation", v: "cibler la scolarisation secondaire en zone rurale pour briser le plafond de verre." },
        { k: "Formalisation", v: "incitations fiscales pour intégrer les jeunes femmes dans le secteur formel." },
        { k: "Numérique", v: "former aux métiers du digital, un secteur à forte valeur ajoutée." },
      ],
      conclusionTitle: "Conclusion",
      conclusion: `Atteindre l'équité d'ici 2035 est possible (jusqu'à 21${NB}% de chômage féminin en moins), mais cela exige une politique d'inclusion active, immédiate et ciblée.`,
      learnedTitle: "Ce que j'en retiens",
      learned: [
        "Partir d'une question claire et d'un public cible (décideurs publics) guide tous les choix d'analyse.",
        "Toujours accompagner une prévision de son incertitude : l'intervalle de confiance fait partie du message.",
        "L'IA générative est utile pour formuler des recommandations, à condition de partir de résultats chiffrés vérifiés.",
      ],
      code: "Voir le code sur GitHub",
      figureLabel: "Figure",
    },
    en: {
      back: "Back to portfolio",
      caption: "CASE STUDY",
      event: "Data for Development Hackathon — World Data Lab · May 2026",
      title: "Youth female unemployment in Côte d'Ivoire: 2025–2035 forecasts",
      subtitle: "Track B — Forecasting · Track C — Gender disparities",
      keyFigureLabel: "young women outside the labour market",
      keyFigure: "1,205,974",
      facts: [
        { label: "Role", value: "Analysis, modelling and presentation (individual project)" },
        { label: "Data", value: "Africa Youth Employment Clock (World Data Lab), filtered on Côte d'Ivoire (CIV)" },
        { label: "Tools", value: "Python, Pandas, NumPy, SciPy, Matplotlib, Seaborn, Claude API" },
      ],
      sections: [
        {
          title: "1. Context and question",
          body: [
            "In Côte d'Ivoire, despite economic growth, unemployment affects young people unequally, with a strong penalty for women. The goal: measure this gap, understand its causes and estimate the cost of doing nothing.",
            "Central question: how would youth female unemployment evolve by 2035, and what could an active inclusion policy change?",
          ],
        },
        {
          title: "2. Data and preparation",
          body: [
            "Extraction of the 7 Africa Youth Employment Clock datasets, filtered to isolate Côte d'Ivoire. Final lightweight files: unemployment by education level, youth not in employment, education or training (NEET), rural vs urban employment, formal vs informal employment by sector.",
            "Aggregation by gender and year, computation of female/male gaps and conversion to percentages.",
          ],
        },
        {
          title: "3. A four-step method",
          steps: [
            { k: "Look", v: "exploratory analysis of trends by gender, location and education level." },
            { k: "Understand", v: "identify blocking factors, such as the weight of the informal sector." },
            { k: "Forecast", v: "linear regression (OLS) with a 95% confidence interval, projecting 2026–2035 under two scenarios." },
            { k: "Act", v: "turn results into public policy recommendations with generative AI (Claude API)." },
          ],
        },
      ],
      resultsTitle: "4. What the data shows",
      figureCaptions: [
        "The female/male unemployment gap has stopped narrowing since 2019, and the female NEET rate is about twice the male rate.",
        "Degrees do not erase inequality: at the same education level, women remain more affected by unemployment than men.",
        "In almost every sector, fewer than 20% of women hold a formal job.",
        "Geographic paradox: female unemployment is higher in cities than in villages, due to limited access to formal urban jobs.",
        "Two scenarios for 2035: 14.4% unemployment with no change (status quo), 11.4% with an active inclusion policy, i.e. 3 points lower. The shaded area is the 95% confidence interval.",
      ],
      recoTitle: "5. Recommendations",
      recos: [
        { k: "Education", v: "target secondary schooling in rural areas to break the glass ceiling." },
        { k: "Formalisation", v: "tax incentives to bring young women into the formal sector." },
        { k: "Digital", v: "train for digital jobs, a high value-added sector." },
      ],
      conclusionTitle: "Conclusion",
      conclusion: "Reaching equity by 2035 is possible (up to 21% less female unemployment), but it requires an active, immediate and targeted inclusion policy.",
      learnedTitle: "What I took away",
      learned: [
        "Starting from a clear question and a target audience (policy makers) guides every analysis choice.",
        "Always present a forecast with its uncertainty: the confidence interval is part of the message.",
        "Generative AI helps phrase recommendations, as long as it starts from verified numbers.",
      ],
      code: "View the code on GitHub",
      figureLabel: "Figure",
    },
  },
};
