import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersListComponent } from './e-commerce/orders-list/orders-list.component';
import { ProductsListComponent } from './e-commerce/products-list/products-list.component';
import { ProductComponent } from './e-commerce/product/product.component';

const routes: Routes = [
  {
    path: 'e-commerce',
    data: {
      title: 'E-commerce',
    },
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'orders-list',
        component: OrdersListComponent,
        data: {
          title: 'Orders List',
        },
      },
      {
        path: 'product',
        component: ProductComponent,
        data: {
          title: 'Product',
          headerDisplay: 'none',
        },
      },
      {
        path: 'products-list',
        component: ProductsListComponent,
        data: {
          title: 'Products List',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppsRoutingModule {}
