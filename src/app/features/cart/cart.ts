import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartComponent {
  readonly cartService = inject(CartService);

  checkoutOpen = false;
  checkoutChecked = false;
  orderConfirmed = false;
  confirmedTotal = 0;
  paymentMethod = 'blik';
  customer = {
    fullName: '',
    email: '',
    street: '',
    city: '',
  };

  readonly demoProducts: Product[] = [
    {
      id: 1,
      name: 'Klawiatura mechaniczna',
      description: 'Klawiatura RGB, switch red',
      price: 299.99
    },
    {
      id: 2,
      name: 'Mysz gamingowa',
      description: 'Mysz optyczna 16000 DPI',
      price: 159.99
    },
    {
      id: 3,
      name: 'Słuchawki',
      description: 'Słuchawki bezprzewodowe',
      price: 249.99
    }
  ];

  addDemoProduct(product: Product): void {
    this.cartService.addToCart(product);
  }

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
    this.orderConfirmed = false;
  }

  closePayment(): void {
    this.checkoutOpen = false;
    this.checkoutChecked = false;
    this.orderConfirmed = false;
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

  confirmTestOrder(isValid: boolean | null): void {
    if (isValid !== true || !this.checkoutChecked || this.cartService.items().length === 0) {
      this.checkoutChecked = false;
      return;
    }

    this.confirmedTotal = this.cartService.totalPrice();
    this.orderConfirmed = true;
  }
}