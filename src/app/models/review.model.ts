export interface Review {
  id?: string;
  userId: string;
  userEmail: string;
  userName: string;
  productId: string;
  productName: string;
  rating: number;
  comment: string;
  createdAt: any;
}
