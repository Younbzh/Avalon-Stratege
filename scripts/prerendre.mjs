#!/usr/bin/env node
/**
 * Écrit le site dans le HTML livré, au lieu de le laisser produire par JavaScript.
 *
 * Google sait exécuter le JavaScript, avec retard et sans garantie. Les robots
 * d'IA ne l'exécutent pas du tout : ils lisent le HTML brut. Sans ce script, le
 * site d'une agence qui vend du référencement était lui-même invisible.
 *
 * Produit aussi robots.txt, sitemap.xml et llms.txt.
 *
 * Lancé automatiquement à la fin de `npm run build`.
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(RACINE, 'dist');
const DIST_SSR = path.join(RACINE, '.ssr');
const SITE = 'https://www.avalon-stratege.com';

/* ---------------------------------------------------------------- rendu */

execFileSync(
  'npx',
  ['vite', 'build', '--ssr', 'src/entry-server.tsx', '--outDir', '.ssr', '--logLevel', 'error'],
  { cwd: RACINE, stdio: ['ignore', 'ignore', 'inherit'] },
);

const serveur = await import(pathToFileURL(path.join(DIST_SSR, 'entry-server.js')).href);
const html = serveur.rendre();

/* --------------------------------------------------- injection dans le HTML */

const fichier = path.join(DIST, 'index.html');
let gabarit = fs.readFileSync(fichier, 'utf8');

if (!gabarit.includes('<div id="root"></div>')) {
  throw new Error('Le point de montage <div id="root"></div> est introuvable dans dist/index.html.');
}
gabarit = gabarit.replace('<div id="root"></div>', `<div id="root">${html}</div>`);

/*
  Les blocs animés partent à opacité nulle et ne deviennent visibles qu'au
  défilement. Sans JavaScript, la page prérendue resterait donc blanche alors que
  son contenu est bien là : on les révèle explicitement dans ce cas.
*/
gabarit = gabarit.replace(
  '</head>',
  '    <noscript><style>.rv{opacity:1 !important;transform:none !important}</style></noscript>\n  </head>',
);

fs.writeFileSync(fichier, gabarit);

/* ------------------------------------------------ robots, sitemap et llms */

fs.writeFileSync(
  path.join(DIST, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`,
);

const aujourdhui = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE}/</loc><lastmod>${aujourdhui}</lastmod><priority>1.0</priority></url>
  <url><loc>${SITE}/mentions-legales.html</loc><lastmod>${aujourdhui}</lastmod><priority>0.2</priority></url>
  <url><loc>${SITE}/confidentialite.html</loc><lastmod>${aujourdhui}</lastmod><priority>0.2</priority></url>
</urlset>
`,
);

/*
  llms.txt : un résumé lisible par les assistants, qui leur évite de deviner à
  partir du balisage. C'est le même principe qu'un plan de site, pour un autre
  type de robot.
*/
fs.writeFileSync(
  path.join(DIST, 'llms.txt'),
  `# Avalon Stratège

> Création de sites internet pour artisans et indépendants, partout en France,
> entièrement à distance.

Interlocuteur unique : Youenn. Pas d'agence, pas de sous-traitance.

## Offres
- Site Visible : 890 € en paiement unique, avec référencement local sur le
  métier et les communes, fiche Google Business, galerie et formulaire de devis.
- Site Territoire : 1 290 € en paiement unique. 15 communes, une page par
  prestation, kit pour récolter les premiers avis clients.
- Site Signature : 1 890 € en paiement unique. 25 communes, une page par
  commune principale, kit de communication offert, bilan écrit à 3 mois.
- Site vitrine simple, sans référencement local : à partir de 590 €.
- Kit de communication (carte de visite, flyer, visuels réseaux sociaux avec
  QR code) : 250 €, offert avec Signature.
- Entretien : 49 € par mois, sans engagement. Hébergement, modifications sous
  48 heures (jusqu'à 30 minutes par mois), statistiques mensuelles par e-mail.

## Particularité
Le site est construit et montré avant tout paiement. Le client voit le résultat
avant de décider.

## Contact
Téléphone : 06 58 96 89 59
Courriel : avalonstratege@gmail.com
Site : ${SITE}
`,
);

/* ---------------------------------------------------------------- contrôle */

const livre = fs.readFileSync(fichier, 'utf8');
const texte = livre
  .replace(/<script[\s\S]*?<\/script>/g, '')
  .replace(/<[^>]*>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();
const h1 = (livre.match(/<h1[\s>]/g) ?? []).length;

console.log(
  `\x1b[90mprérendu : ${texte.length} caractères dans le HTML livré · ${h1} balise(s) h1 · robots.txt, sitemap.xml, llms.txt\x1b[0m`,
);
