import { StyleSheet } from "react-native";
import { View, Text } from "components/Themed";
import QuestionLinks from "components/QuestionLinks";
import { SafeAreaView } from "react-native-safe-area-context";
import { coustomTheme } from "components/coustomTheme";
import { useColorScheme } from "react-native";

export default function Category() {
  const colorscheme = useColorScheme();
  const themeStyles = coustomTheme(colorscheme);

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.headerText, themeStyles.inverseText, styles.firstLine]}>Willkommen bei</Text>
        <Text style={[styles.headerText, themeStyles.inverseText, styles.secondLine]}>Islam-Fragen</Text>
        <Text style={[styles.headerText, themeStyles.inverseText]}>Ein Projekt vom </Text>
        <Text style={[styles.headerText, themeStyles.inverseText]}>Bund für islamische Bildung</Text>
      </View>

      <View style={styles.categoryContainer}>
        <QuestionLinks />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 0.65,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#41acd2",
    borderWidth: 1,
    borderBottomLeftRadius: 120,
    borderBottomRightRadius: 120
    
  },
  headerText: {
    
  },
  firstLine: {
    fontSize: 30
  },
  secondLine: {
    fontSize: 50
  },

  searchField: {},
  categoryContainer: {
    flex: 0.35,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20

  },
});
