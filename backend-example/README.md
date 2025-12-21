# Backend API - WinOil Carrières

Backend Node.js/Express pour gérer les offres d'emploi et candidatures de WinOil.

## Installation

### Prérequis

- Node.js 16+ et npm
- MongoDB (local ou Atlas)

### Étapes

1. **Installer les dépendances:**

```bash
npm install
```

2. **Configurer les variables d'environnement:**

```bash
cp .env.example .env
```

Puis éditez le fichier `.env` avec vos configurations.

3. **Créer le dossier uploads:**

```bash
mkdir uploads
```

4. **Démarrer le serveur:**

```bash
# Mode développement (avec nodemon)
npm run dev

# Mode production
npm start
```

Le serveur démarre sur `http://localhost:3000` (ou le port défini dans `.env`)

## Structure du Projet

```
backend-example/
├── server.js           # Point d'entrée principal
├── .env               # Configuration (ne pas commiter)
├── .env.example       # Exemple de configuration
├── package.json       # Dépendances
├── .gitignore        # Fichiers à ignorer
├── uploads/          # Fichiers uploadés (CVs, lettres)
└── README.md         # Ce fichier
```

## API Endpoints

### Jobs (Offres d'emploi)

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/jobs` | Liste tous les postes | Non |
| GET | `/api/jobs/:id` | Récupère un poste | Non |
| POST | `/api/jobs` | Crée un poste | Admin |
| PUT | `/api/jobs/:id` | Modifie un poste | Admin |
| DELETE | `/api/jobs/:id` | Supprime un poste | Admin |

### Applications (Candidatures)

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/api/applications` | Soumet une candidature | Non |
| GET | `/api/applications` | Liste les candidatures | Admin |
| GET | `/api/applications/:id` | Récupère une candidature | Admin |
| PUT | `/api/applications/:id` | Modifie le statut | Admin |

## Utilisation

### Créer une offre d'emploi

```bash
curl -X POST http://localhost:3000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Pompiste",
    "category": "operations",
    "location": "Dakar",
    "type": "CDI",
    "experience": "0-1 an",
    "description": "Description du poste...",
    "requirements": ["Exigence 1", "Exigence 2"]
  }'
```

### Soumettre une candidature

```bash
curl -X POST http://localhost:3000/api/applications \
  -F "jobId=1" \
  -F "firstName=Mamadou" \
  -F "lastName=Diallo" \
  -F "email=mamadou@example.com" \
  -F "phone=+221771234567" \
  -F "education=licence" \
  -F "experience=3-5" \
  -F "cv=@cv.pdf" \
  -F "consent=on"
```

## Configuration Frontend

Dans `assets/js/careers.js`, mettez à jour:

```javascript
const API_CONFIG = {
    baseURL: 'http://localhost:3000/api',
    endpoints: {
        jobs: '/jobs',
        apply: '/applications'
    }
};
```

## Sécurité

- Les fichiers uploadés sont limités à 5MB
- Rate limiting: 10 requêtes par 15 minutes
- CORS configuré pour les domaines autorisés
- Validation des données avec express-validator
- Types de fichiers autorisés: PDF, DOC, DOCX

## Prochaines Étapes

1. **Authentification Admin:**
   - Implémenter JWT pour sécuriser les routes admin
   - Créer un système de login pour les RH

2. **Base de données:**
   - Remplacer le stockage en mémoire par MongoDB
   - Créer les modèles Mongoose

3. **Notifications:**
   - Configurer Nodemailer pour envoyer des emails
   - Email de confirmation aux candidats
   - Notification aux RH

4. **Tableau de bord Admin:**
   - Interface pour gérer les postes
   - Visualiser et filtrer les candidatures
   - Exporter les données

## Support

Pour plus d'informations, consultez `CAREERS_BACKEND_INTEGRATION.md` à la racine du projet.
