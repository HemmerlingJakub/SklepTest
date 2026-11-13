import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, FormsModule, RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartComponent {
  readonly cartService = inject(CartService);
  readonly cartItemCount = this.cartService.totalItems;
  private readonly router = inject(Router);

  checkoutOpen = false;
  checkoutChecked = false;
  paymentMethod: 'blik' | 'card' | 'transfer' = 'blik';
  customer = {
    fullName: '',
    email: '',
    street: '',
    city: '',
  };

  decreaseQuantity(productId: number, quantity: number): void {
    if (quantity <= 1) {
      this.cartService.removeFromCart(productId);
      return;
    }

    this.cartService.updateQuantity(productId, quantity - 1);
  }

  increaseQuantity(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity + 1);
  }

  goPayment(): void {
    if (this.cartService.items().length === 0) {
      return;
    }

    this.checkoutOpen = true;
    this.checkoutChecked = false;
  }

  closePayment(): void {
    this.checkoutOpen = false;
    this.checkoutChecked = false;
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.closePayment();
  }

  submitCheckout(isValid: boolean | null): void {
    if (isValid !== true) {
      this.checkoutChecked = false;
      return;
    }

    this.checkoutChecked = true;
  }

  continueToPayment(isValid: boolean | null): void {
    if (isValid !== true || !this.checkoutChecked || this.cartService.items().length === 0) {
      this.checkoutChecked = false;
      return;
    }

    void this.router.navigate(['/payless'], {
      state: { paymentMethod: this.paymentMethod },
    });
  }
}