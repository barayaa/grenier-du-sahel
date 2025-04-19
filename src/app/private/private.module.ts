import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

import { NzListModule } from 'ng-zorro-antd/list';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { PrivateRoutingModule } from './private-routing.module';
import { UserComponent } from './user/user.component';
import { MarcheComponent } from './marche/marche.component';
import { CollecteurComponent } from './collecteur/collecteur.component';
import { PrivateDashboardComponent } from './private-dashboard/private-dashboard.component';
import { DataCollecteComponent } from './data-collecte/data-collecte.component';
import { DecoupageAdministratifComponent } from './decoupage-administratif/decoupage-administratif.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MarcherInfoComponent } from './marche/marcher-info/marcher-info.component';
import { MagasinDetailsComponent } from './magasin/magasin-details/magasin-details.component';
import { MagasinComponent } from './magasin/magasin.component';
import { ConseilAgricoleComponent } from './conseil-agricole/conseil-agricole.component';
const antdModule = [
  NzButtonModule,
  NzCardModule,
  NzAvatarModule,
  NzRateModule,
  NzBadgeModule,
  NzProgressModule,
  NzRadioModule,
  NzTableModule,
  NzDropDownModule,
  NzTimelineModule,
  NzTabsModule,
  NzTagModule,
  NzListModule,
  NzCalendarModule,
  NzToolTipModule,
  NzCheckboxModule,
  NzFormModule,
  NzInputModule,
  NzSelectModule,
  NzIconModule,
  NzModalModule,
  NzBreadCrumbModule,
  NzDescriptionsModule,
];

@NgModule({
  declarations: [
    UserComponent,
    MarcheComponent,
    DataCollecteComponent,
    CollecteurComponent,
    DecoupageAdministratifComponent,
    PrivateDashboardComponent,
    UserProfileComponent,
    MarcherInfoComponent,
    MagasinComponent,
    MagasinDetailsComponent,
    ConseilAgricoleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrivateRoutingModule,
    LeafletModule,
    ...antdModule,
  ],
})
export class PrivateModule {}
