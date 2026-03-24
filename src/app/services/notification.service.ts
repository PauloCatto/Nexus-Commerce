import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error' | 'info' | 'auth' | 'product';
  id: number;
  photo?: string | null;
  authType?: 'login' | 'logout';
  productType?: 'cart' | 'wishlist';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notifications.asObservable();
  private counter = 0;

  show(message: string, type: 'success' | 'error' | 'info' = 'success') {
    const id = this.counter++;
    const current = this.notifications.value;
    this.notifications.next([...current, { message, type, id }]);

    setTimeout(() => {
      this.remove(id);
    }, 3000);
  }

  showAuth(message: string, photo: string | null, authType: 'login' | 'logout') {
    const id = this.counter++;
    const current = this.notifications.value;
    this.notifications.next([...current, { message, type: 'auth', id, photo, authType }]);

    setTimeout(() => {
      this.remove(id);
    }, 4000);
  }

  showProduct(message: string, image: string, productType: 'cart' | 'wishlist') {
    const id = this.counter++;
    const current = this.notifications.value;
    this.notifications.next([...current, { 
      message, 
      type: 'product', 
      id, 
      photo: image, 
      productType 
    }]);

    setTimeout(() => {
      this.remove(id);
    }, 4000);
  }

  remove(id: number) {
    const current = this.notifications.value.filter(n => n.id !== id);
    this.notifications.next(current);
  }
}
