import { Component } from '@angular/core';

@Component({
  selector: 'app-produits',

  templateUrl: './produits.component.html',
  styleUrl: './produits.component.css',
})
export class ProduitsComponent {
  // produits = [
  //   {
  //     id: 1,
  //     nom: 'Mil',
  //     categorie: 'Céréales',
  //     prix: 25000,
  //     image:
  //       'https://www.seneplus.com/sites/default/files/styles/section_hero/public/raw_photos/culture_mil_0.jpg?itok=dkPfMc5b',
  //     description:
  //       'Mil de haute qualité, cultivé dans les régions fertiles de Dosso. Parfait pour une alimentation saine et durable.',
  //     vendeur: 'Amadou Traoré',
  //     localisation: { latitude: 13.315, longitude: 3.083 }, // Coordonnées de Dosso, Niger
  //     quantite: 500, // en kg
  //     unite: 'kg',
  //     datePublication: '2025-04-10',
  //   },
  //   {
  //     id: 2,
  //     nom: 'Maïs',
  //     categorie: 'Céréales',
  //     prix: 20000,
  //     image: 'https://www.terre-de-culture.com/wp-content/uploads/mais.jpg',
  //     description:
  //       'Maïs jaune bio, récolté récemment à Ségou. Idéal pour les repas familiaux ou la transformation.',
  //     vendeur: 'Fatoumata Diallo',
  //     localisation: { latitude: 13.431, longitude: -6.259 }, // Coordonnées de Ségou, Mali
  //     quantite: 300,
  //     unite: 'kg',
  //     datePublication: '2025-04-12',
  //   },
  //   {
  //     id: 3,
  //     nom: 'Haricot',
  //     categorie: 'Légumineuses',
  //     prix: 30000,
  //     image:
  //       'https://upload.wikimedia.org/wikipedia/commons/1/1b/Haricots_verts01.jpg',
  //     description:
  //       'Haricots verts frais, cultivés à Thiès. Riches en protéines et parfaits pour une cuisine variée.',
  //     vendeur: 'Moussa Diop',
  //     localisation: { latitude: 14.791, longitude: -16.935 }, // Coordonnées de Thiès, Sénégal
  //     quantite: 200,
  //     unite: 'kg',
  //     datePublication: '2025-04-11',
  //   },
  // ];

  produits = [
    {
      id: 1,
      nom: 'Sorgho',
      categorie: 'Céréales',
      prix: 25000,
      image:
        'https://vieillegraine.fr/wp-content/uploads/2023/09/AdobeStock_78223351-scaled.jpeg',
      description:
        'Sorgho de haute qualité, cultivé dans les régions fertiles de Dosso. Idéal pour une alimentation saine et durable.',
      vendeur: 'Amadou Traoré',
      localisation: { latitude: 13.315, longitude: 3.083 },
      quantite: 500,
      unite: 'kg',
      datePublication: '2025-04-10',
    },
    {
      id: 2,
      nom: 'Oignon',
      categorie: 'Légumineuses',
      prix: 20000,
      image:
        'https://www.pretajardiner.com/modules/ph_simpleblog/covers/206.jpg',
      description:
        'Oignons frais et bio, récoltés récemment à Ségou. Parfaits pour cuisiner ou conserver.',
      vendeur: 'Fatoumata Diallo',
      localisation: { latitude: 13.431, longitude: -6.259 },
      quantite: 300,
      unite: 'kg',
      datePublication: '2025-04-12',
    },
    {
      id: 3,
      nom: 'Niebe',
      categorie: 'Légumineuses',
      prix: 30000,
      image:
        'https://uscpcd.com/wp-content/uploads/2018/08/Le-nie%CC%81be%CC%81.jpg',
      description:
        'Haricots verts frais, cultivés à Thiès. Riches en protéines et parfaits pour une cuisine variée.',
      vendeur: 'Moussa Diop',
      localisation: { latitude: 14.791, longitude: -16.935 },
      quantite: 200,
      unite: 'kg',
      datePublication: '2025-04-11',
    },
    {
      id: 2,
      nom: 'Arachide',
      categorie: 'Légumineuses',
      prix: 20000,
      image:
        'https://www.studiotamani.org/wp-content/uploads/2023/12/arachide.jpg',
      description:
        'Arachides fraîches et bio, récoltées récemment à Ségou. Idéales pour la consommation ou la transformation.',
      vendeur: 'Fatoumata Diallo',
      localisation: { latitude: 13.431, longitude: -6.259 },
      quantite: 300,
      unite: 'kg',
      datePublication: '2025-04-12',
    },
  ];
}
