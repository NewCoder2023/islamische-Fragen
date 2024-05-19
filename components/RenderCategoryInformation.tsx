import { View, Text } from "components/Themed";
import { StyleSheet } from "react-native";
import React from "react";
import { useColorScheme } from "react-native";
import fetchCategoryInformation from "./fetchCategoryInformation";
import { ScrollView } from "react-native";
import { coustomTheme } from "./coustomTheme";

interface RenderCategoryInformationProps {
  category: string;
}

const RenderCategoryInformation: React.FC<RenderCategoryInformationProps> = ({
  category,
}) => {
  const colorScheme = useColorScheme();

  const themeStyles = coustomTheme(colorScheme);

  const { text, fetchError } = fetchCategoryInformation(category);
  return (
    <View style={[styles.container, themeStyles.container]}>
      {fetchError && (
        <Text style={[styles.errorText, themeStyles.error]} selectable>
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
};

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
});
