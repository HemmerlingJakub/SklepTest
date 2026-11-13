export interface Product {
  id: number;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  imageUrl?: string;
  tags?: string[];
  category?: string;
}
