#!/usr/bin/env node
/**
 * Recapture les réalisations sur TOUTE leur hauteur, pour la révélation au survol.
 *
 *   node scripts/captures-pleine-hauteur.mjs            # tout
 *   node scripts/captures-pleine-hauteur.mjs ogourmandiz bbcl
 *
 * POURQUOI. Les vignettes de la section « Des sites en service » sont des
 * recadrages en 16/10 : elles prouvent que le haut est beau, et rien de la
 * profondeur. Or c'est exactement ce dont un artisan doute quand il entend
 * « un site » — il imagine une page vitrine. La capture pleine hauteur, qui
 * descend au survol, montre les dix écrans de travail qu'il y a dessous, dont
 * les pages par commune vendues dans chaque SMS.
 *
 * DEUX PIÈGES MESURÉS LE 09/10/2026.
 *
 * 1. Les images différées. Une capture `fullPage` prise à l'arrivée rend une
 *    page à moitié vide : tout ce qui se charge au défilement n'est jamais
 *    demandé. On descend donc la page entière par pas de 600 px avant de
 *    capturer, puis on remonte.
 *
 * 2. Les hauteurs sont toutes différentes — Ô Gourmandiz fait 3,4 fois sa
 *    largeur. La translation ne peut donc pas être une constante : le composant
 *    la calcule à l'affichage depuis les dimensions réelles de l'image. Ce
 *    script n'a qu'à produire des fichiers propres.
 *
 * Deux largeurs par site : 1100 px pour les écrans larges, 700 pour les
 * téléphones. À 1100 px une capture pèse environ 145 Ko, soit le triple d'une
 * vignette 16/10 — proportionnel à la hauteur, donc au même prix par pixel.
 */
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const run = promisify(execFile);
const ICI = path.dirname(fileURLToPath(import.meta.url));
const RACINE = path.join(ICI, '..');
const SORTIE = path.join(RACINE, 'public', 'realisations');

/* Puppeteer vit dans l'auditeur de prospection : c'est le seul endroit du
   poste où il est installé, et le dupliquer coûterait 300 Mo pour rien. */
const CHEMIN_PUPPETEER = path.join(RACINE, '..', 'Prospection', 'pipeline', 'auditeur', 'node_modules');
const require_ = createRequire(path.join(CHEMIN_PUPPETEER, 'index.js'));
let puppeteer;
try {
  puppeteer = require_('puppeteer');
} catch {
  console.error(`\n  puppeteer introuvable dans ${CHEMIN_PUPPETEER}\n`);
  process.exit(1);
}

/** Les sites à capturer, lus dans la configuration pour ne pas en tenir deux listes. */
function realisations() {
  const src = fs.readFileSync(path.join(RACINE, 'src', 'config', 'siteConfig.ts'), 'utf8');
  const bloc = src.slice(src.indexOf('exemples:'), src.indexOf('apropos:'));
  const sortie = [];
  const re = /url:\s*'([^']+)'[\s\S]{0,200}?image:\s*'\/realisations\/([^']+)\.webp'/g;
  let m;
  while ((m = re.exec(bloc))) sortie.push({ url: m[1], nom: m[2] });
  return sortie;
}

const LARGEURS = [
  { suffixe: '', px: 1100, qualite: 68 },
  { suffixe: '-700', px: 700, qualite: 70 },
];

const voulus = process.argv.slice(2);
const liste = realisations().filter((r) => !voulus.length || voulus.some((v) => r.nom.includes(v)));

if (!liste.length) {
  console.error('\n  aucune réalisation ne correspond\n');
  process.exit(1);
}

const tmp = await fsp.mkdtemp(path.join(os.tmpdir(), 'captures-'));
/* Une page de dix mille pixels met plus de trois minutes à être parcourue,
   mesurée et capturée : le délai de garde par défaut ne suffit pas. */
const navigateur = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
  protocolTimeout: 600000,
});
const bilan = [];

try {
  for (const r of liste) {
    const page = await navigateur.newPage();
    try {
      await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
      /* Google sert une page vide au navigateur sans tête : la carte de la
         section « zone d'intervention » ressortait en rectangle sombre. Avec
         une identification ordinaire elle rend normalement. */
      await page.setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
          '(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      );
      await page.setExtraHTTPHeaders({ 'Accept-Language': 'fr-FR,fr;q=0.9' });
      await page.goto(r.url, { waitUntil: 'networkidle2', timeout: 90000 });

      /*
        DEUX PASSES, PARCE QUE DEUX CHOSES DIFFÉRENTES MANQUAIENT.

        Premier jet : des bandes de couleur sans contenu. Tous ces sites
        animent l'apparition de leurs sections au défilement, et une section
        dont l'observateur n'a pas déclenché reste à `opacity: 0`. Descendre
        vite puis remonter ne laissait pas le temps à la moitié d'entre eux.

        Deuxième jet : les sections étaient là, mais des cadres d'images
        restaient vides. Ce n'était plus l'opacité, c'était le chargement
        différé — une image marquée `loading="lazy"` n'est jamais réclamée si
        elle ne s'approche pas de la fenêtre, et une capture `fullPage` ne
        déplace pas la fenêtre. « On a l'impression que je livre des sites
        avec des images vides », et c'était exact.

        AGRANDIR LA FENÊTRE À LA PAGE ENTIÈRE ÉTAIT UNE FAUSSE BONNE IDÉE.
        Tout devenait visible, oui, mais les sections dimensionnées en hauteur
        d'écran grandissaient avec la fenêtre : le héros de la démonstration
        couvreur, haut d'un écran, s'est étiré sur dix mille pixels et la page
        est passée de 8 567 à 16 360 px. Une capture juste, et inutilisable.

        LA FENÊTRE RESTE DONC NORMALE, et on agit sur ce qui bloque :
          · deux passes de défilement lent, de quoi déclencher les
            observateurs d'apparition ET les chargeurs d'images maison ;
          · entre les deux, on lève `loading="lazy"` sur chaque image — passer
            l'attribut à `eager` lance le téléchargement sur-le-champ, sans
            avoir à amener l'image devant la fenêtre ;
          · puis on attend que chacune soit complète.

        Ce qui résiste est compté et nommé, parce que c'est la seule chose qui
        se voit mal à l'œil sur une capture de dix mille pixels.
      */
      await page.evaluate(
        () =>
          new Promise((fini) => {
            let pas = 0;
            let derniere = -1;
            let immobile = 0;
            const t = setInterval(() => {
              window.scrollBy(0, 600);
              pas++;
              const y = window.scrollY;
              immobile = y === derniere ? immobile + 1 : 0;
              derniere = y;
              if (immobile >= 3 || pas > 120) {
                clearInterval(t);
                window.scrollTo(0, 0);
                fini();
              }
            }, 90);
          }),
      );
      await new Promise((f) => setTimeout(f, 1200));

      /* On lève le chargement différé, puis on redescend : la deuxième passe
         sert aux chargeurs écrits en JavaScript, que l'attribut ne concerne
         pas. */
      await page.evaluate(() => {
        document.querySelectorAll('img').forEach((i) => {
          i.loading = 'eager';
          const d = i.dataset;
          if (d.src && i.src !== d.src) i.src = d.src;
          if (d.srcset && i.srcset !== d.srcset) i.srcset = d.srcset;
        });
        document.querySelectorAll('[data-bg]').forEach((n) => {
          n.style.backgroundImage = `url(${n.dataset.bg})`;
        });
      });
      await page.evaluate(
        () =>
          new Promise((fini) => {
            let pas = 0;
            let derniere = -1;
            let immobile = 0;
            const t = setInterval(() => {
              window.scrollBy(0, 500);
              pas++;
              const y = window.scrollY;
              immobile = y === derniere ? immobile + 1 : 0;
              derniere = y;
              if (immobile >= 3 || pas > 140) {
                clearInterval(t);
                window.scrollTo(0, 0);
                fini();
              }
            }, 110);
          }),
      );
      await new Promise((f) => setTimeout(f, 1500));

      const reste = await page.evaluate(async () => {
        /* Les apparitions, en filet de sécurité : les deux passes de
           défilement ont normalement tout déclenché. */
        document
          .querySelectorAll('.rv, [data-rv], .reveal, .fade-in, .animate-on-scroll, [data-aos]')
          .forEach((n) => n.classList.add('on', 'visible', 'is-visible', 'in-view', 'aos-animate'));

        let forces = 0;
        document.querySelectorAll('*').forEach((n) => {
          const cs = getComputedStyle(n);
          if (cs.display === 'none' || cs.visibility === 'hidden') return;
          if (cs.opacity !== '0') return;
          if (!/opacity|transform|all/.test(cs.transitionProperty) && cs.animationName === 'none') return;
          n.style.setProperty('opacity', '1', 'important');
          n.style.setProperty('transform', 'none', 'important');
          forces++;
        });

        /* On attend chaque image, avec un plafond : une image morte ne doit
           pas retenir la capture des huit autres sites. */
        await Promise.all(
          [...document.images]
            .filter((i) => !i.complete)
            .map(
              (i) =>
                new Promise((f) => {
                  const fin = () => f();
                  i.addEventListener('load', fin, { once: true });
                  i.addEventListener('error', fin, { once: true });
                  setTimeout(fin, 15000);
                }),
            ),
        );
        if (document.fonts?.ready) await document.fonts.ready;

        /* Les cadres embarqués sont traités à part, hors de cette fonction :
           ils demandent d'être amenés devant la fenêtre, ce qui annulerait le
           retour en haut de page. */

        const gel = document.createElement('style');
        gel.textContent = '*,*::before,*::after{transition:none!important;animation:none!important}';
        document.head.appendChild(gel);

        const vides = [...document.images]
          .filter((i) => i.getBoundingClientRect().width > 40 && (!i.complete || !i.naturalWidth))
          .map((i) => (i.currentSrc || i.src || '(sans source)').split('/').pop().slice(0, 30));
        const transparents = [...document.querySelectorAll('*')].filter((n) => {
          const cs = getComputedStyle(n);
          return cs.opacity === '0' && cs.display !== 'none';
        }).length;
        return { forces, transparents, vides, images: document.images.length };
      });
      await new Promise((f) => setTimeout(f, 1500));

      const brut = path.join(tmp, `${r.nom}.png`);
      await page.screenshot({ path: brut, fullPage: true });

      /*
        LA CARTE SE CAPTURE À PART, PUIS S'INCRUSTE.

        Chrome ne compose pas un cadre d'une autre origine hors de la fenêtre
        visible : la carte Google de la section « zone d'intervention »
        ressortait en rectangle vide au milieu de la page, alors qu'elle rend
        parfaitement si on la photographie seule, amenée devant la fenêtre.

        Trois tentatives avant d'en arriver là : attendre son `load` ne change
        rien, la faire défiler devant la fenêtre avant la capture pleine page
        non plus — elle est redécomposée dès qu'elle en sort. On la prend donc
        isolément et on la recolle à ses coordonnées dans la page.

        Deux précautions pour que ce soit honnête : on n'incruste que si la
        capture isolée a réussi, et on signale le cas contraire plutôt que de
        laisser un trou passer pour du contenu.
      */
      const cadres = await page.$$('iframe');
      let cartes = 0;
      for (const f of cadres) {
        const boite = await f.evaluate((n) => {
          n.scrollIntoView({ block: 'center' });
          const r = n.getBoundingClientRect();
          return { x: Math.round(r.left + window.scrollX), y: Math.round(r.top + window.scrollY),
                   l: Math.round(r.width), h: Math.round(r.height) };
        });
        if (boite.l < 60 || boite.h < 60) continue;
        await new Promise((t) => setTimeout(t, 12000));
        const vignette = path.join(tmp, `${r.nom}-cadre-${cartes}.png`);
        try {
          await f.screenshot({ path: vignette });
          const fusion = path.join(tmp, `${r.nom}-f${cartes}.png`);
          await run('ffmpeg', ['-v', 'error', '-y', '-i', brut, '-i', vignette,
            '-filter_complex', `[0][1]overlay=${boite.x}:${boite.y}`, fusion], { maxBuffer: 1 << 28 });
          await fsp.rename(fusion, brut);
          cartes++;
        } catch (err) {
          console.error(`        carte non incrustée : ${err.message.split('\n')[0]}`);
        }
      }

      const tailles = [];
      for (const l of LARGEURS) {
        const dst = path.join(SORTIE, `${r.nom}-plein${l.suffixe}.webp`);
        await run('cwebp', ['-q', String(l.qualite), '-resize', String(l.px), '0', '-quiet', brut, '-o', dst]);
        tailles.push(`${l.px}px ${Math.round((await fsp.stat(dst)).size / 1024)}Ko`);
      }

      const hauteur = await page.evaluate(() => document.documentElement.scrollHeight);
      const ratio = (hauteur / 1280).toFixed(2);
      const alerte =
        (reste.transparents ? `  ⚠ ${reste.transparents} invisible(s)` : '') +
        (reste.vides.length ? `  ⚠ ${reste.vides.length} image(s) vide(s)` : '');
      bilan.push({ nom: r.nom, hauteur, ratio, tailles: tailles.join(' · '), ...reste });
      console.log(
        `  ${r.nom.padEnd(26)} ${String(hauteur).padStart(5)} px   1:${ratio}   ` +
          `${String(reste.images).padStart(3)} img` +
          (cartes ? ` + ${cartes} carte(s)` : '') +
          `   ${tailles.join(' · ')}${alerte}`,
      );
      if (reste.vides.length) reste.vides.forEach((v) => console.log(`        vide : ${v}`));
    } catch (e) {
      console.error(`  ${r.nom.padEnd(26)} ÉCHEC : ${e.message.split('\n')[0]}`);
    } finally {
      await page.close();
    }
  }
} finally {
  await navigateur.close();
  await fsp.rm(tmp, { recursive: true, force: true });
}

/* Les pages très longues n'ont pas le même intérêt à défiler que les courtes :
   on le signale plutôt que de le corriger en silence. */
const courtes = bilan.filter((b) => Number(b.ratio) < 2);
if (courtes.length) {
  console.log(`\n  ${courtes.length} page(s) de moins de deux écrans : la révélation y sera peu lisible.`);
  courtes.forEach((b) => console.log(`    ${b.nom} — ratio 1:${b.ratio}`));
}
console.log(`\n  ${bilan.length}/${liste.length} capturée(s)\n`);
