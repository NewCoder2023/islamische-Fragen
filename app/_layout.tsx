import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "components/useColorScheme";
import Toast from "react-native-toast-message";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name='(tabs)'
          options={{ headerShown: false, headerTitle: "" }}
        />
        <Stack.Screen
          name='modal'
          options={{
            headerTitle: "Admin Login",
            presentation: "modal",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name='adminDashboard'
          options={{
            headerShown: true,
            headerTitle: "Neuer Beitrag",
          }}
        />
        <Stack.Screen
          name='(text)/[renderText]'
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name='impressum'
          options={{
            headerShown: true,
            headerTitle: "Impressum",
          }}
        />
        <Stack.Screen
          name='rulesModal'
          options={{
            headerShown: false,
            presentation: 'modal'
          }}
          
        />
      </Stack>
      <Toast />
    </ThemeProvider>
  );
}
