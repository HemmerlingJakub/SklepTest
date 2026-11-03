import { Injectable, computed, signal } from '@angular/core';
import { CartItem } from '../../models/cart-item.model';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _items = signal<CartItem[]>([]);

  readonly items = this._items.asReadonly();

  readonly totalItems = computed(() =>
    this._items().reduce(
      (total, item) => total + item.quantity,
      0
    )
  );

  readonly totalPrice = computed(() =>
    this._items().reduce(
      (total, item) =>
        total + Math.round(item.product.price * 100) * item.quantity,
      0,
    ) / 100
  );

  getLineTotal(item: CartItem): number {
    return Math.round(item.product.price * 100) * item.quantity / 100;
  }

  addToCart(product: Product): void {
    this._items.update(items => {
      const existingItem = items.find(
        item => item.product.id === product.id
      );

      if (existingItem) {
        return items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...items, { product, quantity: 1 }];
    });
  }

  removeFromCart(productId: number): void {
    this._items.update(items =>
      items.filter(item => item.product.id !== productId)
    );
  }

  updateQuantity(productId: number, quantity: number): void {
    if (!Number.isInteger(quantity) || quantity < 1) {
      return;
    }

    this._items.update(items =>
      items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  }

  clearCart(): void {
    this._items.set([]);
  }
}