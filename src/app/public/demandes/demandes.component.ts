import { Component } from '@angular/core';

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.component.html',
  styleUrl: './demandes.component.css',
})
export class DemandesComponent {
  demandes = [
    {
      id: 1,
      produit: 'Mil',
      quantite: '500 kg',
      date: '2025-04-10',
      statut: 'En attente',
    },
    {
      id: 2,
      produit: 'Maïs',
      quantite: '300 kg',
      date: '2025-04-09',
      statut: 'Validée',
    },
    {
      id: 3,
      produit: 'Sorgho',
      quantite: '200 kg',
      date: '2025-04-08',
      statut: 'En attente',
    },
  ];
}
