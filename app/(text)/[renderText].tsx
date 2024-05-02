import { View, Text } from "components/Themed";
import { StyleSheet, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import fetchText from "components/fetchText";
import Colors from "constants/Colors";
import { Stack } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useColorScheme } from "react-native";
import { useIsChanging } from "components/favStore";
import Markdown from "react-native-markdown-display";
import { FlashList } from "@shopify/flash-list";
import { storeFavorites, getFavorites } from "components/manageFavorites";
import { useMemo } from "react";

export default function renderText() {
  const { id, table, title } = useLocalSearchParams<{
    id: string;
    table: string;
    title: string;
  }>();

  interface FavoriteItem {
    id: string;
    title: string;
    table: string;
    isFavorite: boolean;
  }

  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const { text, fetchError } = fetchText(id, table);
  const { change } = useIsChanging();

  const Separator = () => {
    return <View style={styles.separator} />;
  };

  {
    useLayoutEffect(() => {
      const loadFavorites = async () => {
        const fav = await getFavorites();
        setFavorites(fav);
      };
      loadFavorites();
    }, []);
  }

  const changeFavourite = async () => {
    if (
      favorites.some(
        (item) => item.table == table && item.id == id && item.isFavorite
      )
    ) {
      Toast.show({
        type: "error",
        text1: "Von Favoriten entfernt!",
      });

      const newFavorites = favorites.map((item) =>
        item.table == table && item.id == id
          ? { ...item, isFavorite: false }
          : item
      );
      setFavorites(newFavorites);
      await storeFavorites(newFavorites, change);
    } else {
      Toast.show({
        type: "success",
        text1: "Zu Favoriten hinzugefügt!",
      });

      const newFavorites = [
        ...favorites,
        {
          id: id,
          title: title,
          table: table,
          isFavorite: true,
        },
      ];
      setFavorites(newFavorites);
      await storeFavorites(newFavorites, change);
    }
  };

  const isInFavorites = useMemo(() => {
    return favorites.some(
      (item) => item.table === table && item.id === id && item.isFavorite
    );
  }, [favorites, table, id]);

  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  const textContentPerPage: string[] = text
    .split("\n\n")
    .filter((text) => text.trim() !== "");

  return (
    <View style={styles.container}>
      {/* Change header Title */}
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable onPress={changeFavourite}>
              <AntDesign
                name={isInFavorites ? "star" : "staro"}
                size={24}
                color={Colors.light.star}
              />
            </Pressable>
          ),
          headerTitle: title,
        }}
      />
      {text && (
        <FlashList
          data={textContentPerPage}
          renderItem={({ item, index }) => (
            <View style={[styles.textContainer, themeContainerStyle]}>
              <Markdown
                style={{
                  body: { fontSize: 20, lineHeight: 40 },
                  heading1: { color: "purple" },
                  code_block: { color: "black", fontSize: 14 },
                  em: { textAlign: "center" },
                }}
              >
                {item}
              </Markdown>
              <Text style={styles.index}>{index + 1}</Text>
            </View>
          )}
          estimatedItemSize={100}
        />
      )}
      {fetchError && (
        <View style={styles.renderError}>
          <Text style={styles.errorText}>{fetchError}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    margin: 10,
    padding: 20,
    borderRadius: 10
  },
  text: {},
  index: {
    marginTop: 10,
    textAlign: "center",
  },
  pageNumber: {},
  separator: {},
  renderError: {
    flex: 1,
    marginTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
  },
  errorText: {
    fontSize: 20,
    color: Colors.light.error,
    textAlign: "center",
  },
  lightContainer: {
    backgroundColor: Colors.light.white,
  },
  darkContainer: {
    backgroundColor: Colors.dark.contrast,
  },
});
