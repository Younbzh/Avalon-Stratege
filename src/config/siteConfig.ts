/**
 * Contenu du site Avalon.
 *
 * Règle de rédaction : le lecteur est un artisan qui vient de créer sa boîte.
 * Il ne sait pas ce qu'est un CMS, un hébergement ou une balise title, et il n'a
 * aucune raison de l'apprendre. Chaque phrase doit être comprise par quelqu'un
 * qui n'a jamais eu de site, sans sonner naïf pour autant, puisque c'est aussi
 * ce texte qui doit inspirer l'expertise.
 */

export const siteConfig = {
  marque: 'Avalon Stratège',
  signature: 'Sites internet pour artisans et indépendants, partout en France',
  url: 'https://www.avalonstratege.fr',

  coordonnees: {
    telephone: '06 58 96 89 59',
    email: 'avalonstratege@gmail.com',
    zone: 'Partout en France · tout se fait à distance',
    delai: '24h',
  },

  hero: {
    accroche: 'Artisans & indépendants · partout en France',
    titre: 'Le site qui vous fait',
    titreAccent: 'trouver',
    titreFin: 'Pas juste exister.',
    chapo:
      'Quand quelqu’un cherche votre métier dans votre commune, il tombe sur un concurrent ou sur vous. C’est le seul enjeu, et c’est le seul que je traite.',
    ctaPrincipal: 'Voir des sites en ligne',
    ctaSecondaire: 'Parler de mon projet',
    preuves: [
      { valeur: '48h', label: 'pour voir votre site' },
      { valeur: '490 €', label: 'à partir de' },
      { valeur: '0 €', label: 'avant d’avoir vu le résultat' },
    ],
  },

  constat: {
    surtitre: 'Le vrai sujet',
    titre: 'Vos clients vous cherchent déjà. La question, c’est ce qu’ils trouvent.',
    points: [
      {
        titre: 'On vous cherche sur Google',
        texte:
          'Quelqu’un qui a besoin d’un artisan tape son métier et sa commune sur son téléphone. Si vous n’apparaissez pas dans les premiers résultats, vous n’existez pas pour lui, même si vous êtes le meilleur du secteur.',
      },
      {
        titre: 'Une page Facebook ne suffit pas',
        texte:
          'Elle sert à ceux qui vous connaissent déjà. Elle ne remonte presque jamais dans une recherche Google, elle ne dit ni vos tarifs ni votre zone, et elle appartient à Facebook, pas à vous.',
      },
      {
        titre: 'Un beau site qu’on ne trouve pas ne sert à rien',
        texte:
          'C’est là que la plupart des sites d’artisans échouent. Le vôtre sera écrit pour être trouvé sur « votre métier + votre commune », et pour donner envie d’appeler une fois trouvé.',
      },
    ],
  },

  offres: {
    surtitre: 'Ce que ça coûte',
    titre: 'Un prix annoncé, aucune surprise.',
    chapo:
      'Vous payez une fois pour le site. L’entretien mensuel est facultatif, sans engagement, et vous pouvez l’arrêter quand vous voulez.',
    liste: [
      {
        nom: 'Essentiel',
        prix: '490',
        unite: '€',
        mention: 'paiement unique',
        pour: 'Pour exister proprement en ligne.',
        inclus: [
          'Un site complet, sur une page fluide',
          'Vos prestations, votre zone, vos coordonnées',
          'Rapide et lisible sur téléphone',
          'Vos photos intégrées',
          'En ligne sous 5 jours',
        ],
        recommande: false,
      },
      {
        nom: 'Pro',
        prix: '690',
        unite: '€',
        mention: 'paiement unique',
        pour: 'Pour être trouvé et recevoir des demandes.',
        inclus: [
          'Tout l’Essentiel, plus :',
          'Référencement local sur « votre métier + vos communes »',
          'Votre fiche Google créée et reliée au site',
          'Galerie de vos chantiers ou réalisations',
          'Formulaire de demande de devis',
          'Les questions de vos clients traitées sur la page',
        ],
        recommande: true,
      },
    ],
    /*
      Le déroulé du paiement est affiché sous les prix, et pas seulement dans la
      FAQ : « c'est gratuit » et « la moitié à la commande » se contredisent tant
      que l'ordre des étapes n'est pas dit. Sur une page qui parle d'argent, cette
      ambiguïté-là coûte la confiance.
    */
    paiement: {
      titre: 'Quand payez-vous ?',
      etapes: [
        { quand: 'À la maquette', combien: '0 €', detail: 'Vous voyez votre site avant de vous engager.' },
        { quand: 'À la commande', combien: '50 %', detail: 'Le jour où vous décidez de lancer.' },
        { quand: 'À la mise en ligne', combien: '50 %', detail: 'Une fois le site en service.' },
      ],
    },

    entretien: {
      nom: 'Entretien',
      prix: '49',
      unite: '€ / mois',
      mention: 'sans engagement · résiliable à tout moment',
      pour: 'Pour ne plus jamais y penser.',
      inclus: [
        'Hébergement et nom de domaine compris',
        'Vos modifications faites par moi sous 48h : textes, photos, tarifs, horaires',
        'Votre fiche Google tenue à jour',
        'Sauvegardes et mises à jour techniques',
        'Chaque mois, un point clair : combien de visites, combien d’appels',
      ],
      note:
        'Facultatif. Sans entretien le site reste le vôtre : c’est vous qui gérez l’hébergement et les modifications.',
    },
  },

  methode: {
    surtitre: 'Comment ça se passe',
    titre: 'Vous n’avez rien à préparer.',
    chapo:
      'Vous n’écrivez pas les textes, vous ne choisissez pas les couleurs, vous ne créez aucun compte. Vous parlez de votre métier, je m’occupe du reste.',
    etapes: [
      {
        titre: 'On discute vingt minutes',
        texte:
          'Un simple appel. Ce que vous faites, où vous intervenez, quel genre de clients vous cherchez. Ça suffit pour démarrer, et il n’y a pas de rendez-vous à caler.',
      },
      {
        titre: 'Je vous montre le site',
        texte:
          'Sous 48h vous recevez un lien. Votre nom, votre métier, votre commune : c’est déjà votre site, pas une maquette vide. Gratuit, et sans aucun engagement de votre part.',
      },
      {
        titre: 'Vous décidez, on ajuste',
        texte:
          'Si ça vous plaît, on lance : la moitié à la commande, la moitié le jour de la mise en ligne. Vous m’envoyez vos photos et vos corrections, et on reprend autant de fois qu’il faut.',
      },
      {
        titre: 'Mise en ligne',
        texte:
          'Je m’occupe du nom de domaine, de la mise en ligne et de votre fiche Google. Aucune démarche technique de votre côté, et rien à installer.',
      },
    ],
  },

  exemples: {
    surtitre: 'Des sites en service',
    titre: 'Regardez le travail, pas les promesses.',
    chapo: 'Quatre sites réalisés et en ligne aujourd’hui. Ouvrez-les depuis votre téléphone.',
    liste: [
      {
        nom: 'Ô Gourmandiz d’Aurore',
        metier: 'Pâtisserie artisanale sur commande',
        lieu: 'La Motte (22)',
        url: 'https://ogourmandizdaurore.com',
      },
      {
        nom: 'Yann Berthelot',
        metier: 'Conseiller en neuro-nutrition',
        lieu: 'Bretagne',
        url: 'https://yann-berthelot-nutrition.com',
      },
      {
        nom: 'Bourdon Nettoyage',
        metier: 'Nettoyage professionnel',
        lieu: 'Crédin (56)',
        url: 'https://bourdon-nettoyage.vercel.app',
      },
      {
        nom: 'Nail.art.rox by Dina',
        metier: 'Prothésiste ongulaire',
        lieu: 'Moréac (56)',
        url: 'https://nail-art-rox.com',
      },
    ],
  },

  faq: {
    surtitre: 'Ce qu’on me demande',
    titre: 'Les questions que vous vous posez sûrement.',
    questions: [
      {
        q: 'Je n’y connais rien en informatique. C’est un problème ?',
        r: 'Non, c’est la situation normale de mes clients. Aucun compte à créer, aucun logiciel à installer, aucun mot de passe à retenir. Vous me parlez de votre métier, je m’occupe de tout le reste.',
      },
      {
        q: 'Le site m’appartient vraiment ?',
        r: 'Oui. Le nom de domaine est déposé à votre nom et le site est le vôtre. Si un jour vous arrêtez l’entretien ou changez de prestataire, vous repartez avec.',
      },
      {
        q: 'Pourquoi 490 € quand d’autres demandent 3 000 € ?',
        r: 'Parce que je ne repars pas de zéro à chaque fois. J’ai construit une base solide que j’adapte à votre métier et à votre commune. Vous payez le travail utile (les textes, le référencement, la mise en ligne) et pas des heures de développement que personne ne verra.',
      },
      {
        q: 'Et si le résultat ne me plaît pas ?',
        r: 'Vous ne payez rien. Le premier site que je vous montre est gratuit et sans engagement : si ça ne vous convient pas, on s’arrête là, sans discussion et sans frais. Le paiement ne commence que le jour où vous décidez de lancer.',
      },
      {
        q: 'L’entretien à 49 €/mois est-il obligatoire ?',
        r: 'Jamais. Il est utile si vous ne voulez gérer ni l’hébergement ni les modifications, et si vous voulez que votre fiche Google reste vivante. Vous pouvez le prendre plus tard, ou l’arrêter quand vous voulez : il n’y a aucun engagement.',
      },
      {
        q: 'Combien de temps avant d’être visible sur Google ?',
        r: 'Le site est en ligne en quelques jours. Pour la recherche locale, comptez quelques semaines : c’est le temps que Google mette vos pages en avant. Votre fiche Google Business, elle, peut apparaître en quelques jours.',
      },
      {
        q: 'Vous travaillez partout en France ?',
        r: 'Oui, et tout se passe à distance : un appel pour comprendre votre métier, un lien pour voir votre site, des photos que vous m’envoyez par mail ou par message. Vous n’avez pas de rendez-vous à caler ni de déplacement à prévoir : c’est plus rapide pour vous comme pour moi.',
      },
      {
        q: 'Comment se passe le paiement ?',
        r: 'En deux fois, toujours : la moitié à la commande, c’est-à-dire une fois que le site vous a été montré et qu’il vous convient, puis la moitié le jour de la mise en ligne. Rien n’est demandé avant. La facture est une charge déductible pour votre entreprise.',
      },
    ],
  },

  contact: {
    surtitre: 'On en parle',
    titre: 'Vingt minutes suffisent pour savoir si ça vaut le coup.',
    chapo:
      'Appelez, ou écrivez-moi. Je réponds sous 24h et je vous dis franchement si un site vous sera utile, ou pas.',
  },
};

export type SiteConfig = typeof siteConfig;
