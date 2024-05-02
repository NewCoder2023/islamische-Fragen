import { create } from "zustand";

export const useIsChanging = create((set) => ({
  favoriteChange: false,
  change: () => set((state) => ({ favoriteChange: !state.favoriteChange })),
}));
