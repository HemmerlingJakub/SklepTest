import { Routes } from '@angular/router';
import { CartComponent } from './features/cart/cart';

export const routes: Routes = [
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: '',
    redirectTo: 'cart',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'cart'
  }
];