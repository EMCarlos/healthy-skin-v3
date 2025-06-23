import { AuthUser, CartItem, Product } from "@/types";

export type userType = {
  isLogged: boolean;
  setIsLogged: (isLogged: userType["isLogged"]) => void;
  userLogged: AuthUser | null; //TODO
  setUserLogged: (userLogged: userType["userLogged"]) => void;
  isLoadingUser: boolean;
  setIsLoadingUser: (isLoadingUser: userType["isLoadingUser"]) => void;
};

export type favoritesType = {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId?: number) => void;
  isFavorite: (productId?: number) => boolean;
};

export type CartType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id?: number) => void;
  updateQuantity: (id?: number, quantity?: number) => void;
  shippingAddress?: string;
  paymentMethod?: string;
  saveShippingAddress: (address: string) => void;
  savePaymentMethod: (paymentMethod: string) => void;
  clearCart: () => void;
};

export interface CheckoutForm {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  isGift: boolean;
  paymentMethod: string;
  giftFrom?: string;
  giftTo?: string;
  giftMessage?: string;
}

export interface CheckoutType {
  checkoutForm: CheckoutForm | null;
  setCheckoutForm: (form: CheckoutType["checkoutForm"]) => void;
}

export type GeneralStore = userType & favoritesType & CartType & CheckoutType;
