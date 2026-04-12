import { Component, Input, inject, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, authState } from '@angular/fire/auth';
import { ReviewService } from '../../services/review.service';
import { NotificationService } from '../../services/notification.service';
import { Review } from '../../models/review.model';

@Component({
  selector: 'app-product-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-reviews.component.html',
  styleUrl: './product-reviews.component.scss'
})
export class ProductReviewsComponent implements OnInit, OnChanges {
  @Input() productName: string = '';

  reviews: Review[] = [];
  averageRating: number = 0;
  isLoading: boolean = true;
  isLoggedIn: boolean = false;
  userId: string = '';

  showForm: boolean = false;
  newRating: number = 0;
  hoverRating: number = 0;
  newComment: string = '';
  isSubmitting: boolean = false;
  hasUserReview: boolean = false;

  private auth = inject(Auth);
  private reviewService = inject(ReviewService);
  private ns = inject(NotificationService);
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);

  ngOnInit(): void {
    authState(this.auth).subscribe(user => {
      this.isLoggedIn = !!user;
      this.userId = user?.uid || '';
      if (this.productName) this.checkUserReview();
      this.cdr.detectChanges();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productName'] && this.productName) {
      this.loadReviews();
    }
  }

  async loadReviews(): Promise<void> {
    this.isLoading = true;
    const reviews = await this.reviewService.getReviewsByProduct(this.productName);
    this.ngZone.run(() => {
      this.reviews = reviews;
      this.averageRating = this.reviewService.getAverageRating(this.reviews);
      this.isLoading = false;
      if (this.userId) this.checkUserReview();
      this.cdr.detectChanges();
    });
  }

  private checkUserReview(): void {
    this.hasUserReview = this.reviews.some(r => r.userId === this.userId);
  }

  setRating(value: number): void {
    this.newRating = value;
  }

  setHoverRating(value: number): void {
    this.hoverRating = value;
  }

  toggleForm(): void {
    if (!this.isLoggedIn) {
      this.ns.show('Please log in to write a review.', 'error');
      return;
    }
    if (this.hasUserReview) {
      this.ns.show('You have already reviewed this product.', 'info');
      return;
    }
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.newRating = 0;
      this.hoverRating = 0;
      this.newComment = '';
    }
  }

  async submitReview(): Promise<void> {
    if (this.newRating === 0) {
      this.ns.show('Please select a rating.', 'error');
      return;
    }
    if (!this.newComment.trim()) {
      this.ns.show('Please write a comment.', 'error');
      return;
    }

    this.isSubmitting = true;
    this.cdr.detectChanges();

    try {
      await this.reviewService.addReview(this.productName, this.newRating, this.newComment.trim());

      this.ngZone.run(() => {
        this.showForm = false;
        this.newRating = 0;
        this.hoverRating = 0;
        this.newComment = '';
        this.isSubmitting = false;
        this.cdr.detectChanges();
      });

      this.ns.show('Review submitted successfully!', 'success');

      await this.loadReviews();

    } catch (error: any) {
      this.ngZone.run(() => {
        this.isSubmitting = false;
        this.cdr.detectChanges();
      });
      this.ns.show(error.message || 'Failed to submit review.', 'error');
    }
  }

  getStarArray(): number[] {
    return [1, 2, 3, 4, 5];
  }

  getRatingStars(rating: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < rating);
  }

  getDisplayRating(): number {
    return this.hoverRating || this.newRating;
  }

  getRatingLabel(): string {
    const r = this.getDisplayRating();
    switch (r) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return 'Select a rating';
    }
  }

  getReviewerInitial(review: Review): string {
    return (review.userName || review.userEmail || 'A').charAt(0).toUpperCase();
  }

  getTimeAgo(review: Review): string {
    const date = review.createdAt?.toDate ? review.createdAt.toDate() : new Date(review.createdAt);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 30) return `${days} days ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return `${Math.floor(days / 365)} years ago`;
  }
}

