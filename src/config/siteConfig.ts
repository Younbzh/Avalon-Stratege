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
  url: 'https://www.avalon-stratege.com',

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
    /*
      Quatre sites qui défilent, filmés sur un téléphone.

      Un site d'agence qui AFFIRME faire du bon travail vaut moins qu'un site
      qui en montre quatre en seize secondes : le visiteur juge en regardant,
      pas en lisant.

      Deux clients qui ont donné leur accord, et deux démonstrations de métier
      faites pour ça. On ne filme jamais la maquette d'un prospect qui n'a rien
      signé, même réussie : c'est son nom et son adresse qui défileraient.

      Refaite en une commande quand le portfolio bouge :
        node Prospection/pipeline/auditeur/capture-sites.mjs public/videos <url…>
    */
    video: '/videos/hero-v1.mp4',
    videoAffiche: '/videos/hero-v1.jpg',
    preuves: [
      { valeur: '48h', label: 'pour voir votre site' },
      { valeur: '890 €', label: 'à partir de' },
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
        titre: 'Une commune, une page',
        texte:
          'C’est là que la plupart des sites d’artisans échouent : ils citent dix communes dans une phrase du pied de page, et ne sortent sur aucune. Le vôtre aura une page entière par commune desservie, avec la distance depuis votre atelier et ce que vous y faites. C’est cette page-là que Google montre à quelqu’un qui cherche dans son bourg.',
      },
      /*
        L'argument qui manquait au site alors qu'il est au cœur de chaque SMS
        envoyé depuis septembre. Dit sans jargon : ni « LLM », ni « GEO », ni
        « optimisation sémantique ». Le test est le même que celui du message,
        et il est vérifiable en dix secondes par le lecteur.
      */
      {
        titre: 'Et maintenant, on demande aussi à ChatGPT',
        texte:
          'De plus en plus de gens ne tapent plus sur Google : ils demandent « un couvreur fiable près de chez moi » à un assistant, et suivent la réponse. Faites le test pour votre métier : il vous cite ? Ces assistants ne lisent pas les sites comme un navigateur, et la plupart leur apparaissent vides. Les sites que je fais sont écrits pour être lus, cités et recommandés par eux.',
      },
    ],
  },

  offres: {
    surtitre: 'Ce que ça coûte',
    titre: 'Un prix annoncé, aucune surprise.',
    /* Dit d'entrée, parce que c'est contre-intuitif : ailleurs, l'offre d'entrée
       est toujours la version fade. Ici le design est le même partout, et ce qui
       se paie est le territoire couvert. */
    chapo:
      'La mise en page est la même dans les trois formules : je ne vends pas un design au rabais. Ce qui change, c’est le nombre de communes travaillées — et une commune travaillée, c’est une page entière écrite pour elle, avec la distance depuis chez vous et ce qu’on y fait, pas son nom ajouté dans une liste. C’est ce qui vous fait sortir sur « votre métier + Plénée-Jugon » quand votre concurrent ne sort que sur sa propre commune. Vous payez une fois pour le site ; l’entretien mensuel est facultatif, sans engagement, et vous pouvez l’arrêter quand vous voulez.',
    liste: [
      {
        nom: 'Locale',
        prix: '890',
        unite: '€',
        mention: 'paiement unique',
        pour: 'Pour recevoir des demandes de gens qui ne vous connaissent pas encore.',
        inclus: [
          'Un site complet, rapide et lisible sur téléphone',
          'Votre vidéo d’accueil, montée à partir de vos photos de chantier',
          'Une vraie page pour chacune de vos 7 communes, pas une liste de noms',
          'Votre fiche Google créée et reliée au site',
          'Galerie de vos chantiers ou réalisations',
          'Formulaire de demande de devis',
          'Les questions de vos clients traitées sur la page',
        ],
        recommande: false,
      },
      {
        nom: 'Territoire',
        prix: '1 290',
        unite: '€',
        mention: 'paiement unique',
        pour: 'Pour passer devant vos concurrents, commune par commune.',
        inclus: [
          'Tout le Locale, plus :',
          '15 communes travaillées au lieu de 7',
          'Une page par prestation, écrite pour être trouvée',
          'Votre fiche Google complète : services, zone, horaires et photos',
          'Un kit prêt à envoyer pour récolter vos premiers avis Google',
          'Les textes rédigés à partir de votre métier, pas d’un modèle',
        ],
        recommande: true,
      },
      {
        nom: 'Signature',
        prix: '1 890',
        unite: '€',
        mention: 'paiement unique',
        pour: 'Pour occuper tout votre secteur, sans avoir à y penser.',
        inclus: [
          'Tout le Territoire, plus :',
          '25 communes travaillées au lieu de 15',
          'Une page dédiée à chacune de vos 5 communes principales',
          'Votre kit de communication offert, d’une valeur de 250 € : carte de visite, flyer et visuels réseaux sociaux',
          'Votre bilan écrit à 3 mois : ce que le site vous apporte, et quoi améliorer',
        ],
        recommande: false,
      },
    ],

    /* Le calcul qui justifie le prix, dit une fois sous la grille plutôt que
       répété dans chaque carte. */
    rentabilite: 'Un seul chantier décroché grâce au site, et il est remboursé.',

    /* Les indépendants qui n'ont pas besoin d'être trouvés (portfolio, commande
       sur recommandation) ont leur réponse, sans brouiller la comparaison. */
    vitrine:
      'Pas besoin d’être trouvé sur Google, parce que vos clients viennent déjà par le bouche-à-oreille ? Un site vitrine simple est possible à partir de 590 €.',

    /* Le kit est vendu seul à ce prix : c'est ce qui rend honnête la valeur
       annoncée quand il est offert avec Signature. */
    kit: 'Et pour vos chantiers, un kit de communication à vos couleurs : carte de visite, flyer et visuels réseaux sociaux, avec un QR code vers votre site. 250 €, offert avec Signature.',

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
        'Vos changements faits par moi sous 48h, sur le site comme sur Google : tarifs, horaires, photos, textes',
        'Sauvegardes et mises à jour techniques',
        'Chaque mois, vos visites et vos appels dans votre boîte mail',
      ],
      /* Le plafond est dit comme ce qu'il permet, et le devis au-delà comme une
         protection : le client ne découvre jamais une facture après coup. */
      note:
        'Jusqu’à 30 minutes de changements par mois : de quoi tenir vos tarifs, vos horaires et vos photos toujours à jour. Pour un changement plus important, comme une nouvelle page, je vous fais un devis avant : jamais de surprise. Facultatif, et sans entretien le site reste le vôtre.',
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
          'Si ça vous plaît, on lance : la moitié à la commande, la moitié le jour de la mise en ligne. Vous m’envoyez vos photos et toutes vos remarques en une fois, puis on fait une dernière passe ensemble : deux séries de retouches, comprises dans le prix.',
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
    /* « En service » ne vaut que pour les sites de vrais clients. Les trois
       démonstrations sont annoncées comme telles, dans leur libellé de métier
       et ici : un visiteur ne doit pas croire qu'une entreprise inventée est
       une référence. */
    chapo:
      'Sept sites et trois démonstrations de métier faites pour être montrées. Cliquez sur l’un d’eux pour l’ouvrir.',
    liste: [
      {
        nom: 'Ô Gourmandiz d’Aurore',
        metier: 'Pâtisserie artisanale sur commande',
        lieu: 'La Motte (22)',
        url: 'https://ogourmandizdaurore.com',
        image: '/realisations/ogourmandiz-v2.webp',
      },
      {
        nom: 'Yann Berthelot',
        metier: 'Conseiller en neuro-nutrition',
        lieu: 'Bretagne',
        url: 'https://yann-berthelot-nutrition.com',
        image: '/realisations/yann-berthelot-v2.webp',
      },
      /*
        LES DÉMONSTRATIONS DE MÉTIER, ET POURQUOI ELLES REMPLACENT LES MAQUETTES.

        Premier essai : KL Menuiserie et le Rugby Club Pontivyen, deux maquettes
        vraies et abouties. Mauvaise idée, et c'est Youenn qui l'a vu —
        publier le site d'une entreprise qui n'a rien signé, sous son nom et son
        adresse, c'est lui imposer une vitrine qu'elle n'a pas demandée. Elle
        peut s'y opposer, et elle aurait raison.

        Ces trois-là sont des entreprises INVENTÉES, bâties pour être montrées :
        Couverture, Plomberie et Menuiserie Exemple. Leur numéro est une plage
        ARCEP réservée à la fiction, jamais attribuée à personne. Elles montrent
        exactement la même mise en page, sans engager qui que ce soit.

        Elles règlent aussi le vrai manque : des six exemples d'origine —
        pâtisserie, nutrition, nettoyage, lavage auto, comédien, ongles — aucun
        n'était du bâtiment, alors que c'est toute la prospection. Un couvreur
        qui arrivait ici ne voyait rien qui ressemble à son métier.
      */
      {
        nom: 'Couverture Exemple',
        metier: 'Couvreur zingueur · démonstration',
        lieu: 'Loudéac (22)',
        url: 'https://demo-couvreur.avalon-stratege.com',
        image: '/realisations/demo-couvreur.webp',
      },
      {
        nom: 'Plomberie Exemple',
        metier: 'Plombier chauffagiste · démonstration',
        lieu: 'Loudéac (22)',
        url: 'https://demo-plombier.avalon-stratege.com',
        image: '/realisations/demo-plombier.webp',
      },
      {
        nom: 'Menuiserie Exemple',
        metier: 'Menuisier agenceur · démonstration',
        lieu: 'Loudéac (22)',
        url: 'https://demo-menuisier.avalon-stratege.com',
        image: '/realisations/demo-menuisier.webp',
      },
      /*
        Le seul site d'un vrai client qui ne soit pas une entreprise : il montre
        qu'on sort du gabarit artisan quand le client est une association —
        palette, mise en page et vocabulaire changent entièrement.

        Youenn connaît le bureau et a choisi de le montrer. Pensez à le leur
        dire : ce site reste une maquette qu'ils n'ont pas encore commandée.
      */
      {
        nom: 'Breizh Boxing Club',
        metier: 'Club de boxe, créneaux et inscriptions',
        lieu: 'Loudéac (22)',
        url: 'https://site-breizh-boxing-club-loudeac.vercel.app',
        image: '/realisations/bbcl.webp',
      },
      {
        nom: 'Bourdon Nettoyage',
        metier: 'Nettoyage professionnel',
        lieu: 'Crédin (56)',
        url: 'https://bourdon-nettoyage.vercel.app',
        image: '/realisations/bourdon-nettoyage-v2.webp',
      },
      {
        nom: 'Gwenvaël Darsel',
        metier: 'Comédien, portfolio et bande démo',
        lieu: 'Paris',
        url: 'https://gwenvael-darsel.vercel.app',
        image: '/realisations/gwenvael-darsel-v2.webp',
      },
      {
        nom: 'Nail.art.rox by Dina',
        metier: 'Prothésiste ongulaire',
        lieu: 'Moréac (56)',
        url: 'https://nail-art-rox.com',
        image: '/realisations/nail-art-rox-v2.webp',
      },
    ],
  },

  apropos: {
    surtitre: 'Qui vous répond',
    titre: 'Youenn, et personne d’autre.',
    portrait: '/youenn.webp',
    paragraphes: [
      'Avalon Stratège, c’est moi, seul, depuis la Bretagne. Pas de commercial, pas de chef de projet, pas de sous-traitance à l’autre bout du monde.',
      'Quand vous appelez, c’est moi qui décroche, et c’est moi qui ai fait votre site. Quand vous demandez une modification, c’est encore moi, et elle est faite sous 48 heures.',
      'Je travaille avec des artisans et des indépendants partout en France, entièrement à distance. Aucun déplacement, aucune réunion : le téléphone et quelques messages suffisent, et vous ne perdez pas une demi-journée de chantier.',
    ],
    repere: 'Je fais ce métier parce que je trouve anormal qu’un artisan paie trois mille euros pour une vitrine qu’il ne comprend pas et qu’il ne peut pas modifier.',
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
        q: 'Pourquoi 890 € quand d’autres demandent 3 000 € ?',
        r: 'Parce que la partie technique, je ne la refais pas à chaque fois : elle est solide, rapide, et la même pour tous mes clients. Ce que vous payez, c’est ce qui est propre à vous : les textes écrits sur votre métier, le référencement sur vos communes, votre fiche Google. Et pour un artisan, un seul chantier décroché grâce au site suffit à le rembourser.',
      },
      {
        q: 'Et si le résultat ne me plaît pas ?',
        r: 'Vous ne payez rien. Le premier site que je vous montre est gratuit et sans engagement : si ça ne vous convient pas, on s’arrête là, sans discussion et sans frais. Le paiement ne commence que le jour où vous décidez de lancer.',
      },
      {
        q: 'L’entretien à 49 €/mois est-il obligatoire ?',
        r: 'Jamais. Il est utile si vous ne voulez gérer ni l’hébergement ni les modifications, et si vous voulez que vos tarifs, vos horaires et vos photos restent à jour, sur le site comme sur Google. Vous pouvez le prendre plus tard, ou l’arrêter quand vous voulez : il n’y a aucun engagement.',
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
