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
  searchTerm = signal('');
  sortOption = signal<'default' | 'price-asc' | 'price-desc'>('default');
  selectedTag = signal('all');

  availableTags = computed(() => {
    const tags = this.products().flatMap(product => product.tags ?? []);
    return [...new Set(tags)].sort((a, b) => a.localeCompare(b));
  });

  filteredProducts = computed(() => {
    const search = this.searchTerm().toLowerCase().trim();
    const selectedTag = this.selectedTag();

    const filtered = this.products().filter(product => {
      const matchesSearch = !search ||
        product.name.toLowerCase().includes(search) ||
        product.category?.toLowerCase().includes(search) ||
        product.tags?.some(tag => tag.toLowerCase().includes(search));
      const matchesTag = selectedTag === 'all' ||
        product.tags?.some(tag => tag === selectedTag);

      return matchesSearch && matchesTag;
    });

    const sortOption = this.sortOption();
    if (sortOption === 'price-asc') {
      return [...filtered].sort((a, b) => a.price - b.price);
    }
    if (sortOption === 'price-desc') {
      return [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  });

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }

  clearSearch() : void{
    this.searchTerm.set('')
  }

  onSortChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.sortOption.set(value as 'default' | 'price-asc' | 'price-desc');
  }

  selectTag(tag: string): void {
    this.selectedTag.set(tag);
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.sortOption.set('default');
    this.selectedTag.set('all');
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