import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CartComponent } from './cart';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the empty cart message', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Your cart is empty');
  });

  it('opens the checkout form for a non-empty cart', () => {
    component.addProduct(component.productCatalog[0]);
    component.goPayment();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('form')).not.toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Order Details');
  });

  it('shows an order confirmation after valid form data is confirmed', () => {
    component.addProduct(component.productCatalog[0]);
    component.goPayment();
    component.submitCheckout(true);
    component.confirmOrder(true);
    fixture.detectChanges();

    expect(component.orderConfirmed).toBe(true);
    expect(component.confirmedTotal).toBe(300);
    expect(fixture.nativeElement.textContent).toContain('Order Confirmed!');
  });

  it('does not confirm an invalid form', () => {
    component.addProduct(component.productCatalog[0]);
    component.goPayment();
    component.submitCheckout(false);
    component.confirmOrder(false);

    expect(component.orderConfirmed).toBe(false);
  });
});
