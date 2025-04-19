import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import * as L from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-marche',

  templateUrl: './marche.component.html',
  styleUrl: './marche.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class MarcheComponent {
  markets: any[] = [
    {
      id: '1',
      name: 'Marché de Niamey',
      locality: {
        name: 'Localité 1',
        parent: {
          name: 'Commune 1',
          parent: {
            name: 'Département 1',
            parent: { name: 'Niamey' },
          },
        },
      },
      latitude: 13.5137,
      longitude: 2.1098,
    },
    {
      id: '2',
      name: 'Marché de Zinder',
      locality: {
        name: 'Localité Z1',
        parent: {
          name: 'Commune Z1',
          parent: {
            name: 'Département Z1',
            parent: { name: 'Zinder' },
          },
        },
      },
      latitude: 13.8053,
      longitude: 8.9884,
    },
  ];

  regions: any[] = [
    {
      name: 'Niamey',
      departments: [
        {
          name: 'Département 1',
          communes: [
            {
              name: 'Commune 1',
              localities: [{ name: 'Localité 1' }, { name: 'Localité 2' }],
            },
            { name: 'Commune 2', localities: [] },
          ],
        },
        { name: 'Département 2', communes: [] },
      ],
    },
    {
      name: 'Zinder',
      departments: [
        {
          name: 'Département Z1',
          communes: [
            { name: 'Commune Z1', localities: [{ name: 'Localité Z1' }] },
          ],
        },
      ],
    },
  ];

  // Données dynamiques
  filteredMarkets: any[] = [...this.markets];
  searchQuery: string = '';
  selectedRegion: any = null;
  selectedDepartment: any = null;
  selectedCommune: any = null;
  departments: any[] = [];
  communes: any[] = [];
  localities: any[] = [];

  // Modal
  isMarketModalVisible = false;
  isEditing = false;
  currentMarket: any = {
    name: '',
    locality: null,
    latitude: null,
    longitude: null,
  };

  constructor() {}

  ngOnInit(): void {
    this.applyFilters();
  }

  // Appliquer la recherche
  applyFilters(): void {
    this.filteredMarkets = this.markets.filter(
      (market) =>
        !this.searchQuery ||
        market.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        market.locality?.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
    );
  }

  // Afficher le modal pour ajouter
  showAddMarketModal(): void {
    console.log('Ouverture modal ajout');
    this.isMarketModalVisible = true;
    this.isEditing = false;
    this.currentMarket = {
      name: '',
      locality: null,
      latitude: null,
      longitude: null,
    };
    this.selectedRegion = null;
    this.selectedDepartment = null;
    this.selectedCommune = null;
    this.departments = [];
    this.communes = [];
    this.localities = [];
  }

  // Afficher le modal pour modifier
  showEditMarketModal(market: any): void {
    console.log('Ouverture modal édition:', market);
    this.isMarketModalVisible = true;
    this.isEditing = true;
    this.currentMarket = { ...market };
    this.selectedRegion = market.locality?.parent?.parent?.parent || null;
    this.selectedDepartment = market.locality?.parent?.parent || null;
    this.selectedCommune = market.locality?.parent || null;
    this.updateDepartments();
    this.updateCommunes();
    this.updateLocalities();
  }

  // Gérer la confirmation
  handleMarketOk(): void {
    console.log(
      'Formulaire soumis:',
      this.currentMarket,
      this.marketForm?.value
    );
    if (this.marketForm?.valid) {
      const marketData = {
        ...this.currentMarket,
        locality: this.currentMarket.locality,
        latitude: parseFloat(this.currentMarket.latitude),
        longitude: parseFloat(this.currentMarket.longitude),
      };
      if (this.isEditing) {
        const index = this.markets.findIndex(
          (m) => m.name === this.currentMarket.name
        );
        if (index !== -1) {
          this.markets[index] = marketData;
        }
      } else {
        this.markets.push(marketData);
      }
      this.isMarketModalVisible = false;
      this.applyFilters();
    }
  }

  // Gérer l’annulation
  handleMarketCancel(): void {
    console.log('Annulation modal');
    this.isMarketModalVisible = false;
  }

  // Supprimer un marché
  deleteMarket(market: any): void {
    this.markets = this.markets.filter((m) => m.name !== market.name);
    this.applyFilters();
  }

  // Annuler la suppression
  cancelDelete(): void {
    console.log('Suppression annulée');
  }

  // Mettre à jour les départements
  updateDepartments(): void {
    console.log('Mise à jour départements:', this.selectedRegion);
    this.departments = this.selectedRegion?.departments || [];
    this.selectedDepartment = null;
    this.communes = [];
    this.localities = [];
    this.currentMarket.locality = null;
  }

  // Mettre à jour les communes
  updateCommunes(): void {
    console.log('Mise à jour communes:', this.selectedDepartment);
    this.communes = this.selectedDepartment?.communes || [];
    this.selectedCommune = null;
    this.localities = [];
    this.currentMarket.locality = null;
  }

  // Mettre à jour les localités
  updateLocalities(): void {
    console.log('Mise à jour localités:', this.selectedCommune);
    this.localities = this.selectedCommune?.localities || [];
    this.currentMarket.locality = null;
  }

  // Référence au formulaire
  marketForm: NgForm | undefined;
}
