import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from './notification.service';

export interface Product {
    name: string;
    price: string;
    image: string;
    category: string;
    quantity?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<Product[]>([]);
  private wishlistItems = new BehaviorSubject<Product[]>([]);
  
  cart$ = this.cartItems.asObservable();
  wishlist$ = this.wishlistItems.asObservable();

  constructor(private ns: NotificationService) {}

  addToCart(product: Product, quantity: number = 1) {
    const current = this.cartItems.value;
    const existing = current.find(p => p.name === product.name);
    if (existing) {
        existing.quantity = (existing.quantity || 1) + quantity;
        this.cartItems.next([...current]);
    } else {
        this.cartItems.next([...current, { ...product, quantity }]);
    }
    this.ns.show(`"${product.name}" added to cart!`, 'success');
  }

  updateQuantity(productName: string, delta: number) {
    const current = this.cartItems.value;
    const item = current.find(p => p.name === productName);
    if (item) {
        const newQty = (item.quantity || 1) + delta;
        if (newQty > 0) {
            item.quantity = newQty;
            this.cartItems.next([...current]);
        }
    }
  }

  removeFromCart(productName: string) {
    const current = this.cartItems.value.filter(p => p.name !== productName);
    this.cartItems.next(current);
    this.ns.show('Product removed from cart.', 'info');
  }

  toggleWishlist(product: Product) {
    const current = this.wishlistItems.value;
    const index = current.findIndex(p => p.name === product.name);
    if (index > -1) {
        current.splice(index, 1);
        this.ns.show(`Removed "${product.name}" from wishlist.`);
    } else {
        current.push(product);
        this.ns.show(`Saved "${product.name}" to wishlist!`, 'success');
    }
    this.wishlistItems.next([...current]);
  }

  isInWishlist(productName: string): boolean {
    return this.wishlistItems.value.some(p => p.name === productName);
  }

  getCartCount(): number {
    return this.cartItems.value.reduce((acc, p) => acc + (p.quantity || 0), 0);
  }

  getWishlistCount(): number {
    return this.wishlistItems.value.length;
  }
}
