import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../models/product.model';

export const productCatalog: Product[] = [
  {
    id: 1,
    name: 'Mechanical Keyboard',
    description: 'RGB keyboard with red switches',
    price: 299.997,
    imageUrl: '/images/keyboard.png'
  },
  {
    id: 2,
    name: 'Gaming Mouse',
    description: '16000 DPI optical mouse',
    price: 159.99,
    imageUrl: '/images/Mouse.png'
  },
  {
    id: 3,
    name: 'Headphones',
    description: 'Wireless headphones',
    price: 249.99,
    imageUrl: '/images/Headphones.png'
  },
  {
    id: 4,
    name: 'Webcam',
    description: '1080p webcam with built-in microphone',
    price: 99.99,
    imageUrl: '/images/Webcam.png'
  },
  {
    id: 5,
    name: 'Monitor',
    description: '27-inch 4K monitor',
    price: 499.99,
    imageUrl: '/images/Monitor.png'
  },
  {
    id: 6,
    name: 'Laptop Stand',
    description: 'Adjustable laptop stand',
    price: 49.99,
    imageUrl: '/images/LaptopStand.png'
  },
  {
    id: 7,
    name: 'External Hard Drive',
    description: '2TB external hard drive',
    price: 89.99,
    imageUrl: '/images/ExternalHardDrive.png'
  },
  {
    id: 8,
    name: 'USB Hub',
    description: '7-port USB hub',
    price: 29.99,
    imageUrl: '/images/ExternalHub.png'
  }
];

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, FormsModule, RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartComponent {
  readonly cartService = inject(CartService);
  readonly cartItemCount = this.cartService.totalItems;

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

  readonly productCatalog = productCatalog;

  addProduct(product: Product): void {
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

  confirmOrder(isValid: boolean | null): void {
    if (isValid !== true || !this.checkoutChecked || this.cartService.items().length === 0) {
      this.checkoutChecked = false;
      return;
    }

    this.confirmedTotal = this.cartService.totalPrice();
    this.orderConfirmed = true;
  }
}