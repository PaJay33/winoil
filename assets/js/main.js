/**
 * WinOil - Main JavaScript
 * Animations, interactions et fonctionnalités du site
 */

// ========================================
// 1. INITIALISATION AOS (Animation On Scroll)
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialiser AOS avec configuration personnalisée
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
        delay: 100
    });
});

// ========================================
// 2. NAVIGATION
// ========================================

const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Effet scroll sur la navbar
let lastScroll = 0;
window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    // Ajouter classe 'scrolled' pour effet background
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Menu mobile toggle
if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');

        // Animation du bouton hamburger
        const spans = this.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Navigation active state et smooth scroll
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Ne pas empêcher le comportement par défaut si c'est un lien vers une autre page
        if (!href.startsWith('#')) {
            // C'est un lien vers une autre page, laisser le navigateur gérer
            return;
        }

        // C'est une ancre interne, faire le smooth scroll
        e.preventDefault();

        // Retirer classe active de tous les liens
        navLinks.forEach(l => l.classList.remove('active'));

        // Ajouter classe active au lien cliqué
        this.classList.add('active');

        // Fermer le menu mobile
        navMenu.classList.remove('active');
        if (mobileToggle) {
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }

        // Smooth scroll vers la section
        const targetSection = document.querySelector(href);

        if (targetSection) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Mettre à jour le lien actif au scroll
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= (sectionTop - navbar.offsetHeight - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// 3. SCROLL TO TOP BUTTON
// ========================================

const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// 4. FORMULAIRE DE CONTACT
// ========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Animation du bouton
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;

        // Récupérer les données du formulaire
        const formData = new FormData(this);
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Simuler l'envoi (à remplacer par un vrai envoi)
        setTimeout(() => {
            // Succès
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
            submitBtn.style.background = 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)';

            // Réinitialiser le formulaire
            contactForm.reset();

            // Afficher un message de succès
            showNotification('Merci ! Votre message a été envoyé avec succès.', 'success');

            // Réinitialiser le bouton après 3 secondes
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 2000);

        // Dans un vrai projet, utilisez fetch ou axios pour envoyer à un backend:
        /*
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            // Gérer la réponse
        })
        .catch(error => {
            // Gérer l'erreur
            showNotification('Une erreur est survenue. Veuillez réessayer.', 'error');
        });
        */
    });
}

// ========================================
// 5. SYSTÈME DE NOTIFICATIONS
// ========================================

function showNotification(message, type = 'info') {
    // Créer l'élément notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;

    // Icône selon le type
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';
    if (type === 'warning') icon = 'fa-exclamation-triangle';

    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Styles inline
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        background: ${type === 'success' ? '#22C55E' : type === 'error' ? '#EF4444' : '#B565D8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;

    // Ajouter au DOM
    document.body.appendChild(notification);

    // Bouton fermer
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: transparent;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 1rem;
    `;

    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto-fermeture après 5 secondes
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Ajouter les animations CSS pour les notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// ========================================
// 6. PARALLAX EFFECTS (HERO SHAPES)
// ========================================

const shapes = document.querySelectorAll('.shape');

window.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const x = mouseX * 50 * speed;
        const y = mouseY * 50 * speed;

        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ========================================
// 7. COMPTEURS ANIMÉS (STATS)
// ========================================

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = counter.textContent;

        // Si le target contient des nombres
        const hasNumber = /\d/.test(target);

        if (hasNumber && !counter.classList.contains('animated')) {
            counter.classList.add('animated');

            // Extraire le nombre
            const numberMatch = target.match(/\d+/);
            if (numberMatch) {
                const num = parseInt(numberMatch[0]);
                const duration = 2000;
                const step = num / (duration / 16);
                let current = 0;

                const timer = setInterval(() => {
                    current += step;
                    if (current >= num) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = target.replace(/\d+/, Math.floor(current));
                    }
                }, 16);
            }
        }
    });
}

// Observer pour déclencher l'animation au scroll
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ========================================
// 8. LAZY LOADING DES IMAGES
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ========================================
// 9. ANIMATION DES CARTES AU SCROLL
// ========================================

const cards = document.querySelectorAll('.feature-card, .service-card, .value-card');

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    cardObserver.observe(card);
});

// ========================================
// 10. VALIDATION DU FORMULAIRE EN TEMPS RÉEL
// ========================================

const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        validateInput(this);
    });

    input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateInput(this);
        }
    });
});

function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Vérifier si requis
    if (input.hasAttribute('required') && value === '') {
        isValid = false;
        errorMessage = 'Ce champ est requis';
    }

    // Vérifier l'email
    if (input.type === 'email' && value !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Email invalide';
        }
    }

    // Vérifier le téléphone
    if (input.type === 'tel' && value !== '') {
        const phoneRegex = /^[\d\s\+\-\(\)]+$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Numéro de téléphone invalide';
        }
    }

    // Appliquer les styles
    if (!isValid) {
        input.style.borderColor = '#EF4444';

        // Ajouter message d'erreur si pas déjà présent
        let errorElement = input.parentElement.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            errorElement.style.cssText = 'color: #EF4444; font-size: 0.85rem; margin-top: 0.25rem; display: block;';
            input.parentElement.appendChild(errorElement);
        }
        errorElement.textContent = errorMessage;
        input.classList.add('error');
    } else {
        input.style.borderColor = 'var(--border-color)';
        const errorElement = input.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        input.classList.remove('error');
    }
}

// ========================================
// 11. EFFET TYPING POUR LE HERO
// ========================================

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Optionnel: décommenter pour activer l'effet typing
/*
const heroTitle = document.querySelector('.hero-title .gradient-text');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    window.addEventListener('load', () => {
        typeWriter(heroTitle, originalText, 80);
    });
}
*/

// ========================================
// 12. PERFORMANCE & OPTIMISATIONS
// ========================================

// Debounce function pour optimiser les events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Optimiser le scroll event
window.addEventListener('scroll', debounce(function() {
    // Les fonctions scroll optimisées sont déjà appelées
}, 20));

// ========================================
// 13. PRÉCHARGEMENT DES RESSOURCES CRITIQUES
// ========================================

window.addEventListener('load', function() {
    // Précharger les images importantes
    const criticalImages = [
        'assets/images/logo.png'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Log de chargement complet
    console.log('%c🎉 WinOil Website Loaded Successfully!', 'color: #B565D8; font-size: 16px; font-weight: bold;');
    console.log('%c🚀 Powered by modern web technologies', 'color: #E94B7A; font-size: 12px;');

    // Animation des compteurs de la pompe à essence
    animatePumpCounters();
});

// ========================================
// ANIMATION POMPE À ESSENCE (HERO)
// ========================================

function animatePumpCounters() {
    const priceElement = document.getElementById('priceTicker');
    const litersElement = document.getElementById('litersTicker');

    if (!priceElement || !litersElement) return;

    let price = 0;
    let liters = 0;
    const targetPrice = 8500;
    const targetLiters = 25.5;
    const duration = 3000; // 3 secondes

    const priceStep = targetPrice / (duration / 50);
    const litersStep = targetLiters / (duration / 50);

    const interval = setInterval(() => {
        price += priceStep;
        liters += litersStep;

        if (price >= targetPrice) {
            price = targetPrice;
            liters = targetLiters;
            clearInterval(interval);

            // Redémarrer après 2 secondes
            setTimeout(() => {
                price = 0;
                liters = 0;
                priceElement.textContent = '0.00';
                litersElement.textContent = '0.0';
                setTimeout(animatePumpCounters, 500);
            }, 2000);
        }

        priceElement.textContent = Math.floor(price).toLocaleString('fr-FR');
        litersElement.textContent = liters.toFixed(1);
    }, 50);
}

// ========================================
// STATS POMPES EN TEMPS RÉEL
// ========================================

// Données simulées pour chaque pompe
const pumpData = {
    1: { clients: 0, liters: 0, targetClients: 47, targetLiters: 1250 },
    2: { clients: 0, liters: 0, targetClients: 32, targetLiters: 890 },
    3: { clients: 0, liters: 0, targetClients: 61, targetLiters: 1680 }
};

// Observer pour démarrer l'animation quand la section est visible
const pumpStatsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('stats-animated')) {
            entry.target.classList.add('stats-animated');
            animatePumpStats();
        }
    });
}, { threshold: 0.3 });

// Observer la section des pompes
const pumpSection = document.querySelector('.fuel-pumps-section');
if (pumpSection) {
    pumpStatsObserver.observe(pumpSection);
}

function animatePumpStats() {
    const duration = 2500;
    const interval = 30;
    const steps = duration / interval;

    // Animer chaque pompe
    Object.keys(pumpData).forEach(pumpId => {
        const data = pumpData[pumpId];
        const clientsElement = document.querySelector(`[data-pump-clients="${pumpId}"]`);
        const litersElement = document.querySelector(`[data-pump-liters="${pumpId}"]`);
        const progressElement = document.querySelector(`[data-pump-progress="${pumpId}"]`);

        if (!clientsElement || !litersElement || !progressElement) return;

        const clientsStep = data.targetClients / steps;
        const litersStep = data.targetLiters / steps;
        const progressTarget = (data.targetLiters / 2000) * 100; // Capacité max 2000L
        const progressStep = progressTarget / steps;

        let currentClients = 0;
        let currentLiters = 0;
        let currentProgress = 0;

        const timer = setInterval(() => {
            currentClients += clientsStep;
            currentLiters += litersStep;
            currentProgress += progressStep;

            if (currentClients >= data.targetClients) {
                currentClients = data.targetClients;
                currentLiters = data.targetLiters;
                currentProgress = progressTarget;
                clearInterval(timer);
            }

            clientsElement.textContent = Math.floor(currentClients);
            litersElement.textContent = Math.floor(currentLiters).toLocaleString('fr-FR');
            progressElement.style.width = `${currentProgress}%`;
        }, interval);
    });

    // Animer les stats globales
    animateGlobalStats();
}

function animateGlobalStats() {
    const totalClients = Object.values(pumpData).reduce((sum, data) => sum + data.targetClients, 0);
    const totalLiters = Object.values(pumpData).reduce((sum, data) => sum + data.targetLiters, 0);

    const clientsElement = document.getElementById('totalClientsToday');
    const litersElement = document.getElementById('totalLitersToday');
    const avgTimeElement = document.getElementById('avgServiceTime');

    if (!clientsElement || !litersElement || !avgTimeElement) return;

    const duration = 2500;
    const interval = 30;
    const steps = duration / interval;

    const clientsStep = totalClients / steps;
    const litersStep = totalLiters / steps;

    let currentClients = 0;
    let currentLiters = 0;

    const timer = setInterval(() => {
        currentClients += clientsStep;
        currentLiters += litersStep;

        if (currentClients >= totalClients) {
            currentClients = totalClients;
            currentLiters = totalLiters;
            clearInterval(timer);
        }

        clientsElement.textContent = Math.floor(currentClients);
        litersElement.textContent = Math.floor(currentLiters).toLocaleString('fr-FR') + 'L';
    }, interval);

    // Animer le temps moyen (petite variation)
    let avgTime = 0;
    const avgTimer = setInterval(() => {
        avgTime += 0.05;
        if (avgTime >= 2.5) {
            avgTime = 2.5;
            clearInterval(avgTimer);
        }
        avgTimeElement.textContent = avgTime.toFixed(1);
    }, interval);
}

// Mise à jour périodique toutes les 5 secondes (simulation)
setInterval(() => {
    const pumpsSection = document.querySelector('.fuel-pumps-section');
    if (pumpsSection && pumpsSection.classList.contains('stats-animated')) {
        // Incrémenter légèrement les valeurs
        Object.keys(pumpData).forEach(pumpId => {
            const data = pumpData[pumpId];
            const randomClients = Math.floor(Math.random() * 2);
            const randomLiters = Math.floor(Math.random() * 30) + 10;

            data.targetClients += randomClients;
            data.targetLiters += randomLiters;

            const clientsElement = document.querySelector(`[data-pump-clients="${pumpId}"]`);
            const litersElement = document.querySelector(`[data-pump-liters="${pumpId}"]`);
            const progressElement = document.querySelector(`[data-pump-progress="${pumpId}"]`);

            if (clientsElement && litersElement && progressElement) {
                clientsElement.textContent = data.targetClients;
                litersElement.textContent = data.targetLiters.toLocaleString('fr-FR');

                const progressTarget = (data.targetLiters / 2000) * 100;
                progressElement.style.width = `${Math.min(progressTarget, 100)}%`;
            }
        });

        // Mettre à jour les stats globales
        const totalClients = Object.values(pumpData).reduce((sum, data) => sum + data.targetClients, 0);
        const totalLiters = Object.values(pumpData).reduce((sum, data) => sum + data.targetLiters, 0);

        const clientsElement = document.getElementById('totalClientsToday');
        const litersElement = document.getElementById('totalLitersToday');

        if (clientsElement && litersElement) {
            clientsElement.textContent = totalClients;
            litersElement.textContent = totalLiters.toLocaleString('fr-FR') + 'L';
        }
    }
}, 5000);

// ========================================
// 14. EASTER EGG (BONUS)
// ========================================

let clickCount = 0;
const logo = document.querySelector('.logo img');

if (logo) {
    logo.addEventListener('click', function() {
        clickCount++;

        if (clickCount === 5) {
            showNotification('🎉 Vous avez découvert le easter egg WinOil ! Merci de votre curiosité !', 'success');

            // Effet spécial
            document.body.style.animation = 'rainbow 2s ease';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 2000);

            clickCount = 0;
        }
    });
}

// Animation rainbow
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// ========================================
// 15. ACCESSIBILITÉ
// ========================================

// Gestion du focus pour l'accessibilité
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

// Ajouter les styles pour le focus
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .keyboard-nav *:focus {
        outline: 3px solid #B565D8;
        outline-offset: 2px;
    }
`;
document.head.appendChild(focusStyle);

// ========================================
// FIN DU SCRIPT
// ========================================

console.log('%cWinOil JavaScript Initialized ✓', 'color: #B565D8; font-weight: bold;');
