# Contexte du projet — à coller au début d'une conversation avec une IA

> Copie tout ce fichier dans une nouvelle conversation (Claude, ChatGPT…) et ajoute ta demande à la fin. L'IA saura où en est le portfolio, comment le code est organisé et comment le mettre en ligne. Le détail technique fichier par fichier est dans `docs/GUIDE.md`.

## 1. Qui je suis

- **Traoré Zié Mohamed Allassane Junior** — Abidjan (Angré, Cocody), Côte d'Ivoire.
- Étudiant en **Master 2 Big Data & IA (BIHAR) — ESATIC / ESTIA**, Licence Informatique & Génie Logiciel (IIT, 2024).
- Recherche : **stage de 6 mois en Data / IA** (ou développement fullstack), disponible immédiatement.
- Expériences : stagiaire consultant junior chez **Blo SARL** (déc. 2024 – jan. 2026, GRC bancaire sur SoftExpert) ; stagiaire développeur chez **Ebenyx Technologies** (2023, Java/Angular JSF) ; **hackathon World Data Lab** (mai 2026) ; **Ivoire-Culture Connect** (bornes IoT, 2e place, 2025).
- Compétences : Python, SQL, R, JavaScript, Pandas, NumPy, régression OLS, Power BI, Excel, Matplotlib, Django, React, Next.js, Flutter, PostgreSQL, MySQL, Git, Docker, Vercel, Ollama.
- Langues : français (C2), anglais (B1).

## 2. Le portfolio

- **En ligne** : https://traoremhd.vercel.app (hébergé sur Vercel).
- **Code** : https://github.com/thegoat12-crypto/portfolio-traore — branche **`main`** = version en ligne. Chaque push / fusion sur `main` est mis en ligne automatiquement par Vercel en 1 à 2 minutes.
- **Sur mon PC** : `C:\Dev\portfolio-traore`, ouvert avec **GitHub Desktop** (Pull origin → modifications → Commit to main → Push origin) et **VS Code** (`npm install`, puis `npm run dev` → http://localhost:3000).
- **Technique** : Next.js 16.4.6 (App Router, JavaScript, pas TypeScript), React 19, Tailwind CSS 4, polices via `next/font`, pas de base de données (contenu dans `data/`). ⚠️ Next.js 16 diffère des anciennes versions : lire `node_modules/next/dist/docs/` avant d'écrire du code (voir `AGENTS.md`).

### Direction artistique (à respecter)
Style **comics « Spider-Verse » original** (aucun logo, nom ou image Marvel) : couleurs rose `#ff2e88`, cyan `#00c2d1`, jaune `#ffd400`, encre `#0a0a12`, papier `#f5f3ec` ; police Anton (titres, avec décalage cyan/rose « misprint »), Inter, Space Mono, Bangers ; trames de points, encadrés « ÉPISODE 0X », thème clair / sombre (bouton noir « SOMBRE » / blanc « CLAIR »), bilingue FR / EN. Animations douces et légères (uniquement `transform` / `opacity`), coupées si l'utilisateur a demandé moins d'animations. Le site doit rester **fluide et lisible pour un recruteur**.

### Ce que contient le site (dans l'ordre)
1. **Intro** : grande télé cathodique réaliste, éteinte au départ ; clic « Allumer la télé » → son de télé (synthétisé, Web Audio) + neige + mon personnage BD à l'écran → la musique de fond démarre. Jouée **une seule fois par chargement** du site (pas au retour d'une page projet).
2. **Accueil** : nom complet (nom de famille en premier, « TRAORÉ » en très grand), fiche « disponible », heure d'Abidjan, ville de nuit animée, boutons contact / projets / CV.
3. **Profil** : personnage BD + vraie photo en Polaroid, infos, langues, centres d'intérêt, bouton CV.
4. **Compétences** : bandeau de logos qui défile + catégories.
5. **Parcours** : **livre de BD** dont les pages se tournent en 3D ; bouton « En savoir plus » vers une page détaillée.
6. **Projets** : 4 cartes avec diaporama de captures + bouton « Lire l'étude de cas » : projet Data (hackathon World Data Lab, code sur https://github.com/thegoat12-crypto/hackathon-wdl-chomage), Monster (assistant IA local, Ollama + Qwen3 4B), Manus Scents (e-commerce parfums Next.js + Django REST + Expo, https://github.com/thegoat12-crypto/perfume-ecommerce), Oquartier (projet de groupe Flutter, images = maquettes illustratives).
7. **Formation**, **Contact** (formulaire **Web3Forms** qui envoie directement dans mon Gmail), pied de page.
- **Pages détaillées** : `/projets/[slug]` et `/parcours/[slug]`.
- **Musique** : boucle lo-fi originale (`public/audio/lofi-tzm.mp3`), activée par défaut au premier clic, bouton « SON » en bas à droite.
- **Statistiques** : Vercel Analytics.

### Où modifier quoi
| Je veux changer… | Fichier |
|---|---|
| Textes FR / EN | `data/translations.js` |
| Contact, compétences, CV, **photo**, personnage, logos, images et liens des projets | `data/profile.js` |
| Pages détaillées | `data/caseStudies.js` (projet Data) et `data/caseStudiesMore.js` (les autres) |
| Couleurs, animations | `app/globals.css` |
| Sécurité (CSP, en-têtes) | `next.config.mjs` |
| Fichiers (images, CV, logos, musique) | `public/` → chemin écrit **sans** `public`, ex. `"/projets/data-1.webp"` |

### Sécurité
- Next.js maintenu à jour, `npm audit` = 0 vulnérabilité, Dependabot activé sur GitHub.
- En-têtes dans `next.config.mjs` : CSP stricte (seul service externe autorisé : `api.web3forms.com`), HSTS, anti-iframe, nosniff… **Tout nouveau service externe doit être ajouté à la CSP**, sinon il est bloqué.
- Aucune clé secrète dans le code (la clé Web3Forms est publique par conception).

## 3. Ce qui reste à faire
- [ ] **Remplacer la photo du CV** par une belle photo en veste (voir section 4).
- [x] Section **Certifications** (Kaggle Pandas, Kaggle Intro to ML, 2 badges Microsoft Learn Power BI — nov. 2026). Pour en ajouter : `profile.certifications` + `translations.certifications.items` + image dans `public/certifs/`.
- [ ] CV sans adresse postale détaillée (facultatif, par précaution).
- [ ] Publier le code de Monster sur GitHub (vérifier qu'il ne contient aucune clé).
- [ ] Nom de domaine personnel (facultatif).

## 4. Changer ma photo (procédure)
1. Photo **portrait verticale (format 3:4)**, au moins **1000 px de haut**, de préférence en `.jpg` ou `.webp`.
2. Remplacer le fichier **`public/photo-zie.jpg`** par la nouvelle photo, **avec le même nom** → rien d'autre à modifier.
   - Si le nom change (ex. `photo-zie-2026.jpg`), modifier la ligne `photo: "/photo-zie.jpg",` dans **`data/profile.js`**.
3. Où elle apparaît : Polaroid de la section Profil (`components/ui/Portrait.js`). Le personnage BD (`public/avatar-tzm.webp`, ligne `avatar:` de `data/profile.js`) reste dans l'intro et le Profil ; pour le remplacer, même procédure.
4. Vérifier avec `npm run dev`, puis Commit to main → Push origin.

## 5. Autre projet lié : sites de restaurants (« Restaurant Pro »)
Projet séparé (dossier `restaurant-pro`, pas dans ce dépôt) : une base de code Next.js 16 + routes API + base SQLite (libSQL / Drizzle, Turso en ligne) + espace restaurateur `/admin` (commandes, réservations, menu, paramètres), configurable pour plusieurs restaurants (`restaurants/*.mjs`, `node scripts/setup.mjs <restaurant>`). Démos préparées pour Chez Fatou-K, Chawarma Ivoire et Le Bunker (Angré, face à Petro Ivoire) — contenu d'exemple, à ne publier qu'avec l'accord du restaurant. Voir son `README.md`.
