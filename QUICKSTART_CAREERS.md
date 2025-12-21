# Démarrage Rapide - Page Carrières WinOil

## Étape 1: Visualiser la page (Sans Backend)

La page fonctionne déjà avec des données de démonstration!

1. Ouvrez `careers.html` dans votre navigateur
2. La page affiche 5 offres d'emploi de démonstration
3. Vous pouvez filtrer par catégorie
4. Tester le formulaire de candidature (mode simulation)

## Étape 2: Intégration Complète (Avec Backend)

### Option A: Backend Simple (Recommandé pour débuter)

1. **Créer un dossier pour le backend:**

```bash
cd winoil
mkdir backend
cd backend
```

2. **Initialiser le projet Node.js:**

```bash
npm init -y
npm install express multer cors
```

3. **Créer `server.js`:**

Copiez le code d'exemple du fichier `CAREERS_BACKEND_INTEGRATION.md` (section "Exemple de Backend Node.js avec Express")

4. **Créer le dossier uploads:**

```bash
mkdir uploads
```

5. **Démarrer le serveur:**

```bash
node server.js
```

Le serveur démarre sur `http://localhost:3000`

6. **Modifier le frontend:**

Dans `assets/js/careers.js`, ligne 6-12:

```javascript
const API_CONFIG = {
    baseURL: 'http://localhost:3000/api',  // ✅ Changer ici
    endpoints: {
        jobs: '/jobs',
        apply: '/applications'
    }
};
```

Puis décommentez les lignes 64-66 et 271-277 (instructions dans les commentaires)

7. **Tester:**

- Ouvrez `careers.html` dans votre navigateur
- Les offres sont maintenant chargées depuis le backend
- Soumettez une candidature test

### Option B: Backend Complet (Production)

Pour un backend production-ready avec MongoDB, authentification, etc.:

1. Consultez `CAREERS_BACKEND_INTEGRATION.md` pour la documentation complète
2. Utilisez le dossier `backend-example/` comme template
3. Configurez MongoDB et les variables d'environnement

## Structure des Fichiers Créés

```
winoil/
├── careers.html                          # ✅ Page carrières
├── assets/
│   ├── css/
│   │   └── careers.css                  # ✅ Styles
│   └── js/
│       └── careers.js                   # ✅ Logique + API
├── backend-example/                      # 📁 Template backend
│   ├── package.json                     # Dépendances
│   ├── .env.example                     # Config exemple
│   ├── .gitignore                       # Git ignore
│   └── README.md                        # Documentation
├── CAREERS_BACKEND_INTEGRATION.md        # 📖 Guide complet
└── QUICKSTART_CAREERS.md                # 📖 Ce fichier
```

## Fonctionnalités Implémentées

### Frontend (careers.html)

✅ Design moderne et responsive
✅ Section "Pourquoi travailler chez WinOil"
✅ Filtrage par catégorie (Opérations, Commercial, Administration, Technique)
✅ Affichage dynamique des offres
✅ Formulaire de candidature complet
✅ Upload de CV et lettre de motivation
✅ Modal élégant pour postuler
✅ Animations et transitions fluides
✅ Totalement responsive (mobile, tablette, desktop)

### Backend (Prêt à implémenter)

✅ API REST complète
✅ CRUD pour les offres d'emploi
✅ Upload de fichiers sécurisé
✅ Validation des données
✅ Gestion des candidatures
✅ Structure MongoDB
✅ Exemple de code Node.js/Express

## Données de Démonstration

La page inclut 5 offres d'emploi de démonstration:

1. **Responsable de Station** (Opérations, CDI, Rufisque)
2. **Pompiste** (Opérations, CDD, Mbour)
3. **Commercial B2B** (Commercial, CDI, Dakar)
4. **Comptable** (Administration, CDI, Rufisque)
5. **Technicien de Maintenance** (Technique, CDI, Saint-Louis)

## Navigation

La page "Carrières" a été ajoutée à la navigation de toutes les pages:

✅ index.html
✅ about.html
✅ services.html
✅ stations.html
✅ contact.html
✅ careers.html

## Personnalisation

### Modifier les catégories d'emploi

Dans `careers.html`, lignes 90-108:

```html
<button class="filter-btn" data-filter="votre-categorie">
    <i class="fas fa-votre-icone"></i> Votre Catégorie
</button>
```

Dans `careers.js`, fonction `getCategoryIcon()` et `getCategoryLabel()`

### Modifier les champs du formulaire

Dans `careers.html`, section "Application Form Modal" (lignes 158-285)

### Changer les couleurs

Dans `careers.css`, modifier les variables de couleur (rouge WinOil: #e74c3c)

## API JavaScript Publiques

Le fichier `careers.js` expose des fonctions utiles:

```javascript
// Recharger les offres
window.refreshJobs();

// Ajouter une offre (utile pour un admin panel)
window.addJob({
    id: 6,
    title: "Nouveau Poste",
    category: "operations",
    location: "Dakar",
    type: "CDI",
    experience: "2-4 ans",
    posted: "2025-01-20",
    description: "Description...",
    requirements: ["Req 1", "Req 2"]
});

// Supprimer une offre
window.removeJob(1);

// Mettre à jour une offre
window.updateJob(1, { title: "Titre Modifié" });
```

## Tests

### Tester sans backend:

1. Ouvrir `careers.html` dans le navigateur
2. Filtrer les offres par catégorie
3. Cliquer sur "Postuler" pour ouvrir le modal
4. Remplir et soumettre le formulaire
5. Observer le message de succès simulé

### Tester avec backend:

1. Démarrer le serveur backend
2. Activer l'intégration API dans `careers.js`
3. Tester les endpoints avec curl ou Postman:

```bash
# Récupérer les offres
curl http://localhost:3000/api/jobs

# Soumettre une candidature (avec fichier)
curl -X POST http://localhost:3000/api/applications \
  -F "jobId=1" \
  -F "firstName=Test" \
  -F "lastName=User" \
  -F "email=test@example.com" \
  -F "phone=+221771234567" \
  -F "education=licence" \
  -F "experience=3-5" \
  -F "cv=@chemin/vers/cv.pdf" \
  -F "consent=on"
```

## Prochaines Étapes Recommandées

1. **Mettre en place le backend:**
   - Suivre Option A ou B ci-dessus
   - Tester tous les endpoints

2. **Configurer la base de données:**
   - Installer MongoDB
   - Créer les collections
   - Importer les données de démonstration

3. **Configurer les emails:**
   - Setup Nodemailer
   - Templates d'email pour confirmations
   - Notifications RH

4. **Sécurité:**
   - Ajouter rate limiting
   - Validation des fichiers uploadés
   - Authentification pour l'admin

5. **Admin Panel:**
   - Interface pour gérer les offres
   - Dashboard des candidatures
   - Filtres et recherche

## Support et Documentation

- **Guide complet:** `CAREERS_BACKEND_INTEGRATION.md`
- **Backend exemple:** Dossier `backend-example/`
- **Questions?** Consultez la documentation Express.js et MongoDB

---

**Page Carrières WinOil - Prête à l'emploi!** 🚀

Créée avec ❤️ pour faciliter le recrutement chez WinOil
