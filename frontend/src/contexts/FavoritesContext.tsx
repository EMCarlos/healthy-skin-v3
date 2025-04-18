import { Product } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

interface FavoritesContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId?: number) => void;
  isFavorite: (productId?: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const addToFavorites = (product: Product) => {
    setFavorites((prev) => [...prev, product]);
  };

  const removeFromFavorites = (productId?: number) => {
    setFavorites((prev) => prev.filter((product) => product._id !== productId));
  };

  const isFavorite = (productId?: number) => {
    return favorites.some((product) => product._id === productId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
