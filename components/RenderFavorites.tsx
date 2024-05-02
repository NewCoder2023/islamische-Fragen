import Colors from "constants/Colors";
import { Text, View } from "components/Themed";
import { FlatList, Pressable, StyleSheet } from "react-native";
import React from "react";
import { EvilIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useColorScheme } from "react-native";
import { FlashList } from "@shopify/flash-list";
import uuid from "react-native-uuid";

export default function RenderItems({ items }) {
  const encodeTitle = (title: string) => {
    // Clean the title by trimming and removing new lines
    // Encode all characters with encodeURIComponent and manually encode parentheses since the cause trouble in the url
    const cleanedTitle = title.trim().replace(/\n/g, "");
    return encodeURIComponent(cleanedTitle)
      .replace(/\(/g, "%28")
      .replace(/\)/g, "%29");
  };

  const colorScheme = useColorScheme();

  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
  const themeErrorStyle =
    colorScheme === "light" ? styles.lightError : styles.darkError;

  const renderItems = ({ item }) => (
    <Link
      style={styles.FlashListItems}
      keyExtractor={(item) => item.id.toString()}
      href={{
        pathname: `/(text)/${encodeTitle(item.title)}`,
        params: {
          id: item.id,
          table: item.table,
          title: `${encodeTitle(item.title)}`,
        },
      }}
      asChild
    >
      <Pressable>
        <View style={[styles.renderItem, themeContainerStyle]}>
          <Text style={styles.itemText}>{item.title.trim()}</Text>
          <EvilIcons name='arrow-right' size={30} color='black' />
        </View>
      </Pressable>
    </Link>
  );

  return (
    <View style={styles.container}>
      {items && (
        <View style={styles.itemsContainer}>
          <FlashList
            data={items}
            estimatedItemSize={63}
            keyExtractor={(item) => `${item.id}-${item.title}`}
            renderItem={renderItems}
          />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
  },

  itemsContainer: {
    flex: 1,
  },

  FlashListItems: {
    paddingTop: 15,
  },
  renderItem: {
    flexDirection: "row",
    padding: 20,
    borderWidth: 0.2,
  },

  itemText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
  },
  renderError: {
    marginTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
  },
  errorText: {
    fontSize: 20,
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
    color: Colors.dark.error,
  },
});
