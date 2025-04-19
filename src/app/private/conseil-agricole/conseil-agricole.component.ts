import { Component } from '@angular/core';
import * as L from 'leaflet';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-conseil-agricole',

  templateUrl: './conseil-agricole.component.html',
  styleUrl: './conseil-agricole.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class ConseilAgricoleComponent {
  products: any[] = [
    {
      name: 'Oignons',
      adviceByLocality: [
        {
          locality: {
            name: 'Niamey',
            region: 'Niamey',
            latitude: 13.5137,
            longitude: 2.1098,
          },
          weather: {
            temperature: '30-35°C',
            rainfall: 'Faible (saison sèche)',
            humidity: '20-30%',
          },
          cultivation: {
            soil: 'Sols sableux ou limoneux, bien drainés',
            plantingPeriod: 'Octobre-Décembre (saison fraîche)',
            tips: 'Semer à 1-2 cm de profondeur, espacement de 10 cm entre plants.',
          },
          production: {
            irrigation: 'Arrosage régulier, 2-3 fois/semaine.',
            fertilizers:
              'Engrais NPK (15-15-15) à la plantation, puis urée après 1 mois.',
            tools: 'Houe, arrosoir, pulvérisateur.',
          },
          conservation: {
            methods:
              'Stockage dans un endroit sec et ventilé, sur claies ou en filets.',
            duration: '3-6 mois si bien séché.',
          },
          storage: {
            facilities: 'Silos ventilés ou sacs hermétiques.',
            tips: 'Éviter l’humidité pour prévenir la pourriture.',
          },
          markets: [
            {
              name: 'Marché de Niamey',
              id: '1',
              estimatedPrice: '300-400 FCFA/kg',
              demand: 'Forte en saison sèche.',
            },
          ],
          diseases: [
            {
              name: 'Pourriture des bulbes',
              symptoms: 'Bulbes mous, odeur fétide.',
              treatment:
                'Utiliser fongicide (ex. Mancozèbe), éviter excès d’eau.',
            },
            {
              name: 'Mildiou',
              symptoms: 'Taches blanches ou grisâtres sur feuilles.',
              treatment:
                'Pulvériser fongicide à base de cuivre, espacer les plants.',
            },
          ],
        },
        {
          locality: {
            name: 'Zinder',
            region: 'Zinder',
            latitude: 13.8053,
            longitude: 8.9884,
          },
          weather: {
            temperature: '32-38°C',
            rainfall: 'Modérée (saison des pluies)',
            humidity: '30-40%',
          },
          cultivation: {
            soil: 'Sols argilo-sableux.',
            plantingPeriod: 'Novembre-Janvier.',
            tips: 'Préparer le sol avec du fumier organique.',
          },
          production: {
            irrigation: 'Arrosage modéré, éviter engorgement.',
            fertilizers: 'Engrais organique + NPK.',
            tools: 'Semoir manuel, machette.',
          },
          conservation: {
            methods: 'Sécher les bulbes au soleil 7-10 jours avant stockage.',
            duration: '4-5 mois.',
          },
          storage: {
            facilities: 'Entrepôt ventilé, sacs en jute.',
            tips: 'Surveiller les insectes (ex. charançons).',
          },
          markets: [
            {
              name: 'Marché de Zinder',
              id: '2',
              estimatedPrice: '250-350 FCFA/kg',
              demand: 'Stable toute l’année.',
            },
          ],
          diseases: [
            {
              name: 'Thrips',
              symptoms: 'Feuilles décolorées, rayures argentées.',
              treatment: 'Insecticide (ex. Imidaclopride), pièges collants.',
            },
          ],
        },
      ],
    },
    {
      name: 'Sorgho',
      adviceByLocality: [
        {
          locality: {
            name: 'Niamey',
            region: 'Niamey',
            latitude: 13.5137,
            longitude: 2.1098,
          },
          weather: {
            temperature: '30-35°C',
            rainfall: 'Faible à modérée.',
            humidity: '20-30%',
          },
          cultivation: {
            soil: 'Sols légers, tolère sols pauvres.',
            plantingPeriod: 'Juin-Juillet (début saison des pluies).',
            tips: 'Semer à 2-3 cm de profondeur, 20 cm entre plants.',
          },
          production: {
            irrigation: 'Peu nécessaire, sauf en saison sèche.',
            fertilizers: 'Fumier + engrais azoté après levée.',
            tools: 'Semoir, binette.',
          },
          conservation: {
            methods: 'Battre et sécher les grains à <14% d’humidité.',
            duration: '1-2 ans.',
          },
          storage: {
            facilities: 'Silos métalliques ou sacs PICS.',
            tips: 'Utiliser insecticides naturels (ex. neem).',
          },
          markets: [
            {
              name: 'Marché de Niamey',
              id: '1',
              estimatedPrice: '150-200 FCFA/kg',
              demand: 'Forte pour sorgho blanc.',
            },
          ],
          diseases: [
            {
              name: 'Anthracnose',
              symptoms: 'Taches noires sur tiges et feuilles.',
              treatment: 'Fongicides, variétés résistantes.',
            },
          ],
        },
      ],
    },
  ];

  selectedProduct: any = null;
  selectedLocality: any = null;
  selectedAdvice: any = null;

  mapOptions: L.MapOptions = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }),
    ],
    zoom: 12,
    center: L.latLng(13.5137, 2.1098), // Niamey par défaut
  };
  markerLayers: L.Layer[] = [];

  constructor() {}

  ngOnInit(): void {
    // Sélectionner le premier produit par défaut
    this.selectedProduct = this.products[0];
    this.updateLocalities();
  }

  updateLocalities(): void {
    if (this.selectedProduct) {
      this.selectedLocality =
        this.selectedProduct.adviceByLocality[0]?.locality || null;
      this.updateAdvice();
    }
  }

  updateAdvice(): void {
    if (this.selectedProduct && this.selectedLocality) {
      this.selectedAdvice = this.selectedProduct.adviceByLocality.find(
        (advice: any) => advice.locality.name === this.selectedLocality.name
      );
      if (this.selectedAdvice) {
        this.mapOptions = {
          ...this.mapOptions,
          center: L.latLng(
            this.selectedAdvice.locality.latitude,
            this.selectedAdvice.locality.longitude
          ),
        };
        this.markerLayers = [
          L.marker(
            [
              this.selectedAdvice.locality.latitude,
              this.selectedAdvice.locality.longitude,
            ],
            {
              icon: L.icon({
                iconUrl:
                  'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              }),
            }
          ).bindPopup(
            `${this.selectedProduct.name} à ${this.selectedLocality.name}`
          ),
        ];
      } else {
        this.markerLayers = [];
      }
    }
  }
}
