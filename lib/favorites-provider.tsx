"use client";

import { Dog } from "@/lib/models";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type FavoritesContextType = {
  favorites: Dog[];
  setFavorites: Dispatch<SetStateAction<Dog[]>>;
  onToggleFavorite: (item: Dog) => void;
};

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  setFavorites: () => {},
  onToggleFavorite: () => {},
});

export default function FavoritesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [favorites, setFavorites] = useState<Dog[]>([]);

  const onToggleFavorite = (item: Dog) => {
    if (favorites.includes(item)) {
      setFavorites(favorites.filter((i) => i.id !== item.id));
    } else {
      setFavorites([...favorites, item]);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, setFavorites, onToggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext() {
  const ctx = useContext(FavoritesContext);

  if (!ctx)
    throw new Error("useFavoritesContext must be used in FavoritesProvider");

  return ctx;
}
