# 🚀 WinOil - Site Vitrine Premium

Site vitrine moderne et professionnel pour la station-service WinOil au Sénégal.

## 🎨 Palette de Couleurs

Inspirée directement du logo WinOil :

- **Violet primaire** : `#B565D8`
- **Rose/Magenta** : `#E94B7A`
- **Fond noir** : `#000000`
- **Dégradé signature** : `linear-gradient(135deg, #B565D8 0%, #E94B7A 100%)`

## 📋 Structure du Site

### Pages incluses

1. **Accueil** - Hero section dynamique avec animations
2. **À Propos** - Vision, mission et valeurs de WinOil
3. **Nos Services** - Cartes interactives avec effet flip 3D
4. **Contact & Localisation** - Formulaire et informations pratiques

### Sections principales

- ✅ Navigation responsive avec menu mobile
- ✅ Hero section avec animations de formes flottantes
- ✅ Points forts en grille
- ✅ Services rapides en bannière
- ✅ Témoignage client
- ✅ Présentation détaillée de l'entreprise
- ✅ Cartes de services avec effet flip
- ✅ Formulaire de contact avec validation
- ✅ Footer complet avec réseaux sociaux
- ✅ Bouton scroll to top

## 🎯 Fonctionnalités

### Design
- Design moderne et premium
- Palette violet/rose/noir fidèle au logo
- Dégradés énergétiques
- Animations fluides et professionnelles
- 100% Responsive (Mobile First)

### Interactions
- Navigation smooth scroll
- Menu mobile hamburger animé
- Cartes avec effet hover
- Effet parallax sur les formes du hero
- Animations au scroll (AOS)
- Compteurs animés pour les statistiques
- Validation de formulaire en temps réel
- Notifications système

### Performance
- Code optimisé et commenté
- Lazy loading des images
- Debounce sur les events scroll
- CSS moderne avec variables
- JavaScript modulaire

## 🚀 Installation et Utilisation

### Installation

1. Téléchargez tous les fichiers du projet
2. Assurez-vous que la structure est respectée :

```
winoil/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   ├── images/
│   │   └── logo.png
│   └── icons/
└── README.md
```

### Lancement

Ouvrez simplement `index.html` dans votre navigateur.

**Aucune installation de dépendances requise !**

Le site utilise des CDN pour :
- Google Fonts (Poppins, Inter)
- Font Awesome (icônes)
- AOS (animations au scroll)

### Hébergement

Pour mettre le site en ligne :

1. **GitHub Pages** (gratuit)
   - Créez un repo GitHub
   - Activez GitHub Pages dans les paramètres
   - Votre site sera accessible à `username.github.io/winoil`

2. **Netlify** (gratuit)
   - Glissez-déposez le dossier sur [netlify.com/drop](https://app.netlify.com/drop)
   - Obtenez un lien instantané

3. **Vercel** (gratuit)
   - Importez le projet sur [vercel.com](https://vercel.com)
   - Déploiement automatique

## 📝 Personnalisation

### Modifier les couleurs

Dans `assets/css/style.css`, ligne 11-15 :

```css
:root {
    --primary-violet: #B565D8;
    --primary-pink: #E94B7A;
    --gradient-primary: linear-gradient(135deg, #B565D8 0%, #E94B7A 100%);
}
```

### Modifier les textes

Ouvrez `index.html` et modifiez directement le contenu des sections.

### Ajouter Google Maps

Dans `index.html`, ligne ~650, remplacez la div `.map-placeholder` par :

```html
<iframe
    src="VOTRE_LIEN_GOOGLE_MAPS_EMBED"
    width="100%"
    height="450"
    style="border:0;"
    allowfullscreen=""
    loading="lazy">
</iframe>
```

**Pour obtenir le lien embed :**
1. Allez sur [Google Maps](https://maps.google.com)
2. Recherchez votre adresse
3. Cliquez sur "Partager" → "Intégrer une carte"
4. Copiez le code iframe

### Connecter le formulaire

Dans `assets/js/main.js`, ligne ~170, décommentez et configurez :

```javascript
fetch('/api/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
})
```

**Services recommandés :**
- [Formspree](https://formspree.io/) (gratuit)
- [EmailJS](https://www.emailjs.com/) (gratuit)
- [Web3Forms](https://web3forms.com/) (gratuit)

## 🎨 Suggestions de Contenu

### Slogans proposés

1. **"L'énergie qui propulse votre voyage"** ⭐ (utilisé actuellement)
2. **"Votre partenaire route, votre énergie fiable"**
3. **"WinOil : La qualité en mouvement"**

### Images recommandées

Pour enrichir le site visuellement, ajoutez des images :

**Hero Section :**
- Photo de la station-service WinOil (vue extérieure moderne)
- Paysage routier sénégalais au coucher du soleil
- Illustration vectorielle d'énergie/carburant

**Section Services :**
- Pompe à essence moderne
- Voiture en cours de lavage
- Vidange moteur
- Client satisfait dans boutique

**Section À Propos :**
- Équipe WinOil
- Installations de la station
- Camions de livraison de carburant

**Sources d'images gratuites :**
- [Unsplash](https://unsplash.com) - Photos HD gratuites
- [Pexels](https://pexels.com) - Photos et vidéos
- [Freepik](https://freepik.com) - Illustrations et vecteurs

### Animations suggérées

Déjà implémentées :
- ✅ Fade in/out au scroll
- ✅ Effet parallax sur les formes
- ✅ Hover effects sur les cartes
- ✅ Flip 3D sur les services
- ✅ Smooth scroll navigation

**À ajouter (optionnel) :**
- Video background dans le hero
- Slider de témoignages
- Galerie photos interactive
- Compteur de litres distribués

## 📱 Responsive Design

Le site est optimisé pour tous les appareils :

- **Desktop** (1200px+) : Layout complet avec grilles
- **Tablet** (768px - 1024px) : Grilles adaptées
- **Mobile** (< 768px) : Menu hamburger, colonnes simples

## 🔧 Technologies Utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Animations, Grid, Flexbox, Variables
- **JavaScript ES6+** - Interactions modernes
- **Font Awesome 6** - Icônes
- **Google Fonts** - Typographies Poppins & Inter
- **AOS Library** - Animations au scroll

## ✨ Bonus Implémentés

- 🎯 Effet parallax sur les formes flottantes
- 🎨 Dégradés animés violet → rose
- 🔄 Cartes flip 3D pour les services
- 📱 Menu mobile avec animation hamburger
- 🚀 Bouton scroll to top animé
- ✅ Validation formulaire temps réel
- 🔔 Système de notifications
- ♿ Support accessibilité clavier
- 🎁 Easter egg sur le logo (cliquez 5 fois !)

## 📞 Support & Contact

Pour toute question sur le site :

**Email technique :** dev@winoil.sn
**Email commercial :** contact@winoil.sn
**Téléphone :** +221 33 XXX XX XX

## 📄 Licence

© 2024 WinOil. Tous droits réservés.

---

**Développé avec ❤️ pour WinOil - Station-service premium au Sénégal**

🇸🇳 Fier d'être Sénégalais | 🚗 Votre énergie, notre passion
