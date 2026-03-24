import { Injectable, inject } from '@angular/core';
import { Firestore, collection, getDocs, addDoc, query, where } from '@angular/fire/firestore';
import { Product } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private firestore = inject(Firestore);
  private productsCollection = collection(this.firestore, 'products');

  constructor() { }

  async getProducts(): Promise<Product[]> {
    return this.getLocalFallback();
  }

  // Backup Seguro: Produtos Locais
  private getLocalFallback(): Product[] {
    return [
      { name: 'Razer Wolverine V2 Pro', price: '44.00', image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&q=80&w=600', category: 'Controller' },
      { name: 'Razer DeathAdder V2', price: '60.00', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=600&auto=format&fit=crop', category: 'Mouse' },
      { name: 'Razer BlackShark V2 X', price: '80.00', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=600', category: 'Headset' },
      { name: 'Acer Aspire 5', price: '547.00', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop', category: 'Notebooks' },
      { name: 'iPhone 14 Pro', price: '999.00', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop', category: 'Smartphone' },
      { name: 'Acer Nitro 5', price: '899.00', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=600', category: 'Notebooks' },
      { name: 'Alienware M16', price: '1499.00', image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=600&auto=format&fit=crop', category: 'Notebooks' },
      { name: 'Logitech G502 LIGHTSPEED', price: '119.00', image: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?q=80&w=800&auto=format&fit=crop', category: 'Mouse' },
      { name: 'SteelSeries Apex Pro', price: '199.00', image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=600', category: 'Keyboard' },
      { name: 'Sony WH-1000XM5', price: '349.00', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600', category: 'Headset' },
      { name: 'iPad Pro 12.9', price: '1099.00', image: '/ipad-pro.png', category: 'Smartphone' },
      { name: 'MacBook Air M2', price: '1199.00', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop', category: 'Notebooks' }
    ];
  }
}
