import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent],
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

    expect(fixture.nativeElement.textContent).toContain('Twój koszyk jest pusty');
  });

  it('opens the checkout form for a non-empty cart', () => {
    component.addDemoProduct(component.demoProducts[0]);
    component.goPayment();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('form')).not.toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Dane do zamówienia');
  });

  it('shows a fake order confirmation after valid form data is confirmed', () => {
    component.addDemoProduct(component.demoProducts[0]);
    component.goPayment();
    component.submitCheckout(true);
    component.confirmTestOrder(true);
    fixture.detectChanges();

    expect(component.orderConfirmed).toBe(true);
    expect(component.confirmedTotal).toBe(299.99);
    expect(fixture.nativeElement.textContent).toContain('Zamówienie potwierdzone!');
  });

  it('does not confirm an invalid form', () => {
    component.addDemoProduct(component.demoProducts[0]);
    component.goPayment();
    component.submitCheckout(false);
    component.confirmTestOrder(false);

    expect(component.orderConfirmed).toBe(false);
  });
});
