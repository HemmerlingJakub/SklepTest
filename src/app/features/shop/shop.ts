import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../models/product.model';
import { productCatalog as products } from '../cart/cart';

@Component({
  imports: [CurrencyPipe, RouterModule],
  standalone: true,
  selector: 'app-shop',
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class ShopComponent {
  readonly productCatalog = products;
  private readonly cartService = inject(CartService);
  readonly cartItemCount = this.cartService.totalItems;
  activeProductId: number | null = null;

  addProduct(product: Product): void {
    this.cartService.addToCart(product);
  }

  viewDetails(product: Product): void {
    this.activeProductId = 
      this.activeProductId === product.id ? null: product.id;
  }

  closeDetails(): void {
    this.activeProductId = null;
  }
}