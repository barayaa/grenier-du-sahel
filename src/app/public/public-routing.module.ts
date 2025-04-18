import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicDashComponent } from './public-dash/public-dash.component';
import { ProduitsComponent } from './produits/produits.component';
import { DemandesComponent } from './demandes/demandes.component';
import { CartographieComponent } from './cartographie/cartographie.component';
import { DemandesDetailsComponent } from './demandes/demandes-details/demandes-details.component';
import { ProduitsDetailsComponent } from './produits/produits-details/produits-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pubdashboard',
    pathMatch: 'full',
  },
  {
    path: 'pubdashboard',
    component: PublicDashComponent,
    data: {
      title: 'Public Dashboard',
      headerDisplay: 'none',
    },
  },
  {
    path: 'produits',
    component: ProduitsComponent,
    data: {
      title: 'Produits',
      headerDisplay: 'none',
    },
  },
  {
    path: 'produits_details/:id',
    component: ProduitsDetailsComponent,
    data: {
      title: 'Produits Details',
      headerDisplay: 'none',
    },
  },
  {
    path: 'demandes',
    component: DemandesComponent,
    data: {
      title: 'Demandes',
      headerDisplay: 'none',
    },
  },
  {
    path: 'demandes_details/:id',
    component: DemandesDetailsComponent,
    data: {
      title: 'Demandes Details',
      headerDisplay: 'none',
    },
  },
  {
    path: 'cartographie',
    component: CartographieComponent,
    data: {
      title: 'Cartographie',
      headerDisplay: 'none',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
