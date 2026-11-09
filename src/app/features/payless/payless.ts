import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { LocalHttpSimulationService } from '../../core/services/local-http-simulation.service';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../../models/cart-item.model';

@Component({
  imports: [CurrencyPipe, FormsModule],
  selector: 'app-payless',
  styleUrl: './payless.css',
  templateUrl: './payless.html',
})
export class Payless {
  blikCode = '';
  cardNumber = '';
  cardExpiry = '';
  cardCVC = '';
  cardHolder = '';
  readonly cartService = inject(CartService);
  private readonly httpSimulation = inject(LocalHttpSimulationService);

  paymentMethod: 'blik' | 'card' | 'transfer' = this.getPaymentMethod();
  paymentConfirmed = false;
  paymentInProgress = false;
  paidTotal = 0;
  transactionId = '';
  purchasedItems: CartItem[] = [];

  get paymentMethodLabel(): string {
    switch (this.paymentMethod) {
      case 'blik':
        return 'BLIK';
      case 'card':
        return 'Credit card';
      case 'transfer':
        return 'Bank transfer';
    }
  }

  private getPaymentMethod(): 'blik' | 'card' | 'transfer' {
    const method = history.state?.paymentMethod;

    if (method === 'card' || method === 'transfer' || method === 'blik') {
      return method;
    }

    return 'blik';
  }

  onBlikInput(event: Event): void {
    if (!(event.target instanceof HTMLInputElement)) {
      return;
    }

    this.blikCode = event.target.value.replace(/\D/g, '').slice(0, 6);
    event.target.value = this.blikCode;
  }

  payBlik(): void {
    if (this.paymentConfirmed) {
      return;
    }

    if (!/^\d{6}$/.test(this.blikCode)) {
      alert('Please enter a valid 6-digit BLIK code.');
      return;
    }

    if (this.cartService.items().length === 0) {
      alert('Your cart is empty.');
      return;
    }

    this.confirmPayment();
  }

  onCardInput(event: Event): void {
    if (!(event.target instanceof HTMLInputElement)) {
      return;
    }

    const input = event.target;
    switch (input.name) {
      case 'cardNumber':
        this.cardNumber = input.value.replace(/\D/g, '').slice(0, 16);
        input.value = this.cardNumber;
        break;
      case 'cardExpiry': {
        const digits = input.value.replace(/\D/g, '').slice(0, 4);
        this.cardExpiry = digits.length > 2
          ? `${digits.slice(0, 2)}/${digits.slice(2)}`
          : digits;
        input.value = this.cardExpiry;
        break;
      }
      case 'cardCVC':
        this.cardCVC = input.value.replace(/\D/g, '').slice(0, 3);
        input.value = this.cardCVC;
        break;
      case 'cardHolder':
        this.cardHolder = input.value;
        break;
    }
  }

  payCard(): void {
    if (this.paymentConfirmed) {
      return;
    }

    const digits = this.cardExpiry.replace(/\D/g, '');
    const month = Number(digits.slice(0, 2));
    const year = Number(digits.slice(2, 4));
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    const expiryIsValid =
      /^\d{2}\/?\d{2}$/.test(this.cardExpiry) &&
      month >= 1 &&
      month <= 12 &&
      (year > currentYear || (year === currentYear && month >= currentMonth));

    if (
      !/^\d{16}$/.test(this.cardNumber) ||
      !expiryIsValid ||
      !/^\d{3}$/.test(this.cardCVC) ||
      !this.cardHolder.trim()
    ) {
      alert('Please enter valid credit card details.');
      return;
    }

    if (this.cartService.items().length === 0) {
      alert('Your cart is empty.');
      return;
    }

    this.confirmPayment();
  }

  checkTransfer(): void {
    if (this.paymentConfirmed) {
      return;
    }

    if (this.cartService.items().length === 0) {
      alert('Your cart is empty.');
      return;
    }

    this.confirmPayment();
  }

  private confirmPayment(): void {
    if (this.paymentInProgress) {
      return;
    }

    this.paymentInProgress = true;
    this.httpSimulation.simulate('INCORRECT_PAYWALL').subscribe({
      next: () => {
        this.transactionId = `PAY-${crypto.randomUUID()}`;
        this.purchasedItems = this.cartService.items().map(item => ({
          ...item,
          product: { ...item.product },
        }));
        this.paidTotal = this.cartService.totalPrice();
        this.cartService.clearCart();
        this.paymentConfirmed = true;
        this.paymentInProgress = false;
      },
      error: () => {
        this.paymentInProgress = false;
      },
    });
  }
}
