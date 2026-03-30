export interface UserProfile {
  uid: string;
  email: string | null;
  theme?: string;
  fontFamily?: string;
  interfaceStyle?: 'minimal' | 'glass' | 'bold';
  lastUpdated?: number;
}

