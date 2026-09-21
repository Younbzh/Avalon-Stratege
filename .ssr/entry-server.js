import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { useEffect, useState } from "react";
import { X, Menu, ArrowUpRight, Check, Plus, Phone, Mail, MapPin } from "lucide-react";
const siteConfig = {
  marque: "Avalon Stratège",
  signature: "Sites internet pour artisans et indépendants, partout en France",
  coordonnees: {
    telephone: "06 58 96 89 59",
    email: "avalonstratege@gmail.com",
    zone: "Partout en France · tout se fait à distance"
  },
  hero: {
    accroche: "Artisans & indépendants · partout en France",
    titre: "Le site qui vous fait",
    titreAccent: "trouver",
    titreFin: "Pas juste exister.",
    chapo: "Quand quelqu’un cherche votre métier dans votre commune, il tombe sur un concurrent ou sur vous. C’est le seul enjeu, et c’est le seul que je traite.",
    ctaPrincipal: "Voir des sites en ligne",
    ctaSecondaire: "Parler de mon projet",
    preuves: [
      { valeur: "48h", label: "pour voir votre site" },
      { valeur: "890 €", label: "à partir de" },
      { valeur: "0 €", label: "avant d’avoir vu le résultat" }
    ]
  },
  constat: {
    surtitre: "Le vrai sujet",
    titre: "Vos clients vous cherchent déjà. La question, c’est ce qu’ils trouvent.",
    points: [
      {
        titre: "On vous cherche sur Google",
        texte: "Quelqu’un qui a besoin d’un artisan tape son métier et sa commune sur son téléphone. Si vous n’apparaissez pas dans les premiers résultats, vous n’existez pas pour lui, même si vous êtes le meilleur du secteur."
      },
      {
        titre: "Une page Facebook ne suffit pas",
        texte: "Elle sert à ceux qui vous connaissent déjà. Elle ne remonte presque jamais dans une recherche Google, elle ne dit ni vos tarifs ni votre zone, et elle appartient à Facebook, pas à vous."
      },
      {
        titre: "Un beau site qu’on ne trouve pas ne sert à rien",
        texte: "C’est là que la plupart des sites d’artisans échouent. Le vôtre sera écrit pour être trouvé sur « votre métier + votre commune », et pour donner envie d’appeler une fois trouvé."
      }
    ]
  },
  offres: {
    surtitre: "Ce que ça coûte",
    titre: "Un prix annoncé, aucune surprise.",
    chapo: "Vous payez une fois pour le site. L’entretien mensuel est facultatif, sans engagement, et vous pouvez l’arrêter quand vous voulez.",
    liste: [
      {
        nom: "Visible",
        prix: "890",
        unite: "€",
        mention: "paiement unique",
        pour: "Pour recevoir des demandes de gens qui ne vous connaissent pas encore.",
        inclus: [
          "Un site complet, rapide et lisible sur téléphone",
          "Référencement local sur « votre métier + vos communes »",
          "Votre fiche Google créée et reliée au site",
          "Galerie de vos chantiers ou réalisations",
          "Formulaire de demande de devis",
          "Les questions de vos clients traitées sur la page"
        ],
        recommande: false
      },
      {
        nom: "Territoire",
        prix: "1 290",
        unite: "€",
        mention: "paiement unique",
        pour: "Pour passer devant vos concurrents, commune par commune.",
        inclus: [
          "Tout le Visible, plus :",
          "15 communes travaillées au lieu de 7",
          "Une page par prestation, écrite pour être trouvée",
          "Votre fiche Google complète : services, zone, horaires et photos",
          "Un kit prêt à envoyer pour récolter vos premiers avis Google",
          "Les textes rédigés à partir de votre métier, pas d’un modèle"
        ],
        recommande: true
      },
      {
        nom: "Signature",
        prix: "1 890",
        unite: "€",
        mention: "paiement unique",
        pour: "Pour occuper tout votre secteur, sans avoir à y penser.",
        inclus: [
          "Tout le Territoire, plus :",
          "25 communes travaillées au lieu de 15",
          "Une page dédiée à chacune de vos 5 communes principales",
          "Votre kit de communication offert, d’une valeur de 250 € : carte de visite, flyer et visuels réseaux sociaux",
          "Votre bilan écrit à 3 mois : ce que le site vous apporte, et quoi améliorer"
        ],
        recommande: false
      }
    ],
    /* Le calcul qui justifie le prix, dit une fois sous la grille plutôt que
       répété dans chaque carte. */
    rentabilite: "Un seul chantier décroché grâce au site, et il est remboursé.",
    /* Les indépendants qui n'ont pas besoin d'être trouvés (portfolio, commande
       sur recommandation) ont leur réponse, sans brouiller la comparaison. */
    vitrine: "Pas besoin d’être trouvé sur Google, parce que vos clients viennent déjà par le bouche-à-oreille ? Un site vitrine simple est possible à partir de 590 €.",
    /* Le kit est vendu seul à ce prix : c'est ce qui rend honnête la valeur
       annoncée quand il est offert avec Signature. */
    kit: "Et pour vos chantiers, un kit de communication à vos couleurs : carte de visite, flyer et visuels réseaux sociaux, avec un QR code vers votre site. 250 €, offert avec Signature.",
    /*
      Le déroulé du paiement est affiché sous les prix, et pas seulement dans la
      FAQ : « c'est gratuit » et « la moitié à la commande » se contredisent tant
      que l'ordre des étapes n'est pas dit. Sur une page qui parle d'argent, cette
      ambiguïté-là coûte la confiance.
    */
    paiement: {
      titre: "Quand payez-vous ?",
      etapes: [
        { quand: "À la maquette", combien: "0 €", detail: "Vous voyez votre site avant de vous engager." },
        { quand: "À la commande", combien: "50 %", detail: "Le jour où vous décidez de lancer." },
        { quand: "À la mise en ligne", combien: "50 %", detail: "Une fois le site en service." }
      ]
    },
    entretien: {
      nom: "Entretien",
      prix: "49",
      unite: "€ / mois",
      mention: "sans engagement · résiliable à tout moment",
      pour: "Pour ne plus jamais y penser.",
      inclus: [
        "Hébergement et nom de domaine compris",
        "Vos changements faits par moi sous 48h, sur le site comme sur Google : tarifs, horaires, photos, textes",
        "Sauvegardes et mises à jour techniques",
        "Chaque mois, vos visites et vos appels dans votre boîte mail"
      ],
      /* Le plafond est dit comme ce qu'il permet, et le devis au-delà comme une
         protection : le client ne découvre jamais une facture après coup. */
      note: "Jusqu’à 30 minutes de changements par mois : de quoi tenir vos tarifs, vos horaires et vos photos toujours à jour. Pour un changement plus important, comme une nouvelle page, je vous fais un devis avant : jamais de surprise. Facultatif, et sans entretien le site reste le vôtre."
    }
  },
  methode: {
    surtitre: "Comment ça se passe",
    titre: "Vous n’avez rien à préparer.",
    chapo: "Vous n’écrivez pas les textes, vous ne choisissez pas les couleurs, vous ne créez aucun compte. Vous parlez de votre métier, je m’occupe du reste.",
    etapes: [
      {
        titre: "On discute vingt minutes",
        texte: "Un simple appel. Ce que vous faites, où vous intervenez, quel genre de clients vous cherchez. Ça suffit pour démarrer, et il n’y a pas de rendez-vous à caler."
      },
      {
        titre: "Je vous montre le site",
        texte: "Sous 48h vous recevez un lien. Votre nom, votre métier, votre commune : c’est déjà votre site, pas une maquette vide. Gratuit, et sans aucun engagement de votre part."
      },
      {
        titre: "Vous décidez, on ajuste",
        texte: "Si ça vous plaît, on lance : la moitié à la commande, la moitié le jour de la mise en ligne. Vous m’envoyez vos photos et toutes vos remarques en une fois, puis on fait une dernière passe ensemble : deux séries de retouches, comprises dans le prix."
      },
      {
        titre: "Mise en ligne",
        texte: "Je m’occupe du nom de domaine, de la mise en ligne et de votre fiche Google. Aucune démarche technique de votre côté, et rien à installer."
      }
    ]
  },
  exemples: {
    surtitre: "Des sites en service",
    titre: "Regardez le travail, pas les promesses.",
    chapo: "Six sites réalisés et en ligne aujourd’hui. Cliquez sur l’un d’eux pour l’ouvrir.",
    liste: [
      {
        nom: "Ô Gourmandiz d’Aurore",
        metier: "Pâtisserie artisanale sur commande",
        lieu: "La Motte (22)",
        url: "https://ogourmandizdaurore.com",
        image: "/realisations/ogourmandiz.webp"
      },
      {
        nom: "Yann Berthelot",
        metier: "Conseiller en neuro-nutrition",
        lieu: "Bretagne",
        url: "https://yann-berthelot-nutrition.com",
        image: "/realisations/yann-berthelot.webp"
      },
      {
        nom: "Bourdon Nettoyage",
        metier: "Nettoyage professionnel",
        lieu: "Crédin (56)",
        url: "https://bourdon-nettoyage.vercel.app",
        image: "/realisations/bourdon-nettoyage.webp"
      },
      {
        nom: "BRL Wash 56",
        metier: "Nettoyage automobile et mobilier à domicile",
        lieu: "Vannes (56)",
        url: "https://brl-wash-56.vercel.app",
        image: "/realisations/brl-wash-56.webp"
      },
      {
        nom: "Gwenvaël Darsel",
        metier: "Comédien, portfolio et bande démo",
        lieu: "Paris",
        url: "https://gwenvael-darsel.vercel.app",
        image: "/realisations/gwenvael-darsel.webp"
      },
      {
        nom: "Nail.art.rox by Dina",
        metier: "Prothésiste ongulaire",
        lieu: "Moréac (56)",
        url: "https://nail-art-rox.com",
        image: "/realisations/nail-art-rox.webp"
      }
    ]
  },
  apropos: {
    surtitre: "Qui vous répond",
    titre: "Youenn, et personne d’autre.",
    portrait: "/youenn.webp",
    paragraphes: [
      "Avalon Stratège, c’est moi, seul, depuis la Bretagne. Pas de commercial, pas de chef de projet, pas de sous-traitance à l’autre bout du monde.",
      "Quand vous appelez, c’est moi qui décroche, et c’est moi qui ai fait votre site. Quand vous demandez une modification, c’est encore moi, et elle est faite sous 48 heures.",
      "Je travaille avec des artisans et des indépendants partout en France, entièrement à distance. Aucun déplacement, aucune réunion : le téléphone et quelques messages suffisent, et vous ne perdez pas une demi-journée de chantier."
    ],
    repere: "Je fais ce métier parce que je trouve anormal qu’un artisan paie trois mille euros pour une vitrine qu’il ne comprend pas et qu’il ne peut pas modifier."
  },
  faq: {
    surtitre: "Ce qu’on me demande",
    titre: "Les questions que vous vous posez sûrement.",
    questions: [
      {
        q: "Je n’y connais rien en informatique. C’est un problème ?",
        r: "Non, c’est la situation normale de mes clients. Aucun compte à créer, aucun logiciel à installer, aucun mot de passe à retenir. Vous me parlez de votre métier, je m’occupe de tout le reste."
      },
      {
        q: "Le site m’appartient vraiment ?",
        r: "Oui. Le nom de domaine est déposé à votre nom et le site est le vôtre. Si un jour vous arrêtez l’entretien ou changez de prestataire, vous repartez avec."
      },
      {
        q: "Pourquoi 890 € quand d’autres demandent 3 000 € ?",
        r: "Parce que la partie technique, je ne la refais pas à chaque fois : elle est solide, rapide, et la même pour tous mes clients. Ce que vous payez, c’est ce qui est propre à vous : les textes écrits sur votre métier, le référencement sur vos communes, votre fiche Google. Et pour un artisan, un seul chantier décroché grâce au site suffit à le rembourser."
      },
      {
        q: "Et si le résultat ne me plaît pas ?",
        r: "Vous ne payez rien. Le premier site que je vous montre est gratuit et sans engagement : si ça ne vous convient pas, on s’arrête là, sans discussion et sans frais. Le paiement ne commence que le jour où vous décidez de lancer."
      },
      {
        q: "L’entretien à 49 €/mois est-il obligatoire ?",
        r: "Jamais. Il est utile si vous ne voulez gérer ni l’hébergement ni les modifications, et si vous voulez que vos tarifs, vos horaires et vos photos restent à jour, sur le site comme sur Google. Vous pouvez le prendre plus tard, ou l’arrêter quand vous voulez : il n’y a aucun engagement."
      },
      {
        q: "Combien de temps avant d’être visible sur Google ?",
        r: "Le site est en ligne en quelques jours. Pour la recherche locale, comptez quelques semaines : c’est le temps que Google mette vos pages en avant. Votre fiche Google Business, elle, peut apparaître en quelques jours."
      },
      {
        q: "Vous travaillez partout en France ?",
        r: "Oui, et tout se passe à distance : un appel pour comprendre votre métier, un lien pour voir votre site, des photos que vous m’envoyez par mail ou par message. Vous n’avez pas de rendez-vous à caler ni de déplacement à prévoir : c’est plus rapide pour vous comme pour moi."
      },
      {
        q: "Comment se passe le paiement ?",
        r: "En deux fois, toujours : la moitié à la commande, c’est-à-dire une fois que le site vous a été montré et qu’il vous convient, puis la moitié le jour de la mise en ligne. Rien n’est demandé avant. La facture est une charge déductible pour votre entreprise."
      }
    ]
  },
  contact: {
    surtitre: "On en parle",
    titre: "Vingt minutes suffisent pour savoir si ça vaut le coup.",
    chapo: "Appelez, ou écrivez-moi. Je réponds sous 24h et je vous dis franchement si un site vous sera utile, ou pas."
  }
};
const telLien = (t) => "+33" + t.replace(/[^\d]/g, "").slice(1);
function useReveal() {
  useEffect(() => {
    const cibles = document.querySelectorAll(".rv");
    if (!("IntersectionObserver" in window)) {
      cibles.forEach((n) => n.classList.add("on"));
      return;
    }
    const obs = new IntersectionObserver(
      (entrees) => entrees.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("on");
          obs.unobserve(e.target);
        }
      }),
      { rootMargin: "0px 0px -10% 0px" }
    );
    cibles.forEach((n, i) => {
      n.style.transitionDelay = `${i % 4 * 90}ms`;
      obs.observe(n);
    });
    return () => obs.disconnect();
  }, []);
}
const LIENS = [
  { id: "constat", label: "Pourquoi" },
  { id: "offres", label: "Tarifs" },
  { id: "methode", label: "Méthode" },
  { id: "exemples", label: "Réalisations" },
  { id: "questions", label: "Questions" }
];
function Navigation() {
  const [ouvert, setOuvert] = useState(false);
  const [glisse, setGlisse] = useState(false);
  useEffect(() => {
    const onScroll = () => setGlisse(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsx(
    "header",
    {
      className: `fixed inset-x-0 top-0 z-50 transition-all duration-500 ${glisse ? "backdrop-blur-xl" : ""}`,
      style: {
        background: glisse ? "rgba(8,9,12,0.88)" : "transparent",
        borderBottom: `1px solid ${glisse ? "var(--filet)" : "transparent"}`
      },
      children: /* @__PURE__ */ jsxs("div", { className: "conteneur", children: [
        /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between transition-all duration-500 ${glisse ? "h-16" : "h-24"}`, children: [
          /* @__PURE__ */ jsxs("a", { href: "#", className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "/embleme.webp",
                alt: "",
                "aria-hidden": "true",
                width: 120,
                height: 120,
                className: "h-[34px] w-auto sm:h-[38px]"
              }
            ),
            /* @__PURE__ */ jsx("span", { style: { fontFamily: "var(--serif)" }, className: "text-[26px] leading-none tracking-tight", children: siteConfig.marque }),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "hidden self-end pb-1 text-[12px] uppercase sm:block",
                style: { letterSpacing: "0.24em", color: "var(--ivoire-doux)" },
                children: "France"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("nav", { className: "hidden items-center gap-9 lg:flex", children: LIENS.map((l) => /* @__PURE__ */ jsx(
            "a",
            {
              href: `#${l.id}`,
              className: "text-[14px] transition-colors duration-300 hover:text-[var(--or)]",
              style: { color: "var(--ivoire-doux)" },
              children: l.label
            },
            l.id
          )) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("a", { href: "#contact", className: "bouton bouton-or hidden sm:inline-flex", children: "Me contacter" }),
            /* @__PURE__ */ jsx("button", { onClick: () => setOuvert(!ouvert), className: "p-2 lg:hidden", "aria-label": "Menu", children: ouvert ? /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" }) })
          ] })
        ] }),
        ouvert && /* @__PURE__ */ jsxs(
          "nav",
          {
            className: "flex flex-col gap-1 pb-6 pt-4 lg:hidden",
            style: { borderTop: "1px solid var(--filet)" },
            children: [
              LIENS.map((l) => /* @__PURE__ */ jsx(
                "a",
                {
                  href: `#${l.id}`,
                  onClick: () => setOuvert(false),
                  className: "py-2.5 text-[15px]",
                  style: { color: "var(--ivoire-doux)" },
                  children: l.label
                },
                l.id
              )),
              /* @__PURE__ */ jsx("a", { href: "#contact", onClick: () => setOuvert(false), className: "bouton bouton-or mt-3 self-start", children: "Me contacter" })
            ]
          }
        )
      ] })
    }
  );
}
function Hero() {
  return /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden pb-24 pt-40 md:pb-32 md:pt-52", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "halo",
        style: { top: "-14rem", right: "-8rem", width: "38rem", height: "38rem", background: "rgba(217,183,120,0.16)" }
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "halo",
        style: { bottom: "-16rem", left: "-12rem", width: "34rem", height: "34rem", background: "rgba(120,140,217,0.10)" }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "conteneur", children: [
      /* @__PURE__ */ jsx("span", { className: "surtitre rv", children: siteConfig.hero.accroche }),
      /* @__PURE__ */ jsxs("h1", { className: "rv max-w-[16ch]", children: [
        siteConfig.hero.titre,
        " ",
        /* @__PURE__ */ jsx("em", { className: "not-italic", style: { color: "var(--or)" }, children: siteConfig.hero.titreAccent }),
        ".",
        /* @__PURE__ */ jsx("span", { className: "block", style: { color: "var(--ivoire-doux)" }, children: siteConfig.hero.titreFin })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "chapo rv mt-9 text-xl", children: siteConfig.hero.chapo }),
      /* @__PURE__ */ jsxs("div", { className: "rv mt-12 flex flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxs("a", { href: "#exemples", className: "bouton bouton-or", children: [
          siteConfig.hero.ctaPrincipal,
          /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsx("a", { href: "#contact", className: "bouton bouton-ligne", children: siteConfig.hero.ctaSecondaire })
      ] }),
      /* @__PURE__ */ jsx("dl", { className: "rv filet mt-20 grid gap-10 pt-10 sm:grid-cols-3", children: siteConfig.hero.preuves.map((p) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("dt", { style: { fontFamily: "var(--serif)" }, className: "text-4xl leading-none", children: p.valeur }),
        /* @__PURE__ */ jsx("dd", { className: "mt-2 text-[14px]", style: { color: "var(--ivoire-doux)" }, children: p.label })
      ] }, p.label)) })
    ] })
  ] });
}
function Constat() {
  return /* @__PURE__ */ jsx("section", { id: "constat", className: "section", children: /* @__PURE__ */ jsxs("div", { className: "conteneur", children: [
    /* @__PURE__ */ jsx("span", { className: "surtitre rv", children: siteConfig.constat.surtitre }),
    /* @__PURE__ */ jsx("h2", { className: "rv max-w-[20ch]", children: siteConfig.constat.titre }),
    /* @__PURE__ */ jsx("div", { className: "mt-12 md:mt-16 grid gap-px", style: { background: "var(--filet)" }, children: siteConfig.constat.points.map((p, i) => /* @__PURE__ */ jsxs(
      "article",
      {
        className: "rv grid gap-6 py-10 md:grid-cols-[6rem_1fr_2fr] md:items-baseline md:gap-10",
        style: { background: "var(--encre)" },
        children: [
          /* @__PURE__ */ jsx("span", { style: { fontFamily: "var(--serif)", color: "var(--or-sombre)" }, className: "text-2xl", children: String(i + 1).padStart(2, "0") }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl", children: p.titre }),
          /* @__PURE__ */ jsx("p", { style: { color: "var(--ivoire-doux)" }, children: p.texte })
        ]
      },
      p.titre
    )) })
  ] }) });
}
function Offres() {
  const { liste, entretien, paiement, rentabilite, vitrine, kit } = siteConfig.offres;
  return /* @__PURE__ */ jsxs("section", { id: "offres", className: "section relative overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "halo",
        style: {
          top: "10%",
          left: "50%",
          width: "40rem",
          height: "30rem",
          background: "rgba(217,183,120,0.08)",
          transform: "translateX(-50%)"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "conteneur", children: [
      /* @__PURE__ */ jsx("span", { className: "surtitre rv", children: siteConfig.offres.surtitre }),
      /* @__PURE__ */ jsx("h2", { className: "rv max-w-[18ch]", children: siteConfig.offres.titre }),
      /* @__PURE__ */ jsx("p", { className: "chapo rv", children: siteConfig.offres.chapo }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 grid gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3", children: liste.map((o) => /* @__PURE__ */ jsxs("article", { className: `carte rv flex flex-col ${o.recommande ? "carte-or" : ""}`, children: [
        o.recommande && /* @__PURE__ */ jsx(
          "span",
          {
            className: "absolute right-6 top-6 rounded-full px-3 py-1 text-[12px] font-semibold uppercase",
            style: { letterSpacing: "0.16em", background: "var(--or)", color: "var(--encre)" },
            children: "Conseillée"
          }
        ),
        /* @__PURE__ */ jsx("h3", { style: { fontFamily: "var(--serif)", fontWeight: 400 }, className: "text-2xl", children: o.nom }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-[15px]", style: { color: "var(--ivoire-doux)" }, children: o.pour }),
        /* @__PURE__ */ jsxs("p", { className: "mt-8 flex items-baseline gap-2", children: [
          /* @__PURE__ */ jsx("span", { style: { fontFamily: "var(--serif)" }, className: "text-5xl leading-none lg:text-[3.25rem]", children: o.prix }),
          /* @__PURE__ */ jsx("span", { className: "text-2xl", style: { color: "var(--or)" }, children: o.unite })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-[13px] uppercase", style: { letterSpacing: "0.14em", color: "var(--ivoire-doux)" }, children: o.mention }),
        /* @__PURE__ */ jsx("ul", { className: "mt-9 grid gap-3.5", children: o.inclus.map((ligne) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-[15px]", children: [
          /* @__PURE__ */ jsx(Check, { className: "mt-1 h-4 w-4 flex-none", style: { color: "var(--or)" } }),
          /* @__PURE__ */ jsx("span", { style: { color: "var(--ivoire-doux)" }, children: ligne })
        ] }, ligne)) }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "#contact",
            className: `bouton mt-auto self-start ${o.recommande ? "bouton-or" : "bouton-ligne"}`,
            style: { marginTop: "2.5rem" },
            children: "Demander cette formule"
          }
        )
      ] }, o.nom)) }),
      /* @__PURE__ */ jsxs("div", { className: "rv mx-auto mt-12 max-w-2xl text-center", children: [
        /* @__PURE__ */ jsx("p", { style: { fontFamily: "var(--serif)" }, className: "text-2xl", children: rentabilite }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-[15px]", style: { color: "var(--ivoire-doux)" }, children: vitrine }),
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-[15px]", style: { color: "var(--ivoire-doux)" }, children: [
          kit,
          " ",
          /* @__PURE__ */ jsx("a", { href: "#contact", style: { color: "var(--or)" }, className: "underline underline-offset-4", children: "Parlons-en" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rv mt-14", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-center text-[13px] uppercase", style: { letterSpacing: "0.2em", color: "var(--or)" }, children: paiement.titre }),
        /* @__PURE__ */ jsx("ol", { className: "mt-8 grid gap-px overflow-hidden rounded-2xl md:grid-cols-3", style: { background: "var(--filet)" }, children: paiement.etapes.map((e) => /* @__PURE__ */ jsxs("li", { className: "px-7 py-8 text-center", style: { background: "var(--encre)" }, children: [
          /* @__PURE__ */ jsx("span", { style: { fontFamily: "var(--serif)" }, className: "block text-4xl leading-none", children: e.combien }),
          /* @__PURE__ */ jsx("span", { className: "mt-3 block text-[15px] font-medium", children: e.quand }),
          /* @__PURE__ */ jsx("span", { className: "mt-1.5 block text-[14px]", style: { color: "var(--ivoire-doux)" }, children: e.detail })
        ] }, e.quand)) })
      ] }),
      /* @__PURE__ */ jsxs("article", { className: "carte rv mt-6 grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { style: { fontFamily: "var(--serif)", fontWeight: 400 }, className: "text-2xl", children: entretien.nom }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-[15px]", style: { color: "var(--ivoire-doux)" }, children: entretien.pour }),
          /* @__PURE__ */ jsxs("p", { className: "mt-7 flex items-baseline gap-2", children: [
            /* @__PURE__ */ jsx("span", { style: { fontFamily: "var(--serif)" }, className: "text-6xl leading-none", children: entretien.prix }),
            /* @__PURE__ */ jsx("span", { className: "text-xl", style: { color: "var(--or)" }, children: entretien.unite })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-[13px] uppercase", style: { letterSpacing: "0.14em", color: "var(--ivoire-doux)" }, children: entretien.mention })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("ul", { className: "grid gap-3.5", children: entretien.inclus.map((ligne) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-[15px]", children: [
            /* @__PURE__ */ jsx(Check, { className: "mt-1 h-4 w-4 flex-none", style: { color: "var(--or)" } }),
            /* @__PURE__ */ jsx("span", { style: { color: "var(--ivoire-doux)" }, children: ligne })
          ] }, ligne)) }),
          /* @__PURE__ */ jsx("p", { className: "mt-7 text-[14px] italic", style: { color: "var(--or-sombre)" }, children: entretien.note })
        ] })
      ] })
    ] })
  ] });
}
function Methode() {
  return /* @__PURE__ */ jsx("section", { id: "methode", className: "section", style: { background: "var(--encre-2)" }, children: /* @__PURE__ */ jsxs("div", { className: "conteneur", children: [
    /* @__PURE__ */ jsx("span", { className: "surtitre rv", children: siteConfig.methode.surtitre }),
    /* @__PURE__ */ jsx("h2", { className: "rv max-w-[16ch]", children: siteConfig.methode.titre }),
    /* @__PURE__ */ jsx("p", { className: "chapo rv", children: siteConfig.methode.chapo }),
    /* @__PURE__ */ jsx("ol", { className: "mt-12 md:mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4", children: siteConfig.methode.etapes.map((e, i) => /* @__PURE__ */ jsxs("li", { className: "carte rv", children: [
      /* @__PURE__ */ jsx(
        "span",
        {
          style: { fontFamily: "var(--serif)", color: "var(--or)" },
          className: "text-5xl leading-none opacity-40",
          children: String(i + 1).padStart(2, "0")
        }
      ),
      /* @__PURE__ */ jsx("h3", { className: "mt-6 text-lg", children: e.titre }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-[15px] leading-relaxed", style: { color: "var(--ivoire-doux)" }, children: e.texte })
    ] }, e.titre)) })
  ] }) });
}
function Exemples() {
  return /* @__PURE__ */ jsx("section", { id: "exemples", className: "section", children: /* @__PURE__ */ jsxs("div", { className: "conteneur", children: [
    /* @__PURE__ */ jsx("span", { className: "surtitre rv", children: siteConfig.exemples.surtitre }),
    /* @__PURE__ */ jsx("h2", { className: "rv max-w-[18ch]", children: siteConfig.exemples.titre }),
    /* @__PURE__ */ jsx("p", { className: "chapo rv", children: siteConfig.exemples.chapo }),
    /* @__PURE__ */ jsx("div", { className: "mt-12 md:mt-16 grid gap-8 sm:grid-cols-2 sm:gap-10", children: siteConfig.exemples.liste.map((e, i) => /* @__PURE__ */ jsxs(
      "a",
      {
        href: e.url,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "rv group block",
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "overflow-hidden rounded-[3px]",
              style: { border: "1px solid var(--filet)" },
              children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: e.image,
                  srcSet: `${e.image.replace(".webp", "-640.webp")} 640w, ${e.image} 1280w`,
                  sizes: "(min-width: 640px) 46vw, 92vw",
                  alt: `Page d’accueil du site de ${e.nom}, ${e.metier}`,
                  width: 1280,
                  height: 800,
                  loading: i === 0 ? "eager" : "lazy",
                  decoding: "async",
                  className: "block aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 flex items-baseline justify-between gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl transition-colors duration-300 group-hover:text-[var(--or)]", children: e.nom }),
              /* @__PURE__ */ jsxs("p", { className: "mt-1 text-[15px]", style: { color: "var(--ivoire-doux)" }, children: [
                e.metier,
                " · ",
                e.lieu
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              "span",
              {
                className: "inline-flex shrink-0 items-center gap-2 text-[14px] transition-all duration-300 group-hover:gap-3",
                style: { color: "var(--or)" },
                children: [
                  "Voir le site",
                  /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4" })
                ]
              }
            )
          ] })
        ]
      },
      e.url
    )) })
  ] }) });
}
function APropos() {
  const a = siteConfig.apropos;
  return /* @__PURE__ */ jsx("section", { id: "apropos", className: "section", style: { background: "var(--encre-2)" }, children: /* @__PURE__ */ jsx("div", { className: "conteneur", children: /* @__PURE__ */ jsxs("div", { className: "grid items-center gap-10 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-16", children: [
    /* @__PURE__ */ jsx("div", { className: "rv", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: a.portrait,
        alt: "Youenn, fondateur d’Avalon Stratège",
        width: 900,
        height: 900,
        loading: "lazy",
        decoding: "async",
        className: "w-full max-w-[18rem] rounded-[3px] object-cover md:max-w-none",
        style: { border: "1px solid var(--filet)" }
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("span", { className: "surtitre rv", children: a.surtitre }),
      /* @__PURE__ */ jsx("h2", { className: "rv max-w-[16ch]", children: a.titre }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 space-y-4", children: a.paragraphes.map((p) => /* @__PURE__ */ jsx("p", { className: "rv text-lg leading-relaxed", style: { color: "var(--ivoire-doux)" }, children: p }, p)) }),
      /* @__PURE__ */ jsx(
        "p",
        {
          className: "rv filet mt-8 pt-8 text-lg",
          style: { fontFamily: "var(--serif)", color: "var(--or)" },
          children: a.repere
        }
      )
    ] })
  ] }) }) });
}
function Questions() {
  const [ouvert, setOuvert] = useState(0);
  return /* @__PURE__ */ jsx("section", { id: "questions", className: "section", style: { background: "var(--encre-2)" }, children: /* @__PURE__ */ jsxs("div", { className: "conteneur", children: [
    /* @__PURE__ */ jsx("span", { className: "surtitre rv", children: siteConfig.faq.surtitre }),
    /* @__PURE__ */ jsx("h2", { className: "rv max-w-[18ch]", children: siteConfig.faq.titre }),
    /* @__PURE__ */ jsx("div", { className: "mt-10 md:mt-14 grid gap-px", style: { background: "var(--filet)" }, children: siteConfig.faq.questions.map((q, i) => {
      const actif = ouvert === i;
      return /* @__PURE__ */ jsxs("div", { style: { background: "var(--encre-2)" }, children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setOuvert(actif ? null : i),
            className: "flex w-full items-start justify-between gap-8 py-7 text-left",
            "aria-expanded": actif,
            children: [
              /* @__PURE__ */ jsx("span", { className: "text-[17px] font-medium", children: q.q }),
              /* @__PURE__ */ jsx(
                Plus,
                {
                  className: "mt-1 h-5 w-5 flex-none transition-transform duration-500",
                  style: { color: "var(--or)", transform: actif ? "rotate(45deg)" : "none" }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "grid transition-all duration-500", style: { gridTemplateRows: actif ? "1fr" : "0fr" }, children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx("p", { className: "max-w-[70ch] pb-8 leading-relaxed", style: { color: "var(--ivoire-doux)" }, children: q.r }) }) })
      ] }, q.q);
    }) })
  ] }) });
}
function Contact() {
  const tel = telLien(siteConfig.coordonnees.telephone);
  return /* @__PURE__ */ jsxs("section", { id: "contact", className: "section relative overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "halo",
        style: { top: "-6rem", left: "30%", width: "36rem", height: "26rem", background: "rgba(217,183,120,0.14)" }
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "conteneur", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "surtitre rv", children: siteConfig.contact.surtitre }),
        /* @__PURE__ */ jsx("h2", { className: "rv max-w-[16ch]", children: siteConfig.contact.titre }),
        /* @__PURE__ */ jsx("p", { className: "chapo rv", children: siteConfig.contact.chapo })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rv grid gap-4", children: [
        /* @__PURE__ */ jsxs("a", { href: `tel:${tel}`, className: "carte flex items-center gap-5 !py-7", children: [
          /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5 flex-none", style: { color: "var(--or)" } }),
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("span", { className: "block text-[12px] uppercase", style: { letterSpacing: "0.2em", color: "var(--ivoire-doux)" }, children: "Téléphone" }),
            /* @__PURE__ */ jsx("span", { style: { fontFamily: "var(--serif)" }, className: "mt-1 block text-2xl", children: siteConfig.coordonnees.telephone })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("a", { href: `mailto:${siteConfig.coordonnees.email}`, className: "carte flex items-center gap-5 !py-7", children: [
          /* @__PURE__ */ jsx(Mail, { className: "h-5 w-5 flex-none", style: { color: "var(--or)" } }),
          /* @__PURE__ */ jsxs("span", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("span", { className: "block text-[12px] uppercase", style: { letterSpacing: "0.2em", color: "var(--ivoire-doux)" }, children: "Email" }),
            /* @__PURE__ */ jsx("span", { className: "mt-1 block truncate text-lg", children: siteConfig.coordonnees.email })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "carte flex items-center gap-5 !py-7", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5 flex-none", style: { color: "var(--or)" } }),
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("span", { className: "block text-[12px] uppercase", style: { letterSpacing: "0.2em", color: "var(--ivoire-doux)" }, children: "Zone" }),
            /* @__PURE__ */ jsx("span", { className: "mt-1 block text-[15px]", children: siteConfig.coordonnees.zone })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
function Pied() {
  return /* @__PURE__ */ jsx("footer", { className: "filet py-12", style: { background: "var(--encre)" }, children: /* @__PURE__ */ jsxs("div", { className: "conteneur flex flex-wrap items-center justify-between gap-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("span", { style: { fontFamily: "var(--serif)" }, className: "text-xl", children: siteConfig.marque }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-[13px]", style: { color: "var(--ivoire-doux)" }, children: siteConfig.signature })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "text-[13px]", style: { color: "var(--ivoire-doux)" }, children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " ",
      siteConfig.marque,
      " ·",
      " ",
      /* @__PURE__ */ jsx("a", { href: "/mentions-legales.html", className: "lien-souligne", children: "Mentions légales" }),
      " ",
      "·",
      " ",
      /* @__PURE__ */ jsx("a", { href: "/confidentialite.html", className: "lien-souligne", children: "Confidentialité" })
    ] })
  ] }) });
}
function App() {
  useReveal();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("a", { href: "#contenu", className: "lien-evitement", children: "Aller au contenu" }),
    /* @__PURE__ */ jsx(Navigation, {}),
    /* @__PURE__ */ jsxs("main", { id: "contenu", children: [
      /* @__PURE__ */ jsx(Hero, {}),
      /* @__PURE__ */ jsx(Constat, {}),
      /* @__PURE__ */ jsx(Offres, {}),
      /* @__PURE__ */ jsx(Methode, {}),
      /* @__PURE__ */ jsx(Exemples, {}),
      /* @__PURE__ */ jsx(APropos, {}),
      /* @__PURE__ */ jsx(Questions, {}),
      /* @__PURE__ */ jsx(Contact, {})
    ] }),
    /* @__PURE__ */ jsx(Pied, {})
  ] });
}
function rendre() {
  return renderToString(/* @__PURE__ */ jsx(App, {}));
}
export {
  rendre
};
