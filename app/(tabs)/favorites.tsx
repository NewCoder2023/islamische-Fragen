import Colors from "constants/Colors";
import { Text, View } from "components/Themed";
import { FlatList, Pressable, StyleSheet } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import RenderItems from "components/RenderItems";

export default function favourites() {
  interface Favorite {
    id: string;
    title: string;
    table: string;
    isFavorite: boolean;
  }

  const [favorites, setFavorites] = useState<Favorite[]>([]);

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
      {favorites.map((item) => (
        <RenderItems
          items={[item]}
          table={item.table}
          error='Fehler beim Laden der Favoriten! Bitte überprüfen Sie Ihre Internetverbindung'
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
