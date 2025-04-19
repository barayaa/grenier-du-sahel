import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateDashboardComponent } from './private-dashboard/private-dashboard.component';
import { DataCollecteComponent } from './data-collecte/data-collecte.component';
import { CollecteurComponent } from './collecteur/collecteur.component';
import { DecoupageAdministratifComponent } from './decoupage-administratif/decoupage-administratif.component';
import { MarcheComponent } from './marche/marche.component';
import { UserComponent } from './user/user.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MagasinComponent } from './magasin/magasin.component';
import { ConseilAgricoleComponent } from './conseil-agricole/conseil-agricole.component';
import { MarcherInfoComponent } from './marche/marcher-info/marcher-info.component';
import { MagasinDetailsComponent } from './magasin/magasin-details/magasin-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'private-dashboard',
    pathMatch: 'full',
  },
  {
    path: 'private-dashboard',
    component: PrivateDashboardComponent,
    data: {
      title: 'Private Dashboard',
      headerDisplay: 'none',
    },
  },
  {
    path: 'data_collect',
    children: [
      {
        path: 'collecteur',
        component: CollecteurComponent,
        data: {
          title: 'Collecteur',
          headerDisplay: 'none',
        },
      },
      {
        path: 'data_collect',
        component: DataCollecteComponent,
        data: {
          title: 'Data Collecte',
          headerDisplay: 'none',
        },
      },
    ],
    // component: DataCollecteComponent,
    // data: {
    //   title: 'Data Collecte',
    //   headerDisplay: 'none',
    // },
  },
  {
    path: 'collecteur',
    component: CollecteurComponent,
    data: {
      title: 'Collecteur',
      headerDisplay: 'none',
    },
  },
  {
    path: 'decoupage',
    component: DecoupageAdministratifComponent,
    data: {
      title: 'Decoupage Administratif',
      headerDisplay: 'none',
    },
  },
  {
    path: 'marcher',
    component: MarcheComponent,
    data: {
      title: 'Marche',
      headerDisplay: 'none',
    },
  },
  {
    path: 'marcher_info/:id',
    component: MarcherInfoComponent,
    data: {
      title: 'Marche Info',
      headerDisplay: 'none',
    },
  },
  {
    path: 'user',
    children: [
      {
        path: 'user',
        component: UserComponent,
        data: {
          title: 'User',
          headerDisplay: 'none',
        },
      },
      {
        path: 'user_info/:id',
        component: UserInfoComponent,
        data: {
          title: 'User',
          headerDisplay: 'none',
        },
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        data: {
          title: 'Profile',
          headerDisplay: 'none',
        },
      },
    ],
  },
  {
    path: 'magasin',
    component: MagasinComponent,
    data: {
      title: 'Magasin',
      headerDisplay: 'none',
    },
  },
  {
    path: 'magasin_detail/:id',
    component: MagasinDetailsComponent,
    data: {
      title: 'Magasin Details',
      headerDisplay: 'none',
    },
  },
  {
    path: 'conseil_agricole',
    component: ConseilAgricoleComponent,
    data: {
      title: 'Conseil Agricole',
      headerDisplay: 'none',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
