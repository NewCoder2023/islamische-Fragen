import Colors from "constants/Colors";
import { Text, View } from "components/Themed";
import { FlatList, Pressable, StyleSheet } from "react-native";
import React from "react";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function favourites() {
  useEffect(() => {
    const getFavorites = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("Favorites");
        if (jsonValue) {
        }
      } catch (e) {
        console.log(e);
      }
    };
    getFavorites();
  }, []);
  return (
    <View style={styles.container}>
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
