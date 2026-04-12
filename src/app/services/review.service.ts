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
  deleteDoc,
  doc
} from '@angular/fire/firestore';
import { Auth, authState } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  async getReviewsByProduct(productName: string): Promise<Review[]> {
    try {
      let snap;
      try {
        const q = query(
          collection(this.firestore, 'reviews'),
          where('productName', '==', productName),
          orderBy('createdAt', 'desc')
        );
        snap = await getDocs(q);
      } catch {
        const q = query(
          collection(this.firestore, 'reviews'),
          where('productName', '==', productName)
        );
        snap = await getDocs(q);
      }
      const reviews: Review[] = [];
      snap.forEach((d: any) => reviews.push({ id: d.id, ...d.data() } as Review));
      return reviews.sort((a, b) => {
        const da = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
        const db = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
        return db.getTime() - da.getTime();
      });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  }

  async getReviewsByUser(userId: string): Promise<Review[]> {
    try {
      let snap;
      try {
        const q = query(
          collection(this.firestore, 'reviews'),
          where('userId', '==', userId),
          orderBy('createdAt', 'desc')
        );
        snap = await getDocs(q);
      } catch {
        const q = query(
          collection(this.firestore, 'reviews'),
          where('userId', '==', userId)
        );
        snap = await getDocs(q);
      }
      const reviews: Review[] = [];
      snap.forEach((d: any) => reviews.push({ id: d.id, ...d.data() } as Review));
      return reviews.sort((a, b) => {
        const da = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
        const db = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
        return db.getTime() - da.getTime();
      });
    } catch (error) {
      console.error('Error fetching user reviews:', error);
      return [];
    }
  }

  async addReview(productName: string, rating: number, comment: string): Promise<Review | null> {
    const user = await firstValueFrom(authState(this.auth));
    if (!user) return null;

    const existing = await this.getUserReviewForProduct(user.uid, productName);
    if (existing) {
      throw new Error('You have already reviewed this product.');
    }

    const review: any = {
      userId: user.uid,
      userEmail: user.email || '',
      userName: user.displayName || user.email?.split('@')[0] || 'Anonymous',
      productName,
      rating,
      comment,
      createdAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(this.firestore, 'reviews'), review);
    return { id: docRef.id, ...review } as Review;
  }

  async deleteReview(reviewId: string): Promise<void> {
    await deleteDoc(doc(this.firestore, 'reviews', reviewId));
  }

  async getUserReviewForProduct(userId: string, productName: string): Promise<Review | null> {
    try {
      const q = query(
        collection(this.firestore, 'reviews'),
        where('userId', '==', userId),
        where('productName', '==', productName)
      );
      const snap = await getDocs(q);
      if (snap.empty) return null;
      const d = snap.docs[0];
      return { id: d.id, ...d.data() } as Review;
    } catch {
      return null;
    }
  }

  getAverageRating(reviews: Review[]): number {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  }
}
