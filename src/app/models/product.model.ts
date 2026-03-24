export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id?: string;
  name: string;
  price: string;
  image: string;
  category: string;
  quantity?: number;
  subtitle?: string;
  description?: string;
  specs?: ProductSpec[];
}
