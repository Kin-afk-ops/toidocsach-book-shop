export interface Book {
  id: string;
  staffId?: string;
  name: string;
  slug: string;
  image: {
    path: string;
    publicId: string;
  };
  price: number;
  discount?: number;
  categories?: string[]; // giả sử categories là mảng string
  quantity?: number;
  star?: number;
  hot?: boolean;
  form?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
