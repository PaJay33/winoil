/**
 * Index Page Map - Carte interactive des stations WinOil
 */

// Coordonnées du centre (Dakar, Sénégal)
const centerCoords = [14.7167, -17.4677];

// Données des stations WinOil
const stations = [
    {
        name: 'WinOil Rufisque',
        lat: 14.7167,
        lng: -17.2833,
        address: 'Route de Rufisque, Dakar'
    },
    {
        name: 'WinOil Plateau',
        lat: 14.6928,
        lng: -17.4467,
        address: 'Avenue Léopold Sédar Senghor, Plateau'
    },
    {
        name: 'WinOil Liberté 6',
        lat: 14.7208,
        lng: -17.4694,
        address: 'Extension Liberté 6, Dakar'
    }
];

// Initialiser la carte au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    initContactMap();
});

// Initialiser la carte
function initContactMap() {
    // Créer la carte centrée sur Dakar
    const map = L.map('contactMap').setView(centerCoords, 11);

    // Ajouter les tuiles de carte OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
    }).addTo(map);

    // Ajouter les marqueurs pour chaque station
    stations.forEach(station => {
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
        const marker = L.marker([station.lat, station.lng], { icon: customIcon }).addTo(map);

        // Popup pour le marqueur
        marker.bindPopup(`
            <div style="font-family: 'Poppins', sans-serif; min-width: 200px;">
                <h3 style="margin: 0 0 10px 0; color: #B565D8; font-size: 16px; font-weight: 700;">${station.name}</h3>
                <p style="margin: 0 0 10px 0; color: #666; font-size: 13px;">
                    <i class="fas fa-map-marker-alt" style="color: #B565D8; margin-right: 5px;"></i>
                    ${station.address}
                </p>
                <a href="https://maps.google.com/?q=${station.lat},${station.lng}" target="_blank"
                   style="display: inline-block; padding: 8px 16px; background: linear-gradient(135deg, #B565D8 0%, #E94B7A 100%);
                          color: white; text-decoration: none; border-radius: 6px; font-size: 12px; font-weight: 600;">
                    <i class="fas fa-directions"></i> Itinéraire
                </a>
            </div>
        `);
    });
}
