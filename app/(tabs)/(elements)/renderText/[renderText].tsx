import { View, Text } from "components/Themed";
import { StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import fetchText from "components/fetchText";
import { FlatList } from "react-native";
import Colors from "constants/Colors";
import { Stack } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const Separator = () => {
    return <View style={styles.separator} />;
  };
  const items = text.split("\n").filter((item) => item !== "");

  {
    /* Get the Favorites from the AsyncStorage*/
  }
  useEffect(() => {
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
    if (favorites.some((item) => item.id == id && item.isFavorite)) {
      Toast.show({
        type: "error",
        text1: "Von Favoriten entfernt!",
      });

      const newFavorites = favorites.map((item) =>
        item.id === id ? { ...item, isFavorite: false } : item
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
      favorites.some((item) => item.id == id && item.isFavorite)
    );
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
      {items && (
        <View style={styles.listContainer}>
          <FlatList
            data={items}
            renderItem={({ item, index }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.text}>{item}</Text>
                <View style={styles.pageNumberContainer}>
                  <Text style={styles.pageNumber}>{index + 1}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            pagingEnabled
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
    backgroundColor: Colors.light.white,
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
    backgroundColor: Colors.light.sperator,
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
});
