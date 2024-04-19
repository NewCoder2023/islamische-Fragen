import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import fetchText from "components/fetchText";
import { FlatList } from "react-native";
import { Platform } from "react-native";
import Colors from "constants/Colors";

export default function renderText() {
  const { table, title } = useLocalSearchParams<{
    table: string;
    title: string;
  }>();

  const { text, fetchError } = fetchText(title, table);

  const Separator = () => {
    return <View style={styles.separator} />;
  };
  return (
    <View style={styles.container}>
      {text && (
        <View>
          <Text>{text}</Text>
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

  itemContainer: {
    flex: 1,
    borderWidth: 2,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 10,
    marginLeft: 10,
    padding: 10,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
        backgroundColor: "#fff",
      },
    }),
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
  separator: {},
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
