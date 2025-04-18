import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-public-dash',
  templateUrl: './public-dash.component.html',
  styleUrls: ['./public-dash.component.css'],
})
export class PublicDashComponent implements AfterViewInit {
  constructor() {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    // Graphique Statistiques Mensuelles (Barres)
    const statsCtx = document.getElementById('statsChart') as HTMLCanvasElement;
    if (statsCtx) {
      new Chart(statsCtx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai'],
          datasets: [
            {
              label: 'Inscrits',
              data: [200, 300, 250, 400, 350],
              backgroundColor: '#1890ff',
            },
            {
              label: 'Offres',
              data: [50, 70, 60, 90, 80],
              backgroundColor: '#52c41a',
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Statistiques Mensuelles' },
          },
          scales: {
            y: { beginAtZero: true, title: { display: true, text: 'Nombre' } },
            x: { title: { display: true, text: 'Mois' } },
          },
        },
      });
    } else {
      console.error('Canvas element with ID "statsChart" not found.');
    }

    // Graphique Produits les Plus Vendus (Donut)
    const productsCtx = document.getElementById(
      'productsChart'
    ) as HTMLCanvasElement;
    if (productsCtx) {
      new Chart(productsCtx, {
        type: 'doughnut',
        data: {
          labels: ['Mil', 'Maïs', 'Haricot', 'Sorgho'],
          datasets: [
            {
              label: 'Ventes',
              data: [500, 300, 200, 100],
              backgroundColor: ['#1890ff', '#52c41a', '#faad14', '#ff4d4f'],
              hoverOffset: 20,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'bottom' },
            title: { display: true, text: 'Produits les Plus Vendus' },
          },
        },
      });
    } else {
      console.error('Canvas element with ID "productsChart" not found.');
    }
  }
}
