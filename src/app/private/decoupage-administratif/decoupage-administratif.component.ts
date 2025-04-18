import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-decoupage-administratif',
  templateUrl: './decoupage-administratif.component.html',
  styleUrl: './decoupage-administratif.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class DecoupageAdministratifComponent {
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
      departments: [],
    },
  ];

  // Données dynamiques pour l’affichage
  currentLevel: 'region' | 'department' | 'commune' | 'locality' = 'region';
  filteredDivisions: any[] = [...this.regions];
  selectedRegion: any = null;
  selectedDepartment: any = null;
  selectedCommune: any = null;

  // Recherche
  searchQuery: string = '';

  // Modal
  isModalVisible = false;
  isEditing = false;
  currentDivisionType: string = '';
  currentDivision: any = { name: '', parent: null };

  constructor() {}

  ngOnInit(): void {
    // Charger les données depuis une API si nécessaire
    // Exemple : this.divisionService.getRegions().subscribe(regions => this.regions = regions);
    this.applyFilters();
  }

  // Appliquer la recherche
  applyFilters(): void {
    let source = this.getCurrentSource();
    this.filteredDivisions = source.filter(
      (division) =>
        !this.searchQuery ||
        division.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Obtenir la source de données selon le niveau actuel
  getCurrentSource(): any[] {
    if (this.currentLevel === 'region') return this.regions;
    if (this.currentLevel === 'department')
      return this.selectedRegion?.departments || [];
    if (this.currentLevel === 'commune')
      return this.selectedDepartment?.communes || [];
    if (this.currentLevel === 'locality')
      return this.selectedCommune?.localities || [];
    return [];
  }

  // Naviguer vers un sous-niveau
  viewSubLevel(division: any): void {
    if (this.currentLevel === 'region') {
      this.selectedRegion = division;
      this.currentLevel = 'department';
      this.filteredDivisions = division.departments || [];
    } else if (this.currentLevel === 'department') {
      this.selectedDepartment = division;
      this.currentLevel = 'commune';
      this.filteredDivisions = division.communes || [];
    } else if (this.currentLevel === 'commune') {
      this.selectedCommune = division;
      this.currentLevel = 'locality';
      this.filteredDivisions = division.localities || [];
    }
    this.searchQuery = '';
    this.applyFilters();
  }

  // Revenir à un niveau supérieur
  setLevel(level: string, division: any): void {
    if (level === 'region') {
      this.currentLevel = 'region';
      this.selectedRegion = null;
      this.selectedDepartment = null;
      this.selectedCommune = null;
      this.filteredDivisions = this.regions;
    } else if (level === 'department') {
      this.currentLevel = 'department';
      this.selectedDepartment = null;
      this.selectedCommune = null;
      this.filteredDivisions = this.selectedRegion.departments || [];
    }
    this.searchQuery = '';
    this.applyFilters();
  }

  // Réinitialiser au niveau région
  resetLevel(): void {
    this.currentLevel = 'region';
    this.selectedRegion = null;
    this.selectedDepartment = null;
    this.selectedCommune = null;
    this.filteredDivisions = this.regions;
    this.searchQuery = '';
    this.applyFilters();
  }

  // Afficher le modal pour ajouter une entité
  showAddModal(type: string): void {
    this.isModalVisible = true;
    this.isEditing = false;
    this.currentDivisionType = type;
    this.currentDivision = { name: '', parent: null };
    if (type === 'department')
      this.currentDivision.parent = this.selectedRegion;
    if (type === 'commune')
      this.currentDivision.parent = this.selectedDepartment;
    if (type === 'locality') this.currentDivision.parent = this.selectedCommune;
  }

  // Afficher le modal pour modifier une entité
  showEditModal(division: any): void {
    this.isModalVisible = true;
    this.isEditing = true;
    this.currentDivisionType = this.currentLevel;
    this.currentDivision = { ...division, parent: this.getParent(division) };
  }

  // Gérer la confirmation du modal
  handleModalOk(): void {
    if (this.divisionForm?.valid) {
      if (this.isEditing) {
        this.updateDivision();
      } else {
        this.addDivision();
      }
      this.isModalVisible = false;
      this.applyFilters();
      // TODO : Appeler une API pour sauvegarder
      // Exemple : this.divisionService.saveDivision(this.currentDivision).subscribe();
    }
  }

  // Ajouter une nouvelle entité
  addDivision(): void {
    const newDivision = {
      ...this.currentDivision,
      name: this.currentDivision.name,
    };
    if (this.currentDivisionType === 'region') {
      newDivision.departments = [];
      this.regions.push(newDivision);
    } else if (this.currentDivisionType === 'department') {
      newDivision.communes = [];
      this.currentDivision.parent.departments.push(newDivision);
    } else if (this.currentDivisionType === 'commune') {
      newDivision.localities = [];
      this.currentDivision.parent.communes.push(newDivision);
    } else if (this.currentDivisionType === 'locality') {
      this.currentDivision.parent.localities.push(newDivision);
    }
  }

  // Mettre à jour une entité existante
  updateDivision(): void {
    const source = this.getCurrentSource();
    const index = source.findIndex((d) => d.name === this.currentDivision.name);
    if (index !== -1) {
      source[index] = {
        ...this.currentDivision,
        name: this.currentDivision.name,
      };
    }
  }

  // Supprimer une entité
  deleteDivision(division: any): void {
    let source = this.getCurrentSource();
    if (this.currentLevel === 'region') {
      this.regions = this.regions.filter((d) => d.name !== division.name);
    } else if (this.currentLevel === 'department') {
      this.selectedRegion.departments = this.selectedRegion.departments.filter(
        (d) => d.name !== division.name
      );
    } else if (this.currentLevel === 'commune') {
      this.selectedDepartment.communes =
        this.selectedDepartment.communes.filter(
          (d) => d.name !== division.name
        );
    } else if (this.currentLevel === 'locality') {
      this.selectedCommune.localities = this.selectedCommune.localities.filter(
        (d) => d.name !== division.name
      );
    }
    this.applyFilters();
    // TODO : Appeler une API pour supprimer
    // Exemple : this.divisionService.deleteDivision(division).subscribe();
  }

  // Gérer l’annulation du modal
  handleModalCancel(): void {
    this.isModalVisible = false;
  }

  // Annuler la suppression
  cancelDelete(): void {
    console.log('Suppression annulée');
  }

  // Obtenir le nom du parent
  getParentName(division: any): string {
    if (this.currentLevel === 'department')
      return this.selectedRegion?.name || '';
    if (this.currentLevel === 'commune')
      return this.selectedDepartment?.name || '';
    if (this.currentLevel === 'locality')
      return this.selectedCommune?.name || '';
    return '';
  }

  // Obtenir le parent d’une entité
  getParent(division: any): any {
    if (this.currentLevel === 'department') return this.selectedRegion;
    if (this.currentLevel === 'commune') return this.selectedDepartment;
    if (this.currentLevel === 'locality') return this.selectedCommune;
    return null;
  }

  // Obtenir les options pour le sélecteur de parent
  getParentOptions(): any[] {
    if (this.currentDivisionType === 'department') return this.regions;
    if (this.currentDivisionType === 'commune')
      return this.selectedRegion?.departments || [];
    if (this.currentDivisionType === 'locality')
      return this.selectedDepartment?.communes || [];
    return [];
  }

  // Obtenir le label du parent
  getParentLabel(): string {
    if (this.currentDivisionType === 'department') return 'Région';
    if (this.currentDivisionType === 'commune') return 'Département';
    if (this.currentDivisionType === 'locality') return 'Commune';
    return '';
  }

  // Définir le parent sélectionné
  setParent(parent: any): void {
    this.currentDivision.parent = parent;
  }

  // Référence au formulaire
  divisionForm: NgForm | undefined;
}
