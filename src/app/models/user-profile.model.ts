export interface UserProfile {
  uid: string;
  email: string | null;
  theme?: string;
  fontFamily?: string;
  borderRadius?: string;
  lastUpdated?: number;
}
