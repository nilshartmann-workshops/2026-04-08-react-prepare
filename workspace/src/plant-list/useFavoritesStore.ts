import { create } from "zustand";

type FavoritesStore = {
  favoriteIds: string[];
  toggleFavorite: (id: string) => void;
};

export const useFavoritesStore = create<FavoritesStore>((set) => ({
  favoriteIds: [],

  toggleFavorite: (id) =>
    set((state) =>
      state.favoriteIds.includes(id)
        ? { favoriteIds: state.favoriteIds.filter((fId) => fId !== id) }
        : { favoriteIds: [...state.favoriteIds, id] },
    ),
}));

// Externer Selector – wiederverwendbar und testbar
export const selectIsFavorite =
  (id: string) =>
  (state: FavoritesStore): boolean =>
    state.favoriteIds.includes(id);
