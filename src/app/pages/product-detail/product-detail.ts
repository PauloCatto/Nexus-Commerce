import { Component, OnInit, inject, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ProductReviewsComponent } from '../../components/product-reviews/product-reviews.component';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, ProductReviewsComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']

})
export class ProductDetail implements OnInit {
  product: Product | null = null;
  selectedQuantity: number = 1;
  isLoading: boolean = true;

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

  async addToCart(): Promise<void> {
    if (this.product) {
      await this.cartService.addToCart(this.product, this.selectedQuantity);
      this.selectedQuantity = 1;
    }
  }

  async toggleWishlist(): Promise<void> {
    if (this.product) {
      await this.cartService.toggleWishlist(this.product);
    }
  }
}
