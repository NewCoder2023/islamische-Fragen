import { create } from "zustand";

export const useIsUpLoading = create((set) => ({
  isLoading: false,
  startLoading: () => set({ isLoading: true }),
  finishLoading: () => set({ isLoading: false }),
}));
