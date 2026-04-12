import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth, authState, User, updateProfile } from '@angular/fire/auth';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
import { ReviewService } from '../../services/review.service';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notification.service';
import { Order } from '../../models/order.model';
import { Review } from '../../models/review.model';
import { ThemePreset } from '../../models/theme.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  activeTab: 'overview' | 'orders' | 'reviews' | 'settings' = 'overview';
  orderCount: number = 0;
  reviewCount: number = 0;
  wishlistCount: number = 0;
  totalSpent: number = 0;
  orders: (Order & { id: string })[] = [];
  isLoadingOrders = true;
  expandedOrderId: string | null = null;
  reviews: Review[] = [];
  isLoadingReviews = true;
  themePresets: ThemePreset[] = [];
  currentTheme: string = 'midnight';
  currentFont: string = "'Outfit', sans-serif";
  currentStyle: 'minimal' | 'glass' | 'bold' = 'glass';
  displayName: string = '';
  isUpdatingProfile: boolean = false;

  fonts = [
    { label: 'Outfit', value: "'Outfit', sans-serif" },
    { label: 'Inter', value: "'Inter', sans-serif" },
    { label: 'Roboto', value: "'Roboto', sans-serif" },
    { label: 'Space Grotesk', value: "'Space Grotesk', sans-serif" },
    { label: 'JetBrains Mono', value: "'JetBrains Mono', monospace" }
  ];

  private auth = inject(Auth);
  private authService = inject(AuthService);
  private themeService = inject(ThemeService);
  private orderService = inject(OrderService);
  private reviewService = inject(ReviewService);
  private cartService = inject(CartService);
  private ns = inject(NotificationService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.themePresets = this.themeService.getPresets();
    this.themeService.currentTheme$.subscribe(t => this.currentTheme = t);
    this.themeService.currentFont$.subscribe(f => this.currentFont = f);
    this.themeService.currentStyle$.subscribe(s => this.currentStyle = s);

    this.route.queryParams.subscribe(params => {
      const tab = params['tab'];
      if (tab && ['overview', 'orders', 'reviews', 'settings'].includes(tab)) {
        this.activeTab = tab;
      }
    });

    authState(this.auth).subscribe(async user => {
      this.user = user;
      if (user) {
        this.displayName = user.displayName || '';
        this.loadStats();
      }
    });
  }

  async loadStats(): Promise<void> {
    if (!this.user) return;

    this.isLoadingOrders = true;
    this.isLoadingReviews = true;

    const [orders, reviews] = await Promise.all([
      this.orderService.getOrdersByUser(),
      this.reviewService.getReviewsByUser(this.user.uid)
    ]);

    this.orders = orders;
    this.orderCount = orders.length;
    this.totalSpent = orders.reduce((acc, o) => acc + (o.total || 0), 0);

    this.reviews = reviews;
    this.reviewCount = reviews.length;

    this.wishlistCount = this.cartService.getWishlistCount();

    this.isLoadingOrders = false;
    this.isLoadingReviews = false;
  }

  setTab(tab: 'overview' | 'orders' | 'reviews' | 'settings'): void {
    this.activeTab = tab;
  }

  toggleOrder(orderId: string): void {
    this.expandedOrderId = this.expandedOrderId === orderId ? null : orderId;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'paid': return 'status-paid';
      case 'pending': return 'status-pending';
      case 'failed': return 'status-failed';
      default: return '';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'paid': return 'check_circle';
      case 'pending': return 'schedule';
      case 'failed': return 'cancel';
      default: return 'help';
    }
  }

  getPaymentIcon(method: string): string {
    switch (method) {
      case 'credit': return 'credit_card';
      case 'debit': return 'account_balance_wallet';
      case 'pix': return 'qr_code';
      default: return 'payment';
    }
  }

  selectTheme(name: string): void {
    this.themeService.setTheme(name);
  }

  selectFont(font: string): void {
    this.themeService.setFont(font);
  }

  selectStyle(style: 'minimal' | 'glass' | 'bold'): void {
    this.themeService.setStyle(style);
  }

  async updateDisplayName(): Promise<void> {
    if (!this.user || !this.displayName.trim()) return;
    this.isUpdatingProfile = true;
    try {
      await updateProfile(this.user, { displayName: this.displayName.trim() });
      this.ns.show('Display name updated!', 'success');
    } catch {
      this.ns.show('Failed to update name.', 'error');
    }
    this.isUpdatingProfile = false;
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }
  getRatingStars(rating: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i < rating ? 1 : 0);
  }

  get userInitial(): string {
    if (this.user?.displayName) return this.user.displayName.charAt(0).toUpperCase();
    if (this.user?.email) return this.user.email.charAt(0).toUpperCase();
    return 'U';
  }

  get memberSince(): string {
    if (!this.user?.metadata?.creationTime) return '';
    const date = new Date(this.user.metadata.creationTime);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }
}
