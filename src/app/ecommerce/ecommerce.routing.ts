import { Routes } from '@angular/router';

import { EcommerceProductComponent } from './ecommerce-product/ecommerce-product.component';
import { EcommerceProductDetailComponent } from './ecommerce-product-detail/ecommerce-product-detail.component';
import { EcommerceProductListComponent } from './ecommerce-product-list/ecommerce-product-list.component';
import { EcommerceProductCartComponent } from './ecommerce-product-cart/ecommerce-product-cart.component';
import { EcommerceOrderComponent } from './ecommerce-order/ecommerce-order.component';
import { EcommerceOrderDetailComponent } from './ecommerce-order-detail/ecommerce-order-detail.component';
import { InvoiceComponent } from './invoice/invoice.component';

export const EcommerceRoutes: Routes = [{
  path: '',
  redirectTo: 'ecommerce-product',
  pathMatch: 'full',
},{
  path: '',
  children: [{
    path: 'ecommerce-product',
    component: EcommerceProductComponent
  }, {
    path: 'ecommerce-product-detail',
    component: EcommerceProductDetailComponent
  }, {
    path: 'ecommerce-product-list',
    component: EcommerceProductListComponent
  },{
    path: 'ecommerce-product-cart',
    component: EcommerceProductCartComponent
  },{
    path: 'ecommerce-order',
    component: EcommerceOrderComponent
  }, {
    path: 'ecommerce-order-detail',
    component: EcommerceOrderDetailComponent
  }, {
    path: 'invoice',
    component: InvoiceComponent
  }]
}];
