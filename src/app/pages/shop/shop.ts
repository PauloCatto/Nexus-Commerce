import { Component, OnInit, inject, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

import { Parallax3dDirective } from '../../shared/directives/parallax-3d.directive';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, Parallax3dDirective],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']

})
export class Shop implements OnInit {
  activeCategory: string = 'All';
  categories: string[] = ['All', 'Smartphone', 'Notebooks', 'Controller', 'Mouse', 'Headset', 'Keyboard'];

  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  isLoadingProducts = true;

  private productService = inject(ProductService);
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);

  constructor(
    private route: ActivatedRoute,
    public cartService: CartService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      const products = await this.productService.getProducts();
      this.ngZone.run(() => {
        this.allProducts = products;
        this.isLoadingProducts = false;
        this.applyFilter();

        this.route.params.subscribe(params => {
          const categoryId = params['id'];
          if (categoryId) {
            this.setCategory(categoryId.charAt(0).toUpperCase() + categoryId.slice(1));
          }
        });

        this.cdr.detectChanges();
      });
    } catch (err) {
      console.error(err);
      this.ngZone.run(() => {
        this.isLoadingProducts = false;
        this.cdr.detectChanges();
      });
    }
  }

  setCategory(category: string): void {
    this.activeCategory = category;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.activeCategory === 'All') {
      this.filteredProducts = this.allProducts;
    } else {
      this.filteredProducts = this.allProducts.filter(p => p.category.toLowerCase() === this.activeCategory.toLowerCase());
    }
  }

  async addToCart(product: Product, event: Event): Promise<void> {
    event.preventDefault();
    event.stopPropagation();
    await this.cartService.addToCart(product);
  }

  async toggleWishlist(product: Product, event: Event): Promise<void> {
    event.preventDefault();
    event.stopPropagation();
    await this.cartService.toggleWishlist(product);
  }
}
