# Guide du portfolio — comment tout fonctionne

Ce guide explique chaque partie du site, où modifier quoi, et comment le mettre en ligne. Garde-le ouvert dans VS Code quand tu travailles sur le projet.

## 1. Vue d'ensemble

- **Next.js 16** (React 19) : le framework qui construit les pages. Le dossier `app/` contient les routes (une URL = un dossier).
- **Tailwind CSS 4** : le style, écrit directement dans les `className` (`bg-pink`, `px-6`…). Les couleurs et polices sont définies en haut de `app/globals.css`.
- **Vercel** : l'hébergement. Chaque fusion dans la branche `main` sur GitHub met le site en ligne automatiquement (1 à 2 minutes).
- **Pas de base de données** : tout le contenu est dans les fichiers du dossier `data/`.

```
app/                  les pages (routes)
  layout.js           enveloppe de toutes les pages : polices, thème, intro, son, statistiques
  page.js             la page d'accueil : enchaîne les sections
  globals.css         couleurs, animations, effets BD
  opengraph-image.js  l'image d'aperçu quand on partage le lien
  icon.svg            l'icône de l'onglet
  projets/[slug]/     pages « étude de cas » des projets
  parcours/[slug]/    pages détaillées des expériences
components/
  layout/             Navbar (menu), Footer (pied de page)
  sections/           une section du site par fichier (Hero, About, Skills, Experience, Projects, Education, Contact, CaseStudy)
  ui/                 les briques réutilisables (intro, carrousel, livre BD, logos, bouton son…)
data/                 TOUT LE CONTENU — c'est ici que tu modifies 90 % du temps
lib/                  petits outils : thème, langue, son
public/               fichiers servis tels quels : CV, photos, logos, captures, musique
next.config.mjs       configuration + en-têtes de sécurité
```

## 2. Où modifier le contenu

| Je veux changer… | Fichier |
|---|---|
| Un texte (FR et EN) : bio, parcours, projets, formation, boutons | `data/translations.js` (les deux langues ont la même structure) |
| Contact, compétences, CV, photo, logos, images et liens des projets | `data/profile.js` |
| Une page détaillée (étude de cas) | `data/caseStudies.js` (projet Data) et `data/caseStudiesMore.js` (les autres) |
| Les icônes et couleurs des compétences | `data/skillIcons.js` |

**Ajouter un fichier** (photo, logo, capture) : dépose-le dans `public/…`, puis écris son chemin **sans** `public`, par exemple `"/projets/mon-image.webp"`.

## 3. Les sections de la page d'accueil

| Section | Fichier | Ce qu'elle fait |
|---|---|---|
| Intro « télé » | `components/ui/SplashScreen.js` | Télé éteinte → clic → son de télé, neige, personnage, plongée dans l'écran. Jouée une fois par chargement du site. |
| Menu | `components/layout/Navbar.js` | Liens vers les sections, surligne la section visible, langue et thème. |
| Accueil | `components/sections/Hero.js` + `ui/HeroScene.js` | Nom, présentation, boutons, compteurs, fiche « disponible », ville animée. |
| Profil | `components/sections/About.js` + `ui/Portrait.js` | Personnage BD + photo Polaroid, infos, centres d'intérêt, bouton CV. |
| Compétences | `components/sections/Skills.js` + `ui/SkillsMarquee.js` | Bandeau de logos qui défile + catégories. |
| Parcours | `components/sections/Experience.js` + `ui/ComicBook.js` | Livre de BD : une page par expérience, qui se tourne en 3D. |
| Projets | `components/sections/Projects.js` + `ui/ProjectCarousel.js` | Cartes avec diaporama de captures, liens vers le code et l'étude de cas. |
| Formation | `components/sections/Education.js` | Diplômes avec logos et sceau qui tourne. |
| Contact | `components/sections/Contact.js` | Formulaire envoyé par **Web3Forms** (la clé est dans `profile.js`), liens. |
| Pied de page | `components/layout/Footer.js` | Appel à l'action, bandeau défilant. |

## 4. Fonctionnalités transverses

- **Langue FR/EN** : `contexts/LanguageContext.js` + `lib/clientStores.js`. Chaque composant lit les textes avec `const { t } = useLanguage();` puis `t.section.clé`.
- **Thème clair/sombre** : classe `dark` sur `<html>`, choisie avant l'affichage par un petit script dans `app/layout.js`. En CSS : `dark:bg-ink`.
- **Son** : `lib/sound.js` (musique de fond `public/audio/lofi-tzm.mp3` + son de télé synthétisé) et le bouton `components/ui/SoundToggle.js`. Les navigateurs exigent un clic avant tout son.
- **Animations** : dans `app/globals.css` — apparitions au défilement (`scroll-in`), décor de fond (`BackgroundFX.js`), glitch du nom (`GlitchTitle.js`). Elles sont coupées si le visiteur a activé « réduire les animations ».
- **Statistiques** : Vercel Analytics (`<Analytics />` dans `layout.js`), visibles dans ton tableau de bord Vercel.

## 5. Sécurité

- `next.config.mjs` ajoute des en-têtes : CSP (le site ne charge rien d'extérieur sauf l'envoi du formulaire vers Web3Forms), HTTPS forcé, interdiction d'afficher le site dans une iframe, etc.
- **Si tu ajoutes un service externe** (police, vidéo YouTube, autre API), il faut l'autoriser dans la CSP de `next.config.mjs`, sinon il sera bloqué.
- Ne mets **jamais** une clé secrète dans le code : utilise un fichier `.env.local` (ignoré par Git) et les variables d'environnement de Vercel.
- Vérifie régulièrement : `npm audit` doit afficher 0 vulnérabilité ; Dependabot t'alerte sur GitHub.

## 6. Travailler sur ton PC

```bash
git clone https://github.com/thegoat12-crypto/portfolio-traore.git
cd portfolio-traore
npm install
npm run dev        # site sur http://localhost:3000, se recharge à chaque modification
```

Avant d'envoyer une modification :

```bash
npm run lint       # vérifie le code
npm run build      # vérifie que le site se construit
git add -A
git commit -m "Ce que j'ai changé"
git push           # sur main : mise en ligne automatique par Vercel
```

## 7. Problèmes fréquents

| Problème | Solution |
|---|---|
| L'ancienne version s'affiche | Ctrl + F5 (ou fermer et rouvrir l'onglet sur mobile) |
| `npm run dev` échoue après un `git pull` | Relancer `npm install` |
| Une image ne s'affiche pas | Vérifier le chemin (sans `public`) et l'extension exacte |
| Le build Vercel échoue | Lancer `npm run build` sur ton PC : l'erreur s'affiche avec le fichier et la ligne |
| Un texte n'apparaît qu'en français | Ajouter la même clé dans la partie `en` de `translations.js` |
