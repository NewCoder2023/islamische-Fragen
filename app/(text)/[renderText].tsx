import { View, Text } from "components/Themed";
import { StyleSheet, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import fetchText from "components/fetchText";
import { FlatList } from "react-native";
import Colors from "constants/Colors";
import { Stack } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";

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

  const Separator = () => {
    return <View style={styles.separator} />;
  };

  {
    /* Get the Favorites from the AsyncStorage*/
  }
  useLayoutEffect(() => {
    const getFavorites = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("Favorites");
        if (jsonValue) {
          const parsedFavorites = JSON.parse(jsonValue);
          if (Array.isArray(parsedFavorites)) {
            // Ensure it's an array before setting
            setFavorites(parsedFavorites);
          } else {
            // Initialize with an empty array
            setFavorites([]);
          }
        } else {
          // No data found, initialize with an empty array
          setFavorites([]);
        }
      } catch (e) {
        Toast.show({
          type: "error",
          text1:
            "Fehler beim Laden der Favoriten! Bitte überprüfen Sie Ihre Internetverbindung",
        });
        // Fallback to an empty array
        setFavorites([]);
      }
    };
    getFavorites();
  }, []);

  {
    /* Set the Favorites in the AsyncStorage and change icons*/
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
      await storeFavorites(newFavorites);
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
      await storeFavorites(newFavorites);
    }
  };

  const storeFavorites = async (favorites: FavoriteItem[]) => {
    try {
      const jsonValue = JSON.stringify(favorites);
      await AsyncStorage.setItem("Favorites", jsonValue);
    } catch (e) {
      console.log(e);
      Toast.show({
        type: "error",
        text1:
          "Fehler beim Hinzufügen zu den Favoriten! Bitte überprüfen Sie Ihre Internetverbindung",
      });
    }
  };

  const isInFavorites = () => {
    return (
      Array.isArray(favorites) &&
      favorites.some(
        (item) => item.table == table && item.id == id && item.isFavorite
      )
    );
  };

  const colorScheme = useColorScheme();

  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  const contentArray = Object.values(content).flat();

  // Style Attributes
  const getStyle = (item) => {
    switch (item.style) {
      case "notes":
        return styles.notesStyle;
      case "content":
        return styles.contentStyle;
      case "title":
        return styles.titleStyle;
      case "arabic":
        return styles.arabicStyle;
    }
  };

  return (
    <View style={styles.container}>
      {/* Change header Title */}
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable onPress={changeFavourite}>
              <AntDesign
                name={isInFavorites() ? "star" : "staro"}
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
          <FlatList
            data={contentArray}
            renderItem={({ item, index }) => (
              <View style={[styles.itemContainer, themeContainerStyle]}>
                <Text style={[getStyle(item), styles.text]}>{item.text}</Text>
                <View style={[styles.pageNumberContainer, themeContainerStyle]}>
                  <Text style={styles.pageNumber}>{index + 1}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={Separator}
          ></FlatList>
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
  listContainer: {},
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
