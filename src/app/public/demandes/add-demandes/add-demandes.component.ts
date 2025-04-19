import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-add-demandes',

  templateUrl: './add-demandes.component.html',
  styleUrl: './add-demandes.component.css',
})
export class AddDemandesComponent {
  demandeForm!: FormGroup;

  // Liste de produits disponibles
  produits = ['Mil', 'Maïs', 'Sorgho', 'Oignons'];
  statuts = ['En attente', 'Validée'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.demandeForm = this.fb.group({
      produit: [null, [Validators.required]],
      quantite: [
        null,
        [Validators.required, Validators.pattern('^[0-9]+( kg)?$')],
      ],
      date: [null, [Validators.required]],
      statut: ['En attente', [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.demandeForm.valid) {
      const newDemande = {
        id: Math.max(...this.getDemandes().map((d) => d.id)) + 1, // Simuler un ID
        produit: this.demandeForm.value.produit,
        quantite: this.demandeForm.value.quantite.includes('kg')
          ? this.demandeForm.value.quantite
          : `${this.demandeForm.value.quantite} kg`,
        date: this.formatDate(this.demandeForm.value.date),
        statut: this.demandeForm.value.statut,
      };

      // Simuler ajout (à remplacer par un appel API plus tard)
      this.getDemandes().push(newDemande);

      this.notification.success('Succès', 'Demande ajoutée avec succès !');
      this.router.navigate(['/demandes']);
    } else {
      Object.values(this.demandeForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  // Simuler accès à la liste des demandes (à remplacer par un service)
  private getDemandes(): any[] {
    return JSON.parse(localStorage.getItem('demandes') || '[]');
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; // Format YYYY-MM-DD
  }
}
