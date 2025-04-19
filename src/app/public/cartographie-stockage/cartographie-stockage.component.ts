import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { latLng, geoJSON, Layer } from 'leaflet';
import * as L from 'leaflet';
import Chart from 'chart.js/auto';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

// Interface pour typer un GeoJSON FeatureCollection
interface GeoJSONFeatureCollection {
  type: 'FeatureCollection';
  features: Array<any>;
  [key: string]: any;
}

@Component({
  selector: 'app-cartographie-stockage',
  // imports: [
  //   CommonModule,
  //   FormsModule,
  //   NzSelectModule,
  //   NzCardModule,
  //   NzTableModule,
  //   LeafletModule,
  // ],
  templateUrl: './cartographie-stockage.component.html',
  styleUrls: ['./cartographie-stockage.component.css'],
})
export class CartographieStockageComponent implements OnInit, AfterViewInit {
  selectedProduct: string = 'oignon';
  selectedYear: string = '2025';
  filteredStockageData: any[] = [];
  stockageLayers: Layer[] = [];
  stockageChart: any;
  stockageRepartitionChart: any;
  stockageByRegionChart: any;

  // Options de la carte sans fond (tuiles désactivées) et figée
  mapOptions = {
    layers: [],
    zoom: 5,
    center: latLng(17, 8),
    zoomControl: false,
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    touchZoom: false,
    keyboard: false,
  };

  // Variables pour stocker les GeoJSON chargés
  nigerBorderGeoJSON: GeoJSONFeatureCollection | undefined;
  nigerRegionsGeoJSON: GeoJSONFeatureCollection | undefined;

  // Données de stockage pour le Niger (par région, produit, année)
  stockageData = [
    {
      product: 'oignon',
      year: '2025',
      stats: [
        { region: 'Agadez', quantite: 10000, repartition: 5 },
        { region: 'Diffa', quantite: 14000, repartition: 7 },
        { region: 'Dosso', quantite: 30000, repartition: 20 },
        { region: 'Maradi', quantite: 24000, repartition: 15 },
        { region: 'Niamey', quantite: 6000, repartition: 3 },
        { region: 'Tahoua', quantite: 20000, repartition: 10 },
        { region: 'Tillabéry', quantite: 16000, repartition: 8 },
        { region: 'Zinder', quantite: 26000, repartition: 12 },
      ],
    },
    {
      product: 'oignon',
      year: '2024',
      stats: [
        { region: 'Agadez', quantite: 9000, repartition: 4 },
        { region: 'Diffa', quantite: 13000, repartition: 6 },
        { region: 'Dosso', quantite: 28000, repartition: 18 },
        { region: 'Maradi', quantite: 22000, repartition: 14 },
        { region: 'Niamey', quantite: 5600, repartition: 3 },
        { region: 'Tahoua', quantite: 18000, repartition: 9 },
        { region: 'Tillabéry', quantite: 15000, repartition: 7 },
        { region: 'Zinder', quantite: 24000, repartition: 11 },
      ],
    },
    {
      product: 'niebe',
      year: '2025',
      stats: [
        { region: 'Agadez', quantite: 8000, repartition: 4 },
        { region: 'Diffa', quantite: 11000, repartition: 6 },
        { region: 'Dosso', quantite: 27000, repartition: 15 },
        { region: 'Maradi', quantite: 24000, repartition: 13 },
        { region: 'Niamey', quantite: 5400, repartition: 3 },
        { region: 'Tahoua', quantite: 16000, repartition: 9 },
        { region: 'Tillabéry', quantite: 13500, repartition: 8 },
        { region: 'Zinder', quantite: 20000, repartition: 11 },
      ],
    },
    {
      product: 'sorgho',
      year: '2025',
      stats: [
        { region: 'Agadez', quantite: 14000, repartition: 5 },
        { region: 'Diffa', quantite: 18000, repartition: 7 },
        { region: 'Dosso', quantite: 50000, repartition: 20 },
        { region: 'Maradi', quantite: 40000, repartition: 15 },
        { region: 'Niamey', quantite: 10000, repartition: 4 },
        { region: 'Tahoua', quantite: 30000, repartition: 12 },
        { region: 'Tillabéry', quantite: 24000, repartition: 9 },
        { region: 'Zinder', quantite: 36000, repartition: 14 },
      ],
    },
    {
      product: 'arachide',
      year: '2025',
      stats: [
        { region: 'Agadez', quantite: 8000, repartition: 4 },
        { region: 'Diffa', quantite: 12000, repartition: 6 },
        { region: 'Dosso', quantite: 36000, repartition: 18 },
        { region: 'Maradi', quantite: 32000, repartition: 16 },
        { region: 'Niamey', quantite: 4000, repartition: 2 },
        { region: 'Tahoua', quantite: 20000, repartition: 10 },
        { region: 'Tillabéry', quantite: 16000, repartition: 8 },
        { region: 'Zinder', quantite: 28000, repartition: 14 },
      ],
    },
  ];

  constructor(private cdr: ChangeDetectorRef, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadGeoJSONFiles();
  }

  ngAfterViewInit(): void {
    this.initStockageCharts();
    this.updateData();
    this.cdr.detectChanges();
  }

  loadGeoJSONFiles(): void {
    Promise.all([
      this.http
        .get<GeoJSONFeatureCollection>('/assets/geojson/niger_border.json')
        .toPromise(),
      this.http
        .get<GeoJSONFeatureCollection>('/assets/geojson/niger_regions.json')
        .toPromise(),
    ])
      .then(([borderGeoJSON, regionsGeoJSON]) => {
        this.nigerBorderGeoJSON = borderGeoJSON;
        this.nigerRegionsGeoJSON = regionsGeoJSON;
        this.loadStockageGeoJSON();
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des GeoJSON :', error);
      });
  }

  loadStockageGeoJSON(): void {
    if (!this.nigerBorderGeoJSON || !this.nigerRegionsGeoJSON) {
      console.error('Un ou plusieurs GeoJSON non chargés pour stockage');
      return;
    }

    this.stockageLayers = [];

    const borderLayer = geoJSON(this.nigerBorderGeoJSON, {
      style: () => ({
        weight: 3,
        color: '#000',
        fillOpacity: 0,
      }),
    });

    const regionColors: { [key: string]: string } = {
      Agadez: '#ff6384',
      Diffa: '#36a2eb',
      Dosso: '#ffce56',
      Maradi: '#4bc0c0',
      Niamey: '#9966ff',
      Tahoua: '#ff9f40',
      Tillabéry: '#c9cbcf',
      Zinder: '#66cc99',
    };

    const regionsLayer = geoJSON(this.nigerRegionsGeoJSON, {
      style: (feature: any) => ({
        fillColor: regionColors[feature.properties.NAME_1] || '#52c41a',
        weight: 2,
        opacity: 1,
        color: '#000',
        fillOpacity: 0.7,
      }),
      onEachFeature: (feature, layer: L.GeoJSON) => {
        const region = feature.properties.NAME_1;
        const data = this.filteredStockageData.find((d) => d.region === region);

        const popupContent = data
          ? `
              <strong>${region}</strong><br>
              Quantité stockée: ${data.quantite} tonnes<br>
              Répartition: ${data.repartition}%
            `
          : `<strong>${region}</strong><br>Aucune donnée disponible`;

        layer.bindTooltip(popupContent, {
          sticky: true,
          className: 'leaflet-tooltip',
        });

        layer.on({
          mouseover: (e: any) => {
            e.target.setStyle({ fillOpacity: 0.9, weight: 3 });
          },
          mouseout: (e: any) => {
            e.target.setStyle({ fillOpacity: 0.7, weight: 2 });
          },
          click: () => {
            layer.openTooltip();
          },
        });
      },
    });

    const bounds = regionsLayer.getBounds();
    this.mapOptions.center = bounds.getCenter();
    this.mapOptions.zoom = 5;

    this.stockageLayers.push(borderLayer, regionsLayer);

    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);
  }

  updateData(): void {
    const stockageData = this.stockageData.find(
      (d) => d.product === this.selectedProduct && d.year === this.selectedYear
    );
    this.filteredStockageData = stockageData ? stockageData.stats : [];

    if (this.stockageLayers.length > 0) {
      this.stockageLayers.forEach((layer: any) => {
        if (layer.eachLayer) {
          layer.eachLayer((regionLayer: any) => {
            const region = regionLayer.feature?.properties?.NAME_1;
            if (region) {
              const data = this.filteredStockageData.find(
                (d) => d.region === region
              );
              const popupContent = data
                ? `
                    <strong>${region}</strong><br>
                    Quantité stockée: ${data.quantite} tonnes<br>
                    Répartition: ${data.repartition}%
                  `
                : `<strong>${region}</strong><br>Aucune donnée disponible`;
              regionLayer.setTooltipContent(popupContent);
            }
          });
        }
      });
    }

    if (
      this.stockageChart &&
      this.stockageRepartitionChart &&
      this.stockageByRegionChart
    ) {
      this.updateStockageCharts();
    }

    this.cdr.detectChanges();
  }

  initStockageCharts(): void {
    this.stockageChart = new Chart('stockageChart', {
      type: 'line',
      data: {
        labels: ['2023', '2024', '2025'],
        datasets: [],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, max: 100000 },
        },
      },
    });

    this.stockageRepartitionChart = new Chart('stockageRepartitionChart', {
      type: 'pie',
      data: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [
              '#ff6384',
              '#36a2eb',
              '#ffce56',
              '#4bc0c0',
              '#9966ff',
              '#ff9f40',
              '#c9cbcf',
              '#66cc99',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    this.stockageByRegionChart = new Chart('stockageByRegionChart', {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Quantité stockée (tonnes)',
            data: [],
            backgroundColor: '#ff6384',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  }

  updateStockageCharts(): void {
    const data = this.stockageData.find(
      (d) => d.product === this.selectedProduct && d.year === this.selectedYear
    );

    const regions = data ? data.stats.map((d: any) => d.region) : [];
    const quantites = data ? data.stats.map((d: any) => d.quantite) : [];
    const repartitions = data ? data.stats.map((d: any) => d.repartition) : [];

    if (this.stockageChart) {
      this.stockageChart.data.datasets = regions.map(
        (region: string, index: number) => ({
          label: region,
          data: quantites[index]
            ? [
                quantites[index] * 0.9,
                quantites[index] * 0.95,
                quantites[index],
              ]
            : [0, 0, 0],
          borderColor:
            this.stockageRepartitionChart?.data?.datasets[0]?.backgroundColor[
              index
            ] || '#000',
          fill: false,
        })
      );
      this.stockageChart.update();
    }

    if (this.stockageRepartitionChart) {
      this.stockageRepartitionChart.data.labels = regions;
      this.stockageRepartitionChart.data.datasets[0].data = repartitions;
      this.stockageRepartitionChart.update();
    }

    if (this.stockageByRegionChart) {
      this.stockageByRegionChart.data.labels = regions;
      this.stockageByRegionChart.data.datasets[0].data = quantites;
      this.stockageByRegionChart.update();
    }
  }
}
