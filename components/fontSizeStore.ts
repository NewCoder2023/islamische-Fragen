import { create } from "zustand";

interface IsChangingState {
    fontSize: number;
    setFontSize: (size: number) => void;
  }
  
export const useSetFontSize = create<IsChangingState>((set) => ({
  fontSize: 20,
  setFontSize: (size: number) => set((state) => ({ fontSize: size })),
}));
