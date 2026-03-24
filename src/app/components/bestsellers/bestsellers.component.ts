import { Component, OnInit, inject, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-bestsellers',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bestsellers.component.html',
  styleUrl: './bestsellers.component.scss'
})
export class BestsellersComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;

  private productService = inject(ProductService);
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);

  async ngOnInit(): Promise<void> {
    try {
      const products = await this.productService.getProducts();
      this.ngZone.run(() => {
        this.products = products;
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
}
