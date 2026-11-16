# Agence Green Side — site internet (V1 prototype)

Site de l'Agence Green Side, conseil en immobilier à Biot, Valbonne et Sophia Antipolis.
Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · déploiement Vercel.

> **État : version de travail.** Les textes, visuels et informations légales sont en
> attente de validation. Les biens affichés sont des exemples fictifs. Tant que le
> mode « production » n'est pas activé, le site est fermé aux moteurs de recherche.

## Lancer le site

```bash
npm install        # une seule fois
npm run dev        # développement : http://localhost:3000
npm run build      # construction de production
npm run start      # sert la version construite
npm run lint       # contrôle du code
```

Node.js 20 ou plus récent.

## Les deux modes

| Variable `NEXT_PUBLIC_SITE_MODE` | Comportement |
|---|---|
| absente ou `demo` (défaut) | Bandeau « Version de travail », marqueurs « À compléter », biens fictifs visibles, `noindex` partout, `robots.txt` fermé |
| `production` | Marqueurs masqués, biens fictifs retirés, indexation ouverte, sitemap publié |

Ne passer en `production` qu'une fois la liste « Avant la mise en production » traitée.

Variables : voir `.env.example`.

## Où modifier quoi

| Je veux changer… | Fichier |
|---|---|
| Couleurs, typographies, rayons (design tokens) | `src/app/globals.css` (bloc `@theme`) |
| Logo | `src/components/Logo.tsx` + `src/assets/logo/` |
| Coordonnées, mentions légales, menu | `src/lib/site.ts` |
| Fondatrices : portraits, textes, citations | `src/content/equipe.ts` + `src/assets/portraits/` |
| Engagements, récits, étapes de vente et d'achat, valeurs | `src/content/approche.ts` |
| Secteurs et pages locales | `src/content/secteurs.ts` |
| Biens (modèle, source, exemples fictifs) | `src/content/biens.ts` |
| Barème d'honoraires | `src/app/honoraires/page.tsx` (tableau `bareme`) |
| Champs et règles des formulaires | `src/lib/demandes.ts` |

Règle de fond : **rien n'est inventé**. Une information non fournie vaut `null` dans
les fichiers de contenu ; le site affiche alors un marqueur « À compléter » (mode
démo) ou masque le bloc (production).

### Portraits

Les trois photos ont été reçues sans nom : leur attribution dans
`src/content/equipe.ts` est **à confirmer**. Pour corriger, échanger les valeurs de
`photo`. Format conseillé pour les portraits définitifs : vertical 4:5, 1 600 px de
haut au moins, même lumière, même fond et même cadrage pour les trois.

### Ajouter une page locale (phase 2)

Dans `src/content/secteurs.ts`, passer la commune en `rang: "coeur"` et renseigner
`accroche`, `seo`, `intro`, `reperes`, `projets`, `sources`. La page, le menu du pied
de page, la carte et le sitemap se mettent à jour seuls. À ne faire qu'avec un
contenu local distinct et vérifiable : pas de page qui change seulement le nom de la
ville.

### Brancher les biens réels

`getBiens()` dans `src/content/biens.ts` est la source unique. Remplacer son contenu
par l'appel au flux du logiciel de transaction (passerelle, API ou CMS) en renvoyant
des objets `Bien`. Grille, filtres, fiche, pages secteurs et sitemap suivent.
Ne publier que des biens sous mandat, avec toutes les mentions obligatoires.

### Journal / conseils

Non ouvert en V1 (pas de contenu original disponible : pas de page vide). Modèle
prévu dans `src/content/journal.ts`. À ouvrir quand 2 ou 3 articles relus existent.

## Formulaires

Trois variantes (contact, estimation, recherche) d'un même composant,
`src/components/FormulaireDemande.tsx`, envoyées à `POST /api/contact`.

- Validation dans le navigateur **et** sur le serveur (mêmes règles).
- Anti-robots : champ piège, délai minimal, limite de fréquence par adresse IP.
- **Transmission** : définir `LEADS_WEBHOOK_URL` (service d'e-mail, CRM,
  automatisation). Le visiteur ne voit « bien reçu » que si ce service a répondu.
- Sans `LEADS_WEBHOOK_URL`, la route répond « non configuré » et le formulaire
  l'affiche : **aucun envoi n'est simulé**, aucune donnée n'est enregistrée.
- Aucune donnée personnelle dans les journaux ni dans le dépôt.

## Référencement

- Pages publiques générées en statique : HTML complet sans JavaScript.
- `title` et description uniques, H1 unique, adresse canonique, Open Graph (`src/lib/seo.tsx`).
- Fil d'Ariane visible + `BreadcrumbList` sur les pages intérieures.
- `sitemap.xml` et `robots.txt` générés (`src/app/sitemap.ts`, `src/app/robots.ts`).
- `/biens` : les filtres vivent dans l'URL pour le partage mais l'adresse canonique
  reste `/biens` — aucune combinaison de filtres n'est indexable.
- Données structurées : `Organization` tant qu'aucune adresse professionnelle n'est
  renseignée ; `RealEstateAgent` dès que `site.adresse` est rempli. Jamais de note
  ni d'avis fabriqués.

## Avant la mise en production

1. Logo final vectoriel, palette et typographies validés.
2. Portraits définitifs et attribution confirmée ; photos de lieux autorisées.
3. Textes validés par les trois fondatrices (profils, engagements, récits, méthode).
4. Coordonnées, statut du bureau, horaires (`src/lib/site.ts`).
5. Mentions légales complètes, barème d'honoraires TTC, médiateur — validés par
   l'agence ou son conseil.
6. Politique de confidentialité : bases juridiques, durées, sous-traitants.
7. `LEADS_WEBHOOK_URL` relié à la messagerie ou au CRM, test d'envoi réel.
8. Limite de fréquence : remplacer la mémoire d'instance par un stockage partagé
   (Upstash, Vercel KV) si le volume le justifie.
9. Flux de biens réels raccordé, mentions des annonces relues (prix et honoraires,
   DPE/GES, coûts d'énergie, copropriété, Géorisques).
10. Domaine, `NEXT_PUBLIC_SITE_URL`, puis `NEXT_PUBLIC_SITE_MODE=production`.
11. Search Console, fiche d'établissement Google (si l'agence y est éligible).
12. Mesures réelles : Lighthouse mobile et Core Web Vitals sur le domaine final.
