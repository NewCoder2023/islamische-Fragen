import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";

const LOGIN_STATUS_KEY = "isLoggedIn";

export const useAuthStore = create((set) => {
  const initializeStore = async () => {
    try {
      const loggedIn = await AsyncStorage.getItem(LOGIN_STATUS_KEY);
      if (loggedIn === "true") {
        set({ isLoggedIn: true });
      } else {
        set({ isLoggedIn: false });
      }
    } catch (error) {
      console.error("Error reading login status from AsyncStorage:", error);
      set({ isLoggedIn: false });
    }
  };

  // Run the initialization on store creation
  initializeStore();

  return {
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
            onPress: async () => {
              set({ isLoggedIn: false });
              await AsyncStorage.removeItem(LOGIN_STATUS_KEY);
              Toast.show({
                type: "success",
                text1: "Erfolgreich ausgeloggt!",
              });
            },
          },
        ],
        { cancelable: true }
      );
    },
  };
});
