import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-magasin',

  templateUrl: './magasin.component.html',
  styleUrl: './magasin.component.css',
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
export class MagasinComponent {
  stores: any[] = [
    {
      id: '1',
      name: 'Magasin Niamey',
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
      inventory: [
        { itemName: 'Oignons', quantity: 500, unit: 'kg' },
        { itemName: 'Sorgho', quantity: 1200, unit: 'kg' },
        { itemName: 'Mil', quantity: 300, unit: 'kg' },
      ],
    },
    {
      id: '2',
      name: 'Magasin Zinder',
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
      inventory: [
        { itemName: 'Oignons', quantity: 200, unit: 'kg' },
        { itemName: 'Sorgho', quantity: 800, unit: 'kg' },
      ],
    },
  ];

  filteredStores: any[] = [...this.stores];
  searchQuery: string = '';
  isModalVisible = false;
  isEditing = false;
  currentStore: any = {
    name: '',
    locality: null,
    latitude: null,
    longitude: null,
    inventory: [],
  };

  // Données fictives pour les localités (comme dans MarcheComponent)
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
          ],
        },
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

  selectedRegion: any = null;
  selectedDepartment: any = null;
  selectedCommune: any = null;
  departments: any[] = [];
  communes: any[] = [];
  localities: any[] = [];

  // Gestion du stock
  newItem: { itemName: string; quantity: number; unit: string } = {
    itemName: '',
    quantity: 0,
    unit: 'kg',
  };

  constructor() {}

  ngOnInit(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredStores = this.stores.filter(
      (store) =>
        !this.searchQuery ||
        store.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        store.locality?.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
    );
  }

  showAddModal(): void {
    this.isModalVisible = true;
    this.isEditing = false;
    this.currentStore = {
      name: '',
      locality: null,
      latitude: null,
      longitude: null,
      inventory: [],
    };
    this.newItem = { itemName: '', quantity: 0, unit: 'kg' };
    this.selectedRegion = null;
    this.selectedDepartment = null;
    this.selectedCommune = null;
    this.departments = [];
    this.communes = [];
    this.localities = [];
  }

  showEditModal(store: any): void {
    this.isModalVisible = true;
    this.isEditing = true;
    this.currentStore = { ...store, inventory: [...store.inventory] };
    this.newItem = { itemName: '', quantity: 0, unit: 'kg' };
    this.selectedRegion = store.locality?.parent?.parent?.parent || null;
    this.selectedDepartment = store.locality?.parent?.parent || null;
    this.selectedCommune = store.locality?.parent || null;
    this.updateDepartments();
    this.updateCommunes();
    this.updateLocalities();
  }

  handleModalOk(): void {
    if (this.storeForm?.valid) {
      const storeData = {
        ...this.currentStore,
        id: this.isEditing
          ? this.currentStore.id
          : (this.stores.length + 1).toString(),
        locality: this.currentStore.locality,
        latitude: parseFloat(this.currentStore.latitude),
        longitude: parseFloat(this.currentStore.longitude),
        inventory: [...this.currentStore.inventory],
      };
      if (this.isEditing) {
        const index = this.stores.findIndex((s) => s.id === storeData.id);
        if (index !== -1) {
          this.stores[index] = storeData;
        }
      } else {
        this.stores.push(storeData);
      }
      this.isModalVisible = false;
      this.applyFilters();
    }
  }

  handleModalCancel(): void {
    this.isModalVisible = false;
  }

  deleteStore(store: any): void {
    this.stores = this.stores.filter((s) => s.id !== store.id);
    this.applyFilters();
  }

  cancelDelete(): void {}

  updateDepartments(): void {
    this.departments = this.selectedRegion?.departments || [];
    this.selectedDepartment = null;
    this.communes = [];
    this.localities = [];
    this.currentStore.locality = null;
  }

  updateCommunes(): void {
    this.communes = this.selectedDepartment?.communes || [];
    this.selectedCommune = null;
    this.localities = [];
    this.currentStore.locality = null;
  }

  updateLocalities(): void {
    this.localities = this.selectedCommune?.localities || [];
    this.currentStore.locality = null;
  }

  addItemToInventory(): void {
    if (this.newItem.itemName && this.newItem.quantity > 0) {
      this.currentStore.inventory.push({ ...this.newItem });
      this.newItem = { itemName: '', quantity: 0, unit: 'kg' };
    }
  }

  removeItemFromInventory(index: number): void {
    this.currentStore.inventory.splice(index, 1);
  }

  storeForm: NgForm | undefined;
}
