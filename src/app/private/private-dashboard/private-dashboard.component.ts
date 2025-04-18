import { trigger, transition, style, animate } from '@angular/animations';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { latLng, tileLayer, marker, icon, Layer } from 'leaflet';
import * as L from 'leaflet';
@Component({
  selector: 'app-private-dashboard',
  templateUrl: './private-dashboard.component.html',
  styleUrl: './private-dashboard.component.css',
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
export class PrivateDashboardComponent implements OnInit, AfterViewInit {
  // Ajoute AfterViewInit
  // stats = {
  //   usersCount: 1500, // Nombre total d'utilisateurs
  //   marketsCount: 120, // Nombre total de marchés
  //   transactionsCount: 450, // Nombre total de transactions
  //   localities: [
  //     {
  //       name: 'Dosso',
  //       country: 'Niger',
  //       marketsCount: 15,
  //       activeUsers: 250,
  //       mainProducts: ['Mil', 'Sorgho'],
  //       lat: 13.315,
  //       lon: 3.083,
  //     },
  //     {
  //       name: 'Ségou',
  //       country: 'Mali',
  //       marketsCount: 10,
  //       activeUsers: 180,
  //       mainProducts: ['Maïs', 'Riz'],
  //       lat: 13.431,
  //       lon: -6.259,
  //     },
  //     {
  //       name: 'Thiès',
  //       country: 'Sénégal',
  //       marketsCount: 20,
  //       activeUsers: 300,
  //       mainProducts: ['Haricot', 'Mil'],
  //       lat: 14.791,
  //       lon: -16.935,
  //     },
  //     {
  //       name: 'Ouagadougou',
  //       country: 'Burkina Faso',
  //       marketsCount: 25,
  //       activeUsers: 350,
  //       mainProducts: ['Sorgho', 'Maïs'],
  //       lat: 12.371,
  //       lon: -1.519,
  //     },
  //     {
  //       name: 'N’Djaména',
  //       country: 'Tchad',
  //       marketsCount: 12,
  //       activeUsers: 200,
  //       mainProducts: ['Mil', 'Arachide'],
  //       lat: 12.134,
  //       lon: 15.055,
  //     },
  //   ],
  //   collectedDataByProduct: [
  //     { product: 'Mil', quantity: 200000 },
  //     { product: 'Maïs', quantity: 150000 },
  //     { product: 'Haricot', quantity: 100000 },
  //     { product: 'Sorgho', quantity: 80000 },
  //     { product: 'Riz', quantity: 50000 },
  //   ],
  //   usersByCountry: [
  //     { country: 'Niger', users: 450 },
  //     { country: 'Mali', users: 350 },
  //     { country: 'Sénégal', users: 300 },
  //     { country: 'Burkina Faso', users: 250 },
  //     { country: 'Tchad', users: 150 },
  //   ],
  //   priceTrend: [
  //     { month: 'Nov 2024', mil: 250, mais: 200, haricot: 300 },
  //     { month: 'Déc 2024', mil: 260, mais: 210, haricot: 310 },
  //     { month: 'Jan 2025', mil: 270, mais: 220, haricot: 320 },
  //     { month: 'Fév 2025', mil: 265, mais: 215, haricot: 315 },
  //     { month: 'Mar 2025', mil: 280, mais: 230, haricot: 330 },
  //     { month: 'Avr 2025', mil: 290, mais: 240, haricot: 340 },
  //   ],
  // };

  // collectedDataChart: any;
  // usersByCountryChart: any;
  // priceTrendChart: any;
  // mapOptions: any;
  // layers: Layer[] = [];

  // constructor(private router: Router) {}

  // ngOnInit() {
  //   this.initMap();
  // }

  // ngAfterViewInit() {
  //   this.initCharts();
  // }

  // initMap() {
  //   this.mapOptions = {
  //     layers: [
  //       tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //         maxZoom: 18,
  //         minZoom: 5,
  //         attribution: '© OpenStreetMap contributors',
  //       }),
  //     ],
  //     zoom: 5,
  //     center: latLng(15, 0), // Centré sur le Sahel
  //   };

  //   const markerIcon = icon({
  //     iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  //     iconSize: [25, 41],
  //     iconAnchor: [12, 41],
  //     popupAnchor: [1, -34],
  //     shadowUrl:
  //       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  //     shadowSize: [41, 41],
  //   });

  //   this.layers = this.stats.localities.map((locality) =>
  //     marker([locality.lat, locality.lon], { icon: markerIcon }).bindPopup(
  //       `${locality.name}, ${locality.country}<br>Utilisateurs Actifs: ${locality.activeUsers}`
  //     )
  //   );
  // }

  // initCharts() {
  //   // Graphique Données Collectées (Donut)
  //   const collectedDataCanvas = document.getElementById(
  //     'collectedDataChart'
  //   ) as HTMLCanvasElement;
  //   if (collectedDataCanvas) {
  //     this.collectedDataChart = new Chart(collectedDataCanvas, {
  //       type: 'doughnut',
  //       data: {
  //         labels: this.stats.collectedDataByProduct.map((d) => d.product),
  //         datasets: [
  //           {
  //             data: this.stats.collectedDataByProduct.map((d) => d.quantity),
  //             backgroundColor: [
  //               '#ff6384',
  //               '#36a2eb',
  //               '#ffce56',
  //               '#4bc0c0',
  //               '#9966ff',
  //             ],
  //           },
  //         ],
  //       },
  //       options: {
  //         responsive: true,
  //         maintainAspectRatio: false,
  //       },
  //     });
  //   }

  //   // Graphique Utilisateurs par Pays (Bar)
  //   const usersByCountryCanvas = document.getElementById(
  //     'usersByCountryChart'
  //   ) as HTMLCanvasElement;
  //   if (usersByCountryCanvas) {
  //     this.usersByCountryChart = new Chart(usersByCountryCanvas, {
  //       type: 'bar',
  //       data: {
  //         labels: this.stats.usersByCountry.map((d) => d.country),
  //         datasets: [
  //           {
  //             label: 'Nombre d’Utilisateurs',
  //             data: this.stats.usersByCountry.map((d) => d.users),
  //             backgroundColor: '#52c41a',
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

  //   // Graphique Tendance des Prix (Line)
  //   const priceTrendCanvas = document.getElementById(
  //     'priceTrendChart'
  //   ) as HTMLCanvasElement;
  //   if (priceTrendCanvas) {
  //     this.priceTrendChart = new Chart(priceTrendCanvas, {
  //       type: 'line',
  //       data: {
  //         labels: this.stats.priceTrend.map((d) => d.month),
  //         datasets: [
  //           {
  //             label: 'Mil (FCFA/kg)',
  //             data: this.stats.priceTrend.map((d) => d.mil),
  //             borderColor: '#ff6384',
  //             fill: false,
  //           },
  //           {
  //             label: 'Maïs (FCFA/kg)',
  //             data: this.stats.priceTrend.map((d) => d.mais),
  //             borderColor: '#36a2eb',
  //             fill: false,
  //           },
  //           {
  //             label: 'Haricot (FCFA/kg)',
  //             data: this.stats.priceTrend.map((d) => d.haricot),
  //             borderColor: '#ffce56',
  //             fill: false,
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
  // }

  stats = {
    usersCount: 1500,
    marketsCount: 120,
    transactionsCount: 450,
    localities: [
      {
        name: 'Dosso',
        country: 'Niger',
        marketsCount: 15,
        activeUsers: 250,
        mainProducts: ['Mil', 'Sorgho'],
        lat: 13.315,
        lon: 3.083,
        countryCode: 'NE',
      },
      {
        name: 'Ségou',
        country: 'Mali',
        marketsCount: 10,
        activeUsers: 180,
        mainProducts: ['Maïs', 'Riz'],
        lat: 13.431,
        lon: -6.259,
        countryCode: 'ML',
      },
      {
        name: 'Thiès',
        country: 'Sénégal',
        marketsCount: 20,
        activeUsers: 300,
        mainProducts: ['Haricot', 'Mil'],
        lat: 14.791,
        lon: -16.935,
        countryCode: 'SN',
      },
      {
        name: 'Ouagadougou',
        country: 'Burkina Faso',
        marketsCount: 25,
        activeUsers: 350,
        mainProducts: ['Sorgho', 'Maïs'],
        lat: 12.371,
        lon: -1.519,
        countryCode: 'BF',
      },
      {
        name: 'N’Djaména',
        country: 'Tchad',
        marketsCount: 12,
        activeUsers: 200,
        mainProducts: ['Mil', 'Arachide'],
        lat: 12.134,
        lon: 15.055,
        countryCode: 'TD',
      },
    ],
    collectedDataByProduct: [
      { product: 'Mil', quantity: 200000 },
      { product: 'Maïs', quantity: 150000 },
      { product: 'Haricot', quantity: 100000 },
      { product: 'Sorgho', quantity: 80000 },
      { product: 'Riz', quantity: 50000 },
    ],
    usersByCountry: [
      { country: 'Niger', users: 450 },
      { country: 'Mali', users: 350 },
      { country: 'Sénégal', users: 300 },
      { country: 'Burkina Faso', users: 250 },
      { country: 'Tchad', users: 150 },
    ],
    priceTrend: [
      { month: 'Nov 2024', mil: 250, mais: 200, haricot: 300 },
      { month: 'Déc 2024', mil: 260, mais: 210, haricot: 310 },
      { month: 'Jan 2025', mil: 270, mais: 220, haricot: 320 },
      { month: 'Fév 2025', mil: 265, mais: 215, haricot: 315 },
      { month: 'Mar 2025', mil: 280, mais: 230, haricot: 330 },
      { month: 'Avr 2025', mil: 290, mais: 240, haricot: 340 },
    ],
    transactionsByMonth: [
      { month: 'Nov 2024', transactions: 50 },
      { month: 'Déc 2024', transactions: 70 },
      { month: 'Jan 2025', transactions: 90 },
      { month: 'Fév 2025', transactions: 80 },
      { month: 'Mar 2025', transactions: 110 },
      { month: 'Avr 2025', transactions: 150 },
    ],
  };

  statsList = [
    {
      label: 'Utilisateurs',
      value: this.stats.usersCount,
      icon: 'team',
      colorClass: 'text-primary',
      class: 'border-primary',
    },
    {
      label: 'Marchés',
      value: this.stats.marketsCount,
      icon: 'shop',
      colorClass: 'text-success',
      class: 'border-success',
    },
    {
      label: 'Localités',
      value: this.stats.localities.length,
      icon: 'global',
      colorClass: 'text-warning',
      class: 'border-warning',
    },
    {
      label: 'Transactions',
      value: this.stats.transactionsCount,
      icon: 'swap',
      colorClass: 'text-danger',
      class: 'border-danger',
    },
  ];

  collectedDataChart: any;
  usersByCountryChart: any;
  priceTrendChart: any;
  transactionsChart: any;
  mapOptions: any;
  layers: Layer[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.initMap();
  }

  ngAfterViewInit() {
    this.initCharts();
  }

  initMap() {
    this.mapOptions = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          minZoom: 5,
          attribution: '© OpenStreetMap contributors',
        }),
      ],
      zoom: 5,
      center: latLng(15, 0),
    };

    const countryColors: { [key: string]: string } = {
      NE: '#ff6384', // Niger
      ML: '#36a2eb', // Mali
      SN: '#ffce56', // Sénégal
      BF: '#4bc0c0', // Burkina Faso
      TD: '#9966ff', // Tchad
    };

    this.layers = this.stats.localities.map((locality) => {
      const markerIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="background-color: ${
          countryColors[locality.countryCode]
        }; width: 20px; height: 20px; border-radius: 50%; border: 2px solid #fff;"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -10],
      });

      return marker([locality.lat, locality.lon], {
        icon: markerIcon,
      }).bindPopup(
        `${locality.name}, ${locality.country}<br>Utilisateurs Actifs: ${locality.activeUsers}`
      );
    });
  }

  initCharts() {
    // Graphique Données Collectées (Donut)
    const collectedDataCanvas = document.getElementById(
      'collectedDataChart'
    ) as HTMLCanvasElement;
    if (collectedDataCanvas) {
      this.collectedDataChart = new Chart(collectedDataCanvas, {
        type: 'doughnut',
        data: {
          labels: this.stats.collectedDataByProduct.map((d) => d.product),
          datasets: [
            {
              data: this.stats.collectedDataByProduct.map((d) => d.quantity),
              backgroundColor: [
                '#ff6384',
                '#36a2eb',
                '#ffce56',
                '#4bc0c0',
                '#9966ff',
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              enabled: true,
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  const value: any = context.raw || 0;
                  const total = context.dataset.data.reduce(
                    (a: number, b: number) => a + b,
                    0
                  );
                  const percentage = ((value / total) * 100).toFixed(1);
                  return `${label}: ${value} kg (${percentage}%)`;
                },
              },
            },
          },
        },
      });
    }

    // Graphique Utilisateurs par Pays (Bar)
    const usersByCountryCanvas = document.getElementById(
      'usersByCountryChart'
    ) as HTMLCanvasElement;
    if (usersByCountryCanvas) {
      this.usersByCountryChart = new Chart(usersByCountryCanvas, {
        type: 'bar',
        data: {
          labels: this.stats.usersByCountry.map((d) => d.country),
          datasets: [
            {
              label: 'Nombre d’Utilisateurs',
              data: this.stats.usersByCountry.map((d) => d.users),
              backgroundColor: '#52c41a',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true },
          },
          plugins: {
            tooltip: {
              enabled: true,
            },
          },
        },
      });
    }

    // Graphique Tendance des Prix (Line)
    const priceTrendCanvas = document.getElementById(
      'priceTrendChart'
    ) as HTMLCanvasElement;
    if (priceTrendCanvas) {
      this.priceTrendChart = new Chart(priceTrendCanvas, {
        type: 'line',
        data: {
          labels: this.stats.priceTrend.map((d) => d.month),
          datasets: [
            {
              label: 'Mil (FCFA/kg)',
              data: this.stats.priceTrend.map((d) => d.mil),
              borderColor: '#ff6384',
              fill: false,
            },
            {
              label: 'Maïs (FCFA/kg)',
              data: this.stats.priceTrend.map((d) => d.mais),
              borderColor: '#36a2eb',
              fill: false,
            },
            {
              label: 'Haricot (FCFA/kg)',
              data: this.stats.priceTrend.map((d) => d.haricot),
              borderColor: '#ffce56',
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true },
          },
          plugins: {
            tooltip: {
              enabled: true,
            },
          },
        },
      });
    }

    // Graphique Transactions par Mois (Line)
    const transactionsCanvas = document.getElementById(
      'transactionsChart'
    ) as HTMLCanvasElement;
    if (transactionsCanvas) {
      this.transactionsChart = new Chart(transactionsCanvas, {
        type: 'line',
        data: {
          labels: this.stats.transactionsByMonth.map((d) => d.month),
          datasets: [
            {
              label: 'Nombre de Transactions',
              data: this.stats.transactionsByMonth.map((d) => d.transactions),
              borderColor: '#9966ff',
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true },
          },
          plugins: {
            tooltip: {
              enabled: true,
            },
          },
        },
      });
    }
  }

  logout() {
    // this.authService.logout();
    // this.router.navigate(['/login']);
  }
}
