export interface SearchResult {
  type: 'product' | 'post';
  id?: string;
  title: string;
  subtitle?: string;
  image: string;
  category: string;
  slug: string;
}
