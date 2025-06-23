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
  last_login: Date | null;
  date_joined: Date;
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
  _id: string;
  date: string;
  totalPrice: number;
  isDelivered: boolean;
  isPaid: boolean;
  orderItems: CartItem[];
  createdAt: string;
  status: string;
  paymentStatus: string;
  customer?: string;
  user: {
    id: number;
    _id: number;
    username: string;
    email: string;
    name: string;
    lastname: string;
    isAdmin: boolean;
    last_login: string | null;
    date_joined: string;
  };
}

export type CartItem = Product & {
  product?: number;
  quantity?: number;
};

export type CustomerOrder = {
  orderItems: CartItem[];
  shippingAddress: {
    name?: string;
    email?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    phone?: string;
    messageFrom?: string;
    messageFor?: string;
    message?: string;
  };
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  giftPrice: number;
  taxPrice: number;
  totalPrice: number;
};
