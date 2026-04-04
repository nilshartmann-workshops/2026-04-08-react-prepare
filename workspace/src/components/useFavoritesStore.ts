import { create } from "zustand";

type FavoritesStore = {
  favoriteIds: string[];
  toggleFavorite: (id: string) => void;
};

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favoriteIds: [],

  toggleFavorite: (id) =>
    set((state) =>
      state.favoriteIds.includes(id)
        ? { favoriteIds: state.favoriteIds.filter((fId) => fId !== id) }
        : { favoriteIds: [...state.favoriteIds, id] },
    ),
}));
