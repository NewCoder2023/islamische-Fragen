import Colors from "constants/Colors";
import { Text, View } from "components/Themed";
import { FlatList, Pressable, StyleSheet } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export default function favourites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("Favorites");
        let favoriteArray = [];
        if (jsonValue) {
          const trueFavorites = JSON.parse(jsonValue);
          favoriteArray = Object.keys(trueFavorites).filter(
            (key) => trueFavorites[key]
          );
          setFavorites(favoriteArray);
        }
      } catch (e) {
        Toast.show({
          type: "error",
          text1:
            "Fehler beim Laden der Favoriten! Bitte überprüfen Sie Ihre Internetverbindung",
        });
      }
    };
    getFavorites();
  }, [favorites]);

  return (
    <View style={styles.container}>
      <Text>
        {favorites.map((title, index) => (
          <Text key={index}>{title}</Text>
        ))}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
