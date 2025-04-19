import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicDashComponent } from './public-dash/public-dash.component';
import { ProduitsComponent } from './produits/produits.component';
import { DemandesComponent } from './demandes/demandes.component';
import { CartographieComponent } from './cartographie/cartographie.component';
import { DemandesDetailsComponent } from './demandes/demandes-details/demandes-details.component';
import { ProduitsDetailsComponent } from './produits/produits-details/produits-details.component';
import { AddDemandesComponent } from './demandes/add-demandes/add-demandes.component';
import { AddProduitsComponent } from './produits/add-produits/add-produits.component';
import { CartographieStockageComponent } from './cartographie-stockage/cartographie-stockage.component';

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
    path: 'produits/new',
    component: AddProduitsComponent,
    data: {
      title: 'Produits New',
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
    path: 'demandes/new',
    component: AddDemandesComponent,
    data: {
      title: 'Demandes New',
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
    children: [
      {
        path: 'production',
        component: CartographieComponent,
        data: {
          title: 'Production Cartographie',
          headerDisplay: 'none',
        },
      },
      {
        path: 'stockage',
        component: CartographieStockageComponent,
        data: {
          title: 'Stockage Cartographie',
          headerDisplay: 'none',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
