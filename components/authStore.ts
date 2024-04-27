import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LOGIN_STATUS_KEY = "isLoggedIn";

type AuthStoreState = {
  isLoggedIn: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create((set) => ({
  // Default
  isLoggedIn: false,

  login: async () => {
    alert("Sicher, das Sie sich auslogen wollen?");

    set({ isLoggedIn: true });

    await AsyncStorage.setItem(LOGIN_STATUS_KEY, "true");
  },

  logout: async () => {
    set({ isLoggedIn: false });

    await AsyncStorage.removeItem(LOGIN_STATUS_KEY);
  },
}));
