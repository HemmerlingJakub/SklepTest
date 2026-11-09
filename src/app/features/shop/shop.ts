import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { CartService } from '../../core/services/cart.service';
import { LocalHttpSimulationService } from '../../core/services/local-http-simulation.service';
import { Product } from '../../models/product.model';
import { productCatalog as products } from '../cart/cart';

@Component({
  imports: [
    CurrencyPipe,
    RouterModule,
    MatSnackBarModule
  ],
  standalone: true,
  selector: 'app-shop',
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class ShopComponent {

  readonly productCatalog = products;

  private readonly cartService = inject(CartService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly httpSimulation = inject(LocalHttpSimulationService);

  readonly cartItemCount = this.cartService.totalItems;

  activeProductId: number | null = null;

  addProduct(product: Product): void {
    this.httpSimulation.simulate('INCORRECT_CART').subscribe({
      next: () => {
        this.cartService.addToCart(product);
        this.snackBar.open(
          `${product.name} has been added to your cart.`,
          'OK',
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
            panelClass: ['snackbar-success'],
          },
        );
      },
      // The interceptor displays the error message centrally.
      error: () => {},
    });
  }

  viewDetails(product: Product): void {
    this.activeProductId =
      this.activeProductId === product.id ? null : product.id;
  }

  closeDetails(): void {
    this.activeProductId = null;
  }
}