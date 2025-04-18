import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { latLng, tileLayer, marker, icon, Layer } from 'leaflet';
import * as L from 'leaflet';
@Component({
  selector: 'app-produits-details',

  templateUrl: './produits-details.component.html',
  styleUrl: './produits-details.component.css',
})
export class ProduitsDetailsComponent {
  produit: any;
  mapOptions: any;
  layers: Layer[] = [];

  // Liste des produits (simulée, idéalement à récupérer via un service)
  produits = [
    {
      id: 1,
      nom: 'Mil',
      categorie: 'Céréales',
      prix: 25000,
      image:
        'https://www.seneplus.com/sites/default/files/styles/section_hero/public/raw_photos/culture_mil_0.jpg?itok=dkPfMc5b',
      description:
        'Mil de haute qualité, cultivé dans les régions fertiles de Dosso. Parfait pour une alimentation saine et durable.',
      vendeur: 'Amadou Traoré',
      localisation: { latitude: 13.315, longitude: 3.083 }, // Dosso, Niger
      quantite: 500,
      unite: 'kg',
      datePublication: '2025-04-10',
    },
    {
      id: 2,
      nom: 'Maïs',
      categorie: 'Céréales',
      prix: 20000,
      image: 'https://www.terre-de-culture.com/wp-content/uploads/mais.jpg',
      description:
        'Maïs jaune bio, récolté récemment à Ségou. Idéal pour les repas familiaux ou la transformation.',
      vendeur: 'Fatoumata Diallo',
      localisation: { latitude: 13.431, longitude: -6.259 }, // Ségou, Mali
      quantite: 300,
      unite: 'kg',
      datePublication: '2025-04-12',
    },
    {
      id: 3,
      nom: 'Haricot',
      categorie: 'Légumineuses',
      prix: 30000,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/1/1b/Haricots_verts01.jpg',
      description:
        'Haricots verts frais, cultivés à Thiès. Riches en protéines et parfaits pour une cuisine variée.',
      vendeur: 'Moussa Diop',
      localisation: { latitude: 14.791, longitude: -16.935 }, // Thiès, Sénégal
      quantite: 200,
      unite: 'kg',
      datePublication: '2025-04-11',
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.produit = this.produits.find((p) => p.id === id);

    if (this.produit) {
      // Configuration de la carte
      this.mapOptions = {
        layers: [
          tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            minZoom: 5,
            attribution: '© OpenStreetMap contributors',
          }),
        ],
        zoom: 10,
        center: latLng(
          this.produit.localisation.latitude,
          this.produit.localisation.longitude
        ),
      };

      // Ajouter un marqueur pour la localisation
      const markerIcon = icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl:
          'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        shadowSize: [41, 41],
      });

      const productMarker = marker(
        [
          this.produit.localisation.latitude,
          this.produit.localisation.longitude,
        ],
        { icon: markerIcon }
      ).bindPopup(
        `Produit: ${this.produit.nom}<br>Vendeur: ${this.produit.vendeur}`
      );

      this.layers = [productMarker];
    }
  }
}
