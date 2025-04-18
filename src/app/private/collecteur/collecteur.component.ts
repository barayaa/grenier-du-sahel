// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-collecteur',

//   templateUrl: './collecteur.component.html',
//   styleUrl: './collecteur.component.css',
// })
// export class CollecteurComponent {}
import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-collecteur',
  templateUrl: './collecteur.component.html',
  styleUrl: './collecteur.component.css',
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
export class CollecteurComponent implements OnInit {
  collectors = [
    {
      name: 'Amadou Diallo',
      locality: 'Dosso',
      country: 'Niger',
      dataCollectedCount: 120,
      lastCollectionDate: new Date('2025-04-10'),
    },
    {
      name: 'Fatima Traoré',
      locality: 'Ségou',
      country: 'Mali',
      dataCollectedCount: 85,
      lastCollectionDate: new Date('2025-04-08'),
    },
    {
      name: 'Moussa Ndiaye',
      locality: 'Thiès',
      country: 'Sénégal',
      dataCollectedCount: 150,
      lastCollectionDate: new Date('2025-04-12'),
    },
    {
      name: 'Aïssa Ouédraogo',
      locality: 'Ouagadougou',
      country: 'Burkina Faso',
      dataCollectedCount: 200,
      lastCollectionDate: new Date('2025-04-11'),
    },
    {
      name: 'Hassan Mahamat',
      locality: 'N’Djaména',
      country: 'Tchad',
      dataCollectedCount: 95,
      lastCollectionDate: new Date('2025-04-09'),
    },
  ];

  constructor() {}

  ngOnInit() {}

  viewDetails(collector: any) {
    // Pour la présentation, on affiche juste une alerte
    alert(
      `Détails du collecteur : ${collector.name}\nLocalité : ${collector.locality}, ${collector.country}\nDonnées Collectées : ${collector.dataCollectedCount}`
    );
  }
}
