import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Mail, MapPin, Menu, Phone, Plus, X } from 'lucide-react';
import { siteConfig as s } from './config/siteConfig';

/* ------------------------------------------------------------------ outils */

const telLien = (t: string) => '+33' + t.replace(/[^\d]/g, '').slice(1);

/** Apparition au défilement. Le contenu est déjà dans le HTML : on n'anime que l'arrivée. */
function useReveal() {
  useEffect(() => {
    const cibles = document.querySelectorAll('.rv');
    if (!('IntersectionObserver' in window)) {
      cibles.forEach((n) => n.classList.add('on'));
      return;
    }
    const obs = new IntersectionObserver(
      (entrees) =>
        entrees.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('on');
            obs.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -10% 0px' },
    );
    cibles.forEach((n, i) => {
      (n as HTMLElement).style.transitionDelay = `${(i % 4) * 90}ms`;
      obs.observe(n);
    });
    return () => obs.disconnect();
  }, []);
}

/* -------------------------------------------------------------- navigation */

const LIENS = [
  { id: 'constat', label: 'Pourquoi' },
  { id: 'offres', label: 'Tarifs' },
  { id: 'methode', label: 'Méthode' },
  { id: 'exemples', label: 'Réalisations' },
  { id: 'questions', label: 'Questions' },
];

function Navigation() {
  const [ouvert, setOuvert] = useState(false);
  const [glisse, setGlisse] = useState(false);

  useEffect(() => {
    const onScroll = () => setGlisse(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${glisse ? 'backdrop-blur-xl' : ''}`}
      style={{
        background: glisse ? 'rgba(8,9,12,0.88)' : 'transparent',
        borderBottom: `1px solid ${glisse ? 'var(--filet)' : 'transparent'}`,
      }}
    >
      <div className="conteneur">
        <div className={`flex items-center justify-between transition-all duration-500 ${glisse ? 'h-16' : 'h-24'}`}>
          <a href="#" className="flex items-center gap-3">
            {/* 38 px : en dessous les arcs concentriques se brouillent, au-dessus
                l'emblème prend le pas sur le nom. */}
            <img
              src="/embleme.webp"
              alt=""
              aria-hidden="true"
              width={120}
              height={120}
              className="h-[34px] w-auto sm:h-[38px]"
            />
            <span style={{ fontFamily: 'var(--serif)' }} className="text-[26px] leading-none tracking-tight">
              {s.marque}
            </span>
            <span
              className="hidden self-end pb-1 text-[12px] uppercase sm:block"
              style={{ letterSpacing: '0.24em', color: 'var(--ivoire-doux)' }}
            >
              France
            </span>
          </a>

          <nav className="hidden items-center gap-9 lg:flex">
            {LIENS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="text-[14px] transition-colors duration-300 hover:text-[var(--or)]"
                style={{ color: 'var(--ivoire-doux)' }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#contact" className="bouton bouton-or hidden sm:inline-flex">
              Me contacter
            </a>
            <button onClick={() => setOuvert(!ouvert)} className="p-2 lg:hidden" aria-label="Menu">
              {ouvert ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {ouvert && (
          <nav
            className="flex flex-col gap-1 pb-6 pt-4 lg:hidden"
            style={{ borderTop: '1px solid var(--filet)' }}
          >
            {LIENS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOuvert(false)}
                className="py-2.5 text-[15px]"
                style={{ color: 'var(--ivoire-doux)' }}
              >
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOuvert(false)} className="bouton bouton-or mt-3 self-start">
              Me contacter
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}

/**
 * Le téléphone qui défile, dans son cadre.
 *
 * ELLE ÉTAIT MASQUÉE SOUS 1024 PX, et le raisonnement d'alors n'était pas
 * faux : placée à côté du titre, elle poussait les boutons sous la ligne de
 * flottaison pour montrer… un téléphone. Mais la conclusion était trop large.
 * Ce n'est pas la vidéo qui gênait, c'est sa position. Sous les chiffres, elle
 * ne coûte rien à ce qui est vu en premier, et c'est l'argument le plus fort
 * de la page : le visiteur juge en quatre secondes ce qu'aucun paragraphe ne
 * lui prouverait.
 *
 * LE FICHIER PÈSE 3,4 Mo, et la page vend la rapidité sur téléphone. Le livrer
 * au chargement sur une 4G de chantier serait se contredire soi-même. D'où
 * `preload="none"` et une source posée seulement quand le cadre approche de
 * l'écran : au départ il n'y a que l'affiche, 46 Ko. Celui qui ne descend
 * jamais jusque-là ne télécharge jamais la vidéo.
 *
 * La marge de 200 px laisse le temps aux premières images d'arriver avant que
 * le cadre soit vraiment visible.
 */
function TelephoneQuiDefile() {
  const cadre = useRef<HTMLDivElement>(null);
  const [charger, setCharger] = useState(false);

  useEffect(() => {
    const n = cadre.current;
    if (!n) return;
    if (!('IntersectionObserver' in window)) { setCharger(true); return; }
    const obs = new IntersectionObserver(
      (entrees) => entrees.forEach((e) => { if (e.isIntersecting) { setCharger(true); obs.disconnect(); } }),
      { rootMargin: '200px' },
    );
    obs.observe(n);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="rv" ref={cadre}>
      <div
        className="relative mx-auto w-[240px] overflow-hidden sm:w-[270px] lg:w-[300px]"
        style={{
          borderRadius: '2.2rem',
          border: '10px solid #15161a',
          boxShadow: '0 30px 80px rgba(0,0,0,.55)',
        }}
      >
        <video
          src={charger ? s.hero.video : undefined}
          poster={s.hero.videoAffiche}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-label="Quatre sites réalisés par Avalon Stratège, vus sur un téléphone"
          style={{ display: 'block', width: '100%', height: 'auto', aspectRatio: '390 / 844' }}
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- héros */

function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-40 md:pb-32 md:pt-52">
      <div
        className="halo"
        style={{ top: '-14rem', right: '-8rem', width: '38rem', height: '38rem', background: 'rgba(217,183,120,0.16)' }}
      />
      <div
        className="halo"
        style={{ bottom: '-16rem', left: '-12rem', width: '34rem', height: '34rem', background: 'rgba(120,140,217,0.10)' }}
      />

      {/*
        CENTRÉ SUR TÉLÉPHONE, ALIGNÉ À GAUCHE À PARTIR DE 1024 PX.

        Sur deux colonnes, le texte à gauche et le téléphone à droite tiennent
        ensemble : l'alignement à gauche donne l'arête verticale qui structure
        le bloc. Une fois les colonnes empilées, cette arête ne sépare plus
        rien et le texte paraît poussé dans l'angle — ce qui se voit d'autant
        plus que le titre est court et le drapeau très irrégulier.

        `max-w-[16ch]` et le `max-width: 62ch` du chapeau n'ont aucun effet
        sous 390 px, mais ils reprennent la main dès que l'écran s'élargit :
        d'où `mx-auto lg:mx-0`, qui recentre les boîtes sans toucher au
        desktop.
      */}
      <div className="conteneur grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="text-center lg:text-left">
        <span className="surtitre rv">{s.hero.accroche}</span>

        <h1 className="rv mx-auto max-w-[16ch] lg:mx-0">
          {s.hero.titre}{' '}
          <em className="not-italic" style={{ color: 'var(--or)' }}>
            {s.hero.titreAccent}
          </em>
          .
          <span className="block" style={{ color: 'var(--ivoire-doux)' }}>
            {s.hero.titreFin}
          </span>
        </h1>

        <p className="chapo rv mx-auto mt-9 text-xl lg:mx-0">{s.hero.chapo}</p>

        <div className="rv mt-12 flex flex-wrap justify-center gap-4 lg:justify-start">
          <a href="#exemples" className="bouton bouton-or">
            {s.hero.ctaPrincipal}
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a href="#contact" className="bouton bouton-ligne">
            {s.hero.ctaSecondaire}
          </a>
        </div>

        <dl className="rv filet mt-20 grid gap-10 pt-10 sm:grid-cols-3">
          {s.hero.preuves.map((p) => (
            <div key={p.label}>
              <dt style={{ fontFamily: 'var(--serif)' }} className="text-4xl leading-none">
                {p.valeur}
              </dt>
              <dd className="mt-2 text-[14px]" style={{ color: 'var(--ivoire-doux)' }}>
                {p.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <TelephoneQuiDefile />
      </div>
    </section>
  );
}

/**
 * L'en-tête d'une section : sur-titre, titre, et le chapeau à sa droite.
 *
 * POURQUOI DEUX COLONNES. Mesuré le 09/10/2026 à 1440 px : les titres de
 * section laissaient entre 483 et 620 px de vide à leur droite, et les
 * sur-titres jusqu'à 1008. Rien n'était cassé — un titre bridé à dix-huit
 * caractères de large est une mesure de lecture voulue, une ligne de 1200 px
 * étant illisible. Mais un titre avec un demi-écran de vide à côté se lit comme
 * une page inachevée, et c'est Youenn qui l'a relevé. Dans le héros le défaut
 * ne se voit pas : le téléphone occupe exactement cet espace.
 *
 * Le chapeau passe donc à droite du titre, aligné sur la même ligne de base,
 * séparé par le filet de la page. La largeur est occupée, chaque colonne garde
 * une mesure courte, et le vide devient une colonne.
 *
 * Le filet est gris et non doré : l'or est déjà pris par le tiret du
 * sur-titre, et deux accents dorés dans le même en-tête se disputeraient
 * l'attention.
 *
 * SANS CHAPEAU, PAS DE DEUXIÈME COLONNE. Le constat et les questions n'en ont
 * pas. On y élargit la mesure du titre au lieu d'inventer une phrase pour
 * remplir : un titre d'affichage supporte trente caractères par ligne, la
 * limite de soixante-cinq ne vaut que pour le texte courant.
 */
function EnTete({
  surtitre,
  titre,
  chapo,
  mesure = 'max-w-[18ch]',
}: {
  surtitre: string;
  titre: string;
  chapo?: string;
  mesure?: string;
}) {
  return (
    <div className="rv">
      <span className="surtitre">{surtitre}</span>
      {chapo ? (
        <div className="grid gap-x-14 gap-y-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-baseline">
          <h2 className={mesure}>{titre}</h2>
          <p className="chapo mt-0 lg:border-l lg:pl-14" style={{ borderColor: 'var(--filet)' }}>
            {chapo}
          </p>
        </div>
      ) : (
        <h2 className={mesure}>{titre}</h2>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ constat */

function Constat() {
  return (
    <section id="constat" className="section">
      <div className="conteneur">
        <EnTete surtitre={s.constat.surtitre} titre={s.constat.titre} mesure="max-w-[26ch]" />

        <div className="mt-12 md:mt-16 grid gap-px" style={{ background: 'var(--filet)' }}>
          {s.constat.points.map((p, i) => (
            <article
              key={p.titre}
              className="rv grid gap-6 py-10 md:grid-cols-[6rem_1fr_2fr] md:items-baseline md:gap-10"
              style={{ background: 'var(--encre)' }}
            >
              <span style={{ fontFamily: 'var(--serif)', color: 'var(--or-sombre)' }} className="text-2xl">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-xl">{p.titre}</h3>
              <p style={{ color: 'var(--ivoire-doux)' }}>{p.texte}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- offres */

function Offres() {
  const { liste, entretien, paiement, rentabilite, vitrine, kit } = s.offres;

  return (
    <section id="offres" className="section relative overflow-hidden">
      <div
        className="halo"
        style={{
          top: '10%',
          left: '50%',
          width: '40rem',
          height: '30rem',
          background: 'rgba(217,183,120,0.08)',
          transform: 'translateX(-50%)',
        }}
      />
      <div className="conteneur">
        <EnTete surtitre={s.offres.surtitre} titre={s.offres.titre} chapo={s.offres.chapo} />

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {liste.map((o) => (
            <article key={o.nom} className={`carte rv flex flex-col ${o.recommande ? 'carte-or' : ''}`}>
              {o.recommande && (
                <span
                  className="absolute right-6 top-6 rounded-full px-3 py-1 text-[12px] font-semibold uppercase"
                  style={{ letterSpacing: '0.16em', background: 'var(--or)', color: 'var(--encre)' }}
                >
                  Conseillée
                </span>
              )}

              <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 400 }} className="text-2xl">
                {o.nom}
              </h3>
              <p className="mt-1 text-[15px]" style={{ color: 'var(--ivoire-doux)' }}>
                {o.pour}
              </p>

              <p className="mt-8 flex items-baseline gap-2">
                <span style={{ fontFamily: 'var(--serif)' }} className="text-5xl leading-none lg:text-[3.25rem]">
                  {o.prix}
                </span>
                <span className="text-2xl" style={{ color: 'var(--or)' }}>
                  {o.unite}
                </span>
              </p>
              <p className="mt-2 text-[13px] uppercase" style={{ letterSpacing: '0.14em', color: 'var(--ivoire-doux)' }}>
                {o.mention}
              </p>

              <ul className="mt-9 grid gap-3.5">
                {o.inclus.map((ligne) => (
                  <li key={ligne} className="flex gap-3 text-[15px]">
                    <Check className="mt-1 h-4 w-4 flex-none" style={{ color: 'var(--or)' }} />
                    <span style={{ color: 'var(--ivoire-doux)' }}>{ligne}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`bouton mt-auto self-start ${o.recommande ? 'bouton-or' : 'bouton-ligne'}`}
                style={{ marginTop: '2.5rem' }}
              >
                Demander cette formule
              </a>
            </article>
          ))}
        </div>

        <div className="rv mx-auto mt-12 max-w-2xl text-center">
          <p style={{ fontFamily: 'var(--serif)' }} className="text-2xl">
            {rentabilite}
          </p>
          <p className="mt-4 text-[15px]" style={{ color: 'var(--ivoire-doux)' }}>
            {vitrine}
          </p>
          <p className="mt-2 text-[15px]" style={{ color: 'var(--ivoire-doux)' }}>
            {kit}{' '}
            <a href="#contact" style={{ color: 'var(--or)' }} className="underline underline-offset-4">
              Parlons-en
            </a>
          </p>
        </div>

        {/* Le déroulé du paiement, affiché sous les prix : c'est là qu'on se pose la question. */}
        <div className="rv mt-14">
          <h3 className="text-center text-[13px] uppercase" style={{ letterSpacing: '0.2em', color: 'var(--or)' }}>
            {paiement.titre}
          </h3>
          <ol className="mt-8 grid gap-px overflow-hidden rounded-2xl md:grid-cols-3" style={{ background: 'var(--filet)' }}>
            {paiement.etapes.map((e) => (
              <li key={e.quand} className="px-7 py-8 text-center" style={{ background: 'var(--encre)' }}>
                <span style={{ fontFamily: 'var(--serif)' }} className="block text-4xl leading-none">
                  {e.combien}
                </span>
                <span className="mt-3 block text-[15px] font-medium">{e.quand}</span>
                <span className="mt-1.5 block text-[14px]" style={{ color: 'var(--ivoire-doux)' }}>
                  {e.detail}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* L'entretien est présenté à part : c'est un service, pas une troisième formule de site. */}
        <article className="carte rv mt-6 grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div>
            <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 400 }} className="text-2xl">
              {entretien.nom}
            </h3>
            <p className="mt-1 text-[15px]" style={{ color: 'var(--ivoire-doux)' }}>
              {entretien.pour}
            </p>
            <p className="mt-7 flex items-baseline gap-2">
              <span style={{ fontFamily: 'var(--serif)' }} className="text-6xl leading-none">
                {entretien.prix}
              </span>
              <span className="text-xl" style={{ color: 'var(--or)' }}>
                {entretien.unite}
              </span>
            </p>
            <p className="mt-2 text-[13px] uppercase" style={{ letterSpacing: '0.14em', color: 'var(--ivoire-doux)' }}>
              {entretien.mention}
            </p>
          </div>

          <div>
            <ul className="grid gap-3.5">
              {entretien.inclus.map((ligne) => (
                <li key={ligne} className="flex gap-3 text-[15px]">
                  <Check className="mt-1 h-4 w-4 flex-none" style={{ color: 'var(--or)' }} />
                  <span style={{ color: 'var(--ivoire-doux)' }}>{ligne}</span>
                </li>
              ))}
            </ul>
            <p className="mt-7 text-[14px] italic" style={{ color: 'var(--or-sombre)' }}>
              {entretien.note}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ méthode */

function Methode() {
  return (
    <section id="methode" className="section" style={{ background: 'var(--encre-2)' }}>
      <div className="conteneur">
        <EnTete surtitre={s.methode.surtitre} titre={s.methode.titre} chapo={s.methode.chapo} mesure="max-w-[16ch]" />

        <ol className="mt-12 md:mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {s.methode.etapes.map((e, i) => (
            <li key={e.titre} className="carte rv">
              <span
                style={{ fontFamily: 'var(--serif)', color: 'var(--or)' }}
                className="text-5xl leading-none opacity-40"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-6 text-lg">{e.titre}</h3>
              <p className="mt-3 text-[15px] leading-relaxed" style={{ color: 'var(--ivoire-doux)' }}>
                {e.texte}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- exemples */

/**
 * Une réalisation : sa page entière, qui descend quand on l'approche.
 *
 * POURQUOI LA PAGE ENTIÈRE ET NON LE HAUT. Une capture du premier écran prouve
 * que le premier écran est beau. Elle ne dit rien de la profondeur — et c'est
 * précisément ce dont un artisan doute quand il entend « un site » : il imagine
 * une page vitrine. Les neuf pages mesurées font de 2,8 à 7,8 fois leur
 * largeur. Les montrer, c'est montrer l'objet vendu, pages par commune
 * incluses.
 *
 * AU REPOS L'IMAGE EST EXACTEMENT CE QU'ELLE ÉTAIT. La capture haute cadrée en
 * 16/10 et calée en haut donne la même vignette qu'avant : il n'y a donc pas
 * deux fichiers à charger, pas d'échange d'image, rien qui scintille.
 *
 * LA TRANSLATION EST CALCULÉE PAR IMAGE, jamais écrite en dur. Les hauteurs
 * vont de 3 563 à 9 968 px : une constante conviendrait à une page et
 * couperait les huit autres. Elle se déduit des dimensions réelles au
 * chargement.
 *
 * ET LA DURÉE SUIT LA DISTANCE, bornée à sept secondes. À vitesse constante,
 * la plus longue des neuf demanderait près de treize secondes — personne ne
 * tient un survol aussi longtemps. Les pages hautes défilent donc plus vite :
 * le propos est de montrer qu'il y a de la matière, pas de la faire lire.
 *
 * LE SURVOL N'EXISTE PAS SUR TÉLÉPHONE, et c'est là que les prospects ouvrent
 * le lien du SMS. Le défilement s'y déclenche donc à l'entrée dans l'écran, à
 * 60 % de visibilité — seuil assez haut pour qu'une seule carte joue à la
 * fois, sans quoi la page entière s'agiterait.
 */
function CarteRealisation({
  e,
  i,
  actif,
  enregistrer,
}: {
  e: { nom: string; metier: string; lieu: string; url: string; image: string };
  i: number;
  actif: boolean;
  enregistrer: (i: number, n: HTMLElement | null) => void;
}) {
  const image = useRef<HTMLImageElement>(null);
  const [geo, setGeo] = useState<{ decalage: string; duree: string } | null>(null);

  /* Les captures pleine hauteur portent le suffixe `-plein`, produites par
     scripts/captures-pleine-hauteur.mjs. */
  const plein = e.image.replace('.webp', '-plein.webp');
  const pleinPetit = e.image.replace('.webp', '-plein-700.webp');

  const mesurer = (img: HTMLImageElement) => {
    const l = img.naturalWidth;
    const h = img.naturalHeight;
    if (!l || !h) return;
    /* La fenêtre fait 10/16 de la largeur. Reste (h − fenêtre) à parcourir,
       exprimé en pourcentage de la hauteur de l'image pour que `translateY`
       reste juste quelle que soit la largeur d'affichage. */
    const fenetre = l * (10 / 16);
    const course = Math.max(0, h - fenetre);
    setGeo({
      decalage: `-${((course / h) * 100).toFixed(2)}%`,
      duree: `${Math.min(7, Math.max(3.5, (course / fenetre) * 1.05)).toFixed(1)}s`,
    });
  };

  /*
    `onLoad` NE SUFFIT PAS, ET C'EST LE CAS LE PLUS FRÉQUENT.

    Une image déjà en cache est complète avant que React n'attache ses
    gestionnaires : l'événement est passé, `onLoad` ne vient jamais, et la
    géométrie reste nulle. La carte ne défile alors pas du tout — c'est-à-dire
    pour tout visiteur qui revient. Mesuré le 09/10/2026 : `img.complete`
    valait déjà vrai et la durée appliquée était celle du repli.
  */
  useEffect(() => {
    const img = image.current;
    if (img?.complete) mesurer(img);
  }, []);

  return (
    <a
      href={e.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`rv group block ${actif ? 'carte-active' : ''}`}
    >
      {/*
        Les équerres sont posées EN DEHORS de la fenêtre, donc hors du
        conteneur qui rogne : c'est pourquoi le cadre et la fenêtre sont deux
        éléments et non un seul.
      */}
      <div className="relative" ref={(n) => enregistrer(i, n)}>
        <span
          className="cartel absolute -top-3 left-7 z-10 px-2.5 text-2xl leading-none"
          style={{ fontFamily: 'var(--serif)', background: 'var(--encre)', fontVariantNumeric: 'tabular-nums' }}
          aria-hidden="true"
        >
          {String(i + 1).padStart(2, '0')}
        </span>

        <div
          className="overflow-hidden rounded-[2px]"
          style={{ border: '1px solid var(--filet)', aspectRatio: '16 / 10' }}
        >
          <img
            ref={image}
            src={plein}
            srcSet={`${pleinPetit} 700w, ${plein} 1100w`}
            sizes="(min-width: 640px) 46vw, 92vw"
            alt={`Le site de ${e.nom}, ${e.metier}, sur toute sa hauteur`}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={(ev) => mesurer(ev.currentTarget)}
            className={`revele block w-full ${actif ? 'joue' : ''}`}
            style={
              {
                height: 'auto',
                '--decalage': geo?.decalage ?? '0px',
                '--duree': geo?.duree ?? '5s',
              } as React.CSSProperties
            }
          />
        </div>

        <span aria-hidden="true" className="repere pointer-events-none absolute -left-2.5 -top-2.5 h-6 w-6 border-l border-t group-hover:-translate-x-1 group-hover:-translate-y-1" />
        <span aria-hidden="true" className="repere pointer-events-none absolute -right-2.5 -top-2.5 h-6 w-6 border-r border-t group-hover:-translate-y-1 group-hover:translate-x-1" />
        <span aria-hidden="true" className="repere pointer-events-none absolute -bottom-2.5 -left-2.5 h-6 w-6 border-b border-l group-hover:-translate-x-1 group-hover:translate-y-1" />
        <span aria-hidden="true" className="repere pointer-events-none absolute -bottom-2.5 -right-2.5 h-6 w-6 border-b border-r group-hover:translate-x-1 group-hover:translate-y-1" />
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <div>
          <h3 className="text-xl transition-colors duration-300 group-hover:text-[var(--or)]">{e.nom}</h3>
          <p className="mt-1 text-[15px]" style={{ color: 'var(--ivoire-doux)' }}>
            {e.metier} · {e.lieu}
          </p>
        </div>
        <span
          className="inline-flex shrink-0 items-center gap-2 text-[14px] transition-all duration-300 group-hover:gap-3"
          style={{ color: 'var(--or)' }}
        >
          Voir le site
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </a>
  );
}

function Exemples() {
  const cadres = useRef<(HTMLElement | null)[]>([]);
  const [actif, setActif] = useState(-1);

  const enregistrer = (i: number, n: HTMLElement | null) => {
    cadres.current[i] = n;
  };

  /*
    UNE SEULE CARTE DÉFILE À LA FOIS, ET C'EST LE PARENT QUI TRANCHE.

    Chaque carte observant sa propre visibilité, deux voisines dépassaient
    ensemble le seuil sur un écran de téléphone et défilaient de concert —
    mesuré, Ô Gourmandiz et Yann Berthelot en même temps. Une page où tout
    bouge ne montre plus rien.

    Le parent garde donc l'observateur et désigne la carte dont le centre est
    le plus proche de celui de l'écran. Sur ordinateur le survol suffit : rien
    de tout ceci ne tourne.
  */
  useEffect(() => {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    const vus = new Map<HTMLElement, number>();
    const choisir = () => {
      const milieu = window.innerHeight / 2;
      let gagnante = -1;
      let plusProche = Infinity;
      cadres.current.forEach((n, i) => {
        if (!n || !(vus.get(n) ?? 0)) return;
        const r = n.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - milieu);
        if (d < plusProche) { plusProche = d; gagnante = i; }
      });
      setActif(gagnante);
    };

    const obs = new IntersectionObserver(
      (entrees) => {
        entrees.forEach((x) => vus.set(x.target as HTMLElement, x.isIntersecting ? x.intersectionRatio : 0));
        choisir();
      },
      { threshold: [0, 0.4, 0.75, 1] },
    );
    cadres.current.forEach((n) => n && obs.observe(n));
    window.addEventListener('scroll', choisir, { passive: true });
    return () => { obs.disconnect(); window.removeEventListener('scroll', choisir); };
  }, []);

  return (
    <section id="exemples" className="section">
      <div className="conteneur">
        <EnTete surtitre={s.exemples.surtitre} titre={s.exemples.titre} chapo={s.exemples.chapo} />

        <div className="mt-12 md:mt-16 grid gap-8 sm:grid-cols-2 sm:gap-10">
          {s.exemples.liste.map((e, i) => (
            <CarteRealisation key={e.url} e={e} i={i} actif={actif === i} enregistrer={enregistrer} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- à propos */

/*
  Le dernier argument avant le formulaire, et sur ce marché c'est le plus fort :
  un visage. Face à des agences anonymes, être une personne identifiable est un
  avantage, pas une faiblesse. Le portrait est servi en WebP à 50 Ko et ses
  dimensions sont déclarées, pour ne pas faire sauter la page au chargement.
*/
function APropos() {
  const a = s.apropos;

  return (
    <section id="apropos" className="section" style={{ background: 'var(--encre-2)' }}>
      <div className="conteneur">
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-16">
          <div className="rv">
            <img
              src={a.portrait}
              alt="Youenn, fondateur d’Avalon Stratège"
              width={900}
              height={900}
              loading="lazy"
              decoding="async"
              className="w-full max-w-[18rem] rounded-[3px] object-cover md:max-w-none"
              style={{ border: '1px solid var(--filet)' }}
            />
          </div>

          <div>
            <span className="surtitre rv">{a.surtitre}</span>
            <h2 className="rv max-w-[16ch]">{a.titre}</h2>

            <div className="mt-8 space-y-4">
              {a.paragraphes.map((p) => (
                <p key={p} className="rv text-lg leading-relaxed" style={{ color: 'var(--ivoire-doux)' }}>
                  {p}
                </p>
              ))}
            </div>

            <p
              className="rv filet mt-8 pt-8 text-lg"
              style={{ fontFamily: 'var(--serif)', color: 'var(--or)' }}
            >
              {a.repere}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- questions */

function Questions() {
  const [ouvert, setOuvert] = useState<number | null>(0);

  return (
    <section id="questions" className="section" style={{ background: 'var(--encre-2)' }}>
      <div className="conteneur">
        <EnTete surtitre={s.faq.surtitre} titre={s.faq.titre} mesure="max-w-[24ch]" />

        <div className="mt-10 md:mt-14 grid gap-px" style={{ background: 'var(--filet)' }}>
          {s.faq.questions.map((q, i) => {
            const actif = ouvert === i;
            return (
              <div key={q.q} style={{ background: 'var(--encre-2)' }}>
                <button
                  onClick={() => setOuvert(actif ? null : i)}
                  className="flex w-full items-start justify-between gap-8 py-7 text-left"
                  aria-expanded={actif}
                >
                  <span className="text-[17px] font-medium">{q.q}</span>
                  <Plus
                    className="mt-1 h-5 w-5 flex-none transition-transform duration-500"
                    style={{ color: 'var(--or)', transform: actif ? 'rotate(45deg)' : 'none' }}
                  />
                </button>
                {/* Repli par grid-template-rows : l'ouverture s'anime sans hauteur figée. */}
                <div className="grid transition-all duration-500" style={{ gridTemplateRows: actif ? '1fr' : '0fr' }}>
                  <div className="overflow-hidden">
                    <p className="max-w-[70ch] pb-8 leading-relaxed" style={{ color: 'var(--ivoire-doux)' }}>
                      {q.r}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ contact */

function Contact() {
  const tel = telLien(s.coordonnees.telephone);

  return (
    <section id="contact" className="section relative overflow-hidden">
      <div
        className="halo"
        style={{ top: '-6rem', left: '30%', width: '36rem', height: '26rem', background: 'rgba(217,183,120,0.14)' }}
      />
      <div className="conteneur">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <span className="surtitre rv">{s.contact.surtitre}</span>
            <h2 className="rv max-w-[16ch]">{s.contact.titre}</h2>
            <p className="chapo rv">{s.contact.chapo}</p>
          </div>

          <div className="rv grid gap-4">
            <a href={`tel:${tel}`} className="carte flex items-center gap-5 !py-7">
              <Phone className="h-5 w-5 flex-none" style={{ color: 'var(--or)' }} />
              <span>
                <span className="block text-[12px] uppercase" style={{ letterSpacing: '0.2em', color: 'var(--ivoire-doux)' }}>
                  Téléphone
                </span>
                <span style={{ fontFamily: 'var(--serif)' }} className="mt-1 block text-2xl">
                  {s.coordonnees.telephone}
                </span>
              </span>
            </a>

            <a href={`mailto:${s.coordonnees.email}`} className="carte flex items-center gap-5 !py-7">
              <Mail className="h-5 w-5 flex-none" style={{ color: 'var(--or)' }} />
              <span className="min-w-0">
                <span className="block text-[12px] uppercase" style={{ letterSpacing: '0.2em', color: 'var(--ivoire-doux)' }}>
                  Email
                </span>
                <span className="mt-1 block truncate text-lg">{s.coordonnees.email}</span>
              </span>
            </a>

            <div className="carte flex items-center gap-5 !py-7">
              <MapPin className="h-5 w-5 flex-none" style={{ color: 'var(--or)' }} />
              <span>
                <span className="block text-[12px] uppercase" style={{ letterSpacing: '0.2em', color: 'var(--ivoire-doux)' }}>
                  Zone
                </span>
                <span className="mt-1 block text-[15px]">{s.coordonnees.zone}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- pied */

function Pied() {
  return (
    <footer className="filet py-12" style={{ background: 'var(--encre)' }}>
      <div className="conteneur flex flex-wrap items-center justify-between gap-6">
        <div>
          <span style={{ fontFamily: 'var(--serif)' }} className="text-xl">
            {s.marque}
          </span>
          <p className="mt-1 text-[13px]" style={{ color: 'var(--ivoire-doux)' }}>
            {s.signature}
          </p>
        </div>
        <p className="text-[13px]" style={{ color: 'var(--ivoire-doux)' }}>
          © {new Date().getFullYear()} {s.marque} ·{' '}
          <a href="/mentions-legales.html" className="lien-souligne">
            Mentions légales
          </a>{' '}
          ·{' '}
          <a href="/confidentialite.html" className="lien-souligne">
            Confidentialité
          </a>
        </p>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------- page */

export default function App() {
  useReveal();

  return (
    <>
      {/* Premier élément focalisable : permet de sauter la navigation à la
          tabulation. Invisible à la souris, visible dès qu'il reçoit le focus. */}
      <a href="#contenu" className="lien-evitement">
        Aller au contenu
      </a>
      <Navigation />
      <main id="contenu">
        <Hero />
        <Constat />
        <Offres />
        <Methode />
        <Exemples />
        <APropos />
        <Questions />
        <Contact />
      </main>
      <Pied />
    </>
  );
}
