import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';
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
      status: 'pending',
      createdAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(this.firestore, 'orders'), order);
    
    // Clear cart after successful order creation (simulation)
    // Note: In a real app, you'd wait for payment confirmation
    await this.cartService.clearCart();

    return docRef.id;
  }

  async updateOrderStatus(orderId: string, status: 'paid' | 'failed'): Promise<void> {
    // Logic to update order status in Firestore if needed
    // For now, it's a simulation
  }
}
