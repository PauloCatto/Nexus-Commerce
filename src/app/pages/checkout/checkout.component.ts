import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { QRCodeComponent } from 'angularx-qrcode';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { Product } from '../../models/product.model';
import { PaymentMethod } from '../../models/order.model';
import { NotificationService } from '../../services/notification.service';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent, QRCodeComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  cartItems: Product[] = [];
  subtotal: number = 0;
  parseFloat = parseFloat;

  paymentMethod: PaymentMethod = 'credit';
  installments: number = 1;

  cardName: string = '';
  cardNumber: string = '';
  cardExpiry: string = '';
  cardCVV: string = '';

  pixCode: string = '00020126580014BR.GOV.BCB.PIX0136nexus-pix-key-123e4567-e89b-12d3-a456-4266141740005204000053039865802BR5915Nexus Commerce 6009Sao Paulo 62070503***6304E2B1';

  isProcessing: boolean = false;
  isSuccess: boolean = false;
  isReceiptOpen: boolean = false;
  orderId: string = '';
  userEmail: string = '';
  installmentOptions: any[] = [];
  today = new Date();

  private auth = inject(Auth);
  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private ns = inject(NotificationService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    authState(this.auth).subscribe(user => {
      if (user) this.userEmail = user.email || '';
    });

    this.cartService.cart$.subscribe(items => {
      if (!this.isSuccess && !this.isProcessing) {
        this.cartItems = [...items];
        this.calculateSubtotal();
        this.calculateInstallments();
      }

      if (items.length === 0 && !this.isSuccess && !this.isProcessing) {
        this.router.navigate(['/shop']);
      }
    });
  }

  toggleReceipt(): void {
    this.isReceiptOpen = !this.isReceiptOpen;
  }

  printReceipt(): void {
    window.print();
  }

  calculateSubtotal(): void {
    this.subtotal = this.cartItems.reduce((acc, item) =>
      acc + (parseFloat(item.price) * (item.quantity || 1)), 0);
  }

  calculateInstallments(): void {
    const options = [];
    for (let i = 1; i <= 12; i++) {
      const amount = (this.total / i).toFixed(2);
      options.push({ value: i, label: `${i}x of $${amount} ${i === 1 ? '(No interest)' : ''}` });
    }
    this.installmentOptions = options;
  }

  get total(): number {
    return this.subtotal;
  }

  async processPayment(): Promise<void> {
    if (this.paymentMethod !== 'pix' && (!this.cardName || !this.cardNumber || !this.cardExpiry || !this.cardCVV)) {
      this.ns.show('Please fill in all card details.', 'error');
      return;
    }

    this.isProcessing = true;

    try {
      await new Promise(resolve => setTimeout(resolve, 2500));

      const orderData: any = {
        items: this.cartItems,
        total: this.total,
        paymentMethod: this.paymentMethod
      };

      if (this.paymentMethod === 'credit') {
        orderData.installments = this.installments;
      }

      const id = await this.orderService.createOrder(orderData);

      this.orderId = id;
      this.isProcessing = false;
      this.isSuccess = true;

      this.cdr.detectChanges();

      this.triggerConfetti();

      setTimeout(() => {
        this.ns.show('Payment processed successfully!', 'success');
      }, 0);

    } catch (error) {
      this.isProcessing = false;
      this.ns.show('Failed to process payment. Please try again.', 'error');
      this.cdr.detectChanges();
      console.error(error);
    }
  }

  triggerConfetti(): void {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  }

  get estimatedDelivery(): string {
    const date = new Date();
    date.setDate(date.getDate() + 4); 
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  copyPixCode(): void {
    navigator.clipboard.writeText(this.pixCode);
    this.ns.show('PIX code copied to clipboard!', 'info');
  }
}
