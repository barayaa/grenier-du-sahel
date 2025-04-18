import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class UserProfileComponent {
  profileTypes: any[] = [
    {
      name: 'Administrateur',
      description: 'Accès complet à toutes les fonctionnalités',
      permissions: [
        { name: 'Créer utilisateurs', enabled: true },
        { name: 'Modifier utilisateurs', enabled: true },
        { name: 'Supprimer utilisateurs', enabled: true },
        { name: 'Voir rapports', enabled: true },
      ],
    },
    {
      name: 'Éditeur',
      description: 'Peut créer et modifier du contenu',
      permissions: [
        { name: 'Créer utilisateurs', enabled: false },
        { name: 'Modifier utilisateurs', enabled: true },
        { name: 'Supprimer utilisateurs', enabled: false },
        { name: 'Voir rapports', enabled: true },
      ],
    },
    {
      name: 'Lecteur',
      description: 'Accès en lecture seule',
      permissions: [
        { name: 'Créer utilisateurs', enabled: false },
        { name: 'Modifier utilisateurs', enabled: false },
        { name: 'Supprimer utilisateurs', enabled: false },
        { name: 'Voir rapports', enabled: true },
      ],
    },
  ];

  // Liste filtrée pour le tableau
  filteredProfileTypes: any[] = [...this.profileTypes];

  // Liste fictive d’utilisateurs (à remplacer par ton `users` réel)
  users: any[] = [
    { name: 'Aminata Souley', profileType: 'Administrateur' },
    { name: 'Moussa Diallo', profileType: 'Éditeur' },
    { name: 'Fatima Issa', profileType: 'Lecteur' },
  ];

  // Recherche
  searchQuery: string = '';

  // Modal pour ajouter/modifier un type de profil
  isProfileTypeModalVisible = false;
  isEditingProfileType = false;
  currentProfileType: any = {
    name: '',
    description: '',
    permissions: [
      { name: 'Créer utilisateurs', enabled: false },
      { name: 'Modifier utilisateurs', enabled: false },
      { name: 'Supprimer utilisateurs', enabled: false },
      { name: 'Voir rapports', enabled: false },
    ],
  };

  // Modal pour attribuer un type de profil
  isAssignProfileModalVisible = false;
  selectedUser: any = null;

  constructor() {}

  ngOnInit(): void {
    // Charger les types de profils depuis une API si nécessaire
    // Exemple : this.profileService.getProfileTypes().subscribe(types => this.profileTypes = types);
    this.applyFilters();
  }

  // Appliquer la recherche
  applyFilters(): void {
    this.filteredProfileTypes = this.profileTypes.filter(
      (type) =>
        !this.searchQuery ||
        type.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Afficher le modal pour ajouter un type de profil
  showAddProfileTypeModal(): void {
    this.isProfileTypeModalVisible = true;
    this.isEditingProfileType = false;
    this.currentProfileType = {
      name: '',
      description: '',
      permissions: [
        { name: 'Créer utilisateurs', enabled: false },
        { name: 'Modifier utilisateurs', enabled: false },
        { name: 'Supprimer utilisateurs', enabled: false },
        { name: 'Voir rapports', enabled: false },
      ],
    };
  }

  // Afficher le modal pour modifier un type de profil
  showEditProfileTypeModal(profileType: any): void {
    this.isProfileTypeModalVisible = true;
    this.isEditingProfileType = true;
    this.currentProfileType = {
      ...profileType,
      permissions: [...profileType.permissions],
    };
  }

  // Gérer la confirmation de l’ajout/modification
  handleProfileTypeOk(): void {
    if (this.profileTypeForm?.valid) {
      if (this.isEditingProfileType) {
        const index = this.profileTypes.findIndex(
          (t) => t.name === this.currentProfileType.name
        );
        if (index !== -1) {
          this.profileTypes[index] = { ...this.currentProfileType };
        }
      } else {
        this.profileTypes.push({ ...this.currentProfileType });
      }
      this.isProfileTypeModalVisible = false;
      this.applyFilters();
      // TODO : Appeler une API pour sauvegarder
      // Exemple : this.profileService.saveProfileType(this.currentProfileType).subscribe();
    }
  }

  // Gérer l’annulation de l’ajout/modification
  handleProfileTypeCancel(): void {
    this.isProfileTypeModalVisible = false;
  }

  // Afficher le modal pour attribuer un type de profil
  showAssignProfileModal(profileType: any): void {
    this.isAssignProfileModalVisible = true;
    this.currentProfileType = profileType;
    this.selectedUser = null;
  }

  // Gérer la confirmation de l’attribution
  handleAssignOk(): void {
    if (this.selectedUser && this.currentProfileType) {
      this.selectedUser.profileType = this.currentProfileType.name;
      this.isAssignProfileModalVisible = false;
      // TODO : Appeler une API pour attribuer le profil
      // Exemple : this.userService.assignProfile(this.selectedUser, this.currentProfileType).subscribe();
    }
  }

  // Gérer l’annulation de l’attribution
  handleAssignCancel(): void {
    this.isAssignProfileModalVisible = false;
  }

  // Supprimer un type de profil
  deleteProfileType(profileType: any): void {
    this.profileTypes = this.profileTypes.filter(
      (t) => t.name !== profileType.name
    );
    this.applyFilters();
    // TODO : Appeler une API pour supprimer
    // Exemple : this.profileService.deleteProfileType(profileType.name).subscribe();
  }

  // Annuler la suppression
  cancelDelete(): void {
    console.log('Suppression annulée');
  }

  // Référence au formulaire
  profileTypeForm: NgForm | undefined;
}
