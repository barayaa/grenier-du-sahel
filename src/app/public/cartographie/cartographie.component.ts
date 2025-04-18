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

// Interface pour typer un GeoJSON FeatureCollection
interface GeoJSONFeatureCollection {
  type: 'FeatureCollection';
  features: Array<any>;
  [key: string]: any;
}

@Component({
  selector: 'app-cartographie',
  templateUrl: './cartographie.component.html',
  styleUrls: ['./cartographie.component.css'],
})
export class CartographieComponent implements OnInit, AfterViewInit {
  selectedProduct: string = 'oignon';
  selectedYear: string = '2025';
  filteredData: any[] = [];
  layers: Layer[] = [];
  productionChart: any;
  repartitionChart: any;
  superficieChart: any;
  productionByRegionChart: any;

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

  // Données de production pour le Niger (par région, produit, année)
  productionData = [
    {
      product: 'oignon',
      year: '2025',
      stats: [
        {
          region: 'Agadez',
          superficie: 5000,
          production: 15000,
          repartition: 5,
        },
        {
          region: 'Diffa',
          superficie: 7000,
          production: 21000,
          repartition: 7,
        },
        {
          region: 'Dosso',
          superficie: 15000,
          production: 45000,
          repartition: 20,
        },
        {
          region: 'Maradi',
          superficie: 12000,
          production: 36000,
          repartition: 15,
        },
        {
          region: 'Niamey',
          superficie: 3000,
          production: 9000,
          repartition: 3,
        },
        {
          region: 'Tahoua',
          superficie: 10000,
          production: 30000,
          repartition: 10,
        },
        {
          region: 'Tillabéry',
          superficie: 8000,
          production: 24000,
          repartition: 8,
        },
        {
          region: 'Zinder',
          superficie: 13000,
          production: 39000,
          repartition: 12,
        },
      ],
    },
    {
      product: 'oignon',
      year: '2024',
      stats: [
        {
          region: 'Agadez',
          superficie: 4500,
          production: 13500,
          repartition: 4,
        },
        {
          region: 'Diffa',
          superficie: 6500,
          production: 19500,
          repartition: 6,
        },
        {
          region: 'Dosso',
          superficie: 14000,
          production: 42000,
          repartition: 18,
        },
        {
          region: 'Maradi',
          superficie: 11000,
          production: 33000,
          repartition: 14,
        },
        {
          region: 'Niamey',
          superficie: 2800,
          production: 8400,
          repartition: 3,
        },
        {
          region: 'Tahoua',
          superficie: 9000,
          production: 27000,
          repartition: 9,
        },
        {
          region: 'Tillabéry',
          superficie: 7500,
          production: 22500,
          repartition: 7,
        },
        {
          region: 'Zinder',
          superficie: 12000,
          production: 36000,
          repartition: 11,
        },
      ],
    },
    {
      product: 'niebe',
      year: '2025',
      stats: [
        {
          region: 'Agadez',
          superficie: 6000,
          production: 12000,
          repartition: 4,
        },
        {
          region: 'Diffa',
          superficie: 8000,
          production: 16000,
          repartition: 6,
        },
        {
          region: 'Dosso',
          superficie: 20000,
          production: 40000,
          repartition: 15,
        },
        {
          region: 'Maradi',
          superficie: 18000,
          production: 36000,
          repartition: 13,
        },
        {
          region: 'Niamey',
          superficie: 4000,
          production: 8000,
          repartition: 3,
        },
        {
          region: 'Tahoua',
          superficie: 12000,
          production: 24000,
          repartition: 9,
        },
        {
          region: 'Tillabéry',
          superficie: 10000,
          production: 20000,
          repartition: 8,
        },
        {
          region: 'Zinder',
          superficie: 15000,
          production: 30000,
          repartition: 11,
        },
      ],
    },
    {
      product: 'sorgho',
      year: '2025',
      stats: [
        {
          region: 'Agadez',
          superficie: 7000,
          production: 21000,
          repartition: 5,
        },
        {
          region: 'Diffa',
          superficie: 9000,
          production: 27000,
          repartition: 7,
        },
        {
          region: 'Dosso',
          superficie: 25000,
          production: 75000,
          repartition: 20,
        },
        {
          region: 'Maradi',
          superficie: 20000,
          production: 60000,
          repartition: 15,
        },
        {
          region: 'Niamey',
          superficie: 5000,
          production: 15000,
          repartition: 4,
        },
        {
          region: 'Tahoua',
          superficie: 15000,
          production: 45000,
          repartition: 12,
        },
        {
          region: 'Tillabéry',
          superficie: 12000,
          production: 36000,
          repartition: 9,
        },
        {
          region: 'Zinder',
          superficie: 18000,
          production: 54000,
          repartition: 14,
        },
      ],
    },
    {
      product: 'arachide',
      year: '2025',
      stats: [
        {
          region: 'Agadez',
          superficie: 4000,
          production: 12000,
          repartition: 4,
        },
        {
          region: 'Diffa',
          superficie: 6000,
          production: 18000,
          repartition: 6,
        },
        {
          region: 'Dosso',
          superficie: 18000,
          production: 54000,
          repartition: 18,
        },
        {
          region: 'Maradi',
          superficie: 16000,
          production: 48000,
          repartition: 16,
        },
        {
          region: 'Niamey',
          superficie: 2000,
          production: 6000,
          repartition: 2,
        },
        {
          region: 'Tahoua',
          superficie: 10000,
          production: 30000,
          repartition: 10,
        },
        {
          region: 'Tillabéry',
          superficie: 8000,
          production: 24000,
          repartition: 8,
        },
        {
          region: 'Zinder',
          superficie: 14000,
          production: 42000,
          repartition: 14,
        },
      ],
    },
  ];

  constructor(private cdr: ChangeDetectorRef, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadGeoJSONFiles();
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit appelé');
    console.log('Map options :', this.mapOptions);
    console.log('Layers :', this.layers);
    this.initCharts();
    this.updateData();
    this.cdr.detectChanges();
    console.log('Change detection dans ngAfterViewInit déclenchée');
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
        console.log('Border GeoJSON:', borderGeoJSON);
        console.log('Regions GeoJSON:', regionsGeoJSON);

        if (!borderGeoJSON || borderGeoJSON.type !== 'FeatureCollection') {
          console.error(
            "niger_border.json n'est pas un GeoJSON FeatureCollection valide"
          );
          return;
        }
        if (borderGeoJSON.features.length !== 1) {
          console.warn(
            `Attention : niger_border.json contient ${borderGeoJSON.features.length} features, mais devrait en contenir 1 (frontières nationales). Vérifie que tu as téléchargé gadm41_NER_0.json.`
          );
        }

        if (!regionsGeoJSON || regionsGeoJSON.type !== 'FeatureCollection') {
          console.error(
            "niger_regions.json n'est pas un GeoJSON FeatureCollection valide"
          );
          return;
        }
        if (regionsGeoJSON.features.length !== 8) {
          console.warn(
            `Attention : niger_regions.json contient ${regionsGeoJSON.features.length} features, mais devrait en contenir 8 (une par région). Vérifie que tu as téléchargé gadm41_NER_1.json.`
          );
        }

        const regionNames = regionsGeoJSON.features.map(
          (feature: any) => feature.properties.NAME_1
        );
        const uniqueRegionNames = new Set(regionNames);
        if (uniqueRegionNames.size !== regionNames.length) {
          console.warn(
            'Doublons détectés dans les noms des régions :',
            regionNames
          );
        } else {
          console.log('Noms des régions (NAME_1) :', regionNames);
        }

        this.nigerBorderGeoJSON = borderGeoJSON;
        this.nigerRegionsGeoJSON = regionsGeoJSON;
        console.log('Appel de loadGeoJSON()');
        this.loadGeoJSON();
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des GeoJSON :', error);
      });
  }

  loadGeoJSON(): void {
    if (!this.nigerBorderGeoJSON || !this.nigerRegionsGeoJSON) {
      console.error('Un ou plusieurs GeoJSON non chargés');
      return;
    }

    console.log('Début de loadGeoJSON()');
    this.layers = [];
    console.log('Couches vidées :', this.layers);

    const borderLayer = geoJSON(this.nigerBorderGeoJSON, {
      style: () => ({
        weight: 3,
        color: '#000',
        fillOpacity: 0,
      }),
    });
    console.log('Couche borderLayer créée :', borderLayer);

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

    console.log('Création de la couche regionsLayer');
    const regionsLayer = geoJSON(this.nigerRegionsGeoJSON, {
      style: (feature: any) => {
        console.log(`Style pour la région : ${feature.properties.NAME_1}`);
        return {
          fillColor: regionColors[feature.properties.NAME_1] || '#52c41a',
          weight: 2,
          opacity: 1,
          color: '#000',
          fillOpacity: 0.7,
        };
      },
      onEachFeature: (feature, layer: L.GeoJSON) => {
        const region = feature.properties.NAME_1;
        console.log(`Ajout du tooltip pour la région : ${region}`);
        const data = this.filteredData.find((d) => d.region === region);

        const popupContent = data
          ? `
              <strong>${region}</strong><br>
              Superficie cultivée: ${data.superficie} ha<br>
              Production: ${data.production} tonnes<br>
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
    console.log('Couche regionsLayer créée :', regionsLayer);

    const bounds = regionsLayer.getBounds();
    console.log('Bounds calculés :', bounds);
    this.mapOptions.center = bounds.getCenter();
    this.mapOptions.zoom = 5;
    console.log('Map options mises à jour :', this.mapOptions);

    this.layers.push(borderLayer, regionsLayer);
    console.log('Couches ajoutées aux layers :', this.layers);

    borderLayer.on('add', () => {
      console.log('Couche borderLayer ajoutée à la carte !');
    });
    regionsLayer.on('add', () => {
      console.log('Couche regionsLayer ajoutée à la carte !');
    });

    setTimeout(() => {
      this.cdr.detectChanges();
      console.log('Change detection déclenchée avec délai');
    }, 100);
  }

  updateData(): void {
    const data = this.productionData.find(
      (d) => d.product === this.selectedProduct && d.year === this.selectedYear
    );
    this.filteredData = data ? data.stats : [];

    if (this.layers.length > 0) {
      this.layers.forEach((layer: any) => {
        if (layer.eachLayer) {
          layer.eachLayer((regionLayer: any) => {
            const region = regionLayer.feature?.properties?.NAME_1;
            if (region) {
              const data = this.filteredData.find((d) => d.region === region);
              const popupContent = data
                ? `
                    <strong>${region}</strong><br>
                    Superficie cultivée: ${data.superficie} ha<br>
                    Production: ${data.production} tonnes<br>
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
      this.productionChart &&
      this.repartitionChart &&
      this.superficieChart &&
      this.productionByRegionChart
    ) {
      this.updateCharts();
    }

    this.cdr.detectChanges();
  }

  initCharts(): void {
    this.productionChart = new Chart('productionChart', {
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

    this.repartitionChart = new Chart('repartitionChart', {
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

    this.superficieChart = new Chart('superficieChart', {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Superficie (ha)',
            data: [],
            backgroundColor: '#36a2eb',
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

    this.productionByRegionChart = new Chart('productionByRegionChart', {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Production (tonnes)',
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

  updateCharts(): void {
    const data = this.productionData.find(
      (d) => d.product === this.selectedProduct && d.year === this.selectedYear
    );

    const regions = data ? data.stats.map((d: any) => d.region) : [];
    const superficies = data ? data.stats.map((d: any) => d.superficie) : [];
    const productions = data ? data.stats.map((d: any) => d.production) : [];
    const repartitions = data ? data.stats.map((d: any) => d.repartition) : [];

    if (this.productionChart) {
      this.productionChart.data.datasets = regions.map(
        (region: string, index: number) => ({
          label: region,
          data: productions[index]
            ? [
                productions[index] * 0.9,
                productions[index] * 0.95,
                productions[index],
              ]
            : [0, 0, 0],
          borderColor:
            this.repartitionChart?.data?.datasets[0]?.backgroundColor[index] ||
            '#000',
          fill: false,
        })
      );
      this.productionChart.update();
    }

    if (this.repartitionChart) {
      this.repartitionChart.data.labels = regions;
      this.repartitionChart.data.datasets[0].data = repartitions;
      this.repartitionChart.update();
    }

    if (this.superficieChart) {
      this.superficieChart.data.labels = regions;
      this.superficieChart.data.datasets[0].data = superficies;
      this.superficieChart.update();
    }

    if (this.productionByRegionChart) {
      this.productionByRegionChart.data.labels = regions;
      this.productionByRegionChart.data.datasets[0].data = productions;
      this.productionByRegionChart.update();
    }
  }
}

// 11

// import {
//   Component,
//   OnInit,
//   AfterViewInit,
//   ChangeDetectorRef,
// } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { latLng, geoJSON, Layer } from 'leaflet';
// import * as L from 'leaflet';
// import Chart from 'chart.js/auto';

// // Interface pour typer un GeoJSON FeatureCollection
// interface GeoJSONFeatureCollection {
//   type: 'FeatureCollection';
//   features: Array<any>;
//   [key: string]: any;
// }

// @Component({
//   selector: 'app-cartographie',
//   templateUrl: './cartographie.component.html',
//   styleUrls: ['./cartographie.component.css'],
// })
// export class CartographieComponent implements OnInit, AfterViewInit {
//   selectedProduct: string = 'oignon';
//   selectedYear: string = '2025';
//   filteredProductionData: any[] = [];
//   filteredStockageData: any[] = [];
//   productionLayers: Layer[] = [];
//   stockageLayers: Layer[] = [];
//   productionChart: any;
//   productionRepartitionChart: any;
//   productionSuperficieChart: any;
//   productionByRegionChart: any;
//   stockageChart: any;
//   stockageRepartitionChart: any;
//   stockageByRegionChart: any;

//   // Options de la carte sans fond (tuiles désactivées) et figée
//   mapOptions = {
//     layers: [],
//     zoom: 5,
//     center: latLng(17, 8),
//     zoomControl: false,
//     dragging: false,
//     scrollWheelZoom: false,
//     doubleClickZoom: false,
//     boxZoom: false,
//     touchZoom: false,
//     keyboard: false,
//   };

//   // Variables pour stocker les GeoJSON chargés
//   nigerBorderGeoJSON: GeoJSONFeatureCollection | undefined;
//   nigerRegionsGeoJSON: GeoJSONFeatureCollection | undefined;

//   // Données de production pour le Niger (par région, produit, année)
//   productionData = [
//     {
//       product: 'oignon',
//       year: '2025',
//       stats: [
//         {
//           region: 'Agadez',
//           superficie: 5000,
//           production: 15000,
//           repartition: 5,
//         },
//         {
//           region: 'Diffa',
//           superficie: 7000,
//           production: 21000,
//           repartition: 7,
//         },
//         {
//           region: 'Dosso',
//           superficie: 15000,
//           production: 45000,
//           repartition: 20,
//         },
//         {
//           region: 'Maradi',
//           superficie: 12000,
//           production: 36000,
//           repartition: 15,
//         },
//         {
//           region: 'Niamey',
//           superficie: 3000,
//           production: 9000,
//           repartition: 3,
//         },
//         {
//           region: 'Tahoua',
//           superficie: 10000,
//           production: 30000,
//           repartition: 10,
//         },
//         {
//           region: 'Tillabéry',
//           superficie: 8000,
//           production: 24000,
//           repartition: 8,
//         },
//         {
//           region: 'Zinder',
//           superficie: 13000,
//           production: 39000,
//           repartition: 12,
//         },
//       ],
//     },
//     {
//       product: 'oignon',
//       year: '2024',
//       stats: [
//         {
//           region: 'Agadez',
//           superficie: 4500,
//           production: 13500,
//           repartition: 4,
//         },
//         {
//           region: 'Diffa',
//           superficie: 6500,
//           production: 19500,
//           repartition: 6,
//         },
//         {
//           region: 'Dosso',
//           superficie: 14000,
//           production: 42000,
//           repartition: 18,
//         },
//         {
//           region: 'Maradi',
//           superficie: 11000,
//           production: 33000,
//           repartition: 14,
//         },
//         {
//           region: 'Niamey',
//           superficie: 2800,
//           production: 8400,
//           repartition: 3,
//         },
//         {
//           region: 'Tahoua',
//           superficie: 9000,
//           production: 27000,
//           repartition: 9,
//         },
//         {
//           region: 'Tillabéry',
//           superficie: 7500,
//           production: 22500,
//           repartition: 7,
//         },
//         {
//           region: 'Zinder',
//           superficie: 12000,
//           production: 36000,
//           repartition: 11,
//         },
//       ],
//     },
//     {
//       product: 'niebe',
//       year: '2025',
//       stats: [
//         {
//           region: 'Agadez',
//           superficie: 6000,
//           production: 12000,
//           repartition: 4,
//         },
//         {
//           region: 'Diffa',
//           superficie: 8000,
//           production: 16000,
//           repartition: 6,
//         },
//         {
//           region: 'Dosso',
//           superficie: 20000,
//           production: 40000,
//           repartition: 15,
//         },
//         {
//           region: 'Maradi',
//           superficie: 18000,
//           production: 36000,
//           repartition: 13,
//         },
//         {
//           region: 'Niamey',
//           superficie: 4000,
//           production: 8000,
//           repartition: 3,
//         },
//         {
//           region: 'Tahoua',
//           superficie: 12000,
//           production: 24000,
//           repartition: 9,
//         },
//         {
//           region: 'Tillabéry',
//           superficie: 10000,
//           production: 20000,
//           repartition: 8,
//         },
//         {
//           region: 'Zinder',
//           superficie: 15000,
//           production: 30000,
//           repartition: 11,
//         },
//       ],
//     },
//     {
//       product: 'sorgho',
//       year: '2025',
//       stats: [
//         {
//           region: 'Agadez',
//           superficie: 7000,
//           production: 21000,
//           repartition: 5,
//         },
//         {
//           region: 'Diffa',
//           superficie: 9000,
//           production: 27000,
//           repartition: 7,
//         },
//         {
//           region: 'Dosso',
//           superficie: 25000,
//           production: 75000,
//           repartition: 20,
//         },
//         {
//           region: 'Maradi',
//           superficie: 20000,
//           production: 60000,
//           repartition: 15,
//         },
//         {
//           region: 'Niamey',
//           superficie: 5000,
//           production: 15000,
//           repartition: 4,
//         },
//         {
//           region: 'Tahoua',
//           superficie: 15000,
//           production: 45000,
//           repartition: 12,
//         },
//         {
//           region: 'Tillabéry',
//           superficie: 12000,
//           production: 36000,
//           repartition: 9,
//         },
//         {
//           region: 'Zinder',
//           superficie: 18000,
//           production: 54000,
//           repartition: 14,
//         },
//       ],
//     },
//     {
//       product: 'arachide',
//       year: '2025',
//       stats: [
//         {
//           region: 'Agadez',
//           superficie: 4000,
//           production: 12000,
//           repartition: 4,
//         },
//         {
//           region: 'Diffa',
//           superficie: 6000,
//           production: 18000,
//           repartition: 6,
//         },
//         {
//           region: 'Dosso',
//           superficie: 18000,
//           production: 54000,
//           repartition: 18,
//         },
//         {
//           region: 'Maradi',
//           superficie: 16000,
//           production: 48000,
//           repartition: 16,
//         },
//         {
//           region: 'Niamey',
//           superficie: 2000,
//           production: 6000,
//           repartition: 2,
//         },
//         {
//           region: 'Tahoua',
//           superficie: 10000,
//           production: 30000,
//           repartition: 10,
//         },
//         {
//           region: 'Tillabéry',
//           superficie: 8000,
//           production: 24000,
//           repartition: 8,
//         },
//         {
//           region: 'Zinder',
//           superficie: 14000,
//           production: 42000,
//           repartition: 14,
//         },
//       ],
//     },
//   ];

//   // Données de stockage pour le Niger (par région, produit, année)
//   stockageData = [
//     {
//       product: 'oignon',
//       year: '2025',
//       stats: [
//         { region: 'Agadez', quantite: 10000, repartition: 5 },
//         { region: 'Diffa', quantite: 14000, repartition: 7 },
//         { region: 'Dosso', quantite: 30000, repartition: 20 },
//         { region: 'Maradi', quantite: 24000, repartition: 15 },
//         { region: 'Niamey', quantite: 6000, repartition: 3 },
//         { region: 'Tahoua', quantite: 20000, repartition: 10 },
//         { region: 'Tillabéry', quantite: 16000, repartition: 8 },
//         { region: 'Zinder', quantite: 26000, repartition: 12 },
//       ],
//     },
//     {
//       product: 'oignon',
//       year: '2024',
//       stats: [
//         { region: 'Agadez', quantite: 9000, repartition: 4 },
//         { region: 'Diffa', quantite: 13000, repartition: 6 },
//         { region: 'Dosso', quantite: 28000, repartition: 18 },
//         { region: 'Maradi', quantite: 22000, repartition: 14 },
//         { region: 'Niamey', quantite: 5600, repartition: 3 },
//         { region: 'Tahoua', quantite: 18000, repartition: 9 },
//         { region: 'Tillabéry', quantite: 15000, repartition: 7 },
//         { region: 'Zinder', quantite: 24000, repartition: 11 },
//       ],
//     },
//     {
//       product: 'niebe',
//       year: '2025',
//       stats: [
//         { region: 'Agadez', quantite: 8000, repartition: 4 },
//         { region: 'Diffa', quantite: 11000, repartition: 6 },
//         { region: 'Dosso', quantite: 27000, repartition: 15 },
//         { region: 'Maradi', quantite: 24000, repartition: 13 },
//         { region: 'Niamey', quantite: 5400, repartition: 3 },
//         { region: 'Tahoua', quantite: 16000, repartition: 9 },
//         { region: 'Tillabéry', quantite: 13500, repartition: 8 },
//         { region: 'Zinder', quantite: 20000, repartition: 11 },
//       ],
//     },
//     {
//       product: 'sorgho',
//       year: '2025',
//       stats: [
//         { region: 'Agadez', quantite: 14000, repartition: 5 },
//         { region: 'Diffa', quantite: 18000, repartition: 7 },
//         { region: 'Dosso', quantite: 50000, repartition: 20 },
//         { region: 'Maradi', quantite: 40000, repartition: 15 },
//         { region: 'Niamey', quantite: 10000, repartition: 4 },
//         { region: 'Tahoua', quantite: 30000, repartition: 12 },
//         { region: 'Tillabéry', quantite: 24000, repartition: 9 },
//         { region: 'Zinder', quantite: 36000, repartition: 14 },
//       ],
//     },
//     {
//       product: 'arachide',
//       year: '2025',
//       stats: [
//         { region: 'Agadez', quantite: 8000, repartition: 4 },
//         { region: 'Diffa', quantite: 12000, repartition: 6 },
//         { region: 'Dosso', quantite: 36000, repartition: 18 },
//         { region: 'Maradi', quantite: 32000, repartition: 16 },
//         { region: 'Niamey', quantite: 4000, repartition: 2 },
//         { region: 'Tahoua', quantite: 20000, repartition: 10 },
//         { region: 'Tillabéry', quantite: 16000, repartition: 8 },
//         { region: 'Zinder', quantite: 28000, repartition: 14 },
//       ],
//     },
//   ];

//   constructor(private cdr: ChangeDetectorRef, private http: HttpClient) {}

//   ngOnInit(): void {
//     this.loadGeoJSONFiles();
//   }

//   ngAfterViewInit(): void {
//     console.log('ngAfterViewInit appelé');
//     console.log('Map options :', this.mapOptions);
//     console.log('Production Layers :', this.productionLayers);
//     console.log('Stockage Layers :', this.stockageLayers);
//     this.initProductionCharts();
//     this.initStockageCharts();
//     this.updateData();
//     this.cdr.detectChanges();
//     console.log('Change detection dans ngAfterViewInit déclenchée');
//   }

//   loadGeoJSONFiles(): void {
//     Promise.all([
//       this.http
//         .get<GeoJSONFeatureCollection>('/assets/geojson/niger_border.json')
//         .toPromise(),
//       this.http
//         .get<GeoJSONFeatureCollection>('/assets/geojson/niger_regions.json')
//         .toPromise(),
//     ])
//       .then(([borderGeoJSON, regionsGeoJSON]) => {
//         console.log('Border GeoJSON:', borderGeoJSON);
//         console.log('Regions GeoJSON:', regionsGeoJSON);

//         if (!borderGeoJSON || borderGeoJSON.type !== 'FeatureCollection') {
//           console.error(
//             "niger_border.json n'est pas un GeoJSON FeatureCollection valide"
//           );
//           return;
//         }
//         if (borderGeoJSON.features.length !== 1) {
//           console.warn(
//             `Attention : niger_border.json contient ${borderGeoJSON.features.length} features, mais devrait en contenir 1 (frontières nationales). Vérifie que tu as téléchargé gadm41_NER_0.json.`
//           );
//         }

//         if (!regionsGeoJSON || regionsGeoJSON.type !== 'FeatureCollection') {
//           console.error(
//             "niger_regions.json n'est pas un GeoJSON FeatureCollection valide"
//           );
//           return;
//         }
//         if (regionsGeoJSON.features.length !== 8) {
//           console.warn(
//             `Attention : niger_regions.json contient ${regionsGeoJSON.features.length} features, mais devrait en contenir 8 (une par région). Vérifie que tu as téléchargé gadm41_NER_1.json.`
//           );
//         }

//         const regionNames = regionsGeoJSON.features.map(
//           (feature: any) => feature.properties.NAME_1
//         );
//         const uniqueRegionNames = new Set(regionNames);
//         if (uniqueRegionNames.size !== regionNames.length) {
//           console.warn(
//             'Doublons détectés dans les noms des régions :',
//             regionNames
//           );
//         } else {
//           console.log('Noms des régions (NAME_1) :', regionNames);
//         }

//         this.nigerBorderGeoJSON = borderGeoJSON;
//         this.nigerRegionsGeoJSON = regionsGeoJSON;
//         console.log('Appel de loadGeoJSON pour production et stockage');
//         this.loadProductionGeoJSON();
//         this.loadStockageGeoJSON();
//       })
//       .catch((error) => {
//         console.error('Erreur lors du chargement des GeoJSON :', error);
//       });
//   }

//   loadProductionGeoJSON(): void {
//     if (!this.nigerBorderGeoJSON || !this.nigerRegionsGeoJSON) {
//       console.error('Un ou plusieurs GeoJSON non chargés pour production');
//       return;
//     }

//     console.log('Début de loadProductionGeoJSON()');
//     this.productionLayers = [];
//     console.log('Couches production vidées :', this.productionLayers);

//     const borderLayer = geoJSON(this.nigerBorderGeoJSON, {
//       style: () => ({
//         weight: 3,
//         color: '#000',
//         fillOpacity: 0,
//       }),
//     });
//     console.log('Couche borderLayer créée pour production :', borderLayer);

//     const regionColors: { [key: string]: string } = {
//       Agadez: '#ff6384',
//       Diffa: '#36a2eb',
//       Dosso: '#ffce56',
//       Maradi: '#4bc0c0',
//       Niamey: '#9966ff',
//       Tahoua: '#ff9f40',
//       Tillabéry: '#c9cbcf',
//       Zinder: '#66cc99',
//     };

//     console.log('Création de la couche regionsLayer pour production');
//     const regionsLayer = geoJSON(this.nigerRegionsGeoJSON, {
//       style: (feature: any) => {
//         console.log(
//           `Style pour la région (production) : ${feature.properties.NAME_1}`
//         );
//         return {
//           fillColor: regionColors[feature.properties.NAME_1] || '#52c41a',
//           weight: 2,
//           opacity: 1,
//           color: '#000',
//           fillOpacity: 0.7,
//         };
//       },
//       onEachFeature: (feature, layer: L.GeoJSON) => {
//         const region = feature.properties.NAME_1;
//         console.log(`Ajout du tooltip pour la région (production) : ${region}`);
//         const data = this.filteredProductionData.find(
//           (d) => d.region === region
//         );

//         const popupContent = data
//           ? `
//               <strong>${region}</strong><br>
//               Superficie cultivée: ${data.superficie} ha<br>
//               Production: ${data.production} tonnes<br>
//               Répartition: ${data.repartition}%
//             `
//           : `<strong>${region}</strong><br>Aucune donnée disponible`;

//         layer.bindTooltip(popupContent, {
//           sticky: true,
//           className: 'leaflet-tooltip',
//         });

//         layer.on({
//           mouseover: (e: any) => {
//             e.target.setStyle({ fillOpacity: 0.9, weight: 3 });
//           },
//           mouseout: (e: any) => {
//             e.target.setStyle({ fillOpacity: 0.7, weight: 2 });
//           },
//           click: () => {
//             layer.openTooltip();
//           },
//         });
//       },
//     });
//     console.log('Couche regionsLayer créée pour production :', regionsLayer);

//     const bounds = regionsLayer.getBounds();
//     console.log('Bounds calculés pour production :', bounds);
//     this.mapOptions.center = bounds.getCenter();
//     this.mapOptions.zoom = 5;
//     console.log('Map options mises à jour pour production :', this.mapOptions);

//     this.productionLayers.push(borderLayer, regionsLayer);
//     console.log(
//       'Couches ajoutées aux productionLayers :',
//       this.productionLayers
//     );

//     borderLayer.on('add', () => {
//       console.log('Couche borderLayer ajoutée à la carte production !');
//     });
//     regionsLayer.on('add', () => {
//       console.log('Couche regionsLayer ajoutée à la carte production !');
//     });

//     setTimeout(() => {
//       this.cdr.detectChanges();
//       console.log('Change detection déclenchée pour production avec délai');
//     }, 100);
//   }

//   loadStockageGeoJSON(): void {
//     if (!this.nigerBorderGeoJSON || !this.nigerRegionsGeoJSON) {
//       console.error('Un ou plusieurs GeoJSON non chargés pour stockage');
//       return;
//     }

//     console.log('Début de loadStockageGeoJSON()');
//     this.stockageLayers = [];
//     console.log('Couches stockage vidées :', this.stockageLayers);

//     const borderLayer = geoJSON(this.nigerBorderGeoJSON, {
//       style: () => ({
//         weight: 3,
//         color: '#000',
//         fillOpacity: 0,
//       }),
//     });
//     console.log('Couche borderLayer créée pour stockage :', borderLayer);

//     const regionColors: { [key: string]: string } = {
//       Agadez: '#ff6384',
//       Diffa: '#36a2eb',
//       Dosso: '#ffce56',
//       Maradi: '#4bc0c0',
//       Niamey: '#9966ff',
//       Tahoua: '#ff9f40',
//       Tillabéry: '#c9cbcf',
//       Zinder: '#66cc99',
//     };

//     console.log('Création de la couche regionsLayer pour stockage');
//     const regionsLayer = geoJSON(this.nigerRegionsGeoJSON, {
//       style: (feature: any) => {
//         console.log(
//           `Style pour la région (stockage) : ${feature.properties.NAME_1}`
//         );
//         return {
//           fillColor: regionColors[feature.properties.NAME_1] || '#52c41a',
//           weight: 2,
//           opacity: 1,
//           color: '#000',
//           fillOpacity: 0.7,
//         };
//       },
//       onEachFeature: (feature, layer: L.GeoJSON) => {
//         const region = feature.properties.NAME_1;
//         console.log(`Ajout du tooltip pour la région (stockage) : ${region}`);
//         const data = this.filteredStockageData.find((d) => d.region === region);

//         const popupContent = data
//           ? `
//               <strong>${region}</strong><br>
//               Quantité stockée: ${data.quantite} tonnes<br>
//               Répartition: ${data.repartition}%
//             `
//           : `<strong>${region}</strong><br>Aucune donnée disponible`;

//         layer.bindTooltip(popupContent, {
//           sticky: true,
//           className: 'leaflet-tooltip',
//         });

//         layer.on({
//           mouseover: (e: any) => {
//             e.target.setStyle({ fillOpacity: 0.9, weight: 3 });
//           },
//           mouseout: (e: any) => {
//             e.target.setStyle({ fillOpacity: 0.7, weight: 2 });
//           },
//           click: () => {
//             layer.openTooltip();
//           },
//         });
//       },
//     });
//     console.log('Couche regionsLayer créée pour stockage :', regionsLayer);

//     const bounds = regionsLayer.getBounds();
//     console.log('Bounds calculés pour stockage :', bounds);
//     this.mapOptions.center = bounds.getCenter();
//     this.mapOptions.zoom = 5;
//     console.log('Map options mises à jour pour stockage :', this.mapOptions);

//     this.stockageLayers.push(borderLayer, regionsLayer);
//     console.log('Couches ajoutées aux stockageLayers :', this.stockageLayers);

//     borderLayer.on('add', () => {
//       console.log('Couche borderLayer ajoutée à la carte stockage !');
//     });
//     regionsLayer.on('add', () => {
//       console.log('Couche regionsLayer ajoutée à la carte stockage !');
//     });

//     setTimeout(() => {
//       this.cdr.detectChanges();
//       console.log('Change detection déclenchée pour stockage avec délai');
//     }, 100);
//   }

//   updateData(): void {
//     // Mise à jour des données de production
//     const productionData = this.productionData.find(
//       (d) => d.product === this.selectedProduct && d.year === this.selectedYear
//     );
//     this.filteredProductionData = productionData ? productionData.stats : [];

//     if (this.productionLayers.length > 0) {
//       this.productionLayers.forEach((layer: any) => {
//         if (layer.eachLayer) {
//           layer.eachLayer((regionLayer: any) => {
//             const region = regionLayer.feature?.properties?.NAME_1;
//             if (region) {
//               const data = this.filteredProductionData.find(
//                 (d) => d.region === region
//               );
//               const popupContent = data
//                 ? `
//                     <strong>${region}</strong><br>
//                     Superficie cultivée: ${data.superficie} ha<br>
//                     Production: ${data.production} tonnes<br>
//                     Répartition: ${data.repartition}%
//                   `
//                 : `<strong>${region}</strong><br>Aucune donnée disponible`;
//               regionLayer.setTooltipContent(popupContent);
//             }
//           });
//         }
//       });
//     }

//     // Mise à jour des données de stockage
//     const stockageData = this.stockageData.find(
//       (d) => d.product === this.selectedProduct && d.year === this.selectedYear
//     );
//     this.filteredStockageData = stockageData ? stockageData.stats : [];

//     if (this.stockageLayers.length > 0) {
//       this.stockageLayers.forEach((layer: any) => {
//         if (layer.eachLayer) {
//           layer.eachLayer((regionLayer: any) => {
//             const region = regionLayer.feature?.properties?.NAME_1;
//             if (region) {
//               const data = this.filteredStockageData.find(
//                 (d) => d.region === region
//               );
//               const popupContent = data
//                 ? `
//                     <strong>${region}</strong><br>
//                     Quantité stockée: ${data.quantite} tonnes<br>
//                     Répartition: ${data.repartition}%
//                   `
//                 : `<strong>${region}</strong><br>Aucune donnée disponible`;
//               regionLayer.setTooltipContent(popupContent);
//             }
//           });
//         }
//       });
//     }

//     // Mise à jour des graphiques
//     if (
//       this.productionChart &&
//       this.productionRepartitionChart &&
//       this.productionSuperficieChart &&
//       this.productionByRegionChart
//     ) {
//       this.updateProductionCharts();
//     }

//     if (
//       this.stockageChart &&
//       this.stockageRepartitionChart &&
//       this.stockageByRegionChart
//     ) {
//       this.updateStockageCharts();
//     }

//     this.cdr.detectChanges();
//   }

//   initProductionCharts(): void {
//     this.productionChart = new Chart('productionChart', {
//       type: 'line',
//       data: {
//         labels: ['2023', '2024', '2025'],
//         datasets: [],
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//           y: { beginAtZero: true, max: 100000 },
//         },
//       },
//     });

//     this.productionRepartitionChart = new Chart('productionRepartitionChart', {
//       type: 'pie',
//       data: {
//         labels: [],
//         datasets: [
//           {
//             data: [],
//             backgroundColor: [
//               '#ff6384',
//               '#36a2eb',
//               '#ffce56',
//               '#4bc0c0',
//               '#9966ff',
//               '#ff9f40',
//               '#c9cbcf',
//               '#66cc99',
//             ],
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//       },
//     });

//     this.productionSuperficieChart = new Chart('productionSuperficieChart', {
//       type: 'bar',
//       data: {
//         labels: [],
//         datasets: [
//           {
//             label: 'Superficie (ha)',
//             data: [],
//             backgroundColor: '#36a2eb',
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//           y: { beginAtZero: true },
//         },
//       },
//     });

//     this.productionByRegionChart = new Chart('productionByRegionChart', {
//       type: 'bar',
//       data: {
//         labels: [],
//         datasets: [
//           {
//             label: 'Production (tonnes)',
//             data: [],
//             backgroundColor: '#ff6384',
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//           y: { beginAtZero: true },
//         },
//       },
//     });
//   }

//   initStockageCharts(): void {
//     this.stockageChart = new Chart('stockageChart', {
//       type: 'line',
//       data: {
//         labels: ['2023', '2024', '2025'],
//         datasets: [],
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//           y: { beginAtZero: true, max: 100000 },
//         },
//       },
//     });

//     this.stockageRepartitionChart = new Chart('stockageRepartitionChart', {
//       type: 'pie',
//       data: {
//         labels: [],
//         datasets: [
//           {
//             data: [],
//             backgroundColor: [
//               '#ff6384',
//               '#36a2eb',
//               '#ffce56',
//               '#4bc0c0',
//               '#9966ff',
//               '#ff9f40',
//               '#c9cbcf',
//               '#66cc99',
//             ],
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//       },
//     });

//     this.stockageByRegionChart = new Chart('stockageByRegionChart', {
//       type: 'bar',
//       data: {
//         labels: [],
//         datasets: [
//           {
//             label: 'Quantité stockée (tonnes)',
//             data: [],
//             backgroundColor: '#ff6384',
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//           y: { beginAtZero: true },
//         },
//       },
//     });
//   }

//   updateProductionCharts(): void {
//     const data = this.productionData.find(
//       (d) => d.product === this.selectedProduct && d.year === this.selectedYear
//     );

//     const regions = data ? data.stats.map((d: any) => d.region) : [];
//     const superficies = data ? data.stats.map((d: any) => d.superficie) : [];
//     const productions = data ? data.stats.map((d: any) => d.production) : [];
//     const repartitions = data ? data.stats.map((d: any) => d.repartition) : [];

//     if (this.productionChart) {
//       this.productionChart.data.datasets = regions.map(
//         (region: string, index: number) => ({
//           label: region,
//           data: productions[index]
//             ? [
//                 productions[index] * 0.9,
//                 productions[index] * 0.95,
//                 productions[index],
//               ]
//             : [0, 0, 0],
//           borderColor:
//             this.productionRepartitionChart?.data?.datasets[0]?.backgroundColor[
//               index
//             ] || '#000',
//           fill: false,
//         })
//       );
//       this.productionChart.update();
//     }

//     if (this.productionRepartitionChart) {
//       this.productionRepartitionChart.data.labels = regions;
//       this.productionRepartitionChart.data.datasets[0].data = repartitions;
//       this.productionRepartitionChart.update();
//     }

//     if (this.productionSuperficieChart) {
//       this.productionSuperficieChart.data.labels = regions;
//       this.productionSuperficieChart.data.datasets[0].data = superficies;
//       this.productionSuperficieChart.update();
//     }

//     if (this.productionByRegionChart) {
//       this.productionByRegionChart.data.labels = regions;
//       this.productionByRegionChart.data.datasets[0].data = productions;
//       this.productionByRegionChart.update();
//     }
//   }

//   updateStockageCharts(): void {
//     const data = this.stockageData.find(
//       (d) => d.product === this.selectedProduct && d.year === this.selectedYear
//     );

//     const regions = data ? data.stats.map((d: any) => d.region) : [];
//     const quantites = data ? data.stats.map((d: any) => d.quantite) : [];
//     const repartitions = data ? data.stats.map((d: any) => d.repartition) : [];

//     if (this.stockageChart) {
//       this.stockageChart.data.datasets = regions.map(
//         (region: string, index: number) => ({
//           label: region,
//           data: quantites[index]
//             ? [
//                 quantites[index] * 0.9,
//                 quantites[index] * 0.95,
//                 quantites[index],
//               ]
//             : [0, 0, 0],
//           borderColor:
//             this.stockageRepartitionChart?.data?.datasets[0]?.backgroundColor[
//               index
//             ] || '#000',
//           fill: false,
//         })
//       );
//       this.stockageChart.update();
//     }

//     if (this.stockageRepartitionChart) {
//       this.stockageRepartitionChart.data.labels = regions;
//       this.stockageRepartitionChart.data.datasets[0].data = repartitions;
//       this.stockageRepartitionChart.update();
//     }

//     if (this.stockageByRegionChart) {
//       this.stockageByRegionChart.data.labels = regions;
//       this.stockageByRegionChart.data.datasets[0].data = quantites;
//       this.stockageByRegionChart.update();
//     }
//   }
// }

//22
