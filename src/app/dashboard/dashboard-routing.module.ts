import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EcommerceDashboardComponent } from './e-commerce/e-commerce-dashboard.component';

const routes: Routes = [
  {
    path: 'e-commerce',
    component: EcommerceDashboardComponent,
    data: {
      title: 'E-Commerce Dashboard ',
      headerDisplay: 'none',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
