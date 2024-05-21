import { Pressable, StyleSheet } from "react-native";
import { View, Text } from "components/Themed";
import QuestionLinks from "components/QuestionLinks";
import { SafeAreaView } from "react-native-safe-area-context";
import { coustomTheme } from "components/coustomTheme";
import { useColorScheme } from "react-native";
import { Image } from "expo-image";
import SearchBar from "components/SearchBar";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Colors from "constants/Colors";

export default function index() {
  const colorscheme = useColorScheme();
  const themeStyles = coustomTheme(colorscheme);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.backgroundImage}
          source={require("assets/images/background2.svg")}
          contentFit='fill'
        />
        <View style={styles.searchContainer}>
          <Pressable onPress={() => router.push("/search")}>
            <View
              style={[styles.search, themeStyles.container, themeStyles.border]}
            >
              <AntDesign
                name='search1'
                size={20}
                color='grey'
                style={styles.searchIcon}
              />
              <Text style={styles.border}>|</Text>
              <Text style={styles.seachText}>Suche nach Antworten...</Text>
            </View>
          </Pressable>
        </View>
      </View>

      <View style={styles.categoryContainer}>
        <QuestionLinks />
      </View>
    </View>
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
    marginBottom: 10,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  searchContainer: {
    width: "100%",
    position: "absolute",
    top: "72%",
    backgroundColor: "transparent",
  },
  search: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
    paddingRight:15,
    borderWidth: 2,
    borderRadius: 30,
    backgroundColor: "blue",
  },
  searchIcon: {
    paddingLeft: 12,
  },
  border: {
    color: Colors.dark.border,
    fontSize: 25,
    paddingLeft: 3,
    paddingBottom: 5,
    fontWeight: "100",
    alignSelf: "center",
  },
  seachText: {
    paddingLeft: 5,
    fontSize: 16,

  },
  headerText: {},

  searchField: {},
  categoryContainer: {
    flex: 0.35,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
