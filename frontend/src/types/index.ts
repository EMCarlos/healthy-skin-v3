export type AuthUser = {
  id: number;
  is_superuser: boolean;
  username: string;
  firstname?: string;
  lastname?: string;
  email: string;
  last_login: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
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
