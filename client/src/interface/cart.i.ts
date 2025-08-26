import { BookInterface } from "./book.i";

export interface CartItemInterface {
  id: string;
  cart_id: string;
  book_id: string;
  quantity: number;
  created_at: string; // ISO string
  updated_at: string; // ISO string
  book?: BookInterface; // nếu include_book = true
}

export interface CartInterface {
  id: string;
  user_id: string;
  created_at: string; // ISO string
  updated_at: string; // ISO string
  items?: CartItemInterface[]; // nếu include_items = true
}

export interface CartItemWithCheck extends CartItemInterface {
  checked: boolean;
}
