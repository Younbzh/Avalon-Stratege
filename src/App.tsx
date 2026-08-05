import { useEffect, useState } from 'react';
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
          <a href="#" className="flex items-baseline gap-2.5">
            <span style={{ fontFamily: 'var(--serif)' }} className="text-[26px] leading-none tracking-tight">
              {s.marque}
            </span>
            <span
              className="hidden text-[12px] uppercase sm:block"
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

      <div className="conteneur">
        <span className="surtitre rv">{s.hero.accroche}</span>

        <h1 className="rv max-w-[16ch]">
          {s.hero.titre}{' '}
          <em className="not-italic" style={{ color: 'var(--or)' }}>
            {s.hero.titreAccent}
          </em>
          .
          <span className="block" style={{ color: 'var(--ivoire-doux)' }}>
            {s.hero.titreFin}
          </span>
        </h1>

        <p className="chapo rv mt-9 text-xl">{s.hero.chapo}</p>

        <div className="rv mt-12 flex flex-wrap gap-4">
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
    </section>
  );
}

/* ------------------------------------------------------------------ constat */

function Constat() {
  return (
    <section id="constat" className="section">
      <div className="conteneur">
        <span className="surtitre rv">{s.constat.surtitre}</span>
        <h2 className="rv max-w-[20ch]">{s.constat.titre}</h2>

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
  const { liste, entretien, paiement } = s.offres;

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
        <span className="surtitre rv">{s.offres.surtitre}</span>
        <h2 className="rv max-w-[18ch]">{s.offres.titre}</h2>
        <p className="chapo rv">{s.offres.chapo}</p>

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {liste.map((o) => (
            <article key={o.nom} className={`carte rv flex flex-col ${o.recommande ? 'carte-or' : ''}`}>
              {o.recommande && (
                <span
                  className="absolute right-6 top-6 rounded-full px-3 py-1 text-[12px] font-semibold uppercase"
                  style={{ letterSpacing: '0.16em', background: 'var(--or)', color: 'var(--encre)' }}
                >
                  Le plus choisi
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

              {'limite' in o && (
                <p
                  className="mt-6 border-t pt-5 text-[14px]"
                  style={{ borderColor: 'var(--filet)', color: 'var(--ivoire-doux)' }}
                >
                  {(o as { limite: string }).limite}
                </p>
              )}

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
        <span className="surtitre rv">{s.methode.surtitre}</span>
        <h2 className="rv max-w-[16ch]">{s.methode.titre}</h2>
        <p className="chapo rv">{s.methode.chapo}</p>

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

function Exemples() {
  return (
    <section id="exemples" className="section">
      <div className="conteneur">
        <span className="surtitre rv">{s.exemples.surtitre}</span>
        <h2 className="rv max-w-[18ch]">{s.exemples.titre}</h2>
        <p className="chapo rv">{s.exemples.chapo}</p>

        {/*
          Une capture vaut mieux qu'un nom : un visiteur qui n'ouvrira jamais
          quatre onglets juge le travail d'un coup d'œil. Les dimensions sont
          déclarées pour que la page ne saute pas pendant le chargement, et les
          trois dernières images sont différées.
        */}
        <div className="mt-12 md:mt-16 grid gap-8 sm:grid-cols-2 sm:gap-10">
          {s.exemples.liste.map((e, i) => (
            <a
              key={e.url}
              href={e.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rv group block"
            >
              <div
                className="overflow-hidden rounded-[3px]"
                style={{ border: '1px solid var(--filet)' }}
              >
                <img
                  src={e.image}
                  /* Le mobile n'affiche la vignette qu'à 340 pixels : lui envoyer
                     les 1280 de l'écran large gaspillait les trois quarts du
                     poids. Chaque largeur reçoit désormais la sienne. */
                  srcSet={`${e.image.replace('.webp', '-640.webp')} 640w, ${e.image} 1280w`}
                  sizes="(min-width: 640px) 46vw, 92vw"
                  alt={`Page d’accueil du site de ${e.nom}, ${e.metier}`}
                  width={1280}
                  height={800}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="block aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>

              <div className="mt-5 flex items-baseline justify-between gap-4">
                <div>
                  <h3 className="text-xl transition-colors duration-300 group-hover:text-[var(--or)]">
                    {e.nom}
                  </h3>
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
        <span className="surtitre rv">{s.faq.surtitre}</span>
        <h2 className="rv max-w-[18ch]">{s.faq.titre}</h2>

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
