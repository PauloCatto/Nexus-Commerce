import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { QRCodeComponent } from 'angularx-qrcode';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { Product } from '../../models/product.model';
import { PaymentMethod } from '../../models/order.model';
import { NotificationService } from '../../services/notification.service';

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

  // Form fields
  cardName: string = '';
  cardNumber: string = '';
  cardExpiry: string = '';
  cardCVV: string = '';

  // PIX simulation
  pixCode: string = '00020126580014BR.GOV.BCB.PIX0136nexus-pix-key-123e4567-e89b-12d3-a456-4266141740005204000053039865802BR5915Nexus Commerce 6009Sao Paulo 62070503***6304E2B1';

  isProcessing: boolean = false;
  isSuccess: boolean = false;
  orderId: string = '';

  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private ns = inject(NotificationService);
  private router = inject(Router);

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.calculateSubtotal();
      if (items.length === 0 && !this.isSuccess) {
        this.router.navigate(['/shop']);
      }
    });
  }

  calculateSubtotal(): void {
    this.subtotal = this.cartItems.reduce((acc, item) => 
      acc + (parseFloat(item.price) * (item.quantity || 1)), 0);
  }

  get total(): number {
    return this.subtotal;
  }

  get installmentOptions() {
    const options = [];
    for (let i = 1; i <= 12; i++) {
      const amount = (this.total / i).toFixed(2);
      options.push({ value: i, label: `${i}x of $${amount} ${i === 1 ? '(No interest)' : ''}` });
    }
    return options;
  }

  async processPayment(): Promise<void> {
    if (this.paymentMethod !== 'pix' && (!this.cardName || !this.cardNumber || !this.cardExpiry || !this.cardCVV)) {
      this.ns.show('Por favor, preencha todos os campos do cartão.', 'error');
      return;
    }

    this.isProcessing = true;

    try {
      // Simulating network delay
      await new Promise(resolve => setTimeout(resolve, 2500));

      const orderData = {
        items: this.cartItems,
        total: this.total,
        paymentMethod: this.paymentMethod,
        installments: this.paymentMethod === 'credit' ? this.installments : undefined
      };

      this.orderId = await this.orderService.createOrder(orderData);
      
      this.isProcessing = false;
      this.isSuccess = true;
      this.ns.show('Pagamento realizado com sucesso!', 'success');
    } catch (error) {
      this.isProcessing = false;
      this.ns.show('Falha ao processar pagamento. Tente novamente.', 'error');
      console.error(error);
    }
  }

  copyPixCode(): void {
    navigator.clipboard.writeText(this.pixCode);
    this.ns.show('Código PIX copiado para a área de transferência!', 'info');
  }
}
