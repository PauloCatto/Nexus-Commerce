import { Product } from './product.model';

export type PaymentMethod = 'credit' | 'debit' | 'pix';
export type OrderStatus = 'pending' | 'paid' | 'failed';

export interface Order {
  id?: string;
  userId: string;
  items: Product[];
  total: number;
  paymentMethod: PaymentMethod;
  installments?: number;
  status: OrderStatus;
  createdAt: Date;
}
