import { Component, OnInit, inject, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetail implements OnInit {
  product: Product | null = null;
  selectedQuantity: number = 1;
  isLoading = true;

  private productService = inject(ProductService);
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);

  constructor(
    private route: ActivatedRoute,
    public cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      const slug = params['id'];
      if (slug) {
        try {
          const product = await this.productService.getProductBySlug(slug);
          this.ngZone.run(() => {
            this.product = product;
            this.isLoading = false;
            this.cdr.detectChanges();
          });
        } catch (err) {
          console.error(err);
          this.ngZone.run(() => {
            this.isLoading = false;
            this.cdr.detectChanges();
          });
        }
      }
    });
  }

  updateQty(delta: number): void {
    if (this.selectedQuantity + delta > 0) {
      this.selectedQuantity += delta;
    }
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product, this.selectedQuantity);
      this.selectedQuantity = 1;
    }
  }

  toggleWishlist(): void {
    if (this.product) {
      this.cartService.toggleWishlist(this.product);
    }
  }
}
