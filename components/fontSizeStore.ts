import { create } from "zustand";

interface IsChangingState {
  fontSize: number;
  lineHeight: number;
  setFontSize: (size: number) => void;
  setLineHeigth: (height: number) => void;
}

export const useSetFontSize = create<IsChangingState>((set) => ({
  fontSize: 20,
  lineHeight: 40,
  setFontSize: (size: number) => set((state) => ({ fontSize: size })),
  setLineHeigth: (height: number) => set((state) => ({ lineHeight: height })),
}));
