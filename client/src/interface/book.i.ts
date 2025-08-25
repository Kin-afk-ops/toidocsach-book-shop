// Thông tin về ảnh
export interface BookImage {
  image_public_id: string;
  image_url: string;
}

// Thông tin chung của một book (hiển thị trên BookCard)
export interface BookItemInterface {
  id: string;
  title: string;
  images: BookImage[];
  price: number;
  discount: number;
  quantity: number;
  sold_count: number;
  created_at: string; // ISO string
  updated_at: string; // ISO string
}

// Thông tin chi tiết (hiển thị ở trang Product)
export interface BookDetailInterface {
  id: string;
  book_id: string;
  supplier?: string;
  author?: string;
  publisher?: string;
  publish_year?: number;
  weight?: number;
  size?: string | null;
  quantity_of_pages?: number;
  description?: string;
  layout?: string;
  language?: string;
  created_at: string; // ISO string
  updated_at: string; // ISO string
}

// Một sách đầy đủ = BookItem + BookDetail
export interface BookInterface extends BookItemInterface {
  detail: BookDetailInterface;
}
