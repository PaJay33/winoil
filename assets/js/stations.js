/**
 * Stations Map - JavaScript pour la carte interactive des stations WinOil
 */

// Initialisation de la carte
let map;
let markers = [];

// Coordonnées du centre (Dakar, Sénégal)
const centerCoords = [14.7167, -17.4677];

// Initialiser la carte Leaflet
function initMap() {
    // Créer la carte centrée sur Dakar
    map = L.map('map').setView(centerCoords, 10);

    // Ajouter les tuiles de carte OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
    }).addTo(map);

    // Ajouter les marqueurs pour chaque station
    addStationMarkers();
}

// Ajouter les marqueurs des stations
function addStationMarkers() {
    const stationCards = document.querySelectorAll('.station-card');

    stationCards.forEach(card => {
        const lat = parseFloat(card.dataset.lat);
        const lng = parseFloat(card.dataset.lng);
        const name = card.querySelector('.station-name').textContent;
        const address = card.querySelector('.info-row span').textContent;

        if (lat && lng) {
            // Icône personnalisée violet/rose
            const customIcon = L.divIcon({
                className: 'custom-marker',
                html: `<div style="
                    background: linear-gradient(135deg, #B565D8 0%, #E94B7A 100%);
                    width: 30px;
                    height: 30px;
                    border-radius: 50% 50% 50% 0;
                    transform: rotate(-45deg);
                    border: 3px solid white;
                    box-shadow: 0 3px 10px rgba(181, 101, 216, 0.5);
                ">
                    <i class="fas fa-gas-pump" style="
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%) rotate(45deg);
                        color: white;
                        font-size: 14px;
                    "></i>
                </div>`,
                iconSize: [30, 30],
                iconAnchor: [15, 30],
                popupAnchor: [0, -30]
            });

            // Créer le marqueur
            const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

            // Popup pour le marqueur
            marker.bindPopup(`
                <div style="font-family: 'Poppins', sans-serif; min-width: 200px;">
                    <h3 style="margin: 0 0 10px 0; color: #B565D8; font-size: 16px; font-weight: 700;">${name}</h3>
                    <p style="margin: 0 0 10px 0; color: #666; font-size: 13px;">
                        <i class="fas fa-map-marker-alt" style="color: #B565D8; margin-right: 5px;"></i>
                        ${address}
                    </p>
                    <a href="https://maps.google.com/?q=${lat},${lng}" target="_blank"
                       style="display: inline-block; padding: 8px 16px; background: linear-gradient(135deg, #B565D8 0%, #E94B7A 100%);
                              color: white; text-decoration: none; border-radius: 6px; font-size: 12px; font-weight: 600;">
                        <i class="fas fa-directions"></i> Itinéraire
                    </a>
                </div>
            `);

            // Ajouter événement click sur la carte de station pour centrer la carte
            card.addEventListener('click', () => {
                map.setView([lat, lng], 15);
                marker.openPopup();
            });

            markers.push(marker);
        }
    });
}

// Filtrage des stations
function setupFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const stationCards = document.querySelectorAll('.station-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Retirer la classe active de tous les onglets
            filterTabs.forEach(t => t.classList.remove('active'));
            // Ajouter la classe active à l'onglet cliqué
            tab.classList.add('active');

            const filterValue = tab.dataset.filter;

            // Filtrer les stations
            stationCards.forEach(card => {
                if (filterValue === 'all' || card.dataset.city === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });

            // Ajuster la vue de la carte
            if (filterValue !== 'all') {
                const visibleMarkers = [];
                markers.forEach((marker, index) => {
                    const card = stationCards[index];
                    if (card.dataset.city === filterValue) {
                        visibleMarkers.push(marker);
                    }
                });

                if (visibleMarkers.length > 0) {
                    const group = new L.featureGroup(visibleMarkers);
                    map.fitBounds(group.getBounds().pad(0.2));
                }
            } else {
                map.setView(centerCoords, 10);
            }
        });
    });
}

// Recherche de stations
function setupSearch() {
    const searchInput = document.getElementById('searchStation');
    const stationCards = document.querySelectorAll('.station-card');
    const noResults = document.getElementById('noResults');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            let hasResults = false;

            stationCards.forEach(card => {
                const name = card.querySelector('.station-name').textContent.toLowerCase();
                const city = card.querySelector('.station-city').textContent.toLowerCase();
                const address = card.querySelector('.info-row span').textContent.toLowerCase();

                if (name.includes(searchTerm) || city.includes(searchTerm) || address.includes(searchTerm)) {
                    card.style.display = 'block';
                    hasResults = true;
                } else {
                    card.style.display = 'none';
                }
            });

            // Afficher/masquer le message "Aucun résultat"
            if (noResults) {
                noResults.style.display = hasResults ? 'none' : 'flex';
            }
        });
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser la carte
    initMap();

    // Configurer les filtres
    setupFilters();

    // Configurer la recherche
    setupSearch();
});
