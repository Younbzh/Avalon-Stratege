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
const navigateur = await puppeteer.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const bilan = [];

try {
  for (const r of liste) {
    const page = await navigateur.newPage();
    try {
      await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
      await page.goto(r.url, { waitUntil: 'networkidle2', timeout: 90000 });

      /* On descend toute la page pour réclamer les images différées, puis on
         remonte : sans ça la capture rend des cadres vides. */
      await page.evaluate(
        () =>
          new Promise((fini) => {
            let y = 0;
            const pas = setInterval(() => {
              window.scrollBy(0, 600);
              y += 600;
              if (y >= document.documentElement.scrollHeight) {
                clearInterval(pas);
                window.scrollTo(0, 0);
                fini();
              }
            }, 60);
          }),
      );
      await new Promise((f) => setTimeout(f, 2500));

      const hauteur = await page.evaluate(() => document.documentElement.scrollHeight);
      const brut = path.join(tmp, `${r.nom}.png`);
      await page.screenshot({ path: brut, fullPage: true });

      const tailles = [];
      for (const l of LARGEURS) {
        const dst = path.join(SORTIE, `${r.nom}-plein${l.suffixe}.webp`);
        await run('cwebp', ['-q', String(l.qualite), '-resize', String(l.px), '0', '-quiet', brut, '-o', dst]);
        tailles.push(`${l.px}px ${Math.round((await fsp.stat(dst)).size / 1024)}Ko`);
      }

      const ratio = (hauteur / 1280).toFixed(2);
      bilan.push({ nom: r.nom, hauteur, ratio, tailles: tailles.join(' · ') });
      console.log(`  ${r.nom.padEnd(26)} ${String(hauteur).padStart(5)} px   ratio 1:${ratio}   ${tailles.join(' · ')}`);
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
