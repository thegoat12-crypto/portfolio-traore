# Portfolio — Zié Traoré

Portfolio personnel au style comics (inspiration « Spider-Verse » : impression décalée, trames de points, encadrés narratifs, animations saccadées à 12 images/seconde). Next.js 16, React 19, Tailwind CSS 4. Bilingue français / anglais, thème clair / sombre.

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000.

## Modifier le contenu

| Quoi | Où |
|---|---|
| Textes (FR et EN) : bio, expériences, projets, formation | `data/translations.js` |
| Contact, compétences, liens GitHub des projets, CV, photo | `data/profile.js` |
| Icônes des compétences | `data/skillIcons.js` |

### Ajouter le CV

1. Déposer le PDF dans `public/`, par exemple `public/cv-zie-traore.pdf`.
2. Dans `data/profile.js`, mettre `cv: "/cv-zie-traore.pdf"`.

Le bouton « Télécharger mon CV » apparaît alors dans l'en-tête.

### Ajouter la photo

1. Déposer l'image dans `public/`, par exemple `public/photo-zie.jpg` (format portrait 3:4 conseillé).
2. Dans `data/profile.js`, mettre `photo: "/photo-zie.jpg"`.

La photo remplace le portrait illustré et reçoit automatiquement le traitement « trame rose ».

### Ajouter un projet

1. Ajouter un objet dans `profile.projects` (`id`, `stack`, `github` ou `null`, `color` : `pink`, `cyan` ou `yellow`).
2. Ajouter le texte correspondant, **au même rang**, dans `translations.fr.projects.items` et `translations.en.projects.items` (`title`, `year`, `text`, `sfx` = l'onomatopée affichée au survol).

## Déploiement

Sur Vercel, l'URL du site est détectée automatiquement pour les aperçus de partage (image générée par `app/opengraph-image.js`). Sur un autre hébergeur, définir la variable `NEXT_PUBLIC_SITE_URL`.

## Vérifications

```bash
npm run lint
npm run build
```
