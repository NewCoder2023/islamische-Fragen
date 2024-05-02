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
  const { content, fetchError } = fetchText(id, table);
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
      {content && (
        <View style={styles.listContainer}>
          <View style={[styles.itemContainer, themeContainerStyle]}>
            <Markdown>{content}</Markdown>
            <View
              style={[styles.pageNumberContainer, themeContainerStyle]}
            ></View>
          </View>
        </View>
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
  listContainer: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    borderWidth: 2,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 10,
    marginLeft: 10,
    padding: 10,
    borderRadius: 10,
  },
  pageNumberContainer: {},
  text: {
    fontSize: 18,
    lineHeight: 30,
  },
  pageNumber: {
    paddingTop: 10,
    fontSize: 15,
    alignSelf: "center",
    fontWeight: "bold",
  },
  separator: {
    height: 2,
  },
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
  notesStyle: {
    textAlign: "center",
    fontStyle: "italic",
  },
  contentStyle: {
    fontStyle: "normal",
  },
  titleStyle: {
    textAlign: "center",
    fontWeight: "bold",
  },
  arabicStyle: {
    textAlign: "center",
    fontStyle: "italic",
  },
});
