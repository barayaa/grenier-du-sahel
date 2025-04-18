import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-user',

  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '500ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class UserComponent {
  profiles: any[] = [
    {
      name: 'Aminata Souley',
      locality: 'Niamey',
      country: 'Niger',
      role: 'Administrateur',
      status: 'Actif',
      registrationDate: new Date('2025-01-15'),
      email: 'aminata.souley@example.com',
    },
    {
      name: 'Moussa Diallo',
      locality: 'Zinder',
      country: 'Niger',
      role: 'Utilisateur',
      status: 'Inactif',
      registrationDate: new Date('2025-02-10'),
      email: 'moussa.diallo@example.com',
    },
    {
      name: 'Fatima Issa',
      locality: 'Maradi',
      country: 'Niger',
      role: 'Invité',
      status: 'Actif',
      registrationDate: new Date('2025-03-01'),
      email: 'fatima.issa@example.com',
    },
  ];

  // Liste filtrée pour le tableau
  filteredProfiles: any[] = [...this.profiles];

  // Filtres
  searchQuery: string = '';
  filterRole: string = '';
  filterStatus: string = '';

  // Modal pour ajouter un profil
  isAddProfileModalVisible = false;
  newProfile = {
    name: '',
    locality: '',
    country: '',
    role: '',
    status: '',
    registrationDate: new Date(),
    email: '',
  };

  // Modal pour voir/modifier les détails
  isProfileDetailsModalVisible = false;
  selectedProfile: any = null;
  isEditing = false;

  constructor() {}

  ngOnInit(): void {
    // Charger les profils depuis une API si nécessaire
    // Exemple : this.profileService.getProfiles().subscribe(profiles => this.profiles = profiles);
    this.applyFilters();
  }

  // Appliquer les filtres et la recherche
  applyFilters(): void {
    this.filteredProfiles = this.profiles.filter((profile) => {
      const matchesSearch =
        !this.searchQuery ||
        profile.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesRole = !this.filterRole || profile.role === this.filterRole;
      const matchesStatus =
        !this.filterStatus || profile.status === this.filterStatus;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }

  // Afficher le modal pour ajouter un profil
  showAddProfileModal(): void {
    this.isAddProfileModalVisible = true;
    this.newProfile = {
      name: '',
      locality: '',
      country: '',
      role: '',
      status: '',
      registrationDate: new Date(),
      email: '',
    };
  }

  // Gérer la confirmation de l’ajout
  handleAddOk(): void {
    if (this.addProfileForm?.valid) {
      this.profiles.push({ ...this.newProfile });
      this.isAddProfileModalVisible = false;
      this.applyFilters();
      // TODO : Appeler une API pour ajouter le profil
      // Exemple : this.profileService.addProfile(this.newProfile).subscribe();
    }
  }

  // Gérer l’annulation de l’ajout
  handleAddCancel(): void {
    this.isAddProfileModalVisible = false;
  }

  // Afficher les détails d’un profil
  showProfileDetails(profile: any): void {
    this.selectedProfile = { ...profile };
    this.isProfileDetailsModalVisible = true;
    this.isEditing = false;
  }

  // Afficher le modal pour modifier un profil
  showEditProfileModal(profile: any): void {
    this.selectedProfile = { ...profile };
    this.isProfileDetailsModalVisible = true;
    this.isEditing = true;
  }

  // Gérer la confirmation des détails/modifications
  handleDetailsOk(): void {
    if (this.isEditing && this.editProfileForm?.valid) {
      const index = this.profiles.findIndex(
        (p) => p.name === this.selectedProfile.name
      ); // À ajuster si tu as un ID unique
      if (index !== -1) {
        this.profiles[index] = {
          ...this.selectedProfile,
          registrationDate: this.profiles[index].registrationDate,
        };
        this.applyFilters();
        // TODO : Appeler une API pour sauvegarder les modifications
        // Exemple : this.profileService.updateProfile(this.selectedProfile).subscribe();
      }
    } else {
      this.isEditing = true; // Passer en mode édition si on clique sur "Modifier"
      return;
    }
    this.isProfileDetailsModalVisible = false;
  }

  // Gérer l’annulation des détails/modifications
  handleDetailsCancel(): void {
    this.isProfileDetailsModalVisible = false;
    this.isEditing = false;
  }

  // Supprimer un profil
  deleteProfile(profile: any): void {
    this.profiles = this.profiles.filter((p) => p.name !== profile.name); // À ajuster si tu as un ID unique
    this.applyFilters();
    // TODO : Appeler une API pour supprimer le profil
    // Exemple : this.profileService.deleteProfile(profile.id).subscribe();
  }

  // Annuler la suppression
  cancelDelete(): void {
    console.log('Suppression annulée');
  }

  // Références aux formulaires
  addProfileForm: NgForm | undefined;
  editProfileForm: NgForm | undefined;
}
