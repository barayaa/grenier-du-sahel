import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-magasin-details',

  templateUrl: './magasin-details.component.html',
  styleUrl: './magasin-details.component.css',
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
export class MagasinDetailsComponent {
  store: any = null;

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

  mapOptions: L.MapOptions = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }),
    ],
    zoom: 12,
    center: L.latLng(13.5137, 2.1098),
  };
  markerLayers: L.Layer[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const storeId = this.route.snapshot.paramMap.get('id');
    console.log('Store ID:', storeId);
    this.store = this.stores.find((s) => s.id === storeId);
    console.log('Store found:', this.store);
    if (this.store) {
      this.mapOptions = {
        ...this.mapOptions,
        center: L.latLng(this.store.latitude, this.store.longitude),
      };
      this.markerLayers = [
        L.marker([this.store.latitude, this.store.longitude], {
          icon: L.icon({
            iconUrl:
              'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          }),
        }).bindPopup(this.store.name),
      ];
    }
  }
}
