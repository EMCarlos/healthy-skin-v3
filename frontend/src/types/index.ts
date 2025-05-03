export type AuthUser = {
  refresh: string;
  access: string;
  id: number;
  _id: number;
  username: string;
  email: string;
  name: string;
  lastname: string;
  isAdmin: boolean;
  token: string;
};

export type Product = {
  _id?: number;
  reviews?: any[];
  name?: string;
  image?: string;
  brand?: string;
  category?: string;
  description?: string;
  about?: string;
  size?: string;
  rating?: string;
  numReviews?: number;
  price?: string;
  discount?: string;
  countInStock?: number;
  createdAt?: Date;
  user?: number;
};

export interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  paymentStatus: string;
  customer?: string;
}

export type CartItem = Product & {
  quantity?: number;
};
