import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  doc,
  updateDoc
} from '@angular/fire/firestore';
import { Auth, authState } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';
import { Order } from '../models/order.model';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private cartService = inject(CartService);

  async createOrder(orderData: Omit<Order, 'userId' | 'createdAt' | 'status'>): Promise<string> {
    const user = await firstValueFrom(authState(this.auth));
    if (!user) throw new Error('User must be logged in to create an order');

    const order: any = {
      ...orderData,
      userId: user.uid,
      userEmail: user.email || '',
      status: 'paid',
      createdAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(this.firestore, 'orders'), order);

    await this.cartService.clearCart();

    return docRef.id;
  }

  async getOrdersByUser(): Promise<(Order & { id: string })[]> {
    const user = await firstValueFrom(authState(this.auth));
    if (!user) return [];

    try {
      let snap;
      try {
        const q = query(
          collection(this.firestore, 'orders'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        snap = await getDocs(q);
      } catch {
        const q = query(
          collection(this.firestore, 'orders'),
          where('userId', '==', user.uid)
        );
        snap = await getDocs(q);
      }
      const orders: (Order & { id: string })[] = [];
      snap.forEach((d: any) => {
        const data = d.data();
        orders.push({
          id: d.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt)
        } as Order & { id: string });
      });
      return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  }

  async updateOrderStatus(orderId: string, status: 'paid' | 'failed'): Promise<void> {
    const docRef = doc(this.firestore, 'orders', orderId);
    await updateDoc(docRef, { status });
  }
}
