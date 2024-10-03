# **Audio API Text to Speech**

## **Description**

Convertisseur de texte en synthèse vocale !

## **Fonctionnalités**

- **Synthèse Vocale Dynamique** : Sélectionne automatiquement la meilleure voix disponible en fonction de l'environnement de l'utilisateur.
- **Interface Utilisateur Intuitive** : Formulaire simple pour entrer du texte et sélectionner des paramètres de voix.
- **Support Multilingue** : Compatible avec plusieurs langues et accents.
- **Contrôle de la Hauteur et de la Vitesse** : Ajustez facilement la hauteur et la vitesse de la voix pour une expérience personnalisée.
- **Compatibilité Multi-Navigateurs** : Fonctionne sur les principaux navigateurs comme Chrome, Firefox, et Edge.
- **Retour Visuel** : Affiche les voix disponibles et la voix sélectionnée pour une meilleure transparence.
- **Sécurité Renforcée** : Utilisation de DOMPurify pour assainir les entrées utilisateur et prévenir les attaques XSS.

## **Installation**

1 Clonez le dépôt (SSH):

   ```bash
   git clone git@github.com:YanBerdin/text_to_speech_web_app.git
   ```

2 Ouvrez le fichier `index.html` dans votre navigateur :

   ```bash
   open index.html
   ```

## **Utilisation**

1. Ouvrez l'application dans votre navigateur.
2. Entrez le texte que vous souhaitez convertir en parole.
3. Sélectionnez les paramètres de voix, de hauteur et de vitesse selon vos préférences.
4. Cliquez sur le bouton "Lire" pour écouter le texte converti en parole.

## **Technologies Utilisées**

- **HTML5** : Structure de la page web.
- **CSS3** : Stylisation de l'interface utilisateur.
- **JavaScript** : Logique de l'application, interaction avec l'API SpeechSynthesis.
- **API SpeechSynthesis** : Fournit la fonctionnalité de synthèse vocale.
- **DOMPurify** : Bibliothèque pour assainir les entrées utilisateur et prévenir les attaques XSS.

## **Mesures de Sécurité**

- **Validation des Entrées** : Les entrées utilisateur sont validées pour éviter les injections de scripts malveillants.
- **Assainissement des Entrées** : Utilisation de la bibliothèque DOMPurify pour assainir les entrées utilisateur et prévenir les attaques XSS.
- **Utilisation de `defer` pour les Scripts** : Le script JavaScript est chargé avec l'attribut `defer` pour s'assurer qu'il est exécuté après le chargement complet du DOM.
- **HTTPS** : Utilisation de liens sécurisés pour les ressources externes (Google Fonts et DOMPurify).

## **Défis et Solutions Apportées**

- **Défi** : Sélection de la voix par défaut.
  - **Solution** : Implémentation d'une logique pour sélectionner automatiquement la voix par défaut ou une voix alternative si la voix par défaut n'est pas disponible.
  
- **Défi** : Compatibilité multi-navigateurs.
  - **Solution** : Utilisation de l'API SpeechSynthesis, qui est supportée par les principaux navigateurs.

- **Défi** : Sécurité des entrées utilisateur.
  - **Solution** : Utilisation de DOMPurify pour assainir les entrées utilisateur et prévenir les attaques XSS.

## **Résultat Obtenu**

L'application permet aux utilisateurs de convertir du texte en parole de manière intuitive et personnalisée. Elle offre une interface utilisateur simple et des options de personnalisation pour la voix, le pitch et la vitesse, tout en étant compatible avec plusieurs navigateurs et langues.

## **En-têtes de Sécurité**

Il est recommandé d'utiliser des security-headers comme `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, et `Strict-Transport-Security` dans la configuration de votre serveur web pour renforcer la sécurité de l'application.
