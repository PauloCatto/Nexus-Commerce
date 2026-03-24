import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { CartService, Product } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class Shop implements OnInit {
  activeCategory: string = 'All';
  categories: string[] = ['All', 'Smartphone', 'Notebooks', 'Controller', 'Mouse', 'Headset', 'Keyboard'];

  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  isLoadingProducts = true;

  private productService = inject(ProductService);

  constructor(
    private route: ActivatedRoute,
    public cartService: CartService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.allProducts = await this.productService.getProducts();
    } catch (err) {
      console.error(err);
    } finally {
      this.isLoadingProducts = false;
      
      this.route.params.subscribe(params => {
        const categoryId = params['id'];
        if (categoryId) {
          this.setCategory(categoryId.charAt(0).toUpperCase() + categoryId.slice(1));
        } else {
          this.setCategory('All');
        }
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

  addToCart(product: Product, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.addToCart(product);
  }

  toggleWishlist(product: Product, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.toggleWishlist(product);
  }
}
