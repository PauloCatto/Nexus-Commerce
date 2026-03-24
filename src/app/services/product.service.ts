import { Injectable, inject } from '@angular/core';
import { Firestore, collection, getDocs, query } from '@angular/fire/firestore';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private firestore = inject(Firestore);
  private productsCollection = collection(this.firestore, 'products');

  constructor() { }

  async getProducts(): Promise<Product[]> {
    try {
      const q = query(this.productsCollection);
      const querySnapshot = await getDocs(q);

      const products: Product[] = [];
      querySnapshot.forEach((doc: any) => {
        products.push({ id: doc.id, ...doc.data() } as Product);
      });

      return products;
    } catch (error) {
      console.error('Failed to fetch products from Firebase:', error);
      return [];
    }
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    const products = await this.getProducts();
    return products.find(p => p.name.toLowerCase().split(' ').join('-') === slug) ?? null;
  }
}
