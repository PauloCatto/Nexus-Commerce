import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']

})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  itemToRemove: string | null = null;
  
  parseFloat = parseFloat;
  
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
        this.cartItems = items;
    });
  }

  get total(): number {
    return this.cartItems.reduce((acc, item) => acc + (parseFloat(item.price) * (item.quantity || 1)), 0);
  }

  updateQuantity(name: string, delta: number) {
    this.cartService.updateQuantity(name, delta);
  }

  confirmRemove(name: string) {
    this.itemToRemove = name;
  }

  cancelRemove() {
    this.itemToRemove = null;
  }

  doRemove() {
    if (this.itemToRemove) {
      this.cartService.removeFromCart(this.itemToRemove);
      this.itemToRemove = null;
    }
  }
}
