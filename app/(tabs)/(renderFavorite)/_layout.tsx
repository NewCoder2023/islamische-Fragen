import React from "react";
import { Stack } from "expo-router";
import { Pressable } from "react-native";
import { useColorScheme } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import Colors from "constants/Colors";

const _layout = () => {
  const colorScheme = useColorScheme();
  return (
    <Stack>
      <Stack.Screen
        name='[renderFavorite]'
        options={{
          title: "Favorites",
          headerLeft: () => (
            <Pressable onPress={() => router.navigate("/favorites")}>
              <Feather
                name='chevron-left'
                size={32}
                color={Colors.light.link}
                style={{ marginLeft: -18, padding: 0 }}
              />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
};

export default _layout;
