import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";
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
    set({ isLoggedIn: true });
    await AsyncStorage.setItem(LOGIN_STATUS_KEY, "true");
  },

  logout: async () => {
    Alert.alert(
      "Abmelden",
      "Bist du sicher, dass du dich abmelden möchtest?",
      [
        {
          text: "Abbrechen",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            set({ isLoggedIn: false });
            Toast.show({
              type: "success",
              text1: "Erfolgreich ausgelogt!",
            });
          },
        },
      ],
      { cancelable: true }
    );
    await AsyncStorage.removeItem(LOGIN_STATUS_KEY);
  },
}));
