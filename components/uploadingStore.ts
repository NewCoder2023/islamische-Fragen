import { create } from "zustand";
interface IsUploadingState {
  isLoading: boolean;
  startLoading: () => void;
  finishLoading: () => void;
}

export const useIsUpLoading = create<IsUploadingState>((set) => ({
  isLoading: false,
  startLoading: () => set({ isLoading: true }),
  finishLoading: () => set({ isLoading: false }),
}));
