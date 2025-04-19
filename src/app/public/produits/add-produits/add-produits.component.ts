import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-add-produits',
  templateUrl: './add-produits.component.html',
  styleUrl: './add-produits.component.css',
})
export class AddProduitsComponent {
  produitForm!: FormGroup;

  // Options pour les sélecteurs
  categories = ['Céréales', 'Légumineuses'];
  unites = ['kg'];
  localites = [
    { name: 'Niamey', latitude: 13.5137, longitude: 2.1098 },
    { name: 'Zinder', latitude: 13.8053, longitude: 8.9884 },
    { name: 'Dosso', latitude: 13.315, longitude: 3.083 },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.produitForm = this.fb.group({
      nom: [null, [Validators.required, Validators.minLength(2)]],
      categorie: [null, [Validators.required]],
      quantite: [
        null,
        [Validators.required, Validators.pattern('^[0-9]+( kg)?$')],
      ],
      prix: [null, [Validators.required, Validators.min(1)]],
      localite: [null, [Validators.required]],
      description: [null, [Validators.required, Validators.minLength(10)]],
      image: [
        null,
        [
          Validators.required,
          Validators.pattern('^https?://.+\\.(jpg|jpeg|png|gif)$'),
        ],
      ],
      vendeur: [null, [Validators.required, Validators.minLength(3)]],
      datePublication: [null, [Validators.required]],
      unite: ['kg', [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.produitForm.valid) {
      const selectedLocalite = this.localites.find(
        (loc) => loc.name === this.produitForm.value.localite
      );
      const newProduit = {
        id: Math.max(...this.getProduits().map((p) => p.id)) + 1,
        nom: this.produitForm.value.nom,
        categorie: this.produitForm.value.categorie,
        prix: this.produitForm.value.prix,
        image: this.produitForm.value.image,
        description: this.produitForm.value.description,
        vendeur: this.produitForm.value.vendeur,
        localisation: {
          latitude: selectedLocalite?.latitude,
          longitude: selectedLocalite?.longitude,
        },
        quantite: this.produitForm.value.quantite.includes('kg')
          ? this.produitForm.value.quantite
          : `${this.produitForm.value.quantite} kg`,
        unite: this.produitForm.value.unite,
        datePublication: this.formatDate(
          this.produitForm.value.datePublication
        ),
      };

      // Simuler ajout avec localStorage
      const produits = this.getProduits();
      produits.push(newProduit);
      localStorage.setItem('produits', JSON.stringify(produits));

      this.notification.success('Succès', 'Produit ajouté avec succès !');
      this.router.navigate(['/produits']);
    } else {
      Object.values(this.produitForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  // Simuler accès à la liste des produits
  private getProduits(): any[] {
    return JSON.parse(localStorage.getItem('produits') || '[]');
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; // Format YYYY-MM-DD
  }
}
