import { StyleSheet } from "react-native";
import { View, Text } from "components/Themed";
import QuestionLinks from "components/QuestionLinks";
import { SafeAreaView } from "react-native-safe-area-context";
import { coustomTheme } from "components/coustomTheme";
import { useColorScheme } from "react-native";
import { Image } from "expo-image";
import SearchBar from "components/SearchBar";

export default function Category() {
  const colorscheme = useColorScheme();
  const themeStyles = coustomTheme(colorscheme);

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.backgroundImage}
          source={require("assets/images/background2.svg")}
          contentFit='fill'
        />
        <View style={styles.searchBar}>
        <SearchBar />
        </View>
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
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  searchBar: {
   width: "85%",
   backgroundColor: "tranparent",
    position: "absolute",
    top: "70%"
  },
  headerText: {},
  firstLine: {
    fontSize: 30,
  },
  secondLine: {
    fontSize: 50,
  },

  searchField: {},
  categoryContainer: {
    flex: 0.35,
    marginTop: 10,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
