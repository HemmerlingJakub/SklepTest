import { Routes } from '@angular/router';
import { CartComponent } from './features/cart/cart';
import { Payless } from './features/payless/payless';
import { ShopComponent } from './features/shop/shop';

export const routes: Routes = [
  {
    path: 'shop',
    component: ShopComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'payless',
    component: Payless
  },
  {
    path: '',
    redirectTo: 'shop',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'shop'
  }
];