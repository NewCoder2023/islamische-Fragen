import { create } from "zustand";

interface IsChangingState {
  favoriteChange: boolean;
  change: () => void;
}

export const useIsChanging = create<IsChangingState>((set) => ({
  favoriteChange: false,
  change: () => set((state) => ({ favoriteChange: !state.favoriteChange })),
}));
