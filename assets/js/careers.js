/* ================================
   CAREERS PAGE JAVASCRIPT
   Backend Integration Ready
   ================================ */

// API Configuration - Update with your backend URL
const API_CONFIG = {
    baseURL: '/api', // Change to your backend URL (e.g., 'http://localhost:3000/api')
    endpoints: {
        jobs: '/jobs',
        apply: '/applications'
    }
};

// Sample job data - Will be replaced by API calls
let sampleJobs = [
    {
        id: 1,
        title: "Responsable de Station",
        category: "operations",
        location: "Rufisque",
        type: "CDI",
        experience: "3-5 ans",
        posted: "2025-01-15",
        description: "Nous recherchons un(e) Responsable de Station dynamique et expérimenté(e) pour gérer l'ensemble des opérations de notre station-service de Rufisque.",
        requirements: [
            "Expérience minimum de 3 ans en gestion de station-service",
            "Excellentes compétences en gestion d'équipe",
            "Connaissance des normes de sécurité HSE",
            "Bonne maîtrise des outils informatiques",
            "Leadership et sens des responsabilités"
        ]
    },
    {
        id: 2,
        title: "Pompiste",
        category: "operations",
        location: "Mbour",
        type: "CDD",
        experience: "0-1 an",
        posted: "2025-01-18",
        description: "Rejoignez notre équipe en tant que pompiste pour assurer un service client de qualité et le bon fonctionnement de nos pompes.",
        requirements: [
            "Sens du service client",
            "Ponctualité et fiabilité",
            "Capacité à travailler en équipe",
            "Bonne présentation",
            "Formation en interne assurée"
        ]
    },
    {
        id: 3,
        title: "Commercial B2B",
        category: "commercial",
        location: "Dakar",
        type: "CDI",
        experience: "2-4 ans",
        posted: "2025-01-10",
        description: "Développez notre portefeuille clients professionnels (pirogues, industries) et gérez les contrats de fourniture de carburant en gros volumes.",
        requirements: [
            "Expérience confirmée en vente B2B",
            "Excellent relationnel et capacité de négociation",
            "Connaissance du secteur énergétique (atout)",
            "Permis de conduire obligatoire",
            "Maîtrise du français et du wolof"
        ]
    },
    {
        id: 4,
        title: "Comptable",
        category: "administration",
        location: "Rufisque",
        type: "CDI",
        experience: "2-5 ans",
        posted: "2025-01-12",
        description: "Assurez la gestion comptable et financière de nos stations-service en conformité avec les normes en vigueur.",
        requirements: [
            "Diplôme en comptabilité (Licence minimum)",
            "Maîtrise des logiciels comptables",
            "Connaissance du SYSCOHADA",
            "Rigueur et sens de l'organisation",
            "Expérience dans le secteur de l'énergie appréciée"
        ]
    },
    {
        id: 5,
        title: "Technicien de Maintenance",
        category: "technique",
        location: "Saint-Louis",
        type: "CDI",
        experience: "3-7 ans",
        posted: "2025-01-08",
        description: "Assurez la maintenance préventive et corrective de nos équipements (pompes, cuves, systèmes électriques).",
        requirements: [
            "Formation technique (électromécanique, maintenance industrielle)",
            "Expérience en maintenance d'équipements pétroliers",
            "Connaissance des normes de sécurité",
            "Autonomie et capacité à diagnostiquer les pannes",
            "Disponibilité pour interventions d'urgence"
        ]
    }
];

// State Management
let currentFilter = 'all';
let jobsData = [];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }

    // Setup event listeners
    setupModal();
    setupApplicationForm();
    setupSpontaneousButton();
});

/* ================================
   JOB LOADING FUNCTIONS
   ================================ */

/**
 * Load jobs from API
 * When backend is ready, this will fetch from your Node.js API
 */
async function loadJobs() {
    const loadingState = document.getElementById('loadingState');
    const emptyState = document.getElementById('emptyState');
    const jobsContainer = document.getElementById('jobsContainer');

    try {
        // UNCOMMENT THIS WHEN BACKEND IS READY:
        // const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.jobs}`);
        // if (!response.ok) throw new Error('Failed to fetch jobs');
        // jobsData = await response.json();

        // For now, use sample data
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        jobsData = sampleJobs;

        // Hide loading state
        loadingState.style.display = 'none';

        if (jobsData.length === 0) {
            emptyState.style.display = 'block';
        } else {
            renderJobs(jobsData);
            updateJobCount();
        }
    } catch (error) {
        console.error('Error loading jobs:', error);
        loadingState.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <p>Erreur lors du chargement des offres. Veuillez réessayer plus tard.</p>
        `;
    }
}

/**
 * Render jobs to the page
 */
function renderJobs(jobs) {
    const jobsContainer = document.getElementById('jobsContainer');
    const loadingState = document.getElementById('loadingState');
    const emptyState = document.getElementById('emptyState');

    // Clear existing jobs (keep loading and empty states)
    const existingJobs = jobsContainer.querySelectorAll('.job-card');
    existingJobs.forEach(job => job.remove());

    if (jobs.length === 0) {
        loadingState.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    loadingState.style.display = 'none';
    emptyState.style.display = 'none';

    jobs.forEach((job, index) => {
        const jobCard = createJobCard(job, index);
        jobsContainer.appendChild(jobCard);
    });
}

/**
 * Create a job card element
 */
function createJobCard(job, index) {
    const card = document.createElement('div');
    card.className = 'job-card';
    card.setAttribute('data-id', job.id);
    card.setAttribute('data-category', job.category);
    card.style.animationDelay = `${index * 0.1}s`;

    const categoryIcon = getCategoryIcon(job.category);
    const formattedDate = formatDate(job.posted);

    card.innerHTML = `
        <div class="job-info">
            <div class="job-header">
                <div class="job-icon">
                    <i class="${categoryIcon}"></i>
                </div>
                <div class="job-title-group">
                    <h3 class="job-title">${job.title}</h3>
                    <div class="job-meta">
                        <span class="meta-item">
                            <i class="fas fa-map-marker-alt"></i>
                            ${job.location}
                        </span>
                        <span class="meta-item">
                            <i class="fas fa-briefcase"></i>
                            ${job.type}
                        </span>
                        <span class="meta-item">
                            <i class="fas fa-clock"></i>
                            ${job.experience}
                        </span>
                    </div>
                </div>
            </div>

            <div class="job-tags">
                <span class="job-tag category">${getCategoryLabel(job.category)}</span>
                <span class="job-tag">${job.type}</span>
            </div>

            <p class="job-description">${job.description}</p>

            <div class="job-requirements">
                <h4>Profil recherché :</h4>
                <ul>
                    ${job.requirements.map(req => `<li>${req}</li>`).join('')}
                </ul>
            </div>
        </div>

        <div class="job-actions">
            <span class="job-date">Publié le ${formattedDate}</span>
            <button class="apply-btn" onclick="openApplicationModal(${job.id})">
                <i class="fas fa-paper-plane"></i>
                Postuler
            </button>
        </div>
    `;

    return card;
}

/**
 * Update job count in hero section
 */
function updateJobCount() {
    const countElement = document.getElementById('openPositionsCount');
    if (countElement) {
        animateNumber(countElement, 0, jobsData.length, 1000);
    }
}

/**
 * Animate number counter
 */
function animateNumber(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

/* ================================
   FILTER FUNCTIONS
   ================================ */

/**
 * Setup filter button event listeners
 */
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter jobs
            filterJobs(filter);
        });
    });
}

/**
 * Filter jobs by category
 */
function filterJobs(category) {
    currentFilter = category;
    const jobCards = document.querySelectorAll('.job-card');

    jobCards.forEach(card => {
        const jobCategory = card.getAttribute('data-category');

        if (category === 'all' || jobCategory === category) {
            card.classList.remove('hidden');
            card.style.display = 'flex';
        } else {
            card.classList.add('hidden');
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });

    // Scroll to jobs section
    const jobsSection = document.querySelector('.jobs-listing-section');
    if (jobsSection) {
        jobsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/* ================================
   MODAL FUNCTIONS
   ================================ */

/**
 * Setup spontaneous application button
 */
function setupSpontaneousButton() {
    const showFormBtn = document.getElementById('showApplicationForm');
    if (showFormBtn) {
        showFormBtn.addEventListener('click', function() {
            openApplicationModal(null);
        });
    }
}

/**
 * Setup modal event listeners
 */
function setupModal() {
    const modal = document.getElementById('applicationModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');
    const cancelBtn = document.getElementById('cancelBtn');

    // Close modal events
    [modalClose, modalOverlay, cancelBtn].forEach(element => {
        if (element) {
            element.addEventListener('click', closeApplicationModal);
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeApplicationModal();
        }
    });

    // Prevent modal close when clicking inside modal content
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}

/**
 * Open application modal for spontaneous application
 * This function is called globally from HTML
 */
window.openApplicationModal = function(jobId) {
    const modal = document.getElementById('applicationModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalJobTitle = document.getElementById('modalJobTitle');
    const jobIdInput = document.getElementById('jobId');
    const applicationForm = document.getElementById('applicationForm');

    // Always show spontaneous application form
    modalTitle.textContent = 'Candidature Spontanée';
    modalJobTitle.textContent = 'Envoyez-nous votre CV et nous vous contacterons';
    jobIdInput.value = '';

    // Reset form
    applicationForm.reset();
    document.getElementById('cvFileName').textContent = 'Aucun fichier sélectionné';
    document.getElementById('coverLetterFileName').textContent = 'Aucun fichier sélectionné';
    document.getElementById('formMessage').style.display = 'none';

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

/**
 * Close application modal
 */
function closeApplicationModal() {
    const modal = document.getElementById('applicationModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

/* ================================
   APPLICATION FORM FUNCTIONS
   ================================ */

/**
 * Setup application form event listeners
 */
function setupApplicationForm() {
    const form = document.getElementById('applicationForm');
    const cvInput = document.getElementById('cv');
    const coverLetterInput = document.getElementById('coverLetter');

    // File input listeners
    if (cvInput) {
        cvInput.addEventListener('change', function() {
            updateFileName(this, 'cvFileName');
        });
    }

    if (coverLetterInput) {
        coverLetterInput.addEventListener('change', function() {
            updateFileName(this, 'coverLetterFileName');
        });
    }

    // Form submission
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

/**
 * Update file name display
 */
function updateFileName(input, displayId) {
    const display = document.getElementById(displayId);
    if (input.files && input.files[0]) {
        display.textContent = input.files[0].name;
    } else {
        display.textContent = 'Aucun fichier sélectionné';
    }
}

/**
 * Handle form submission
 * This will send data to your Node.js backend
 */
async function handleFormSubmit(e) {
    e.preventDefault();

    const formMessage = document.getElementById('formMessage');
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;

    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    formMessage.style.display = 'none';

    try {
        // Prepare form data
        const formData = new FormData(e.target);

        // UNCOMMENT THIS WHEN BACKEND IS READY:
        /*
        const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.apply}`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Erreur lors de l\'envoi de la candidature');
        }

        const result = await response.json();
        */

        // Simulate API call for now
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Show success message
        formMessage.className = 'form-message success';
        formMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            Votre candidature a été envoyée avec succès ! Nous vous contacterons bientôt.
        `;
        formMessage.style.display = 'block';

        // Reset form
        e.target.reset();
        document.getElementById('cvFileName').textContent = 'Aucun fichier sélectionné';
        document.getElementById('coverLetterFileName').textContent = 'Aucun fichier sélectionné';

        // Close modal after 3 seconds
        setTimeout(() => {
            closeApplicationModal();
        }, 3000);

    } catch (error) {
        console.error('Error submitting application:', error);

        // Show error message
        formMessage.className = 'form-message error';
        formMessage.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            Une erreur s'est produite. Veuillez réessayer.
        `;
        formMessage.style.display = 'block';
    } finally {
        // Restore button state
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }
}

/* ================================
   HELPER FUNCTIONS
   ================================ */

/**
 * Get icon for job category
 */
function getCategoryIcon(category) {
    const icons = {
        operations: 'fas fa-cogs',
        commercial: 'fas fa-handshake',
        administration: 'fas fa-user-tie',
        technique: 'fas fa-wrench'
    };
    return icons[category] || 'fas fa-briefcase';
}

/**
 * Get label for job category
 */
function getCategoryLabel(category) {
    const labels = {
        operations: 'Opérations',
        commercial: 'Commercial',
        administration: 'Administration',
        technique: 'Technique'
    };
    return labels[category] || 'Autre';
}

/**
 * Format date to French format
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}

/* ================================
   PUBLIC API FOR BACKEND INTEGRATION
   ================================ */

/**
 * Refresh jobs list
 * Call this function to reload jobs from the API
 */
window.refreshJobs = function() {
    const jobsContainer = document.getElementById('jobsContainer');
    const loadingState = document.getElementById('loadingState');

    loadingState.style.display = 'block';
    const existingJobs = jobsContainer.querySelectorAll('.job-card');
    existingJobs.forEach(job => job.remove());

    loadJobs();
};

/**
 * Add a new job dynamically
 * Useful for admin panels
 */
window.addJob = function(jobData) {
    jobsData.push(jobData);
    renderJobs(jobsData);
    updateJobCount();
};

/**
 * Remove a job by ID
 * Useful for admin panels
 */
window.removeJob = function(jobId) {
    jobsData = jobsData.filter(job => job.id !== jobId);
    const jobCard = document.querySelector(`[data-id="${jobId}"]`);
    if (jobCard) {
        jobCard.remove();
    }
    updateJobCount();
};

/**
 * Update a job by ID
 * Useful for admin panels
 */
window.updateJob = function(jobId, updatedData) {
    const index = jobsData.findIndex(job => job.id === jobId);
    if (index !== -1) {
        jobsData[index] = { ...jobsData[index], ...updatedData };
        renderJobs(jobsData);
    }
};

// Export for ES6 modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadJobs,
        addJob,
        removeJob,
        updateJob,
        refreshJobs
    };
}
