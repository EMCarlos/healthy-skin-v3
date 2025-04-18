import { StateCreator } from "zustand";
import { favoritesType, userType } from "./types";

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
