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
  clearCart: () => void;
};

export type GeneralStore = userType & favoritesType & CartType;
