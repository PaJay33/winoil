# Guide d'Intégration Backend - Page Carrières WinOil

## Vue d'ensemble

La page carrières a été conçue pour faciliter l'intégration avec un backend Node.js. Elle utilise des appels API REST pour gérer les offres d'emploi et les candidatures.

## Structure des Fichiers

```
winoil/
├── careers.html              # Page principale carrières
├── assets/
│   ├── css/
│   │   └── careers.css      # Styles spécifiques
│   └── js/
│       └── careers.js       # Logique frontend + API calls
```

## Configuration API

### Fichier: `assets/js/careers.js`

```javascript
const API_CONFIG = {
    baseURL: '/api',  // Changez avec l'URL de votre backend
    endpoints: {
        jobs: '/jobs',           // GET: Liste des postes
        apply: '/applications'   // POST: Soumettre une candidature
    }
};
```

## Endpoints Backend Requis

### 1. GET `/api/jobs` - Récupérer la liste des postes

**Réponse attendue (JSON):**

```json
[
    {
        "id": 1,
        "title": "Responsable de Station",
        "category": "operations",
        "location": "Rufisque",
        "type": "CDI",
        "experience": "3-5 ans",
        "posted": "2025-01-15",
        "description": "Description du poste...",
        "requirements": [
            "Exigence 1",
            "Exigence 2",
            "Exigence 3"
        ]
    }
]
```

**Champs obligatoires:**
- `id` (number): Identifiant unique du poste
- `title` (string): Titre du poste
- `category` (string): Catégorie (operations, commercial, administration, technique)
- `location` (string): Lieu du poste
- `type` (string): Type de contrat (CDI, CDD, Stage, etc.)
- `experience` (string): Expérience requise
- `posted` (string): Date de publication (format ISO: YYYY-MM-DD)
- `description` (string): Description détaillée
- `requirements` (array): Liste des exigences

### 2. POST `/api/applications` - Soumettre une candidature

**Données envoyées (FormData):**

```javascript
{
    "jobId": "1",                    // ID du poste (vide pour candidature spontanée)
    "firstName": "Mamadou",
    "lastName": "Diallo",
    "email": "mamadou@example.com",
    "phone": "+221771234567",
    "address": "Dakar, Plateau",
    "education": "licence",          // bac, bac+2, licence, master, doctorat
    "experience": "3-5",             // 0-1, 1-3, 3-5, 5-10, 10+
    "cv": File,                      // Fichier CV (PDF, DOC, DOCX)
    "coverLetter": File,             // Fichier lettre de motivation (optionnel)
    "message": "Message complémentaire...",
    "consent": "on"                  // Consentement RGPD
}
```

**Réponse attendue (JSON):**

```json
{
    "success": true,
    "message": "Candidature reçue avec succès",
    "applicationId": 123
}
```

**En cas d'erreur:**

```json
{
    "success": false,
    "message": "Erreur lors de l'envoi de la candidature",
    "error": "Details de l'erreur"
}
```

## Exemple de Backend Node.js avec Express

### Installation des dépendances

```bash
npm install express multer cors
```

### Exemple de serveur (`server.js`)

```javascript
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Servir les fichiers statiques

// Configuration de Multer pour l'upload de fichiers
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    fileFilter: (req, file, cb) => {
        const allowedTypes = /pdf|doc|docx/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        if (extname) {
            return cb(null, true);
        }
        cb(new Error('Type de fichier non autorisé'));
    }
});

// Base de données simulée (à remplacer par une vraie DB)
let jobs = [
    {
        id: 1,
        title: "Responsable de Station",
        category: "operations",
        location: "Rufisque",
        type: "CDI",
        experience: "3-5 ans",
        posted: "2025-01-15",
        description: "Nous recherchons un(e) Responsable de Station...",
        requirements: [
            "Expérience minimum de 3 ans",
            "Leadership et gestion d'équipe",
            "Connaissance des normes HSE"
        ]
    }
];

let applications = [];

// Routes

// GET /api/jobs - Récupérer tous les postes
app.get('/api/jobs', (req, res) => {
    const { category } = req.query;

    let filteredJobs = jobs;
    if (category && category !== 'all') {
        filteredJobs = jobs.filter(job => job.category === category);
    }

    res.json(filteredJobs);
});

// GET /api/jobs/:id - Récupérer un poste spécifique
app.get('/api/jobs/:id', (req, res) => {
    const job = jobs.find(j => j.id === parseInt(req.params.id));

    if (!job) {
        return res.status(404).json({
            success: false,
            message: 'Poste non trouvé'
        });
    }

    res.json(job);
});

// POST /api/jobs - Créer un nouveau poste (Admin)
app.post('/api/jobs', (req, res) => {
    const newJob = {
        id: jobs.length + 1,
        ...req.body,
        posted: new Date().toISOString().split('T')[0]
    };

    jobs.push(newJob);
    res.status(201).json({
        success: true,
        message: 'Poste créé avec succès',
        job: newJob
    });
});

// PUT /api/jobs/:id - Mettre à jour un poste (Admin)
app.put('/api/jobs/:id', (req, res) => {
    const index = jobs.findIndex(j => j.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: 'Poste non trouvé'
        });
    }

    jobs[index] = { ...jobs[index], ...req.body };
    res.json({
        success: true,
        message: 'Poste mis à jour',
        job: jobs[index]
    });
});

// DELETE /api/jobs/:id - Supprimer un poste (Admin)
app.delete('/api/jobs/:id', (req, res) => {
    const index = jobs.findIndex(j => j.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: 'Poste non trouvé'
        });
    }

    jobs.splice(index, 1);
    res.json({
        success: true,
        message: 'Poste supprimé'
    });
});

// POST /api/applications - Soumettre une candidature
app.post('/api/applications',
    upload.fields([
        { name: 'cv', maxCount: 1 },
        { name: 'coverLetter', maxCount: 1 }
    ]),
    (req, res) => {
        try {
            const applicationData = {
                id: applications.length + 1,
                jobId: req.body.jobId || null,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                education: req.body.education,
                experience: req.body.experience,
                message: req.body.message,
                cvPath: req.files['cv'] ? req.files['cv'][0].path : null,
                coverLetterPath: req.files['coverLetter'] ? req.files['coverLetter'][0].path : null,
                submittedAt: new Date().toISOString(),
                status: 'pending'
            };

            applications.push(applicationData);

            // TODO: Envoyer un email de confirmation
            // TODO: Notifier les RH

            res.json({
                success: true,
                message: 'Candidature reçue avec succès',
                applicationId: applicationData.id
            });
        } catch (error) {
            console.error('Erreur:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur lors de l\'envoi de la candidature',
                error: error.message
            });
        }
    }
);

// GET /api/applications - Récupérer toutes les candidatures (Admin)
app.get('/api/applications', (req, res) => {
    const { jobId, status } = req.query;

    let filteredApplications = applications;

    if (jobId) {
        filteredApplications = filteredApplications.filter(
            app => app.jobId === parseInt(jobId)
        );
    }

    if (status) {
        filteredApplications = filteredApplications.filter(
            app => app.status === status
        );
    }

    res.json(filteredApplications);
});

// Créer le dossier uploads s'il n'existe pas
const fs = require('fs');
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
```

## Activation de l'Intégration Backend

### Dans `assets/js/careers.js`:

1. **Modifier la configuration API:**

```javascript
const API_CONFIG = {
    baseURL: 'http://localhost:3000/api',  // URL de votre backend
    endpoints: {
        jobs: '/jobs',
        apply: '/applications'
    }
};
```

2. **Décommenter les appels API:**

Dans la fonction `loadJobs()`:
```javascript
// Décommenter cette ligne:
const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.jobs}`);
if (!response.ok) throw new Error('Failed to fetch jobs');
jobsData = await response.json();

// Commenter cette ligne:
// jobsData = sampleJobs;
```

Dans la fonction `handleFormSubmit()`:
```javascript
// Décommenter ce bloc:
const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.apply}`, {
    method: 'POST',
    body: formData
});

if (!response.ok) {
    throw new Error('Erreur lors de l\'envoi de la candidature');
}

const result = await response.json();
```

## Fonctions JavaScript Utiles

Le fichier `careers.js` expose des fonctions globales pour la gestion dynamique:

```javascript
// Recharger la liste des postes
window.refreshJobs();

// Ajouter un nouveau poste (admin)
window.addJob({
    id: 6,
    title: "Nouveau Poste",
    category: "commercial",
    // ... autres champs
});

// Supprimer un poste (admin)
window.removeJob(1);

// Mettre à jour un poste (admin)
window.updateJob(1, { title: "Titre Modifié" });
```

## Base de Données Recommandée

### Structure MongoDB

```javascript
// Collection: jobs
{
    _id: ObjectId,
    title: String,
    category: String,
    location: String,
    type: String,
    experience: String,
    posted: Date,
    description: String,
    requirements: [String],
    status: String,  // active, closed
    createdAt: Date,
    updatedAt: Date
}

// Collection: applications
{
    _id: ObjectId,
    jobId: ObjectId,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    education: String,
    experience: String,
    cvPath: String,
    coverLetterPath: String,
    message: String,
    status: String,  // pending, reviewed, shortlisted, rejected, hired
    submittedAt: Date,
    reviewedAt: Date,
    reviewedBy: ObjectId
}
```

## Sécurité

### Points à implémenter:

1. **Authentification pour l'admin:**
   - JWT ou sessions pour les routes d'admin (POST, PUT, DELETE sur /jobs)

2. **Validation des données:**
   - Utiliser des bibliothèques comme `express-validator` ou `joi`

3. **Limitation de taux:**
   - Utiliser `express-rate-limit` pour éviter le spam

4. **Upload sécurisé:**
   - Vérifier les types de fichiers
   - Scanner les virus
   - Limiter la taille des fichiers

5. **CORS:**
   - Configurer correctement les origines autorisées

## Notifications Email

Exemple avec Nodemailer:

```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'votre-email@gmail.com',
        pass: 'votre-mot-de-passe'
    }
});

// Dans la route POST /api/applications
const mailOptions = {
    from: 'careers@winoil.sn',
    to: applicationData.email,
    subject: 'Confirmation de candidature - WinOil',
    html: `
        <h1>Merci pour votre candidature</h1>
        <p>Bonjour ${applicationData.firstName},</p>
        <p>Nous avons bien reçu votre candidature pour le poste de ${jobTitle}.</p>
        <p>Nous reviendrons vers vous dans les plus brefs délais.</p>
    `
};

transporter.sendMail(mailOptions);
```

## Testing

### Test des endpoints avec curl:

```bash
# GET jobs
curl http://localhost:3000/api/jobs

# GET jobs par catégorie
curl http://localhost:3000/api/jobs?category=operations

# POST application (avec fichiers)
curl -X POST http://localhost:3000/api/applications \
  -F "jobId=1" \
  -F "firstName=Mamadou" \
  -F "lastName=Diallo" \
  -F "email=mamadou@example.com" \
  -F "phone=+221771234567" \
  -F "education=licence" \
  -F "experience=3-5" \
  -F "cv=@/path/to/cv.pdf" \
  -F "consent=on"
```

## Support

Pour toute question concernant l'intégration backend, consultez:
- Documentation Express.js: https://expressjs.com/
- Documentation Multer: https://github.com/expressjs/multer
- Documentation MongoDB: https://www.mongodb.com/docs/

---

**Créé pour WinOil - 2025**
