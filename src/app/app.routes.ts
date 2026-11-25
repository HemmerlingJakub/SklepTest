import { Routes } from '@angular/router';
import { CartComponent } from './features/cart/cart';
import { Payless } from './features/payless/payless';
import { ShopComponent } from './features/shop/shop';
import { Contact } from './features/contact/contact';
import { ProductDetails } from './features/product-details/product-details';
import { About } from './features/about/about';
import { Regulations } from './features/regulations/regulations';
import { BadRequestComponent } from './features/bad-request-component/bad-request-component';

export const routes: Routes = [
  {
    path: 'shop',
    component: ShopComponent
  },
  {
    path: 'product/:id',
    component: ProductDetails
  },
  {
    path: 'about-us',
    component: About
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
    path: 'regulations',
    component: Regulations
  },
  {
    path: 'contact',
    component: Contact
  },
  {
    path: '',
    redirectTo: 'shop',
    pathMatch: 'full'
  },
  {
    path: '400',
    component: BadRequestComponent
  },
  {
    path: '**',
    redirectTo: 'shop'
  }
];