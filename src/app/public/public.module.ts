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
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import { PublicRoutingModule } from './public-routing.module';
import { ProduitsComponent } from './produits/produits.component';
import { PublicDashComponent } from './public-dash/public-dash.component';
import { DemandesComponent } from './demandes/demandes.component';
import { CartographieComponent } from './cartographie/cartographie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet'; // Import LeafletModule
import { ProduitsDetailsComponent } from './produits/produits-details/produits-details.component';
import { DemandesDetailsComponent } from './demandes/demandes-details/demandes-details.component';
import { AddDemandesComponent } from './demandes/add-demandes/add-demandes.component';
import { AddProduitsComponent } from './produits/add-produits/add-produits.component';
import { CartographieStockageComponent } from './cartographie-stockage/cartographie-stockage.component';
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
  NzDatePickerModule,
];

@NgModule({
  declarations: [
    ProduitsComponent,
    PublicDashComponent,
    DemandesComponent,
    CartographieComponent,
    ProduitsDetailsComponent,
    AddProduitsComponent,
    DemandesDetailsComponent,
    AddDemandesComponent,
    CartographieStockageComponent,
  ],
  imports: [
    CommonModule,
    ...antdModule,
    ReactiveFormsModule,
    FormsModule,
    LeafletModule,
    PublicRoutingModule,
  ],
})
export class PublicModule {}
