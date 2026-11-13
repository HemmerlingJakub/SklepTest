import { Component, inject, signal, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { CartService } from '../../core/services/cart.service';
import { LocalHttpSimulationService } from '../../core/services/local-http-simulation.service';
import { Product } from '../../models/product.model';
import { productCatalog as products } from '../../core/product';

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

  products = signal<Product[]>(this.productCatalog);
  searchTerm = signal('')

  filteredProducts = computed(() => {
    const search = this.searchTerm().toLowerCase().trim();

    if(!search) {
      return this.products();
    }

    return this.products().filter(product =>
      product.name.toLowerCase().includes(search) ||
      product.category?.toLocaleLowerCase().includes(search) ||
      product.tags?.some(tag => tag.toLowerCase().includes(search))
    );
  });

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }

  clearSearch() : void{
    this.searchTerm.set('')
  }

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
      error: () => {},
    });
  }

}