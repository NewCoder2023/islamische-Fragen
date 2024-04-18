import Colors from "constants/Colors";
import { Text, View } from "components/Themed";
import { FlatList, Pressable, StyleSheet } from "react-native";
import React from "react";
import { EvilIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function RenderItems({ categoryItems, error }) {
  return (
    <View style={styles.container}>
      {categoryItems && (
        <View style={styles.itemsContainer}>
          <FlatList
            data={categoryItems}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.FlatListItems}
            renderItem={({ item }) => (
              <Link href={item.title} asChild>
                <Pressable>
                  <View style={styles.renderItem}>
                    <Text style={styles.itemText}>{item.title}</Text>
                    <EvilIcons name='arrow-right' size={30} color='black' />
                  </View>
                </Pressable>
              </Link>
            )}
          />
        </View>
      )}
      {error && (
        <View style={styles.renderError}>
          <Text style={styles.errorText}>{error}</Text>
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

  itemsContainer: {},

  FlatListItems: {
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 15,
  },
  renderItem: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
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
    color: Colors.light.error,
    textAlign: "center",
  },
});
