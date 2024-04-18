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
    SpaceMono: require("assets/fonts/SpaceMono-Regular.ttf"),
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
          name='index'
          options={{ headerShown: false, headerTitle: "" }}
        />
        <Stack.Screen
          name='ashura'
          options={{ headerShown: true, headerTitle: "Ashura" }}
        />
        <Stack.Screen
          name='bittgebete'
          options={{ headerShown: true, headerTitle: "Bittgebete" }}
        />
        <Stack.Screen
          name='gebete'
          options={{ headerShown: true, headerTitle: "Gebete" }}
        />
        <Stack.Screen
          name='ziyarat'
          options={{ headerShown: true, headerTitle: "Ziyarat" }}
        />
        <Stack.Screen
          name='munajat'
          options={{ headerShown: true, headerTitle: "Munajat" }}
        />
        <Stack.Screen
          name='tasbihat'
          options={{ headerShown: true, headerTitle: "Tashibat" }}
        />
        <Stack.Screen
          name='heiligeMonate'
          options={{ headerShown: true, headerTitle: "Heilige Monate" }}
        />
        <Stack.Screen
          name='imamMahdi'
          options={{ headerShown: true, headerTitle: "Imam Mahdi" }}
        />
      </Stack>
    </ThemeProvider>
  );
}
