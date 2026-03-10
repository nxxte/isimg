import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
interface QCMQuestion {
  q: string;
  options: string[];
  rep: number;
}

type ContentBlock =
  | { type: "definition"; term: string; text: string }
  | { type: "deux"; a: { icon: string; label: string; text: string }; b: { icon: string; label: string; text: string } }
  | { type: "liste"; label: string; items: string[] }
  | { type: "retenir"; text: string }
  | { type: "exemple"; text: string }
  | { type: "chaine"; items: { icon: string; label: string; color: string; text: string }[] }
  | { type: "tableau"; headers: string[]; rows: string[][] }
  | { type: "principes"; items: { num: number; title: string; text: string }[] }
  | { type: "etapes"; items: { num: number; label: string; icon: string; text: string }[] }
  | { type: "cas"; items: { titre: string; type: string; impact: string; lecon: string }[] }
  | { type: "qcm"; questions: QCMQuestion[] };

interface Section {
  id: string;
  emoji: string;
  title: string;
  color: string;
  content: ContentBlock[];
}
// ──────────────────────────────────────────────────────────────────────────

const sections: Section[] = [
  {
    id: "intro",
    emoji: "🎯",
    title: "C'est quoi le Testing ?",
    color: "#e07b39",
    content: [
      {
        type: "definition",
        term: "Définition officielle ISTQB",
        text: "Le testing logiciel est un processus composé de toutes les activités du cycle de vie (statiques ET dynamiques), concernant la planification, la préparation et l'évaluation de produits logiciels, pour déterminer qu'ils satisfont les exigences spécifiées, démontrer qu'ils sont aptes à l'emploi, et détecter les défauts."
      },
      {
        type: "deux",
        a: { icon: "🔍", label: "Test Statique", text: "Examiner le code / la doc SANS exécuter le logiciel (ex: revues de code)" },
        b: { icon: "▶️", label: "Test Dynamique", text: "Exécuter le logiciel, fournir des entrées et observer les sorties" }
      },
      {
        type: "liste",
        label: "Objectifs du testing",
        items: [
          "Identifier les défauts et bugs",
          "Assurer la qualité (fonctionnel + non-fonctionnel)",
          "Améliorer la fiabilité",
          "Valider les fonctionnalités",
          "Améliorer l'expérience utilisateur",
          "Vérifier les performances",
          "Assurer la sécurité",
          "Confirmer la compatibilité",
          "Réduire les risques",
          "Faciliter la prise de décision"
        ]
      }
    ]
  },
  {
    id: "erreur",
    emoji: "🐛",
    title: "Erreur → Faute → Défaillance",
    color: "#c0392b",
    content: [
      {
        type: "chaine",
        items: [
          { icon: "👤", label: "ERREUR (Error)", color: "#e74c3c", text: "Faute humaine pendant le développement. Ex: développeur mal comprend une exigence, typo dans le code (= au lieu de ==)" },
          { icon: "🔴", label: "FAUTE / DÉFAUT (Fault/Bug)", color: "#e07b39", text: "Manifestation de l'erreur dans le code. Existe dans le code mais peut ne pas être visible tant que le logiciel n'est pas exécuté." },
          { icon: "💥", label: "DÉFAILLANCE (Failure)", color: "#8e44ad", text: "Le logiciel ne fonctionne pas comme prévu pendant l'exécution. Visible par les utilisateurs." }
        ]
      },
      {
        type: "retenir",
        text: "🧠 À RETENIR : « La défaillance est un événement ; la faute est un état du logiciel, causé par une erreur »"
      },
      {
        type: "tableau",
        headers: ["Aspect", "Erreur", "Faute (Bug)", "Défaillance"],
        rows: [
          ["Qui ?", "Humain", "Dans le code", "Visible à l'user"],
          ["Quand ?", "Dev/Design", "Dans le code (latent)", "À l'exécution"],
          ["Impact", "→ Crée une faute", "→ Peut causer une défaillance", "→ Perte de confiance"],
        ]
      }
    ]
  },
  {
    id: "testing_debug",
    emoji: "🔧",
    title: "Testing vs Debugging",
    color: "#2980b9",
    content: [
      {
        type: "deux",
        a: { icon: "🧪", label: "TESTING", text: "Identifier les défauts. Effectué par les testeurs. Activité préventive. Pendant tout le SDLC. Outils: Selenium, JUnit" },
        b: { icon: "🔧", label: "DEBUGGING", text: "Résoudre les défauts. Effectué par les développeurs. Activité corrective. Après identification d'un défaut. Outils: GDB, IDE debuggers" }
      },
      {
        type: "retenir",
        text: "🧠 Testing = TROUVER les problèmes | Debugging = CORRIGER les problèmes"
      }
    ]
  },
  {
    id: "vv",
    emoji: "✅",
    title: "Vérification vs Validation (V&V)",
    color: "#27ae60",
    content: [
      {
        type: "deux",
        a: { icon: "📐", label: "VÉRIFICATION", text: "« Construit-on le produit CORRECTEMENT ? » — Conformité aux spécifications. Tôt dans le SDLC. Tests statiques (revues, inspections)." },
        b: { icon: "👥", label: "VALIDATION", text: "« Construit-on le BON produit ? » — Satisfaction des besoins utilisateurs. Tard dans le SDLC. Tests dynamiques (UAT, tests fonctionnels)." }
      },
      {
        type: "exemple",
        text: "Exemple : Pendant la conception, on revue l'architecture → VÉRIFICATION. Après dev, on fait tester par les vrais utilisateurs → VALIDATION."
      }
    ]
  },
  {
    id: "qa_qc",
    emoji: "🏆",
    title: "QA vs QC",
    color: "#8e44ad",
    content: [
      {
        type: "deux",
        a: { icon: "⚙️", label: "QA – Assurance Qualité", text: "Orienté PROCESSUS. Prévenir les défauts. Tout au long du SDLC. Toute l'équipe. Outils: JIRA, Trello. → Améliore les processus" },
        b: { icon: "🔍", label: "QC – Contrôle Qualité", text: "Orienté PRODUIT. Identifier les défauts. Phase de test principalement. Testeurs + ingénieurs QC. Outils: Selenium, JUnit. → Identifie et résout les défauts" }
      },
      {
        type: "retenir",
        text: "🧠 QA = PRÉVENIR les défauts (processus) | QC = TROUVER les défauts (produit)"
      }
    ]
  },
  {
    id: "principes",
    emoji: "7️⃣",
    title: "Les 7 Principes du Testing",
    color: "#e07b39",
    content: [
      {
        type: "principes",
        items: [
          { num: 1, title: "Le testing montre la PRÉSENCE de défauts, pas leur absence", text: "Même si aucun défaut n'est trouvé, ça ne prouve pas que le logiciel est parfait. Réduit la probabilité mais ne garantit rien." },
          { num: 2, title: "Le testing exhaustif est IMPOSSIBLE", text: "Impossible de tester toutes les combinaisons possibles. Il faut prioriser : P1 Critical → P2 High → P3 Medium → P4 Low (basé sur les risques)." },
          { num: 3, title: "Tester TÔT (Early Testing)", text: "Commencer les tests le plus tôt possible dans le SDLC. Plus on détecte tôt, moins c'est coûteux à corriger." },
          { num: 4, title: "Regroupement des défauts (Defect Clustering)", text: "Principe de Pareto / règle 80-20 : 80% des problèmes viennent de 20% des modules. Se concentrer sur les zones à risque." },
          { num: 5, title: "Paradoxe du pesticide", text: "Répéter les mêmes tests ne trouve plus de nouveaux défauts. Il faut régulièrement réviser et ajouter de nouveaux cas de test." },
          { num: 6, title: "Le testing est contextuel", text: "L'approche dépend du contexte (type d'appli, industrie, réglementation). Plus le risque est élevé, plus on investit dans le testing." },
          { num: 7, title: "L'absence d'erreurs est une illusion (Fallacy)", text: "Trouver et corriger des défauts ne garantit pas que le logiciel répond aux besoins utilisateurs. Le testing doit aussi valider la valeur." }
        ]
      }
    ]
  },
  {
    id: "processus",
    emoji: "🔄",
    title: "Le Processus Fondamental de Test",
    color: "#16a085",
    content: [
      {
        type: "etapes",
        items: [
          { num: 1, label: "Planification et Contrôle", icon: "📋", text: "Définir portée, objectifs, stratégie. Identifier risques. Définir critères d'entrée/sortie. Sortie : Plan de Test" },
          { num: 2, label: "Analyse et Conception", icon: "🎨", text: "Identifier quoi tester et comment. Concevoir les cas de test et données. Prioriser selon risques. Sortie : Cas de test, données de test" },
          { num: 3, label: "Implémentation et Exécution", icon: "▶️", text: "Développer les scripts de test. Exécuter les tests (manuels/automatisés). Reporter les défauts. Regression testing. Sortie : Résultats d'exécution, rapports de défauts" },
          { num: 4, label: "Évaluation des Critères de Sortie", icon: "📊", text: "Évaluer si les critères de sortie sont atteints. Préparer le rapport de synthèse. Sortie : Rapport de synthèse de test" },
          { num: 5, label: "Clôture des Tests", icon: "🏁", text: "Formaliser la fin des tests. Archiver les artefacts. Documenter les leçons apprises. Sortie : Rapport de clôture, artefacts archivés" }
        ]
      }
    ]
  },
  {
    id: "traceabilite",
    emoji: "🔗",
    title: "Traçabilité",
    color: "#2c3e50",
    content: [
      {
        type: "definition",
        term: "Définition",
        text: "Capacité d'établir et maintenir une relation documentée claire entre les différents artefacts du SDLC : exigences, cas de test et défauts."
      },
      {
        type: "liste",
        label: "Types de traçabilité",
        items: [
          "Traçabilité Avant (Forward) : Exigences → Cas de test (vérifie que tout est testé)",
          "Traçabilité Arrière (Backward) : Cas de test → Exigences (vérifie qu'aucun test superflu)",
          "Traçabilité Bidirectionnelle : Les deux combinés = relation complète"
        ]
      },
      {
        type: "liste",
        label: "Matrice de Traçabilité (RTM) — colonnes clés",
        items: [
          "ID Exigence (REQ-001)",
          "Description de l'exigence",
          "ID Cas de Test (TC-001)",
          "Description du cas de test",
          "ID Défaut (DEF-001)",
          "Statut du défaut (Resolved / Open / In Progress)"
        ]
      },
      {
        type: "liste",
        label: "Avantages de la traçabilité",
        items: [
          "Garantit une couverture de test complète",
          "Améliore la qualité",
          "Facilite l'analyse d'impact (si exigence change)",
          "Supporte la conformité réglementaire",
          "Améliore la communication",
          "Aide au débogage"
        ]
      }
    ]
  },
  {
    id: "psychologie",
    emoji: "🧠",
    title: "Psychologie du Testing",
    color: "#d35400",
    content: [
      {
        type: "deux",
        a: { icon: "🧪", label: "Mindset du TESTEUR", text: "Destructif : cherche à CASSER le logiciel. Risque : biais de confirmation. Doit penser de façon critique." },
        b: { icon: "💻", label: "Mindset du DÉVELOPPEUR", text: "Constructif : cherche à faire FONCTIONNER. Risque : défensivité face aux défauts. Difficile d'accepter les critiques." }
      },
      {
        type: "liste",
        label: "Biais psychologiques à connaître",
        items: [
          "Biais de Confirmation : Tendance à se concentrer sur ce qui confirme nos croyances. Mitigation : revues croisées, perspectives diverses.",
          "Dissonance Cognitive : Inconfort quand un dev voit un défaut dans son code → défensivité. Mitigation : culture de collaboration.",
          "Le Jeu de la Faute (Blame Game) : Se rejeter la faute. Mitigation : environnement sans blâme, responsabilité partagée.",
          "Effet de Halo : Une partie bien faite → on suppose que tout est bien. Mitigation : évaluation objective basée sur les données."
        ]
      },
      {
        type: "liste",
        label: "Tests Indépendants",
        items: [
          "Avantages : réduit les biais, perspective fraîche, plus d'objectivité",
          "Inconvénients : gaps de communication, manque de connaissance système"
        ]
      }
    ]
  },
  {
    id: "casdetudes",
    emoji: "💡",
    title: "Cas d'Études Célèbres",
    color: "#7f8c8d",
    content: [
      {
        type: "cas",
        items: [
          { titre: "Missile Patriot (1991)", type: "Erreur de précision virgule flottante", impact: "28 soldats tués", lecon: "Importance de la précision numérique et des tests d'endurance (soak testing)" },
          { titre: "Mars Climate Orbiter (1999)", type: "Mélange unités anglaises (lb·s) et métriques (N)", impact: "Sonde perdue — 327M$", lecon: "Tests d'interface et communication entre équipes" },
          { titre: "Therac-25 (1985-87)", type: "Race Condition (condition de course)", impact: "Décès multiples par surdosage radiation", lecon: "Tests de concurrence + tests d'utilisabilité pour systèmes critiques" },
          { titre: "Amazon Price Spiral (2014)", type: "Boucle de feedback entre algorithmes", impact: "Livre à 23 millions $", lecon: "Difficulté de tester les comportements émergents des systèmes complexes" },
          { titre: "Problème 2038 (Y2K38)", type: "Overflow entier 32 bits signé", impact: "Crashs potentiels en 2038", lecon: "Dette technique et choix des types de données pour la pérennité" }
        ]
      }
    ]
  },
  {
    id: "qcm",
    emoji: "📝",
    title: "Entraînement QCM",
    color: "#1abc9c",
    content: [
      {
        type: "qcm",
        questions: [
          { q: "Quelle est la différence entre une erreur et une faute ?", options: ["Une erreur est faite par le logiciel, une faute par un humain", "Une erreur est une faute humaine, une faute est sa manifestation dans le code", "Ce sont deux mots pour la même chose", "Une erreur survient à l'exécution, une faute au design"], rep: 1 },
          { q: "Selon le principe 1 du testing, que peut prouver un test ?", options: ["L'absence de défauts", "La présence de défauts", "Que le logiciel est parfait", "Que le logiciel est prêt pour la production"], rep: 1 },
          { q: "Le QA est orienté :", options: ["Produit", "Processus", "Tests", "Utilisateur"], rep: 1 },
          { q: "La vérification répond à quelle question ?", options: ["Construit-on le bon produit ?", "Construit-on le produit correctement ?", "Le produit est-il rentable ?", "Le produit est-il sécurisé ?"], rep: 1 },
          { q: "Le paradoxe du pesticide (principe 5) signifie :", options: ["Les tests sont dangereux", "Répéter les mêmes tests ne trouve plus de nouveaux défauts", "Trop tester coûte trop cher", "Les tests automatisés sont inefficaces"], rep: 1 },
          { q: "La règle 80-20 de Pareto dans le testing signifie :", options: ["80% des tests passent", "80% des défauts sont dans 20% des modules", "20% des tests couvrent 80% du code", "80% du budget va aux tests"], rep: 1 },
          { q: "Qui effectue le debugging ?", options: ["Les testeurs", "Les développeurs", "Les managers", "Les clients"], rep: 1 },
          { q: "La traçabilité bidirectionnelle combine :", options: ["Tests statiques et dynamiques", "QA et QC", "Traçabilité avant et arrière", "Vérification et validation"], rep: 2 },
          { q: "Le biais de confirmation en testing signifie :", options: ["Tester uniquement les scénarios où le logiciel fonctionne", "Toujours confirmer les bugs", "Ne tester qu'en environnement de production", "Aucune des réponses"], rep: 0 },
          { q: "La défaillance Therac-25 est due à :", options: ["Overflow d'entier", "Erreur de précision flottante", "Race condition", "Mauvaise unité de mesure"], rep: 2 },
          { q: "Qu'est-ce qu'un test dynamique ?", options: ["Examiner le code sans l'exécuter", "Exécuter le logiciel et observer les sorties", "Réviser les documents de conception", "Analyser les exigences"], rep: 1 },
          { q: "Quel est l'objectif principal du testing selon l'ISTQB ?", options: ["Prouver que le logiciel est sans défaut", "Identifier les défauts et assurer la qualité", "Remplacer le debugging", "Automatiser toutes les tâches"], rep: 1 },
          { q: "La validation répond à quelle question ?", options: ["Construit-on le produit correctement ?", "Le produit est-il sécurisé ?", "Construit-on le bon produit ?", "Les tests sont-ils complets ?"], rep: 2 },
          { q: "Selon le principe 2, pourquoi le testing exhaustif est-il impossible ?", options: ["Parce qu'il coûte trop cher", "Parce qu'il y a trop de combinaisons possibles", "Parce que les testeurs manquent de temps", "Parce que les outils sont limités"], rep: 1 },
          { q: "Quel principe ISTQB dit de tester le plus tôt possible ?", options: ["Principe 1", "Principe 2", "Principe 3", "Principe 4"], rep: 2 },
          { q: "Le QC (Contrôle Qualité) est orienté :", options: ["Processus", "Prévention", "Produit", "Planning"], rep: 2 },
          { q: "Qu'est-ce qu'une défaillance (failure) ?", options: ["Une erreur humaine dans le code", "Un bug dans le code source", "Un comportement incorrect visible à l'exécution", "Un document mal rédigé"], rep: 2 },
          { q: "Quelle est la première étape du processus fondamental de test ?", options: ["Analyse et Conception", "Implémentation et Exécution", "Planification et Contrôle", "Clôture des Tests"], rep: 2 },
          { q: "La Matrice de Traçabilité (RTM) sert à :", options: ["Mesurer les performances", "Relier exigences, cas de test et défauts", "Automatiser les tests", "Planifier les sprints"], rep: 1 },
          { q: "Le principe 6 dit que le testing est :", options: ["Toujours le même", "Contextuel", "Exhaustif", "Optionnel"], rep: 1 },
          { q: "Quel outil est typiquement associé au QA ?", options: ["Selenium", "JUnit", "JIRA", "GDB"], rep: 2 },
          { q: "La traçabilité avant (Forward) signifie :", options: ["Des cas de test vers les exigences", "Des défauts vers les cas de test", "Des exigences vers les cas de test", "Des exigences vers les défauts"], rep: 2 },
          { q: "Quel est le mindset d'un bon testeur ?", options: ["Constructif — faire fonctionner", "Destructif — chercher à casser", "Neutre — juste exécuter", "Optimiste — tout va bien"], rep: 1 },
          { q: "Le principe 7 (Fallacy of absence of errors) signifie :", options: ["Zéro défaut garantit la satisfaction utilisateur", "Corriger des défauts ne garantit pas la valeur pour l'utilisateur", "Les erreurs sont impossibles à éviter", "Le testing doit s'arrêter quand il n'y a plus d'erreurs"], rep: 1 },
          { q: "Mars Climate Orbiter (1999) a été perdu à cause de :", options: ["Race condition", "Overflow d'entier 32 bits", "Confusion entre unités anglaises et métriques", "Erreur de précision flottante"], rep: 2 },
          { q: "Quel est le document produit à la fin de l'étape de Planification ?", options: ["Rapport de défauts", "Plan de Test", "Rapport de synthèse", "Matrice de traçabilité"], rep: 1 },
          { q: "Quelle est la priorité la plus haute dans les tests ?", options: ["P4 Low", "P3 Medium", "P2 High", "P1 Critical"], rep: 3 },
          { q: "L'effet de Halo en testing signifie :", options: ["Un test réussi prouve l'absence de défauts", "Une partie bien faite laisse supposer que tout est bien", "Les testeurs sont trop optimistes", "Les managers ignorent les défauts"], rep: 1 },
          { q: "Le test statique inclut :", options: ["Tests de performance", "Revues de code et inspections", "Tests d'intégration", "Tests de régression"], rep: 1 },
          { q: "Quel cas célèbre illustre l'importance des tests d'endurance (soak testing) ?", options: ["Mars Climate Orbiter", "Missile Patriot", "Therac-25", "Amazon Price Spiral"], rep: 1 },
          { q: "Combien y a-t-il de principes fondamentaux du testing selon l'ISTQB ?", options: ["5", "6", "7", "8"], rep: 2 },
          { q: "La dissonance cognitive chez un développeur face à un défaut se manifeste par :", options: ["De l'enthousiasme", "De la défensivité", "De la curiosité", "De l'indifférence"], rep: 1 },
          { q: "Quel type de test est l'UAT (User Acceptance Test) ?", options: ["Test statique", "Test de vérification", "Test de validation", "Test de régression"], rep: 2 },
          { q: "Le Blame Game (jeu de la faute) peut être mitigé par :", options: ["Des pénalités pour les développeurs", "Un environnement sans blâme et responsabilité partagée", "Des audits fréquents", "Des tests automatisés"], rep: 1 },
          { q: "L'overflow d'entier 32 bits est au cœur de quel problème futur ?", options: ["Y2K38", "Patriot Missile", "Amazon Spiral", "Therac-25"], rep: 0 }
        ]
      }
    ]
  },

  // ══ CHAPITRE 2 (slides 1-25) ══
  {
    id: "ch2_modeles",
    emoji: "🏗️",
    title: "Ch2 – Modèles SDLC",
    color: "#2980b9",
    content: [
      {
        type: "definition",
        term: "SDLC & Testing",
        text: "Le modèle SDLC choisi influence directement quand, comment et par qui les tests sont réalisés. Chaque modèle a ses propres caractéristiques et contraintes pour le testing."
      },
      {
        type: "chaine",
        items: [
          { icon: "💧", label: "Waterfall Model", color: "#2980b9", text: "Flux linéaire séquentiel qui coule vers le bas. Ne prévoit PAS de retour en arrière. Suppose que les exigences peuvent être figées. Testing = phase tardive." },
          { icon: "✅", label: "V-Shaped Model", color: "#27ae60", text: "Extension du Waterfall. Chaque phase dev a un test miroir (Unit ↔ Detailed Design, Integration ↔ Architecture, Acceptance ↔ Requirements). Early test planning. Ajuster la portée est difficile et coûteux." },
          { icon: "🔄", label: "Agile Model", color: "#e07b39", text: "Itératif et incrémental. Sprints 2-4 semaines. Communication face-à-face et inputs continus. Documentation tardive. Nécessite des compétences spéciales." }
        ]
      },
      {
        type: "retenir",
        text: "🧠 Waterfall = séquentiel tardif | V-Model = miroir dev/test, early planning | Agile = itératif, testing continu à chaque sprint"
      }
    ]
  },
  {
    id: "ch2_agile",
    emoji: "🤝",
    title: "Ch2 – Agile & Whole-Team",
    color: "#16a085",
    content: [
      {
        type: "deux",
        a: { icon: "🤝", label: "Whole-Team Approach", text: "ISTQB emphase : tous les membres (devs, Product Owners, testeurs) sont responsables de la qualité. Les testeurs participent tôt à la définition des User Stories pour s'assurer qu'elles sont testables." },
        b: { icon: "🧪", label: "Rôle du Testeur Agile", text: "Aide le PO à définir les critères d'acceptance. Aide les devs à écrire les unit tests. Met en place le framework d'automation. S'assure que la DoD inclut des critères qualité rigoureux." }
      },
      {
        type: "tableau",
        headers: ["Phase Scrum", "Activités de Testing"],
        rows: [
          ["Planning", "Estimer l'effort de test pendant le Sprint Planning"],
          ["Analysis", "Définir les critères d'acceptance des User Stories"],
          ["Design", "Créer scénarios de test via BDD ou TDD"],
          ["Execution", "Tests unitaires, acceptance automatisés, exploratoires"],
          ["Retrospective", "Analyser les échecs pour améliorer le processus et l'automation"]
        ]
      },
      {
        type: "retenir",
        text: "🧠 Sprint 0 = setup env + stratégie | Construction = whole-team testing | Transition = end-of-lifecycle testing | Production = explorer les problèmes reportés"
      }
    ]
  },
  {
    id: "ch2_niveaux",
    emoji: "📊",
    title: "Ch2 – Niveaux de Test",
    color: "#8e44ad",
    content: [
      {
        type: "definition",
        term: "Test Levels – Attributs communs",
        text: "Chaque niveau est caractérisé par : des objectifs spécifiques, une base de test, un objet de test, des défauts typiques, et des approches/responsabilités. Pour chaque niveau, un environnement de test adapté est requis."
      },
      {
        type: "tableau",
        headers: ["Niveau", "Portée", "Par qui", "Technique", "Objectif"],
        rows: [
          ["Unit Testing", "Composants individuels (méthodes, classes)", "Développeurs", "White Box", "Vérifier la fonctionnalité unitaire"],
          ["Integration Testing", "Interaction entre composants/systèmes", "Devs / Testeurs", "White Box", "Vérifier les interfaces et intégrations"],
          ["System Testing", "Système complet intégré", "Testeurs", "Black Box", "Valider fonctionnalité + performances"],
          ["Acceptance Testing", "Système end-to-end", "End-users / Testeurs", "Black Box", "Satisfaire les besoins business/user"]
        ]
      },
      {
        type: "deux",
        a: { icon: "🔗", label: "Component Integration Testing", text: "Interactions entre composants logiciels (modules, classes). Fait après les unit tests. Souvent réalisé par les développeurs." },
        b: { icon: "🌐", label: "System Integration Testing", text: "Interactions entre systèmes différents (APIs tierces, BDD externes, microservices). Contract Testing en Agile/DevOps. Réalisé par les testeurs." }
      }
    ]
  },
  {
    id: "ch2_integration",
    emoji: "🔗",
    title: "Ch2 – Stratégies d'Intégration",
    color: "#c0392b",
    content: [
      {
        type: "tableau",
        headers: ["Stratégie", "Description", "Avantages", "Inconvénients"],
        rows: [
          ["Big Bang", "Tous les composants intégrés d'un coup", "Bon pour systèmes simples", "Difficile à localiser les défauts ; risque d'erreurs d'interface"],
          ["Top-Down", "Du haut vers le bas, Stubs pour modules inférieurs", "Teste la logique architecturale tôt", "Modules bas niveau testés tard"],
          ["Bottom-Up", "Du bas vers le haut, Drivers pour appeler les modules", "Teste les fonctions critiques tôt", "La logique de contrôle au sommet testée en dernier"],
          ["Incremental", "Groupes fonctionnels intégrés un par un", "Facile d'isoler les défauts", "Plus de planification et de stubs/drivers requis"]
        ]
      },
      {
        type: "retenir",
        text: "🧠 Stubs = remplacent modules INFÉRIEURS (Top-Down) | Drivers = remplacent modules SUPÉRIEURS (Bottom-Up)"
      },
      {
        type: "liste",
        label: "Défauts typiques en Integration Testing",
        items: [
          "Formats de données incorrects ou types non correspondants",
          "Séquence incorrecte d'appels d'interface",
          "Interface mismatch (ex : fonction attend 3 params mais en reçoit 2)",
          "Échec de communication entre systèmes (ex : timeout sur appel DB)"
        ]
      }
    ]
  },
  {
    id: "ch2_system_acceptance",
    emoji: "🎯",
    title: "Ch2 – System & Acceptance Testing",
    color: "#d35400",
    content: [
      {
        type: "deux",
        a: { icon: "🖥️", label: "System Testing", text: "But : tester le système complet vs exigences. Réalisé par les testeurs. Toujours Black Box. Environnement = le plus proche de la production (OS réel, réseau, intégrations tierces)." },
        b: { icon: "✅", label: "Acceptance Testing", text: "But : évaluer si le logiciel est prêt pour la livraison. End-users / clients / testeurs. Focus : workflows business et satisfaction user. Dernier gate avant la release." }
      },
      {
        type: "tableau",
        headers: ["Aspect", "Alpha Testing", "Beta Testing"],
        rows: [
          ["Environnement", "Lab / Staging (contrôlé)", "Production réelle"],
          ["Testeurs", "Équipe interne (devs, QA, PMs)", "Vrais utilisateurs / clients"],
          ["Timing", "Après system testing, avant beta", "Après alpha, avant release finale"],
          ["But", "Identifier bugs majeurs, stabilité pour beta", "Feedback UX, perfo, usage réel"],
          ["Types de Beta", "—", "Open, Closed, Public, Private"]
        ]
      },
      {
        type: "retenir",
        text: "🧠 Alpha = interne + contrôlé | Beta = externe + réel. UAT = end-users. BAT = business requirements."
      }
    ]
  },
  {
    id: "ch2_pyramide",
    emoji: "🔺",
    title: "Ch2 – Test Pyramid",
    color: "#7f8c8d",
    content: [
      {
        type: "definition",
        term: "Test Pyramid",
        text: "La pyramide de test préconise un maximum de couverture fonctionnelle avec des tests rapides et peu fragiles (Unit, API). Plus on monte, plus les tests sont lents, coûteux et fragiles."
      },
      {
        type: "chaine",
        items: [
          { icon: "🔵", label: "Base : Unit Tests", color: "#27ae60", text: "Le plus grand nombre. Rapides, isolés, peu coûteux. Testent fonctions individuelles." },
          { icon: "🟡", label: "Milieu : Integration / API Tests", color: "#f39c12", text: "Taille moyenne. Testent les interactions entre composants et les APIs." },
          { icon: "🔴", label: "Sommet : UI / Manual Tests", color: "#e74c3c", text: "Le moins grand nombre. Lents, coûteux, fragiles. Tests E2E et exploratoires." }
        ]
      },
      {
        type: "deux",
        a: { icon: "🏛️", label: "Traditional (find bugs)", text: "Pyramide INVERSÉE : beaucoup de tests manuels via UI, peu d'unit tests. Approche lente et coûteuse." },
        b: { icon: "⚡", label: "Agile (prevent bugs)", text: "Pyramide NORMALE : base large d'unit tests + acceptance automatisés + peu de tests UI. Testing exploratoire au-dessus comme un nuage." }
      }
    ]
  },
  {
    id: "ch2_qcm",
    emoji: "📝",
    title: "Ch2 – QCM (45 questions)",
    color: "#1abc9c",
    content: [
      {
        type: "qcm",
        questions: [
          { q: "Quelle est la caractéristique principale du modèle Waterfall ?", options: ["Itératif et incrémental", "Flux linéaire séquentiel sans retour en arrière", "Sprints de 2 à 4 semaines", "Testing continu à chaque itération"], rep: 1 },
          { q: "Le modèle Waterfall suppose que :", options: ["Les exigences changent constamment", "Les tests se font en parallèle du dev", "Les exigences du système peuvent être figées", "L'équipe est toujours en face-à-face"], rep: 2 },
          { q: "Le V-Shaped Model est :", options: ["Un modèle itératif basé sur des sprints", "Une extension du modèle Waterfall avec early test planning", "Un modèle sans phases de test formelles", "Un modèle utilisé uniquement en Agile"], rep: 1 },
          { q: "Dans le V-Model, ajuster la portée est :", options: ["Facile et peu coûteux", "Difficile et coûteux", "Toujours recommandé", "Sans impact sur le projet"], rep: 1 },
          { q: "L'Agile Model est caractérisé par :", options: ["Un flux séquentiel et des exigences figées", "Un développement itératif et incrémental avec communication face-à-face", "Un testing uniquement en fin de cycle", "L'absence totale de documentation"], rep: 1 },
          { q: "Dans Agile, la documentation est réalisée :", options: ["En premier, avant tout développement", "En parallèle du développement", "À des stades ultérieurs", "Jamais"], rep: 2 },
          { q: "Quel modèle SDLC nécessite des compétences spéciales pour l'équipe ?", options: ["Waterfall", "V-Model", "Agile", "Spiral"], rep: 2 },
          { q: "Le 'Whole-Team Approach' selon l'ISTQB signifie :", options: ["Seuls les testeurs sont responsables de la qualité", "Les développeurs ne font pas de tests", "Tous les membres de l'équipe sont responsables de la qualité", "Le PO gère seul les critères d'acceptance"], rep: 2 },
          { q: "Dans l'approche Whole-Team, les testeurs participent tôt pour :", options: ["Remplacer les développeurs", "S'assurer que les User Stories sont testables", "Écrire le code de production", "Gérer le backlog produit"], rep: 1 },
          { q: "La DoD (Definition of Done) en Agile doit inclure :", options: ["Uniquement le code compilé", "Des critères qualité rigoureux définis avec le testeur Agile", "La validation du Product Owner seulement", "Aucun critère de test"], rep: 1 },
          { q: "Pendant la Retrospective Scrum, le testeur :", options: ["Exécute les tests de régression", "Analyse les échecs pour améliorer le processus et l'automation", "Définit les critères d'acceptance", "Estime l'effort de test"], rep: 1 },
          { q: "Pendant le Sprint 0 en Agile, on :", options: ["Livre le produit final", "Met en place l'environnement de test et identifie la stratégie", "Exécute tous les tests d'acceptance", "Effectue le testing indépendant uniquement"], rep: 1 },
          { q: "En Agile, lors de la phase de Design du Testing Lifecycle, on :", options: ["Estime les efforts de test", "Crée des scénarios de test via BDD ou TDD", "Exécute les tests unitaires", "Analyse les échecs de test"], rep: 1 },
          { q: "Quel niveau de test focus sur les composants individuels ?", options: ["Integration Testing", "System Testing", "Unit Testing", "Acceptance Testing"], rep: 2 },
          { q: "Le System Testing est réalisé par :", options: ["Les développeurs", "Les testeurs", "Les end-users", "Le Product Owner"], rep: 1 },
          { q: "L'Acceptance Testing valide :", options: ["La logique interne du code", "Les interfaces entre composants", "Le logiciel contre les critères des utilisateurs", "Uniquement les performances"], rep: 2 },
          { q: "Pour chaque niveau de test, il est requis :", options: ["Le même environnement", "Un environnement de test adapté", "Aucun environnement particulier", "L'environnement de production uniquement"], rep: 1 },
          { q: "Le Component Integration Testing est souvent réalisé par :", options: ["Les end-users", "Les clients", "Les développeurs", "Les managers"], rep: 2 },
          { q: "Le System Integration Testing implique typiquement :", options: ["Uniquement les modules internes", "Des APIs tierces, BDD externes ou microservices", "Seulement les unit tests", "Les tests manuels de l'UI"], rep: 1 },
          { q: "Le System Testing utilise quelle technique ?", options: ["White Box", "Grey Box", "Black Box", "Code Coverage"], rep: 2 },
          { q: "Quel niveau de test est le dernier gate avant la release ?", options: ["Unit Testing", "Integration Testing", "System Testing", "Acceptance Testing"], rep: 3 },
          { q: "La stratégie Big Bang consiste à :", options: ["Intégrer les composants un par un", "Partir du haut vers le bas", "Intégrer tous les composants d'un coup", "Partir du bas vers le haut"], rep: 2 },
          { q: "Dans la stratégie Top-Down, les modules inférieurs manquants sont remplacés par :", options: ["Des Drivers", "Des Stubs", "Des Mocks", "Des Tests unitaires"], rep: 1 },
          { q: "Dans la stratégie Bottom-Up, on utilise des Drivers pour :", options: ["Remplacer les modules supérieurs de contrôle", "Simuler les modules inférieurs", "Tester l'interface utilisateur", "Générer des données de test"], rep: 0 },
          { q: "L'avantage principal de la stratégie Top-Down est :", options: ["Tester les fonctions utilitaires critiques tôt", "Tester la logique architecturale tôt", "Aucune planification requise", "Facile à isoler les défauts"], rep: 1 },
          { q: "L'inconvénient principal du Big Bang est :", options: ["Trop lent à exécuter", "Difficile à localiser les défauts + risque élevé d'erreurs d'interface", "Trop coûteux en stubs", "Impossible à automatiser"], rep: 1 },
          { q: "Quel défaut typique est trouvé en Integration Testing ?", options: ["Erreur de précision virgule flottante", "Interface mismatch (fonction attend 3 params, reçoit 2)", "Race condition", "Overflow d'entier"], rep: 1 },
          { q: "L'environnement de System Testing doit être :", options: ["Identique à l'environnement de dev", "Le plus proche possible de la production", "Totalement isolé sans réseau", "N'importe quel environnement disponible"], rep: 1 },
          { q: "Quel défaut est typiquement trouvé en System Testing ?", options: ["Erreur de syntaxe dans le code", "Interface mismatch entre modules", "Comportement incohérent sur différents navigateurs/appareils", "Typo dans une variable"], rep: 2 },
          { q: "Le System Testing inclut quel type de testing non-fonctionnel ?", options: ["Unit Testing", "Code Coverage", "Performance et Security Testing", "White Box Testing"], rep: 2 },
          { q: "L'Alpha Testing est réalisé :", options: ["Par des utilisateurs réels dans un environnement réel", "Par l'équipe interne dans un environnement contrôlé (lab/staging)", "Après le Beta Testing", "En production par les clients"], rep: 1 },
          { q: "Le Beta Testing est réalisé :", options: ["Par l'équipe interne en lab", "Avant l'Alpha Testing", "Par des utilisateurs réels dans un environnement réel", "Uniquement par les développeurs"], rep: 2 },
          { q: "Le timing correct de l'Alpha Testing est :", options: ["Avant le System Testing", "Après le Beta Testing", "Après le System Testing, avant le Beta Testing", "Pendant le développement"], rep: 2 },
          { q: "L'objectif principal de l'Alpha Testing est :", options: ["Obtenir du feedback UX en conditions réelles", "Identifier les bugs majeurs et assurer la stabilité pour le beta", "Tester les performances sous charge maximale", "Valider les interfaces entre modules"], rep: 1 },
          { q: "Quel type de Beta Testing est ouvert au grand public ?", options: ["Closed Beta", "Private Beta", "Open Beta", "Internal Beta"], rep: 2 },
          { q: "Le Private Beta est :", options: ["Ouvert à tout le monde", "Limité à un petit groupe sélect d'utilisateurs", "Identique à l'Open Beta avec plus de participants", "Réalisé en environnement lab"], rep: 1 },
          { q: "Quand utilise-t-on le Beta Testing ?", options: ["Quand le logiciel a besoin de validation interne", "Quand le logiciel est presque prêt et nécessite une validation réelle", "Avant l'Alpha Testing", "Pendant le Sprint 0"], rep: 1 },
          { q: "Selon la Test Pyramid, quelle couche doit avoir le plus grand nombre de tests ?", options: ["Tests UI manuels", "Tests d'intégration", "Unit Tests (base de la pyramide)", "Tests E2E"], rep: 2 },
          { q: "Dans la Test Pyramid, les tests au sommet sont :", options: ["Les plus rapides et les moins coûteux", "Les plus lents et les plus coûteux (UI/Manual)", "Les plus nombreux", "Les Unit Tests"], rep: 1 },
          { q: "L'objectif de la Test Pyramid est de :", options: ["Éliminer complètement les tests manuels", "Maximiser la couverture fonctionnelle avec des tests rapides et peu fragiles", "Avoir autant de tests à chaque niveau", "Ne faire que des tests UI automatisés"], rep: 1 },
          { q: "Dans l'approche Agile (pyramide normale), la base est composée de :", options: ["Tests manuels via UI", "Tests d'intégration uniquement", "Unit Tests automatisés + Acceptance Tests automatisés", "Tests exploratoires"], rep: 2 },
          { q: "Dans l'approche Traditionnelle, la pyramide est :", options: ["Normale avec beaucoup d'unit tests", "Inversée avec beaucoup de tests manuels via UI", "Équilibrée entre tous les niveaux", "Sans tests automatisés"], rep: 1 },
          { q: "En Agile, le testing exploratoire se place :", options: ["À la base de la pyramide", "Au milieu de la pyramide", "Au-dessus de la pyramide (comme un nuage)", "N'existe pas en Agile"], rep: 2 },
          { q: "Dans le V-Model, quel niveau de test correspond à la phase 'Architecture' ?", options: ["Unit Testing", "Integration Testing", "System Testing", "Acceptance Testing"], rep: 1 },
          { q: "La principale différence entre Smoke Testing et Sanity Testing est :", options: ["Le Smoke est plus approfondi que le Sanity", "Le Smoke est large (fonctionnalités critiques), le Sanity est étroit (fonctionnalité spécifique après changement)", "Ils sont identiques", "Le Sanity est réalisé après un nouveau build, le Smoke après un bug fix"], rep: 1 },
          { q: "Quel outil est typiquement utilisé pour les Unit Tests Java ?", options: ["Selenium", "JIRA", "JUnit", "LoadRunner"], rep: 2 }
        ]
      }
    ]
  }
  ,{
    id: "qcm_combined",
    emoji: "🏆",
    title: "🏆 QCM Ch1 + Ch2 (46 questions)",
    color: "#f39c12",
    content: [
      {
        type: "retenir",
        text: "🎯 Entraînement complet : 46 questions couvrant le Chapitre 1 (Fondamentaux) ET le Chapitre 2 (SDLC, Niveaux de test, Stratégies). Utilise aussi le bouton ✨ pour générer de nouvelles questions avec l'IA !"
      },
      {
        type: "qcm",
        questions: [
          { q: "Quelle est la différence fondamentale entre une Erreur et une Faute ?", options: ["Une erreur est dans le code, une faute est visible par l'user", "Une erreur est une faute humaine, une faute est sa manifestation dans le code", "Ce sont des synonymes", "Une erreur est détectée à l'exécution, une faute au design"], rep: 1 },
          { q: "Selon le principe 1 de l'ISTQB, un test peut prouver :", options: ["L'absence de défauts dans le logiciel", "La présence de défauts, pas leur absence", "Que le logiciel est prêt pour la production", "Que le logiciel est parfait"], rep: 1 },
          { q: "Le testing exhaustif est impossible car :", options: ["Il coûte trop cher", "Il y a trop de combinaisons possibles d'entrées et de conditions", "Les testeurs manquent de temps", "Les outils ne le permettent pas"], rep: 1 },
          { q: "La règle 80-20 de Pareto dans le testing (principe 4) signifie :", options: ["80% des tests passent", "80% des défauts se trouvent dans 20% des modules", "20% des tests couvrent 80% du code", "80% du budget va aux tests"], rep: 1 },
          { q: "Le paradoxe du pesticide (principe 5) recommande de :", options: ["Arrêter les tests quand aucun bug n'est trouvé", "Répéter les mêmes tests pour confirmer les résultats", "Réviser et ajouter régulièrement de nouveaux cas de test", "Utiliser uniquement des tests automatisés"], rep: 2 },
          { q: "Quelle est la différence entre Testing et Debugging ?", options: ["Ce sont la même chose", "Le Testing trouve les défauts, le Debugging les corrige", "Le Debugging trouve les défauts, le Testing les corrige", "Le Testing est automatisé, le Debugging est manuel"], rep: 1 },
          { q: "La Vérification répond à :", options: ["Construit-on le bon produit ?", "Le produit est-il sécurisé ?", "Construit-on le produit correctement ?", "Les tests sont-ils complets ?"], rep: 2 },
          { q: "La Validation répond à :", options: ["Construit-on le produit correctement ?", "Construit-on le bon produit ?", "Le produit est-il rentable ?", "Le produit est-il sécurisé ?"], rep: 1 },
          { q: "Le QA (Assurance Qualité) est orienté :", options: ["Produit — identifier les défauts", "Processus — prévenir les défauts", "Tests — exécuter les cas de test", "Utilisateur — satisfaction finale"], rep: 1 },
          { q: "Le QC (Contrôle Qualité) est orienté :", options: ["Processus — prévenir les défauts", "Produit — identifier et résoudre les défauts", "Planning — planifier les sprints", "Formation — compétences de l'équipe"], rep: 1 },
          { q: "Combien y a-t-il de principes fondamentaux du testing selon l'ISTQB ?", options: ["5", "6", "7", "8"], rep: 2 },
          { q: "Le principe 7 (Fallacy of Absence of Errors) signifie :", options: ["Zéro défaut garantit la satisfaction utilisateur", "Corriger des défauts ne garantit pas que le logiciel répond aux besoins", "Les erreurs sont impossibles à éliminer", "Le testing doit s'arrêter quand il n'y a plus d'erreurs"], rep: 1 },
          { q: "La défaillance Therac-25 (1985-87) est due à :", options: ["Overflow d'entier 32 bits", "Erreur de précision virgule flottante", "Race Condition (condition de course)", "Mauvaise unité de mesure"], rep: 2 },
          { q: "La traçabilité bidirectionnelle combine :", options: ["Tests statiques et dynamiques", "QA et QC", "Traçabilité avant ET arrière", "Vérification et validation"], rep: 2 },
          { q: "Le biais de confirmation en testing signifie :", options: ["Tester uniquement les scénarios où le logiciel fonctionne bien", "Toujours confirmer les bugs avant de les reporter", "Ne tester qu'en environnement de production", "Accepter les défauts sans les corriger"], rep: 0 },
          { q: "La première étape du Processus Fondamental de Test est :", options: ["Analyse et Conception", "Implémentation et Exécution", "Planification et Contrôle", "Clôture des Tests"], rep: 2 },
          { q: "Un test statique consiste à :", options: ["Exécuter le logiciel et observer les sorties", "Examiner le code ou la documentation SANS exécuter le logiciel", "Tester les performances sous charge", "Valider l'interface utilisateur"], rep: 1 },
          { q: "Quelle est la caractéristique principale du modèle Waterfall ?", options: ["Itératif et incrémental avec sprints", "Flux linéaire séquentiel sans retour en arrière possible", "Early test planning avec tests en miroir", "Communication face-à-face et inputs continus"], rep: 1 },
          { q: "Le V-Shaped Model se distingue du Waterfall par :", options: ["Son approche itérative", "Son early test planning et ses tests en miroir de chaque phase dev", "L'absence de phases de test formelles", "Son utilisation exclusive en contexte Agile"], rep: 1 },
          { q: "Dans le V-Model, le niveau 'Unit Testing' correspond à la phase dev :", options: ["Requirements", "Architecture", "Detailed Design", "Implementation"], rep: 2 },
          { q: "L'Agile Model est caractérisé par :", options: ["Un flux séquentiel et des exigences figées", "Un testing uniquement en fin de cycle", "Un développement itératif et incrémental, sprints 2-4 semaines", "Une documentation exhaustive produite en premier"], rep: 2 },
          { q: "Le 'Whole-Team Approach' selon l'ISTQB signifie :", options: ["Seuls les testeurs sont responsables de la qualité", "Tous les membres de l'équipe (devs, PO, testeurs) sont responsables de la qualité", "Le Product Owner gère seul les critères d'acceptance", "Les développeurs ne font jamais de tests"], rep: 1 },
          { q: "Pendant la Retrospective Scrum, le testeur :", options: ["Exécute les tests de régression", "Définit les critères d'acceptance des User Stories", "Analyse les échecs pour améliorer le processus et l'automation", "Estime l'effort de test pour le prochain sprint"], rep: 2 },
          { q: "Quel niveau de test vérifie les composants individuels (méthodes, classes) ?", options: ["Integration Testing", "System Testing", "Unit Testing", "Acceptance Testing"], rep: 2 },
          { q: "Le System Testing est toujours de type :", options: ["White Box", "Grey Box", "Black Box", "Code Coverage"], rep: 2 },
          { q: "L'Acceptance Testing est le :", options: ["Premier test réalisé sur le logiciel", "Test des interfaces entre modules", "Dernier gate avant la release — valide les besoins business/user", "Test réalisé uniquement par les développeurs"], rep: 2 },
          { q: "La différence entre Component Integration Testing et System Integration Testing est :", options: ["Aucune différence", "Le Component IT teste les interactions entre modules logiciels, le System IT teste les interactions entre systèmes (APIs, BDD, microservices)", "Le System IT est réalisé par les développeurs, le Component IT par les testeurs", "Le Component IT est plus coûteux"], rep: 1 },
          { q: "Dans la stratégie d'intégration Top-Down, on utilise des _____ pour remplacer les modules inférieurs manquants :", options: ["Drivers", "Stubs", "Mocks", "Fixtures"], rep: 1 },
          { q: "Dans la stratégie d'intégration Bottom-Up, on utilise des _____ pour appeler les modules bas niveau :", options: ["Stubs", "Mocks", "Drivers", "Fixtures"], rep: 2 },
          { q: "L'inconvénient principal de la stratégie Big Bang est :", options: ["Trop lente à exécuter", "Difficile à localiser les défauts et risque élevé d'erreurs d'interface", "Trop coûteuse en stubs/drivers", "Ne convient pas aux petits systèmes"], rep: 1 },
          { q: "Quel défaut typique est découvert lors de l'Integration Testing ?", options: ["Race condition", "Erreur de précision flottante", "Interface mismatch (fonction attend 3 params, reçoit 2)", "Overflow d'entier"], rep: 2 },
          { q: "L'environnement de System Testing doit être :", options: ["Identique à l'environnement de développement", "Le plus proche possible de l'environnement de production", "Un environnement totalement isolé sans réseau", "L'environnement du développeur local"], rep: 1 },
          { q: "L'Alpha Testing est réalisé :", options: ["Par des utilisateurs réels dans un environnement de production", "Par l'équipe interne dans un environnement contrôlé (lab/staging)", "Après le Beta Testing", "Par les clients à leur propre emplacement"], rep: 1 },
          { q: "Le Beta Testing est réalisé :", options: ["Par l'équipe interne en lab avant l'Alpha", "Par des utilisateurs réels dans un environnement de production réel", "Uniquement par les développeurs", "En parallèle du développement"], rep: 1 },
          { q: "Le timing correct est :", options: ["Beta → Alpha → System Testing → Release", "System Testing → Beta → Alpha → Release", "System Testing → Alpha → Beta → Release", "Alpha → System Testing → Beta → Release"], rep: 2 },
          { q: "Quel type de Beta Testing est limité à un petit groupe sélect d'utilisateurs ?", options: ["Open Beta", "Public Beta", "Closed / Private Beta", "Internal Beta"], rep: 2 },
          { q: "Selon la Test Pyramid, quelle couche doit être la plus large (le plus de tests) ?", options: ["Tests UI manuels (sommet)", "Tests d'intégration (milieu)", "Unit Tests (base)", "Tests E2E"], rep: 2 },
          { q: "Dans la Test Pyramid, les tests au sommet sont caractérisés par :", options: ["Rapidité et faible coût", "Lenteur, coût élevé et fragilité (UI/Manual)", "Grande quantité", "Isolation totale"], rep: 1 },
          { q: "L'objectif principal de la Test Pyramid est :", options: ["Éliminer tous les tests manuels", "Maximiser la couverture fonctionnelle avec des tests rapides et peu fragiles (Unit, API)", "Avoir le même nombre de tests à chaque niveau", "Favoriser les tests UI automatisés"], rep: 1 },
          { q: "En approche Agile, la pyramide de test est :", options: ["Inversée — beaucoup de tests manuels UI au sommet", "Normale — grande base d'Unit Tests + Acceptance automatisés, peu de tests UI", "Plate — égale à chaque niveau", "Sans tests manuels"], rep: 1 },
          { q: "Le Smoke Testing se distingue du Sanity Testing par :", options: ["Le Smoke est plus approfondi et ciblé", "Le Smoke est large (fonctionnalités critiques après nouveau build), le Sanity est ciblé (fonctionnalité spécifique après changement mineur)", "Ils sont identiques — deux noms pour la même chose", "Le Sanity est réalisé après un nouveau build, le Smoke après un bug fix"], rep: 1 },
          { q: "Le Regression Testing sert à :", options: ["Tester pour la première fois une nouvelle fonctionnalité", "S'assurer que les nouveaux changements ne cassent pas les fonctionnalités existantes", "Vérifier uniquement les performances", "Tester l'interface utilisateur"], rep: 1 },
          { q: "Qui effectue généralement le Debugging ?", options: ["Les testeurs", "Les end-users", "Les développeurs", "Les managers"], rep: 2 },
          { q: "Le Mars Climate Orbiter (1999) a été perdu à cause de :", options: ["Race condition", "Overflow d'entier 32 bits", "Confusion entre unités anglaises (lb·s) et métriques (N·s)", "Erreur de précision virgule flottante"], rep: 2 },
          { q: "Le principe 'Testing is context-dependent' (principe 6) signifie :", options: ["Tous les projets utilisent la même approche de testing", "L'approche de test dépend du contexte (type d'appli, industrie, risque)", "Le testing n'est requis que pour certains projets", "Le contexte n'influence pas le budget de testing"], rep: 1 },
          { q: "Dans le V-Model, quel niveau de test correspond à la phase 'Architecture' ?", options: ["Unit Testing", "Integration Testing", "System Testing", "Acceptance Testing"], rep: 1 },
          { q: "La Matrice de Traçabilité (RTM) sert à :", options: ["Mesurer les performances du système", "Relier les exigences, les cas de test et les défauts — assurer la couverture complète", "Automatiser les tests de régression", "Planifier les sprints Agile"], rep: 1 }
        ]
      }
    ]
  }
];

function QCMSection({ questions: defaultQuestions }: { questions: QCMQuestion[] }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [questions, setQuestions] = useState<QCMQuestion[]>(defaultQuestions);
  const [loading, setLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const score = submitted ? questions.filter((q: QCMQuestion, i: number) => answers[i] === q.rep).length : 0;

  const generateNewQuestions = async () => {
    setLoading(true);
    setAiError(null);
    setAnswers({});
    setSubmitted(false);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `Tu es un expert ISTQB. Génère 10 questions QCM variées sur le Chapitre 1 de l'ISTQB (Testing fondamentaux : définitions, erreur/faute/défaillance, testing vs debugging, vérification/validation, QA vs QC, 7 principes, processus de test, traçabilité, psychologie du testing).

Réponds UNIQUEMENT avec un tableau JSON valide, sans backticks ni texte supplémentaire, au format exact:
[{"q":"question","options":["A","B","C","D"],"rep":INDEX_CORRECT},...]

INDEX_CORRECT est l'index (0-3) de la bonne réponse dans le tableau options. Varie les sujets et la difficulté. Ne répète pas les questions déjà classiques.`
          }]
        })
      });
      const data = await response.json();
      const text = data.content.map((i: { text?: string }) => i.text || "").join("");
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setQuestions(parsed);
      } else {
        setAiError("Réponse invalide de l'IA.");
      }
    } catch (err) {
      setAiError("Erreur lors de la génération. Réessaie.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: "#7f8c8d" }}>{questions.length} questions</div>
        <button
          onClick={generateNewQuestions}
          disabled={loading}
          style={{ background: loading ? "rgba(26,188,156,0.2)" : "rgba(26,188,156,0.15)", border: "1px solid rgba(26,188,156,0.4)", color: loading ? "#7f8c8d" : "#1abc9c", padding: "7px 14px", borderRadius: 8, cursor: loading ? "default" : "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s" }}>
          {loading ? "⏳ Génération..." : "✨ Nouvelles questions (AI)"}
        </button>
      </div>

      {aiError && (
        <div style={{ background: "rgba(192,57,43,0.15)", border: "1px solid #c0392b", borderRadius: 8, padding: 10, fontSize: 13, color: "#e74c3c", marginBottom: 16 }}>
          ⚠️ {aiError}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: "center", padding: 40, color: "#1abc9c" }}>
          <div style={{ fontSize: 32, marginBottom: 12, animation: "spin 1s linear infinite" }}>⚙️</div>
          <div style={{ fontSize: 14 }}>L'IA génère de nouvelles questions ISTQB...</div>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : (
        <>
          {questions.map((q, qi) => (
            <div key={qi} style={{ marginBottom: 20, background: submitted ? (answers[qi] === q.rep ? "rgba(39,174,96,0.1)" : "rgba(192,57,43,0.1)") : "rgba(255,255,255,0.05)", borderRadius: 10, padding: 14, border: submitted ? (answers[qi] === q.rep ? "1px solid #27ae60" : "1px solid #c0392b") : "1px solid rgba(255,255,255,0.1)" }}>
              <p style={{ margin: "0 0 10px", fontWeight: 600, fontSize: 14 }}>Q{qi+1}. {q.q}</p>
              {q.options.map((opt, oi) => (
                <div key={oi} onClick={() => !submitted && setAnswers(a => ({...a, [qi]: oi}))}
                  style={{ cursor: submitted ? "default" : "pointer", padding: "6px 10px", marginBottom: 6, borderRadius: 6, fontSize: 13,
                    background: submitted
                      ? oi === q.rep ? "rgba(39,174,96,0.3)" : oi === answers[qi] ? "rgba(192,57,43,0.3)" : "transparent"
                      : answers[qi] === oi ? "rgba(224,123,57,0.3)" : "rgba(255,255,255,0.05)",
                    border: answers[qi] === oi && !submitted ? "1px solid #e07b39" : "1px solid transparent"
                  }}>
                  {submitted && oi === q.rep ? "✅ " : submitted && oi === answers[qi] && oi !== q.rep ? "❌ " : "○ "}{opt}
                </div>
              ))}
            </div>
          ))}
          {!submitted
            ? <button onClick={() => setSubmitted(true)} style={{ background: "#e07b39", color: "white", border: "none", padding: "10px 24px", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
                Vérifier mes réponses
              </button>
            : <div style={{ background: score >= 7 ? "rgba(39,174,96,0.2)" : "rgba(192,57,43,0.2)", borderRadius: 10, padding: 14, textAlign: "center", fontSize: 16, fontWeight: 700 }}>
                Score : {score}/{questions.length} {score >= 7 ? "🎉 Bien joué !" : "📚 Révise encore !"}
                <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 10 }}>
                  <button onClick={() => { setAnswers({}); setSubmitted(false); }} style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "none", padding: "6px 16px", borderRadius: 6, cursor: "pointer", fontSize: 13 }}>🔄 Recommencer</button>
                  <button onClick={generateNewQuestions} style={{ background: "rgba(26,188,156,0.2)", color: "#1abc9c", border: "1px solid rgba(26,188,156,0.4)", padding: "6px 16px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>✨ Nouvelles questions</button>
                </div>
              </div>
          }
        </>
      )}
    </div>
  );
}

function SectionContent({ content }: { content: ContentBlock[] }) {
  return (
    <div>
      {content.map((block, i) => {
        if (block.type === "definition") return (
          <div key={i} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: 14, marginBottom: 16, borderLeft: "4px solid #e07b39" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#e07b39", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{block.term}</div>
            <div style={{ fontSize: 13, lineHeight: 1.7, color: "#ecf0f1" }}>{block.text}</div>
          </div>
        );
        if (block.type === "deux") return (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            {[block.a, block.b].map((side, si) => (
              <div key={si} style={{ background: "rgba(255,255,255,0.07)", borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{side.icon}</div>
                <div style={{ fontWeight: 700, color: "#e07b39", marginBottom: 6, fontSize: 13 }}>{side.label}</div>
                <div style={{ fontSize: 12, lineHeight: 1.6, color: "#bdc3c7" }}>{side.text}</div>
              </div>
            ))}
          </div>
        );
        if (block.type === "liste") return (
          <div key={i} style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 700, color: "#e07b39", fontSize: 13, marginBottom: 8 }}>{block.label}</div>
            {block.items.map((item, ii) => (
              <div key={ii} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 13, color: "#ecf0f1", alignItems: "flex-start" }}>
                <span style={{ color: "#e07b39", marginTop: 2 }}>▸</span><span style={{ lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        );
        if (block.type === "retenir") return (
          <div key={i} style={{ background: "rgba(224,123,57,0.15)", border: "1px solid rgba(224,123,57,0.4)", borderRadius: 10, padding: 12, marginBottom: 16, fontSize: 13, fontWeight: 600, color: "#f39c12", lineHeight: 1.6 }}>
            {block.text}
          </div>
        );
        if (block.type === "exemple") return (
          <div key={i} style={{ background: "rgba(52,152,219,0.12)", border: "1px solid rgba(52,152,219,0.3)", borderRadius: 10, padding: 12, marginBottom: 16, fontSize: 13, color: "#85c1e9", lineHeight: 1.6 }}>
            {block.text}
          </div>
        );
        if (block.type === "chaine") return (
          <div key={i} style={{ marginBottom: 16 }}>
            {block.items.map((item, ii) => (
              <div key={ii} style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: ii < block.items.length-1 ? 4 : 0 }}>
                <div style={{ background: `${item.color}22`, border: `2px solid ${item.color}`, borderRadius: 10, padding: 12, width: "100%", boxSizing: "border-box" }}>
                  <div style={{ fontWeight: 700, color: item.color, marginBottom: 4, fontSize: 13 }}>{item.icon} {item.label}</div>
                  <div style={{ fontSize: 12, color: "#bdc3c7", lineHeight: 1.5 }}>{item.text}</div>
                </div>
                {ii < block.items.length-1 && <div style={{ fontSize: 20, color: "#7f8c8d", marginBlock: 4 }}>↓</div>}
              </div>
            ))}
          </div>
        );
        if (block.type === "tableau") return (
          <div key={i} style={{ marginBottom: 16, overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr>{block.headers.map((h, hi) => <th key={hi} style={{ background: "rgba(224,123,57,0.3)", padding: "8px 10px", textAlign: "left", color: "#e07b39", fontWeight: 700 }}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {block.rows.map((row, ri) => (
                  <tr key={ri} style={{ background: ri % 2 === 0 ? "rgba(255,255,255,0.04)" : "transparent" }}>
                    {row.map((cell, ci) => <td key={ci} style={{ padding: "7px 10px", color: "#ecf0f1", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        if (block.type === "principes") return (
          <div key={i}>
            {block.items.map((p, pi) => (
              <div key={pi} style={{ display: "flex", gap: 12, marginBottom: 12, background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: 12, alignItems: "flex-start" }}>
                <div style={{ background: "#e07b39", color: "white", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, flexShrink: 0 }}>{p.num}</div>
                <div>
                  <div style={{ fontWeight: 700, color: "#f39c12", fontSize: 13, marginBottom: 4 }}>{p.title}</div>
                  <div style={{ fontSize: 12, color: "#bdc3c7", lineHeight: 1.5 }}>{p.text}</div>
                </div>
              </div>
            ))}
          </div>
        );
        if (block.type === "etapes") return (
          <div key={i}>
            {block.items.map((e, ei) => (
              <div key={ei} style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ background: "#16a085", color: "white", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, flexShrink: 0 }}>{e.num}</div>
                  {ei < block.items.length-1 && <div style={{ width: 2, height: 16, background: "rgba(22,160,133,0.3)", marginTop: 4 }}></div>}
                </div>
                <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: 10, flex: 1 }}>
                  <div style={{ fontWeight: 700, color: "#1abc9c", fontSize: 13, marginBottom: 4 }}>{e.icon} {e.label}</div>
                  <div style={{ fontSize: 12, color: "#bdc3c7", lineHeight: 1.5 }}>{e.text}</div>
                </div>
              </div>
            ))}
          </div>
        );
        if (block.type === "cas") return (
          <div key={i}>
            {block.items.map((c, ci) => (
              <div key={ci} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: 12, marginBottom: 10 }}>
                <div style={{ fontWeight: 700, color: "#f39c12", fontSize: 14, marginBottom: 6 }}>📌 {c.titre}</div>
                <div style={{ fontSize: 12, marginBottom: 4 }}><span style={{ color: "#e07b39" }}>Cause :</span> <span style={{ color: "#ecf0f1" }}>{c.type}</span></div>
                <div style={{ fontSize: 12, marginBottom: 4 }}><span style={{ color: "#e74c3c" }}>Impact :</span> <span style={{ color: "#ecf0f1" }}>{c.impact}</span></div>
                <div style={{ fontSize: 12 }}><span style={{ color: "#2ecc71" }}>Leçon :</span> <span style={{ color: "#ecf0f1" }}>{c.lecon}</span></div>
              </div>
            ))}
          </div>
        );
        if (block.type === "qcm") return <QCMSection key={i} questions={block.questions} />;
        return null;
      })}
    </div>
  );
}

export default function Istqb() {
  const [active, setActive] = useState("intro");
  const current = sections.find(s => s.id === active) ?? sections[0];

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#1a1a2e", minHeight: "100vh", color: "#ecf0f1", display: "flex" }}>
      {/* Sidebar */}
      <div style={{ width: 220, flexShrink: 0, background: "#16213e", padding: "20px 0", display: "flex", flexDirection: "column", overflowY: "auto" }}>
        <div style={{ padding: "0 16px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ fontSize: 11, fontWeight: 900, color: "#e07b39", letterSpacing: 2, textTransform: "uppercase" }}>ISTQB</div>
          <div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>Fiche de Révision</div>
          <div style={{ fontSize: 11, color: "#7f8c8d", marginTop: 2 }}>Ch1 (35) + Ch2 (45) + Mix Ch1&2 (46) + AI</div>
        </div>
        <div style={{ padding: "12px 8px", flex: 1 }}>
          {sections.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)}
              style={{ width: "100%", textAlign: "left", background: active === s.id ? `${s.color}22` : "transparent", border: active === s.id ? `1px solid ${s.color}55` : "1px solid transparent", borderRadius: 8, padding: "8px 10px", cursor: "pointer", color: active === s.id ? "white" : "#95a5a6", marginBottom: 4, transition: "all 0.2s", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14 }}>{s.emoji}</span>
              <span style={{ fontSize: 12, fontWeight: active === s.id ? 600 : 400, lineHeight: 1.3 }}>{s.title}</span>
            </button>
          ))}
        </div>
        <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: 10, color: "#4a4a6a", lineHeight: 1.6 }}>
          Toutes les sections viennent de tes PDFs de cours LSIM2/LISI2
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: 24, overflowY: "auto", maxHeight: "100vh" }}>
        <div style={{ maxWidth: 700 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, paddingBottom: 16, borderBottom: `2px solid ${current.color}44` }}>
            <div style={{ fontSize: 32 }}>{current.emoji}</div>
            <div>
              <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "white" }}>{current.title}</h1>
              <div style={{ height: 3, width: 60, background: current.color, borderRadius: 2, marginTop: 6 }}></div>
            </div>
          </div>
          <SectionContent content={current.content} />

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            {sections.findIndex(s => s.id === active) > 0
              ? <button onClick={() => setActive(sections[sections.findIndex(s => s.id === active) - 1].id)}
                  style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "white", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>
                  ← Précédent
                </button>
              : <div />
            }
            {sections.findIndex(s => s.id === active) < sections.length - 1
              ? <button onClick={() => setActive(sections[sections.findIndex(s => s.id === active) + 1].id)}
                  style={{ background: current.color, border: "none", color: "white", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                  Suivant →
                </button>
              : <div />
            }
          </div>
        </div>
      </div>
    </div>
  );
}


