import { View, Text } from "components/Themed";
import { StyleSheet } from "react-native";
import React from "react";
import Colors from "constants/Colors";
import { useColorScheme } from "react-native";
import fetchCategoryInformation from "./fetchCategoryInformation";
import { ScrollView } from "react-native";

export default function RenderCategoryInformation({ category }) {
  const colorScheme = useColorScheme();

  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  const themeErrorStyle =
    colorScheme === "light" ? styles.lightError : styles.darkError;

  const { text, fetchError } = fetchCategoryInformation(category);
  return (
    <View style={[styles.container, themeContainerStyle]}>
      {fetchError && (
        <Text style={[styles.errorText, themeErrorStyle]} selectable>
          {fetchError}
        </Text>
      )}
      {text && (
        <ScrollView style={styles.scrollView}>
          <Text style={styles.informationText}>{text}</Text>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    paddingTop: 8,
    paddingBottom: 7,
    paddingLeft: 7,
    paddingRight: 7,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  informationText: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
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
