import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import {
  Firestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  onSnapshot
} from '@angular/fire/firestore';
import { Auth, authState } from '@angular/fire/auth';
import { NotificationService } from './notification.service';
import { Product } from '../models/product.model';

export type { Product };

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<Product[]>([]);
  private wishlistItems = new BehaviorSubject<Product[]>([]);

  cart$ = this.cartItems.asObservable();
  wishlist$ = this.wishlistItems.asObservable();

  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private ns = inject(NotificationService);
  private router = inject(Router);

  constructor() {
    // Escuta mudanças de autenticação e carrega os dados do usuário logado
    authState(this.auth).subscribe(user => {
      if (user) {
        this.loadFromFirebase(user.uid);
      } else {
        this.cartItems.next([]);
        this.wishlistItems.next([]);
      }
    });
  }

  // ─── Auth Guard ────────────────────────────────────────────────
  private async getUser() {
    const user = await firstValueFrom(authState(this.auth));
    if (!user) {
      this.ns.show('Você precisa estar logado para continuar!', 'error');
      setTimeout(() => this.router.navigate(['/login']), 1500);
      return null;
    }
    return user;
  }

  // ─── Load from Firebase ────────────────────────────────────────
  private async loadFromFirebase(uid: string): Promise<void> {
    try {
      const cartSnap = await getDocs(collection(this.firestore, `carts/${uid}/items`));
      const cart: Product[] = [];
      cartSnap.forEach((d: any) => cart.push(d.data() as Product));
      this.cartItems.next(cart);

      const wishSnap = await getDocs(collection(this.firestore, `wishlists/${uid}/items`));
      const wish: Product[] = [];
      wishSnap.forEach((d: any) => wish.push(d.data() as Product));
      this.wishlistItems.next(wish);
    } catch (err) {
      console.error('Erro ao carregar dados do Firebase:', err);
    }
  }

  // ─── Cart ──────────────────────────────────────────────────────
  async addToCart(product: Product, quantity: number = 1): Promise<void> {
    const user = await this.getUser();
    if (!user) return;

    const current = this.cartItems.value;
    const existing = current.find(p => p.name === product.name);
    let updated: Product[];

    if (existing) {
      existing.quantity = (existing.quantity || 1) + quantity;
      updated = [...current];
    } else {
      updated = [...current, { ...product, quantity }];
    }

    this.cartItems.next(updated);
    this.ns.showProduct(`<strong>${product.name}</strong> foi adicionado ao seu carrinho!`, product.image, 'cart');

    await this.syncCartToFirebase(user.uid, updated);
  }

  async updateQuantity(productName: string, delta: number): Promise<void> {
    const user = await this.getUser();
    if (!user) return;

    const current = this.cartItems.value;
    const item = current.find(p => p.name === productName);
    if (item) {
      const newQty = (item.quantity || 1) + delta;
      if (newQty > 0) {
        item.quantity = newQty;
        const updated = [...current];
        this.cartItems.next(updated);
        await this.syncCartToFirebase(user.uid, updated);
      }
    }
  }

  async removeFromCart(productName: string): Promise<void> {
    const user = await this.getUser();
    if (!user) return;

    const updated = this.cartItems.value.filter(p => p.name !== productName);
    this.cartItems.next(updated);
    await this.syncCartToFirebase(user.uid, updated);
    this.ns.show('Produto removido do carrinho.', 'info');
  }

  private async syncCartToFirebase(uid: string, items: Product[]): Promise<void> {
    const colRef = collection(this.firestore, `carts/${uid}/items`);
    const snap = await getDocs(colRef);
    for (const d of snap.docs) await deleteDoc(d.ref);
    for (const item of items) {
      await setDoc(doc(colRef, item.name), item);
    }
  }

  async clearCart(): Promise<void> {
    const user = await this.getUser();
    if (!user) return;

    this.cartItems.next([]);
    const colRef = collection(this.firestore, `carts/${user.uid}/items`);
    const snap = await getDocs(colRef);
    for (const d of snap.docs) await deleteDoc(d.ref);
  }

  async toggleWishlist(product: Product): Promise<void> {
    const user = await this.getUser();
    if (!user) return;

    const current = this.wishlistItems.value;
    const index = current.findIndex(p => p.name === product.name);
    let updated: Product[];

    if (index > -1) {
      updated = current.filter(p => p.name !== product.name);
      this.ns.show(`"${product.name}" removido dos favoritos.`);
    } else {
      updated = [...current, product];
      this.ns.showProduct(`<strong>${product.name}</strong> está na sua lista de desejos!`, product.image, 'wishlist');
    }

    this.wishlistItems.next(updated);
    await this.syncWishlistToFirebase(user.uid, updated);
  }

  private async syncWishlistToFirebase(uid: string, items: Product[]): Promise<void> {
    const colRef = collection(this.firestore, `wishlists/${uid}/items`);
    const snap = await getDocs(colRef);
    for (const d of snap.docs) await deleteDoc(d.ref);
    for (const item of items) {
      await setDoc(doc(colRef, item.name), item);
    }
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
