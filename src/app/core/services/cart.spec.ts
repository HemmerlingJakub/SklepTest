import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Product } from '../../models/product.model';

describe('CartService', () => {
  let service: CartService;
  const product: Product = {
    id: 1,
    name: 'Mysz gamingowa',
    description: 'Mysz optyczna 16000 DPI',
    price: 0.1,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('adds products, increments quantity, and calculates totals in cents', () => {
    service.addToCart(product);
    service.addToCart({ ...product, price: 0.2 });

    expect(service.items()).toEqual([{ product, quantity: 2 }]);
    expect(service.totalItems()).toBe(2);
    expect(service.totalPrice()).toBe(0.2);
  });

  it('updates and removes cart items', () => {
    service.addToCart(product);
    service.updateQuantity(product.id, 3);

    expect(service.getLineTotal(service.items()[0])).toBe(0.3);

    service.updateQuantity(product.id, 0);
    expect(service.items()[0].quantity).toBe(3);

    service.removeFromCart(product.id);
    expect(service.items()).toEqual([]);
  });

  it('clears the cart', () => {
    service.addToCart(product);
    service.clearCart();

    expect(service.items()).toEqual([]);
    expect(service.totalItems()).toBe(0);
    expect(service.totalPrice()).toBe(0);
  });
});
