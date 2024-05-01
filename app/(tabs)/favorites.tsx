import Colors from "constants/Colors";
import { Text, View } from "components/Themed";
import { FlatList, Pressable, StyleSheet } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import RenderFavorites from "components/RenderFavorites";
import { useColorScheme } from "react-native";
import { FlashList } from "@shopify/flash-list";

export default function favourites() {
  interface Favorite {
    id: string;
    title: string;
    table: string;
    isFavorite: boolean;
  }

  const [favorites, setFavorites] = useState<Favorite[]>([]);

  const colorScheme = useColorScheme();

  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
  const themeErrorStyle =
    colorScheme === "light" ? styles.lightError : styles.darkError;

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("Favorites");

        if (jsonValue) {
          const parsedFavorites = JSON.parse(jsonValue);

          if (Array.isArray(parsedFavorites)) {
            // Filter items with isFavorite: true
            const filteredFavorites = parsedFavorites.filter(
              (item) => item.isFavorite
            );
            setFavorites(filteredFavorites);
          } else {
            // Initialize with empty array
            setFavorites([]);
          }
        } else {
          // Fallback if no data found
          setFavorites([]);
        }
      } catch (e) {
        Toast.show({
          type: "error",
          text1:
            "Fehler beim Laden der Favoriten! Bitte überprüfen Sie Ihre Internetverbindung",
        });
        // Fallback to empty array in case of error
        setFavorites([]);
      }
    };
    getFavorites();
  }, [favorites]);

  return (
    <View style={styles.container}>
      {favorites[0] ? (
        <View style={styles.favoriteContainer}>
          <FlashList
            data={favorites}
            estimatedItemSize={88}
            keyExtractor={(item, index) => `${item.table}-${item.id}`}
            renderItem={({ item }) => (
              <RenderFavorites items={[item]} table={item.table} />
            )}
          />
        </View>
      ) : (
        <View style={[styles.noFavoritesContainer, themeContainerStyle]}>
          <Text style={[styles.noFavoritesText, themeErrorStyle]}>
            Du hast noch keine Favoriten. {"\n"} {"\n"} Wenn dir etwas gefällt,
            klicke oben auf den Stern!
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  favoriteContainer: {
    flex: 1,
    marginTop: 30,
  },

  noFavoritesContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    paddingLeft: 12,
    paddingRight: 12,
  },
  noFavoritesText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  lightContainer: {
    backgroundColor: Colors.light.white,
  },
  darkContainer: {
    backgroundColor: Colors.dark.contrast,
  },
  lightError: {
    color: Colors.light.error,
  },
  darkError: {
    color: Colors.light.error,
  },
});
