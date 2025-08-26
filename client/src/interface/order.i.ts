import { BookItemInterface } from "./book.i";

export interface OrderInterface {
  id: string;
  user_id: string;
  amount: number;
  status: "pending" | "processing" | "completed" | "cancelled" | "delivering";

  fullname: string;
  phone: string;
  note?: string;

  country: string;
  province?: string;
  ward?: string;
  address: string;
  payment_method: string;

  created_at: string; // ISO string
  updated_at: string; // ISO string

  items?: OrderItemInterface[];
}

export interface OrderItemInterface {
  id: string;
  order_id: string;
  book_id: string;
  quantity: number;
  price: number;

  created_at: string; // ISO string
  updated_at: string; // ISO string

  book?: BookItemInterface;
}
