import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-marcher-info',
  templateUrl: './marcher-info.component.html',
  styleUrls: ['./marcher-info.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class MarcherInfoComponent implements OnInit {
  market: any = null;

  // Données fictives avec ID simples
  markets: any[] = [
    {
      id: '1',
      name: 'Marché de Niamey',
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
    },
    {
      id: '2',
      name: 'Marché de Zinder',
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
    },
  ];

  mapOptions: L.MapOptions = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }),
    ],
    zoom: 12,
    center: L.latLng(13.5137, 2.1098), // Niamey par défaut
  };
  markerLayers: L.Layer[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const marketId = this.route.snapshot.paramMap.get('id');
    console.log('Market ID from route:', marketId);
    this.market = this.markets.find((m) => m.id === marketId);
    console.log('Found market:', this.market);
    if (this.market) {
      this.mapOptions = {
        ...this.mapOptions,
        center: L.latLng(this.market.latitude, this.market.longitude),
      };
      this.markerLayers = [
        L.marker([this.market.latitude, this.market.longitude], {
          icon: L.icon({
            iconUrl:
              'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          }),
        }).bindPopup(this.market.name),
      ];
    } else {
      console.log('No market found for ID:', marketId);
    }
  }
}
