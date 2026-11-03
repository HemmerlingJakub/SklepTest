import { Routes } from '@angular/router';
import { CartComponent } from './features/cart/cart';
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
    path: '',
    redirectTo: 'shop',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'shop'
  }
];