import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-data-collecte',

  templateUrl: './data-collecte.component.html',
  styleUrl: './data-collecte.component.css',
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
export class DataCollecteComponent {
  collectedData = [
    {
      product: 'Mil',
      quantity: 50000,
      locality: 'Dosso',
      country: 'Niger',
      collector: 'Amadou Diallo',
      collectionDate: new Date('2025-04-10'),
      source: 'Import Fichier',
    },
    {
      product: 'Maïs',
      quantity: 30000,
      locality: 'Ségou',
      country: 'Mali',
      collector: 'Fatima Traoré',
      collectionDate: new Date('2025-04-08'),
      source: 'Saisie Manuelle',
    },
    {
      product: 'Haricot',
      quantity: 20000,
      locality: 'Thiès',
      country: 'Sénégal',
      collector: 'Moussa Ndiaye',
      collectionDate: new Date('2025-04-12'),
      source: 'Import Fichier',
    },
    {
      product: 'Sorgho',
      quantity: 25000,
      locality: 'Ouagadougou',
      country: 'Burkina Faso',
      collector: 'Aïssa Ouédraogo',
      collectionDate: new Date('2025-04-11'),
      source: 'Saisie Manuelle',
    },
    {
      product: 'Riz',
      quantity: 15000,
      locality: 'N’Djaména',
      country: 'Tchad',
      collector: 'Hassan Mahamat',
      collectionDate: new Date('2025-04-09'),
      source: 'Import Fichier',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
