import { StateCreator } from "zustand";
import { CartType, CheckoutType, favoritesType, userType } from "./types";

export const user: StateCreator<userType> = (set) => ({
  isLogged: false,
  setIsLogged: (isLogged: boolean) => set({ isLogged }),
  userLogged: null,
  setUserLogged: (userLogged) => set({ userLogged }),
  isLoadingUser: true,
  setIsLoadingUser: (isLoadingUser) => set({ isLoadingUser }),
});

export const favorites: StateCreator<favoritesType> = (set, get) => ({
  favorites: [],
  addToFavorites: (product) =>
    set((state) => ({
      favorites: [...state.favorites, product],
    })),
  removeFromFavorites: (productId) =>
    set((state) => ({
      favorites: state.favorites.filter((product) => product._id !== productId),
    })),
  isFavorite: (productId) => {
    const state = get();
    return state.favorites.some((product) => product._id === productId);
  },
});

export const cart: StateCreator<CartType, [], [], CartType> = (set) => ({
  cartItems: [],
  addToCart: (item) =>
    set((state) => {
      const existing = state.cartItems.find((i) => i._id === item._id);
      if (existing) {
        return {
          cartItems: state.cartItems.map((i) =>
            i._id === item._id ? { ...i, quantity: (i?.quantity ?? 0) + (item?.quantity ?? 0) } : i
          ),
        };
      }
      return { cartItems: [...state.cartItems, item] };
    }),
  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((i) => i._id !== id),
    })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((i) => (i._id === id ? { ...i, quantity } : i)),
    })),
  clearCart: () => set({ cartItems: [] }),
});

export const checkout: StateCreator<CheckoutType, [], [], CheckoutType> = (set) => ({
  checkoutForm: null,
  setCheckoutForm: (form) => set({ checkoutForm: form }),
});
